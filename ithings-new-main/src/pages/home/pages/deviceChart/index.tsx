import { Col, Row } from 'antd';
import type { DeviceStatic } from '../../data';
import { Input } from 'antd';
import { Button,Modal } from 'antd';
import React, { useState } from 'react';

interface DeviceChartProps {
  data?: DeviceStatic;
}

const DeviceChart: React.FC<DeviceChartProps> = ({ data }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Row gutter={20} style={{ marginTop: '20px' }}>
      <Col span={24}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>资源地点</span>
            <Input style={{width:'200px'}} placeholder="请输入资源地点" />
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>资源IP</span>
            <Input style={{width:'200px'}} placeholder="请输入资源IP" />
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>内存资源</span>
            <Input style={{width:'200px'}} placeholder="请输入内存" />
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>带宽</span>
            <Input style={{width:'200px'}} placeholder="请输入带宽" />
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>CPU核数</span>
            <Input style={{width:'200px'}} placeholder="请输入CPU核数" />
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>磁盘</span>
            <Input style={{width:'200px'}} placeholder="请输入磁盘" />
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>GPU核数</span>
            <Input style={{width:'200px'}} placeholder="请输入GPU核数" />
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <span style={{display:'inline-block',width:'80px',textAlign:'right',marginRight:'12px'}}>维护时间</span>
            <Input style={{width:'200px'}} placeholder="请输入维护时间" />
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '30px',
          width: '100%'
        }}>
          <Button type="primary">节点并网</Button>
          <Button type="primary" onClick={showModal}>资源压测</Button>
        </div>
      </Col>
    </Row>

    <Modal title="资源压测" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
           width={600} >
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>地域名称</span>
                <Input style={{width:'150px'}}  value={'山西运城'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>运营商</span>
                <Input style={{width:'150px'}}  value={'电信'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>专线/汇聚</span>
                <Input style={{width:'150px'}}  value={'汇聚'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>公网/内网</span>
                <Input style={{width:'150px'}}  value={'内网'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>网络类型</span>
                <Input style={{width:'150px'}}  value={'服务器拨号'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>上报带宽</span>
                <Input style={{width:'150px'}}  value={'66.00Mbps'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>极限压测</span>
                <Input style={{width:'150px'}}  value={'3170.4Mbps'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>平均压测</span>
                <Input style={{width:'150px'}}  value={'3134.23Mbps'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>压测满意度</span>
                <Input style={{width:'150px'}}  value={'75%'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>丢包满意度</span>
                <Input style={{width:'150px'}}  value={'23%'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>TCP重传率</span>
                <Input style={{width:'150px'}}  value={'4.4'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>cpu线程数</span>
                <Input style={{width:'150px'}}  value={'23'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>cpu主频</span>
                <Input style={{width:'150px'}}  value={'4hz'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>内存大小</span>
                <Input style={{width:'150px'}}  value={'233G'}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'20px'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>平均QPS</span>
                <Input style={{width:'150px'}}  value={'573'}/>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{display:'inline-block',width:'90px',textAlign:'right',marginRight:'12px'}}>数据量</span>
                <Input style={{width:'150px'}}  value={'3.5TB'}/>
              </div>
            </div>
      </Modal>
    </>
  );
};

export default DeviceChart;
