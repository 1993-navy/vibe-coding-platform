'use client'

import Link from 'next/link'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, Star, CheckCircle, Play, FileText, Download, ArrowRight, User, Calendar } from 'lucide-react'
import { SCENES, LEVELS } from '@/types'
import { useRouter, useParams } from 'next/navigation'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
}

const mockWork = {
  id: '1',
  title: '亚马逊评论导出工具',
  scene: 'data_crawl',
  level: 'S',
  price: 500,
  rating: 4.9,
  sales: 128,
  description: '一键导出亚马逊商品评论，支持多维度筛选和格式化输出。支持自动分页抓取，情感分析，关键词统计等功能。',
  features: ['批量导出评论', '情感分析', 'Excel格式化', '自动分页', '关键词统计', '多维度筛选'],
  cover_url: '',
  demo_video_url: '',
  doc_url: '',
  developer: {
    id: '1',
    nickname: '跨境技术达人',
    avatar_url: '',
    rating: 4.9,
    completion_rate: 98,
    response_time: 30,
    works_count: 25,
  },
  reviews: [
    { id: '1', nickname: '卖家小王', rating: 5, content: '非常好用，节省了大量时间！', created_at: '2024-01-15' },
    { id: '2', nickname: '外贸新手', rating: 5, content: '操作简单，文档清晰', created_at: '2024-01-10' },
    { id: '3', nickname: '资深卖家', rating: 4, content: '功能很全面，希望能增加更多平台支持', created_at: '2024-01-05' },
  ],
}

export default function WorkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const work = mockWork
  const currentLevel = LEVELS.find(l => l.level === work.level)
  const currentScene = SCENES.find(s => s.key === work.scene)

  const handleReplicate = () => {
    router.push(`/publish?scene=${work.scene}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{work.title}</h1>
          <p className="text-blue-100">{currentScene?.label} - {currentLevel?.label}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100 flex items-center justify-center relative">
                <button className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <Play className="w-8 h-8 text-primary-600 ml-1" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  演示视频
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">功能介绍</h2>
              <p className="text-gray-600 mb-6">{work.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {work.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">交付标准</h2>
              {currentLevel && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2"><strong>交付内容：</strong></p>
                    <ul className="space-y-2">
                      {currentLevel.standard.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2"><strong>售后范围：</strong></p>
                    <p className="text-gray-700">{currentLevel.warranty_scope}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">用户评价</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-gray-800 ml-1">{work.rating}</span>
                </div>
                <span className="text-gray-500">共 {work.reviews.length} 条评价</span>
              </div>
              <div className="space-y-4">
                {work.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-800">{review.nickname}</span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${idx < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {review.created_at}
                      </span>
                    </div>
                    <p className="text-gray-600 pl-11">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  work.level === 'S' ? 'bg-red-100 text-red-600' :
                  work.level === 'A' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {work.level}级
                </span>
                <span className="text-xs text-gray-500">{currentScene?.label}</span>
              </div>

              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-accent-500">¥{work.price}</span>
                <span className="text-gray-400 line-through">¥{Math.round(work.price * 1.5)}</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-800 font-medium">{work.rating}</span>
                  <span className="text-gray-500">({work.sales}次购买)</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-gradient-primary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                  <span>一键复刻定制</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>下载试用版</span>
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-800 mb-4">开发者信息</h3>
                <Link href={`/profile/${work.developer.id}`} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{work.developer.nickname}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {work.developer.rating}
                      </span>
                      <span>{work.developer.completion_rate}%完成率</span>
                    </div>
                  </div>
                </Link>
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
                  {currentLevel?.warranty_days}天售后保障
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  不满意可申请仲裁
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}