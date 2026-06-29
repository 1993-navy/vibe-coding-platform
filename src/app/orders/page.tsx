'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Clock, Package, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'
import { SCENES, OrderStatus } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: '待接单', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  accepted: { label: '已接单', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  in_progress: { label: '开发中', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  draft_submitted: { label: '已提交初稿', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  draft_confirmed: { label: '初稿已确认', color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  final_submitted: { label: '已提交终稿', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  final_confirmed: { label: '终稿已确认', color: 'text-teal-600', bgColor: 'bg-teal-100' },
  in_warranty: { label: '售后期', color: 'text-green-600', bgColor: 'bg-green-100' },
  completed: { label: '已完成', color: 'text-gray-800', bgColor: 'bg-gray-50' },
  disputed: { label: '纠纷中', color: 'text-red-600', bgColor: 'bg-red-100' },
}

const mockOrders = [
  { id: '1', title: '亚马逊竞品数据抓取工具', scene: 'data_crawl', level: 'S', budget_min: 500, budget_max: 800, status: 'draft_submitted', created_at: '2小时前', is_seller: true },
  { id: '2', title: 'TikTok批量上货脚本', scene: 'automation', level: 'S', budget_min: 680, budget_max: 800, status: 'in_progress', created_at: '1天前', is_seller: false },
  { id: '3', title: '跨境销售数据看板', scene: 'dashboard', level: 'A', budget_min: 1200, budget_max: 1500, status: 'final_confirmed', created_at: '3天前', is_seller: true },
  { id: '4', title: '批量翻译工具', scene: 'batch', level: 'S', budget_min: 450, budget_max: 600, status: 'completed', created_at: '1周前', is_seller: true },
  { id: '5', title: 'Shopify产品同步插件', scene: 'indie_store', level: 'A', budget_min: 1800, budget_max: 2500, status: 'disputed', created_at: '5天前', is_seller: false },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')
  const [filterRole, setFilterRole] = useState<'all' | 'seller' | 'developer'>('all')

  const filteredOrders = mockOrders.filter((order) => {
    let matchStatus = true
    if (activeTab === 'pending') {
      matchStatus = ['pending', 'accepted'].includes(order.status)
    } else if (activeTab === 'in_progress') {
      matchStatus = ['in_progress', 'draft_submitted', 'draft_confirmed', 'final_submitted', 'final_confirmed', 'in_warranty', 'disputed'].includes(order.status)
    } else if (activeTab === 'completed') {
      matchStatus = order.status === 'completed'
    }

    let matchRole = true
    if (filterRole === 'seller') {
      matchRole = order.is_seller
    } else if (filterRole === 'developer') {
      matchRole = !order.is_seller
    }

    return matchStatus && matchRole
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">订单管理</h1>
          <p className="text-blue-100">管理您的所有订单，跟踪订单进度</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex space-x-2">
                {(['all', 'pending', 'in_progress', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab === 'all' && '全部'}
                    {tab === 'pending' && '待处理'}
                    {tab === 'in_progress' && '进行中'}
                    {tab === 'completed' && '已完成'}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                {(['all', 'seller', 'developer'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilterRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterRole === role
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {role === 'all' && '全部角色'}
                    {role === 'seller' && '我是卖家'}
                    {role === 'developer' && '我是开发者'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[order.status as OrderStatus].bgColor} ${statusConfig[order.status as OrderStatus].color}`}>
                          {statusConfig[order.status as OrderStatus].label}
                        </span>
                        {order.is_seller ? (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">卖家</span>
                        ) : (
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">开发者</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{order.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span>{SCENES.find(s => s.key === order.scene)?.label}</span>
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
                      <div className="text-xl font-bold text-accent-500">¥{order.budget_min}-{order.budget_max}</div>
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                      <MessageCircle className="w-5 h-5" />
                      <span className="hidden sm:inline">联系对方</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">暂无订单</h3>
              <p className="text-gray-500">
                {activeTab === 'all' ? '您还没有任何订单' : '当前筛选条件下没有订单'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}