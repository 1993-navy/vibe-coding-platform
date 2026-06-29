'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Clock, CheckCircle, AlertCircle, MessageCircle, Upload, Flag, ChevronRight, User } from 'lucide-react'
import { SCENES, LEVELS } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
}

const mockOrder = {
  id: 'ORD20240115001',
  title: '亚马逊竞品数据抓取工具',
  scene: 'data_crawl',
  level: 'S',
  budget_min: 500,
  budget_max: 800,
  platform: '亚马逊',
  status: 'draft_submitted',
  description: '我需要一个能够抓取亚马逊竞品数据的工具，主要用于分析竞争对手的产品信息、价格趋势和销售数据。',
  requirements: `1. 支持按关键词搜索产品
2. 抓取产品标题、价格、评分、评论数
3. 支持批量导出到Excel
4. 自动处理反爬机制`,
  deliverable_format: 'Python脚本',
  created_at: '2024-01-15 10:30',
  draft_submitted_at: '2024-01-16 09:00',
  seller: {
    id: '1',
    nickname: '跨境新手小王',
    avatar_url: '',
    rating: 4.8,
    orders_count: 5,
  },
  developer: {
    id: '2',
    nickname: '技术达人小李',
    avatar_url: '',
    rating: 4.9,
    completion_rate: 98,
  },
  timeline: [
    { status: '订单创建', time: '2024-01-15 10:30', completed: true },
    { status: '开发者接单', time: '2024-01-15 14:20', completed: true },
    { status: '开发中', time: '2024-01-15 14:20 - 2024-01-16 09:00', completed: true },
    { status: '提交初稿', time: '2024-01-16 09:00', completed: true },
    { status: '确认初稿', time: '', completed: false },
    { status: '提交终稿', time: '', completed: false },
    { status: '确认终稿', time: '', completed: false },
    { status: '售后期', time: '', completed: false },
    { status: '订单完成', time: '', completed: false },
  ],
}

export default function OrderDetailPage() {
  const [activeSection, setActiveSection] = useState<'detail' | 'delivery' | 'chat'>('detail')
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [disputeReason, setDisputeReason] = useState('')
  const order = mockOrder
  const currentLevel = LEVELS.find(l => l.level === order.level)
  const currentScene = SCENES.find(s => s.key === order.scene)

  const handleConfirmDraft = () => {
    alert('初稿确认成功！平台将打款30%给开发者')
  }

  const handleSubmitDispute = () => {
    if (!disputeReason.trim()) {
      alert('请填写纠纷原因')
      return
    }
    setShowDisputeModal(false)
    alert('纠纷已提交，平台将在24小时内进行审核')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{order.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-blue-100">{currentScene?.label} - {currentLevel?.label}</span>
            <span className="text-blue-200">|</span>
            <span className="text-blue-100">订单号: {order.id}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-card overflow-hidden mb-6">
              <div className="flex border-b border-gray-100">
                {(['detail', 'delivery', 'chat'] as const).map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`flex-1 px-6 py-4 font-medium transition-colors ${
                      activeSection === section
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section === 'detail' && '订单详情'}
                    {section === 'delivery' && '交付管理'}
                    {section === 'chat' && '消息沟通'}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeSection === 'detail' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        order.scene === 'data_crawl' ? 'bg-blue-100 text-blue-600' :
                        order.scene === 'automation' ? 'bg-purple-100 text-purple-600' :
                        order.scene === 'dashboard' ? 'bg-green-100 text-green-600' :
                        order.scene === 'indie_store' ? 'bg-pink-100 text-pink-600' :
                        order.scene === 'batch' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-teal-100 text-teal-600'
                      }`}>
                        {iconMap[currentScene?.icon || 'Database']}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            order.level === 'S' ? 'bg-red-100 text-red-600' :
                            order.level === 'A' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {order.level}级
                          </span>
                          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                            已提交初稿
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>{order.platform}</span>
                          <span>{order.deliverable_format}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">需求描述</h3>
                      <p className="text-gray-600">{order.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">功能需求清单</h3>
                      <ul className="space-y-2">
                        {order.requirements.split('\n').filter(item => item.trim()).map((item, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            {item.replace(/^\d+\.\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-4">卖家信息</h3>
                        <Link href={`/profile/${order.seller.id}`} className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{order.seller.nickname}</p>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span>{order.seller.rating}分</span>
                              <span>{order.seller.orders_count}次交易</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-4">开发者信息</h3>
                        <Link href={`/profile/${order.developer.id}`} className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{order.developer.nickname}</p>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span>{order.developer.rating}分</span>
                              <span>{order.developer.completion_rate}%完成率</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'delivery' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-6">订单进度</h3>
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-8">
                          {order.timeline.map((item, idx) => (
                            <div key={idx} className="relative flex items-start space-x-4">
                              <div className={`absolute left-4 w-5 h-5 rounded-full border-4 ${
                                item.completed ? 'bg-green-500 border-green-200' : 'bg-white border-gray-300'
                              }`}></div>
                              <div className="ml-12">
                                <p className={`font-medium ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                                  {item.status}
                                </p>
                                {item.time && (
                                  <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {order.status === 'draft_submitted' && (
                      <div className="bg-orange-50 rounded-xl p-6">
                        <h3 className="font-semibold text-orange-800 mb-4">开发者已提交初稿</h3>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-800">amazon_scraper_v1.py</p>
                                <p className="text-sm text-gray-500">Python脚本文件</p>
                              </div>
                              <button className="ml-auto text-primary-600 hover:text-primary-700">
                                下载
                              </button>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-800">使用说明文档.pdf</p>
                                <p className="text-sm text-gray-500">PDF文档</p>
                              </div>
                              <button className="ml-auto text-primary-600 hover:text-primary-700">
                                下载
                              </button>
                            </div>
                          </div>
                          <div className="flex space-x-4 pt-4">
                            <button
                              onClick={handleConfirmDraft}
                              className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                              确认初稿
                            </button>
                            <button
                              onClick={() => setShowDisputeModal(true)}
                              className="flex-1 border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                            >
                              发起纠纷
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'chat' && (
                  <div className="h-96 bg-gray-50 rounded-xl p-4">
                    <p className="text-center text-gray-500 py-12">消息沟通功能开发中...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">订单金额</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-accent-500">¥{order.budget_min}</span>
                <span className="text-gray-400">~</span>
                <span className="text-4xl font-bold text-accent-500">¥{order.budget_max}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">预计交付周期</span>
                  <span className="font-medium text-gray-800">24小时内</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">售后保障</span>
                  <span className="font-medium text-gray-800">7天</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">托管金额</span>
                  <span className="font-medium text-primary-600">¥{order.budget_max}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">付款进度</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">初稿确认后打款</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">终稿确认后打款</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">售后期满后打款</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>联系对方</span>
              <ChevronRight className="w-5 h-5 ml-auto" />
            </button>
          </div>
        </div>
      </div>

      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Flag className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">发起纠纷</h3>
            </div>
            <p className="text-gray-600 mb-4">请详细描述纠纷原因，平台将在24小时内进行审核</p>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
              placeholder="请描述纠纷原因..."
            />
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitDispute}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                提交纠纷
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}