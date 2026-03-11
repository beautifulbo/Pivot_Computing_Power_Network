import { Card, Col, Row } from 'antd';
import { useMemo } from 'react';
import { mockDeviceCountData } from '@/utils/mockData';
import DeviceChart from './pages/deviceChart/index';
import DeviceCount from './pages/deviceCount/index';
import DeviceMap from './pages/deviceMap/index';
import Pie from './pages/echarts/index';

const IndexPage = () => {
  // 使用模拟数据
  const data = mockDeviceCountData;

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
          <DeviceMap />
        </Col>
        <Col span={10}>
          <div style={{
            height: '100%',
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
            overflowX: 'auto',
            paddingBottom: '20px'
          }}>
            <DeviceCount data={data?.data} deviceTotal={deviceTotal} />
            <Pie />
            <div style={{ minWidth: '600px' }}>
              <DeviceChart data={data?.data} />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default IndexPage;
