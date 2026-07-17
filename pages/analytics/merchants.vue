<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Merchants Performance</h1>
        <p class="text-sm mt-1 text-slate-500">Track acquisition, churn, and top performing sellers.</p>
      </div>
      
      <!-- Date Filter (Mock UI) & Map Link -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm">
          <button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button>
          <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button>
        </div>
        <NuxtLink to="/merchants/map" class="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 flex items-center gap-2">
          <Icon name="heroicons:map" class="w-4 h-4" />
          View Live Map
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">
      <NuxtLink to="/analytics" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Overview</NuxtLink>
      <NuxtLink to="/analytics/finance" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Finance</NuxtLink>
      <NuxtLink to="/analytics/merchants" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Merchants</NuxtLink>
      <NuxtLink to="/analytics/ai-usage" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">AI & Usage</NuxtLink>
      <NuxtLink to="/analytics/catalog" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Catalog Insights</NuxtLink>
      <NuxtLink to="/analytics/reports" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Reports</NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
    </div>

    <template v-else>
      <!-- Global KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Merchants" :value="data.kpi.totalMerchants.toLocaleString('id-ID')" icon="heroicons:building-storefront" accent="#3B82F6" />
        <KpiCard title="New Merchants (30d)" :value="`+${data.kpi.newMerchants.toLocaleString('id-ID')}`" icon="heroicons:user-plus" accent="#10B981" />
        <KpiCard title="Active Ratio" :value="`${data.kpi.activeRatio}%`" icon="heroicons:check-badge" accent="#8B5CF6" />
        <KpiCard title="Churn Rate" :value="`${data.kpi.churnRate}%`" icon="heroicons:exclamation-triangle" accent="#EF4444" />
      </div>

      <!-- Main Row -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- New Merchant Acquisition Trend -->
        <div class="xl:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">New Merchant Acquisition Trend</h2>
          <VChart v-if="acqOption" :option="acqOption" autoresize class="h-80 w-full" />
        </div>

        <!-- Geographic Performance / Mini Map Hint -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <Icon name="heroicons:map-pin" class="w-8 h-8" />
          </div>
          <h3 class="font-bold text-lg text-slate-800 mb-2">Geographic Distribution</h3>
          <p class="text-sm text-slate-500 mb-6">Explore where your merchants are located around the globe to plan hyper-local campaigns.</p>
          <NuxtLink to="/merchants/map" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition">
            Explore Full Map
          </NuxtLink>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div class="p-5 border-b bg-slate-50 flex items-center justify-between">
          <h2 class="text-base font-bold text-slate-800">🏆 Top Performing Merchants</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-600">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
              <tr>
                <th class="px-6 py-4">Rank</th>
                <th class="px-6 py-4">Store Name</th>
                <th class="px-6 py-4 text-center">Status</th>
                <th class="px-6 py-4 text-right">Total Orders</th>
                <th class="px-6 py-4 text-right">Revenue</th>
                <th class="px-6 py-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.tables.leaderboard.length">
                <td colspan="6" class="px-6 py-10 text-center text-slate-400">No merchant data available</td>
              </tr>
              <tr v-for="(m, i) in data.tables.leaderboard" :key="m.id" class="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-bold" :class="{
                  'text-yellow-500': i === 0,
                  'text-slate-400': i === 1,
                  'text-amber-700': i === 2,
                  'text-slate-500': i > 2
                }">#{{ i + 1 }}</td>
                <td class="px-6 py-4 font-medium text-slate-800">{{ m.store_name }}</td>
                <td class="px-6 py-4 text-center">
                  <span v-if="m.verified" class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">VERIFIED</span>
                  <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">PENDING</span>
                </td>
                <td class="px-6 py-4 text-right">{{ m.orders.toLocaleString('id-ID') }}</td>
                <td class="px-6 py-4 text-right font-bold text-emerald-600">{{ formatRupiah(m.revenue) }}</td>
                <td class="px-6 py-4 text-right text-emerald-600 text-xs font-bold">+{{ m.growth }}%</td>
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
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { api } from '~/utils/api'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

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
    const res = await api.get('/admin/analytics/merchants')
    if (res) {
      data.value = res
    }
  } catch (err) {
    console.error("Failed to fetch merchants analytics", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const acqOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: {c} Merchants' },
    grid: { left: 40, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: data.value.charts.acquisitionTrend.dates },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'New Registrations',
        type: 'bar',
        data: data.value.charts.acquisitionTrend.values,
        itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] }
      }
    ]
  }
})
</script>
