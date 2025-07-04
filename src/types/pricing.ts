
export type PricingStrategyStatus = '编辑中' | '生效中' | '已完成' | '已暂停' | '已下线';

export type SKUType = 
  | '大会员包月'
  | '大会员包季' 
  | '大会员包年'
  | '超大包月'
  | '超大包季'
  | '超大包年'
  | '[联合会员]大会员xQQ连续包月'
  | '[联合会员]大会员xQ音连续包月';

export type PricingType = 'manual' | 'algorithm';

export interface PriceLimit {
  price: number;
  limit: number;
}

export interface RedPacketConfig {
  showAnimation: boolean;
  validityMinutes?: number;
  displayFrequency?: string;
}

export interface BundleConfig {
  hasBundle: boolean;
  giftType?: '商品' | '道具' | '道具包';
  giftIds?: string[];
}

export interface ContractStrategy {
  period: number; // 首x次
  price: number; // 签约价
  rewardId?: string; // 奖励道具包ID（选填）
}

export interface ContractConfig {
  hasContract: boolean;
  strategies: ContractStrategy[];
}

export interface PricingStrategy {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  skuType: SKUType;
  pricingType: PricingType;
  fixedPrice?: number;
  priceRange?: [number, number];
  totalPurchaseLimit: number;
  priceLimits: PriceLimit[];
  redPacket: RedPacketConfig;
  bundle: BundleConfig;
  contract: ContractConfig;
  creator: string;
  status: PricingStrategyStatus;
  createdAt: string;
  updatedAt: string;
}
