<template>
  <div class="h-[calc(100vh-80px)] w-full flex space-x-4 animate-fade-in">
    <!-- Main Map Container -->
    <div class="flex-1 flex flex-col space-y-4">
      <!-- Header & Controls -->
      <div class="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Peta Intelijen Geospasial</h1>
          <p class="text-sm mt-1 text-slate-500">Perutean gaya Google Maps, Algoritma Supercluster, dan Heatmap.</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Layer Switcher -->
          <div class="flex bg-slate-100 p-1 rounded-xl">
            <button @click="switchStyle('street')" :class="{'bg-white shadow-sm text-blue-600': activeStyle === 'street', 'text-slate-500': activeStyle !== 'street'}" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all">Street</button>
            <button @click="switchStyle('satellite')" :class="{'bg-white shadow-sm text-blue-600': activeStyle === 'satellite', 'text-slate-500': activeStyle !== 'satellite'}" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all">Satellite</button>
            <button @click="switchStyle('terrain')" :class="{'bg-white shadow-sm text-blue-600': activeStyle === 'terrain', 'text-slate-500': activeStyle !== 'terrain'}" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all">Terrain</button>
            <button @click="switchStyle('dark')" :class="{'bg-white shadow-sm text-blue-600': activeStyle === 'dark', 'text-slate-500': activeStyle !== 'dark'}" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all">Dark</button>
            <button @click="switchStyle('light')" :class="{'bg-white shadow-sm text-blue-600': activeStyle === 'light', 'text-slate-500': activeStyle !== 'light'}" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all">Light</button>
          </div>
          <!-- View Modes -->
          <div class="flex bg-slate-100 p-1 rounded-xl">
            <button @click="switchMode('cluster')" :class="{'bg-white shadow-sm text-emerald-600': activeMode === 'cluster', 'text-slate-500': activeMode !== 'cluster'}" class="px-4 py-1.5 text-xs font-bold rounded-lg transition-all">Klaster</button>
            <button @click="switchMode('heatmap')" :class="{'bg-white shadow-sm text-red-600': activeMode === 'heatmap', 'text-slate-500': activeMode !== 'heatmap'}" class="px-4 py-1.5 text-xs font-bold rounded-lg transition-all">Heatmap</button>
          </div>
          <NuxtLink to="/" class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-sm ml-2">
            &larr; Dasbor
          </NuxtLink>
        </div>
      </div>

      <!-- Map -->
      <div class="flex-1 rounded-2xl overflow-hidden border shadow-sm relative bg-slate-100">
        <div v-if="loading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-10 backdrop-blur-sm">
          <div class="flex flex-col items-center">
            <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <span class="text-sm font-bold text-slate-500">MEMUAT DATA SUPERCLUSTER...</span>
          </div>
        </div>
        <div ref="mapContainer" class="w-full h-full"></div>
      </div>
    </div>

    <!-- Right Sidebar Detail Card -->
    <div class="w-96 flex flex-col space-y-4">
      <div class="flex-1 bg-white rounded-2xl border shadow-sm p-6 overflow-y-auto custom-scrollbar relative">
        <!-- Back Button for Single View (when accessed from cluster) -->
        <button v-if="hoveredMerchant && lastViewedCluster" @click="backToCluster" class="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-10" title="Kembali ke daftar klaster">
          <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        </button>

        <h2 class="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Panel Intelijen</h2>
        
        <!-- Cluster View -->
        <div v-if="hoveredCluster" class="animate-fade-in-up">
          <div class="bg-blue-50 text-blue-600 font-bold px-4 py-3 rounded-xl mb-4 border border-blue-100 flex justify-between items-center">
            <span>Kepadatan Klaster</span>
            <span class="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs">{{ hoveredCluster.point_count }} Pedagang</span>
          </div>
          
          <p class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Titik dalam klaster ini (Klik untuk info):</p>
          
          <!-- Loading state -->
          <div v-if="clusterLoading" class="flex flex-col items-center justify-center py-10">
            <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin text-blue-400 mb-2" />
            <p class="text-xs text-slate-400 font-medium">Mengekstrak data titik...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="clusterError" class="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100">
            {{ clusterError }}
          </div>
          
          <!-- List -->
          <div v-else class="space-y-3">
            <div v-for="m in hoveredClusterMerchants" :key="m.uuid" @click="selectMerchantFromCluster(m)" class="flex gap-3 items-center p-3 hover:bg-blue-50 bg-slate-50 rounded-xl border border-transparent hover:border-blue-200 transition-all cursor-pointer shadow-sm group">
              <img v-if="m.photo_profile" :src="m.photo_profile" class="w-10 h-10 rounded-full object-cover shadow-sm shrink-0" />
              <div v-else class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 border">
                <Icon name="heroicons:building-storefront" class="w-5 h-5" />
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-bold text-sm text-slate-800 truncate group-hover:text-blue-700 transition-colors">{{ m.store_name || m.name || 'Toko Tidak Diketahui' }}</h4>
                <p class="text-xs text-slate-500 truncate">{{ m.category_store || 'Tanpa Kategori' }}</p>
              </div>
              <Icon name="heroicons:chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors" />
            </div>
            
            <div v-if="hoveredCluster.point_count > hoveredClusterMerchants.length && hoveredClusterMerchants.length > 0" class="text-center mt-4">
              <p class="text-xs text-slate-400 italic">+ {{ hoveredCluster.point_count - hoveredClusterMerchants.length }} pedagang lainnya (Perbesar untuk memisahkan)</p>
            </div>
            
            <div v-if="hoveredClusterMerchants.length === 0" class="text-center mt-4">
              <p class="text-xs text-slate-400 italic">Tidak ada properti titik ditemukan. Mungkin telah disaring.</p>
            </div>
          </div>
        </div>

        <!-- Single Merchant View -->
        <div v-else-if="hoveredMerchant" class="animate-fade-in-up">
          <div class="w-20 h-20 rounded-full border-4 border-blue-50 bg-slate-100 mx-auto mb-4 overflow-hidden shadow-md">
            <img v-if="hoveredMerchant.photo_profile" :src="hoveredMerchant.photo_profile" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
              <Icon name="heroicons:building-storefront" class="w-10 h-10" />
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-center text-slate-800 mb-1">{{ hoveredMerchant.store_name || hoveredMerchant.name }}</h3>
          <div class="flex justify-center mb-6">
            <span class="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase rounded-full border border-emerald-100">
              {{ hoveredMerchant.category_store || 'Titik Terverifikasi' }}
            </span>
          </div>

          <div class="space-y-4 text-sm">
            <div>
              <p class="text-xs font-bold text-slate-400 mb-1">Nama Pemilik</p>
              <p class="font-medium text-slate-700 flex items-center gap-2">
                <Icon name="heroicons:user" class="w-4 h-4 text-slate-400" />
                {{ hoveredMerchant.name }}
              </p>
            </div>
            <div class="border-t pt-4">
              <p class="text-xs font-bold text-slate-400 mb-1">Info Kontak</p>
              <p class="font-medium text-slate-700 flex items-center gap-2 mb-2">
                <Icon name="heroicons:phone" class="w-4 h-4 text-emerald-500" />
                {{ hoveredMerchant.phone_number || 'Tidak ada telepon' }}
              </p>
              <p class="font-medium text-slate-700 flex items-center gap-2 text-xs">
                <Icon name="heroicons:envelope" class="w-4 h-4 text-slate-400" />
                {{ hoveredMerchant.email }}
              </p>
            </div>
            <div class="border-t pt-4">
              <p class="text-xs font-bold text-slate-400 mb-1">Alamat Terdaftar</p>
              <p class="text-xs font-medium text-slate-600 leading-relaxed flex items-start gap-2">
                <Icon name="heroicons:map-pin" class="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                {{ hoveredMerchant.address || 'Alamat tidak tersedia dalam database.' }}
              </p>
            </div>
            <div class="border-t pt-4">
              <p class="text-xs font-bold text-slate-400 mb-1">Koordinat</p>
              <p class="font-mono text-xs text-blue-600 bg-blue-50 p-2 rounded-lg text-center">
                {{ hoveredMerchant.latitude?.toFixed(5) }}, {{ hoveredMerchant.longitude?.toFixed(5) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-64 text-center">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Icon name="heroicons:cursor-arrow-rays" class="w-8 h-8 text-slate-300" />
          </div>
          <p class="text-sm font-bold text-slate-400">Arahkan kursor ke klaster atau titik di peta<br/>untuk melihat intelijen.</p>
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

const activeStyle = ref('street')
const activeMode = ref('cluster')

// Intel Panel State
const hoveredMerchant = ref<any>(null)
const hoveredCluster = ref<any>(null)
const hoveredClusterMerchants = ref<any[]>([])
const clusterLoading = ref(false)
const clusterError = ref('')
const lastViewedCluster = ref<any>(null)

let geojsonData: any = null

const GLYPHS_URL = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"

const styles = {
  street: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'gmaps-street': {
        type: 'raster',
        tiles: ['https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'],
        tileSize: 256
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'gmaps-street', minzoom: 0, maxzoom: 22 }]
  },
  satellite: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'gmaps-hybrid': {
        type: 'raster',
        tiles: ['https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'],
        tileSize: 256
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'gmaps-hybrid', minzoom: 0, maxzoom: 22 }]
  },
  terrain: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'gmaps-terrain': {
        type: 'raster',
        tiles: ['https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'],
        tileSize: 256
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'gmaps-terrain', minzoom: 0, maxzoom: 22 }]
  },
  dark: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'carto-dark': {
        type: 'raster',
        tiles: ['https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png'],
        tileSize: 256
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'carto-dark', minzoom: 0, maxzoom: 22 }]
  },
  light: {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      'carto-light': {
        type: 'raster',
        tiles: ['https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png'],
        tileSize: 256
      }
    },
    layers: [{ id: 'base-layer', type: 'raster', source: 'carto-light', minzoom: 0, maxzoom: 22 }]
  }
}

const initMap = async () => {
  if (!mapContainer.value) return

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: styles.street as any,
    center: [106.827153, -6.175110], // Jakarta
    zoom: 5
  })

  map.value.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.value.on('load', async () => {
    try {
      const merchants = await api.get('/admin/analytics/merchants-map')
      
      const features = merchants.filter((m: any) => m.longitude && m.latitude).map((m: any) => ({
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

  if (!map.value.getLayer('unclustered-point')) {
    map.value.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'merchants-cluster',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#f43f5e',
        'circle-radius': 8,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff'
      },
      layout: { visibility: activeMode.value === 'cluster' ? 'visible' : 'none' }
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

const switchStyle = (styleId: 'street' | 'satellite' | 'terrain' | 'dark' | 'light') => {
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
