'use client'

import { useState } from 'react'
import { Database, Bot, BarChart3, ShoppingBag, Layers, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react'
import { SCENES, LEVELS, PLATFORMS, DELIVERY_FORMATS, SceneType, OrderLevel } from '@/types'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { useRouter, useSearchParams } from 'next/navigation'

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
}

export default function PublishPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const [step, setStep] = useState(1)
  const [selectedScene, setSelectedScene] = useState<SceneType>(
    (searchParams.get('scene') as SceneType) || SCENES[0].key
  )
  const [selectedLevel, setSelectedLevel] = useState<OrderLevel>('A')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    requirements: '',
    deliverable_format: '',
    budget_min: '',
    budget_max: '',
    is_urgent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!selectedScene) newErrors.scene = '请选择需求场景'
    if (!selectedLevel) newErrors.level = '请选择订单等级'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = '请输入需求标题'
    if (!formData.platform) newErrors.platform = '请选择目标平台'
    if (!formData.deliverable_format) newErrors.deliverable_format = '请选择交付格式'
    if (!formData.budget_min || parseInt(formData.budget_min) <= 0) newErrors.budget_min = '请输入有效预算下限'
    if (!formData.budget_max || parseInt(formData.budget_max) <= 0) newErrors.budget_max = '请输入有效预算上限'
    if (formData.budget_min && formData.budget_max && parseInt(formData.budget_min) > parseInt(formData.budget_max)) {
      newErrors.budget_max = '预算上限不能低于预算下限'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep1() || !validateStep2()) return

    if (!user) {
      router.push('/login')
      return
    }

    setSubmitting(true)

    const currentLevel = LEVELS.find(l => l.level === selectedLevel)
    const urgentFee = formData.is_urgent ? Math.round(parseInt(formData.budget_max) * 0.2) : 0

    if (!isSupabaseConfigured()) {
      alert('发布成功！（演示模式：需求已保存到本地状态）')
      router.push('/orders')
      setSubmitting(false)
      return
    }

    try {
      const supabase = getSupabase()
      const { error } = await supabase.from('orders').insert([
        {
          seller_id: user.id,
          scene: selectedScene,
          level: selectedLevel,
          title: formData.title,
          description: formData.description,
          platform: formData.platform,
          requirements: formData.requirements,
          deliverable_format: formData.deliverable_format,
          budget_min: parseInt(formData.budget_min),
          budget_max: parseInt(formData.budget_max),
          status: 'pending',
          is_pinned: false,
          is_urgent: formData.is_urgent,
          urgent_fee: urgentFee,
        },
      ])

      if (error) {
        console.error('发布需求失败:', error)
        alert('发布失败，请稍后重试')
      } else {
        router.push('/orders')
      }
    } catch (err) {
      console.error('发布需求失败:', err)
      alert('发布失败，请稍后重试')
    }

    setSubmitting(false)
  }

  const currentLevelConfig = LEVELS.find(l => l.level === selectedLevel)
  const currentSceneConfig = SCENES.find(s => s.key === selectedScene)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">发布需求</h1>
          <p className="text-gray-500">填写标准化需求模板，快速匹配合适的开发者</p>
        </div>

        <div className="bg-white rounded-xl shadow-card p-8">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="font-medium">选择场景</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className="font-medium">填写需求</span>
            </div>
          </div>

          <div className={`${step === 1 ? 'block' : 'hidden'}`}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">第一步：选择需求场景</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SCENES.map((scene) => (
                  <button
                    key={scene.key}
                    onClick={() => setSelectedScene(scene.key)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedScene === scene.key
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      selectedScene === scene.key ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {iconMap[scene.icon]}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{scene.label}</h3>
                    <p className="text-sm text-gray-500">{scene.description}</p>
                  </button>
                ))}
              </div>
              {errors.scene && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.scene}
                </p>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">第二步：选择订单等级</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {LEVELS.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => setSelectedLevel(level.level)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedLevel === level.level
                        ? level.level === 'S' ? 'border-red-500 bg-red-50' :
                          level.level === 'A' ? 'border-orange-500 bg-orange-50' :
                          'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-2xl font-bold ${
                        level.level === 'S' ? 'text-red-600' :
                        level.level === 'A' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {level.level}级
                      </span>
                      <span className="text-sm text-gray-600">{level.label.split('（')[1]?.replace('）', '')}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700"><strong>适用场景：</strong>{level.scene}</p>
                      <p className="text-gray-700"><strong>交付周期：</strong>{level.delivery_days}天</p>
                      <p className="text-gray-700"><strong>参考价格：</strong>¥{level.price_min}-{level.price_max}</p>
                    </div>
                  </button>
                ))}
              </div>
              {errors.level && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.level}
                </p>
              )}
            </div>

            {currentLevelConfig && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">交付标准说明</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2"><strong>交付内容：</strong></p>
                    <ul className="space-y-1">
                      {currentLevelConfig.standard.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2"><strong>售后范围：</strong></p>
                    <p className="text-sm text-gray-700">{currentLevelConfig.warranty_scope}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-gradient-primary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              下一步：填写需求详情
            </button>
          </div>

          <div className={`${step === 2 ? 'block' : 'hidden'}`}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedScene === 'data_crawl' ? 'bg-blue-100 text-blue-600' :
                  selectedScene === 'automation' ? 'bg-purple-100 text-purple-600' :
                  selectedScene === 'dashboard' ? 'bg-green-100 text-green-600' :
                  selectedScene === 'indie_store' ? 'bg-pink-100 text-pink-600' :
                  selectedScene === 'batch' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-teal-100 text-teal-600'
                }`}>
                  {iconMap[currentSceneConfig?.icon || 'Database']}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{currentSceneConfig?.label}</h3>
                  <p className="text-sm text-gray-500">{currentSceneConfig?.description}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">需求标题 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.title ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="简要描述您的需求"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">需求描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="详细描述您的需求背景和期望效果"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">目标平台 *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      errors.platform ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">请选择目标平台</option>
                    {PLATFORMS.map((platform) => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                  {errors.platform && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.platform}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">交付格式 *</label>
                  <select
                    value={formData.deliverable_format}
                    onChange={(e) => setFormData({ ...formData, deliverable_format: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      errors.deliverable_format ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">请选择交付格式</option>
                    {DELIVERY_FORMATS.map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                  {errors.deliverable_format && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.deliverable_format}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">功能需求清单</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="列出具体需要实现的功能点，每行一个"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预算下限（元）*</label>
                  <input
                    type="number"
                    value={formData.budget_min}
                    onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      errors.budget_min ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={`${currentLevelConfig?.price_min || 300}`}
                    min={currentLevelConfig?.price_min || 0}
                  />
                  {errors.budget_min && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.budget_min}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预算上限（元）*</label>
                  <input
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      errors.budget_max ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={`${currentLevelConfig?.price_max || 800}`}
                    min={parseInt(formData.budget_min) || 0}
                  />
                  {errors.budget_max && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.budget_max}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">加急服务</h4>
                  <p className="text-sm text-gray-500">缩短50%交付时间，额外收取订单金额20%服务费</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_urgent}
                    onChange={(e) => setFormData({ ...formData, is_urgent: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                返回
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-gradient-primary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? '发布中...' : '发布需求'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}