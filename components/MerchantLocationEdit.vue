<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 border-b bg-slate-50 flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-800">Edit Lokasi Merchant</h3>
        <button @click="$emit('close')" class="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <p class="text-sm text-slate-500">
          Atur lokasi untuk <strong>{{ merchant.store_name || merchant.name }}</strong>.
          Klik pada peta untuk menentukan koordinat, atau masukkan manual.
        </p>

        <!-- Address -->
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1">Alamat</label>
          <textarea
            v-model="form.address"
            rows="2"
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            placeholder="Masukkan alamat lengkap..."
          ></textarea>
        </div>

        <!-- Coordinates -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Latitude</label>
            <input
              v-model.number="form.latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="-6.2088"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">Longitude</label>
            <input
              v-model.number="form.longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="106.8456"
            />
          </div>
        </div>

        <!-- Mini Map Picker -->
        <div class="rounded-xl overflow-hidden border h-[200px] relative">
          <div ref="pickerMapContainer" class="w-full h-full"></div>
          <div v-if="mapLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center">
            <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin text-blue-500" />
          </div>
        </div>

        <p class="text-[11px] text-slate-400 text-center">
          Klik pada peta untuk mengatur koordinat. Geser untuk menggeser marker.
        </p>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t bg-slate-50 flex gap-3 justify-end">
        <button @click="resetLocation" class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50">
          Reset
        </button>
        <button @click="$emit('close')" class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50">
          Batal
        </button>
        <button @click="saveLocation" :disabled="saving" class="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
          <Icon v-if="saving" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
          {{ saving ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { api } from '~/utils/api'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps<{
  merchant: any
}>()

const emit = defineEmits<{
  close: []
  saved: [data: any]
}>()

const form = ref({
  address: '',
  latitude: null as number | null,
  longitude: null as number | null,
})

const saving = ref(false)
const mapLoading = ref(true)
const pickerMapContainer = ref<HTMLElement | null>(null)
let pickerMap: maplibregl.Map | null = null
let marker: maplibregl.Marker | null = null

const initPickerMap = () => {
  if (!pickerMapContainer.value) return

  const lat = props.merchant.latitude || -6.2088
  const lng = props.merchant.longitude || 106.8456

  pickerMap = new maplibregl.Map({
    container: pickerMapContainer.value,
    style: {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap'
        }
      },
      layers: [{ id: 'osm-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }]
    },
    center: [lng, lat],
    zoom: props.merchant.latitude ? 15 : 4,
  })

  pickerMap.addControl(new maplibregl.NavigationControl(), 'top-right')

  // Add marker
  const el = document.createElement('div')
  el.className = 'w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md cursor-move'
  marker = new maplibregl.Marker({ element: el, draggable: true })
    .setLngLat([lng, lat])
    .addTo(pickerMap!)

  // Update form when marker dragged
  marker.on('dragend', () => {
    const lngLat = marker!.getLngLat()
    form.value.latitude = Math.round(lngLat.lat * 1000000) / 1000000
    form.value.longitude = Math.round(lngLat.lng * 1000000) / 1000000
  })

  // Update marker when clicking map
  pickerMap.on('click', (e) => {
    const { lat, lng } = e.lngLat
    form.value.latitude = Math.round(lat * 1000000) / 1000000
    form.value.longitude = Math.round(lng * 1000000) / 1000000
    marker!.setLngLat([lng, lat])
  })

  mapLoading.value = false
}

const saveLocation = async () => {
  saving.value = true
  try {
    const res = await api.put(`/admin/location/${props.merchant.uuid}`, {
      address: form.value.address,
      latitude: form.value.latitude,
      longitude: form.value.longitude,
    })
    if (res) {
      emit('saved', res)
    }
  } catch (err) {
    console.error("Failed to save location", err)
    alert('Gagal menyimpan lokasi.')
  } finally {
    saving.value = false
  }
}

const resetLocation = async () => {
  if (!confirm('Reset lokasi merchant? Latitude dan longitude akan dihapus.')) return
  saving.value = true
  try {
    await api.delete(`/admin/location/${props.merchant.uuid}`)
    form.value.latitude = null
    form.value.longitude = null
    emit('saved', { latitude: null, longitude: null, address: form.value.address })
  } catch (err) {
    console.error("Failed to reset location", err)
    alert('Gagal reset lokasi.')
  } finally {
    saving.value = false
  }
}

// Sync marker when form inputs change manually
watch([() => form.value.latitude, () => form.value.longitude], ([lat, lng]) => {
  if (lat && lng && marker && pickerMap) {
    marker.setLngLat([lng, lat])
    pickerMap.setCenter([lng, lat])
  }
})

onMounted(() => {
  form.value.address = props.merchant.address || ''
  form.value.latitude = props.merchant.latitude || null
  form.value.longitude = props.merchant.longitude || null
  nextTick(() => {
    initPickerMap()
  })
})

onUnmounted(() => {
  if (pickerMap) {
    pickerMap.remove()
    pickerMap = null
  }
})
</script>
