import { Card, Col, Row } from 'antd';
import { useMemo, useState } from 'react';
import { mockDeviceCountData } from '@/utils/mockData';
import DeviceChart from './pages/deviceChart/index';
import DeviceCount from './pages/deviceCount/index';
import Pie from './pages/echarts/index';
import MyChart from "./pages/feixian/feixian";

const IndexPage = () => {
  // 使用模拟数据
  const data = mockDeviceCountData;

  // 创建一个状态来保存飞线数据
  const [flyLineData, setFlyLineData] = useState([]);

  // 创建一个方法来更新飞线数据
  const addFlyLine = (newLine: any) => {
    setFlyLineData((prevData) => [...prevData, newLine]);
  };

  const deviceTotal = useMemo(() => {
    return (
      (data?.data.deviceCount.unknown || 0) +
      (data?.data.deviceCount.inactive || 0) +
      (data?.data.deviceCount.offline || 0) +
      (data?.data.deviceCount.online || 0) || 0
    );
  }, [data?.data]);

  return (
    <Card>
      <Row gutter={26}>
        <Col span={14}>
          {/*<DeviceMap />*/}
          <MyChart flyLineData={flyLineData} />
        </Col>
        <Col span={10}>
          <div style={{ height: '85vh', overflow: 'auto' }}>
            <DeviceCount data={data?.data} deviceTotal={deviceTotal} />
            <Pie />
            <DeviceChart data={data?.data} addFlyLine={addFlyLine}/>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default IndexPage;
