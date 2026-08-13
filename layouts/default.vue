<template>
  <div class="min-h-screen font-sans flex flex-col lg:flex-row text-slate-900" style="background-color: var(--wp-bg, #F4F6F9);">
    <!-- ── Mobile Header Bar ── -->
    <header class="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--wp-border)] shrink-0 sticky top-0 z-[var(--wp-z-sticky)]">
      <div class="flex items-center gap-2">
        <img :src="logoSrc" class="w-8 h-8 object-contain" alt="Nahkoeda Logo" />
        <div>
          <span class="font-black text-sm tracking-tight block leading-none" style="color: var(--wp-navy);">Nahkoeda</span>
          <span class="text-[7px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">Agentic AI Bot</span>
        </div>
      </div>
      
      <!-- Logout / Mini User profile button for mobile header -->
      <div class="flex items-center gap-3">
        <NuxtLink to="/profile" v-if="user" class="flex items-center gap-2 hover:opacity-80 transition" title="Profil Saya">
          <div class="w-7 h-7 rounded-full overflow-hidden border border-[var(--wp-border)] bg-white">
             <img :src="user.photo_profile || logoSrc" alt="Profile" class="w-full h-full object-cover" />
          </div>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded" style="background: rgba(212,168,67,0.08); color: var(--wp-navy);">
            {{ user.name }}
          </span>
        </NuxtLink>
        <button @click="handleLogout" class="p-1.5 border hover:bg-slate-50 dark:hover:bg-slate-800 transition" style="border-color: var(--wp-border); border-radius: 4px;" title="Logout">
          <Icon name="heroicons:arrow-left-on-rectangle" class="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </header>

    <!-- ── Sidebar (Large Devices) ── -->
    <aside class="w-64 bg-white border-r border-[var(--wp-border)] p-0 flex flex-col justify-between hidden lg:flex shrink-0 relative">
      <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--wp-gold)] via-[var(--wp-gold-light)] to-[var(--wp-gold-dark)] opacity-80"></div>

      <div class="p-6 pl-7">
        <div class="flex items-center gap-3 mb-2">
          <img :src="logoSrc" class="w-10 h-10 object-contain shrink-0" alt="Nahkoeda Logo" />
          <div>
            <h2 class="font-black text-lg tracking-tight leading-none" style="color: var(--wp-navy);">Nahkoeda</h2>
            <p class="text-[7px] font-extrabold uppercase tracking-wider mt-1 text-slate-400">Agentic AI Bot Admin Dashboard</p>
          </div>
        </div>

        <!-- User Info -->
        <NuxtLink to="/profile" v-if="user" class="mt-5 p-3 flex items-center gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" style="background: rgba(212,168,67,0.06); border: 1px solid rgba(212,168,67,0.15); border-radius: 4px;" title="Lihat Profil">
          <div class="w-10 h-10 rounded overflow-hidden shrink-0 bg-white">
             <img :src="user.photo_profile || logoSrc" alt="Profile" class="w-full h-full object-cover p-1" />
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold truncate" style="color: var(--wp-text);">{{ user.name }}</p>
            <p class="text-[10px] font-medium truncate" style="color: var(--wp-text-secondary);">{{ user.role === 'admin' ? 'Admin Utama' : user.store_name }}</p>
          </div>
        </NuxtLink>

        <nav class="mt-8 space-y-1">
          <NuxtLink to="/" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:home" class="w-5 h-5" />
            <span>Dashboard</span>
          </NuxtLink>
          
          <div class="pt-4 pb-1">
            <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Merchant Management</p>
          </div>
          <NuxtLink to="/merchants" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:building-storefront" class="w-5 h-5" />
            <span>All Merchants</span>
          </NuxtLink>
          <NuxtLink to="/merchants/new" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:plus" class="w-5 h-5" />
            <span>Tambah Pedagang</span>
          </NuxtLink>
          <NuxtLink to="/merchants/pending" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:clock" class="w-5 h-5" />
            <span>Pending Verification</span>
          </NuxtLink>
          <NuxtLink to="/merchants/map" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:map" class="w-5 h-5" />
            <span>Map View</span>
          </NuxtLink>

          <div class="pt-4 pb-1">
            <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Settings</p>
          </div>
          <NuxtLink to="/ai" exact-active-class="nav-active" class="nav-link" :class="{ 'nav-active': $route.path.startsWith('/ai') }">
            <Icon name="heroicons:sparkles" class="w-5 h-5" />
            <span>AI & Agents</span>
          </NuxtLink>
          <NuxtLink to="/analytics" exact-active-class="nav-active" class="nav-link" :class="{ 'nav-active': $route.path.startsWith('/analytics') }">
            <Icon name="heroicons:chart-bar" class="w-5 h-5" />
            <span>Data & Analytics</span>
          </NuxtLink>
          <NuxtLink to="/integrations" exact-active-class="nav-active" class="nav-link" :class="{ 'nav-active': $route.path.startsWith('/integrations') }">
            <Icon name="heroicons:share" class="w-5 h-5" />
            <span>Integrations</span>
          </NuxtLink>
          <NuxtLink to="/system" exact-active-class="nav-active" class="nav-link" :class="{ 'nav-active': $route.path.startsWith('/system') }">
            <Icon name="heroicons:server" class="w-5 h-5" />
            <span>System Health</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="p-6 pl-7 space-y-4 border-t border-[var(--wp-border)]">
        <button class="w-full py-3 text-xs font-bold shadow-sm transition flex items-center justify-center gap-2" style="background: linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark)); color: white; border-radius: 4px;">
          <Icon name="heroicons:plus" class="w-4 h-4" />
          <span>Upgrade Plan</span>
        </button>
        <div class="space-y-1">
          <NuxtLink to="/settings" exact-active-class="nav-active" class="nav-link">
            <Icon name="heroicons:cog-6-tooth" class="w-4 h-4" />
            <span>Settings</span>
          </NuxtLink>
          <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition text-left" style="color: var(--wp-text-secondary);">
            <Icon name="heroicons:arrow-left-on-rectangle" class="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- ── Main Area ── -->
    <div class="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
      <header v-if="$route.path !== '/merchants/map'" class="h-16 bg-white/80 backdrop-blur-md border-b border-[var(--wp-border)] px-8 items-center justify-between shrink-0 sticky top-0 z-[var(--wp-z-sticky)] hidden lg:flex">
        <div class="relative w-full max-w-sm">
          <Icon name="heroicons:magnifying-glass" class="absolute left-3.5 top-2.5 w-4 h-4" style="color: var(--wp-text-secondary);" />
          <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 rounded text-xs transition border outline-none" style="background-color: var(--wp-bg); border-color: var(--wp-border); color: var(--wp-text);" />
        </div>
        <div class="flex items-center gap-4">
          <span class="text-[11px] font-bold px-3.5 py-1.5 tracking-wide select-none" style="background: var(--wp-navy); color: white;">
            AI Agents
          </span>
          <button class="relative p-2 transition" style="color: var(--wp-text-secondary);">
            <Icon name="heroicons:bell" class="w-5 h-5" />
            <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style="background: var(--wp-gold);"></span>
          </button>
          <button class="p-2 transition" style="color: var(--wp-text-secondary);">
            <Icon name="heroicons:question-mark-circle" class="w-5 h-5" />
          </button>
          <NuxtLink to="/profile" class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold shadow-sm select-none transition-transform hover:scale-105 border-2 border-transparent hover:border-[var(--wp-gold)] bg-white" title="Profil Saya">
             <img :src="user?.photo_profile || logoSrc" alt="Profile" class="w-full h-full object-cover p-0.5" />
          </NuxtLink>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 sm:p-8">
        <slot />
      </main>
    </div>

    <!-- ── Draggable Floating Telegram Action Button ── -->
    <div
      ref="telegramButton"
      @mousedown="startDrag"
      @touchstart="startDrag"
      class="fixed z-[999] flex items-center justify-center w-14 h-14 bg-[#26A5E4] hover:bg-[#208bbf] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 group cursor-move select-none"
      :style="{
        borderRadius: '9999px',
        boxShadow: '0 4px 16px rgba(38, 165, 228, 0.4)',
        left: position.x !== null ? position.x + 'px' : 'auto',
        top: position.y !== null ? position.y + 'px' : 'auto',
        right: position.x === null ? '24px' : 'auto',
        bottom: position.y === null ? '80px' : 'auto'
      }"
      title="Geser untuk memindahkan, klik untuk membuka Telegram Bot"
    >
      <a
        href="https://t.me/UmkmCopilotBot"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full h-full flex items-center justify-center text-white"
        @click="handleTelegramClick"
      >
        <svg class="w-7 h-7 fill-current transition-transform group-hover:rotate-6" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.8-.26-1.43-.4-1.38-.85.03-.24.36-.48.99-.74 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.52 4.46-1.78 4.96-1.79.11 0 .36.03.52.16.13.1.17.25.19.35.02.13.02.26 0 .39z"/>
        </svg>
      </a>
    </div>

    <!-- ── Bottom Navigation Bar (Mobile Devices only) ── -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--wp-border)] flex items-center justify-around px-2 z-[var(--wp-z-sticky)]">
      <NuxtLink to="/" exact-active-class="mobile-nav-active" class="mobile-nav-link">
        <Icon name="heroicons:home" class="w-5 h-5" />
        <span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider">Home</span>
      </NuxtLink>
      <NuxtLink to="/merchants" exact-active-class="mobile-nav-active" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path.startsWith('/merchants') }">
        <Icon name="heroicons:building-storefront" class="w-5 h-5" />
        <span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider">Merchants</span>
      </NuxtLink>
      <NuxtLink to="/ai" exact-active-class="mobile-nav-active" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path.startsWith('/ai') }">
        <Icon name="heroicons:sparkles" class="w-5 h-5" />
        <span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider">AI</span>
      </NuxtLink>
      <NuxtLink to="/analytics" exact-active-class="mobile-nav-active" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path.startsWith('/analytics') }">
        <Icon name="heroicons:chart-bar" class="w-5 h-5" />
        <span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider">Stats</span>
      </NuxtLink>
      <NuxtLink to="/settings" exact-active-class="mobile-nav-active" class="mobile-nav-link" :class="{ 'mobile-nav-active': $route.path.startsWith('/settings') }">
        <Icon name="heroicons:cog-6-tooth" class="w-5 h-5" />
        <span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider">Settings</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user, isAuthenticated, checkAuth, logout: doLogout } = useAuth()
const colorMode = useColorMode()

const logoSrc = computed(() => {
  return colorMode.value === 'dark' ? '/logo_darkmode.png' : '/logo_lightmode.png'
})

// Draggable Telegram Floating Button logic
const position = reactive({
  x: null as number | null,
  y: null as number | null
})
const telegramButton = ref<HTMLElement | null>(null)
let isDragging = false
let dragStartTime = 0
let startOffset = { x: 0, y: 0 }

const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging = true
  dragStartTime = Date.now()
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  const rect = telegramButton.value?.getBoundingClientRect()
  if (rect) {
    startOffset.x = clientX - rect.left
    startOffset.y = clientY - rect.top
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging) return
  
  // Prevent scrolling on mobile during drag gesture
  if (event.cancelable) event.preventDefault()
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  // Constrain inside viewport boundaries
  const buttonWidth = 56 // w-14
  const buttonHeight = 56 // h-14
  let x = clientX - startOffset.x
  let y = clientY - startOffset.y
  
  x = Math.max(10, Math.min(window.innerWidth - buttonWidth - 10, x))
  y = Math.max(10, Math.min(window.innerHeight - buttonHeight - 10, y))
  
  position.x = x
  position.y = y
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

// Differentiate drag vs click action
const handleTelegramClick = (event: MouseEvent) => {
  const dragDuration = Date.now() - dragStartTime
  if (dragDuration > 200) {
    // It was a drag gesture, prevent link navigation
    event.preventDefault()
    event.stopPropagation()
  }
}

onMounted(() => {
  checkAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
  }
})

const handleLogout = () => {
  doLogout()
}
</script>

<style>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.2s ease;
  color: var(--wp-text-secondary);
  text-decoration: none;
}
.nav-link:hover {
  background: var(--wp-bg);
  color: var(--wp-text);
}
.nav-link.nav-active {
  background: rgba(212, 168, 67, 0.10);
  color: #B8922E;
  font-weight: 700;
}
.dark-mode .nav-link.nav-active {
  background: rgba(232, 196, 106, 0.15);
  color: var(--wp-gold);
}
.nav-link.nav-active svg,
.nav-link.nav-active .icon {
  color: #D4A843;
}
.dark-mode .nav-link.nav-active svg,
.dark-mode .nav-link.nav-active .icon {
  color: var(--wp-gold);
}

/* Mobile Nav Styles */
.mobile-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: var(--wp-text-secondary);
  transition: all 0.15s ease;
  text-decoration: none;
  height: 100%;
}
.mobile-nav-link.mobile-nav-active {
  color: #B8922E;
}
.dark-mode .mobile-nav-link.mobile-nav-active {
  color: var(--wp-gold);
}
.mobile-nav-link.mobile-nav-active svg,
.mobile-nav-link.mobile-nav-active .icon {
  color: #D4A843;
}
.dark-mode .mobile-nav-link.mobile-nav-active svg,
.dark-mode .mobile-nav-link.mobile-nav-active .icon {
  color: var(--wp-gold);
}
</style>
