<template>
  <div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col" :style="{ borderColor: 'var(--wp-border)', height: '500px' }">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-sm font-bold" style="color: var(--wp-text-secondary);">GeoLibre Spatial Analysis</h3>
      <span class="text-[10px] font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">Powered by GeoLibre</span>
    </div>
    <div class="w-full flex-1 rounded-xl overflow-hidden border relative" :style="{ background: 'var(--wp-bg)', borderColor: 'var(--wp-border)' }">
      <!-- Embedded GeoLibre Web App -->
      <iframe 
        src="https://web.geolibre.app/" 
        class="w-full h-full border-0 absolute inset-0"
        title="GeoLibre Web"
        allow="geolocation; clipboard-write"
      ></iframe>
    </div>
  </div>
</template>
