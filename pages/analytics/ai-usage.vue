<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">AI Copilot Analytics</h1>
        <p class="text-sm mt-1 text-slate-500">Monitor agentic adoption, success rates, and hallucination logs.</p>
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
      <NuxtLink to="/analytics/ai-usage" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">AI & Usage</NuxtLink>
      <NuxtLink to="/analytics/catalog" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Catalog Insights</NuxtLink>
      <NuxtLink to="/analytics/reports" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Reports</NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
    </div>

    <template v-else>
      <!-- Global KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Copilot Adoption Rate" :value="`${data.kpi.adoptionRate.toFixed(1)}%`" icon="heroicons:users" accent="#3B82F6" />
        <KpiCard title="AI Task Success Rate" :value="`${data.kpi.successRate.toFixed(1)}%`" icon="heroicons:check-badge" accent="#10B981" />
        <KpiCard title="Avg Merchant Rating" :value="`${data.kpi.avgRating.toFixed(1)} / 5.0`" icon="heroicons:star" accent="#F59E0B" />
        <KpiCard title="Tasks Automated" :value="data.kpi.tasksAutomated.toLocaleString('id-ID')" icon="heroicons:cpu-chip" accent="#8B5CF6" />
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- AI Usage Trend -->
        <div class="lg:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Daily Copilot Interactions</h2>
          <VChart v-if="usageOption" :option="usageOption" autoresize class="h-80 w-full" />
        </div>
        
        <!-- Agent Workload Distribution -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold mb-4 text-slate-800">Agent Specialization Workload</h2>
          <VChart v-if="agentOption" :option="agentOption" autoresize class="h-80 w-full" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- AI Needs Attention (Audit Log) -->
        <div class="lg:col-span-2 bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="p-5 border-b bg-rose-50/50 flex items-center justify-between">
            <h2 class="text-base font-bold text-rose-800 flex items-center gap-2">
              <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
              AI Audit Log (Needs Attention)
            </h2>
          </div>
          <div class="overflow-x-auto p-4">
            <div v-if="!data.tables.auditLogs.length" class="text-center py-10 text-slate-400">
              No recent failures or bad ratings. AI is performing optimally!
            </div>
            <div v-else class="space-y-4">
              <div v-for="(log, i) in data.tables.auditLogs" :key="i" class="p-4 border border-rose-100 rounded-xl bg-rose-50/30">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{{ log.store }}</span>
                  <div class="flex items-center gap-1 text-amber-500">
                    <Icon v-for="s in 5" :key="s" :name="s <= (log.rating || 0) ? 'heroicons:star-solid' : 'heroicons:star'" class="w-3 h-3" />
                  </div>
                </div>
                <div class="text-sm font-medium text-slate-800 mb-2">
                  <span class="text-blue-600 font-bold">User:</span> {{ log.message }}
                </div>
                <div class="text-sm text-slate-600 bg-white p-3 rounded-lg border shadow-sm">
                  <span class="text-purple-600 font-bold">AI Reply:</span> {{ log.reply }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Power Users Table -->
        <div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div class="p-5 border-b bg-slate-50">
            <h2 class="text-base font-bold text-slate-800">⚡ Top Power Users</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
              <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
                <tr>
                  <th class="px-6 py-4">Store Name</th>
                  <th class="px-6 py-4 text-right">Interactions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!data.tables.powerUsers.length">
                  <td colspan="2" class="px-6 py-10 text-center text-slate-400">No data available</td>
                </tr>
                <tr v-for="(user, i) in data.tables.powerUsers" :key="i" class="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                  <td class="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                    <span v-if="i === 0" class="text-yellow-500">👑</span>
                    {{ user.store }}
                  </td>
                  <td class="px-6 py-4 text-right font-bold text-blue-600">{{ user.queries.toLocaleString('id-ID') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/analytics/ai-usage')
    if (res) {
      data.value = res
    }
  } catch (err) {
    console.error("Failed to fetch ai analytics", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const usageOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: {c} Interactions' },
    grid: { left: 40, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: data.value.charts.usageTrend.dates },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'AI Interactions',
        type: 'line',
        smooth: true,
        data: data.value.charts.usageTrend.values,
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

const agentOption = computed(() => {
  if (!data.value) return null
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} Tasks ({d}%)' },
    legend: { bottom: 0, type: 'scroll' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data: data.value.charts.agentDistribution
      }
    ]
  }
})
</script>
