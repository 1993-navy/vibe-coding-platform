'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Star, Search, Filter, Grid, List } from 'lucide-react'
import { SCENES, LEVELS, SceneType, OrderLevel } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

const mockWorks = [
  { id: '1', title: '亚马逊评论导出工具', scene: 'data_crawl', level: 'S', price: 500, rating: 4.9, sales: 128, description: '一键导出亚马逊商品评论，支持多维度筛选和格式化输出', features: ['批量导出', '情感分析', 'Excel格式化'] },
  { id: '2', title: 'TikTok批量上货脚本', scene: 'automation', level: 'S', price: 680, rating: 4.8, sales: 96, description: '自动批量上传商品到TikTok Shop，支持定时发布和库存同步', features: ['定时发布', '库存同步', '多店铺管理'] },
  { id: '3', title: '跨境销售数据看板', scene: 'dashboard', level: 'A', price: 1200, rating: 4.9, sales: 58, description: '整合多平台销售数据，可视化展示关键指标', features: ['多平台整合', '实时数据', '自定义图表'] },
  { id: '4', title: 'Shopify产品同步插件', scene: 'indie_store', level: 'A', price: 1800, rating: 4.7, sales: 42, description: '一键同步商品数据到Shopify独立站', features: ['一键同步', '库存管理', '价格同步'] },
  { id: '5', title: '批量翻译工具', scene: 'batch', level: 'S', price: 450, rating: 4.8, sales: 156, description: '支持多语言批量翻译产品标题和描述', features: ['多语言支持', '批量处理', '术语库'] },
  { id: '6', title: '商标查询系统', scene: 'compliance', level: 'A', price: 2000, rating: 4.9, sales: 35, description: '快速查询商标注册状态，避免侵权风险', features: ['快速查询', '风险预警', '报告生成'] },
  { id: '7', title: 'eBay竞品分析工具', scene: 'data_crawl', level: 'A', price: 1500, rating: 4.8, sales: 72, description: '深度分析eBay竞品数据，挖掘市场机会', features: ['竞品监控', '价格分析', '趋势预测'] },
  { id: '8', title: 'Wish订单自动处理', scene: 'automation', level: 'S', price: 580, rating: 4.7, sales: 89, description: '自动处理Wish订单，提高发货效率', features: ['自动接单', '批量发货', '物流跟踪'] },
]

export default function MarketplacePage() {
  const [selectedScene, setSelectedScene] = useState<SceneType | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<OrderLevel | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredWorks = mockWorks.filter((work) => {
    const matchScene = selectedScene === 'all' || work.scene === selectedScene
    const matchLevel = selectedLevel === 'all' || work.level === selectedLevel
    const matchSearch = searchQuery === '' || work.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchScene && matchLevel && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">作品广场</h1>
          <p className="text-blue-100">开发者精心打造的成品案例，支持一键复刻定制</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="搜索作品..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">筛选：</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedScene('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedScene === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部场景
              </button>
              {SCENES.map((scene) => (
                <button
                  key={scene.key}
                  onClick={() => setSelectedScene(scene.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedScene === scene.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {scene.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 ml-auto">
              <button
                onClick={() => setSelectedLevel('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLevel === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                全部等级
              </button>
              {LEVELS.map((level) => (
                <button
                  key={level.level}
                  onClick={() => setSelectedLevel(level.level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level.level
                      ? level.level === 'S' ? 'bg-red-500 text-white' :
                        level.level === 'A' ? 'bg-orange-500 text-white' :
                        'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.level}级
                </button>
              ))}
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.map((work) => (
              <Link
                key={work.id}
                href={`/marketplace/${work.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {iconMap[SCENES.find(s => s.key === work.scene)?.icon || 'Database']}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      work.level === 'S' ? 'bg-red-100 text-red-600' :
                      work.level === 'A' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {work.level}级
                    </span>
                    <span className="text-xs text-gray-500">{SCENES.find(s => s.key === work.scene)?.label}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{work.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{work.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent-500">¥{work.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500">{work.rating}</span>
                      <span className="text-sm text-gray-400">({work.sales})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWorks.map((work) => (
              <Link
                key={work.id}
                href={`/marketplace/${work.id}`}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all flex items-start gap-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    {iconMap[SCENES.find(s => s.key === work.scene)?.icon || 'Database']}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      work.level === 'S' ? 'bg-red-100 text-red-600' :
                      work.level === 'A' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {work.level}级
                    </span>
                    <span className="text-xs text-gray-500">{SCENES.find(s => s.key === work.scene)?.label}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{work.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{work.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-accent-500">¥{work.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500">{work.rating}</span>
                        <span className="text-sm text-gray-400">({work.sales}次购买)</span>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      查看详情
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">暂无匹配的作品</h3>
            <p className="text-gray-500">试试调整筛选条件或搜索关键词</p>
          </div>
        )}
      </div>
    </div>
  )
}