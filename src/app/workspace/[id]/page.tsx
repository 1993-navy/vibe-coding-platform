'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Clock, CheckCircle, AlertCircle, User, MessageCircle } from 'lucide-react'
import { SCENES, LEVELS } from '@/types'
import { useAuthStore } from '@/store/auth'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
}

const mockOrder = {
  id: '1',
  title: '需要一个亚马逊竞品数据抓取工具',
  scene: 'data_crawl',
  level: 'S',
  budget_min: 500,
  budget_max: 800,
  platform: '亚马逊',
  status: 'pending',
  is_urgent: false,
  description: '我需要一个能够抓取亚马逊竞品数据的工具，主要用于分析竞争对手的产品信息、价格趋势和销售数据。',
  requirements: `1. 支持按关键词搜索产品
2. 抓取产品标题、价格、评分、评论数
3. 支持批量导出到Excel
4. 自动处理反爬机制`,
  deliverable_format: 'Python脚本',
  created_at: '2024-01-15 10:30',
  seller: {
    id: '1',
    nickname: '跨境新手小王',
    avatar_url: '',
    rating: 4.8,
    orders_count: 5,
  },
}

export default function OrderDetailPage() {
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const order = mockOrder
  const currentLevel = LEVELS.find(l => l.level === order.level)
  const currentScene = SCENES.find(s => s.key === order.scene)

  const handleAccept = () => {
    if (!user || user.role !== 'developer') {
      alert('请以开发者身份登录后接单')
      return
    }
    setShowConfirmModal(true)
  }

  const confirmAccept = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowConfirmModal(false)
    alert('接单成功！请及时与卖家沟通需求细节')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{order.title}</h1>
          <p className="text-blue-100">{currentScene?.label} - {currentLevel?.label}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center space-x-4 mb-6">
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
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.level === 'S' ? 'bg-red-100 text-red-600' :
                      order.level === 'A' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.level}级
                    </span>
                    {order.is_urgent && (
                      <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                        加急订单
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {order.created_at}
                    </span>
                    <span>{order.platform}</span>
                    <span>{order.deliverable_format}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
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

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">交付标准</h3>
                  {currentLevel && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {currentLevel.standard.map((item, idx) => (
                          <span key={idx} className="text-sm bg-white px-3 py-1 rounded-full text-gray-700">
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>售后范围：</strong>{currentLevel.warranty_scope}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">卖家信息</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{order.seller.nickname}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {order.seller.rating}分
                    </span>
                    <span>{order.seller.orders_count}次交易</span>
                  </div>
                </div>
                <Link href="#" className="ml-auto flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>联系卖家</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">预算范围</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-accent-500">¥{order.budget_min}</span>
                <span className="text-gray-400">~</span>
                <span className="text-4xl font-bold text-accent-500">¥{order.budget_max}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">预计交付周期</span>
                  <span className="font-medium text-gray-800">
                    {currentLevel?.delivery_days === 1 ? '24小时内' :
                     currentLevel?.delivery_days === 3 ? '72小时内' :
                     `${currentLevel?.delivery_days}天内`}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">售后保障</span>
                  <span className="font-medium text-gray-800">{currentLevel?.warranty_days}天</span>
                </div>
              </div>

              <button
                onClick={handleAccept}
                disabled={isSubmitting || order.status !== 'pending'}
                className={`w-full py-4 rounded-lg font-semibold transition-opacity ${
                  order.status === 'pending'
                    ? 'bg-gradient-primary text-white hover:opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } disabled:opacity-50`}
              >
                {isSubmitting ? '提交中...' : order.status === 'pending' ? '立即接单' : '已被接单'}
              </button>

              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">
                    接单前请仔细阅读需求详情，确保能够按时按质完成交付。接单后请及时与卖家沟通确认需求细节。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6">
              <h3 className="font-medium text-gray-800 mb-3">服务保障</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  平台资金托管，分阶段打款
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  初稿确认后打款30%
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  终稿确认后打款50%
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  售后期满后打款20%
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">确认接单</h3>
            <p className="text-gray-600 mb-6">
              确认接单后，您需要在 {currentLevel?.delivery_days === 1 ? '24小时' : `${currentLevel?.delivery_days}天`} 内完成交付。请确保您有足够的时间和能力完成此订单。
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmAccept}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? '提交中...' : '确认接单'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}