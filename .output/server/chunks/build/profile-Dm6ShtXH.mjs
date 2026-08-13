import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { defineComponent, computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth, a as useColorMode } from './composables-D9Qffros.mjs';
import { useRouter } from 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:module';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './api-CdlzmCRK.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    useRouter();
    const colorMode = useColorMode();
    const logoSrc = computed(() => {
      return colorMode.value === "dark" ? "/logo_darkmode.png" : "/logo_lightmode.png";
    });
    const form = ref({
      name: "",
      phone_number: ""
    });
    const isSubmitting = ref(false);
    const errorMsg = ref("");
    const successMsg = ref("");
    ref(null);
    const selectedFile = ref(null);
    const photoPreview = ref(null);
    const photoUploading = ref(false);
    const photoUploadError = ref("");
    const photoSuccessMsg = ref("");
    const passForm = ref({
      old_password: "",
      new_password: "",
      confirm_password: ""
    });
    const isChangingPassword = ref(false);
    const passErrorMsg = ref("");
    const passSuccessMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-fade-in max-w-4xl mx-auto space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-xl font-black uppercase tracking-tight" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">Profil Admin</h1><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Kelola informasi akun dan kata sandi Anda</p></div></div><div class="bg-white dark:bg-slate-800 border border-[var(--wp-border)] rounded shadow-sm overflow-hidden"><div class="p-6 md:p-8 border-b border-[var(--wp-border)] bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row items-center gap-6"><div class="relative group flex flex-col items-center gap-3"><div class="relative"><div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-md bg-white"><img${ssrRenderAttr("src", photoPreview.value || ((_a = unref(user)) == null ? void 0 : _a.photo_profile) || logoSrc.value)} alt="Profile" class="w-full h-full object-cover p-2"></div>`);
      if (photoUploading.value) {
        _push(`<div class="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-6 h-6 text-white animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-col items-center gap-2"><input type="file" accept="image/*" class="hidden"><div class="flex gap-2"><button type="button" class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border border-[var(--wp-border)] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:photo",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(selectedFile.value ? "Ganti Foto" : "Pilih Foto")}</button>`);
      if (selectedFile.value) {
        _push(`<button type="button"${ssrIncludeBooleanAttr(photoUploading.value) ? " disabled" : ""} class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded text-white transition-colors" style="${ssrRenderStyle({ "background": "var(--wp-gold)" })}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` ${ssrInterpolate(photoUploading.value ? "Mengupload..." : "Simpan Foto")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (photoUploadError.value) {
        _push(`<p class="text-red-500 text-[10px] font-medium">${ssrInterpolate(photoUploadError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (photoSuccessMsg.value) {
        _push(`<p class="text-green-600 text-[10px] font-medium">${ssrInterpolate(photoSuccessMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="text-center md:text-left flex-1"><h2 class="text-2xl font-black text-[var(--wp-navy)] dark:text-white">${ssrInterpolate((_b = unref(user)) == null ? void 0 : _b.name)}</h2><p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Administrator Utama</p><div class="mt-3 flex flex-wrap gap-2 justify-center md:justify-start"><span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded" style="${ssrRenderStyle({ "background": "rgba(212,168,67,0.1)", "color": "var(--wp-gold-dark)" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate((_c = unref(user)) == null ? void 0 : _c.email)}</span>`);
      if ((_d = unref(user)) == null ? void 0 : _d.phone_number) {
        _push(`<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` ${ssrInterpolate((_e = unref(user)) == null ? void 0 : _e.phone_number)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="p-6 md:p-8"><form class="space-y-5"><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div class="space-y-1.5"><label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Nama Lengkap</label><input${ssrRenderAttr("value", form.value.name)} type="text" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required></div><div class="space-y-1.5"><label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Nomor Telepon</label><input${ssrRenderAttr("value", form.value.phone_number)} type="text" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors"></div></div>`);
      if (errorMsg.value) {
        _push(`<div class="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded border border-rose-100 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(errorMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMsg.value) {
        _push(`<div class="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded border border-emerald-100 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(successMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-4 flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark))", "border-radius": "4px" })}">`);
      if (isSubmitting.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-4 h-4 animate-spin"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(`<span>${ssrInterpolate(isSubmitting.value ? "Menyimpan..." : "Simpan Perubahan")}</span></button></div></form></div></div><div class="bg-white dark:bg-slate-800 border border-[var(--wp-border)] rounded shadow-sm overflow-hidden mt-6"><div class="p-6 md:p-8"><h2 class="text-lg font-bold text-[var(--wp-navy)] dark:text-white mb-1">Ganti Password</h2><p class="text-xs text-slate-500 mb-6">Pastikan akun Anda aman dengan menggunakan kata sandi yang kuat.</p><form class="space-y-4 max-w-xl"><div class="space-y-1.5"><label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Password Lama</label><input${ssrRenderAttr("value", passForm.value.old_password)} type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required></div><div class="space-y-1.5"><label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Password Baru</label><input${ssrRenderAttr("value", passForm.value.new_password)} type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required minlength="8"></div><div class="space-y-1.5"><label class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Konfirmasi Password Baru</label><input${ssrRenderAttr("value", passForm.value.confirm_password)} type="password" class="w-full px-3 py-2 text-sm border border-[var(--wp-border)] bg-[var(--wp-bg)] text-[var(--wp-text)] rounded focus:outline-none focus:border-[var(--wp-gold)] transition-colors" required minlength="8"></div>`);
      if (passErrorMsg.value) {
        _push(`<div class="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded border border-rose-100 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(passErrorMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (passSuccessMsg.value) {
        _push(`<div class="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded border border-emerald-100 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(passSuccessMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-2"><button type="submit"${ssrIncludeBooleanAttr(isChangingPassword.value) ? " disabled" : ""} class="px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center md:justify-start gap-2" style="${ssrRenderStyle({ "background": "var(--wp-navy)", "border-radius": "4px" })}">`);
      if (isChangingPassword.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-4 h-4 animate-spin"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:key",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(`<span>${ssrInterpolate(isChangingPassword.value ? "Memproses..." : "Perbarui Password")}</span></button></div></form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-Dm6ShtXH.mjs.map
