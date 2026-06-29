import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Star, Clock, ArrowRight, Zap, TrendingUp, Users, Award } from 'lucide-react'
import { SCENES, LEVELS } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

const mockWorks = [
  { id: '1', title: '亚马逊评论导出工具', scene: 'data_crawl', level: 'S', price: 500, rating: 4.9, sales: 128 },
  { id: '2', title: 'TikTok批量上货脚本', scene: 'automation', level: 'S', price: 680, rating: 4.8, sales: 96 },
  { id: '3', title: '跨境销售数据看板', scene: 'dashboard', level: 'A', price: 1200, rating: 4.9, sales: 58 },
  { id: '4', title: 'Shopify产品同步插件', scene: 'indie_store', level: 'A', price: 1800, rating: 4.7, sales: 42 },
  { id: '5', title: '批量翻译工具', scene: 'batch', level: 'S', price: 450, rating: 4.8, sales: 156 },
  { id: '6', title: '商标查询系统', scene: 'compliance', level: 'A', price: 2000, rating: 4.9, sales: 35 },
]

const mockOrders = [
  { id: '1', title: '需要一个亚马逊竞品数据抓取工具', scene: 'data_crawl', level: 'S', budget: '500-800', time: '2小时前' },
  { id: '2', title: 'TikTok Shop批量发布商品脚本', scene: 'automation', level: 'S', budget: '600-1000', time: '5小时前' },
  { id: '3', title: '多平台销售数据可视化看板', scene: 'dashboard', level: 'A', budget: '1500-3000', time: '1天前' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">72小时极速交付</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                跨境电商效率工具
                <br />
                <span className="text-yellow-400">定制便利店</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                连接 AI 辅助开发者与中小跨境卖家，解决碎片化、个性化的运营效率需求。
                数据抓取、自动化脚本、数据看板、独立站功能，一站式解决。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/publish" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
                  发布需求
                </Link>
                <Link href="/marketplace" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-center border border-white/20">
                  浏览作品广场
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {SCENES.slice(0, 4).map((scene) => (
                  <div
                    key={scene.key}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      {iconMap[scene.icon]}
                    </div>
                    <h3 className="font-semibold mb-1">{scene.label}</h3>
                    <p className="text-sm text-blue-100">{scene.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">场景分类</h2>
            <p className="text-gray-500">6大核心场景，覆盖跨境电商运营全流程</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SCENES.map((scene) => (
              <Link
                key={scene.key}
                href={`/publish?scene=${scene.key}`}
                className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 hover:shadow-card-hover transition-all"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{iconMap[scene.icon]}</div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{scene.label}</h3>
                <p className="text-xs text-gray-500">{scene.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">热门作品</h2>
              <p className="text-gray-500">开发者精心打造的成品案例，支持一键复刻定制</p>
            </div>
            <Link href="/marketplace" className="flex items-center text-primary-600 font-medium hover:text-primary-700">
              查看更多 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {mockWorks.map((work) => (
              <div key={work.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {iconMap[SCENES.find(s => s.key === work.scene)?.icon || 'Database']}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      work.level === 'S' ? 'bg-red-100 text-red-600' :
                      work.level === 'A' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {work.level}级
                    </span>
                    <span className="text-xs text-gray-500">{SCENES.find(s => s.key === work.scene)?.label}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{work.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent-500">¥{work.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500">{work.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">最新需求</h2>
              <p className="text-gray-500">卖家发布的定制需求，等待开发者接单</p>
            </div>
            <Link href="/workspace" className="flex items-center text-primary-600 font-medium hover:text-primary-700">
              查看更多 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{order.title}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.level === 'S' ? 'bg-red-100 text-red-600' :
                        order.level === 'A' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {order.level}级
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {SCENES.find(s => s.key === order.scene)?.label}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {order.time}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="text-xl font-bold text-accent-500">{order.budget}元</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">¥50万+</div>
              <div className="text-blue-200">累计GMV</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">2000+</div>
              <div className="text-blue-200">注册用户</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-200">完成率</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">4.9分</div>
              <div className="text-blue-200">平均评分</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">VibeCoding</span>
              </div>
              <p className="text-sm">跨境电商效率工具定制平台，连接开发者与卖家。</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">首页</Link></li>
                <li><Link href="/marketplace" className="hover:text-white transition-colors">作品广场</Link></li>
                <li><Link href="/workspace" className="hover:text-white transition-colors">接单大厅</Link></li>
                <li><Link href="/publish" className="hover:text-white transition-colors">发布需求</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">帮助中心</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">服务条款</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">隐私政策</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">联系我们</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">订单等级说明</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  S级 - 24小时交付
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  A级 - 72小时交付
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  B级 - 7天交付
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 VibeCoding. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}