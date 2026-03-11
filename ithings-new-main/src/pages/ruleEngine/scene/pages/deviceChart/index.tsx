import { Col, Row } from 'antd';
import type { DeviceStatic } from '../../data';
import { Input } from 'antd';
import { Button, Modal } from 'antd';
import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import type { AlgorithmType, ResourceInputs, GameTheoryParams } from './types';
import { calculateTotalPrice } from './pricingUtils';
import AlgorithmSelector from './components/AlgorithmSelector';
import PricingDisplay from './components/PricingDisplay';
import GameTheoryParamsComponent from './components/GameTheoryParams';


interface DeviceChartProps {
  data?: DeviceStatic;
}

const DeviceChart: React.FC<DeviceChartProps> = ({ data ,addFlyLine}) => {
  // const deviceTypeOptions = useMemo(() => {
  //   const deviceTypeData = [
  //     {
  //       name: '设备类型',
  //       value: data?.deviceTypeCount.device || 0,
  //     },
  //     {
  //       name: '网关类型',
  //       value: data?.deviceTypeCount.gateway || 0,
  //     },
  //     {
  //       name: '子设备类型数量',
  //       value: data?.deviceTypeCount.subset || 0,
  //     },
  //   ];
  //   return getChartsOption(deviceTypeData, [
  //     'rgba(0, 136, 255, 0.8)',
  //     'rgba(0, 179, 84, 0.8)',
  //     'rgba(255, 183, 0, 0.8)',
  //   ]);
  // }, [data?.deviceTypeCount]);

  // const deviceOnlineOptions = useMemo(() => {
  //   const deviceOnlineData = [
  //     {
  //       name: '在线设备',
  //       value: data?.deviceCount.online || 0,
  //     },
  //     {
  //       name: '离线设备',
  //       value: data?.deviceCount.offline || 0,
  //     },
  //   ];
  //   return getChartsOption(deviceOnlineData, ['#33C35E', '#AAB3B3']);
  // }, [data?.deviceCount]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('balanced');

  // 资源输入状态
  const [resourceInputs, setResourceInputs] = useState<ResourceInputs>({
    cpu: 0,
    memory: 0,
    disk: 0,
    bandwidth: 0,
    latency: 0,
    gpu: 0,
  });

  // 博弈策略参数状态
  const [gameTheoryParams, setGameTheoryParams] = useState<GameTheoryParams>({
    providerCount: 5,           // 默认5个提供者
    maintenanceCost: 500,       // 默认¥500/月
    dataTransferPrice: 0.5,     // 默认¥0.5/GB
    congestionFactor: 0.3,      // 默认0.3
  });

  // 判断是否为博弈策略
  const isGameTheoryAlgorithm = ['threeStage', 'stackelberg', 'incomplete'].includes(selectedAlgorithm);

  // 计算价格（使用useMemo避免重复计算）
  const pricingBreakdown = useMemo(() => {
    return calculateTotalPrice(
      resourceInputs,
      selectedAlgorithm,
      isGameTheoryAlgorithm ? gameTheoryParams : undefined
    );
  }, [resourceInputs, selectedAlgorithm, gameTheoryParams, isGameTheoryAlgorithm]);

  // 输入变更处理
  const handleInputChange = (field: keyof ResourceInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setResourceInputs(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  // const generateNewData = () => {
  //   // 根据需要生成新的数据
  //   // ...
  //   const newData = {
  //     coords: [
  //       [106.3467, 41.4899],
  //       [107.4543, 31.9222],
  //     ],
  //     lineStyle: {color: "#f34e2b"},
  //   }
  //   return newData;
  // };

//   const handleOk = () => {
//     //setIsModalOpen(false);
//     // 创建新的飞线数据
//     const newFlyLine = {
//       // 飞线数据
//       coords: [[106.44744, 29.556489], [118.873019,34.323843]],
//       lineStyle: { color: "#f34e2b" },
//   };
  
//   // 调用传入的addFlyLine方法来更新飞线数据
//   addFlyLine(newFlyLine);

//   // 关闭模态框
//   setIsModalOpen(false);
// };
const handleOk = () => {
  // 创建新的飞线数据
  const newFlyLine = {
    // 飞线数据
    coords: [generateRandomCoord(), generateRandomCoord()],
    lineStyle: { color: "#f34e2b" },
  };
  
  // 调用传入的addFlyLine方法来更新飞线数据
  addFlyLine(newFlyLine);

  // 关闭模态框
  setIsModalOpen(false);
};

// 生成中国地图范围内的随机坐标
const generateRandomCoord = () => {
  const lng = Math.random() * (115.05 - 83.40) + 83.40; // 经度
  const lat = Math.random() * (41.33 - 28.51) + 28.51; // 纬度
  return [lng.toFixed(6), lat.toFixed(6)]; // 保留6位小数
};


  const handleCancel = () => {
    setIsModalOpen(false);
  };
//链接跳转
  //const history = useHistory();

  const handleClick = () => {
    //window.location.href = 'https://www.viesc.com/ymir.html';
    window.location.href = 'https://cn.bing.com/?mkt=zh-cn';
  };

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <span style={{ marginRight: '20px' }}>CPU需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入cpu需求(核)"
              type="number"
              value={resourceInputs.cpu || ''}
              onChange={(e) => handleInputChange('cpu', e.target.value)}
            />
          </div>
          <div>
            <span style={{ marginRight: '20px' }}>带宽需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入带宽需求(Mbps)"
              type="number"
              value={resourceInputs.bandwidth || ''}
              onChange={(e) => handleInputChange('bandwidth', e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <span style={{ marginRight: '20px' }}>内存需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入内存需求(GB)"
              type="number"
              value={resourceInputs.memory || ''}
              onChange={(e) => handleInputChange('memory', e.target.value)}
            />
          </div>
          <div>
            <span style={{ marginRight: '20px' }}>时延需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入时延需求(ms)"
              type="number"
              value={resourceInputs.latency || ''}
              onChange={(e) => handleInputChange('latency', e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <span style={{ marginRight: '20px' }}>磁盘需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入磁盘需求(GB)"
              type="number"
              value={resourceInputs.disk || ''}
              onChange={(e) => handleInputChange('disk', e.target.value)}
            />
          </div>
          <div>
            <span style={{ marginRight: '20px' }}>GPU需求</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入GPU需求(个)"
              type="number"
              value={resourceInputs.gpu || ''}
              onChange={(e) => handleInputChange('gpu', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , marginRight: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <>
            <Button type="primary" onClick={showModal}>
              节点匹配
            </Button>

            <Modal
              title="算法选择与参数配置"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
            >
              <AlgorithmSelector
                value={selectedAlgorithm}
                onChange={setSelectedAlgorithm}
              />

              {/* 博弈策略参数表单（仅博弈策略显示） */}
              {isGameTheoryAlgorithm && (
                <GameTheoryParamsComponent
                  value={gameTheoryParams}
                  onChange={setGameTheoryParams}
                />
              )}

              <PricingDisplay
                pricing={pricingBreakdown}
                algorithm={selectedAlgorithm}
              />
            </Modal>
            
          </>
          
        </div>
        <div style={{ marginRight: '10px' }}> 
        <>
          <Button type="primary" onClick={handleClick}>
              跳转
            </Button>
          </>
          </div>
          </div>
      </Col>
    </Row>
  );
};






export default DeviceChart;
