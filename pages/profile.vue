<template>
  <div class="animate-fade-in max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-black uppercase tracking-tight" style="color: var(--wp-navy);">Profil Admin</h1>
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Kelola informasi akun dan kata sandi Anda</p>
      </div>
    </div>

    <!-- Profile Info Card -->
    <div class="bg-white dark:bg-slate-800 border border-[var(--wp-border)] rounded shadow-sm overflow-hidden">
      <div class="p-6 md:p-8 border-b border-[var(--wp-border)] bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row items-center gap-6">
        <!-- Profile Picture Area -->
        <div class="relative group flex flex-col items-center gap-3">
          <div class="relative">
            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-md bg-white">
              <img :src="photoPreview || user?.photo_profile || logoSrc" alt="Profile" class="w-full h-full object-cover p-2" />
            </div>
            <!-- Loading overlay -->
            <div v-if="photoUploading" class="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
              <Icon name="heroicons:arrow-path" class="w-6 h-6 text-white animate-spin" />
            </div>
          </div>
          <!-- Photo upload controls -->
          <div class="flex flex-col items-center gap-2">
            <input type="file" accept="image/*" @change="handlePhotoChange" class="hidden" ref="photoInput" />
            <div class="flex gap-2">
              <button type="button" @click="photoInput?.click()" class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border border-[var(--wp-border)] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Icon name="heroicons:photo" class="w-3.5 h-3.5" />
                {{ selectedFile ? 'Ganti Foto' : 'Pilih Foto' }}
              </button>
              <button v-if="selectedFile" type="button" @click="uploadPhoto" :disabled="photoUploading" class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded text-white transition-colors" style="background: var(--wp-gold);">
                <Icon name="heroicons:check" class="w-3.5 h-3.5" />
                {{ photoUploading ? 'Mengupload...' : 'Simpan Foto' }}
              </button>
            </div>
            <p v-if="photoUploadError" class="text-red-500 text-[10px] font-medium">{{ photoUploadError }}</p>
            <p v-if="photoSuccessMsg" class="text-green-600 text-[10px] font-medium">{{ photoSuccessMsg }}</p>
          </div>
        </div>

        <div class="text-center md:text-left flex-1">
          <h2 class="text-2xl font-black text-[var(--wp-navy)] dark:text-white">{{ user?.name }}</h2>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Administrator Utama</p>
          <div class="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded" style="background: rgba(212,168,67,0.1); color: var(--wp-gold-dark);">
              <Icon name="heroicons:envelope" class="w-3.5 h-3.5" />
              {{ user?.email }}
            </span>
            <span v-if="user?.phone_number" class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Icon name="heroicons:phone" class="w-3.5 h-3.5" />
              {{ user?.phone_number }}
            </span>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div class="p-6 md:p-8">
        <form @submit.prevent="handleUpdateProfile" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Nama Lengkap</label>
              <input v-model="form.name" type="text" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required />
            </div>
            <div class="space-y-1.5">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Nomor Telepon</label>
              <input v-model="form.phone_number" type="text" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" />
            </div>
          </div>

          <!-- Error / Success Messages -->
          <div v-if="errorMsg" class="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded border border-rose-100 flex items-center gap-2">
            <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
            <span>{{ errorMsg }}</span>
          </div>
          <div v-if="successMsg" class="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded border border-emerald-100 flex items-center gap-2">
            <Icon name="heroicons:check-circle" class="w-4 h-4" />
            <span>{{ successMsg }}</span>
          </div>

          <div class="pt-4 flex justify-end">
            <button type="submit" :disabled="isSubmitting" class="px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" style="background: linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark)); border-radius: 4px;">
              <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="heroicons:check" class="w-4 h-4" />
              <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password Card -->
    <div class="bg-white dark:bg-slate-800 border border-[var(--wp-border)] rounded shadow-sm overflow-hidden mt-6">
      <div class="p-6 md:p-8">
        <h2 class="text-lg font-bold text-[var(--wp-navy)] dark:text-white mb-1">Ganti Password</h2>
        <p class="text-xs text-slate-500 mb-6">Pastikan akun Anda aman dengan menggunakan kata sandi yang kuat.</p>
        
        <form @submit.prevent="handleChangePassword" class="space-y-4 max-w-xl">
          <div class="space-y-1.5">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Password Lama</label>
            <input v-model="passForm.old_password" type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required />
          </div>
          <div class="space-y-1.5">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Password Baru</label>
            <input v-model="passForm.new_password" type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required minlength="8" />
          </div>
          <div class="space-y-1.5">
            <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Konfirmasi Password Baru</label>
            <input v-model="passForm.confirm_password" type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required minlength="8" />
          </div>

          <div v-if="passErrorMsg" class="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded border border-rose-100 flex items-center gap-2">
            <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
            <span>{{ passErrorMsg }}</span>
          </div>
          <div v-if="passSuccessMsg" class="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded border border-emerald-100 flex items-center gap-2">
            <Icon name="heroicons:check-circle" class="w-4 h-4" />
            <span>{{ passSuccessMsg }}</span>
          </div>

          <div class="pt-2">
            <button type="submit" :disabled="isChangingPassword" class="px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center md:justify-start gap-2" style="background: var(--wp-navy); border-radius: 4px;">
              <Icon v-if="isChangingPassword" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="heroicons:key" class="w-4 h-4" />
              <span>{{ isChangingPassword ? 'Memproses...' : 'Perbarui Password' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { api } from '~/utils/api'

const { user, fetchMe, updateProfile } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()
const colorMode = useColorMode()

const logoSrc = computed(() => {
  return colorMode.value === 'dark' ? '/logo_darkmode.png' : '/logo_lightmode.png'
})

const form = ref({
  name: '',
  phone_number: ''
})

const isSubmitting = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

// Photo upload state
const photoInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const photoPreview = ref<string | null>(null)
const photoUploading = ref(false)
const photoUploadError = ref('')
const photoSuccessMsg = ref('')

// Password variables
const passForm = ref({
  old_password: '',
  new_password: '',
  confirm_password: ''
})
const isChangingPassword = ref(false)
const passErrorMsg = ref('')
const passSuccessMsg = ref('')


onMounted(async () => {
  if (!user.value) {
    try {
      await fetchMe()
    } catch (e) {
      // ignore
    }
  }
  
  if (!user.value) {
    router.push('/login')
    return
  }

  if (user.value) {
    form.value = {
      name: user.value.name || '',
      phone_number: user.value.phone_number || ''
    }
  }
})

const handleUpdateProfile = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  isSubmitting.value = true

  try {
    await updateProfile(form.value)
    successMsg.value = 'Profil berhasil diperbarui!'
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMsg.value = ''
    }, 3000)

  } catch (error: any) {
    errorMsg.value = error.message || 'Terjadi kesalahan sistem'
  } finally {
    isSubmitting.value = false
  }
}

// Photo upload handlers
const handlePhotoChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    photoUploadError.value = 'Ukuran gambar maksimal 5MB'
    selectedFile.value = null
    photoPreview.value = null
    return
  }

  selectedFile.value = file
  photoUploadError.value = ''
  photoSuccessMsg.value = ''

  const reader = new FileReader()
  reader.onload = (ev) => { photoPreview.value = ev.target?.result as string }
  reader.readAsDataURL(file)
}

const uploadPhoto = async () => {
  if (!selectedFile.value) return

  photoUploading.value = true
  photoUploadError.value = ''
  photoSuccessMsg.value = ''

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    // Adjust api endpoint according to your backend for admin profile picture
    const result = await api.post('/stocks/upload-image', formData, { headers: {} as any })
    await updateProfile({ photo_profile: result.url })
    photoSuccessMsg.value = 'Foto profil berhasil diperbarui!'
    selectedFile.value = null
    setTimeout(() => { photoSuccessMsg.value = '' }, 3000)
  } catch (err: any) {
    photoUploadError.value = err.message || 'Gagal mengupload foto'
  } finally {
    photoUploading.value = false
  }
}

const handleChangePassword = async () => {
  passErrorMsg.value = ''
  passSuccessMsg.value = ''

  if (passForm.value.new_password !== passForm.value.confirm_password) {
    passErrorMsg.value = 'Password baru dan konfirmasi tidak cocok.'
    return
  }

  isChangingPassword.value = true
  try {
    await api.post('/auth/change-password', {
      old_password: passForm.value.old_password,
      new_password: passForm.value.new_password
    })
    
    passSuccessMsg.value = 'Password berhasil diubah!'
    passForm.value.old_password = ''
    passForm.value.new_password = ''
    passForm.value.confirm_password = ''
    
    setTimeout(() => { passSuccessMsg.value = '' }, 3000)
  } catch (error: any) {
    passErrorMsg.value = error.response?.data?.detail || error.message || 'Gagal mengubah password'
  } finally {
    isChangingPassword.value = false
  }
}
</script>
