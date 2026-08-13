import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderDynamicModel } from 'vue/server-renderer';
import { u as useAuth, a as useColorMode } from './composables-D9Qffros.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
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
import './api-CdlzmCRK.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const totalSteps = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      password: "",
      phone_number: "",
      store_name: "",
      address: "",
      role: "admin",
      description: "",
      latitude: -6.2,
      longitude: 106.816666
    });
    const showPassword = ref(false);
    const loading = ref(false);
    const detecting = ref(false);
    const errorMsg = ref("");
    ref("");
    const registered = ref(false);
    const currentStep = ref(1);
    const step1Valid = computed(
      () => form.name.trim() && form.email.trim() && form.password.length >= 8 && form.phone_number.trim()
    );
    const step2Valid = computed(
      () => form.store_name.trim() && form.address.trim()
    );
    useAuth();
    const colorMode = useColorMode();
    const logoSrc = computed(() => {
      return colorMode.value === "dark" ? "/logo_darkmode.png" : "/logo_lightmode.png";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-root" }, _attrs))} data-v-f6f54177><div class="ambient-layer" aria-hidden="true" data-v-f6f54177><div class="ambient-orb orb-1" data-v-f6f54177></div><div class="ambient-orb orb-2" data-v-f6f54177></div><div class="ambient-orb orb-3" data-v-f6f54177></div><div class="ambient-grid" data-v-f6f54177></div></div><div class="auth-card animate-fade-in-up" data-v-f6f54177><div class="brand-block" data-v-f6f54177><img${ssrRenderAttr("src", logoSrc.value)} class="w-10 h-10 object-contain shrink-0" alt="Nahkoeda Logo" data-v-f6f54177><div class="brand-text" data-v-f6f54177><span class="brand-name" data-v-f6f54177>Nahkoeda</span><span class="brand-sub" data-v-f6f54177>Agentic AI Bot Admin Dashboard</span></div></div><div class="steps-indicator" aria-label="Progress pendaftaran" data-v-f6f54177><!--[-->`);
      ssrRenderList(totalSteps, (s) => {
        _push(`<div class="${ssrRenderClass([{
          "step-item--done": s < currentStep.value || registered.value,
          "step-item--active": s === currentStep.value && !registered.value
        }, "step-item"])}" data-v-f6f54177><div class="step-dot" data-v-f6f54177>`);
        if (s < currentStep.value || registered.value) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:check-solid",
            class: "step-check"
          }, null, _parent));
        } else {
          _push(`<span class="step-num" data-v-f6f54177>${ssrInterpolate(s)}</span>`);
        }
        _push(`</div><span class="step-label" data-v-f6f54177>${ssrInterpolate(s === 1 ? "Data Akun" : "Info Toko")}</span></div>`);
      });
      _push(`<!--]--><div class="${ssrRenderClass([{ "step-connector--done": currentStep.value > 1 || registered.value }, "step-connector"])}" data-v-f6f54177></div></div>`);
      if (errorMsg.value) {
        _push(`<div class="error-banner" role="alert" aria-live="polite" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle-solid",
          class: "icon-msg"
        }, null, _parent));
        _push(`<span data-v-f6f54177>${ssrInterpolate(errorMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (registered.value) {
        _push(`<div class="success-state" data-v-f6f54177><div class="success-icon-wrap" data-v-f6f54177><div class="success-ring" data-v-f6f54177></div>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle-solid",
          class: "icon-success-big"
        }, null, _parent));
        _push(`</div><h2 class="success-title" data-v-f6f54177>Akun Berhasil Dibuat!</h2><p class="success-desc" data-v-f6f54177>Selamat bergabung di Nahkoeda. Silakan masuk dengan akun Anda.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn-goto-login",
          id: "btn-goto-login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-right-on-rectangle",
                class: "icon-btn"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-f6f54177${_scopeId}>Masuk Sekarang</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-right-on-rectangle",
                  class: "icon-btn"
                }),
                createVNode("span", null, "Masuk Sekarang")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!registered.value && currentStep.value === 1) {
        _push(`<form novalidate class="reg-form" data-v-f6f54177><h2 class="form-section-title" data-v-f6f54177>Informasi Akun</h2><div class="field-group" data-v-f6f54177><span class="field-label" data-v-f6f54177>Saya mendaftar sebagai</span><div class="role-picker" data-v-f6f54177><label class="${ssrRenderClass([{ "role-card--active": form.role === "admin" }, "role-card"])}" id="role-penjual-label" data-v-f6f54177><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(form.role, "admin")) ? " checked" : ""} value="admin" class="sr-only" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-storefront-solid",
          class: "icon-role"
        }, null, _parent));
        _push(`<span class="role-name" data-v-f6f54177>Admin</span><span class="role-desc" data-v-f6f54177>Kelola stok &amp; kasir</span>`);
        if (form.role === "admin") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:check-circle-solid",
            class: "role-check"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="${ssrRenderClass([{ "role-card--active": form.role === "admin" }, "role-card"])}" id="role-admin-label" data-v-f6f54177><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(form.role, "admin")) ? " checked" : ""} value="admin" class="sr-only" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shield-check-solid",
          class: "icon-role"
        }, null, _parent));
        _push(`<span class="role-name" data-v-f6f54177>Admin</span><span class="role-desc" data-v-f6f54177>Pantau &amp; kelola</span>`);
        if (form.role === "admin") {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:check-circle-solid",
            class: "role-check"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</label></div></div><div class="field-group" data-v-f6f54177><label for="reg-name" class="field-label" data-v-f6f54177>Nama Lengkap <span class="required" data-v-f6f54177>*</span></label><div class="field-input-wrap" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "field-icon",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<input id="reg-name"${ssrRenderAttr("value", form.name)} type="text" required autocomplete="name" placeholder="Budi Santoso" class="field-input" data-v-f6f54177></div></div><div class="field-group" data-v-f6f54177><label for="reg-email" class="field-label" data-v-f6f54177>Email <span class="required" data-v-f6f54177>*</span></label><div class="field-input-wrap" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:envelope",
          class: "field-icon",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<input id="reg-email"${ssrRenderAttr("value", form.email)} type="email" required autocomplete="email" placeholder="budi@toko.com" class="field-input" data-v-f6f54177></div></div><div class="field-group" data-v-f6f54177><label for="reg-password" class="field-label" data-v-f6f54177>Kata Sandi <span class="required" data-v-f6f54177>*</span></label><div class="field-input-wrap" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:lock-closed",
          class: "field-icon",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<input id="reg-password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} autocomplete="new-password" required placeholder="Minimal 8 karakter" class="field-input field-input--pw" data-v-f6f54177><button type="button" class="toggle-pw"${ssrRenderAttr("aria-label", showPassword.value ? "Sembunyikan password" : "Tampilkan password")} data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: showPassword.value ? "heroicons:eye-slash" : "heroicons:eye",
          class: "icon-toggle"
        }, null, _parent));
        _push(`</button></div><div class="pw-strength" data-v-f6f54177><div class="pw-bars" data-v-f6f54177><div class="${ssrRenderClass([{ "pw-bar--fill": form.password.length >= 8 }, "pw-bar"])}" data-v-f6f54177></div><div class="${ssrRenderClass([{ "pw-bar--fill": form.password.length >= 10 && /[A-Z]/.test(form.password) }, "pw-bar"])}" data-v-f6f54177></div><div class="${ssrRenderClass([{ "pw-bar--fill": form.password.length >= 12 && /[^a-zA-Z0-9]/.test(form.password) }, "pw-bar"])}" data-v-f6f54177></div></div><span class="pw-hint" data-v-f6f54177>${ssrInterpolate(form.password.length < 8 ? "Min. 8 karakter" : "Kata sandi valid")}</span></div></div><div class="field-group" data-v-f6f54177><label for="reg-phone" class="field-label" data-v-f6f54177>Nomor Telepon <span class="required" data-v-f6f54177>*</span></label><div class="field-input-wrap" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "field-icon",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<input id="reg-phone"${ssrRenderAttr("value", form.phone_number)} type="tel" required autocomplete="tel" placeholder="08123456789" class="field-input" data-v-f6f54177></div></div><button type="submit"${ssrIncludeBooleanAttr(!step1Valid.value) ? " disabled" : ""} class="btn-next" id="btn-step1-next" data-v-f6f54177><span data-v-f6f54177>Lanjut ke Info Toko</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-right",
          class: "icon-submit"
        }, null, _parent));
        _push(`</button></form>`);
      } else {
        _push(`<!---->`);
      }
      if (!registered.value && currentStep.value === 2) {
        _push(`<form novalidate class="reg-form" data-v-f6f54177><div class="form-section-header" data-v-f6f54177><button type="button" class="btn-back" aria-label="Kembali ke langkah sebelumnya" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-left",
          class: "icon-back"
        }, null, _parent));
        _push(`</button><h2 class="form-section-title" data-v-f6f54177>Detail Toko</h2></div><div class="field-group" data-v-f6f54177><label for="reg-store" class="field-label" data-v-f6f54177>Nama Toko <span class="required" data-v-f6f54177>*</span></label><div class="field-input-wrap" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-storefront",
          class: "field-icon",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<input id="reg-store"${ssrRenderAttr("value", form.store_name)} type="text" required placeholder="Toko Kelontong Berkah" class="field-input" data-v-f6f54177></div></div><div class="field-group" data-v-f6f54177><label for="reg-address" class="field-label" data-v-f6f54177>Alamat Lengkap <span class="required" data-v-f6f54177>*</span></label><textarea id="reg-address" required rows="2" placeholder="Jl. Raya No. 8, Jakarta Selatan..." class="field-textarea" data-v-f6f54177>${ssrInterpolate(form.address)}</textarea></div><div class="field-group" data-v-f6f54177><div class="field-label-row" data-v-f6f54177><span class="field-label" data-v-f6f54177>Koordinat GPS</span><button type="button"${ssrIncludeBooleanAttr(detecting.value) ? " disabled" : ""} class="btn-locate"${ssrRenderAttr("aria-label", detecting.value ? "Mendeteksi lokasi..." : "Deteksi lokasi otomatis")} id="btn-detect-location" data-v-f6f54177>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: detecting.value ? "heroicons:arrow-path" : "heroicons:map-pin",
          class: ["icon-locate", { "animate-spin": detecting.value }]
        }, null, _parent));
        _push(`<span data-v-f6f54177>${ssrInterpolate(detecting.value ? "Mendeteksi..." : "Deteksi otomatis")}</span></button></div><div class="gps-inputs" data-v-f6f54177><div class="field-input-wrap" data-v-f6f54177><input${ssrRenderAttr("value", form.latitude)} type="number" step="0.000001" placeholder="Latitude" class="field-input field-input--sm" aria-label="Latitude" data-v-f6f54177></div><div class="field-input-wrap" data-v-f6f54177><input${ssrRenderAttr("value", form.longitude)} type="number" step="0.000001" placeholder="Longitude" class="field-input field-input--sm" aria-label="Longitude" data-v-f6f54177></div></div></div><div class="field-group" data-v-f6f54177><label for="reg-desc" class="field-label" data-v-f6f54177>Deskripsi Toko <span class="optional" data-v-f6f54177>(Opsional)</span></label><textarea id="reg-desc" rows="2" placeholder="Menyediakan aneka sembako dan kebutuhan harian..." class="field-textarea" data-v-f6f54177>${ssrInterpolate(form.description)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(loading.value || !step2Valid.value) ? " disabled" : ""} class="${ssrRenderClass([{ "btn-submit--loading": loading.value }, "btn-submit"])}" id="btn-register-submit" data-v-f6f54177>`);
        if (loading.value) {
          _push(`<span class="spinner" aria-hidden="true" data-v-f6f54177></span>`);
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:user-plus-solid",
            class: "icon-submit",
            "aria-hidden": "true"
          }, null, _parent));
        }
        _push(`<span data-v-f6f54177>${ssrInterpolate(loading.value ? "Membuat akun..." : "Buat Akun Sekarang")}</span></button></form>`);
      } else {
        _push(`<!---->`);
      }
      if (!registered.value) {
        _push(`<p class="login-prompt" data-v-f6f54177> Sudah punya akun? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "login-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Masuk di sini`);
            } else {
              return [
                createTextVNode("Masuk di sini")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><footer class="auth-footer" data-v-f6f54177><p data-v-f6f54177>\xA9 2026 Nahkoeda \xB7 Platform UMKM Digital</p></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f6f54177"]]);

export { register as default };
//# sourceMappingURL=register-CfQZ2RmJ.mjs.map
