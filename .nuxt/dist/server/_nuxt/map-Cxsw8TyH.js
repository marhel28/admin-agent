import __nuxt_component_1 from "./index-BMt2yK26.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import { defineComponent, ref, shallowRef, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "maplibre-gl";
/* empty css                     */
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    shallowRef(null);
    const loading = ref(true);
    ref("voyager");
    const activeMode = ref("cluster");
    const searchQuery = ref("");
    const selectedCategory = ref("ALL");
    const availableCategories = ref([]);
    const hoveredMerchant = ref(null);
    const hoveredCluster = ref(null);
    const hoveredClusterMerchants = ref([]);
    const clusterLoading = ref(false);
    const clusterError = ref("");
    const lastViewedCluster = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-screen -mx-4 -my-4 sm:-mx-8 sm:-my-8 overflow-hidden bg-slate-900" }, _attrs))}><div class="w-full h-full"></div>`);
      if (loading.value) {
        _push(`<div class="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-30"><div class="flex flex-col items-center bg-white/90 px-6 py-4 rounded-2xl shadow-xl border border-slate-100">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin text-blue-600 mb-2"
        }, null, _parent));
        _push(`<span class="text-xs font-extrabold tracking-wider text-slate-700 uppercase">Memuat Peta Intelijen...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none"><div class="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-3"><div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div><div><h1 class="text-sm font-extrabold text-slate-800 leading-tight">Peta Intelijen Geospasial</h1><p class="text-[11px] text-slate-500 font-medium">Algoritma Supercluster &amp; Heatmap</p></div></div><div class="pointer-events-auto flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200/80"><div class="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200/50">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "w-4 h-4 text-slate-400 shrink-0"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari toko / merchant..." class="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-28 sm:w-36 font-medium">`);
      if (searchQuery.value) {
        _push(`<button class="text-slate-400 hover:text-slate-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-xl border border-slate-200/50">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:funnel",
        class: "w-3.5 h-3.5 text-blue-600 shrink-0 ml-1"
      }, null, _parent));
      _push(`<select class="bg-transparent text-xs text-slate-700 font-bold outline-none cursor-pointer pr-1 max-w-[130px] truncate"><option value="ALL"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "ALL") : ssrLooseEqual(selectedCategory.value, "ALL")) ? " selected" : ""}>Semua Kategori</option><!--[-->`);
      ssrRenderList(availableCategories.value, (cat) => {
        _push(`<option${ssrRenderAttr("value", cat)}${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, cat) : ssrLooseEqual(selectedCategory.value, cat)) ? " selected" : ""}>${ssrInterpolate(cat)}</option>`);
      });
      _push(`<!--]--></select></div><div class="h-6 w-px bg-slate-200 my-auto"></div><div class="flex bg-slate-100/80 p-1 rounded-xl"><button class="${ssrRenderClass([{ "bg-white shadow-sm text-emerald-600 font-bold": activeMode.value === "cluster", "text-slate-600 font-medium hover:text-slate-900": activeMode.value !== "cluster" }, "px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5"])}"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Klaster </button><button class="${ssrRenderClass([{ "bg-white shadow-sm text-red-600 font-bold": activeMode.value === "heatmap", "text-slate-600 font-medium hover:text-slate-900": activeMode.value !== "heatmap" }, "px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5"])}"><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Heatmap </button></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm ml-1 flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Dasbor `);
          } else {
            return [
              createTextVNode(" ← Dasbor ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="absolute top-20 right-4 bottom-4 z-20 w-80 sm:w-96 flex flex-col pointer-events-auto transition-all duration-300"><div class="flex-1 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-2xl p-5 overflow-y-auto custom-scrollbar relative flex flex-col">`);
      if (hoveredMerchant.value && lastViewedCluster.value) {
        _push(`<button class="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-10 shadow-sm" title="Kembali ke daftar klaster">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-left",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between border-b pb-3 mb-4"><h2 class="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:information-circle",
        class: "w-4 h-4 text-blue-500"
      }, null, _parent));
      _push(` Panel Intelijen </h2><span class="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full border border-blue-100">Live Geo</span></div>`);
      if (hoveredCluster.value) {
        _push(`<div class="animate-fade-in-up flex-1"><div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-3 rounded-xl mb-4 shadow-md flex justify-between items-center"><span class="text-xs tracking-wide">Kepadatan Area</span><span class="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-xs font-extrabold">${ssrInterpolate(hoveredCluster.value.point_count)} Merchant</span></div><p class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Daftar Merchant (Klik untuk zoom):</p>`);
        if (clusterLoading.value) {
          _push(`<div class="flex flex-col items-center justify-center py-12">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-6 h-6 animate-spin text-blue-500 mb-2"
          }, null, _parent));
          _push(`<p class="text-xs text-slate-400 font-medium">Mengekstrak data titik...</p></div>`);
        } else if (clusterError.value) {
          _push(`<div class="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-medium border border-red-100">${ssrInterpolate(clusterError.value)}</div>`);
        } else {
          _push(`<div class="space-y-2.5"><!--[-->`);
          ssrRenderList(hoveredClusterMerchants.value, (m) => {
            _push(`<div class="flex gap-3 items-center p-2.5 hover:bg-blue-50/80 bg-slate-50/80 rounded-xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm group">`);
            if (m.photo_profile) {
              _push(`<img${ssrRenderAttr("src", m.photo_profile)} class="w-9 h-9 rounded-full object-cover shadow-sm shrink-0 border">`);
            } else {
              _push(`<div class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-400 shrink-0 border">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:building-storefront",
                class: "w-4 h-4"
              }, null, _parent));
              _push(`</div>`);
            }
            _push(`<div class="min-w-0 flex-1"><h4 class="font-bold text-xs text-slate-800 truncate group-hover:text-blue-600 transition-colors">${ssrInterpolate(m.store_name || m.name || "Toko Tidak Diketahui")}</h4><p class="text-[11px] text-slate-500 truncate">${ssrInterpolate(m.category_store || "Tanpa Kategori")}</p></div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:chevron-right",
              class: "w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors"
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
          if (hoveredCluster.value.point_count > hoveredClusterMerchants.value.length && hoveredClusterMerchants.value.length > 0) {
            _push(`<div class="text-center mt-3"><p class="text-[11px] text-slate-400 italic font-medium">+ ${ssrInterpolate(hoveredCluster.value.point_count - hoveredClusterMerchants.value.length)} merchant lainnya (Zoom mendekat)</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      } else if (hoveredMerchant.value) {
        _push(`<div class="animate-fade-in-up flex-1"><div class="w-16 h-16 rounded-full border-2 border-blue-500/20 bg-slate-100 mx-auto mb-3 overflow-hidden shadow-lg">`);
        if (hoveredMerchant.value.photo_profile) {
          _push(`<img${ssrRenderAttr("src", hoveredMerchant.value.photo_profile)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center text-slate-400 bg-white">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:building-storefront",
            class: "w-8 h-8"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><h3 class="text-lg font-extrabold text-center text-slate-800 mb-1 leading-snug">${ssrInterpolate(hoveredMerchant.value.store_name || hoveredMerchant.value.name)}</h3><div class="flex flex-wrap justify-center gap-1.5 mb-5"><span class="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-blue-200 shadow-sm flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:tag",
          class: "w-3 h-3 text-blue-500"
        }, null, _parent));
        _push(` ${ssrInterpolate(hoveredMerchant.value.category_store || "Makanan & Minuman")}</span>`);
        if (hoveredMerchant.value.store_type) {
          _push(`<span class="px-2.5 py-0.5 bg-purple-50 text-purple-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full border border-purple-200 shadow-sm flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:building-storefront",
            class: "w-3 h-3 text-purple-500"
          }, null, _parent));
          _push(` ${ssrInterpolate(hoveredMerchant.value.store_type)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-3.5 text-xs"><div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100"><p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Nama Pemilik</p><p class="font-semibold text-slate-700 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "w-4 h-4 text-blue-500"
        }, null, _parent));
        _push(` ${ssrInterpolate(hoveredMerchant.value.name)}</p></div><div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-2"><p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Kontak &amp; Detail</p><p class="font-medium text-slate-700 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:phone",
          class: "w-4 h-4 text-emerald-500"
        }, null, _parent));
        _push(` ${ssrInterpolate(hoveredMerchant.value.phone_number || "Tidak ada telepon")}</p><p class="font-medium text-slate-700 flex items-center gap-2 text-[11px] truncate">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:envelope",
          class: "w-4 h-4 text-slate-400 shrink-0"
        }, null, _parent));
        _push(` ${ssrInterpolate(hoveredMerchant.value.email)}</p></div><div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100"><p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Alamat Terdaftar</p><p class="text-xs font-medium text-slate-600 leading-relaxed flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "w-4 h-4 text-red-500 shrink-0 mt-0.5"
        }, null, _parent));
        _push(` ${ssrInterpolate(hoveredMerchant.value.address || "Alamat belum diatur dalam database.")}</p></div><div class="bg-slate-50/80 p-3 rounded-xl border border-slate-100"><p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Koordinat Presisi</p><p class="font-mono text-[11px] text-blue-700 font-bold bg-blue-50 p-2 rounded-lg text-center border border-blue-100">${ssrInterpolate(hoveredMerchant.value.latitude?.toFixed(5))}, ${ssrInterpolate(hoveredMerchant.value.longitude?.toFixed(5))}</p></div></div></div>`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center my-auto py-12 text-center"><div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 border border-blue-100 text-blue-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:cursor-arrow-rays",
          class: "w-7 h-7 animate-bounce"
        }, null, _parent));
        _push(`</div><p class="text-xs font-bold text-slate-600 mb-1">Eksplorasi Peta</p><p class="text-[11px] text-slate-400 leading-relaxed max-w-[200px]">Arahkan kursor ke titik atau klaster untuk menampilkan intelijen lokasi.</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merchants/map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=map-Cxsw8TyH.js.map
