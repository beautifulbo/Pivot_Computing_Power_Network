import React, { useState } from 'react';
import { Card, Radio, Space, Tag, Typography, Row, Col, Tabs } from 'antd';
import {
  ThunderboltOutlined,
  SyncOutlined,
  DollarOutlined,
  ExperimentOutlined,
  TeamOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import type { AlgorithmType, AlgorithmConfig } from '../types';
import './AlgorithmSelector.less';

const { Title, Text } = Typography;

interface AlgorithmSelectorProps {
  value: AlgorithmType;
  onChange: (value: AlgorithmType) => void;
}

// 基础策略配置
const BASIC_ALGORITHMS: AlgorithmConfig[] = [
  {
    key: 'quality',
    title: '质量优先',
    description: '高性能机器,低延迟',
    features: ['服务质量高', '延迟低', '价格较高'],
    icon: <ThunderboltOutlined />,
    category: 'basic',
  },
  {
    key: 'balanced',
    title: '均衡调度',
    description: '性能价格平衡',
    features: ['适用性广', '中等价格', '推荐选择'],
    icon: <SyncOutlined />,
    recommended: true,
    category: 'basic',
  },
  {
    key: 'cost',
    title: '价格优先',
    description: '成本最优,批处理',
    features: ['价格低', '批处理优选', '离线任务'],
    icon: <DollarOutlined />,
    category: 'basic',
  },
];

// 博弈策略配置
const GAME_THEORY_ALGORITHMS: AlgorithmConfig[] = [
  {
    key: 'threeStage',
    title: '三阶段博弈',
    description: '支持三阶段调度博弈',
    features: ['多阶段优化', '动态调整', '适应性强'],
    icon: <ExperimentOutlined />,
    category: 'gameTheory',
  },
  {
    key: 'stackelberg',
    title: 'Stackelberg博弈',
    description: '领导者-跟随者模型',
    features: ['层级博弈', '策略优化', '收益最大'],
    icon: <TeamOutlined />,
    recommended: true,
    category: 'gameTheory',
  },
  {
    key: 'incomplete',
    title: '不完全信息博弈',
    description: '考虑信息不对称',
    features: ['信息优化', '风险控制', '鲁棒性好'],
    icon: <SafetyOutlined />,
    category: 'gameTheory',
  },
];


const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ value, onChange }) => {
  // 渲染算法卡片组
  const renderAlgorithmCards = (algorithms: AlgorithmConfig[]) => (
    <Row gutter={16}>
      {algorithms.map((algorithm) => (
        <Col span={8} key={algorithm.key}>
          <Card
            hoverable
            className={`algorithm-card ${value === algorithm.key ? 'selected' : ''}`}
            onClick={() => onChange(algorithm.key)}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
              <div className="algorithm-icon" style={{ fontSize: 36, color: '#2F54EB' }}>
                {algorithm.icon}
              </div>

              <div>
                <Title level={5} style={{ marginBottom: 4 }}>
                  {algorithm.title}
                  {algorithm.recommended && (
                    <Tag color="blue" style={{ marginLeft: 8 }}>推荐</Tag>
                  )}
                </Title>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {algorithm.description}
                </Text>
              </div>

              <Space direction="vertical" size={4}>
                {algorithm.features.map((feature, index) => (
                  <Tag key={index} color={value === algorithm.key ? 'blue' : 'default'}>
                    {feature}
                  </Tag>
                ))}
              </Space>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="algorithm-selection-container">
      <Tabs
        defaultActiveKey="basic"
        centered
        items={[
          {
            key: 'basic',
            label: (
              <Space>
                <ThunderboltOutlined />
                基础调度策略
              </Space>
            ),
            children: renderAlgorithmCards(BASIC_ALGORITHMS),
          },
          {
            key: 'gameTheory',
            label: (
              <Space>
                <ExperimentOutlined />
                博弈调度策略
              </Space>
            ),
            children: renderAlgorithmCards(GAME_THEORY_ALGORITHMS),
          },
        ]}
      />
    </div>
  );
};

export default AlgorithmSelector;
