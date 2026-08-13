<template>
  <div class="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
    <div v-if="loading" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <Icon name="heroicons:arrow-path" class="w-7 h-7 animate-spin text-blue-500 mb-2" />
      <span class="text-xs font-bold text-slate-300">MEMUAT PETA...</span>
    </div>
    <div ref="mapContainer" class="w-full h-full min-h-[360px]"></div>
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

const GLYPHS_URL = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"

const initMap = async () => {
  if (!mapContainer.value) return

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      glyphs: GLYPHS_URL,
      sources: {
        'carto-voyager': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
          ],
          tileSize: 256,
          attribution: '&copy; CARTO &copy; OpenStreetMap'
        }
      },
      layers: [
        {
          id: 'voyager-base',
          type: 'raster',
          source: 'carto-voyager',
          minzoom: 0,
          maxzoom: 20
        }
      ]
    },
    center: [106.827153, -6.175110], // Default center (Jakarta)
    zoom: 5,
    scrollZoom: true
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.on('load', async () => {
    try {
      const merchants = await api.get('/admin/analytics/merchants-map')
      if (merchants && merchants.length > 0) {
        const features = merchants.filter((m: any) => m.longitude && m.latitude).map((m: any) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [Number(m.longitude), Number(m.latitude)] },
          properties: m
        }))

        const geojsonData = { type: 'FeatureCollection', features }

        // Source for Supercluster
        map!.addSource('dashboard-cluster', {
          type: 'geojson',
          data: geojsonData,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        })

        // Clusters circle layer
        map!.addLayer({
          id: 'dash-clusters',
          type: 'circle',
          source: 'dashboard-cluster',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': ['step', ['get', 'point_count'], '#3b82f6', 10, '#2563eb', 50, '#1d4ed8'],
            'circle-radius': ['step', ['get', 'point_count'], 16, 10, 22, 50, 28],
            'circle-stroke-width': 3,
            'circle-stroke-color': 'rgba(255, 255, 255, 0.9)'
          }
        })

        // Cluster count labels
        map!.addLayer({
          id: 'dash-cluster-count',
          type: 'symbol',
          source: 'dashboard-cluster',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 12
          },
          paint: { 'text-color': '#ffffff' }
        })

        // Unclustered point markers
        map!.addLayer({
          id: 'dash-unclustered-point',
          type: 'circle',
          source: 'dashboard-cluster',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#10b981',
            'circle-radius': 7,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff'
          }
        })

        // Interactive hover popups
        const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12, className: 'dashboard-map-popup' })

        map!.on('mouseenter', 'dash-unclustered-point', (e) => {
          map!.getCanvas().style.cursor = 'pointer'
          if (e.features && e.features[0]) {
            const props = e.features[0].properties
            const coords = (e.features[0].geometry as any).coordinates.slice()

            const photoHtml = props.photo_profile
              ? `<img src="${props.photo_profile}" class="w-full h-20 object-cover rounded-lg mb-2 shadow-sm" />`
              : ''

            const categoryHtml = props.category_store
              ? `<span class="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 font-bold text-[9px] uppercase rounded-full border border-blue-100 mt-1">${props.category_store}</span>`
              : ''

            popup.setLngLat(coords).setHTML(`
              <div class="w-48 p-1">
                ${photoHtml}
                <h4 class="font-extrabold text-xs text-slate-800 leading-tight">${props.store_name || props.name}</h4>
                <p class="text-[10px] text-slate-500 mt-0.5 line-clamp-2">${props.address || 'Alamat belum diatur'}</p>
                ${categoryHtml}
              </div>
            `).addTo(map!)
          }
        })

        map!.on('mouseleave', 'dash-unclustered-point', () => {
          map!.getCanvas().style.cursor = ''
          popup.remove()
        })

        // Zoom on cluster click
        map!.on('click', 'dash-clusters', async (e) => {
          const features = map!.queryRenderedFeatures(e.point, { layers: ['dash-clusters'] })
          const clusterId = features[0].properties.cluster_id
          const source: any = map!.getSource('dashboard-cluster')
          const zoom = await source.getClusterExpansionZoom(clusterId)
          map!.easeTo({
            center: features[0].geometry.coordinates as any,
            zoom: zoom + 1
          })
        })

        map!.on('mouseenter', 'dash-clusters', () => {
          map!.getCanvas().style.cursor = 'pointer'
        })
        map!.on('mouseleave', 'dash-clusters', () => {
          map!.getCanvas().style.cursor = ''
        })

        // Fit bounds
        if (features.length > 0) {
          const bounds = new maplibregl.LngLatBounds()
          features.forEach((f: any) => bounds.extend(f.geometry.coordinates))
          map!.fitBounds(bounds, { padding: 40, maxZoom: 12 })
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
.dashboard-map-popup .maplibregl-popup-content {
  border-radius: 14px;
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.15);
  padding: 8px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}
.dashboard-map-popup .maplibregl-popup-tip {
  border-top-color: rgba(255, 255, 255, 0.95);
}
</style>
