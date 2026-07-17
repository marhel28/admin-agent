<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '../composables/useAuth'

definePageMeta({ layout: 'auth' })

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const { login } = useAuth()
const colorMode = useColorMode()

const logoSrc = computed(() => {
  return colorMode.value === 'dark' ? '/logo_darkmode.png' : '/logo_lightmode.png'
})

const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    await login(email.value, password.value)
    navigateTo('/')
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Email atau password salah.'
    errorMsg.value = message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-root">
    <!-- Ambient background -->
    <div class="ambient-layer" aria-hidden="true">
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>
      <div class="ambient-grid"></div>
    </div>

    <div class="auth-card animate-fade-in-up">
      <!-- Brand -->
      <div class="brand-block">
        <img :src="logoSrc" class="w-10 h-10 object-contain shrink-0" alt="Nahkoeda Logo" />
        <div class="brand-text">
          <span class="brand-name">Nahkoeda</span>
          <span class="brand-sub">Agentic AI Bot Admin Dashboard</span>
        </div>
      </div>

      <!-- Heading -->
      <div class="heading-block">
        <h1 class="heading-title">Selamat datang kembali</h1>
        <p class="heading-desc">Masuk untuk mengelola dasbor admin</p>
      </div>

      <!-- Error banner -->
      <Transition name="error-slide">
        <div v-if="errorMsg" class="error-banner" role="alert" aria-live="polite">
          <Icon name="heroicons:exclamation-circle-solid" class="icon-error" />
          <span>{{ errorMsg }}</span>
        </div>
      </Transition>

      <!-- Form -->
      <form @submit.prevent="handleLogin" novalidate class="login-form">
        <!-- Email -->
        <div class="field-group">
          <label for="login-email" class="field-label">Email</label>
          <div class="field-input-wrap">
            <Icon name="heroicons:envelope" class="field-icon" aria-hidden="true" />
            <input
              id="login-email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              placeholder="nama@toko.com"
              class="field-input"
              :class="{ 'field-input--error': errorMsg }"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="field-group">
          <div class="field-label-row">
            <label for="login-password" class="field-label">Kata Sandi</label>
            <NuxtLink to="/forgot-password" class="forgot-link" tabindex="0">
              Lupa password?
            </NuxtLink>
          </div>
          <div class="field-input-wrap">
            <Icon name="heroicons:lock-closed" class="field-icon" aria-hidden="true" />
            <input
              id="login-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              placeholder="••••••••"
              class="field-input field-input--pw"
              :class="{ 'field-input--error': errorMsg }"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="toggle-pw"
              :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
            >
              <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="icon-toggle" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading || !email || !password"
          class="btn-submit"
          :class="{ 'btn-submit--loading': loading }"
          id="btn-login-submit"
        >
          <span v-if="loading" class="spinner" aria-hidden="true"></span>
          <Icon v-else name="heroicons:arrow-right-on-rectangle" class="icon-submit" aria-hidden="true" />
          <span>{{ loading ? 'Memverifikasi...' : 'Masuk ke Dashboard' }}</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider" aria-hidden="true">
        <div class="divider-line"></div>
        <span class="divider-text">atau</span>
        <div class="divider-line"></div>
      </div>

      <!-- Register link -->
      <p class="register-prompt">
        Belum punya akun?
        <NuxtLink to="/register" class="register-link">Daftar sekarang</NuxtLink>
      </p>

      <!-- Security badge -->
      <div class="security-badge" aria-label="Koneksi aman terenkripsi">
        <Icon name="heroicons:lock-closed-solid" class="icon-security" aria-hidden="true" />
        <span>Koneksi terenkripsi SSL/TLS</span>
      </div>
    </div>

    <!-- Footer -->
    <footer class="auth-footer">
      <p>&copy; 2026 Nahkoeda — Platform AI Agentic</p>
    </footer>
  </div>
</template>

<style scoped>
/* ── Root ── */
.auth-root {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #060C14;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Fira Sans', system-ui, sans-serif;
}

/* ── Ambient background ── */
.ambient-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}
.orb-1 {
  width: 500px; height: 500px;
  top: -150px; left: -100px;
  background: radial-gradient(circle, #B8922E 0%, transparent 70%);
  animation: orb-drift-1 12s ease-in-out infinite alternate;
}
.orb-2 {
  width: 400px; height: 400px;
  bottom: -120px; right: -80px;
  background: radial-gradient(circle, #1A3A5C 0%, transparent 70%);
  animation: orb-drift-2 10s ease-in-out infinite alternate;
}
.ambient-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
@keyframes orb-drift-1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.05); }
}
@keyframes orb-drift-2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-20px, -30px) scale(1.08); }
}

/* ── Card ── */
.auth-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(212, 168, 67, 0.15);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 24px 64px rgba(0,0,0,0.5),
    0 0 80px rgba(184,146,46,0.06);
}

/* ── Brand ── */
.brand-block {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 2rem;
}
.brand-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #D4A843 0%, #B8922E 100%);
  box-shadow: 0 4px 16px rgba(212,168,67,0.35);
  flex-shrink: 0;
}
.icon-brand { width: 24px; height: 24px; color: white; }
.brand-name {
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  color: #F1F5F9;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.brand-sub {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #94A3B8;
  letter-spacing: 0.01em;
  margin-top: 2px;
}

/* ── Heading ── */
.heading-block { margin-bottom: 1.75rem; }
.heading-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #F8FAFC;
  letter-spacing: -0.03em;
  margin: 0 0 0.375rem;
  line-height: 1.2;
}
.heading-desc {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
}

/* ── Error banner ── */
.error-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.3);
  color: #FCA5A5;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}
.icon-error { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }

.error-slide-enter-active { animation: error-in 0.25s ease-out; }
.error-slide-leave-active { animation: error-out 0.2s ease-in; }
@keyframes error-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes error-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-6px); }
}

/* ── Form ── */
.login-form { display: flex; flex-direction: column; gap: 1.125rem; }
.field-group { display: flex; flex-direction: column; gap: 0.5rem; }
.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forgot-link {
  font-size: 0.75rem;
  font-weight: 600;
  color: #D4A843;
  text-decoration: none;
  transition: color 0.15s;
  cursor: pointer;
}
.forgot-link:hover { color: #E8C46A; }
.field-input-wrap { position: relative; }
.field-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  width: 17px; height: 17px;
  color: #475569;
  pointer-events: none;
}
.field-input {
  width: 100%;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(100,116,139,0.25);
  border-radius: 10px;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  color: #F1F5F9;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  box-sizing: border-box;
}
.field-input::placeholder { color: #475569; }
.field-input:focus {
  border-color: rgba(212,168,67,0.5);
  background: rgba(30, 41, 59, 0.9);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.1);
}
.field-input--pw { padding-right: 2.75rem; }
.field-input--error {
  border-color: rgba(220,38,38,0.4);
}
.field-input--error:focus {
  border-color: rgba(220,38,38,0.6);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
}
.toggle-pw {
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.25rem;
  color: #475569;
  cursor: pointer;
  transition: color 0.15s;
  display: flex; align-items: center;
  border-radius: 4px;
}
.toggle-pw:hover { color: #94A3B8; }
.toggle-pw:focus-visible { outline: 2px solid #D4A843; outline-offset: 2px; }
.icon-toggle { width: 17px; height: 17px; }

/* ── Submit button ── */
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 11px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(135deg, #D4A843 0%, #B8922E 100%);
  color: #0F1A2E;
  box-shadow: 0 4px 16px rgba(212,168,67,0.3);
  margin-top: 0.375rem;
  position: relative;
  overflow: hidden;
}
.btn-submit::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background 0.15s;
}
.btn-submit:hover:not(:disabled)::after { background: rgba(255,255,255,0.08); }
.btn-submit:active:not(:disabled) { transform: scale(0.985); }
.btn-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}
.icon-submit { width: 18px; height: 18px; }

/* Spinner */
.spinner {
  display: inline-block;
  width: 17px; height: 17px;
  border: 2.5px solid rgba(15,26,46,0.3);
  border-top-color: #0F1A2E;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Divider ── */
.divider {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin: 1.5rem 0 1.25rem;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(100,116,139,0.2);
}
.divider-text {
  font-size: 0.75rem;
  color: #475569;
  white-space: nowrap;
  font-weight: 500;
}

/* ── Register prompt ── */
.register-prompt {
  text-align: center;
  font-size: 0.875rem;
  color: #64748B;
  margin: 0 0 1.25rem;
}
.register-link {
  color: #D4A843;
  font-weight: 700;
  text-decoration: none;
  margin-left: 0.25rem;
  transition: color 0.15s;
}
.register-link:hover { color: #E8C46A; }

/* ── Security badge ── */
.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  color: #475569;
  font-weight: 500;
  letter-spacing: 0.02em;
  border-top: 1px solid rgba(100,116,139,0.15);
  padding-top: 1.25rem;
}
.icon-security { width: 12px; height: 12px; color: #D4A843; }

/* ── Footer ── */
.auth-footer {
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
  text-align: center;
  color: #1E293B;
  font-size: 0.7rem;
}

/* ── Enter animation ── */
.animate-fade-in-up {
  animation: fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .auth-card { padding: 2rem 1.375rem; border-radius: 16px; }
  .heading-title { font-size: 1.25rem; }
}

/* ── Accessibility: reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .orb-1, .orb-2 { animation: none; }
  .btn-submit, .field-input, .forgot-link, .register-link { transition: none; }
}
</style>
