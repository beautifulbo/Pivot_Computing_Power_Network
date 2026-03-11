import React from 'react';
import { Card, Form, InputNumber, Tooltip, Space, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { GameTheoryParams } from '../types';
import './GameTheoryParams.less';

const { Title, Text } = Typography;

interface GameTheoryParamsProps {
  value: GameTheoryParams;
  onChange: (value: GameTheoryParams) => void;
}

const GameTheoryParamsComponent: React.FC<GameTheoryParamsProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof GameTheoryParams, newValue: number | null) => {
    onChange({
      ...value,
      [field]: newValue || 0,
    });
  };

  return (
    <Card
      title="🎯 博弈策略参数配置"
      className="game-theory-params"
      bordered
      style={{ marginTop: 16 }}
    >
      <Form layout="vertical">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 算力提供者数量 */}
          <Form.Item
            label={
              <Space>
                <Text strong>算力提供者数量</Text>
                <Tooltip title="参与算力调度的边缘节点或云服务商数量，影响博弈均衡点。建议值：2-10个">
                  <QuestionCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              </Space>
            }
          >
            <InputNumber
              min={1}
              max={20}
              value={value.providerCount}
              onChange={(v) => handleChange('providerCount', v)}
              style={{ width: '100%' }}
              placeholder="请输入算力提供者数量（建议 2-10）"
              addonAfter="个"
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              提供者越多，竞争越激烈，价格可能更优惠
            </Text>
          </Form.Item>

          {/* 资源维护成本 */}
          <Form.Item
            label={
              <Space>
                <Text strong>资源维护成本</Text>
                <Tooltip title="算力节点的运维成本，包括电费、冷却、人力等。影响提供者的利益分配策略。">
                  <QuestionCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              </Space>
            }
          >
            <InputNumber
              min={0}
              value={value.maintenanceCost}
              onChange={(v) => handleChange('maintenanceCost', v)}
              style={{ width: '100%' }}
              placeholder="请输入资源维护成本"
              addonAfter="¥/月"
              precision={2}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              典型范围：100-2000 元/月，根据节点规模而定
            </Text>
          </Form.Item>

          {/* 数据传输价格 */}
          <Form.Item
            label={
              <Space>
                <Text strong>数据传输价格</Text>
                <Tooltip title="边缘节点与用户之间的数据传输单价，影响总成本计算。">
                  <QuestionCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              </Space>
            }
          >
            <InputNumber
              min={0}
              value={value.dataTransferPrice}
              onChange={(v) => handleChange('dataTransferPrice', v)}
              style={{ width: '100%' }}
              placeholder="请输入数据传输价格"
              addonAfter="¥/GB"
              precision={2}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              参考值：0.1-1.5 元/GB（不同地域价格不同）
            </Text>
          </Form.Item>

          {/* 拥塞效应损失因子 */}
          <Form.Item
            label={
              <Space>
                <Text strong>拥塞效应损失因子</Text>
                <Tooltip title="网络拥塞对服务质量的影响系数，0表示无影响，1表示完全拥塞。影响博弈策略优化目标。">
                  <QuestionCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              </Space>
            }
          >
            <InputNumber
              min={0}
              max={1}
              step={0.1}
              value={value.congestionFactor}
              onChange={(v) => handleChange('congestionFactor', v)}
              style={{ width: '100%' }}
              placeholder="请输入拥塞效应因子（0-1）"
              precision={2}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              建议值：0.2-0.5（值越大，系统对拥塞越敏感）
            </Text>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

export default GameTheoryParamsComponent;
