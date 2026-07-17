<template>
  <div class="bg-white border rounded-2xl p-6 shadow-sm" :style="{ borderColor: 'var(--wp-border)' }">
    <h3 class="text-sm font-bold mb-4" style="color: var(--wp-text-secondary);">Location Cluster Map</h3>
    <div class="w-full h-80 rounded-xl border border-dashed flex items-center justify-center" :style="{ background: 'var(--wp-bg)', borderColor: 'var(--wp-border)' }">
      <div class="flex flex-col items-center gap-2">
        <Icon name="heroicons:map" class="w-8 h-8" style="color: #94A3B8;" />
        <p class="text-xs font-medium" style="color: var(--wp-text-secondary);">MapLibre Cluster Map Placeholder</p>
      </div>
    </div>
  </div>
</template>
