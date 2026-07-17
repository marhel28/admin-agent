// ── Analytics Composable ── fetches sales analytics from /stocks/analytics/summary
import { ref, computed } from 'vue'
import { api } from '../utils/api'

export interface KpiSummary {
  total_revenue: number
  total_profit: number
  total_transactions: number
  avg_order_value: number
  revenue_change_pct: number
  profit_change_pct: number
  transactions_change_pct: number
  aov_change_pct: number
}

export interface TrendPoint {
  date: string
  revenue: number
  profit: number
  transactions: number
}

export interface CategorySlice {
  category: string
  revenue: number
  percentage: number
}

export interface PaymentSlice {
  method: string
  count: number
  total: number
  percentage: number
}

export interface TopProduct {
  product_name: string
  category: string
  quantity_sold: number
  revenue: number
  profit: number
}

export interface RecentSale {
  uuid: string
  invoice_number: string
  customer_name: string | null
  total: number
  payment_method: string | null
  status: string
  created_at: string
}

export interface AnalyticsData {
  kpi: KpiSummary
  trend: TrendPoint[]
  by_category: CategorySlice[]
  by_payment: PaymentSlice[]
  top_products: TopProduct[]
  recent_sales: RecentSale[]
}

export const useAnalytics = () => {
  const period = ref<'today' | 'week' | 'month' | 'year'>('month')
  const data = ref<AnalyticsData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAnalytics = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await api.get('/stocks/analytics/summary', {
        params: { period: period.value },
      })
      data.value = result as AnalyticsData
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch analytics'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  const setPeriod = async (p: 'today' | 'week' | 'month' | 'year') => {
    period.value = p
    await fetchAnalytics()
  }

  // Format currency in IDR
  const formatRupiah = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(1)}M`
    }
    if (value >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(1)}M`
    }
    if (value >= 1_000) {
      return `Rp ${(value / 1_000).toFixed(0)}K`
    }
    return `Rp ${value.toLocaleString('id-ID')}`
  }

  const formatCompact = (value: number): string => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
    return `${value}`
  }

  const formatPct = (value: number): string => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value}%`
  }

  return {
    period,
    data,
    loading,
    error,
    fetchAnalytics,
    setPeriod,
    formatRupiah,
    formatCompact,
    formatPct,
  }
}
