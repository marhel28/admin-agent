<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Menunggu Verifikasi</h1>
        <p class="text-sm mt-1 text-slate-500">Tinjau dan setujui pedagang baru sebelum mereka dapat berjualan.</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col">
      <div class="p-4 border-b border-[var(--wp-border)] flex justify-between items-center bg-slate-50/50">
        <h2 class="font-bold text-[var(--wp-navy)] text-sm">Menunggu Persetujuan</h2>
        <button @click="fetchMerchants" class="text-slate-500 hover:text-[var(--wp-navy)] p-2 rounded-sm transition-colors">
          <Icon name="heroicons:arrow-path" class="w-5 h-5" />
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider">
            <tr>
              <th class="px-5 py-3">Pedagang</th>
              <th class="px-5 py-3">Kategori</th>
              <th class="px-5 py-3">Kontak</th>
              <th class="px-5 py-3">Tanggal Terdaftar</th>
              <th class="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="border-b border-[var(--wp-border)]">
              <td colspan="5" class="px-5 py-12 text-center text-slate-400">
                <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Memuat pedagang yang tertunda...</p>
              </td>
            </tr>
            <tr v-else-if="merchants.length === 0" class="border-b border-[var(--wp-border)]">
              <td colspan="5" class="px-5 py-12 text-center text-slate-400">
                <Icon name="heroicons:check-circle" class="w-12 h-12 mx-auto mb-3" style="color: var(--wp-gold); opacity: 0.8;" />
                <p class="font-bold text-[var(--wp-navy)]">Semua sudah selesai!</p>
                <p class="text-xs mt-1">Tidak ada pedagang yang menunggu verifikasi.</p>
              </td>
            </tr>
            <tr v-for="m in merchants" :key="m.uuid" class="border-b border-[var(--wp-border)] hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-sm bg-slate-200 shrink-0 overflow-hidden">
                    <img v-if="m.photo_profile" :src="m.photo_profile" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-white font-bold uppercase" style="background: var(--wp-navy);">{{ m.name.charAt(0) }}</div>
                  </div>
                  <div>
                    <p class="font-bold text-[var(--wp-navy)]">{{ m.store_name || m.name }}</p>
                    <p class="text-xs text-slate-500">{{ m.store_name ? m.name : 'Tidak Ada Nama Toko' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 font-medium">
                <span class="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider" style="background: rgba(212,168,67,0.1); color: var(--wp-gold-dark);">
                  {{ m.category_store || 'TANPA KATEGORI' }}
                </span>
              </td>
              <td class="px-5 py-4 text-xs space-y-1">
                <div class="flex items-center gap-2"><Icon name="heroicons:envelope" class="w-3 h-3 text-slate-400"/> {{ m.email }}</div>
                <div class="flex items-center gap-2" v-if="m.phone_number"><Icon name="heroicons:phone" class="w-3 h-3 text-slate-400"/> {{ m.phone_number }}</div>
              </td>
              <td class="px-5 py-4 whitespace-nowrap text-xs">
                {{ new Date(m.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex justify-end items-center gap-2">
                  <NuxtLink :to="`/merchants/${m.uuid}`" class="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Lihat Detail">
                    <Icon name="heroicons:eye" class="w-4 h-4" />
                  </NuxtLink>
                  <button @click="rejectMerchant(m.uuid)" :disabled="actionLoading === m.uuid" class="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50" title="Tolak">
                    <Icon name="heroicons:x-mark" class="w-4 h-4" />
                  </button>
                  <button @click="approveMerchant(m.uuid)" :disabled="actionLoading === m.uuid" class="px-3 py-1.5 text-xs font-bold text-white shadow-sm rounded transition-colors disabled:opacity-50 flex items-center gap-1" style="background: var(--wp-navy);">
                    <Icon v-if="actionLoading === m.uuid" name="heroicons:arrow-path" class="w-3 h-3 animate-spin" />
                    <Icon v-else name="heroicons:check" class="w-3 h-3" />
                    Setujui
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t flex items-center justify-between bg-white">
        <p class="text-xs text-slate-500">
          Menampilkan <span class="font-bold">{{ merchants.length }}</span> dari <span class="font-bold">{{ total }}</span> pedagang tertunda
        </p>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="page === 1" class="px-3 py-1.5 text-xs font-bold border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors">
            Sebelumnya
          </button>
          <button @click="nextPage" :disabled="page >= totalPages" class="px-3 py-1.5 text-xs font-bold border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '~/utils/api'

const merchants = ref([])
const loading = ref(true)
const page = ref(1)
const total = ref(0)
const totalPages = ref(1)
const actionLoading = ref<string | null>(null)

const fetchMerchants = async () => {
  loading.value = true
  try {
    const res = await api.get(`/admin/merchants/pending?page=${page.value}&limit=10`)
    if (res && res.data) {
      merchants.value = res.data
      total.value = res.total
      totalPages.value = res.totalPages
    }
  } catch (err) {
    console.error("Failed to fetch pending merchants", err)
  } finally {
    loading.value = false
  }
}

const approveMerchant = async (uuid: string) => {
  if (!confirm("Apakah Anda yakin ingin menyetujui pedagang ini?")) return
  actionLoading.value = uuid
  try {
    await api.post(`/admin/merchants/${uuid}/approve`, {})
    // Remove from local list or refetch
    fetchMerchants()
  } catch (err) {
    console.error("Failed to approve", err)
    alert("Gagal menyetujui pedagang")
  } finally {
    actionLoading.value = null
  }
}

const rejectMerchant = async (uuid: string) => {
  if (!confirm("Apakah Anda yakin ingin MENOLAK dan menghapus permintaan pedagang ini?")) return
  actionLoading.value = uuid
  try {
    await api.post(`/admin/merchants/${uuid}/reject`, {})
    fetchMerchants()
  } catch (err) {
    console.error("Failed to reject", err)
    alert("Gagal menolak pedagang")
  } finally {
    actionLoading.value = null
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchMerchants()
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    fetchMerchants()
  }
}

onMounted(() => {
  fetchMerchants()
})
</script>
