// 中国地图 - 使用 ECharts GeoJSON（替代百度地图，避免网络加载问题）
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { EffectScatterChart, MapChart, ScatterChart } from 'echarts/charts';
import { GeoComponent, TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { history } from 'umi';
import { mockDeviceListData, mockProductListData } from '@/utils/mockData';
import type { DeviceStatic } from '@/pages/home/data';
import type { DEVICE_INFO } from '@/utils/const';
import { timestampToDateStr } from '@/utils/date';
import styles from './index.less';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GeoComponent,
  VisualMapComponent,
  MapChart,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
  UniversalTransition,
]);

interface DeviceMapProps {
  data?: DeviceStatic;
}

interface DeviceListProps extends DEVICE_INFO {
  position: {
    longitude: number;
    latitude: number;
  };
  address: string;
  productName: string;
  value?: number[];
}

const DeviceMap: React.FC<DeviceMapProps> = () => {
  const deviceList = mockDeviceListData.data.list;
  const productList = mockProductListData.data.list;
  const chartRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);
  const [currentMap, setCurrentMap] = useState({ name: 'china', adcode: '100000' });
  const [mapStack, setMapStack] = useState<Array<{ name: string; adcode: string }>>([]);

  // 动态加载地图 GeoJSON 数据（支持省市县下钻）
  const loadMapData = async (mapName: string, adcode: string) => {
    const cdnUrls = [
      adcode === '100000' ? '/china_full.json' : null,  // ✓ 优先使用本地完整版(含省份边界和名称)
      `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`, // 完整版CDN(备用)
      `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`,      // 简化版CDN(备用)
    ].filter(Boolean) as string[];

    let loadSuccess = false;

    const tryLoadMap = async (urls: string[], index: number = 0): Promise<void> => {
      if (index >= urls.length) {
        console.error('所有地图数据源均加载失败');
        setMapLoadError(true);
        setMapLoaded(true);
        return;
      }

      if (loadSuccess) return;

      try {
        console.log(`尝试加载地图数据源 ${index + 1}/${urls.length}:`, urls[index]);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

        const response = await fetch(urls[index], {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const geoJson = await response.json();

        // 验证GeoJSON数据结构
        if (!geoJson || typeof geoJson !== 'object') {
          throw new Error('Invalid GeoJSON: not an object');
        }

        if (!geoJson.features || !Array.isArray(geoJson.features)) {
          throw new Error('Invalid GeoJSON: missing features array');
        }

        if (geoJson.features.length === 0) {
          throw new Error('Invalid GeoJSON: empty features array');
        }

        console.log('✓ 地图数据加载成功，来源:', urls[index]);
        console.log('  特征数量:', geoJson.features.length);
        console.log('  数据大小:', JSON.stringify(geoJson).length, 'bytes');

        loadSuccess = true;
        echarts.registerMap(mapName, geoJson);
        setMapLoaded(true);
      } catch (error: any) {
        console.warn(`✗ 地图数据源 ${index + 1} 加载失败:`, error.message);
        // 尝试下一个数据源
        if (!loadSuccess) {
          await tryLoadMap(urls, index + 1);
        }
      }
    };

    await tryLoadMap(cdnUrls);
  };

  // 初始加载中国地图
  useEffect(() => {
    loadMapData('china', '100000');
  }, []);

  // 监听窗口变化
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const instance = chartRef.current.getEchartsInstance();
        if (instance) {
          instance.resize();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 500);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = useMemo(() => {
    const res = deviceList?.map((device: any) => {
      let productName: string = '';
      let isOnline = device.isOnline;
      if (device.isOnline === 2 && device.firstLogin === '0') isOnline = 3;
      productList?.map((product: any) => {
        if (device.productID === product.productID) {
          productName = product.productName as string;
        }
      });
      return {
        ...device,
        productName,
        isOnline,
      };
    });
    return res || [];
  }, [deviceList, productList]);

  const convertData = function (list: DeviceListProps[], status: number) {
    const res: any[] = [];
    for (let i = 0; i < list?.length; i++) {
      const geoCoord = [list[i].position.longitude, list[i].position.latitude];
      if (geoCoord && list[i].isOnline === status) {
        res.push({
          name: list[i].deviceName,
          value: geoCoord.concat([1]),
          deviceName: list[i].deviceName,
          createdTime: list[i].createdTime,
          isOnline: list[i].isOnline,
          productID: list[i].productID,
          productName: list[i].productName,
          address: list[i].address,
          firstLogin: list[i].firstLogin,
          lastLogin: list[i].lastLogin,
          version: list[i].version,
        });
      }
    }
    return res;
  };

  // 统计各省设备数量（示例数据，实际应根据设备地址统计）
  const provinceData = useMemo(() => {
    const countMap: Record<string, number> = {};
    data.forEach((device: any) => {
      // 从地址中提取省份名称（简化处理）
      const address = device.address || '';
      const provinceMatch = address.match(/^(.*?(省|市|自治区|特别行政区))/);
      if (provinceMatch) {
        const province = provinceMatch[1].replace(/市$/, ''); // 去掉直辖市的"市"
        countMap[province] = (countMap[province] || 0) + 1;
      }
    });
    return countMap;
  }, [data]);

  // 计算设备分布的地理边界，自动调整地图视野
  const mapViewConfig = useMemo(() => {
    if (!data || data.length === 0) {
      // 默认显示全国，中心点向左偏移（经度-8）让地图内容右移，上海等靠近右边框
      return { center: [97, 36], zoom: 1.2 };
    }

    // 收集所有设备的经纬度
    const validDevices = data.filter((device: any) =>
      device.position &&
      device.position.longitude &&
      device.position.latitude &&
      device.position.longitude >= 73 &&  // 中国最西端
      device.position.longitude <= 135 && // 中国最东端
      device.position.latitude >= 18 &&   // 中国最南端
      device.position.latitude <= 54      // 中国最北端
    );

    if (validDevices.length === 0) {
      return { center: [97, 36], zoom: 1.2 };
    }

    // 计算经纬度边界
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

    validDevices.forEach((device: any) => {
      const lng = device.position.longitude;
      const lat = device.position.latitude;

      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });

    // 计算中心点，向左偏移（经度-6）让地图内容整体右移
    const centerLng = (minLng + maxLng) / 2 - 6;
    const centerLat = (minLat + maxLat) / 2;

    // 计算跨度
    const lngSpan = maxLng - minLng;
    const latSpan = maxLat - minLat;
    const maxSpan = Math.max(lngSpan, latSpan);

    // 根据跨度计算缩放级别（放大倍数提升）
    // 跨度越大，缩放级别越小（显示范围越大）
    // 跨度越小，缩放级别越大（显示范围越小，更聚焦）
    let zoom;
    if (maxSpan > 30) {
      zoom = 1.5;  // 跨度很大，显示大区域（从1.0提升到1.5）
    } else if (maxSpan > 20) {
      zoom = 2.5;  // 跨度较大（从1.5提升到2.5）
    } else if (maxSpan > 10) {
      zoom = 3.5;  // 中等跨度（从2.0提升到3.5）
    } else if (maxSpan > 5) {
      zoom = 5.0;  // 较小跨度（从3.0提升到5.0）
    } else if (maxSpan > 2) {
      zoom = 7.0;  // 小跨度，聚焦显示（从4.5提升到7.0）
    } else {
      zoom = 9.0;  // 非常小的跨度，高度聚焦（从6.0提升到9.0）
    }

    // 添加一些边距，避免设备点位贴边（边距比例从0.85调整到0.9，留更少空白）
    zoom = zoom * 0.9;

    console.log('📍 地图自动聚焦:', {
      设备数量: validDevices.length,
      经度范围: [minLng.toFixed(2), maxLng.toFixed(2)],
      纬度范围: [minLat.toFixed(2), maxLat.toFixed(2)],
      中心点: [centerLng.toFixed(2), centerLat.toFixed(2)],
      缩放级别: zoom.toFixed(2),
      跨度: maxSpan.toFixed(2)
    });

    return {
      center: [centerLng, centerLat],
      zoom: zoom
    };
  }, [data]);

  const option: any = {
    title: {
      text: '设备分布（在线数 ' + data.filter((x: any) => x.isOnline == 1).length + '）',
      subtext: 'iot platform',
      textStyle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtextStyle: {
        color: '#999',
      },
      top: 15,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        if (params.componentSubType === 'scatter' || params.componentSubType === 'effectScatter') {
          let htmlStr = '<div style="padding:5px;line-height:28px;">';
          htmlStr += "设备名称： <span style='color:#409EFF'>" + params.data.deviceName + '</span><br />';
          htmlStr += '设备创建时间： ' + timestampToDateStr(params.data.createdTime) + '<br />';
          htmlStr += '设备状态： ';
          if (params.data.firstLogin === '0') {
            htmlStr += "<span style='color:#E6A23C'>未激活</span>" + '<br />';
          } else if (params.data.isOnline == 1) {
            htmlStr += "<span style='color:#67C23A'>在线</span>" + '<br />';
          } else if (params.data.isOnline == 2) {
            htmlStr += "<span style='color:#909399'>离线</span>" + '<br />';
          }
          htmlStr += '产品ID： ' + params.data.productID + '<br />';
          htmlStr += '产品名称： ' + params.data.productName + '<br />';
          htmlStr += '设备位置： ' + params.data.address + '<br />';
          htmlStr += '激活时间： ' + timestampToDateStr(params.data.firstLogin) + '<br />';
          htmlStr += '最后上线时间： ' + timestampToDateStr(params.data.lastLogin) + '<br />';
          htmlStr += '固件版本： ' + params.data.version + '<br />';
          htmlStr += '</div>';
          return htmlStr;
        }
        // 省份tooltip
        if (params.componentType === 'geo') {
          const count = provinceData[params.name] || 0;
          return `${params.name}<br/>设备数量: ${count}`;
        }
        return params.name;
      },
    },
    // visualMap 已隐藏 - 用户不需要显示
    geo: {
      map: 'china',
      roam: true,
      zoom: mapViewConfig.zoom,  // 使用计算的缩放级别
      center: mapViewConfig.center,  // 使用计算的中心点
      scaleLimit: {
        min: 0.8,
        max: 10,
      },
      label: {
        show: true,
        color: '#000',
        fontSize: 10,
        emphasis: {
          show: true,
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      itemStyle: {
        areaColor: '#e8f4f8',  // 更浅的蓝灰色底色
        borderColor: '#0088cc', // 更鲜艳的蓝色边界
        borderWidth: 1.5,
        shadowColor: 'rgba(0, 136, 204, 0.3)',
        shadowBlur: 8,
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          areaColor: '#4fc3f7',  // 明亮的天蓝色
          borderColor: '#0088cc',
          borderWidth: 2,
          shadowColor: 'rgba(0, 136, 204, 0.6)',
          shadowBlur: 15,
        },
      },
      select: {
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          areaColor: '#29b6f6',  // 中等蓝色
          borderColor: '#0088cc',
          borderWidth: 2,
        },
      },
      // 添加周边区域背景
      regions: [
        {
          name: 'background',
          itemStyle: {
            areaColor: '#f5f5f5',  // 浅灰色背景
            borderColor: '#ddd',
            borderWidth: 0,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#f5f5f5',
            },
          },
        },
      ],
    },
    series: [
      {
        name: '未激活设备',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data, 3),
        symbolSize: 12,  // 稍微缩小
        zlevel: 2,
        z: 2,
        itemStyle: {
          color: '#F57C00',  // 深橙色（降低亮度）
          shadowBlur: 8,
          shadowColor: 'rgba(245, 124, 0, 0.5)',
        },
        emphasis: {
          scale: true,
          itemStyle: {
            shadowBlur: 15,
            color: '#E65100',
          },
        },
      },
      {
        name: '离线设备',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data, 2),
        symbolSize: 12,
        zlevel: 2,
        z: 2,
        itemStyle: {
          color: '#616161',  // 深灰色
          shadowBlur: 6,
          shadowColor: 'rgba(97, 97, 97, 0.5)',
        },
        emphasis: {
          scale: true,
          itemStyle: {
            shadowBlur: 12,
            color: '#424242',
          },
        },
      },
      {
        name: '在线设备',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data, 1),
        symbolSize: 13,  // 缩小尺寸
        zlevel: 2,
        z: 3,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',  // 改回描边式，更柔和
          scale: 3.5,  // 减小波纹范围
          period: 4,  // 放慢速度
        },
        label: {
          show: false,
        },
        itemStyle: {
          color: '#4CAF50',  // 标准绿色（降低亮度）
          shadowBlur: 10,  // 减弱发光
          shadowColor: 'rgba(76, 175, 80, 0.6)',  // 降低透明度
          borderColor: '#388E3C',
          borderWidth: 1.5,
        },
        emphasis: {
          scale: true,
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(76, 175, 80, 0.8)',
            color: '#66BB6A',
          },
        },
      },
    ],
  };

  // 地图点击事件：只处理设备点位点击，不进行下钻
  const handleMapClick = async (params: any) => {
    // 如果点击的是设备点位，跳转到设备详情页
    if (params.data && params.data.productID) {
      history.push(
        '/deviceMangers/device/detail/' +
          params.data.productID +
          '/' +
          params.data.deviceName +
          '/1',
      );
      return;
    }

    // 禁用地图下钻功能 - 用户不需要
    // 点击省份不做任何操作
  };

  // 返回功能已禁用
  const handleMapBack = async () => {
    // 功能已禁用
  };

  const clickHandle = handleMapClick;

  if (!mapLoaded) {
    return (
      <div className={styles.map} style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: '#999' }}>正在加载地图数据...</div>
          <div style={{ fontSize: 12, color: '#ccc', marginTop: 8 }}>请稍候，正在尝试多个数据源</div>
        </div>
      </div>
    );
  }

  if (mapLoadError) {
    return (
      <div className={styles.map} style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: '#f56c6c', marginBottom: 8 }}>地图数据加载失败</div>
          <div style={{ fontSize: 14, color: '#999' }}>无法从CDN加载地图数据，请检查网络连接</div>
          <div style={{ fontSize: 12, color: '#ccc', marginTop: 8 }}>或查看浏览器控制台了解详细错误信息</div>
        </div>
      </div>
    );
  }

  return (
    <div id="map" style={{
      width: '100%',
      height: '70vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%)',  // 渐变背景填充空白
    }}>
      {/* 返回按钮 - 当不在中国地图时显示 */}
      {mapStack.length > 0 && (
        <div
          onClick={handleMapBack}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            zIndex: 1000,
            background: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f0f0';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }}
        >
          <span style={{ fontSize: '16px' }}>←</span>
          <span>返回上一级</span>
          <span style={{ color: '#999', fontSize: '12px' }}>({mapStack[mapStack.length - 1]?.name})</span>
        </div>
      )}
      {/* 当前位置提示 */}
      {currentMap.name !== 'china' && (
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#666',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          当前：{currentMap.name}
        </div>
      )}
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        className={styles.map}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'canvas' }}
        onEvents={{ click: clickHandle }}
      />
    </div>
  );
};

export default DeviceMap;
