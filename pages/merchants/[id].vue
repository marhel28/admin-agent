<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex items-center gap-4">
      <NuxtLink to="/merchants" class="p-2 border rounded-lg hover:bg-slate-50">
        <Icon name="heroicons:arrow-left" class="w-5 h-5 text-slate-500" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight">Detail Pedagang</h1>
        <p class="text-sm mt-1 text-slate-500">Lihat dan kelola informasi untuk pedagang ini.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
        <div class="w-24 h-24 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-3xl font-bold text-slate-500">
          T
        </div>
        <h2 class="text-xl font-bold">Toko Berkah</h2>
        <p class="text-sm text-slate-500 mb-4">Budi Santoso</p>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 mb-6">Aktif</span>
        
        <div class="w-full space-y-3 text-sm text-left">
          <div class="flex justify-between border-b pb-2">
            <span class="text-slate-500">Email</span>
            <span class="font-medium">budi@example.com</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-slate-500">Telepon</span>
            <span class="font-medium">+62 812 3456 7890</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-slate-500">Tanggal Bergabung</span>
            <span class="font-medium">12 Oct 2023</span>
          </div>
        </div>

        <div class="mt-6 w-full flex gap-2">
          <button class="flex-1 py-2 border rounded-lg text-sm font-bold text-rose-600 hover:bg-rose-50 border-rose-200">
            Tangguhkan
          </button>
          <button class="flex-1 py-2 rounded-lg text-sm font-bold text-white bg-slate-800 hover:bg-slate-900">
            Masuk Sebagai
          </button>
        </div>
      </div>

      <!-- Stats & Recent Activity -->
      <div class="lg:col-span-2 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white border rounded-xl p-5 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Pendapatan</p>
            <p class="text-2xl font-extrabold">Rp 45.000.000</p>
          </div>
          <div class="bg-white border rounded-xl p-5 shadow-sm">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Produk</p>
            <p class="text-2xl font-extrabold">128 item</p>
          </div>
        </div>

        <div class="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 class="text-base font-bold mb-4">Status Integrasi</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 border rounded-lg">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:chat-bubble-oval-left" class="w-6 h-6 text-[#26A5E4]" />
                <div>
                  <p class="font-bold text-sm">Telegram Bot</p>
                  <p class="text-xs text-slate-500">Terhubung ke @TokoBerkahBot</p>
                </div>
              </div>
              <span class="text-emerald-500"><Icon name="heroicons:check-circle" class="w-5 h-5" /></span>
            </div>
            <div class="flex items-center justify-between p-3 border rounded-lg">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:table-cells" class="w-6 h-6 text-emerald-600" />
                <div>
                  <p class="font-bold text-sm">Google Sheets</p>
                  <p class="text-xs text-slate-500">Terhubung untuk sinkronisasi inventaris</p>
                </div>
              </div>
              <span class="text-emerald-500"><Icon name="heroicons:check-circle" class="w-5 h-5" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const merchantId = route.params.id
</script>
