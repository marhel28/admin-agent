import __nuxt_component_1 from "./index-BMt2yK26.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useAuth, a as useColorMode } from "./composables-D9Qffros.js";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "./api-CdlzmCRK.js";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const loading = ref(false);
    const errorMsg = ref("");
    useAuth();
    const colorMode = useColorMode();
    const logoSrc = computed(() => {
      return colorMode.value === "dark" ? "/logo_darkmode.png" : "/logo_lightmode.png";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-root" }, _attrs))} data-v-f6a3080e><div class="ambient-layer" aria-hidden="true" data-v-f6a3080e><div class="ambient-orb orb-1" data-v-f6a3080e></div><div class="ambient-orb orb-2" data-v-f6a3080e></div><div class="ambient-grid" data-v-f6a3080e></div></div><div class="auth-card animate-fade-in-up" data-v-f6a3080e><div class="brand-block" data-v-f6a3080e><img${ssrRenderAttr("src", logoSrc.value)} class="w-10 h-10 object-contain shrink-0" alt="Nahkoeda Logo" data-v-f6a3080e><div class="brand-text" data-v-f6a3080e><span class="brand-name" data-v-f6a3080e>Nahkoeda</span><span class="brand-sub" data-v-f6a3080e>Agentic AI Bot Admin Dashboard</span></div></div><div class="heading-block" data-v-f6a3080e><h1 class="heading-title" data-v-f6a3080e>Selamat datang kembali</h1><p class="heading-desc" data-v-f6a3080e>Masuk untuk mengelola dasbor admin</p></div>`);
      if (errorMsg.value) {
        _push(`<div class="error-banner" role="alert" aria-live="polite" data-v-f6a3080e>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle-solid",
          class: "icon-error"
        }, null, _parent));
        _push(`<span data-v-f6a3080e>${ssrInterpolate(errorMsg.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form novalidate class="login-form" data-v-f6a3080e><div class="field-group" data-v-f6a3080e><label for="login-email" class="field-label" data-v-f6a3080e>Email</label><div class="field-input-wrap" data-v-f6a3080e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "field-icon",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<input id="login-email"${ssrRenderAttr("value", email.value)} type="email" autocomplete="email" required placeholder="nama@toko.com" class="${ssrRenderClass([{ "field-input--error": errorMsg.value }, "field-input"])}" data-v-f6a3080e></div></div><div class="field-group" data-v-f6a3080e><div class="field-label-row" data-v-f6a3080e><label for="login-password" class="field-label" data-v-f6a3080e>Kata Sandi</label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgot-password",
        class: "forgot-link",
        tabindex: "0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lupa password? `);
          } else {
            return [
              createTextVNode(" Lupa password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="field-input-wrap" data-v-f6a3080e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed",
        class: "field-icon",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<input id="login-password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} autocomplete="current-password" required placeholder="••••••••" class="${ssrRenderClass([{ "field-input--error": errorMsg.value }, "field-input field-input--pw"])}" data-v-f6a3080e><button type="button" class="toggle-pw"${ssrRenderAttr("aria-label", showPassword.value ? "Sembunyikan password" : "Tampilkan password")} data-v-f6a3080e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: showPassword.value ? "heroicons:eye-slash" : "heroicons:eye",
        class: "icon-toggle"
      }, null, _parent));
      _push(`</button></div></div><button type="submit"${ssrIncludeBooleanAttr(loading.value || !email.value || !password.value) ? " disabled" : ""} class="${ssrRenderClass([{ "btn-submit--loading": loading.value }, "btn-submit"])}" id="btn-login-submit" data-v-f6a3080e>`);
      if (loading.value) {
        _push(`<span class="spinner" aria-hidden="true" data-v-f6a3080e></span>`);
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-right-on-rectangle",
          class: "icon-submit",
          "aria-hidden": "true"
        }, null, _parent));
      }
      _push(`<span data-v-f6a3080e>${ssrInterpolate(loading.value ? "Memverifikasi..." : "Masuk ke Dashboard")}</span></button></form><div class="divider" aria-hidden="true" data-v-f6a3080e><div class="divider-line" data-v-f6a3080e></div><span class="divider-text" data-v-f6a3080e>atau</span><div class="divider-line" data-v-f6a3080e></div></div><p class="register-prompt" data-v-f6a3080e> Belum punya akun? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "register-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Daftar sekarang`);
          } else {
            return [
              createTextVNode("Daftar sekarang")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="security-badge" aria-label="Koneksi aman terenkripsi" data-v-f6a3080e>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed-solid",
        class: "icon-security",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span data-v-f6a3080e>Koneksi terenkripsi SSL/TLS</span></div></div><footer class="auth-footer" data-v-f6a3080e><p data-v-f6a3080e>© 2026 Nahkoeda — Platform AI Agentic</p></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f6a3080e"]]);
export {
  login as default
};
//# sourceMappingURL=login-CKYF4l98.js.map
