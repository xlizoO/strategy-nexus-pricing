
import { PricingStrategy } from "@/types/pricing";

export const mockPricingStrategies: PricingStrategy[] = [
  {
    id: "PS001",
    name: "连续包月-15元-赠网易云月卡",
    startTime: "2024-01-01T00:00:00",
    endTime: "2024-12-31T23:59:59",
    skuType: "大会员包月",
    pricingType: "manual",
    fixedPrice: 15,
    totalPurchaseLimit: 5,
    priceLimits: [
      { price: 15, limit: 3 },
      { price: 12, limit: 2 }
    ],
    redPacket: {
      showAnimation: true,
      validityMinutes: 30,
      displayFrequency: "3次/每天"
    },
    bundle: {
      hasBundle: true,
      giftType: "商品",
      giftIds: ["NETEASE_MUSIC_MONTH"]
    },
    contract: {
      hasContract: false,
      strategies: []
    },
    creator: "张三",
    status: "生效中",
    createdAt: "2024-01-01T08:00:00",
    updatedAt: "2024-01-01T08:00:00"
  },
  {
    id: "PS002",
    name: "大会员包年-算法出价-限时优惠",
    startTime: "2024-02-01T00:00:00",
    endTime: "2024-02-29T23:59:59",
    skuType: "大会员包年",
    pricingType: "algorithm",
    priceRange: [120, 180],
    totalPurchaseLimit: -1,
    priceLimits: [],
    redPacket: {
      showAnimation: false
    },
    bundle: {
      hasBundle: false
    },
    contract: {
      hasContract: false,
      strategies: []
    },
    creator: "李四",
    status: "编辑中",
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-15T10:30:00"
  },
  {
    id: "PS003",
    name: "超大包季-联合会员优惠",
    startTime: "2024-03-01T00:00:00",
    endTime: "2024-03-31T23:59:59",
    skuType: "超大包季",
    pricingType: "manual",
    fixedPrice: 45,
    totalPurchaseLimit: 2,
    priceLimits: [
      { price: 45, limit: 1 },
      { price: 50, limit: 1 }
    ],
    redPacket: {
      showAnimation: true,
      validityMinutes: 60,
      displayFrequency: "每周"
    },
    bundle: {
      hasBundle: true,
      giftType: "道具包",
      giftIds: ["PROP_PACK_001", "PROP_PACK_002"]
    },
    contract: {
      hasContract: true,
      strategies: [
        { period: 3, price: 40, rewardId: "REWARD_001" }
      ]
    },
    creator: "王五",
    status: "已暂停",
    createdAt: "2024-02-20T14:15:00",
    updatedAt: "2024-02-25T16:20:00"
  },
  {
    id: "PS004",
    name: "联合会员QQ音乐-新用户专享",
    startTime: "2023-12-01T00:00:00",
    endTime: "2023-12-31T23:59:59",
    skuType: "[联合会员]大会员xQ音连续包月",
    pricingType: "manual",
    fixedPrice: 25,
    totalPurchaseLimit: 1,
    priceLimits: [
      { price: 25, limit: 1 }
    ],
    redPacket: {
      showAnimation: true,
      validityMinutes: 15,
      displayFrequency: "1次/每天"
    },
    bundle: {
      hasBundle: false
    },
    contract: {
      hasContract: false,
      strategies: []
    },
    creator: "赵六",
    status: "已完成",
    createdAt: "2023-11-15T09:00:00",
    updatedAt: "2023-11-15T09:00:00"
  },
  {
    id: "PS005",
    name: "春节特惠-大会员包月",
    startTime: "2024-02-10T00:00:00",
    endTime: "2024-02-17T23:59:59",
    skuType: "大会员包月",
    pricingType: "algorithm",
    priceRange: [8, 12],
    totalPurchaseLimit: 3,
    priceLimits: [
      { price: 8, limit: 1 },
      { price: 10, limit: 1 },
      { price: 12, limit: 1 }
    ],
    redPacket: {
      showAnimation: true,
      validityMinutes: 120,
      displayFrequency: "5次/每天"
    },
    bundle: {
      hasBundle: true,
      giftType: "道具",
      giftIds: ["SPRING_PROP_001"]
    },
    contract: {
      hasContract: false,
      strategies: []
    },
    creator: "孙七",
    status: "已下线",
    createdAt: "2024-01-25T11:30:00",
    updatedAt: "2024-02-18T08:00:00"
  }
];
