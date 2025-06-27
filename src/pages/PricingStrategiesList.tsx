
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowLeft, Edit, Eye, Pause, Play, Square, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PricingStrategy, PricingStrategyStatus } from "@/types/pricing";
import { mockPricingStrategies } from "@/utils/mockData";
import { toast } from "@/hooks/use-toast";

const PricingStrategiesList = () => {
  const navigate = useNavigate();
  const [strategies, setStrategies] = useState<PricingStrategy[]>([]);

  useEffect(() => {
    setStrategies(mockPricingStrategies);
  }, []);

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

  const handleAction = (action: string, strategy: PricingStrategy) => {
    switch (action) {
      case 'edit':
        navigate(`/pricing-strategies/edit/${strategy.id}`);
        break;
      case 'view':
        toast({ title: "查看详情", description: `查看策略: ${strategy.name}` });
        break;
      case 'pause':
        toast({ title: "暂停策略", description: `已暂停策略: ${strategy.name}` });
        break;
      case 'resume':
        toast({ title: "重新上线", description: `已重新上线策略: ${strategy.name}` });
        break;
      case 'offline':
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

        <div className="grid gap-6">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{strategy.name}</CardTitle>
                      <Badge className={getStatusColor(strategy.status)}>
                        {strategy.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>策略ID: {strategy.id}</div>
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
      </div>
    </div>
  );
};

export default PricingStrategiesList;
