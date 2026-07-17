<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Analytics Center</h1>
        <p class="text-sm mt-1 text-slate-500">Comprehensive insights into platform performance.</p>
      </div>
      
      <!-- Date Filter (Mock UI) -->
      <div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm">
        <button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button>
        <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button>
        <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">All Time</button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">
      <NuxtLink to="/analytics" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Overview</NuxtLink>
      <NuxtLink to="/analytics/finance" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Finance</NuxtLink>
      <NuxtLink to="/analytics/merchants" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Merchants</NuxtLink>
      <NuxtLink to="/analytics/ai-usage" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">AI & Usage</NuxtLink>
      <NuxtLink to="/analytics/catalog" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Catalog Insights</NuxtLink>
      <NuxtLink to="/analytics/reports" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Reports</NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
    </div>

    <template v-else>
      <!-- Global KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard title="Total Omzet" :value="formatRupiah(data.kpi.totalRevenue)" icon="heroicons:banknotes" accent="#3B82F6" />
        <KpiCard title="Total Transaksi" :value="data.kpi.totalTransactions.toLocaleString('id-ID')" icon="heroicons:receipt-percent" accent="#10B981" />
        <KpiCard title="Avg Omzet/Toko" :value="formatRupiah(data.kpi.avgRevenuePerStore)" icon="heroicons:chart-bar" accent="#F59E0B" />
        <KpiCard title="Total Produk" :value="data.kpi.totalProducts.toLocaleString('id-ID')" icon="heroicons:cube" accent="#8B5CF6" />
        <KpiCard title="Growth (MoM)" :value="`+${data.kpi.growthMoM}%`" icon="heroicons:arrow-trending-up" accent="#EC4899" />
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Revenue Trend Line Chart -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Platform Revenue Trend</h2>
          <VChart v-if="revenueOption" :option="revenueOption" autoresize class="h-72 w-full" />
        </div>
        
        <!-- AI Activity Area Chart -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">AI Chat Activity</h2>
          <VChart v-if="aiOption" :option="aiOption" autoresize class="h-72 w-full" />
        </div>
      </div>

      <!-- Secondary Charts & Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Top 10 Merchants Bar Chart -->
        <div class="lg:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Top 10 Merchants (by Revenue)</h2>
          <VChart v-if="topMerchantsOption" :option="topMerchantsOption" autoresize class="h-72 w-full" />
        </div>

        <!-- Category Distribution Pie Chart -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Category Distribution</h2>
          <VChart v-if="categoryOption" :option="categoryOption" autoresize class="h-72 w-full" />
        </div>
      </div>

      <!-- Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Trending Products -->
        <div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="p-4 border-b bg-slate-50/50">
            <h2 class="text-sm font-bold text-slate-800">🔥 Trending Products</h2>
          </div>
          <table class="w-full text-left text-sm text-slate-600">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
              <tr>
                <th class="px-6 py-3">Product Name</th>
                <th class="px-6 py-3 text-right">Qty Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.tables.trendingProducts.length">
                <td colspan="2" class="px-6 py-8 text-center text-slate-400">No data available</td>
              </tr>
              <tr v-for="(p, i) in data.tables.trendingProducts" :key="i" class="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <td class="px-6 py-3 font-medium">{{ p.name }}</td>
                <td class="px-6 py-3 text-right font-bold text-blue-600">{{ p.sold }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Low Stock Alerts Global -->
        <div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="p-4 border-b bg-red-50/50 flex justify-between items-center">
            <h2 class="text-sm font-bold text-red-700">⚠️ Global Low Stock Alerts</h2>
            <NuxtLink to="/analytics/stocks" class="text-xs text-red-600 hover:underline">View All</NuxtLink>
          </div>
          <table class="w-full text-left text-sm text-slate-600">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
              <tr>
                <th class="px-6 py-3">Product</th>
                <th class="px-6 py-3">Merchant</th>
                <th class="px-6 py-3 text-right">Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.tables.lowStocks.length">
                <td colspan="3" class="px-6 py-8 text-center text-slate-400">All stocks are healthy!</td>
              </tr>
              <tr v-for="(ls, i) in data.tables.lowStocks" :key="i" class="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <td class="px-6 py-3 font-medium">{{ ls.product }}</td>
                <td class="px-6 py-3 text-xs text-slate-500">{{ ls.store }}</td>
                <td class="px-6 py-3 text-right font-bold text-red-600">{{ ls.stock }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { api } from '~/utils/api'

use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const loading = ref(true)
const data = ref<any>(null)

const formatRupiah = (value: number) => {
  if (!value) return 'Rp 0'
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}M`
  return `Rp ${value.toLocaleString('id-ID')}`
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/analytics/deep-overview')
    if (res) {
      data.value = res
    }
  } catch (err) {
    console.error("Failed to fetch analytics", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const revenueOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: Rp {c}' },
    grid: { left: 50, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: data.value.charts.revenueTrend.dates },
    yAxis: { type: 'value', axisLabel: { formatter: (v: number) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v } },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        data: data.value.charts.revenueTrend.values,
        itemStyle: { color: '#10B981' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#10B98144' }, { offset: 1, color: '#10B98100' }]
          }
        }
      }
    ]
  }
})

const aiOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: data.value.charts.aiActivity.dates },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'AI Requests',
        type: 'line',
        smooth: true,
        data: data.value.charts.aiActivity.values,
        itemStyle: { color: '#8B5CF6' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#8B5CF644' }, { offset: 1, color: '#8B5CF600' }]
          }
        }
      }
    ]
  }
})

const topMerchantsOption = computed(() => {
  if (!data.value) return null
  const items = data.value.charts.topMerchants.slice().reverse()
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 120, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'value', axisLabel: { formatter: (v: number) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v } },
    yAxis: { type: 'category', data: items.map((i: any) => i.name), axisLabel: { width: 100, overflow: 'truncate' } },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: items.map((i: any) => i.revenue),
        itemStyle: { color: '#3B82F6', borderRadius: [0, 4, 4, 0] }
      }
    ]
  }
})

const categoryOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, type: 'scroll' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data: data.value.charts.categories
      }
    ]
  }
})
</script>
