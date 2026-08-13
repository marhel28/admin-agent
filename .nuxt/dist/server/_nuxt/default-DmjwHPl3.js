import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import __nuxt_component_1 from "./index-BMt2yK26.js";
import { defineComponent, computed, reactive, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as useAuth, a as useColorMode } from "./composables-D9Qffros.js";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
import "./api-CdlzmCRK.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const colorMode = useColorMode();
    const logoSrc = computed(() => {
      return colorMode.value === "dark" ? "/logo_darkmode.png" : "/logo_lightmode.png";
    });
    const position = reactive({
      x: null,
      y: null
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen font-sans flex flex-col lg:flex-row text-slate-900",
        style: { "background-color": "var(--wp-bg, #F4F6F9)" }
      }, _attrs))}><header class="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--wp-border)] shrink-0 sticky top-0 z-[var(--wp-z-sticky)]"><div class="flex items-center gap-2"><img${ssrRenderAttr("src", logoSrc.value)} class="w-8 h-8 object-contain" alt="Nahkoeda Logo"><div><span class="font-black text-sm tracking-tight block leading-none" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">Nahkoeda</span><span class="text-[7px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">Agentic AI Bot</span></div></div><div class="flex items-center gap-3">`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "flex items-center gap-2 hover:opacity-80 transition",
          title: "Profil Saya"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-7 h-7 rounded-full overflow-hidden border border-[var(--wp-border)] bg-white"${_scopeId}><img${ssrRenderAttr("src", unref(user).photo_profile || logoSrc.value)} alt="Profile" class="w-full h-full object-cover"${_scopeId}></div><span class="text-[10px] font-bold px-2.5 py-1 rounded" style="${ssrRenderStyle({ "background": "rgba(212,168,67,0.08)", "color": "var(--wp-navy)" })}"${_scopeId}>${ssrInterpolate(unref(user).name)}</span>`);
            } else {
              return [
                createVNode("div", { class: "w-7 h-7 rounded-full overflow-hidden border border-[var(--wp-border)] bg-white" }, [
                  createVNode("img", {
                    src: unref(user).photo_profile || logoSrc.value,
                    alt: "Profile",
                    class: "w-full h-full object-cover"
                  }, null, 8, ["src"])
                ]),
                createVNode("span", {
                  class: "text-[10px] font-bold px-2.5 py-1 rounded",
                  style: { "background": "rgba(212,168,67,0.08)", "color": "var(--wp-navy)" }
                }, toDisplayString(unref(user).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-1.5 border hover:bg-slate-50 dark:hover:bg-slate-800 transition" style="${ssrRenderStyle({ "border-color": "var(--wp-border)", "border-radius": "4px" })}" title="Logout">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-left-on-rectangle",
        class: "w-4 h-4 text-slate-500"
      }, null, _parent));
      _push(`</button></div></header><aside class="w-64 bg-white border-r border-[var(--wp-border)] p-0 flex flex-col justify-between hidden lg:flex shrink-0 relative"><div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--wp-gold)] via-[var(--wp-gold-light)] to-[var(--wp-gold-dark)] opacity-80"></div><div class="p-6 pl-7"><div class="flex items-center gap-3 mb-2"><img${ssrRenderAttr("src", logoSrc.value)} class="w-10 h-10 object-contain shrink-0" alt="Nahkoeda Logo"><div><h2 class="font-black text-lg tracking-tight leading-none" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">Nahkoeda</h2><p class="text-[7px] font-extrabold uppercase tracking-wider mt-1 text-slate-400">Agentic AI Bot Admin Dashboard</p></div></div>`);
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "mt-5 p-3 flex items-center gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer",
          style: { "background": "rgba(212,168,67,0.06)", "border": "1px solid rgba(212,168,67,0.15)", "border-radius": "4px" },
          title: "Lihat Profil"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-10 h-10 rounded overflow-hidden shrink-0 bg-white"${_scopeId}><img${ssrRenderAttr("src", unref(user).photo_profile || logoSrc.value)} alt="Profile" class="w-full h-full object-cover p-1"${_scopeId}></div><div class="overflow-hidden"${_scopeId}><p class="text-xs font-bold truncate" style="${ssrRenderStyle({ "color": "var(--wp-text)" })}"${_scopeId}>${ssrInterpolate(unref(user).name)}</p><p class="text-[10px] font-medium truncate" style="${ssrRenderStyle({ "color": "var(--wp-text-secondary)" })}"${_scopeId}>${ssrInterpolate(unref(user).role === "admin" ? "Admin Utama" : unref(user).store_name)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "w-10 h-10 rounded overflow-hidden shrink-0 bg-white" }, [
                  createVNode("img", {
                    src: unref(user).photo_profile || logoSrc.value,
                    alt: "Profile",
                    class: "w-full h-full object-cover p-1"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "overflow-hidden" }, [
                  createVNode("p", {
                    class: "text-xs font-bold truncate",
                    style: { "color": "var(--wp-text)" }
                  }, toDisplayString(unref(user).name), 1),
                  createVNode("p", {
                    class: "text-[10px] font-medium truncate",
                    style: { "color": "var(--wp-text-secondary)" }
                  }, toDisplayString(unref(user).role === "admin" ? "Admin Utama" : unref(user).store_name), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="mt-8 space-y-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:home",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:home",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pt-4 pb-1"><p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Merchant Management</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:building-storefront",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>All Merchants</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:building-storefront",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "All Merchants")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants/new",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:plus",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Tambah Pedagang</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:plus",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Tambah Pedagang")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants/pending",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:clock",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Pending Verification</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:clock",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Pending Verification")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants/map",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:map",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Map View</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:map",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Map View")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pt-4 pb-1"><p class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Settings</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ai",
        "exact-active-class": "nav-active",
        class: ["nav-link", { "nav-active": _ctx.$route.path.startsWith("/ai") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:sparkles",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>AI &amp; Agents</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:sparkles",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "AI & Agents")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics",
        "exact-active-class": "nav-active",
        class: ["nav-link", { "nav-active": _ctx.$route.path.startsWith("/analytics") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:chart-bar",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Data &amp; Analytics</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:chart-bar",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Data & Analytics")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/integrations",
        "exact-active-class": "nav-active",
        class: ["nav-link", { "nav-active": _ctx.$route.path.startsWith("/integrations") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:share",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Integrations</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:share",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Integrations")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/system",
        "exact-active-class": "nav-active",
        class: ["nav-link", { "nav-active": _ctx.$route.path.startsWith("/system") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:server",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>System Health</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:server",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "System Health")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="p-6 pl-7 space-y-4 border-t border-[var(--wp-border)]"><button class="w-full py-3 text-xs font-bold shadow-sm transition flex items-center justify-center gap-2" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark))", "color": "white", "border-radius": "4px" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Upgrade Plan</span></button><div class="space-y-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/settings",
        "exact-active-class": "nav-active",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:cog-6-tooth",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Settings</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:cog-6-tooth",
                class: "w-4 h-4"
              }),
              createVNode("span", null, "Settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition text-left" style="${ssrRenderStyle({ "color": "var(--wp-text-secondary)" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-left-on-rectangle",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Logout</span></button></div></div></aside><div class="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">`);
      if (_ctx.$route.path !== "/merchants/map") {
        _push(`<header class="h-16 bg-white/80 backdrop-blur-md border-b border-[var(--wp-border)] px-8 items-center justify-between shrink-0 sticky top-0 z-[var(--wp-z-sticky)] hidden lg:flex"><div class="relative w-full max-w-sm">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:magnifying-glass",
          class: "absolute left-3.5 top-2.5 w-4 h-4",
          style: { "color": "var(--wp-text-secondary)" }
        }, null, _parent));
        _push(`<input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 rounded text-xs transition border outline-none" style="${ssrRenderStyle({ "background-color": "var(--wp-bg)", "border-color": "var(--wp-border)", "color": "var(--wp-text)" })}"></div><div class="flex items-center gap-4"><span class="text-[11px] font-bold px-3.5 py-1.5 tracking-wide select-none" style="${ssrRenderStyle({ "background": "var(--wp-navy)", "color": "white" })}"> AI Agents </span><button class="relative p-2 transition" style="${ssrRenderStyle({ "color": "var(--wp-text-secondary)" })}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:bell",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style="${ssrRenderStyle({ "background": "var(--wp-gold)" })}"></span></button><button class="p-2 transition" style="${ssrRenderStyle({ "color": "var(--wp-text-secondary)" })}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:question-mark-circle",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold shadow-sm select-none transition-transform hover:scale-105 border-2 border-transparent hover:border-[var(--wp-gold)] bg-white",
          title: "Profil Saya"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", unref(user)?.photo_profile || logoSrc.value)} alt="Profile" class="w-full h-full object-cover p-0.5"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: unref(user)?.photo_profile || logoSrc.value,
                  alt: "Profile",
                  class: "w-full h-full object-cover p-0.5"
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1 overflow-y-auto p-4 sm:p-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div><div class="fixed z-[999] flex items-center justify-center w-14 h-14 bg-[#26A5E4] hover:bg-[#208bbf] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 group cursor-move select-none" style="${ssrRenderStyle({
        borderRadius: "9999px",
        boxShadow: "0 4px 16px rgba(38, 165, 228, 0.4)",
        left: position.x !== null ? position.x + "px" : "auto",
        top: position.y !== null ? position.y + "px" : "auto",
        right: position.x === null ? "24px" : "auto",
        bottom: position.y === null ? "80px" : "auto"
      })}" title="Geser untuk memindahkan, klik untuk membuka Telegram Bot"><a href="https://t.me/UmkmCopilotBot" target="_blank" rel="noopener noreferrer" class="w-full h-full flex items-center justify-center text-white"><svg class="w-7 h-7 fill-current transition-transform group-hover:rotate-6" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.8-.26-1.43-.4-1.38-.85.03-.24.36-.48.99-.74 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.52 4.46-1.78 4.96-1.79.11 0 .36.03.52.16.13.1.17.25.19.35.02.13.02.26 0 .39z"></path></svg></a></div><nav class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--wp-border)] flex items-center justify-around px-2 z-[var(--wp-z-sticky)]">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        "exact-active-class": "mobile-nav-active",
        class: "mobile-nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:home",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider"${_scopeId}>Home</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:home",
                class: "w-5 h-5"
              }),
              createVNode("span", { class: "text-[9px] mt-0.5 font-bold uppercase tracking-wider" }, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants",
        "exact-active-class": "mobile-nav-active",
        class: ["mobile-nav-link", { "mobile-nav-active": _ctx.$route.path.startsWith("/merchants") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:building-storefront",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider"${_scopeId}>Merchants</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:building-storefront",
                class: "w-5 h-5"
              }),
              createVNode("span", { class: "text-[9px] mt-0.5 font-bold uppercase tracking-wider" }, "Merchants")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ai",
        "exact-active-class": "mobile-nav-active",
        class: ["mobile-nav-link", { "mobile-nav-active": _ctx.$route.path.startsWith("/ai") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:sparkles",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider"${_scopeId}>AI</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:sparkles",
                class: "w-5 h-5"
              }),
              createVNode("span", { class: "text-[9px] mt-0.5 font-bold uppercase tracking-wider" }, "AI")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics",
        "exact-active-class": "mobile-nav-active",
        class: ["mobile-nav-link", { "mobile-nav-active": _ctx.$route.path.startsWith("/analytics") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:chart-bar",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider"${_scopeId}>Stats</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:chart-bar",
                class: "w-5 h-5"
              }),
              createVNode("span", { class: "text-[9px] mt-0.5 font-bold uppercase tracking-wider" }, "Stats")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/settings",
        "exact-active-class": "mobile-nav-active",
        class: ["mobile-nav-link", { "mobile-nav-active": _ctx.$route.path.startsWith("/settings") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:cog-6-tooth",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-[9px] mt-0.5 font-bold uppercase tracking-wider"${_scopeId}>Settings</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:cog-6-tooth",
                class: "w-5 h-5"
              }),
              createVNode("span", { class: "text-[9px] mt-0.5 font-bold uppercase tracking-wider" }, "Settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-DmjwHPl3.js.map
