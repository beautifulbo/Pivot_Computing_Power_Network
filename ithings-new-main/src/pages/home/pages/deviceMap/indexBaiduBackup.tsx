import ReactEChartsCore from 'echarts-for-react/lib/core';
import { EffectScatterChart, ScatterChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useMemo, useEffect, useRef } from 'react';
import { history } from 'umi';
import { mockDeviceListData, mockProductListData } from '@/utils/mockData';

import 'echarts/extension/bmap/bmap';

import type { DeviceStatic } from '@/pages/home/data';
import type { DEVICE_INFO } from '@/utils/const';
import type { EffectScatterSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import type { TitleComponentOption, TooltipComponentOption } from 'echarts/components';

import { timestampToDateStr } from '@/utils/date';
import styles from './index.less';

echarts.use([
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | ScatterSeriesOption | EffectScatterSeriesOption
>;

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
  // 使用模拟数据
  const deviceList = mockDeviceListData.data.list;
  const productList = mockProductListData.data.list;
  const chartRef = useRef<any>(null);

  // 监听窗口变化，重新调整地图大小
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const instance = chartRef.current.getEchartsInstance();
        if (instance) {
          instance.resize();
          // 强制百度地图重绘
          const bmap = instance.getModel().getComponent('bmap').getBMap();
          if (bmap) {
            setTimeout(() => {
              bmap.reset();
            }, 100);
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // 初始化时也调用一次
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
    const res: Omit<DeviceListProps, 'position'>[] = [];
    for (let i = 0; i < list?.length; i++) {
      const geoCoord = [list[i].position.longitude, list[i].position.latitude];
      if (geoCoord && list[i].isOnline === status) {
        res.push({
          deviceName: list[i].deviceName,
          value: geoCoord,
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

  const option: EChartsOption = {
    title: {
      text: '设备分布（在线数 ' + data.filter((x: any) => x.isOnline == 1).length + '）',
      subtext: 'iot platform',
      textStyle: {
        color: '#333',
      },
      top: 10,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        let htmlStr = '<div style="padding:5px;line-height:28px;">';
        htmlStr +=
          "设备名称： <span style='color:#409EFF'>" + params.data.deviceName + '</span><br />';
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
      },
    },
    bmap: {
      center: [105, 38],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#B4E4FF',
            },
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#F3F3F3',
            },
          },
          {
            featureType: 'boundary',
            elementType: 'geometry',
            stylers: {
              color: '#888888',
            },
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              color: '#FDCC8A',
            },
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#FDCC8A',
            },
          },
          {
            featureType: 'highway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#333333',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#FFEAA7',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#FFEAA7',
            },
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#D4F1C5',
            },
          },
          {
            featureType: 'building',
            elementType: 'geometry',
            stylers: {
              color: '#DDDDDD',
            },
          },
          {
            featureType: 'building',
            elementType: 'geometry.topfill',
            stylers: {
              color: '#CCCCCC',
            },
          },
          {
            featureType: 'building',
            elementType: 'geometry.sidefill',
            stylers: {
              color: '#DDDDDD',
            },
          },
          {
            featureType: 'building',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#AAAAAA',
            },
          },
          {
            featureType: 'label',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#333333',
            },
          },
          {
            featureType: 'label',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#FFFFFF',
            },
          },
          {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: {
              visibility: 'on',
            },
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#333333',
            },
          },
        ],
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 3),
        symbolSize: 15,
        itemStyle: {
          color: '#E6A23C',
        },
      },
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 2),
        symbolSize: 15,
        itemStyle: {
          color: '#909399',
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 1),
        symbolSize: 15,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 5,
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        itemStyle: {
          color: '#67C23A',
          shadowBlur: 100,
          shadowColor: '#333',
        },
        zlevel: 1,
      },
    ],
  };

  const getOption = () => option;

  const clickHandle = (params: any) => {
    if (params.data.productID) {
      history.push(
        '/deviceMangers/device/detail/' +
          params.data.productID +
          '/' +
          params.data.deviceName +
          '/1',
      );
    }
  };

  return (
    <div id="map" style={{ width: '100%', height: '70vh' }}>
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={getOption()}
        lazyUpdate={true}
        notMerge={true}
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
