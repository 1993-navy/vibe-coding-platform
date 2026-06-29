'use client'

import { useEffect, useState } from 'react'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { User } from '@/types'

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuthStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setLoading(false)
          setIsReady(true)
          return
        }

        const supabase = getSupabase()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profile) {
            setUser(profile as User)
          }
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            try {
              const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single()
              if (data) setUser(data as User)
            } catch {
              // ignore
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
          }
        })

        return () => {
          authListener?.subscription.unsubscribe()
        }
      } catch {
        console.warn('[Auth] 认证初始化失败，使用演示模式')
      } finally {
        setLoading(false)
        setIsReady(true)
      }
    }

    initializeAuth()
  }, [setUser, setLoading])

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
