'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { UserRole } from '@/types'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    role: 'seller' as UserRole,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<UserRole>('seller')
  const [demoMode, setDemoMode] = useState(false)
  const router = useRouter()
  const { setUser } = useAuthStore()

  useEffect(() => {
    setDemoMode(!isSupabaseConfigured())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (demoMode) {
      const demoUserId = 'demo-user-' + Date.now()
      const demoUserCount = Math.floor(Math.random() * 120)
      const isSeed = demoUserCount < 100

      setUser({
        id: demoUserId,
        email: formData.email,
        nickname: formData.nickname || '演示用户',
        role: role,
        is_seed: isSeed,
        is_member: false,
        joined_at: new Date().toISOString(),
        completion_rate: 100,
        rating: 5,
        response_time: 0,
      })

      if (isSeed) {
        alert('恭喜！您成为第 ' + (demoUserCount + 1) + ' 位种子用户，享受永久免抽佣特权！')
      }

      router.push('/')
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabase()
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nickname: formData.nickname,
            role: role,
          },
        },
      })

      if (authError) {
        setError(authError.message)
      } else {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { count } = await supabase.from('users').select('id', { count: 'exact' })
          const isSeed = (count || 0) < 100

          await supabase.from('users').insert([
            {
              id: user.id,
              email: formData.email,
              nickname: formData.nickname,
              role: role,
              is_seed: isSeed,
              is_member: false,
              joined_at: new Date().toISOString(),
              completion_rate: 100,
              rating: 5,
              response_time: 0,
            },
          ])

          if (isSeed) {
            alert('恭喜！您成为第 ' + ((count || 0) + 1) + ' 位种子用户，享受永久免抽佣特权！')
          }
        }
        
        router.push('/')
      }
    } catch (err) {
      setError('注册失败，请稍后重试')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-card-hover p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">创建账号</h1>
          <p className="text-gray-500 text-center mb-6">加入 VibeCoding 社区</p>

          {demoMode && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">演示模式</p>
                  <p className="text-xs text-yellow-600">当前未配置 Supabase，注册功能为演示版本</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">昵称</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入昵称"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入邮箱"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">身份选择</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    role === 'seller'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {role === 'seller' && <CheckCircle className="w-5 h-5 text-primary-600" />}
                    <span className="font-medium text-gray-800">跨境卖家</span>
                  </div>
                  <p className="text-sm text-gray-500">发布需求，定制工具</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('developer')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    role === 'developer'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {role === 'developer' && <CheckCircle className="w-5 h-5 text-primary-600" />}
                    <span className="font-medium text-gray-800">开发者</span>
                  </div>
                  <p className="text-sm text-gray-500">接单开发，赚取收益</p>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              已有账号？{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}