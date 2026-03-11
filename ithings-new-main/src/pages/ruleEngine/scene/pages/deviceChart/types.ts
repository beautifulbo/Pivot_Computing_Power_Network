import { ReactNode } from 'react';

// 资源输入参数接口
export interface ResourceInputs {
  cpu: number;      // CPU核数
  memory: number;   // 内存GB
  disk: number;     // 磁盘GB
  bandwidth: number; // 带宽Mbps
  latency: number;  // 时延ms
  gpu: number;      // GPU数量
}

// 价格明细接口
export interface PricingBreakdown {
  basePrice: number;           // 基础资源费用
  algorithmMultiplier: number; // 算法加成系数
  latencyFee: number;          // 时延保障费用
  peakSurcharge: number;       // 峰值保障费用
  subtotal: number;            // 小计（基础费用×系数）
  total: number;               // 总价
}

// 算法类型（基础策略 + 博弈策略）
export type AlgorithmType =
  // 基础策略
  | 'quality'
  | 'balanced'
  | 'cost'
  // 博弈策略
  | 'threeStage'      // 三阶段博弈策略
  | 'stackelberg'     // Stackelberg博弈策略
  | 'incomplete';     // 不完全信息博弈策略

// 算法配置接口
export interface AlgorithmConfig {
  key: AlgorithmType;
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
  recommended?: boolean;
  category?: 'basic' | 'gameTheory'; // 策略分类
}

// 博弈策略参数接口
export interface GameTheoryParams {
  providerCount: number;        // 算力提供者数量（建议2-10个）
  maintenanceCost: number;      // 资源维护成本（¥/月）
  dataTransferPrice: number;    // 数据传输价格（¥/GB）
  congestionFactor: number;     // 拥塞效应损失因子（0-1之间）
}
