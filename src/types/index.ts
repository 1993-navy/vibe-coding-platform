export type UserRole = 'seller' | 'developer' | 'admin'

export type OrderLevel = 'S' | 'A' | 'B'

export type SceneType = 'data_crawl' | 'automation' | 'dashboard' | 'indie_store' | 'batch' | 'compliance'

export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'in_progress' 
  | 'draft_submitted' 
  | 'draft_confirmed' 
  | 'final_submitted' 
  | 'final_confirmed' 
  | 'in_warranty' 
  | 'completed' 
  | 'disputed'

export type DisputeStatus = 'pending' | 'reviewing' | 'resolved'

export type DisputeDecision = 'seller_win' | 'developer_win' | 'compromise'

export interface User {
  id: string
  email: string
  phone?: string
  nickname: string
  avatar_url?: string
  role: UserRole
  is_seed: boolean
  is_member: boolean
  joined_at: string
  completion_rate: number
  rating: number
  response_time: number
}

export interface Order {
  id: string
  seller_id: string
  developer_id?: string
  scene: SceneType
  level: OrderLevel
  title: string
  description?: string
  platform?: string
  requirements?: string
  deliverable_format?: string
  budget_min: number
  budget_max: number
  actual_amount?: number
  status: OrderStatus
  created_at: string
  accepted_at?: string
  draft_submitted_at?: string
  draft_confirmed_at?: string
  final_submitted_at?: string
  final_confirmed_at?: string
  warranty_end_at?: string
  completed_at?: string
  is_pinned: boolean
  is_urgent: boolean
  urgent_fee: number
}

export interface Work {
  id: string
  developer_id: string
  title: string
  scene: SceneType
  level: OrderLevel
  description?: string
  features?: string
  cover_url?: string
  demo_video_url?: string
  doc_url?: string
  price: number
  rating: number
  sales_count: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  order_id: string
  reviewer_id: string
  rating: number
  content?: string
  created_at: string
}

export interface Dispute {
  id: string
  order_id: string
  initiator_id: string
  reason: string
  evidence?: string
  status: DisputeStatus
  decision?: DisputeDecision
  decision_note?: string
  created_at: string
  resolved_at?: string
}

export interface SceneConfig {
  key: SceneType
  label: string
  description: string
  icon: string
}

export interface LevelConfig {
  level: OrderLevel
  label: string
  scene: string
  delivery_days: number
  price_min: number
  price_max: number
  standard: string[]
  warranty_days: number
  warranty_scope: string
}

export const SCENES: SceneConfig[] = [
  { key: 'data_crawl', label: '数据抓取', description: '亚马逊/Ebay/TikTok等平台数据采集', icon: 'Database' },
  { key: 'automation', label: '自动化脚本', description: '批量操作、流程自动化工具', icon: 'Bot' },
  { key: 'dashboard', label: '数据看板', description: '销售数据可视化、报表分析', icon: 'BarChart3' },
  { key: 'indie_store', label: '独立站功能', description: 'Shopify/WooCommerce插件开发', icon: 'ShoppingBag' },
  { key: 'batch', label: '批量处理', description: '批量编辑、翻译、格式转换', icon: 'Layers' },
  { key: 'compliance', label: '合规辅助', description: '税务申报、商标查询、合规检测', icon: 'ShieldCheck' },
]

export const LEVELS: LevelConfig[] = [
  {
    level: 'S',
    label: 'S级（脚本类）',
    scene: '数据抓取、批量操作、简单自动化',
    delivery_days: 1,
    price_min: 300,
    price_max: 800,
    standard: ['可运行脚本', '使用文档', '演示视频'],
    warranty_days: 7,
    warranty_scope: '7天内bug免费修复，不含功能新增',
  },
  {
    level: 'A',
    label: 'A级（工具类）',
    scene: '数据看板、轻量Web工具、独立站单功能',
    delivery_days: 3,
    price_min: 800,
    price_max: 3000,
    standard: ['可部署源码', '部署文档', '1次免费部署'],
    warranty_days: 14,
    warranty_scope: '14天内bug免费修复，1次小范围功能调整',
  },
  {
    level: 'B',
    label: 'B级（小型应用）',
    scene: '多平台聚合工具、简单管理系统',
    delivery_days: 7,
    price_min: 3000,
    price_max: 8000,
    standard: ['完整源码', '部署文档', '操作培训'],
    warranty_days: 30,
    warranty_scope: '30天内bug免费修复，2次小范围功能调整',
  },
]

export const PLATFORMS = [
  '亚马逊',
  'eBay',
  'Wish',
  'AliExpress',
  'Shopify',
  'WooCommerce',
  'TikTok Shop',
  'Shopee',
  'Lazada',
  '其他',
]

export const DELIVERY_FORMATS = [
  'Python脚本',
  'JavaScript脚本',
  'Excel/VBA',
  'Web应用',
  'Chrome插件',
  'API接口',
  '其他',
]