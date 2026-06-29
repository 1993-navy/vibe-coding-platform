'use client'

import { useState } from 'react'
import { TrendingUp, Users, FileText, AlertTriangle, CheckCircle, XCircle, Clock, DollarSign, BarChart3, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { DisputeStatus, DisputeDecision } from '@/types'

const mockDisputes = [
  { id: '1', order_id: 'ORD20240115001', title: '亚马逊竞品数据抓取工具', initiator: '跨境新手小王', reason: '开发者交付的脚本无法正常运行，多次沟通后仍未解决', evidence: '', status: 'pending', created_at: '2024-01-16 14:30' },
  { id: '2', order_id: 'ORD20240114002', title: 'Shopify产品同步插件', initiator: '技术达人小李', reason: '卖家在需求确认后多次变更需求，导致开发进度延迟', evidence: '', status: 'reviewing', created_at: '2024-01-15 10:00' },
  { id: '3', order_id: 'ORD20240113003', title: '跨境销售数据看板', initiator: '卖家小张', reason: '交付的看板功能与需求不符，缺少关键数据指标', evidence: '', status: 'resolved', decision: 'seller_win', decision_note: '经审核，开发者确实未按需求交付，判定卖家胜诉', created_at: '2024-01-12 09:00', resolved_at: '2024-01-13 16:00' },
]

const mockStats = {
  total_gmv: 528000,
  total_orders: 156,
  dispute_rate: 2.6,
  repurchase_rate: 35.8,
  monthly_gmv: [120000, 145000, 168000, 195000, 220000, 280000, 320000, 380000, 420000, 480000, 510000, 528000],
  monthly_orders: [8, 12, 15, 18, 22, 25, 30, 35, 40, 45, 50, 56],
  category_distribution: [
    { name: '数据抓取', value: 35 },
    { name: '自动化脚本', value: 28 },
    { name: '数据看板', value: 18 },
    { name: '独立站功能', value: 12 },
    { name: '批量处理', value: 4 },
    { name: '合规辅助', value: 3 },
  ],
  level_distribution: [
    { name: 'S级', value: 45, color: '#ef4444' },
    { name: 'A级', value: 38, color: '#f97316' },
    { name: 'B级', value: 17, color: '#3b82f6' },
  ],
}

const disputeStatusConfig: Record<DisputeStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: '待审核', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  reviewing: { label: '审核中', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  resolved: { label: '已解决', color: 'text-green-600', bgColor: 'bg-green-100' },
}

const disputeDecisionConfig: Record<DisputeDecision, { label: string; color: string }> = {
  seller_win: { label: '卖家胜诉', color: 'text-green-600' },
  developer_win: { label: '开发者胜诉', color: 'text-blue-600' },
  compromise: { label: '协商解决', color: 'text-yellow-600' },
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'disputes'>('dashboard')
  const [selectedDispute, setSelectedDispute] = useState<typeof mockDisputes[0] | null>(null)
  const [decision, setDecision] = useState<DisputeDecision | ''>('')
  const [decisionNote, setDecisionNote] = useState('')

  const handleSubmitDecision = () => {
    if (!decision || !decisionNote.trim()) {
      alert('请填写完整的仲裁结果')
      return
    }
    setSelectedDispute(null)
    setDecision('')
    setDecisionNote('')
    alert('仲裁结果已提交')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">VibeCoding 管理后台</h1>
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  数据看板
                </button>
                <button
                  onClick={() => setActiveTab('disputes')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'disputes'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  仲裁管理
                </button>
              </nav>
            </div>
            <div className="text-gray-400">管理员后台</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">累计 GMV</p>
                    <p className="text-3xl font-bold text-gray-800">¥{mockStats.total_gmv.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+28.5% 较上月</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">订单总数</p>
                    <p className="text-3xl font-bold text-gray-800">{mockStats.total_orders}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+15.2% 较上月</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">纠纷率</p>
                    <p className="text-3xl font-bold text-gray-800">{mockStats.dispute_rate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-600">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">-0.8% 较上月</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">复购率</p>
                    <p className="text-3xl font-bold text-gray-800">{mockStats.repurchase_rate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+5.3% 较上月</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">GMV 趋势</h2>
                <div className="h-64 flex items-end justify-between gap-2">
                  {mockStats.monthly_gmv.map((value, idx) => {
                    const height = (value / Math.max(...mockStats.monthly_gmv)) * 100
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                          style={{ height: `${height}%`, minHeight: '10px' }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{idx + 1}月</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">订单趋势</h2>
                <div className="h-64 flex items-end justify-between gap-2">
                  {mockStats.monthly_orders.map((value, idx) => {
                    const height = (value / Math.max(...mockStats.monthly_orders)) * 100
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:from-green-700 hover:to-green-500"
                          style={{ height: `${height}%`, minHeight: '10px' }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{idx + 1}月</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">场景分类分布</h2>
                <div className="space-y-4">
                  {mockStats.category_distribution.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="text-sm font-medium text-gray-800">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b', '#14b8a6'][idx],
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">订单等级分布</h2>
                <div className="flex items-center justify-center h-48">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {mockStats.level_distribution.map((item, idx) => {
                        const startAngle = mockStats.level_distribution.slice(0, idx).reduce((sum, prev) => sum + prev.value, 0)
                        const endAngle = startAngle + item.value
                        const startRad = (startAngle * Math.PI) / 180
                        const endRad = (endAngle * Math.PI) / 180
                        const x1 = 50 + 40 * Math.cos(startRad)
                        const y1 = 50 + 40 * Math.sin(startRad)
                        const x2 = 50 + 40 * Math.cos(endRad)
                        const y2 = 50 + 40 * Math.sin(endRad)
                        const largeArcFlag = item.value > 50 ? 1 : 0
                        return (
                          <path
                            key={idx}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={item.color}
                            className="transition-all hover:opacity-80"
                          />
                        )
                      })}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{mockStats.total_orders}</p>
                        <p className="text-xs text-gray-500">总订单</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  {mockStats.level_distribution.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name} {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">纠纷仲裁列表</h2>
                  <div className="flex space-x-2">
                    {(['all', 'pending', 'reviewing', 'resolved'] as const).map((status) => (
                      <button
                        key={status}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          status === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status === 'all' && '全部'}
                        {status === 'pending' && '待审核'}
                        {status === 'reviewing' && '审核中'}
                        {status === 'resolved' && '已解决'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {mockDisputes.map((dispute) => (
                  <div
                    key={dispute.id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          dispute.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                          dispute.status === 'reviewing' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {dispute.status === 'pending' && <Clock className="w-5 h-5" />}
                          {dispute.status === 'reviewing' && <Activity className="w-5 h-5" />}
                          {dispute.status === 'resolved' && <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-800">{dispute.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${disputeStatusConfig[dispute.status as DisputeStatus].bgColor} ${disputeStatusConfig[dispute.status as DisputeStatus].color}`}>
                              {disputeStatusConfig[dispute.status as DisputeStatus].label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>订单号: {dispute.order_id}</span>
                            <span>发起者: {dispute.initiator}</span>
                            <span>{dispute.created_at}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        查看详情
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDispute && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">纠纷详情</h3>
              </div>
              <button
                onClick={() => setSelectedDispute(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">订单号</p>
                  <p className="font-medium text-gray-800">{selectedDispute.order_id}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">订单名称</p>
                  <p className="font-medium text-gray-800">{selectedDispute.title}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">发起者</p>
                  <p className="font-medium text-gray-800">{selectedDispute.initiator}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">纠纷状态</p>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${disputeStatusConfig[selectedDispute.status as DisputeStatus].bgColor} ${disputeStatusConfig[selectedDispute.status as DisputeStatus].color}`}>
                    {disputeStatusConfig[selectedDispute.status as DisputeStatus].label}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">发起时间</p>
                  <p className="font-medium text-gray-800">{selectedDispute.created_at}</p>
                </div>
                {selectedDispute.resolved_at && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">解决时间</p>
                    <p className="font-medium text-gray-800">{selectedDispute.resolved_at}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">纠纷原因</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedDispute.reason}</p>
              </div>

              {selectedDispute.evidence && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">证据材料</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">{selectedDispute.evidence}</p>
                  </div>
                </div>
              )}

              {selectedDispute.status !== 'resolved' ? (
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">仲裁裁决</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">裁决结果</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['seller_win', 'developer_win', 'compromise'] as const).map((option) => (
                          <button
                            key={option}
                            onClick={() => setDecision(option)}
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              decision === option
                                ? 'border-primary-500 bg-primary-50 text-primary-600'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {disputeDecisionConfig[option].label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">裁决说明</label>
                      <textarea
                        value={decisionNote}
                        onChange={(e) => setDecisionNote(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={4}
                        placeholder="请输入裁决说明..."
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setSelectedDispute(null)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSubmitDecision}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        提交裁决
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">裁决结果</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className={`font-medium ${disputeDecisionConfig[selectedDispute.decision! as DisputeDecision].color}`}>
                        {disputeDecisionConfig[selectedDispute.decision! as DisputeDecision].label}
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedDispute.decision_note}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}