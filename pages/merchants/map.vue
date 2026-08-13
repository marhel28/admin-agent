<template>
  <div class="relative w-full h-screen -mx-4 -my-4 sm:-mx-8 sm:-my-8 overflow-hidden bg-slate-900">
    <!-- Fullscreen Edge-to-Edge Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-30">
      <div class="flex flex-col items-center bg-white/90 px-6 py-4 rounded-2xl shadow-xl border border-slate-100">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-blue-600 mb-2" />
        <span class="text-xs font-extrabold tracking-wider text-slate-700 uppercase">Memuat Peta Intelijen...</span>
      </div>
    </div>

    <!-- Floating Top Bar Controls -->
    <div class="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
      <!-- Title Badge -->
      <div class="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
          <Icon name="heroicons:map" class="w-5 h-5" />
        </div>
        <div>
          <h1 class="text-sm font-extrabold text-slate-800 leading-tight">Peta Intelijen Geospasial</h1>
          <p class="text-[11px] text-slate-500 font-medium">Algoritma Supercluster & Heatmap</p>
        </div>
      </div>

      <!-- Control Group -->
      <div class="pointer-events-auto flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200/80">
        <!-- Search & Filter Input -->
        <div class="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200/50">
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            v-model="searchQuery" 
            @input="applyFilter"
            type="text" 
            placeholder="Cari toko / merchant..." 
            class="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-28 sm:w-36 font-medium"
          />
          <button v-if="searchQuery" @click="searchQuery = ''; applyFilter()" class="text-slate-400 hover:text-slate-600">
            <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Category Dropdown Filter -->
        <div class="flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-xl border border-slate-200/50">
          <Icon name="heroicons:funnel" class="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
          <select 
            v-model="selectedCategory" 
            @change="applyFilter" 
            class="bg-transparent text-xs text-slate-700 font-bold outline-none cursor-pointer pr-1 max-w-[130px] truncate"
          >
            <option value="ALL">Semua Kategori</option>
            <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <!-- Divider -->
        <div class="h-6 w-px bg-slate-200 my-auto"></div>

        <!-- View Modes -->
        <div class="flex bg-slate-100/80 p-1 rounded-xl">
          <button @click="switchMode('cluster')" :class="{'bg-white shadow-sm text-emerald-600 font-bold': activeMode === 'cluster', 'text-slate-600 font-medium hover:text-slate-900': activeMode !== 'cluster'}" class="px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Klaster
          </button>
          <button @click="switchMode('heatmap')" :class="{'bg-white shadow-sm text-red-600 font-bold': activeMode === 'heatmap', 'text-slate-600 font-medium hover:text-slate-900': activeMode !== 'heatmap'}" class="px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Heatmap
          </button>
        </div>

        <!-- Return button -->
        <NuxtLink to="/" class="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm ml-1 flex items-center gap-1">
          &larr; Dasbor
        </NuxtLink>
      </div>
    </div>

    <!-- Floating Intelligence Panel (Right Sidebar) -->
    <div class="absolute top-20 right-4 bottom-4 z-20 w-80 sm:w-96 flex flex-col pointer-events-auto transition-all duration-300">
      <div class="flex-1 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-2xl p-5 overflow-y-auto custom-scrollbar relative flex flex-col">
        <!-- Back Button for Single View -->
        <button v-if="hoveredMerchant && lastViewedCluster" @click="backToCluster" class="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-10 shadow-sm" title="Kembali ke daftar klaster">
          <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        </button>

        <div class="flex items-center justify-between border-b pb-3 mb-4">
          <h2 class="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Icon name="heroicons:information-circle" class="w-4 h-4 text-blue-500" />
            Panel Intelijen
          </h2>
          <span class="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full border border-blue-100">Live Geo</span>
        </div>
        
        <!-- Cluster View -->
        <div v-if="hoveredCluster" class="animate-fade-in-up flex-1">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-3 rounded-xl mb-4 shadow-md flex justify-between items-center">
            <span class="text-xs tracking-wide">Kepadatan Area</span>
            <span class="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-xs font-extrabold">{{ hoveredCluster.point_count }} Merchant</span>
          </div>
          
          <p class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Daftar Merchant (Klik untuk zoom):</p>
          
          <!-- Loading state -->
          <div v-if="clusterLoading" class="flex flex-col items-center justify-center py-12">
            <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin text-blue-500 mb-2" />
            <p class="text-xs text-slate-400 font-medium">Mengekstrak data titik...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="clusterError" class="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-medium border border-red-100">
            {{ clusterError }}
          </div>
          
          <!-- List -->
          <div v-else class="space-y-2.5">
            <div v-for="m in hoveredClusterMerchants" :key="m.uuid" @click="selectMerchantFromCluster(m)" class="flex gap-3 items-center p-2.5 hover:bg-blue-50/80 bg-slate-50/80 rounded-xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm group">
              <img v-if="m.photo_profile" :src="m.photo_profile" class="w-9 h-9 rounded-full object-cover shadow-sm shrink-0 border" />
              <div v-else class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 border">
                <Icon name="heroicons:building-storefront" class="w-4 h-4" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-bold text-xs text-slate-800 truncate group-hover:text-blue-600 transition-colors">{{ m.store_name || m.name || 'Toko Tidak Diketahui' }}</h4>
                <p class="text-[11px] text-slate-500 truncate">{{ m.category_store || 'Tanpa Kategori' }}</p>
              </div>
              <Icon name="heroicons:chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors" />
            </div>
            
            <div v-if="hoveredCluster.point_count > hoveredClusterMerchants.length && hoveredClusterMerchants.length > 0" class="text-center mt-3">
              <p class="text-[11px] text-slate-400 italic font-medium">+ {{ hoveredCluster.point_count - hoveredClusterMerchants.length }} merchant lainnya (Zoom mendekat)</p>
            </div>
          </div>
        </div>

        <!-- Single Merchant View -->
        <div v-else-if="hoveredMerchant" class="animate-fade-in-up flex-1">
          <div class="w-16 h-16 rounded-full border-2 border-blue-500/20 bg-slate-100 mx-auto mb-3 overflow-hidden shadow-lg">
            <img v-if="hoveredMerchant.photo_profile" :src="hoveredMerchant.photo_profile" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400 bg-white">
              <Icon name="heroicons:building-storefront" class="w-8 h-8" />
            </div>
          </div>
          
          <h3 class="text-lg font-extrabold text-center text-slate-800 mb-1 leading-snug">{{ hoveredMerchant.store_name || hoveredMerchant.name }}</h3>
          <div class="flex flex-wrap justify-center gap-1.5 mb-5">
            <span class="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-blue-200 shadow-sm flex items-center gap-1">
              <Icon name="heroicons:tag" class="w-3 h-3 text-blue-500" />
              {{ hoveredMerchant.category_store || 'Makanan & Minuman' }}
            </span>
            <span v-if="hoveredMerchant.store_type" class="px-2.5 py-0.5 bg-purple-50 text-purple-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-purple-200 shadow-sm flex items-center gap-1">
              <Icon name="heroicons:building-storefront" class="w-3 h-3 text-purple-500" />
              {{ hoveredMerchant.store_type }}
            </span>
          </div>

          <div class="space-y-3.5 text-xs">
            <div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Nama Pemilik</p>
              <p class="font-semibold text-slate-700 flex items-center gap-2">
                <Icon name="heroicons:user" class="w-4 h-4 text-blue-500" />
                {{ hoveredMerchant.name }}
              </p>
            </div>
            
            <div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-2">
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Kontak & Detail</p>
              <p class="font-medium text-slate-700 flex items-center gap-2">
                <Icon name="heroicons:phone" class="w-4 h-4 text-emerald-500" />
                {{ hoveredMerchant.phone_number || 'Tidak ada telepon' }}
              </p>
              <p class="font-medium text-slate-700 flex items-center gap-2 text-[11px] truncate">
                <Icon name="heroicons:envelope" class="w-4 h-4 text-slate-400 shrink-0" />
                {{ hoveredMerchant.email }}
              </p>
            </div>

            <div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Alamat Terdaftar</p>
              <p class="text-xs font-medium text-slate-600 leading-relaxed flex items-start gap-2">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                {{ hoveredMerchant.address || 'Alamat belum diatur dalam database.' }}
              </p>
            </div>

            <div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Koordinat Presisi</p>
              <p class="font-mono text-[11px] text-blue-700 font-bold bg-blue-50 p-2 rounded-lg text-center border border-blue-100">
                {{ hoveredMerchant.latitude?.toFixed(5) }}, {{ hoveredMerchant.longitude?.toFixed(5) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center my-auto py-12 text-center">
          <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 border border-blue-100 text-blue-500">
            <Icon name="heroicons:cursor-arrow-rays" class="w-7 h-7 animate-bounce" />
          </div>
          <p class="text-xs font-bold text-slate-600 mb-1">Eksplorasi Peta</p>
          <p class="text-[11px] text-slate-400 leading-relaxed max-w-[200px]">Arahkan kursor ke titik atau klaster untuk menampilkan intelijen lokasi.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { api } from '~/utils/api'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
const map = shallowRef<maplibregl.Map | null>(null)
const loading = ref(true)

const activeStyle = ref('voyager')
const activeMode = ref('cluster')

// Search & Category Filter State
const searchQuery = ref('')
const selectedCategory = ref('ALL')
const availableCategories = ref<string[]>([])

// Intel Panel State
const hoveredMerchant = ref<any>(null)
const hoveredCluster = ref<any>(null)
const hoveredClusterMerchants = ref<any[]>([])
const clusterLoading = ref(false)
const clusterError = ref('')
const lastViewedCluster = ref<any>(null)

let rawMerchantsData: any[] = []
let geojsonData: any = null

const GLYPHS_URL = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"

const styles = {
  voyager: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'carto-voyager': {
        type: 'raster',
        tiles: [
          'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
          'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
        ],
        tileSize: 256,
        attribution: '&copy; CARTO &copy; OpenStreetMap'
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'carto-voyager', minzoom: 0, maxzoom: 20 }]
  }
}

const applyFilter = () => {
  if (!rawMerchantsData) return

  const query = searchQuery.value.trim().toLowerCase()
  const category = selectedCategory.value

  const filtered = rawMerchantsData.filter((m: any) => {
    if (!m.longitude || !m.latitude) return false
    
    // Category filter check
    const matchesCategory = category === 'ALL' || m.category_store === category
    
    // Text search query check
    const nameMatch = (m.store_name || '').toLowerCase().includes(query) || (m.name || '').toLowerCase().includes(query)
    const categoryMatch = (m.category_store || '').toLowerCase().includes(query)
    const addressMatch = (m.address || '').toLowerCase().includes(query)
    const matchesSearch = !query || nameMatch || categoryMatch || addressMatch

    return matchesCategory && matchesSearch
  })

  const features = filtered.map((m: any) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [Number(m.longitude), Number(m.latitude)] },
    properties: m
  }))

  geojsonData = { type: 'FeatureCollection', features }

  // Update map sources dynamically
  if (map.value) {
    const clusterSource: any = map.value.getSource('merchants-cluster')
    if (clusterSource) clusterSource.setData(geojsonData)
    
    const heatSource: any = map.value.getSource('merchants-heat')
    if (heatSource) heatSource.setData(geojsonData)

    // Adjust bounds to fit filtered points
    if (features.length > 0) {
      const bounds = new maplibregl.LngLatBounds()
      features.forEach((f: any) => bounds.extend(f.geometry.coordinates))
      map.value.fitBounds(bounds, { padding: 80, maxZoom: 14 })
    }
  }
}

const initMap = async () => {
  if (!mapContainer.value) return

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: styles.voyager as any,
    center: [106.827153, -6.175110], // Jakarta
    zoom: 5
  })

  map.value.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.value.on('load', async () => {
    try {
      const merchants = await api.get('/admin/analytics/merchants-map')
      rawMerchantsData = merchants || []

      // Extract unique categories
      const categoriesSet = new Set<string>()
      rawMerchantsData.forEach((m: any) => {
        if (m.category_store) categoriesSet.add(m.category_store)
      })
      availableCategories.value = Array.from(categoriesSet).sort()

      const features = rawMerchantsData.filter((m: any) => m.longitude && m.latitude).map((m: any) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [Number(m.longitude), Number(m.latitude)] },
        properties: m
      }))

      geojsonData = { type: 'FeatureCollection', features }

      addMapData()
      setupInteractions()
      
      // Fit bounds
      if (features.length > 0) {
        const bounds = new maplibregl.LngLatBounds()
        features.forEach((f: any) => bounds.extend(f.geometry.coordinates))
        map.value?.fitBounds(bounds, { padding: 50, maxZoom: 14 })
      }
    } catch (err) {
      console.error("Failed to fetch map data", err)
    } finally {
      loading.value = false
    }
  })
}

const addMapData = () => {
  if (!map.value || !geojsonData) return

  // 1. Source: Clustering (Supercluster Algorithm)
  if (!map.value.getSource('merchants-cluster')) {
    map.value.addSource('merchants-cluster', {
      type: 'geojson',
      data: geojsonData,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 60
    })
  } else {
    (map.value.getSource('merchants-cluster') as maplibregl.GeoJSONSource).setData(geojsonData)
  }

  // 2. Source: Heatmap (no clustering)
  if (!map.value.getSource('merchants-heat')) {
    map.value.addSource('merchants-heat', {
      type: 'geojson',
      data: geojsonData
    })
  } else {
    (map.value.getSource('merchants-heat') as maplibregl.GeoJSONSource).setData(geojsonData)
  }

  // Authentic Google Maps Red Pin SVG Data URL
  const googlePinSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="32" height="42"><path fill="%23EA4335" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/><circle cx="192" cy="192" r="75" fill="%23FFFFFF"/></svg>`

  if (!map.value.hasImage('google-red-pin')) {
    const img = new Image(32, 42)
    img.onload = () => {
      if (map.value && !map.value.hasImage('google-red-pin')) {
        map.value.addImage('google-red-pin', img)
      }
    }
    img.src = googlePinSvg
  }

  // === CLUSTER LAYERS ===
  if (!map.value.getLayer('clusters')) {
    map.value.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'merchants-cluster',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': ['step', ['get', 'point_count'], '#60a5fa', 10, '#3b82f6', 50, '#1d4ed8'],
        'circle-radius': ['step', ['get', 'point_count'], 18, 10, 24, 50, 32],
        'circle-stroke-width': 4,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.8)'
      },
      layout: { visibility: activeMode.value === 'cluster' ? 'visible' : 'none' }
    })
  }

  if (!map.value.getLayer('cluster-count')) {
    map.value.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'merchants-cluster',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 13,
        visibility: activeMode.value === 'cluster' ? 'visible' : 'none'
      },
      paint: { 'text-color': '#ffffff' }
    })
  }

  // Authentic Google Red Pin Symbol Layer
  if (!map.value.getLayer('unclustered-point')) {
    map.value.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'merchants-cluster',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'google-red-pin',
        'icon-size': 0.85,
        'icon-anchor': 'bottom',
        'icon-allow-overlap': true,
        visibility: activeMode.value === 'cluster' ? 'visible' : 'none'
      }
    })
  }

  // === HEATMAP LAYER ===
  if (!map.value.getLayer('heatmap-layer')) {
    map.value.addLayer({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'merchants-heat',
      maxzoom: 15,
      paint: {
        'heatmap-weight': 1,
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 5, 15, 30],
        'heatmap-opacity': 0.8
      },
      layout: { visibility: activeMode.value === 'heatmap' ? 'visible' : 'none' }
    })
  }
}

const setupInteractions = () => {
  if (!map.value) return;
  // Hover on single point
  map.value.on('mouseenter', 'unclustered-point', (e) => {
    map.value!.getCanvas().style.cursor = 'pointer'
    if (e.features && e.features[0]) {
      hoveredCluster.value = null
      hoveredMerchant.value = e.features[0].properties
    }
  })
  
  map.value.on('mouseleave', 'unclustered-point', () => {
    map.value!.getCanvas().style.cursor = ''
  })

  // Hover on cluster (fetch leaves)
  map.value.on('mouseenter', 'clusters', async (e) => {
    map.value!.getCanvas().style.cursor = 'pointer'
    if (e.features && e.features[0]) {
      const clusterId = e.features[0].properties.cluster_id
      
      hoveredMerchant.value = null
      hoveredCluster.value = e.features[0].properties
      hoveredClusterMerchants.value = []
      clusterLoading.value = true
      clusterError.value = ''

      try {
        const source: any = map.value!.getSource('merchants-cluster')
        const features = await source.getClusterLeaves(clusterId, 50, 0)
        clusterLoading.value = false
        if (features) {
          hoveredClusterMerchants.value = features.map((f: any) => f.properties)
        }
      } catch (err: any) {
        clusterLoading.value = false
        clusterError.value = "Failed to extract nodes data."
        console.error("Cluster leaves error:", err)
      }
    }
  })
  
  map.value.on('mouseleave', 'clusters', () => {
    map.value!.getCanvas().style.cursor = ''
  })
  
  // Click on clusters to zoom in
  map.value.on('click', 'clusters', async (e) => {
    const features = map.value!.queryRenderedFeatures(e.point, { layers: ['clusters'] })
    const clusterId = features[0].properties.cluster_id
    try {
      const source: any = map.value!.getSource('merchants-cluster')
      const zoom = await source.getClusterExpansionZoom(clusterId)
      map.value!.easeTo({
        center: features[0].geometry.coordinates as any,
        zoom: zoom + 1
      })
    } catch (err) {
      console.error(err)
    }
  })
}

const switchStyle = (styleId: 'voyager' | 'positron' | 'dark' | 'satellite' | 'hybrid') => {
  activeStyle.value = styleId
  if (!map.value) return
  
  map.value.once('style.load', () => {
    // When style reloads, sources and layers are cleared by MapLibre, so we must re-add them
    if (geojsonData) addMapData()
  })
  
  map.value.setStyle(styles[styleId] as any)
}

const switchMode = (mode: 'cluster' | 'heatmap') => {
  activeMode.value = mode
  if (!map.value) return
  
  map.value.setLayoutProperty('clusters', 'visibility', mode === 'cluster' ? 'visible' : 'none')
  map.value.setLayoutProperty('cluster-count', 'visibility', mode === 'cluster' ? 'visible' : 'none')
  map.value.setLayoutProperty('unclustered-point', 'visibility', mode === 'cluster' ? 'visible' : 'none')
  
  map.value.setLayoutProperty('heatmap-layer', 'visibility', mode === 'heatmap' ? 'visible' : 'none')
}

// Logic for clicking inside the intel panel list
const selectMerchantFromCluster = (merchant: any) => {
  // Save current cluster state so user can go back
  lastViewedCluster.value = {
    cluster: hoveredCluster.value,
    merchants: hoveredClusterMerchants.value
  }
  
  // Switch to single view
  hoveredCluster.value = null
  hoveredMerchant.value = merchant
  
  // Fly to the merchant location!
  if (map.value && merchant.longitude && merchant.latitude) {
    map.value.flyTo({
      center: [Number(merchant.longitude), Number(merchant.latitude)],
      zoom: 17,
      speed: 1.5,
      essential: true
    })
  }
}

const backToCluster = () => {
  if (lastViewedCluster.value) {
    hoveredCluster.value = lastViewedCluster.value.cluster
    hoveredClusterMerchants.value = lastViewedCluster.value.merchants
    hoveredMerchant.value = null
    lastViewedCluster.value = null
  }
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map.value) map.value.remove()
})
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
