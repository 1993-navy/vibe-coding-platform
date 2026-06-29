'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Clock, Filter, Search, ChevronRight, DollarSign } from 'lucide-react'
import { SCENES, LEVELS, SceneType, OrderLevel } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

const mockOrders = [
  { id: '1', title: '需要一个亚马逊竞品数据抓取工具', scene: 'data_crawl', level: 'S', budget_min: 500, budget_max: 800, platform: '亚马逊', status: 'pending', created_at: '2小时前', is_urgent: false },
  { id: '2', title: 'TikTok Shop批量发布商品脚本', scene: 'automation', level: 'S', budget_min: 600, budget_max: 1000, platform: 'TikTok Shop', status: 'pending', created_at: '5小时前', is_urgent: true },
  { id: '3', title: '多平台销售数据可视化看板', scene: 'dashboard', level: 'A', budget_min: 1500, budget_max: 3000, platform: '多平台', status: 'pending', created_at: '1天前', is_urgent: false },
  { id: '4', title: 'Shopify独立站订单同步工具', scene: 'indie_store', level: 'A', budget_min: 1800, budget_max: 2500, platform: 'Shopify', status: 'pending', created_at: '1天前', is_urgent: false },
  { id: '5', title: '批量处理产品图片翻译', scene: 'batch', level: 'S', budget_min: 400, budget_max: 600, platform: '通用', status: 'pending', created_at: '2天前', is_urgent: false },
  { id: '6', title: '欧盟税务申报辅助工具', scene: 'compliance', level: 'A', budget_min: 2000, budget_max: 3500, platform: '通用', status: 'pending', created_at: '2天前', is_urgent: true },
  { id: '7', title: 'eBay库存同步脚本', scene: 'automation', level: 'S', budget_min: 500, budget_max: 800, platform: 'eBay', status: 'pending', created_at: '3天前', is_urgent: false },
  { id: '8', title: '多平台广告数据分析工具', scene: 'dashboard', level: 'B', budget_min: 3000, budget_max: 5000, platform: '多平台', status: 'pending', created_at: '3天前', is_urgent: false },
]

export default function WorkspacePage() {
  const [selectedScene, setSelectedScene] = useState<SceneType | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<OrderLevel | 'all'>('all')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const budgetRanges = [
    { key: 'all', label: '全部预算' },
    { key: 'low', label: '300-800元' },
    { key: 'mid', label: '800-3000元' },
    { key: 'high', label: '3000元以上' },
  ]

  const filteredOrders = mockOrders.filter((order) => {
    const matchScene = selectedScene === 'all' || order.scene === selectedScene
    const matchLevel = selectedLevel === 'all' || order.level === selectedLevel
    const matchSearch = searchQuery === '' || order.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchBudget = true
    if (selectedBudget === 'low') {
      matchBudget = order.budget_max <= 800
    } else if (selectedBudget === 'mid') {
      matchBudget = order.budget_min >= 800 && order.budget_max <= 3000
    } else if (selectedBudget === 'high') {
      matchBudget = order.budget_min >= 3000
    }
    
    return matchScene && matchLevel && matchSearch && matchBudget
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">接单大厅</h1>
          <p className="text-blue-100">浏览卖家发布的需求，选择适合您能力的订单</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className={`lg:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-800">筛选条件</h2>
                <button
                  onClick={() => {
                    setSelectedScene('all')
                    setSelectedLevel('all')
                    setSelectedBudget('all')
                    setSearchQuery('')
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  重置
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">需求场景</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="scene"
                      checked={selectedScene === 'all'}
                      onChange={() => setSelectedScene('all')}
                      className="text-primary-600"
                    />
                    <span className="text-gray-700">全部场景</span>
                  </label>
                  {SCENES.map((scene) => (
                    <label key={scene.key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="scene"
                        checked={selectedScene === scene.key}
                        onChange={() => setSelectedScene(scene.key)}
                        className="text-primary-600"
                      />
                      <span className="text-gray-700">{scene.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">订单等级</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === 'all'}
                      onChange={() => setSelectedLevel('all')}
                      className="text-primary-600"
                    />
                    <span className="text-gray-700">全部等级</span>
                  </label>
                  {LEVELS.map((level) => (
                    <label key={level.level} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === level.level}
                        onChange={() => setSelectedLevel(level.level)}
                        className={`${level.level === 'S' ? 'text-red-500' : level.level === 'A' ? 'text-orange-500' : 'text-blue-500'}`}
                      />
                      <span className="text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">预算范围</h3>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range.key} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        checked={selectedBudget === range.key}
                        onChange={() => setSelectedBudget(range.key)}
                        className="text-primary-600"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="搜索需求..."
                  />
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                  <span>筛选</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/workspace/${order.id}`}
                    className="block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          order.scene === 'data_crawl' ? 'bg-blue-100 text-blue-600' :
                          order.scene === 'automation' ? 'bg-purple-100 text-purple-600' :
                          order.scene === 'dashboard' ? 'bg-green-100 text-green-600' :
                          order.scene === 'indie_store' ? 'bg-pink-100 text-pink-600' :
                          order.scene === 'batch' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-teal-100 text-teal-600'
                        }`}>
                          {iconMap[SCENES.find(s => s.key === order.scene)?.icon || 'Database']}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.level === 'S' ? 'bg-red-100 text-red-600' :
                              order.level === 'A' ? 'bg-orange-100 text-orange-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {order.level}级
                            </span>
                            {order.is_urgent && (
                              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                                加急
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">{order.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span>{SCENES.find(s => s.key === order.scene)?.label}</span>
                            <span>·</span>
                            <span>{order.platform}</span>
                            <span>·</span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {order.created_at}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-accent-500">
                            <DollarSign className="w-5 h-5" />
                            <span className="text-xl font-bold">{order.budget_min}-{order.budget_max}</span>
                          </div>
                          <span className="text-sm text-gray-500">元</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">暂无匹配的需求</h3>
                  <p className="text-gray-500">试试调整筛选条件或搜索关键词</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}