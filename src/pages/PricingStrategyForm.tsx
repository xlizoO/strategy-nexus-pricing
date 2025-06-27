
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PricingStrategy, SKUType, PriceLimit } from "@/types/pricing";
import { toast } from "@/hooks/use-toast";

const SKU_OPTIONS: SKUType[] = [
  '大会员包月', '大会员包季', '大会员包年',
  '超大包月', '超大包季', '超大包年',
  '[联合会员]大会员xQQ连续包月', '[联合会员]大会员xQ音连续包月'
];

const PricingStrategyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;
  const copyFrom = location.state?.copyFrom as PricingStrategy;

  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    skuType: '' as SKUType,
    pricingType: 'manual' as 'manual' | 'algorithm',
    fixedPrice: '',
    minPrice: '',
    maxPrice: '',
    totalPurchaseLimit: '',
    priceLimits: [] as PriceLimit[],
    showRedPacket: true,
    redPacketMinutes: '',
    redPacketFrequency: '',
    hasBundle: false,
    giftType: '商品' as '商品' | '道具' | '道具包',
    giftIds: ['']
  });

  useEffect(() => {
    if (copyFrom) {
      setFormData({
        name: copyFrom.name + ' (复制)',
        startTime: copyFrom.startTime,
        endTime: copyFrom.endTime,
        skuType: copyFrom.skuType,
        pricingType: copyFrom.pricingType,
        fixedPrice: copyFrom.fixedPrice?.toString() || '',
        minPrice: copyFrom.priceRange?.[0]?.toString() || '',
        maxPrice: copyFrom.priceRange?.[1]?.toString() || '',
        totalPurchaseLimit: copyFrom.totalPurchaseLimit === -1 ? '' : copyFrom.totalPurchaseLimit.toString(),
        priceLimits: copyFrom.priceLimits,
        showRedPacket: copyFrom.redPacket.showAnimation,
        redPacketMinutes: copyFrom.redPacket.validityMinutes?.toString() || '',
        redPacketFrequency: copyFrom.redPacket.displayFrequency || '',
        hasBundle: copyFrom.bundle.hasBundle,
        giftType: copyFrom.bundle.giftType || '商品',
        giftIds: copyFrom.bundle.giftIds || ['']
      });
    }
  }, [copyFrom]);

  const handleSave = () => {
    if (!formData.name || !formData.startTime || !formData.endTime || !formData.skuType) {
      toast({ title: "错误", description: "请填写必填字段", variant: "destructive" });
      return;
    }

    toast({ 
      title: isEdit ? "更新成功" : "创建成功", 
      description: `价格策略 "${formData.name}" ${isEdit ? '已更新' : '已创建'}` 
    });
    navigate('/pricing-strategies');
  };

  const handleCancel = () => {
    navigate('/pricing-strategies');
  };

  const addPriceLimit = () => {
    setFormData(prev => ({
      ...prev,
      priceLimits: [...prev.priceLimits, { price: 0, limit: 0 }]
    }));
  };

  const removePriceLimit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      priceLimits: prev.priceLimits.filter((_, i) => i !== index)
    }));
  };

  const updatePriceLimit = (index: number, field: keyof PriceLimit, value: number) => {
    setFormData(prev => ({
      ...prev,
      priceLimits: prev.priceLimits.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addGiftId = () => {
    setFormData(prev => ({
      ...prev,
      giftIds: [...prev.giftIds, '']
    }));
  };

  const removeGiftId = (index: number) => {
    setFormData(prev => ({
      ...prev,
      giftIds: prev.giftIds.filter((_, i) => i !== index)
    }));
  };

  const updateGiftId = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      giftIds: prev.giftIds.map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/pricing-strategies')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回列表
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? '编辑' : '创建'}价格策略
            </h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">价格策略名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="连续包月-15元-赠网易云月卡"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">开始时间 *</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">结束时间 *</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>SKU类型 *</Label>
                <Select value={formData.skuType} onValueChange={(value) => setFormData(prev => ({ ...prev, skuType: value as SKUType }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择SKU类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKU_OPTIONS.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 售卖价格 */}
          <Card>
            <CardHeader>
              <CardTitle>售卖价格</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={formData.pricingType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, pricingType: value as 'manual' | 'algorithm' }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">运营出价</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="algorithm" id="algorithm" />
                  <Label htmlFor="algorithm">算法出价</Label>
                </div>
              </RadioGroup>

              {formData.pricingType === 'manual' ? (
                <div>
                  <Label htmlFor="fixedPrice">固定价格</Label>
                  <Input
                    id="fixedPrice"
                    type="number"
                    value={formData.fixedPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, fixedPrice: e.target.value }))}
                    placeholder="请输入价格"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minPrice">最低价</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={formData.minPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                      placeholder="请输入最低价"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice">最高价</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                      placeholder="请输入最高价"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 用户限购 */}
          <Card>
            <CardHeader>
              <CardTitle>用户限购</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalLimit">总购买次数限制</Label>
                <Input
                  id="totalLimit"
                  type="number"
                  value={formData.totalPurchaseLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalPurchaseLimit: e.target.value }))}
                  placeholder="-1代表不限制"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>分档限购</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPriceLimit}>
                    <Plus className="w-4 h-4 mr-1" />
                    添加档位
                  </Button>
                </div>
                
                {formData.priceLimits.map((priceLimit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={priceLimit.price}
                      onChange={(e) => updatePriceLimit(index, 'price', Number(e.target.value))}
                      placeholder="价格"
                      className="flex-1"
                    />
                    <span>元</span>
                    <Input
                      type="number"
                      value={priceLimit.limit}
                      onChange={(e) => updatePriceLimit(index, 'limit', Number(e.target.value))}
                      placeholder="限购次数"
                      className="flex-1"
                    />
                    <span>次/人</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removePriceLimit(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 限时红包 */}
          <Card>
            <CardHeader>
              <CardTitle>限时红包</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showRedPacket"
                  checked={formData.showRedPacket}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showRedPacket: !!checked }))}
                />
                <Label htmlFor="showRedPacket">展示红包动效</Label>
              </div>

              {formData.showRedPacket && (
                <div className="space-y-4 pl-6">
                  <div>
                    <Label htmlFor="redPacketMinutes">红包有效期（分钟）</Label>
                    <Input
                      id="redPacketMinutes"
                      type="number"
                      value={formData.redPacketMinutes}
                      onChange={(e) => setFormData(prev => ({ ...prev, redPacketMinutes: e.target.value }))}
                      placeholder="请输入有效期"
                    />
                  </div>
                  <div>
                    <Label htmlFor="redPacketFrequency">红包展示频次</Label>
                    <Input
                      id="redPacketFrequency"
                      value={formData.redPacketFrequency}
                      onChange={(e) => setFormData(prev => ({ ...prev, redPacketFrequency: e.target.value }))}
                      placeholder="如：3次/每天 或 每周"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 搭售买赠 */}
          <Card>
            <CardHeader>
              <CardTitle>搭售买赠</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasBundle"
                  checked={formData.hasBundle}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasBundle: !!checked }))}
                />
                <Label htmlFor="hasBundle">有搭售策略</Label>
              </div>

              {formData.hasBundle && (
                <div className="space-y-4 pl-6">
                  <div>
                    <Label>赠品类型</Label>
                    <Select value={formData.giftType} onValueChange={(value) => setFormData(prev => ({ ...prev, giftType: value as '商品' | '道具' | '道具包' }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="商品">商品</SelectItem>
                        <SelectItem value="道具">道具</SelectItem>
                        <SelectItem value="道具包">道具包</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>赠品发放ID</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addGiftId}>
                        <Plus className="w-4 h-4 mr-1" />
                        添加ID
                      </Button>
                    </div>
                    
                    {formData.giftIds.map((giftId, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                          value={giftId}
                          onChange={(e) => updateGiftId(index, e.target.value)}
                          placeholder="请输入赠品ID"
                          className="flex-1"
                        />
                        {formData.giftIds.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeGiftId(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingStrategyForm;
