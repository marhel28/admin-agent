<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import type { RegisterPayload } from '../composables/useAuth'

definePageMeta({ layout: 'auth' })

const form = reactive<RegisterPayload>({
  name: '',
  email: '',
  password: '',
  phone_number: '',
  store_name: '',
  address: '',
  role: 'admin',
  description: '',
  latitude: -6.200000,
  longitude: 106.816666,
})

const showPassword = ref(false)
const loading = ref(false)
const detecting = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const registered = ref(false)

// Multi-step form
const currentStep = ref(1)
const totalSteps = 2

const step1Valid = computed(() =>
  form.name.trim() &&
  form.email.trim() &&
  form.password.length >= 8 &&
  form.phone_number.trim()
)
const step2Valid = computed(() =>
  form.store_name.trim() && form.address.trim()
)

const { register: doRegister, verifyEmail } = useAuth()
const colorMode = useColorMode()

const logoSrc = computed(() => {
  return colorMode.value === 'dark' ? '/logo_darkmode.png' : '/logo_lightmode.png'
})

const detectLocation = () => {
  if (!navigator.geolocation) {
    errorMsg.value = 'Browser Anda tidak mendukung geolokasi'
    return
  }
  detecting.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.latitude = parseFloat(pos.coords.latitude.toFixed(6))
      form.longitude = parseFloat(pos.coords.longitude.toFixed(6))
      detecting.value = false
    },
    () => {
      detecting.value = false
      errorMsg.value = 'Gagal mendeteksi lokasi. Masukkan koordinat manual.'
    },
    { enableHighAccuracy: true, timeout: 5000 }
  )
}

const nextStep = () => {
  if (currentStep.value === 1 && step1Valid.value) {
    errorMsg.value = ''
    currentStep.value = 2
  }
}
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const handleRegister = async () => {
  if (loading.value) return
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const data = await doRegister(form)
    if (data?.verification_token) {
      try { await verifyEmail(data.verification_token) } catch { /* ignore */ }
    }
    successMsg.value = 'Akun berhasil dibuat!'
    registered.value = true
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.'
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
      <div class="ambient-orb orb-3"></div>
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

      <!-- Step indicator -->
      <div class="steps-indicator" aria-label="Progress pendaftaran">
        <div
          v-for="s in totalSteps"
          :key="s"
          class="step-item"
          :class="{
            'step-item--done': s < currentStep || registered,
            'step-item--active': s === currentStep && !registered
          }"
        >
          <div class="step-dot">
            <Icon v-if="s < currentStep || registered" name="heroicons:check-solid" class="step-check" />
            <span v-else class="step-num">{{ s }}</span>
          </div>
          <span class="step-label">{{ s === 1 ? 'Data Akun' : 'Info Toko' }}</span>
        </div>
        <div class="step-connector" :class="{ 'step-connector--done': currentStep > 1 || registered }"></div>
      </div>

      <!-- Messages -->
      <Transition name="msg-slide">
        <div v-if="errorMsg" class="error-banner" role="alert" aria-live="polite">
          <Icon name="heroicons:exclamation-circle-solid" class="icon-msg" />
          <span>{{ errorMsg }}</span>
        </div>
      </Transition>

      <!-- ── SUCCESS STATE ── -->
      <Transition name="msg-slide">
        <div v-if="registered" class="success-state">
          <div class="success-icon-wrap">
            <div class="success-ring"></div>
            <Icon name="heroicons:check-circle-solid" class="icon-success-big" />
          </div>
          <h2 class="success-title">Akun Berhasil Dibuat!</h2>
          <p class="success-desc">Selamat bergabung di Nahkoeda. Silakan masuk dengan akun Anda.</p>
          <NuxtLink to="/login" class="btn-goto-login" id="btn-goto-login">
            <Icon name="heroicons:arrow-right-on-rectangle" class="icon-btn" />
            <span>Masuk Sekarang</span>
          </NuxtLink>
        </div>
      </Transition>

      <!-- ── STEP 1: Data Akun ── -->
      <Transition name="step-slide">
        <form
          v-if="!registered && currentStep === 1"
          @submit.prevent="nextStep"
          novalidate
          class="reg-form"
          key="step1"
        >
          <h2 class="form-section-title">Informasi Akun</h2>

          <!-- Role picker -->
          <div class="field-group">
            <span class="field-label">Saya mendaftar sebagai</span>
            <div class="role-picker">
              <label
                class="role-card"
                :class="{ 'role-card--active': form.role === 'admin' }"
                id="role-penjual-label"
              >
                <input type="radio" v-model="form.role" value="admin" class="sr-only" />
                <Icon name="heroicons:building-storefront-solid" class="icon-role" />
                <span class="role-name">Admin</span>
                <span class="role-desc">Kelola stok & kasir</span>
                <Icon v-if="form.role === 'admin'" name="heroicons:check-circle-solid" class="role-check" />
              </label>
              <label
                class="role-card"
                :class="{ 'role-card--active': form.role === 'admin' }"
                id="role-admin-label"
              >
                <input type="radio" v-model="form.role" value="admin" class="sr-only" />
                <Icon name="heroicons:shield-check-solid" class="icon-role" />
                <span class="role-name">Admin</span>
                <span class="role-desc">Pantau & kelola</span>
                <Icon v-if="form.role === 'admin'" name="heroicons:check-circle-solid" class="role-check" />
              </label>
            </div>
          </div>

          <!-- Name -->
          <div class="field-group">
            <label for="reg-name" class="field-label">Nama Lengkap <span class="required">*</span></label>
            <div class="field-input-wrap">
              <Icon name="heroicons:user" class="field-icon" aria-hidden="true" />
              <input id="reg-name" v-model="form.name" type="text" required
                autocomplete="name" placeholder="Budi Santoso"
                class="field-input" />
            </div>
          </div>

          <!-- Email -->
          <div class="field-group">
            <label for="reg-email" class="field-label">Email <span class="required">*</span></label>
            <div class="field-input-wrap">
              <Icon name="heroicons:envelope" class="field-icon" aria-hidden="true" />
              <input id="reg-email" v-model="form.email" type="email" required
                autocomplete="email" placeholder="budi@toko.com"
                class="field-input" />
            </div>
          </div>

          <!-- Password -->
          <div class="field-group">
            <label for="reg-password" class="field-label">Kata Sandi <span class="required">*</span></label>
            <div class="field-input-wrap">
              <Icon name="heroicons:lock-closed" class="field-icon" aria-hidden="true" />
              <input id="reg-password" v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password" required
                placeholder="Minimal 8 karakter"
                class="field-input field-input--pw" />
              <button type="button" @click="showPassword = !showPassword" class="toggle-pw"
                :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'">
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="icon-toggle" />
              </button>
            </div>
            <!-- Password strength -->
            <div class="pw-strength">
              <div class="pw-bars">
                <div class="pw-bar" :class="{ 'pw-bar--fill': form.password.length >= 8 }"></div>
                <div class="pw-bar" :class="{ 'pw-bar--fill': form.password.length >= 10 && /[A-Z]/.test(form.password) }"></div>
                <div class="pw-bar" :class="{ 'pw-bar--fill': form.password.length >= 12 && /[^a-zA-Z0-9]/.test(form.password) }"></div>
              </div>
              <span class="pw-hint">{{ form.password.length < 8 ? 'Min. 8 karakter' : 'Kata sandi valid' }}</span>
            </div>
          </div>

          <!-- Phone -->
          <div class="field-group">
            <label for="reg-phone" class="field-label">Nomor Telepon <span class="required">*</span></label>
            <div class="field-input-wrap">
              <Icon name="heroicons:phone" class="field-icon" aria-hidden="true" />
              <input id="reg-phone" v-model="form.phone_number" type="tel" required
                autocomplete="tel" placeholder="08123456789"
                class="field-input" />
            </div>
          </div>

          <button
            type="submit"
            :disabled="!step1Valid"
            class="btn-next"
            id="btn-step1-next"
          >
            <span>Lanjut ke Info Toko</span>
            <Icon name="heroicons:arrow-right" class="icon-submit" />
          </button>
        </form>
      </Transition>

      <!-- ── STEP 2: Info Toko ── -->
      <Transition name="step-slide">
        <form
          v-if="!registered && currentStep === 2"
          @submit.prevent="handleRegister"
          novalidate
          class="reg-form"
          key="step2"
        >
          <div class="form-section-header">
            <button type="button" @click="prevStep" class="btn-back" aria-label="Kembali ke langkah sebelumnya">
              <Icon name="heroicons:arrow-left" class="icon-back" />
            </button>
            <h2 class="form-section-title">Detail Toko</h2>
          </div>

          <!-- Store name -->
          <div class="field-group">
            <label for="reg-store" class="field-label">Nama Toko <span class="required">*</span></label>
            <div class="field-input-wrap">
              <Icon name="heroicons:building-storefront" class="field-icon" aria-hidden="true" />
              <input id="reg-store" v-model="form.store_name" type="text" required
                placeholder="Toko Kelontong Berkah"
                class="field-input" />
            </div>
          </div>

          <!-- Address -->
          <div class="field-group">
            <label for="reg-address" class="field-label">Alamat Lengkap <span class="required">*</span></label>
            <textarea id="reg-address" v-model="form.address" required rows="2"
              placeholder="Jl. Raya No. 8, Jakarta Selatan..."
              class="field-textarea"></textarea>
          </div>

          <!-- GPS -->
          <div class="field-group">
            <div class="field-label-row">
              <span class="field-label">Koordinat GPS</span>
              <button type="button" @click="detectLocation" :disabled="detecting"
                class="btn-locate"
                :aria-label="detecting ? 'Mendeteksi lokasi...' : 'Deteksi lokasi otomatis'"
                id="btn-detect-location">
                <Icon :name="detecting ? 'heroicons:arrow-path' : 'heroicons:map-pin'"
                  :class="['icon-locate', { 'animate-spin': detecting }]" />
                <span>{{ detecting ? 'Mendeteksi...' : 'Deteksi otomatis' }}</span>
              </button>
            </div>
            <div class="gps-inputs">
              <div class="field-input-wrap">
                <input v-model.number="form.latitude" type="number" step="0.000001"
                  placeholder="Latitude" class="field-input field-input--sm" aria-label="Latitude" />
              </div>
              <div class="field-input-wrap">
                <input v-model.number="form.longitude" type="number" step="0.000001"
                  placeholder="Longitude" class="field-input field-input--sm" aria-label="Longitude" />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="field-group">
            <label for="reg-desc" class="field-label">Deskripsi Toko <span class="optional">(Opsional)</span></label>
            <textarea id="reg-desc" v-model="form.description" rows="2"
              placeholder="Menyediakan aneka sembako dan kebutuhan harian..."
              class="field-textarea"></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading || !step2Valid"
            class="btn-submit"
            :class="{ 'btn-submit--loading': loading }"
            id="btn-register-submit"
          >
            <span v-if="loading" class="spinner" aria-hidden="true"></span>
            <Icon v-else name="heroicons:user-plus-solid" class="icon-submit" aria-hidden="true" />
            <span>{{ loading ? 'Membuat akun...' : 'Buat Akun Sekarang' }}</span>
          </button>
        </form>
      </Transition>

      <!-- Register link -->
      <p v-if="!registered" class="login-prompt">
        Sudah punya akun?
        <NuxtLink to="/login" class="login-link">Masuk di sini</NuxtLink>
      </p>
    </div>

    <!-- Footer -->
    <footer class="auth-footer">
      <p>© 2026 Nahkoeda · Platform UMKM Digital</p>
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
  opacity: 0.3;
}
.orb-1 {
  width: 500px; height: 500px;
  top: -200px; left: -120px;
  background: radial-gradient(circle, #B8922E 0%, transparent 70%);
  animation: orb-drift-1 14s ease-in-out infinite alternate;
}
.orb-2 {
  width: 350px; height: 350px;
  bottom: -100px; right: -60px;
  background: radial-gradient(circle, #1A3A5C 0%, transparent 70%);
  animation: orb-drift-2 11s ease-in-out infinite alternate;
}
.orb-3 {
  width: 250px; height: 250px;
  top: 40%; right: 10%;
  background: radial-gradient(circle, #0D2B1A 0%, transparent 70%);
  opacity: 0.2;
}
.ambient-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
@keyframes orb-drift-1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(25px, 15px) scale(1.04); }
}
@keyframes orb-drift-2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-15px, -25px) scale(1.06); }
}

/* ── Card ── */
.auth-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(212, 168, 67, 0.15);
  border-radius: 20px;
  padding: 2.25rem 2rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 24px 64px rgba(0,0,0,0.55),
    0 0 80px rgba(184,146,46,0.06);
  overflow: hidden;
}

/* ── Brand ── */
.brand-block {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1.625rem;
}
.brand-icon {
  width: 44px; height: 44px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #D4A843 0%, #B8922E 100%);
  box-shadow: 0 4px 14px rgba(212,168,67,0.35);
  flex-shrink: 0;
}
.icon-brand { width: 22px; height: 22px; color: white; }
.brand-name { display: block; font-size: 1.0625rem; font-weight: 700; color: #F1F5F9; letter-spacing: -0.02em; line-height: 1.2; }
.brand-sub  { display: block; font-size: 0.7rem; font-weight: 500; color: #94A3B8; margin-top: 2px; }

/* ── Steps ── */
.steps-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 1.5rem;
  position: relative;
}
.step-connector {
  flex: 1;
  height: 2px;
  background: rgba(100,116,139,0.25);
  margin: 0 0.75rem;
  border-radius: 1px;
  transition: background 0.3s;
  position: relative;
  top: -10px;
}
.step-connector--done { background: #D4A843; }
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.step-dot {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(100,116,139,0.35);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
  background: rgba(15,23,42,0.6);
  transition: all 0.25s;
}
.step-item--active .step-dot {
  border-color: #D4A843;
  color: #D4A843;
  background: rgba(212,168,67,0.1);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.15);
}
.step-item--done .step-dot {
  border-color: #D4A843;
  background: #D4A843;
  color: #0F1A2E;
}
.step-check { width: 14px; height: 14px; }
.step-num { font-size: 0.75rem; font-weight: 700; }
.step-label { font-size: 0.65rem; font-weight: 600; color: #475569; text-align: center; letter-spacing: 0.03em; white-space: nowrap; }
.step-item--active .step-label { color: #D4A843; }
.step-item--done .step-label { color: #94A3B8; }

/* ── Messages ── */
.error-banner {
  display: flex; align-items: flex-start; gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.3);
  color: #FCA5A5;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}
.icon-msg { width: 17px; height: 17px; flex-shrink: 0; margin-top: 1px; }

.msg-slide-enter-active { animation: slide-in 0.25s ease-out; }
.msg-slide-leave-active { animation: slide-out 0.2s ease-in; }
@keyframes slide-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slide-out { from { opacity: 1; } to { opacity: 0; } }

/* ── Success state ── */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 0 0.5rem;
  gap: 0.75rem;
}
.success-icon-wrap {
  position: relative;
  width: 72px; height: 72px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.5rem;
}
.success-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #D4A843;
  animation: success-ring 0.6s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes success-ring {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.icon-success-big {
  width: 44px; height: 44px;
  color: #D4A843;
  animation: pop-in 0.4s 0.15s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.success-title { font-size: 1.375rem; font-weight: 700; color: #F1F5F9; letter-spacing: -0.02em; margin: 0; }
.success-desc  { font-size: 0.875rem; color: #64748B; margin: 0; line-height: 1.6; max-width: 280px; }
.btn-goto-login {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 0.75rem;
  padding: 0.8rem 1.75rem;
  border-radius: 11px;
  background: linear-gradient(135deg, #D4A843 0%, #B8922E 100%);
  color: #0F1A2E;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(212,168,67,0.3);
  transition: opacity 0.15s, transform 0.15s;
}
.btn-goto-login:hover { opacity: 0.9; transform: translateY(-1px); }

/* ── Form & Fields ── */
.reg-form { display: flex; flex-direction: column; gap: 1rem; }
.form-section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #E2E8F0;
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
}
.form-section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0;
}
.btn-back {
  background: rgba(30,41,59,0.7);
  border: 1px solid rgba(100,116,139,0.2);
  border-radius: 8px;
  padding: 0.5rem;
  color: #94A3B8;
  cursor: pointer;
  display: flex; align-items: center;
  transition: all 0.15s;
}
.btn-back:hover { border-color: rgba(212,168,67,0.4); color: #D4A843; }
.icon-back { width: 16px; height: 16px; }

.field-group { display: flex; flex-direction: column; gap: 0.4375rem; }
.field-label { font-size: 0.7rem; font-weight: 600; color: #94A3B8; letter-spacing: 0.06em; text-transform: uppercase; }
.required { color: #D4A843; margin-left: 2px; }
.optional { color: #475569; font-size: 0.65rem; font-weight: 400; text-transform: none; letter-spacing: 0; }
.field-label-row { display: flex; justify-content: space-between; align-items: center; }
.field-input-wrap { position: relative; }
.field-icon {
  position: absolute; left: 0.875rem; top: 50%; transform: translateY(-50%);
  width: 16px; height: 16px; color: #475569; pointer-events: none;
}
.field-input {
  width: 100%;
  background: rgba(30, 41, 59, 0.65);
  border: 1px solid rgba(100,116,139,0.22);
  border-radius: 9px;
  padding: 0.7rem 1rem 0.7rem 2.625rem;
  color: #F1F5F9;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  box-sizing: border-box;
}
.field-input::placeholder { color: #475569; }
.field-input:focus {
  border-color: rgba(212,168,67,0.45);
  background: rgba(30, 41, 59, 0.9);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.08);
}
.field-input--pw { padding-right: 2.625rem; }
.field-input--sm { padding-left: 1rem; font-size: 0.8rem; }
.field-textarea {
  width: 100%;
  background: rgba(30, 41, 59, 0.65);
  border: 1px solid rgba(100,116,139,0.22);
  border-radius: 9px;
  padding: 0.7rem 1rem;
  color: #F1F5F9;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  resize: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}
.field-textarea::placeholder { color: #475569; }
.field-textarea:focus {
  border-color: rgba(212,168,67,0.45);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.08);
}
.toggle-pw {
  position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
  background: none; border: none; padding: 0.25rem; color: #475569;
  cursor: pointer; transition: color 0.15s; display: flex; align-items: center;
  border-radius: 4px;
}
.toggle-pw:hover { color: #94A3B8; }
.toggle-pw:focus-visible { outline: 2px solid #D4A843; outline-offset: 2px; }
.icon-toggle { width: 16px; height: 16px; }

/* ── Password strength ── */
.pw-strength { display: flex; align-items: center; gap: 0.625rem; margin-top: 0.375rem; }
.pw-bars { display: flex; gap: 3px; }
.pw-bar {
  width: 28px; height: 3px;
  border-radius: 2px;
  background: rgba(100,116,139,0.25);
  transition: background 0.25s;
}
.pw-bar--fill { background: #D4A843; }
.pw-hint { font-size: 0.68rem; color: #64748B; }

/* ── Role picker ── */
.role-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; }
.role-card {
  position: relative;
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 2px;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(100,116,139,0.22);
  background: rgba(30,41,59,0.5);
  cursor: pointer;
  transition: all 0.2s;
}
.role-card:hover { border-color: rgba(212,168,67,0.3); background: rgba(30,41,59,0.7); }
.role-card--active {
  border-color: rgba(212,168,67,0.5);
  background: rgba(212,168,67,0.08);
}
.icon-role { width: 20px; height: 20px; color: #64748B; margin-bottom: 4px; }
.role-card--active .icon-role { color: #D4A843; }
.role-name { font-size: 0.8125rem; font-weight: 700; color: #CBD5E1; }
.role-desc  { font-size: 0.68rem; color: #64748B; }
.role-check { position: absolute; top: 0.625rem; right: 0.625rem; width: 16px; height: 16px; color: #D4A843; }

/* ── GPS inputs ── */
.gps-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.btn-locate {
  display: flex; align-items: center; gap: 0.375rem;
  padding: 0.3rem 0.75rem;
  border-radius: 7px;
  border: 1px solid rgba(212,168,67,0.3);
  background: rgba(212,168,67,0.08);
  color: #D4A843;
  font-size: 0.7rem; font-weight: 600; font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-locate:hover:not(:disabled) { background: rgba(212,168,67,0.15); }
.btn-locate:disabled { opacity: 0.5; cursor: not-allowed; }
.icon-locate { width: 13px; height: 13px; }

/* ── Buttons ── */
.btn-next, .btn-submit {
  display: flex; align-items: center; justify-content: center; gap: 0.625rem;
  width: 100%;
  padding: 0.825rem 1.5rem;
  border: none; border-radius: 10px;
  font-size: 0.875rem; font-weight: 700; font-family: inherit;
  cursor: pointer; transition: all 0.2s;
  background: linear-gradient(135deg, #D4A843 0%, #B8922E 100%);
  color: #0F1A2E;
  box-shadow: 0 4px 16px rgba(212,168,67,0.28);
  margin-top: 0.25rem;
  position: relative;
}
.btn-next:disabled, .btn-submit:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
.btn-next:not(:disabled):hover, .btn-submit:not(:disabled):hover { opacity: 0.92; transform: translateY(-1px); }
.btn-next:not(:disabled):active, .btn-submit:not(:disabled):active { transform: scale(0.985); }
.icon-submit { width: 17px; height: 17px; }

.spinner {
  display: inline-block; width: 16px; height: 16px;
  border: 2.5px solid rgba(15,26,46,0.3); border-top-color: #0F1A2E;
  border-radius: 50%; animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Step transition ── */
.step-slide-enter-active { animation: step-in 0.3s cubic-bezier(0.16,1,0.3,1) both; }
.step-slide-leave-active { animation: step-out 0.2s ease-in both; position: absolute; width: 100%; }
@keyframes step-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes step-out { from { opacity: 1; } to { opacity: 0; } }

/* ── Login prompt ── */
.login-prompt { text-align: center; font-size: 0.8125rem; color: #64748B; margin: 1.25rem 0 0; }
.login-link { color: #D4A843; font-weight: 700; text-decoration: none; margin-left: 0.25rem; transition: color 0.15s; }
.login-link:hover { color: #E8C46A; }

/* ── Footer ── */
.auth-footer {
  position: relative; z-index: 1; margin-top: 1.5rem;
  text-align: center; color: #1E293B; font-size: 0.68rem;
}

/* ── Enter animation ── */
.animate-fade-in-up { animation: fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 520px) {
  .auth-card { padding: 1.75rem 1.25rem; }
  .role-picker { grid-template-columns: 1fr 1fr; }
  .gps-inputs { grid-template-columns: 1fr 1fr; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up, .orb-1, .orb-2, .orb-3 { animation: none; }
  .btn-next, .btn-submit, .btn-locate, .field-input, .role-card { transition: none; }
}
</style>

