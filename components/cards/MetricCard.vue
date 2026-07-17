<template>
  <div class="bg-white border rounded-2xl p-6 shadow-sm transition hover:shadow-md" :style="{ borderColor: 'var(--wp-border)' }">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold" style="color: var(--wp-text-secondary);">{{ title }}</h3>
      <Icon v-if="icon" :name="icon" class="w-5 h-5" style="color: var(--wp-gold);" />
    </div>
    <p class="text-3xl font-extrabold" style="color: var(--wp-text);">{{ value }}</p>
    <p v-if="change" class="text-xs font-semibold mt-2" :class="change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'">
      {{ change }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, default: null },
  change: { type: String, default: null }
})
</script>
