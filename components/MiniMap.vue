<template>
  <div class="w-full h-full relative rounded-xl overflow-hidden bg-slate-50 border">
    <div v-if="loading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
      <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin text-slate-400" />
    </div>
    <div ref="mapContainer" class="w-full h-full min-h-[300px]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { api } from '~/utils/api'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: maplibregl.Map | null = null
const loading = ref(true)

const initMap = async () => {
  if (!mapContainer.value) return

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        'carto-dark': {
          type: 'raster',
          tiles: [
            'https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap, &copy; CARTO'
        }
      },
      layers: [
        {
          id: 'carto-dark-layer',
          type: 'raster',
          source: 'carto-dark',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    },
    center: [106.827153, -6.175110], // Default center (Jakarta)
    zoom: 4,
    scrollZoom: false
  })

  map.on('load', async () => {
    try {
      const merchants = await api.get('/admin/analytics/merchants-map')
      if (merchants && merchants.length > 0) {
        
        // Add markers
        const bounds = new maplibregl.LngLatBounds()
        let hasValidCoords = false

        merchants.forEach((m: any) => {
          if (m.longitude && m.latitude) {
            hasValidCoords = true
            
            const photoHtml = m.photo_profile 
              ? `<img src="${m.photo_profile}" class="w-full h-24 object-cover rounded-lg mb-2" />` 
              : '';
              
            const phoneHtml = m.phone_number
              ? `<div class="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                   </svg>
                   ${m.phone_number}
                 </div>`
              : '';

            const popup = new maplibregl.Popup({ offset: 15, closeButton: false, className: 'custom-popup' })
              .setHTML(`
                <div class="w-48 p-1">
                  ${photoHtml}
                  <h3 class="font-bold text-sm text-slate-800 leading-tight">${m.store_name || m.name}</h3>
                  <p class="text-[10px] text-slate-500 mt-1 leading-snug line-clamp-2">${m.address || 'No address provided'}</p>
                  ${phoneHtml}
                </div>
              `)
            
            // Create small marker element
            const el = document.createElement('div')
            el.className = 'pulse-marker'
            
            new maplibregl.Marker({ element: el })
              .setLngLat([m.longitude, m.latitude])
              .setPopup(popup)
              .addTo(map!)
              
            bounds.extend([m.longitude, m.latitude])
          }
        })
        
        if (hasValidCoords) {
          map?.fitBounds(bounds, { padding: 30, maxZoom: 10 })
        }
      }
    } catch (err) {
      console.error("Failed to fetch merchant map data", err)
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) map.remove()
})
</script>
<style>
.custom-popup .maplibregl-popup-content {
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 8px;
  border: 1px solid #f1f5f9;
}
.custom-popup .maplibregl-popup-tip {
  display: none;
}
.pulse-marker {
  width: 14px;
  height: 14px;
  background-color: #3b82f6;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 12px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
</style>
