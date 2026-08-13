import __nuxt_component_1 from "./index-BMt2yK26.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import { defineComponent, ref, mergeProps, useSSRContext, computed, withCtx, createTextVNode, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import "maplibre-gl";
/* empty css                     */
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { AgGridVue } from "ag-grid-vue3";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
/* empty css                         */
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MiniMap",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner" }, _attrs))}>`);
      if (loading.value) {
        _push(`<div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-7 h-7 animate-spin text-blue-500 mb-2"
        }, null, _parent));
        _push(`<span class="text-xs font-bold text-slate-300">MEMUAT PETA...</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full h-full min-h-[360px]"></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MiniMap.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ModuleRegistry.registerModules([AllCommunityModule]);
    use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);
    const loading = ref(true);
    const stats = ref({
      totalMerchants: 0,
      activeUsers: 0,
      aiRequests: 0,
      totalTransactions: 0,
      totalRevenue: 0
    });
    const growthData = ref({ dates: [], values: [] });
    const categoryData = ref([]);
    const gridData = ref([]);
    const gridSearch = ref("");
    const colDefs = ref([
      {
        field: "store_name",
        headerName: "MERCHANT / USAMA",
        flex: 2.2,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          const initials = (p.value || "?").substring(0, 2).toUpperCase();
          const name = p.value || p.data.name || "Merchant Tanpa Nama";
          const email = p.data.email || "Tidak ada email";
          const imgHtml = p.data.photo_profile ? `<img src="${p.data.photo_profile}" style="width: 38px; height: 38px; border-radius: 12px; object-fit: cover; border: 1.5px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.06);" />` : `<div style="width: 38px; height: 38px; border-radius: 12px; background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; box-shadow: 0 2px 5px rgba(37,99,235,0.25);">${initials}</div>`;
          return `<div style="display: flex; align-items: center; gap: 12px; height: 100%; padding: 4px 0;">
                ${imgHtml}
                <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.35; overflow: hidden;">
                  <span style="font-weight: 800; color: #0f172a; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${email}</span>
                </div>
              </div>`;
        }
      },
      {
        field: "name",
        headerName: "PEMILIK",
        flex: 1.3,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          return `<div style="display: flex; align-items: center; gap: 8px; height: 100%; color: #334155; font-weight: 600; font-size: 12.5px;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; shrink: 0;">
                  <svg style="width: 14px; height: 14px; color: #64748b;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.value || "N/A"}</span>
              </div>`;
        }
      },
      {
        field: "category_store",
        headerName: "KATEGORI USAHA",
        flex: 1.4,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          if (!p.value) return '<span style="color: #94a3b8; font-style: italic; font-size: 11.5px;">Tanpa Kategori</span>';
          return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; border: 1px solid #bfdbfe; text-transform: uppercase; tracking-wider: 0.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${p.value}
                </span>
              </div>`;
        }
      },
      {
        field: "is_verified",
        headerName: "STATUS REGISTRASI",
        flex: 1.1,
        sortable: true,
        cellRenderer: (p) => {
          const isVerified = p.value !== false && p.data.is_verified !== false;
          if (isVerified) {
            return `<div style="display: flex; align-items: center; height: 100%;">
                  <span style="display: inline-flex; align-items: center; gap: 6px; background-color: #ecfdf5; color: #047857; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #a7f3d0;">
                    <span style="width: 7px; height: 7px; border-radius: 50%; background-color: #10b981; box-shadow: 0 0 6px #10b981;"></span>
                    TERVERIFIKASI
                  </span>
                </div>`;
          }
          return `<div style="display: flex; align-items: center; height: 100%;">
                  <span style="display: inline-flex; align-items: center; gap: 6px; background-color: #fffbeb; color: #b45309; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #fde68a;">
                    <span style="width: 7px; height: 7px; border-radius: 50%; background-color: #f59e0b;"></span>
                    MENUNGGU
                  </span>
                </div>`;
        }
      },
      {
        field: "phone_number",
        headerName: "KONTAK / TELEPON",
        flex: 1.3,
        cellRenderer: (p) => {
          if (!p.value) return '<span style="color: #cbd5e1; font-style: italic;">Tidak ada</span>';
          return `<div style="display: flex; align-items: center; gap: 6px; color: #0f172a; font-weight: 700; font-family: monospace; font-size: 12.5px; height: 100%;">
                <svg style="width: 14px; height: 14px; color: #10b981;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                ${p.value}
              </div>`;
        }
      }
    ]);
    const defaultColDef = ref({
      resizable: true,
      minWidth: 120
    });
    const formatRupiah = (value) => {
      if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)}M`;
      return `Rp ${value.toLocaleString("id-ID")}`;
    };
    const growthOption = computed(() => {
      if (!growthData.value.dates.length) return null;
      return {
        tooltip: { trigger: "axis", backgroundColor: "rgba(255,255,255,0.9)", textStyle: { color: "#1e293b" }, borderWidth: 0, shadowBlur: 10, shadowColor: "rgba(0,0,0,0.1)" },
        grid: { left: 10, right: 10, top: 10, bottom: 0, containLabel: false },
        xAxis: { type: "category", boundaryGap: false, data: growthData.value.dates, show: false },
        yAxis: { type: "value", show: false },
        series: [
          {
            name: "Merchants",
            type: "line",
            smooth: true,
            showSymbol: false,
            data: growthData.value.values,
            itemStyle: { color: "#3B82F6" },
            lineStyle: { width: 3, shadowColor: "rgba(59,130,246,0.5)", shadowBlur: 10 },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ offset: 0, color: "#3B82F688" }, { offset: 1, color: "#3B82F600" }]
              }
            }
          }
        ]
      };
    });
    const categoryOption = computed(() => {
      if (!categoryData.value.length) return null;
      return {
        tooltip: { trigger: "item", backgroundColor: "rgba(255,255,255,0.9)", textStyle: { color: "#1e293b" }, borderWidth: 0, shadowBlur: 10, shadowColor: "rgba(0,0,0,0.1)" },
        series: [
          {
            type: "pie",
            radius: ["55%", "85%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 3 },
            label: { show: false },
            data: categoryData.value
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MiniMap = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in pb-10" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up"><div><h1 class="text-3xl font-black tracking-tight" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">Command Center</h1><p class="text-sm mt-1 text-slate-500 font-medium">Real-time macro analytics &amp; ecosystem database.</p></div><div class="flex items-center gap-3"><button class="px-5 py-2 text-xs font-bold rounded-xl shadow-sm text-white transition-transform hover:scale-105 flex items-center gap-2" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark))" })}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Onboard Merchant </button><button class="px-4 py-2 text-xs font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: ["w-4 h-4", { "animate-spin": loading.value }]
      }, null, _parent));
      _push(` Live Sync </button></div></div>`);
      if (loading.value && !stats.value.totalMerchants) {
        _push(`<div class="flex justify-center items-center h-40">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"><div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Merchants</h3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-storefront",
          class: "w-5 h-5 text-blue-500"
        }, null, _parent));
        _push(`</div><div class="text-3xl font-black text-slate-800">${ssrInterpolate(stats.value.totalMerchants.toLocaleString("id-ID"))}</div><div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-trending-up",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` +12% this month </div></div><div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"><div class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Users</h3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:users",
          class: "w-5 h-5 text-emerald-500"
        }, null, _parent));
        _push(`</div><div class="text-3xl font-black text-slate-800">${ssrInterpolate(stats.value.activeUsers.toLocaleString("id-ID"))}</div><div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-trending-up",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` Peak engagement </div></div><div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"><div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total GMV</h3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:banknotes",
          class: "w-5 h-5 text-purple-500"
        }, null, _parent));
        _push(`</div><div class="text-3xl font-black text-slate-800">${ssrInterpolate(formatRupiah(stats.value.totalRevenue || 0))}</div><div class="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chart-bar",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` Stable growth </div></div><div class="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"><div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div><div class="flex items-center justify-between mb-2"><h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Transactions</h3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:document-text",
          class: "w-5 h-5 text-amber-500"
        }, null, _parent));
        _push(`</div><div class="text-3xl font-black text-slate-800">${ssrInterpolate((stats.value.totalTransactions || 0).toLocaleString("id-ID"))}</div><div class="mt-2 text-xs font-medium text-amber-600 flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:bolt",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` High velocity </div></div></div><div class="grid grid-cols-1 xl:grid-cols-3 gap-6"><div class="xl:col-span-2 bg-white border rounded-2xl p-6 shadow-sm flex flex-col"><div class="flex justify-between items-center mb-4"><div><h2 class="text-base font-bold text-slate-800">Geospatial Distribution</h2><p class="text-xs text-slate-500">Live coordinates of all registered merchants</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/merchants/map",
          class: "px-3 py-1.5 bg-slate-50 border text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Expand Map →`);
            } else {
              return [
                createTextVNode("Expand Map →")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-1 w-full min-h-[350px] rounded-xl overflow-hidden border">`);
        _push(ssrRenderComponent(_component_MiniMap, null, null, _parent));
        _push(`</div></div><div class="flex flex-col gap-6"><div class="bg-white border rounded-2xl p-6 shadow-sm flex-1"><h2 class="text-base font-bold text-slate-800 mb-1">Ecosystem Growth</h2><p class="text-xs text-slate-500 mb-4">30-day trailing merchant acquisition</p>`);
        if (growthOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: growthOption.value,
            autoresize: "",
            class: "h-40 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border rounded-2xl p-6 shadow-sm flex-1"><h2 class="text-base font-bold text-slate-800 mb-1">Category Saturation</h2><p class="text-xs text-slate-500 mb-4">Market share by business type</p>`);
        if (categoryOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: categoryOption.value,
            autoresize: "",
            class: "h-40 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]"><div class="p-5 border-b bg-slate-50 flex items-center justify-between"><div><h2 class="text-base font-bold text-slate-800">Merchant Database (Expert View)</h2><p class="text-xs text-slate-500">High-performance data grid powered by AG Grid.</p></div><div class="flex items-center gap-3"><div class="relative">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:magnifying-glass",
          class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
        }, null, _parent));
        _push(`<input type="text"${ssrRenderAttr("value", gridSearch.value)} placeholder="Search database..." class="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-xl w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"></div><button class="px-3 py-1.5 border rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:funnel",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="text-xs font-bold">Filter</span></button></div></div><div class="flex-1 w-full h-full p-2">`);
        _push(ssrRenderComponent(unref(AgGridVue), {
          class: "ag-theme-quartz w-full h-full custom-ag-grid",
          columnDefs: colDefs.value,
          rowData: gridData.value,
          defaultColDef: defaultColDef.value,
          pagination: true,
          paginationPageSize: 20,
          quickFilterText: gridSearch.value,
          animateRows: true,
          rowSelection: "multiple",
          rowHeight: 60,
          headerHeight: 48
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CI--5dnE.js.map
