<template>
  <div class="space-y-6 animate-fade-in pb-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
      <div>
        <h1 class="text-3xl font-black tracking-tight" style="color: var(--wp-navy);">Command Center</h1>
        <p class="text-sm mt-1 text-slate-500 font-medium">Real-time macro analytics & ecosystem database.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-5 py-2 text-xs font-bold rounded-xl shadow-sm text-white transition-transform hover:scale-105 flex items-center gap-2"
          style="background: linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark));">
          <Icon name="heroicons:plus" class="w-4 h-4" />
          Onboard Merchant
        </button>
        <button @click="fetchData" class="px-4 py-2 text-xs font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
          <Icon name="heroicons:arrow-path" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Live Sync
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !stats.totalMerchants" class="flex justify-center items-center h-40">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
    </div>

    <template v-else>
      <!-- KPI Cards with Sparklines -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Merch KPI -->
        <div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Merchants</h3>
            <Icon name="heroicons:building-storefront" class="w-5 h-5 text-blue-500" />
          </div>
          <div class="text-3xl font-black text-slate-800">{{ stats.totalMerchants.toLocaleString('id-ID') }}</div>
          <div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
            <Icon name="heroicons:arrow-trending-up" class="w-3 h-3" /> +12% this month
          </div>
        </div>

        <!-- Users KPI -->
        <div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Users</h3>
            <Icon name="heroicons:users" class="w-5 h-5 text-emerald-500" />
          </div>
          <div class="text-3xl font-black text-slate-800">{{ stats.activeUsers.toLocaleString('id-ID') }}</div>
          <div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
            <Icon name="heroicons:arrow-trending-up" class="w-3 h-3" /> Peak engagement
          </div>
        </div>

        <!-- Revenue KPI -->
        <div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total GMV</h3>
            <Icon name="heroicons:banknotes" class="w-5 h-5 text-purple-500" />
          </div>
          <div class="text-3xl font-black text-slate-800">{{ formatRupiah(stats.totalRevenue || 0) }}</div>
          <div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
            <Icon name="heroicons:chart-bar" class="w-3 h-3" /> Stable growth
          </div>
        </div>

        <!-- Transactions KPI -->
        <div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Transactions</h3>
            <Icon name="heroicons:document-text" class="w-5 h-5 text-amber-500" />
          </div>
          <div class="text-3xl font-black text-slate-800">{{ (stats.totalTransactions || 0).toLocaleString('id-ID') }}</div>
          <div class="mt-2 text-xs font-medium text-amber-600 flex items-center gap-1">
            <Icon name="heroicons:bolt" class="w-3 h-3" /> High velocity
          </div>
        </div>
      </div>

      <!-- Map & Charts Row -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="xl:col-span-2 bg-white border rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-slate-800">Geospatial Distribution</h2>
              <p class="text-xs text-slate-500">Live coordinates of all registered merchants</p>
            </div>
            <NuxtLink to="/merchants/map" class="px-3 py-1.5 bg-slate-50 border text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">Expand Map &rarr;</NuxtLink>
          </div>
          <div class="flex-1 w-full min-h-[350px] rounded-xl overflow-hidden border">
            <MiniMap />
          </div>
        </div>
        
        <!-- Charts -->
        <div class="flex flex-col gap-6">
          <div class="bg-white border rounded-2xl p-6 shadow-sm flex-1">
            <h2 class="text-base font-bold text-slate-800 mb-1">Ecosystem Growth</h2>
            <p class="text-xs text-slate-500 mb-4">30-day trailing merchant acquisition</p>
            <VChart v-if="growthOption" :option="growthOption" autoresize class="h-40 w-full" />
          </div>
          
          <div class="bg-white border rounded-2xl p-6 shadow-sm flex-1">
            <h2 class="text-base font-bold text-slate-800 mb-1">Category Saturation</h2>
            <p class="text-xs text-slate-500 mb-4">Market share by business type</p>
            <VChart v-if="categoryOption" :option="categoryOption" autoresize class="h-40 w-full" />
          </div>
        </div>
      </div>

      <!-- Advanced Data Grid (AG Grid) -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-[650px]">
        <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Database Pedagang (Expert View)</h2>
              <span class="px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                AG Grid Engine
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tampilan data pedagang berkinerja tinggi dengan pencarian & filter instan.</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" v-model="gridSearch" placeholder="Cari di seluruh kolom..." class="pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg w-72 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm" />
            </div>
            <NuxtLink to="/merchants" class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs">
              <span>Buka Halaman Pedagang</span>
              <Icon name="heroicons:arrow-right" class="w-3.5 h-3.5 text-slate-400" />
            </NuxtLink>
          </div>
        </div>
        
        <div class="flex-1 w-full h-full p-3 relative bg-slate-50/30 dark:bg-slate-900/40">
          <ag-grid-vue
            class="ag-theme-quartz w-full h-full custom-ag-grid"
            :columnDefs="colDefs"
            :rowData="gridData"
            :defaultColDef="defaultColDef"
            :pagination="true"
            :paginationPageSize="20"
            :quickFilterText="gridSearch"
            :animateRows="true"
            rowSelection="single"
            :rowHeight="64"
            :headerHeight="44"
          >
          </ag-grid-vue>
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

// AG Grid Imports
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const loading = ref(true)

const stats = ref({
totalMerchants: 0,
activeUsers: 0,
aiRequests: 0,
totalTransactions: 0,
totalRevenue: 0
})

const growthData = ref({ dates: [], values: [] })
const categoryData = ref([])

// AG Grid State
const gridData = ref([])
const gridSearch = ref('')

const colDefs = ref([
  { 
    field: 'store_name', 
    headerName: 'Nama Toko / Email', 
    flex: 2.2, 
    filter: true, 
    sortable: true,
    cellRenderer: (p: any) => {
      const initials = (p.value || '?').substring(0, 2).toUpperCase()
      const name = p.value || p.data?.name || 'Merchant Tanpa Nama'
      const email = p.data?.email || 'Belum ada email'
      
      const imgHtml = p.data?.photo_profile 
        ? `<img src="${p.data.photo_profile}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(226, 232, 240, 0.8); flex-shrink: 0;" />`
        : `<div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #0F1A2E, #1E293B); color: #F59E0B; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; border: 1px solid rgba(245, 158, 11, 0.2);">${initials}</div>`
      
      return `<div style="display: flex; align-items: center; gap: 12px; height: 100%; width: 100%;">
                ${imgHtml}
                <div style="display: flex; flex-direction: column; justify-content: center; overflow: hidden; min-width: 0;">
                  <span style="font-weight: 700; color: var(--wp-navy, #0f172a); font-size: 13px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 500; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${email}</span>
                </div>
              </div>`
    }
  },
  { 
    field: 'name', 
    headerName: 'Pemilik', 
    flex: 1.3, 
    filter: true, 
    sortable: true,
    cellRenderer: (p: any) => {
      return `<div style="display: flex; align-items: center; gap: 8px; height: 100%; color: #334155; font-weight: 600; font-size: 12.5px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg style="width: 13px; height: 13px; color: #64748b;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.value || 'N/A'}</span>
              </div>`
    }
  },
  { 
    field: 'category_store', 
    headerName: 'Kategori', 
    flex: 1.2, 
    filter: true, 
    sortable: true,
    cellRenderer: (p: any) => {
      if (!p.value) return '<span style="color: #94a3b8; font-style: italic; font-size: 11px;">Tanpa Kategori</span>'
      return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="background: #f1f5f9; color: #334155; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${p.value}
                </span>
              </div>`
    }
  },
  {
    field: 'is_verified',
    headerName: 'Status',
    flex: 1.1,
    sortable: true,
    cellRenderer: (p: any) => {
      const isVerified = p.value !== false && p.data?.is_verified !== false
      if (isVerified) {
        return `<div style="display: flex; align-items: center; height: 100%;">
                  <span style="display: inline-flex; align-items: center; gap: 5px; background: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 800; border: 1px solid #a7f3d0; text-transform: uppercase;">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #10b981;"></span>
                    Terverifikasi
                  </span>
                </div>`
      }
      return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="display: inline-flex; align-items: center; gap: 5px; background: #fffbeb; color: #b45309; padding: 3px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 800; border: 1px solid #fde68a; text-transform: uppercase;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #f59e0b;"></span>
                  Menunggu
                </span>
              </div>`
    }
  },
  { 
    field: 'phone_number', 
    headerName: 'Kontak', 
    flex: 1.2,
    cellRenderer: (p: any) => {
      if (!p.value) return '<span style="color: #cbd5e1; font-size: 12px;">-</span>'
      return `<div style="display: flex; align-items: center; gap: 6px; color: #0f172a; font-weight: 600; font-family: monospace; font-size: 12px; height: 100%;">
                <svg style="width: 13px; height: 13px; color: #10b981; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                ${p.value}
              </div>`
    }
  }
])

const defaultColDef = ref({
  resizable: true,
  minWidth: 110,
})

const formatRupiah = (value: number) => {
if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}M`
return `Rp ${value.toLocaleString('id-ID')}`
}

const fetchData = async () => {
  loading.value = true
  try {
    const [overviewRes, merchantsRes] = await Promise.all([
      api.get('/admin/analytics/overview'),
      api.get('/admin/merchants?limit=1000') // Fetch max 1000 for local grid
    ])
    
    if (overviewRes) {
      stats.value = overviewRes.stats
      growthData.value = overviewRes.growth
      categoryData.value = overviewRes.categories
    }
    
    if (merchantsRes && merchantsRes.data) {
      gridData.value = merchantsRes.data
    }
  } catch (err) {
    console.error("Failed to fetch dashboard overview", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const growthOption = computed(() => {
if (!growthData.value.dates.length) return null
return {
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.9)', textStyle: { color: '#1e293b' }, borderWidth: 0, shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.1)' },
  grid: { left: 10, right: 10, top: 10, bottom: 0, containLabel: false },
  xAxis: { type: 'category', boundaryGap: false, data: growthData.value.dates, show: false },
  yAxis: { type: 'value', show: false },
  series: [
    {
      name: 'Merchants',
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: growthData.value.values,
      itemStyle: { color: '#3B82F6' },
      lineStyle: { width: 3, shadowColor: 'rgba(59,130,246,0.5)', shadowBlur: 10 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#3B82F688' }, { offset: 1, color: '#3B82F600' }]
        }
      }
    }
  ]
}
})

const categoryOption = computed(() => {
if (!categoryData.value.length) return null
return {
  tooltip: { trigger: 'item', backgroundColor: 'rgba(255,255,255,0.9)', textStyle: { color: '#1e293b' }, borderWidth: 0, shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.1)' },
  series: [
    {
      type: 'pie',
      radius: ['55%', '85%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
      label: { show: false },
      data: categoryData.value
    }
  ]
}
})
</script>

<style>
/* Clean & Crisp AG Grid Styling for Professional Data Tables */
.custom-ag-grid.ag-theme-quartz {
  --ag-font-family: inherit;
  --ag-background-color: #ffffff;
  --ag-header-background-color: #f8fafc;
  --ag-header-foreground-color: #475569;
  --ag-odd-row-background-color: #ffffff;
  --ag-row-border-color: #f1f5f9;
  --ag-header-column-separator-display: none;
  --ag-font-size: 13px;
  --ag-row-hover-color: #f8fafc;
  --ag-selected-row-background-color: #eff6ff;
  --ag-borders: solid;
  --ag-border-color: #e2e8f0;
  --ag-row-border-width: 1px;
}

.custom-ag-grid.ag-theme-quartz .ag-header {
  border-bottom: 2px solid #e2e8f0 !important;
}

.custom-ag-grid.ag-theme-quartz .ag-header-cell {
  padding-left: 14px;
  padding-right: 14px;
}

.custom-ag-grid.ag-theme-quartz .ag-header-cell-label {
  font-weight: 700 !important;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  font-size: 11px;
  color: #475569;
}

.custom-ag-grid.ag-theme-quartz .ag-row {
  transition: background-color 0.15s ease;
  border-bottom: 1px solid #f1f5f9;
}

.custom-ag-grid.ag-theme-quartz .ag-cell {
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  align-items: center;
}

.custom-ag-grid.ag-theme-quartz .ag-cell:focus {
  border: none !important;
  outline: none !important;
}

.custom-ag-grid.ag-theme-quartz ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-ag-grid.ag-theme-quartz ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
</style>
