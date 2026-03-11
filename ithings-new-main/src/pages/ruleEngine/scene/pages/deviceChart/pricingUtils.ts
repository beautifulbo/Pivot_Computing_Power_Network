import { ResourceInputs, PricingBreakdown, AlgorithmType, GameTheoryParams } from './types';

// 算法加成系数
export const ALGORITHM_MULTIPLIERS: Record<AlgorithmType, number> = {
  // 基础策略
  quality: 1.5,          // 质量优先: +50%
  balanced: 1.2,         // 均衡调度: +20%
  cost: 1.0,             // 价格优先: 基准价格
  // 博弈策略
  threeStage: 1.15,      // 三阶段博弈: +15%
  stackelberg: 1.25,     // Stackelberg博弈: +25%
  incomplete: 1.18,      // 不完全信息博弈: +18%
};

// 资源单价配置（每月）- 贴近2024-2025市场价格
const RESOURCE_PRICES = {
  cpu: 18,           // ¥18/核/月 (参考阿里云/腾讯云均价)
  memory: 8,         // ¥8/GB/月 (参考主流云服务商)
  disk: 0.8,         // ¥0.8/GB/月 (SSD云盘价格)
  bandwidth: 30,     // ¥30/Mbps/月 (按流量计费转包月估算)
  gpu: 1800,         // ¥1,800/GPU/月 (T4 GPU参考价)
};

/**
 * 计算基础资源费用
 */
export const calculateBasePrice = (inputs: ResourceInputs): number => {
  const cpuPrice = (inputs.cpu || 0) * RESOURCE_PRICES.cpu;
  const memoryPrice = (inputs.memory || 0) * RESOURCE_PRICES.memory;
  const diskPrice = (inputs.disk || 0) * RESOURCE_PRICES.disk;
  const bandwidthPrice = (inputs.bandwidth || 0) * RESOURCE_PRICES.bandwidth;
  const gpuPrice = (inputs.gpu || 0) * RESOURCE_PRICES.gpu;

  return cpuPrice + memoryPrice + diskPrice + bandwidthPrice + gpuPrice;
};

/**
 * 计算时延保障费用（仅质量优先算法）
 */
export const calculateLatencyFee = (latency: number, algorithm: AlgorithmType): number => {
  if (algorithm !== 'quality' || !latency) {
    return 0;
  }

  if (latency < 10) {
    return 200;  // <10ms: +¥200/月 (超低延迟保障)
  } else if (latency < 50) {
    return 80;   // 10-50ms: +¥80/月 (低延迟保障)
  }

  return 0;  // >50ms: 无额外费用
};

/**
 * 计算峰值保障费用（仅质量优先算法）
 */
export const calculatePeakSurcharge = (
  algorithm: AlgorithmType,
  basePrice: number
): number => {
  return algorithm === 'quality' ? basePrice * 0.1 : 0;
};

/**
 * 计算博弈策略额外费用 (Mock 模拟)
 * @param algorithm 博弈策略类型
 * @param basePrice 基础价格
 * @param gameParams 博弈参数（可选）
 */
export const calculateGameTheoryFee = (
  algorithm: AlgorithmType,
  basePrice: number,
  gameParams?: GameTheoryParams
): number => {
  // 只对博弈策略计算额外费用
  if (!['threeStage', 'stackelberg', 'incomplete'].includes(algorithm)) {
    return 0;
  }

  if (!gameParams) {
    return 0;
  }

  let fee = 0;

  // Mock 计算逻辑（模拟博弈策略的额外成本）
  switch (algorithm) {
    case 'threeStage':
      // 三阶段博弈：考虑提供者数量和维护成本
      // 基础费用 + 动态调整费用
      fee = gameParams.maintenanceCost * 0.15 +
            gameParams.providerCount * 8 +
            Math.max(basePrice * 0.05, 50); // 即使basePrice为0也有最低费用
      break;

    case 'stackelberg':
      // Stackelberg博弈：领导者溢价 + 数据传输成本 + 协调成本
      fee = Math.max(basePrice * 0.08, 100) +
            gameParams.dataTransferPrice * 80 +
            gameParams.providerCount * 10;
      break;

    case 'incomplete':
      // 不完全信息博弈：拥塞风险补偿 + 信息获取成本
      const congestionCost = Math.max(basePrice * gameParams.congestionFactor * 0.2, 60);
      const infoAcquisitionCost = gameParams.providerCount * 15; // 信息获取成本
      fee = congestionCost + infoAcquisitionCost;
      break;

    default:
      fee = 0;
  }

  return Math.max(0, fee); // 确保费用非负
};

/**
 * 计算总价及价格明细
 */
export const calculateTotalPrice = (
  inputs: ResourceInputs,
  selectedAlgorithm: AlgorithmType,
  gameParams?: GameTheoryParams
): PricingBreakdown => {
  const basePrice = calculateBasePrice(inputs);
  const algorithmMultiplier = ALGORITHM_MULTIPLIERS[selectedAlgorithm];
  const latencyFee = calculateLatencyFee(inputs.latency, selectedAlgorithm);
  const peakSurcharge = calculatePeakSurcharge(selectedAlgorithm, basePrice);
  const gameTheoryFee = calculateGameTheoryFee(selectedAlgorithm, basePrice, gameParams);

  const subtotal = basePrice * algorithmMultiplier;
  const total = subtotal + latencyFee + peakSurcharge + gameTheoryFee;

  return {
    basePrice,
    algorithmMultiplier,
    latencyFee,
    peakSurcharge: peakSurcharge + gameTheoryFee, // 合并峰值费用和博弈费用
    subtotal,
    total,
  };
};

/**
 * 格式化价格显示
 */
export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};
