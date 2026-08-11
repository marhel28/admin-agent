<template>
  <div class="space-y-6 animate-fade-in" v-if="!loading && merchant">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/merchants" class="p-2 border rounded-xl hover:bg-slate-50 text-slate-500 transition-colors bg-white">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">{{ merchant.store_name || merchant.name }}</h1>
          <p class="text-sm mt-1 text-slate-500">Detail & Analitik Pedagang</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="showDeleteConfirm = true" class="px-4 py-2 text-xs font-bold rounded-xl border bg-white text-red-600 border-red-100 hover:bg-red-50 transition-colors shadow-sm flex items-center gap-2">
          <Icon name="heroicons:trash" class="w-3.5 h-3.5" />
          Hapus
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-800">Nonaktifkan Merchant?</h3>
        </div>
        <p class="text-sm text-slate-600">
          Apakah Anda yakin ingin menonaktifkan <strong>{{ merchant.store_name || merchant.name }}</strong>?
          Merchant tidak akan bisa login lagi, tetapi data (stok, transaksi, wallet) tetap tersimpan.
        </p>
        <div class="flex gap-3 justify-end pt-2">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50">
            Batal
          </button>
          <button @click="deleteMerchant" :disabled="deleting" class="px-4 py-2 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
            <Icon v-if="deleting" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
            {{ deleting ? 'Menonaktifkan...' : 'Ya, Nonaktifkan' }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Profile Card -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white border rounded-2xl p-6 shadow-sm text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden mb-4">
            <img v-if="merchant.photo_profile" :src="merchant.photo_profile" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-3xl">
              {{ merchant.name.charAt(0) }}
            </div>
          </div>
          <h2 class="text-lg font-bold text-slate-800">{{ merchant.store_name || merchant.name }}</h2>
          <p class="text-sm text-slate-500 mb-4">{{ merchant.name }}</p>

          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 mb-6">
            {{ merchant.category_store || 'Tanpa Kategori' }}
          </span>

          <div class="space-y-3 text-left border-t pt-4">
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:envelope" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-700">{{ merchant.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:phone" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-700">{{ merchant.phone_number || '-' }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <Icon name="heroicons:calendar" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-700">Bergabung {{ new Date(merchant.created_at).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm" v-if="merchant.description">
          <h3 class="text-sm font-bold mb-2">Tentang Toko</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ merchant.description }}</p>
        </div>
      </div>

      <!-- Right Column: Wallet + Location & Stats -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Wallet Card -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold flex items-center gap-2">
              <Icon name="heroicons:wallet" class="w-5 h-5 text-emerald-500" />
              Dompet Merchant
            </h3>
            <button @click="fetchWallet" class="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              <Icon name="heroicons:arrow-path" class="w-3.5 h-3.5" :class="{'animate-spin': walletLoading}" />
              Refresh
            </button>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-emerald-50 rounded-xl p-4 text-center">
              <p class="text-xs text-emerald-600 font-semibold mb-1">Saldo</p>
              <p class="text-lg font-black text-emerald-700">Rp {{ formatRupiah(wallet.balance || 0) }}</p>
            </div>
            <div class="bg-blue-50 rounded-xl p-4 text-center">
              <p class="text-xs text-blue-600 font-semibold mb-1">Total Pendapatan</p>
              <p class="text-lg font-black text-blue-700">Rp {{ formatRupiah(wallet.total_earned || 0) }}</p>
            </div>
            <div class="bg-orange-50 rounded-xl p-4 text-center">
              <p class="text-xs text-orange-600 font-semibold mb-1">Total Ditarik</p>
              <p class="text-lg font-black text-orange-700">Rp {{ formatRupiah(wallet.total_withdrawn || 0) }}</p>
            </div>
          </div>

          <!-- Recent Transactions -->
          <div v-if="wallet.transactions && wallet.transactions.length > 0">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transaksi Terakhir</h4>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div v-for="(txn, i) in wallet.transactions" :key="i" class="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center" :class="txn.type === 'CREDIT' ? 'bg-emerald-100' : 'bg-red-100'">
                    <Icon :name="txn.type === 'CREDIT' ? 'heroicons:arrow-down' : 'heroicons:arrow-up'" class="w-3.5 h-3.5" :class="txn.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'" />
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-slate-700">{{ txn.description || txn.type }}</p>
                    <p class="text-[10px] text-slate-400">{{ new Date(txn.created_at).toLocaleDateString() }}</p>
                  </div>
                </div>
                <span class="text-xs font-bold" :class="txn.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'">
                  {{ txn.type === 'CREDIT' ? '+' : '-' }}Rp {{ formatRupiah(txn.amount) }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-sm text-slate-400">
            Belum ada transaksi wallet.
          </div>
        </div>

        <!-- Address & Map -->
        <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col h-[450px]">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-bold mb-1">Lokasi Toko</h3>
              <p class="text-sm text-slate-500">{{ merchant.address || 'Tidak ada alamat' }}</p>
            </div>
            <button @click="showLocationEdit = true" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">
              <Icon name="heroicons:pencil-square" class="w-3.5 h-3.5" />
              Edit Lokasi
            </button>
          </div>

          <div class="flex-1 rounded-xl overflow-hidden border bg-slate-50 relative">
             <div v-if="merchant.latitude && merchant.longitude" ref="mapContainer" class="w-full h-full"></div>
             <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
               <Icon name="heroicons:map-pin" class="w-8 h-8 mb-2 opacity-50" />
               <p class="text-sm">Lokasi belum disematkan</p>
               <button @click="showLocationEdit = true" class="mt-2 text-xs text-blue-600 hover:underline font-semibold">
                 Tambah Lokasi
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Location Edit Modal -->
    <MerchantLocationEdit
      v-if="showLocationEdit"
      :merchant="merchant"
      @close="showLocationEdit = false"
      @saved="onLocationSaved"
    />
  </div>

  <div v-else-if="loading" class="flex justify-center items-center h-[50vh]">
    <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-slate-400" />
  </div>

  <div v-else class="text-center py-20">
    <Icon name="heroicons:exclamation-circle" class="w-12 h-12 text-slate-300 mx-auto mb-4" />
    <h2 class="text-xl font-bold text-slate-700">Pedagang tidak ditemukan</h2>
    <NuxtLink to="/merchants" class="mt-4 inline-block text-blue-600 hover:underline">Kembali ke Daftar Pedagang</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '~/utils/api'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import MerchantLocationEdit from '~/components/MerchantLocationEdit.vue'

const route = useRoute()
const router = useRouter()
const merchantId = route.params.uuid
const merchant = ref<any>(null)
const loading = ref(true)

// Wallet
const wallet = ref<any>({ balance: 0, total_earned: 0, total_withdrawn: 0, transactions: [] })
const walletLoading = ref(false)

// Location edit
const showLocationEdit = ref(false)

// Delete
const showDeleteConfirm = ref(false)
const deleting = ref(false)

// Map
const mapContainer = ref<HTMLElement | null>(null)
let map: maplibregl.Map | null = null

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value || 0)
}

const fetchMerchant = async () => {
  loading.value = true
  try {
    const res = await api.get(`/admin/merchants/${merchantId}`)
    if (res) {
      merchant.value = res
      if (res.latitude && res.longitude) {
        nextTick(() => {
          initMap(res.latitude, res.longitude)
        })
      }
    }
  } catch (err) {
    console.error("Failed to fetch merchant details", err)
  } finally {
    loading.value = false
  }
}

const fetchWallet = async () => {
  walletLoading.value = true
  try {
    const res = await api.get(`/admin/merchants/${merchantId}/wallet`)
    if (res) {
      wallet.value = res
    }
  } catch (err) {
    console.error("Failed to fetch wallet", err)
  } finally {
    walletLoading.value = false
  }
}

const deleteMerchant = async () => {
  deleting.value = true
  try {
    await api.delete(`/admin/merchants/${merchantId}`)
    showDeleteConfirm.value = false
    alert('Merchant berhasil dinonaktifkan.')
    router.push('/merchants')
  } catch (err) {
    console.error("Failed to delete merchant", err)
    alert('Gagal menonaktifkan merchant.')
  } finally {
    deleting.value = false
  }
}

const onLocationSaved = (updated: any) => {
  showLocationEdit.value = false
  if (merchant.value) {
    merchant.value.latitude = updated.latitude
    merchant.value.longitude = updated.longitude
    merchant.value.address = updated.address
  }
  // Re-init map if location added
  if (merchant.value?.latitude && merchant.value?.longitude) {
    nextTick(() => {
      initMap(merchant.value.latitude, merchant.value.longitude)
    })
  }
}

const initMap = (lat: number, lng: number) => {
  if (!mapContainer.value) return

  if (map) {
    map.remove()
    map = null
  }

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: [
            'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap'
        }
      },
      layers: [
        {
          id: 'osm-tiles-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    },
    center: [lng, lat],
    zoom: 15
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  const el = document.createElement('div')
  el.className = 'w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md'

  new maplibregl.Marker({ element: el })
    .setLngLat([lng, lat])
    .addTo(map)
}

onMounted(() => {
  fetchMerchant()
  fetchWallet()
})

onUnmounted(() => {
  if (map) map.remove()
})
</script>
