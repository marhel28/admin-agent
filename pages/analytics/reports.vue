<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header with Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Reports Generation</h1>
        <p class="text-sm mt-1 text-slate-500">Generate, download, and schedule automated platform reports.</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">
      <NuxtLink to="/analytics" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Overview</NuxtLink>
      <NuxtLink to="/analytics/finance" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Finance</NuxtLink>
      <NuxtLink to="/analytics/merchants" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Merchants</NuxtLink>
      <NuxtLink to="/analytics/ai-usage" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">AI & Usage</NuxtLink>
      <NuxtLink to="/analytics/catalog" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap">Catalog Insights</NuxtLink>
      <NuxtLink to="/analytics/reports" class="px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Reports</NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Report Generators List -->
      <div class="lg:col-span-2 space-y-4">
        
        <!-- Merchant Export Card -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-blue-300 transition-colors">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Icon name="heroicons:users" class="w-8 h-8" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-800">Master Merchant Data (CSV)</h3>
            <p class="text-sm text-slate-500 mt-1 mb-4">Export all registered merchants, verification status, contact info, and total revenue into a spreadsheet. Processed via Celery background worker.</p>
            
            <div v-if="merchantExportState === 'idle'" class="flex gap-2">
              <button @click="triggerMerchantExport" class="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 flex items-center gap-2">
                <Icon name="heroicons:play" class="w-4 h-4" />
                Generate Now
              </button>
            </div>
            
            <div v-else-if="merchantExportState === 'processing'" class="flex items-center gap-3 text-blue-600 font-medium">
              <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
              Processing via Celery Worker...
            </div>
            
            <div v-else-if="merchantExportState === 'done'" class="flex gap-2">
              <a :href="merchantDownloadUrl" class="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 flex items-center gap-2">
                <Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
                Download CSV
              </a>
              <button @click="merchantExportState = 'idle'" class="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        <!-- Financial Export Card -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-emerald-300 transition-colors">
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Icon name="heroicons:banknotes" class="w-8 h-8" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-800">Platform Financial Report (PDF)</h3>
            <p class="text-sm text-slate-500 mt-1 mb-4">A complete breakdown of platform revenue, merchant payouts, and net margins for the current month. Ready for accounting.</p>
            <button class="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Icon name="heroicons:document-text" class="w-4 h-4" />
              Generate PDF (Coming Soon)
            </button>
          </div>
        </div>

        <!-- AI Audit Report Card -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-purple-300 transition-colors">
          <div class="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Icon name="heroicons:sparkles" class="w-8 h-8" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-800">AI Quality & Hallucination Log (CSV)</h3>
            <p class="text-sm text-slate-500 mt-1 mb-4">Export all 1-2 star rated AI interactions and failed Copilot workflows for prompt engineering improvements.</p>
            <button class="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Icon name="heroicons:code-bracket" class="w-4 h-4" />
              Export AI Logs (Coming Soon)
            </button>
          </div>
        </div>

      </div>

      <!-- Right Column: Scheduled Reports -->
      <div class="space-y-6">
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Icon name="heroicons:clock" class="w-5 h-5 text-blue-600" />
            Automated Schedules
          </h2>
          <p class="text-sm text-slate-500 mb-4">These reports are automatically processed by Celery Beat and delivered via Telegram/Email.</p>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:document-chart-bar" class="w-5 h-5 text-slate-400" />
                <div>
                  <div class="text-sm font-bold text-slate-800">Daily Platform Summary</div>
                  <div class="text-xs text-slate-500">Every 08:00 AM</div>
                </div>
              </div>
              <div class="w-8 h-4 bg-blue-600 rounded-full flex items-center p-0.5">
                <div class="w-3 h-3 bg-white rounded-full translate-x-4"></div>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:exclamation-circle" class="w-5 h-5 text-rose-400" />
                <div>
                  <div class="text-sm font-bold text-slate-800">Global Stockout Alert</div>
                  <div class="text-xs text-slate-500">Every 2 Hours</div>
                </div>
              </div>
              <div class="w-8 h-4 bg-blue-600 rounded-full flex items-center p-0.5">
                <div class="w-3 h-3 bg-white rounded-full translate-x-4"></div>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:users" class="w-5 h-5 text-slate-400" />
                <div>
                  <div class="text-sm font-bold text-slate-800">Weekly Merchant Churn</div>
                  <div class="text-xs text-slate-500">Every Monday</div>
                </div>
              </div>
              <div class="w-8 h-4 bg-slate-200 rounded-full flex items-center p-0.5">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <button class="w-full mt-4 py-2 border border-dashed border-slate-300 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 flex justify-center items-center gap-2">
            <Icon name="heroicons:plus" class="w-4 h-4" />
            Add Schedule
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { api } from '~/utils/api'

// States for Merchant Export
const merchantExportState = ref<'idle'|'processing'|'done'>('idle')
const merchantDownloadUrl = ref('')
const merchantTaskId = ref('')

let pollInterval: any = null

const triggerMerchantExport = async () => {
  merchantExportState.value = 'processing'
  try {
    const res = await api.post('/admin/merchants/export-csv')
    if (res && res.task_id) {
      merchantTaskId.value = res.task_id
      pollMerchantExport()
    } else {
      merchantExportState.value = 'idle'
      alert('Failed to start export task')
    }
  } catch (err) {
    console.error(err)
    merchantExportState.value = 'idle'
  }
}

const pollMerchantExport = () => {
  pollInterval = setInterval(async () => {
    try {
      const res = await api.get(`/admin/merchants/export-csv/status/${merchantTaskId.value}`)
      if (res.status === 'SUCCESS' && res.download_url) {
        clearInterval(pollInterval)
        merchantDownloadUrl.value = 'http://localhost:8000' + res.download_url
        merchantExportState.value = 'done'
      } else if (res.status === 'FAILURE' || res.status === 'REVOKED') {
        clearInterval(pollInterval)
        merchantExportState.value = 'idle'
        alert('Task failed to complete.')
      }
    } catch (e) {
      console.error(e)
    }
  }, 1000)
}
</script>
