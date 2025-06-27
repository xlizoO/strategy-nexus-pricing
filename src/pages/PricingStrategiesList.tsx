
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ArrowLeft, Edit, Eye, Pause, Play, Square, Copy, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PricingStrategy, PricingStrategyStatus, SKUType } from "@/types/pricing";
import { mockPricingStrategies } from "@/utils/mockData";
import { toast } from "@/hooks/use-toast";

const SKU_OPTIONS: SKUType[] = [
  '大会员包月', '大会员包季', '大会员包年',
  '超大包月', '超大包季', '超大包年',
  '[联合会员]大会员xQQ连续包月', '[联合会员]大会员xQ音连续包月'
];

const PricingStrategiesList = () => {
  const navigate = useNavigate();
  const [strategies, setStrategies] = useState<PricingStrategy[]>([]);
  const [filteredStrategies, setFilteredStrategies] = useState<PricingStrategy[]>([]);
  
  // 搜索和筛选状态
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSKU, setSelectedSKU] = useState<string>('');
  const [selectedPricingType, setSelectedPricingType] = useState<string>('');
  const [selectedCreator, setSelectedCreator] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    setStrategies(mockPricingStrategies);
    setFilteredStrategies(mockPricingStrategies);
  }, []);

  // 获取所有创建人选项
  const creators = Array.from(new Set(strategies.map(s => s.creator)));

  // 搜索和筛选逻辑
  useEffect(() => {
    let filtered = strategies;

    // 搜索策略ID或名称
    if (searchTerm) {
      filtered = filtered.filter(strategy => 
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 筛选SKU类型
    if (selectedSKU) {
      filtered = filtered.filter(strategy => strategy.skuType === selectedSKU);
    }

    // 筛选出价类型
    if (selectedPricingType) {
      filtered = filtered.filter(strategy => {
        if (selectedPricingType === 'manual') return strategy.pricingType === 'manual';
        if (selectedPricingType === 'algorithm') return strategy.pricingType === 'algorithm';
        return true;
      });
    }

    // 筛选创建人
    if (selectedCreator) {
      filtered = filtered.filter(strategy => strategy.creator === selectedCreator);
    }

    // 筛选状态
    if (selectedStatus) {
      filtered = filtered.filter(strategy => strategy.status === selectedStatus);
    }

    setFilteredStrategies(filtered);
  }, [searchTerm, selectedSKU, selectedPricingType, selectedCreator, selectedStatus, strategies]);

  const getStatusColor = (status: PricingStrategyStatus) => {
    switch (status) {
      case '编辑中': return 'bg-yellow-100 text-yellow-800';
      case '生效中': return 'bg-green-100 text-green-800';
      case '已完成': return 'bg-blue-100 text-blue-800';
      case '已暂停': return 'bg-orange-100 text-orange-800';
      case '已下线': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "复制成功", description: `${type}已复制到剪贴板` });
    }).catch(() => {
      toast({ title: "复制失败", description: "请手动复制", variant: "destructive" });
    });
  };

  const updateStrategyStatus = (strategyId: string, newStatus: PricingStrategyStatus) => {
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === strategyId 
          ? { ...strategy, status: newStatus }
          : strategy
      )
    );
  };

  const handleAction = (action: string, strategy: PricingStrategy) => {
    switch (action) {
      case 'edit':
        navigate(`/pricing-strategies/edit/${strategy.id}`);
        break;
      case 'view':
        navigate('/pricing-strategies/create', { state: { copyFrom: strategy, isView: true } });
        break;
      case 'pause':
        updateStrategyStatus(strategy.id, '已暂停');
        toast({ title: "暂停策略", description: `已暂停策略: ${strategy.name}` });
        break;
      case 'resume':
        updateStrategyStatus(strategy.id, '生效中');
        toast({ title: "重新上线", description: `已重新上线策略: ${strategy.name}` });
        break;
      case 'offline':
        updateStrategyStatus(strategy.id, '已下线');
        toast({ title: "下线策略", description: `已下线策略: ${strategy.name}` });
        break;
      case 'copy':
        navigate('/pricing-strategies/create', { state: { copyFrom: strategy } });
        break;
    }
  };

  const getActionButtons = (strategy: PricingStrategy) => {
    const buttons = [];
    
    switch (strategy.status) {
      case '编辑中':
        buttons.push(
          <Button key="edit" size="sm" variant="outline" onClick={() => handleAction('edit', strategy)}>
            <Edit className="w-4 h-4 mr-1" />
            编辑
          </Button>,
          <Button key="view" size="sm" variant="outline" onClick={() => handleAction('view', strategy)}>
            <Eye className="w-4 h-4 mr-1" />
            查看
          </Button>,
          <Button key="copy" size="sm" variant="outline" onClick={() => handleAction('copy', strategy)}>
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
        );
        break;
      case '生效中':
        buttons.push(
          <Button key="edit" size="sm" variant="outline" onClick={() => handleAction('edit', strategy)}>
            <Edit className="w-4 h-4 mr-1" />
            编辑
          </Button>,
          <Button key="view" size="sm" variant="outline" onClick={() => handleAction('view', strategy)}>
            <Eye className="w-4 h-4 mr-1" />
            查看
          </Button>,
          <Button key="pause" size="sm" variant="outline" onClick={() => handleAction('pause', strategy)}>
            <Pause className="w-4 h-4 mr-1" />
            暂停
          </Button>,
          <Button key="offline" size="sm" variant="outline" onClick={() => handleAction('offline', strategy)}>
            <Square className="w-4 h-4 mr-1" />
            下线
          </Button>,
          <Button key="copy" size="sm" variant="outline" onClick={() => handleAction('copy', strategy)}>
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
        );
        break;
      case '已完成':
        buttons.push(
          <Button key="view" size="sm" variant="outline" onClick={() => handleAction('view', strategy)}>
            <Eye className="w-4 h-4 mr-1" />
            查看
          </Button>,
          <Button key="copy" size="sm" variant="outline" onClick={() => handleAction('copy', strategy)}>
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
        );
        break;
      case '已暂停':
        buttons.push(
          <Button key="resume" size="sm" variant="outline" onClick={() => handleAction('resume', strategy)}>
            <Play className="w-4 h-4 mr-1" />
            重新上线
          </Button>,
          <Button key="copy" size="sm" variant="outline" onClick={() => handleAction('copy', strategy)}>
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
        );
        break;
      case '已下线':
        buttons.push(
          <Button key="view" size="sm" variant="outline" onClick={() => handleAction('view', strategy)}>
            <Eye className="w-4 h-4 mr-1" />
            查看
          </Button>,
          <Button key="copy" size="sm" variant="outline" onClick={() => handleAction('copy', strategy)}>
            <Copy className="w-4 h-4 mr-1" />
            复制
          </Button>
        );
        break;
    }
    
    return buttons;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSKU('');
    setSelectedPricingType('');
    setSelectedCreator('');
    setSelectedStatus('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">价格营销策略管理</h1>
          </div>
          <Button onClick={() => navigate('/pricing-strategies/create')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新建策略
          </Button>
        </div>

        {/* 搜索和筛选区域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">搜索与筛选</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索策略ID或名称"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSKU} onValueChange={setSelectedSKU}>
                <SelectTrigger>
                  <SelectValue placeholder="SKU类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部SKU</SelectItem>
                  {SKU_OPTIONS.map(sku => (
                    <SelectItem key={sku} value={sku}>{sku}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPricingType} onValueChange={setSelectedPricingType}>
                <SelectTrigger>
                  <SelectValue placeholder="出价类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部类型</SelectItem>
                  <SelectItem value="manual">运营出价</SelectItem>
                  <SelectItem value="algorithm">算法出价</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCreator} onValueChange={setSelectedCreator}>
                <SelectTrigger>
                  <SelectValue placeholder="创建人" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部创建人</SelectItem>
                  {creators.map(creator => (
                    <SelectItem key={creator} value={creator}>{creator}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部状态</SelectItem>
                  <SelectItem value="编辑中">编辑中</SelectItem>
                  <SelectItem value="生效中">生效中</SelectItem>
                  <SelectItem value="已完成">已完成</SelectItem>
                  <SelectItem value="已暂停">已暂停</SelectItem>
                  <SelectItem value="已下线">已下线</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                重置筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 text-sm text-gray-600">
          共找到 {filteredStrategies.length} 条策略
        </div>

        <div className="grid gap-6">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">
                        <span 
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => copyToClipboard(strategy.name, '策略名称')}
                          title="点击复制策略名称"
                        >
                          {strategy.name}
                        </span>
                      </CardTitle>
                      <Badge className={getStatusColor(strategy.status)}>
                        {strategy.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        策略ID: 
                        <span 
                          className="cursor-pointer hover:text-blue-600 ml-1"
                          onClick={() => copyToClipboard(strategy.id, '策略ID')}
                          title="点击复制策略ID"
                        >
                          {strategy.id}
                        </span>
                      </div>
                      <div>SKU类型: {strategy.skuType}</div>
                      <div>创建人: {strategy.creator}</div>
                      <div>生效时间: {strategy.startTime} - {strategy.endTime}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getActionButtons(strategy)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">售卖价格: </span>
                    {strategy.pricingType === 'manual' 
                      ? `¥${strategy.fixedPrice}` 
                      : `¥${strategy.priceRange?.[0]} - ¥${strategy.priceRange?.[1]}`
                    }
                  </div>
                  <div>
                    <span className="font-medium">限购次数: </span>
                    {strategy.totalPurchaseLimit === -1 ? '不限' : `${strategy.totalPurchaseLimit}次`}
                  </div>
                  <div>
                    <span className="font-medium">红包动效: </span>
                    {strategy.redPacket.showAnimation ? '是' : '否'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg mb-2">暂无匹配的策略</div>
            <div>请尝试调整搜索条件或筛选条件</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingStrategiesList;
