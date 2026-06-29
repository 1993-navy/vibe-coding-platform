import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null
let isConfigured = false

export function isSupabaseConfigured(): boolean {
  if (isConfigured) return true
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    isConfigured = false
    return false
  }
  
  if (url === 'YOUR_SUPABASE_URL' || key === 'YOUR_SUPABASE_ANON_KEY') {
    isConfigured = false
    return false
  }
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    isConfigured = false
    return false
  }
  
  isConfigured = true
  return true
}

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance
  }
  
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase] 未配置有效凭证，返回空客户端')
    supabaseInstance = createClient('https://demo.supabase.co', 'demo-key', {
      auth: { persistSession: false },
      global: { headers: { 'X-Demo-Mode': 'true' } }
    })
    return supabaseInstance
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  try {
    supabaseInstance = createClient(url, key, {
      auth: { persistSession: true }
    })
    return supabaseInstance
  } catch (error) {
    console.error('[Supabase] 客户端初始化失败:', error)
    supabaseInstance = createClient('https://demo.supabase.co', 'demo-key', {
      auth: { persistSession: false }
    })
    return supabaseInstance
  }
}

export { SupabaseClient }
