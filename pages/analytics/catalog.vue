<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Catalog & Ecosystem Insights</h1>
        <p class="text-sm mt-1 text-slate-500">Macro-level analysis of platform products, categories, and stock health.</p>
      </div>
      
      <!-- Date Filter -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm">
          <button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button>
          <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">
      <NuxtLink to="/analytics" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Overview</NuxtLink>
      <NuxtLink to="/analytics/finance" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Finance</NuxtLink>
      <NuxtLink to="/analytics/merchants" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Merchants</NuxtLink>
      <NuxtLink to="/analytics/ai-usage" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">AI & Usage</NuxtLink>
      <NuxtLink to="/analytics/catalog" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Catalog Insights</NuxtLink>
      <NuxtLink to="/analytics/reports" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Reports</NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
    </div>

    <template v-else>
      <!-- Global KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Platform SKUs" :value="data.kpi.totalSku.toLocaleString('id-ID')" icon="heroicons:cube-transparent" accent="#3B82F6" />
        <KpiCard title="Active Products" :value="data.kpi.activeSku.toLocaleString('id-ID')" icon="heroicons:check-circle" accent="#10B981" />
        <KpiCard title="Stockout Rate" :value="`${data.kpi.stockoutRate.toFixed(1)}%`" icon="heroicons:archive-box-x-mark" accent="#EF4444" />
        <KpiCard title="Avg Price Index" :value="formatRupiah(data.kpi.avgPrice)" icon="heroicons:tag" accent="#8B5CF6" />
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Catalog Growth Trend -->
        <div class="lg:col-span-2 bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Catalog Growth Trend (New Products)</h2>
          <VChart v-if="growthOption" :option="growthOption" autoresize class="h-80 w-full" />
        </div>
        
        <!-- Category Saturation -->
        <div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Category Saturation</h2>
          <VChart v-if="saturationOption" :option="saturationOption" autoresize class="h-80 w-full" />
        </div>
      </div>

      <!-- Category Performance Table -->
      <div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div class="p-5 border-b border-[var(--wp-border)] bg-slate-50/50">
          <h2 class="text-base font-bold text-[var(--wp-navy)]">Category Performance Matrix</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-600 table-fixed">
            <thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider">
              <tr>
                <th class="px-5 py-3 w-2/5">Category Name</th>
                <th class="px-5 py-3 w-1/5 text-right">Total SKUs</th>
                <th class="px-5 py-3 w-1/5 text-right">Avg Price</th>
                <th class="px-5 py-3 w-1/5 text-right">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.tables.categoryPerformance.length">
                <td colspan="4" class="px-5 py-8 text-center text-slate-400">No category data available</td>
              </tr>
              <tr v-for="(cat, i) in data.tables.categoryPerformance" :key="i" class="border-b border-[var(--wp-border)] last:border-b-0 hover:bg-slate-50 transition-colors">
                <td class="px-5 py-3 font-bold text-[var(--wp-navy)] truncate">{{ cat.category }}</td>
                <td class="px-5 py-3 text-right">{{ cat.totalSku.toLocaleString('id-ID') }}</td>
                <td class="px-5 py-3 text-right">{{ formatRupiah(cat.avgPrice) }}</td>
                <td class="px-5 py-3 text-right font-bold" style="color: var(--wp-navy);">{{ cat.qtySold.toLocaleString('id-ID') }}</td>
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
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { api } from '~/utils/api'

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const loading = ref(true)
const data = ref<any>(null)

const formatRupiah = (value: number) => {
  if (!value) return 'Rp 0'
  return `Rp ${value.toLocaleString('id-ID')}`
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/analytics/catalog')
    if (res) {
      data.value = res
    }
  } catch (err) {
    console.error("Failed to fetch catalog analytics", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const growthOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: +{c} Products' },
    grid: { left: 40, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: data.value.charts.catalogGrowth.dates },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'New Products',
        type: 'line',
        smooth: true,
        data: data.value.charts.catalogGrowth.values,
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

const saturationOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} SKUs ({d}%)' },
    legend: { bottom: 0, type: 'scroll' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data: data.value.charts.categorySaturation
      }
    ]
  }
})
</script>
