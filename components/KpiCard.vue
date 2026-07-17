<template>
  <div class="bg-white border rounded-2xl p-5 shadow-sm transition hover:shadow-md relative overflow-hidden group" style="border-color: var(--wp-border);">
    <div class="absolute top-0 left-4 right-4 h-0.5 rounded-b" :style="{ background: accent }"></div>
    <div class="flex items-center justify-between mb-3">
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">{{ title }}</span>
      <Icon :name="icon" class="w-5 h-5" :style="{ color: iconColor || 'var(--wp-gold)' }" />
    </div>
    <p class="text-2xl font-extrabold tracking-tight text-slate-900" style="font-variant-numeric: tabular-nums;">
      {{ value }}
    </p>
    <p v-if="change !== undefined" class="text-[11px] font-semibold mt-1.5 flex items-center gap-1"
       :class="change >= 0 ? 'text-emerald-500' : 'text-rose-500'">
      <Icon :name="change >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'" class="w-3.5 h-3.5" />
      {{ change >= 0 ? '+' : '' }}{{ change }}%
      <span class="font-medium ml-0.5 text-slate-400">{{ changeLabel || 'vs last month' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
  accent: string
  iconColor?: string
  change?: number
  changeLabel?: string
}>()
</script>
