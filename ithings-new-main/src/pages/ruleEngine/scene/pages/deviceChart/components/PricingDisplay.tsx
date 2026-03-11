import React from 'react';
import { Card, Descriptions, Divider, Statistic, Space } from 'antd';
import type { PricingBreakdown, AlgorithmType } from '../types';
import { formatPrice } from '../pricingUtils';
import './PricingDisplay.less';

interface PricingDisplayProps {
  pricing: PricingBreakdown;
  algorithm: AlgorithmType;
}

const ALGORITHM_NAMES: Record<AlgorithmType, string> = {
  quality: '质量优先',
  balanced: '均衡调度',
  cost: '价格优先',
};

const PricingDisplay: React.FC<PricingDisplayProps> = ({ pricing, algorithm }) => {
  return (
    <Card
      title="💰 价格估算详情"
      className="pricing-display"
      bordered
    >
      <Descriptions column={2} size="small" bordered>
        <Descriptions.Item label="基础资源费用" span={2}>
          {formatPrice(pricing.basePrice)} / 月
        </Descriptions.Item>

        <Descriptions.Item label="算法加成" span={2}>
          {ALGORITHM_NAMES[algorithm]} × {pricing.algorithmMultiplier}
        </Descriptions.Item>

        {pricing.latencyFee > 0 && (
          <Descriptions.Item label="时延保障费用" span={2}>
            + {formatPrice(pricing.latencyFee)} / 月
          </Descriptions.Item>
        )}

        {pricing.peakSurcharge > 0 && (
          <Descriptions.Item label="峰值保障费用" span={2}>
            + {formatPrice(pricing.peakSurcharge)} / 月
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider />

      <div className="final-price">
        <Space direction="vertical" style={{ width: '100%' }} align="center">
          <Statistic
            title="预计月费用"
            value={pricing.total}
            precision={2}
            prefix="¥"
            suffix="/ 月"
            valueStyle={{ color: '#3f8600', fontSize: 32, fontWeight: 'bold' }}
          />
        </Space>
      </div>
    </Card>
  );
};

export default PricingDisplay;
