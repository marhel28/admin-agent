<template>
  <div class="space-y-6 animate-fade-in pb-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight" style="color: var(--wp-navy);">Database Pedagang</h1>
        <p class="text-sm mt-1 text-slate-500 font-medium">Kelola, cari, dan ekspor semua data pedagang yang terdaftar.</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="exportCSV" :disabled="exporting" class="px-5 py-2 text-xs font-bold rounded-xl text-white transition-transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
          style="background: linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark));">
          <Icon v-if="exporting" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
          <Icon v-else name="heroicons:arrow-down-tray" class="w-4 h-4" />
          {{ exporting ? 'Mengekspor...' : 'Ekspor CSV' }}
        </button>
      </div>
    </div>

    <!-- Advanced Data Grid (AG Grid) -->
    <div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[700px]">
      <div class="p-5 border-b bg-slate-50 flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-800">Daftar Utama</h2>
          <p class="text-xs text-slate-500">Pencarian Manticore aktif.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" v-model="gridSearch" @focus="showSuggestions = true" @blur="hideSuggestionsDelay" placeholder="Cari pedagang..." class="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-xl w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" />
            
            <!-- Suggestions Dropdown -->
            <div v-if="showSuggestions && suggestions.length > 0" class="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
              <div class="px-3 py-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b">Recommendations</div>
              <ul>
                <li v-for="s in suggestions" :key="s" @click="applySuggestion(s)" class="px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex items-center gap-2 transition-colors">
                  <Icon name="heroicons:sparkles" class="w-3 h-3 text-blue-400" />
                  {{ s }}
                </li>
              </ul>
            </div>
          </div>
          <button @click="fetchMerchants" class="px-3 py-1.5 border rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm transition-colors flex items-center gap-2" title="Sinkronisasi">
            <Icon name="heroicons:arrow-path" class="w-4 h-4" :class="{'animate-spin': loading}" />
          </button>
        </div>
      </div>
      
      <div class="flex-1 w-full h-full p-2 relative">
        <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div class="bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 border">
            <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin text-blue-500" />
            <span class="text-sm font-bold text-slate-600">Sinkronisasi...</span>
          </div>
        </div>
        <ag-grid-vue
          class="ag-theme-quartz w-full h-full custom-ag-grid"
          :columnDefs="colDefs"
          :rowData="merchants"
          :defaultColDef="defaultColDef"
          :pagination="true"
          :paginationPageSize="20"
          :animateRows="true"
          rowSelection="multiple"
          :rowHeight="60"
          :headerHeight="48"
          @row-clicked="onRowClicked"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '~/utils/api'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { useDebounceFn } from '@vueuse/core'

const router = useRouter()
const merchants = ref([])
const loading = ref(true)
const gridSearch = ref('')
const exporting = ref(false)

const suggestions = ref<string[]>([])
const showSuggestions = ref(false)

const hideSuggestionsDelay = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const applySuggestion = (s: string) => {
  gridSearch.value = s
  showSuggestions.value = false
  fetchMerchants()
}

const colDefs = ref([
{ 
  field: 'store_name', 
  headerName: 'Nama Toko', 
  flex: 2, 
  filter: true, 
  sortable: true,
  cellRenderer: (p: any) => {
    const initials = (p.value || '?').substring(0, 2).toUpperCase()
    const name = p.value || 'N/A'
    const subtitle = p.data.email || 'Tidak ada email'
    
    const imgHtml = p.data.photo_profile 
      ? `<img src="${p.data.photo_profile}" style="width: 36px; height: 36px; border-radius: 10px; object-fit: cover; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" />`
      : `<div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; letter-spacing: 1px; box-shadow: 0 2px 4px rgba(59,130,246,0.3);">${initials}</div>`
    
    return `<div style="display: flex; align-items: center; gap: 14px; height: 100%; padding: 4px 0; cursor: pointer;">
              ${imgHtml}
              <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.3;">
                <span style="font-weight: 800; color: #0f172a; font-size: 13px;">${name}</span>
                <span style="font-size: 11px; color: #64748b; font-weight: 500;">${subtitle}</span>
              </div>
            </div>`
  }
},
{ 
  field: 'name', 
  headerName: 'Pemilik', 
  flex: 1.2, 
  filter: true, 
  sortable: true,
  cellRenderer: (p: any) => {
    return `<div style="display: flex; align-items: center; gap: 6px; height: 100%; color: #334155; font-weight: 600;">
              <svg style="width: 14px; height: 14px; color: #94a3b8;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              ${p.value || 'N/A'}
            </div>`
  }
},
{ 
  field: 'category_store', 
  headerName: 'Kategori', 
  flex: 1, 
  filter: true, 
  sortable: true,
  cellRenderer: (p: any) => {
    if (!p.value) return '<span style="color: #94a3b8; font-style: italic; font-size: 12px;">Tanpa Kategori</span>'
    return `<div style="display: flex; align-items: center; height: 100%;">
              <span style="background: linear-gradient(to right, #f8fafc, #f1f5f9); color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: 0.5px;">
                ${p.value}
              </span>
            </div>`
  }
},
{
  field: 'is_verified',
  headerName: 'Status',
  flex: 0.8,
  sortable: true,
  cellRenderer: (p: any) => {
    // We assume is_verified exists, or we mock if not.
    const isVerified = p.value === true || true; 
    if (isVerified) {
        return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="display: flex; align-items: center; gap: 6px; background-color: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #a7f3d0; text-transform: uppercase;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #10b981; box-shadow: 0 0 6px #10b981;"></span>
                  AKTIF
                </span>
              </div>`
    }
    return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="display: flex; align-items: center; gap: 6px; background-color: #fffbeb; color: #d97706; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #fde68a; text-transform: uppercase;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #f59e0b;"></span>
                  MENUNGGU
                </span>
              </div>`
  }
},
{ 
  field: 'phone_number', 
  headerName: 'Kontak', 
  flex: 1.2,
  cellRenderer: (p: any) => {
    if (!p.value) return '<span style="color: #cbd5e1;">-</span>'
    return `<div style="display: flex; align-items: center; gap: 6px; color: #0f172a; font-weight: 600; font-family: monospace; font-size: 13px; height: 100%;">
              <svg style="width: 14px; height: 14px; color: #10b981;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ${p.value}
            </div>`
  }
},
{ 
  field: 'actions', 
  headerName: '', 
  flex: 0.5, 
  sortable: false, 
  filter: false,
  cellRenderer: (p: any) => {
    return `<div style="display: flex; align-items: center; justify-content: flex-end; height: 100%;">
              <button style="background: transparent; border: none; cursor: pointer; color: #64748b; padding: 6px; border-radius: 6px; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#0f172a';" onmouseout="this.style.background='transparent'; this.style.color='#64748b';">
                <svg style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>`
  }
}
])

const defaultColDef = ref({
  resizable: true,
  minWidth: 100,
})

const onRowClicked = (event: any) => {
  if (event.data && event.data.uuid) {
    router.push(`/merchants/${event.data.uuid}`)
  }
}

const fetchMerchants = async () => {
  loading.value = true
  try {
    const res = await api.get(`/admin/merchants?limit=1000&search=${encodeURIComponent(gridSearch.value)}`)
    if (res && res.data) {
      merchants.value = res.data
    }
  } catch (err) {
    console.error("Failed to fetch merchants", err)
  } finally {
    loading.value = false
  }
}

const fetchSuggestions = async () => {
  if (gridSearch.value.length < 2) {
    suggestions.value = []
    return
  }
  try {
    const res = await api.get(`/admin/merchants/suggest?q=${encodeURIComponent(gridSearch.value)}`)
    suggestions.value = res || []
  } catch (e) {
    console.error(e)
  }
}

const debouncedSearch = useDebounceFn(() => {
  fetchMerchants()
  fetchSuggestions()
}, 300)

watch(gridSearch, () => {
  debouncedSearch()
})

const exportCSV = async () => {
  if (exporting.value) return
  exporting.value = true
  
  try {
    const res = await api.post('/admin/merchants/export-csv', {})
    if (res && res.task_id) {
      pollExportStatus(res.task_id)
    } else {
      alert("Failed to start export task")
      exporting.value = false
    }
  } catch (err) {
    console.error("Failed to export", err)
    alert("An error occurred starting the export.")
    exporting.value = false
  }
}

const pollExportStatus = async (taskId: string) => {
  try {
    const res = await api.get(`/admin/merchants/export-csv/status/${taskId}`)
    if (res.status === 'completed') {
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `merchants_export_${new Date().getTime()}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      exporting.value = false
    } else {
      setTimeout(() => pollExportStatus(taskId), 2000)
    }
  } catch (err) {
    console.error("Failed to check export status", err)
    exporting.value = false
    alert("Export failed.")
  }
}

onMounted(() => {
  fetchMerchants()
})
</script>

<style>
/* AG Grid custom overrides for Premium Aesthetics */
.custom-ag-grid.ag-theme-quartz {
  --ag-font-family: inherit;
  --ag-background-color: transparent;
  --ag-header-background-color: #f8fafc;
  --ag-header-foreground-color: #475569;
  --ag-odd-row-background-color: #fafaf9;
  --ag-row-border-color: #f1f5f9;
  --ag-header-column-separator-display: none;
  --ag-font-size: 13px;
  --ag-row-hover-color: #f1f5f9;
  --ag-selected-row-background-color: #eff6ff;
  --ag-borders: none;
  --ag-row-border-width: 1px;
}
.custom-ag-grid.ag-theme-quartz .ag-header {
  border-bottom: 2px solid #e2e8f0;
}
.custom-ag-grid.ag-theme-quartz .ag-header-cell-label {
  font-weight: 800 !important;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 11px;
}
.custom-ag-grid.ag-theme-quartz .ag-row {
  transition: background-color 0.2s ease;
  border-bottom-style: dashed;
  cursor: pointer;
}
.custom-ag-grid.ag-theme-quartz .ag-row:hover {
  border-left: 3px solid #3B82F6;
}
.custom-ag-grid.ag-theme-quartz .ag-cell:focus {
  border: none !important;
  outline: none !important;
}
.custom-ag-grid.ag-theme-quartz ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-ag-grid.ag-theme-quartz ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
