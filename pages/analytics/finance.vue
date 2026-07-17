<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Financial Analytics</h1>
        <p class="text-sm mt-1 text-slate-500">Deep dive into revenue, margins, and payment methods.</p>
      </div>
      
      <!-- Date Filter (Mock UI) & Export -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm">
          <button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button>
          <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button>
        </div>
        <button class="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 flex items-center gap-2">
          <Icon name="heroicons:document-arrow-down" class="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">
      <NuxtLink to="/analytics" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Overview</NuxtLink>
      <NuxtLink to="/analytics/finance" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Finance</NuxtLink>
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
        <KpiCard title="Gross Revenue" :value="formatRupiah(data.kpi.grossRevenue)" icon="heroicons:banknotes" accent="#3B82F6" />
        <KpiCard title="Net Revenue (Est.)" :value="formatRupiah(data.kpi.netRevenue)" icon="heroicons:currency-dollar" accent="#10B981" />
        <KpiCard title="Platform Margin" :value="formatRupiah(data.kpi.margin)" icon="heroicons:scale" accent="#F59E0B" />
        <KpiCard title="Avg Order Value" :value="formatRupiah(data.kpi.aov)" icon="heroicons:shopping-bag" accent="#8B5CF6" />
        <KpiCard title="Refund Rate" :value="`${data.kpi.refundRate}%`" icon="heroicons:arrow-uturn-left" accent="#EF4444" />
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sales Trend Line Chart -->
        <div class="lg:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Daily Sales Trend (Gross)</h2>
          <VChart v-if="salesOption" :option="salesOption" autoresize class="h-80 w-full" />
        </div>
        
        <!-- Payment Method Pie Chart -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Payment Methods Breakdown</h2>
          <VChart v-if="paymentOption" :option="paymentOption" autoresize class="h-80 w-full" />
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
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { api } from '~/utils/api'

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

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
    const res = await api.get('/admin/analytics/finance')
    if (res) {
      data.value = res
    }
  } catch (err) {
    console.error("Failed to fetch finance analytics", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const salesOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: Rp {c}' },
    grid: { left: 50, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: data.value.charts.salesTrend.dates },
    yAxis: { type: 'value', axisLabel: { formatter: (v: number) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v } },
    series: [
      {
        name: 'Gross Sales',
        type: 'line',
        smooth: true,
        data: data.value.charts.salesTrend.values,
        itemStyle: { color: '#3B82F6' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#3B82F644' }, { offset: 1, color: '#3B82F600' }]
          }
        }
      }
    ]
  }
})

const paymentOption = computed(() => {
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
        data: data.value.charts.paymentMethods.map((pm: any) => ({
          name: pm.name || 'Unknown',
          value: pm.value
        }))
      }
    ]
  }
})
</script>
