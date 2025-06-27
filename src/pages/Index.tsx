
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Plus, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">价格营销管理后台</h1>
          <p className="text-lg text-gray-600">统一管理价格策略，优化营销效果</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">价格策略管理</CardTitle>
              <CardDescription>查看和管理所有价格营销策略</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/pricing-strategies')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                进入管理页面
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">创建新策略</CardTitle>
              <CardDescription>快速创建新的价格营销策略</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/pricing-strategies/create')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                立即创建
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <TrendingUp className="w-5 h-5" />
            <span>业务运营专用价格策略管理中枢</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
