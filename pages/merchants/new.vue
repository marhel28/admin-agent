<template>
  <div class="space-y-6 animate-fade-in pb-10">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/merchants" class="p-2 border rounded-xl hover:bg-slate-50 text-slate-500 transition-colors bg-white">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Tambah Pedagang Baru</h1>
        <p class="text-sm mt-1 text-slate-500">Daftarkan merchant baru secara manual sebagai admin.</p>
      </div>
    </div>

    <!-- Success result (one-time temp password) -->
    <div v-if="created" class="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <Icon name="heroicons:check-circle" class="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-800">Merchant Berhasil Dibuat</h3>
          <p class="text-sm text-slate-500">Bagikan kata sandi sementara ke merchant.</p>
        </div>
      </div>

      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p class="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Penting!</p>
        <p class="text-sm text-amber-800">Simpan kata sandi di bawah ini. Kata sandi <strong>tidak akan ditampilkan lagi</strong> setelah Anda meninggalkan halaman ini.</p>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between border-b pb-3">
          <span class="text-sm text-slate-500">Email</span>
          <span class="text-sm font-semibold text-slate-800">{{ created.email }}</span>
        </div>
        <div class="flex items-center justify-between border-b pb-3">
          <span class="text-sm text-slate-500">Kata Sandi Sementara</span>
          <div class="flex items-center gap-2">
            <code class="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg tracking-wide">{{ created.temp_password }}</code>
            <button @click="copyPassword" class="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">
              <Icon name="heroicons:clipboard" class="w-3.5 h-3.5" />
              {{ copied ? 'Tersalin!' : 'Salin' }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-3 pt-2">
        <NuxtLink :to="`/merchants/${created.uuid}`" class="px-5 py-2 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Icon name="heroicons:arrow-right" class="w-4 h-4" />
          Lihat Detail Merchant
        </NuxtLink>
        <NuxtLink to="/merchants" class="px-5 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors">
          Kembali ke Daftar
        </NuxtLink>
      </div>
    </div>

    <!-- Create form -->
    <form v-else @submit.prevent="createMerchant" class="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Nama Pemilik <span class="text-red-500">*</span></label>
          <input v-model="form.name" type="text" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: Budi Santoso" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Nama Toko <span class="text-red-500">*</span></label>
          <input v-model="form.store_name" type="text" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: Toko Berkah" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Email <span class="text-red-500">*</span></label>
          <input v-model="form.email" type="email" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: budi@example.com" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Telepon <span class="text-red-500">*</span></label>
          <input v-model="form.phone_number" type="tel" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: 081234567890" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Kategori</label>
          <select v-model="form.category_store" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white">
            <option v-for="cat in STORE_CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Alamat <span class="text-red-500">*</span></label>
          <textarea v-model="form.address" rows="2" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Alamat lengkap toko"></textarea>
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
          <textarea v-model="form.description" rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Deskripsi singkat toko (opsional)"></textarea>
        </div>
      </div>

      <div class="flex items-center gap-3 pt-2">
        <button type="submit" :disabled="saving" class="px-5 py-2 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2">
          <Icon v-if="saving" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Membuat...' : 'Buat Merchant' }}
        </button>
        <NuxtLink to="/merchants" class="px-5 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors">
          Batal
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '~/utils/api'

const router = useRouter()

const STORE_CATEGORIES = [
  'Makanan & Minuman',
  'Toko Retail',
  'Fashion',
  'Kecantikan & Perawatan',
  'Kesehatan',
  'Elektronik & Gadget',
  'Rumah Tangga & Furniture',
  'Pertanian',
  'Peternakan',
  'Perikanan',
  'Otomotif',
  'Konstruksi & Bangunan',
  'Percetakan & Advertising',
  'Jasa Profesional',
  'Jasa Digital',
  'Pendidikan',
  'Pariwisata',
  'Transportasi & Logistik',
  'Kerajinan',
  'Industri & Produksi',
  'Hewan Peliharaan',
  'Laundry & Kebersihan',
  'Marketplace & Online Shop',
  'Lainnya',
]

const form = ref({
  name: '',
  store_name: '',
  email: '',
  phone_number: '',
  category_store: 'Makanan & Minuman',
  address: '',
  description: '',
})

const saving = ref(false)
const created = ref<any>(null)
const copied = ref(false)

const createMerchant = async () => {
  saving.value = true
  try {
    const res = await api.post('/admin/merchants', form.value)
    if (res) {
      created.value = res
    }
  } catch (err: any) {
    console.error("Failed to create merchant", err)
    alert(err?.message || 'Gagal membuat merchant.')
  } finally {
    saving.value = false
  }
}

const copyPassword = async () => {
  if (!created.value?.temp_password) return
  try {
    await navigator.clipboard.writeText(created.value.temp_password)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (_) {
    alert('Gagal menyalin. Silakan salin manual.')
  }
}
</script>
