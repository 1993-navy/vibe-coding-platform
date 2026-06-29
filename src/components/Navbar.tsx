'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, User, Zap, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { getSupabase } from '@/lib/supabase'

export default function Navbar() {
  const { user } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">VibeCoding</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              首页
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              作品广场
            </Link>
            <Link href="/workspace" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              接单大厅
            </Link>
            <Link href="/publish" className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
              发布需求
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="hidden sm:inline text-gray-700 font-medium">{user.nickname}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card-hover border border-gray-100 py-2">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      个人主页
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      订单管理
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                        后台管理
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  登录
                </Link>
                <Link href="/register" className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
                  注册
                </Link>
              </div>
            )}

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-primary-600 font-medium">
              首页
            </Link>
            <Link href="/marketplace" className="block text-gray-700 hover:text-primary-600 font-medium">
              作品广场
            </Link>
            <Link href="/workspace" className="block text-gray-700 hover:text-primary-600 font-medium">
              接单大厅
            </Link>
            <Link href="/publish" className="block bg-gradient-primary text-white px-4 py-2 rounded-lg text-center font-medium">
              发布需求
            </Link>
            {!user && (
              <div className="flex space-x-4 pt-4 border-t">
                <Link href="/login" className="flex-1 text-center text-gray-700 font-medium">
                  登录
                </Link>
                <Link href="/register" className="flex-1 bg-gradient-primary text-white px-4 py-2 rounded-lg text-center font-medium">
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}