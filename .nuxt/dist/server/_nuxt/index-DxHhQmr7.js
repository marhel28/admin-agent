import __nuxt_component_1 from "./index-BMt2yK26.js";
import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { a as api } from "./api-CdlzmCRK.js";
import { AgGridVue } from "ag-grid-vue3";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
/* empty css                         */
import { useDebounceFn } from "@vueuse/core";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ModuleRegistry.registerModules([AllCommunityModule]);
    const router = useRouter();
    const merchants = ref([]);
    const loading = ref(true);
    const gridSearch = ref("");
    const exporting = ref(false);
    const suggestions = ref([]);
    const showSuggestions = ref(false);
    const colDefs = ref([
      {
        field: "store_name",
        headerName: "Nama Toko / Email",
        flex: 2.2,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          const initials = (p.value || "?").substring(0, 2).toUpperCase();
          const name = p.value || "Tanpa Nama";
          const email = p.data?.email || "Belum ada email";
          const imgHtml = p.data?.photo_profile ? `<img src="${p.data.photo_profile}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(226, 232, 240, 0.8); flex-shrink: 0;" />` : `<div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #0F1A2E, #1E293B); color: #F59E0B; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; border: 1px solid rgba(245, 158, 11, 0.2);">${initials}</div>`;
          return `<div style="display: flex; align-items: center; gap: 12px; height: 100%; width: 100%; cursor: pointer;">
                ${imgHtml}
                <div style="display: flex; flex-direction: column; justify-content: center; overflow: hidden; min-width: 0;">
                  <span style="font-weight: 700; color: var(--wp-navy, #0f172a); font-size: 13px; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</span>
                  <span style="font-size: 11px; color: #64748b; font-weight: 500; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${email}</span>
                </div>
              </div>`;
        }
      },
      {
        field: "name",
        headerName: "Pemilik",
        flex: 1.3,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          const ownerName = p.value || "N/A";
          return `<div style="display: flex; align-items: center; gap: 8px; height: 100%; color: #334155; font-weight: 600; font-size: 12.5px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg style="width: 13px; height: 13px; color: #64748b;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ownerName}</span>
              </div>`;
        }
      },
      {
        field: "category_store",
        headerName: "Kategori",
        flex: 1.2,
        filter: true,
        sortable: true,
        cellRenderer: (p) => {
          if (!p.value) return '<span style="color: #94a3b8; font-style: italic; font-size: 11px;">Tanpa Kategori</span>';
          return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="background: #f1f5f9; color: #334155; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${p.value}
                </span>
              </div>`;
        }
      },
      {
        field: "is_verified",
        headerName: "Status",
        flex: 1.1,
        sortable: true,
        cellRenderer: (p) => {
          const isVerified = p.value === true || p.data?.is_verified === true;
          if (isVerified) {
            return `<div style="display: flex; align-items: center; height: 100%;">
                  <span style="display: inline-flex; align-items: center; gap: 5px; background: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 800; border: 1px solid #a7f3d0; text-transform: uppercase;">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #10b981;"></span>
                    Terverifikasi
                  </span>
                </div>`;
          }
          return `<div style="display: flex; align-items: center; height: 100%;">
                <span style="display: inline-flex; align-items: center; gap: 5px; background: #fffbeb; color: #b45309; padding: 3px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 800; border: 1px solid #fde68a; text-transform: uppercase;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #f59e0b;"></span>
                  Menunggu
                </span>
              </div>`;
        }
      },
      {
        field: "phone_number",
        headerName: "Kontak",
        flex: 1.2,
        cellRenderer: (p) => {
          if (!p.value) return '<span style="color: #cbd5e1; font-size: 12px;">-</span>';
          return `<div style="display: flex; align-items: center; gap: 6px; color: #0f172a; font-weight: 600; font-family: monospace; font-size: 12px; height: 100%;">
                <svg style="width: 13px; height: 13px; color: #10b981; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                ${p.value}
              </div>`;
        }
      },
      {
        field: "actions",
        headerName: "",
        width: 60,
        sortable: false,
        filter: false,
        cellRenderer: (p) => {
          return `<div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                <button style="background: transparent; border: none; cursor: pointer; color: #64748b; padding: 4px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.15s;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#0f172a';" onmouseout="this.style.background='transparent'; this.style.color='#64748b';">
                  <svg style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>`;
        }
      }
    ]);
    const defaultColDef = ref({
      resizable: true,
      minWidth: 110
    });
    const onRowClicked = (event) => {
      if (event.data && event.data.uuid) {
        router.push(`/merchants/${event.data.uuid}`);
      }
    };
    const fetchMerchants = async () => {
      loading.value = true;
      try {
        const res = await api.get(`/admin/merchants?limit=1000&search=${encodeURIComponent(gridSearch.value)}`);
        if (res && res.data) {
          merchants.value = res.data;
        }
      } catch (err) {
        console.error("Failed to fetch merchants", err);
      } finally {
        loading.value = false;
      }
    };
    const fetchSuggestions = async () => {
      if (gridSearch.value.length < 2) {
        suggestions.value = [];
        return;
      }
      try {
        const res = await api.get(`/admin/merchants/suggest?q=${encodeURIComponent(gridSearch.value)}`);
        suggestions.value = res || [];
      } catch (e) {
        console.error(e);
      }
    };
    const debouncedSearch = useDebounceFn(() => {
      fetchMerchants();
      fetchSuggestions();
    }, 300);
    watch(gridSearch, () => {
      debouncedSearch();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in pb-10" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-black tracking-tight" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">Database Pedagang</h1><p class="text-sm mt-1 text-slate-500 font-medium">Kelola, cari, dan ekspor semua data pedagang yang terdaftar.</p></div><div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(exporting.value) ? " disabled" : ""} class="px-5 py-2 text-xs font-bold rounded-xl text-white transition-transform hover:scale-105 flex items-center gap-2 disabled:opacity-50" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, var(--wp-gold), var(--wp-gold-dark))" })}">`);
      if (exporting.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-4 h-4 animate-spin"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-down-tray",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(exporting.value ? "Mengekspor..." : "Ekspor CSV")}</button></div></div><div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-[720px]"><div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div class="flex items-center gap-2"><h2 class="text-base font-bold text-slate-900 dark:text-white">Daftar Utama Pedagang</h2><span class="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"> Live Manticore Search </span></div><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kelola dan telusuri seluruh mitra pedagang terdaftar secara presisi.</p></div><div class="flex items-center gap-3"><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
      }, null, _parent));
      _push(`<input type="text"${ssrRenderAttr("value", gridSearch.value)} placeholder="Cari nama toko, pemilik, telepon..." class="pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg w-72 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm">`);
      if (showSuggestions.value && suggestions.value.length > 0) {
        _push(`<div class="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"><div class="px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/50">Rekomendasi Pencarian</div><ul><!--[-->`);
        ssrRenderList(suggestions.value, (s) => {
          _push(`<li class="px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer flex items-center gap-2 transition-colors">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:sparkles",
            class: "w-3.5 h-3.5 text-amber-500"
          }, null, _parent));
          _push(` ${ssrInterpolate(s)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition-colors flex items-center justify-center" title="Refresh Data">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: ["w-4 h-4", { "animate-spin": loading.value }]
      }, null, _parent));
      _push(`</button></div></div><div class="flex-1 w-full h-full p-3 relative bg-slate-50/30 dark:bg-slate-900/40">`);
      if (loading.value) {
        _push(`<div class="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs z-10 flex items-center justify-center"><div class="bg-white dark:bg-slate-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-slate-200 dark:border-slate-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-5 h-5 animate-spin text-amber-500"
        }, null, _parent));
        _push(`<span class="text-xs font-bold text-slate-700 dark:text-slate-200">Memuat Data Pedagang...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(AgGridVue), {
        class: "ag-theme-quartz w-full h-full custom-ag-grid",
        columnDefs: colDefs.value,
        rowData: merchants.value,
        defaultColDef: defaultColDef.value,
        pagination: true,
        paginationPageSize: 20,
        animateRows: true,
        rowSelection: "single",
        rowHeight: 64,
        headerHeight: 44,
        onRowClicked
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merchants/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DxHhQmr7.js.map
