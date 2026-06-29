'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Star, Award, Clock, Target, Settings, Edit3, ChevronRight, User, Crown } from 'lucide-react'
import { SCENES } from '@/types'
import { useAuthStore } from '@/store/auth'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
}

const mockUser = {
  id: '1',
  nickname: '技术达人小李',
  avatar_url: '',
  role: 'developer',
  is_seed: true,
  is_member: true,
  joined_at: '2023-06-15',
  completion_rate: 98,
  rating: 4.9,
  response_time: 30,
  total_orders: 25,
  total_earnings: 45000,
  bio: '专注跨境电商工具开发，擅长Python爬虫、自动化脚本、数据可视化。已为200+卖家提供定制服务。',
  tags: ['Python', '自动化', '数据爬虫', '数据可视化'],
}

const mockWorks = [
  { id: '1', title: '亚马逊评论导出工具', scene: 'data_crawl', level: 'S', price: 500, rating: 4.9, sales: 128 },
  { id: '2', title: 'TikTok批量上货脚本', scene: 'automation', level: 'S', price: 680, rating: 4.8, sales: 96 },
  { id: '3', title: '跨境销售数据看板', scene: 'dashboard', level: 'A', price: 1200, rating: 4.9, sales: 58 },
]

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'overview' | 'works' | 'orders'>('overview')
  const profile = mockUser

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                {profile.is_member && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profile.nickname}</h1>
                  {profile.is_seed && (
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                      种子开发者
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-blue-100">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    profile.role === 'developer' ? 'bg-purple-500/30' : 'bg-green-500/30'
                  }`}>
                    {profile.role === 'developer' ? '开发者' : '卖家'}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    入驻于 {profile.joined_at}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
                <span>设置</span>
              </button>
              <button className="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                <Edit3 className="w-5 h-5" />
                <span>编辑资料</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">统计数据</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{profile.total_orders}</div>
                  <div className="text-sm text-gray-500">完成订单</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-500">¥{profile.total_earnings.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">总收入</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-gray-800">{profile.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">评分</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{profile.completion_rate}%</div>
                  <div className="text-sm text-gray-500">完成率</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">信誉数据</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">平均响应时间</span>
                    <span className="text-sm font-medium text-gray-800">{profile.response_time}分钟</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">好评率</span>
                    <span className="text-sm font-medium text-gray-800">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {profile.role === 'developer' && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-gray-800">会员权益</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    优先派单资格
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    专属标识展示
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    专属客服支持
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    抽佣优惠5%
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-card overflow-hidden mb-6">
              <div className="flex border-b border-gray-100">
                {(['overview', 'works', 'orders'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'overview' && '个人简介'}
                    {tab === 'works' && `作品案例 (${mockWorks.length})`}
                    {tab === 'orders' && '订单记录'}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">个人简介</h3>
                      <p className="text-gray-600">{profile.bio}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">技能标签</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.tags.map((tag, idx) => (
                          <span key={idx} className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">服务承诺</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Target className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">准时交付</p>
                            <p className="text-sm text-gray-500">98%订单按时完成</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">快速响应</p>
                            <p className="text-sm text-gray-500">平均30分钟回复</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">质量保障</p>
                            <p className="text-sm text-gray-500">售后无忧</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'works' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWorks.map((work) => (
                      <Link
                        key={work.id}
                        href={`/marketplace/${work.id}`}
                        className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            work.scene === 'data_crawl' ? 'bg-blue-100 text-blue-600' :
                            work.scene === 'automation' ? 'bg-purple-100 text-purple-600' :
                            work.scene === 'dashboard' ? 'bg-green-100 text-green-600' :
                            work.scene === 'indie_store' ? 'bg-pink-100 text-pink-600' :
                            work.scene === 'batch' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-teal-100 text-teal-600'
                          }`}>
                            {iconMap[SCENES.find(s => s.key === work.scene)?.icon || 'Database']}
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              work.level === 'S' ? 'bg-red-100 text-red-600' :
                              work.level === 'A' ? 'bg-orange-100 text-orange-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {work.level}级
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{work.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-accent-500">¥{work.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-500">{work.rating}</span>
                            <span className="text-sm text-gray-400">({work.sales}次购买)</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">亚马逊评论导出工具</p>
                        <p className="text-sm text-gray-500">订单号: ORD20240115001</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-500">¥500</p>
                        <p className="text-sm text-green-600">已完成</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">TikTok批量上货脚本</p>
                        <p className="text-sm text-gray-500">订单号: ORD20240114002</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-500">¥680</p>
                        <p className="text-sm text-green-600">已完成</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">跨境销售数据看板</p>
                        <p className="text-sm text-gray-500">订单号: ORD20240113003</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-500">¥1200</p>
                        <p className="text-sm text-purple-600">开发中</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}