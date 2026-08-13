import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { _ as _sfc_main$1 } from './KpiCard-D0K3NN2I.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
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
import './server.mjs';
import 'vue-router';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@iconify/utils/lib/css/icon';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);
    const loading = ref(true);
    const data = ref(null);
    const formatRupiah = (value) => {
      if (!value) return "Rp 0";
      if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)}M`;
      return `Rp ${value.toLocaleString("id-ID")}`;
    };
    const revenueOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "axis", formatter: "{b}<br/>{a}: Rp {c}" },
        grid: { left: 50, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "category", boundaryGap: false, data: data.value.charts.revenueTrend.dates },
        yAxis: { type: "value", axisLabel: { formatter: (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v } },
        series: [
          {
            name: "Revenue",
            type: "line",
            smooth: true,
            data: data.value.charts.revenueTrend.values,
            itemStyle: { color: "#10B981" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ offset: 0, color: "#10B98144" }, { offset: 1, color: "#10B98100" }]
              }
            }
          }
        ]
      };
    });
    const aiOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "axis" },
        grid: { left: 40, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "category", boundaryGap: false, data: data.value.charts.aiActivity.dates },
        yAxis: { type: "value" },
        series: [
          {
            name: "AI Requests",
            type: "line",
            smooth: true,
            data: data.value.charts.aiActivity.values,
            itemStyle: { color: "#8B5CF6" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ offset: 0, color: "#8B5CF644" }, { offset: 1, color: "#8B5CF600" }]
              }
            }
          }
        ]
      };
    });
    const topMerchantsOption = computed(() => {
      if (!data.value) return null;
      const items = data.value.charts.topMerchants.slice().reverse();
      return {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: 120, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "value", axisLabel: { formatter: (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v } },
        yAxis: { type: "category", data: items.map((i) => i.name), axisLabel: { width: 100, overflow: "truncate" } },
        series: [
          {
            name: "Revenue",
            type: "bar",
            data: items.map((i) => i.revenue),
            itemStyle: { color: "#3B82F6", borderRadius: [0, 4, 4, 0] }
          }
        ]
      };
    });
    const categoryOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "item" },
        legend: { bottom: 0, type: "scroll" },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
            label: { show: false },
            data: data.value.charts.categories
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_KpiCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Analytics Center</h1><p class="text-sm mt-1 text-slate-500">Comprehensive insights into platform performance.</p></div><div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm"><button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button><button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button><button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">All Time</button></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics",
        class: "px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Overview`);
          } else {
            return [
              createTextVNode("Overview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics/finance",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Finance`);
          } else {
            return [
              createTextVNode("Finance")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics/merchants",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Merchants`);
          } else {
            return [
              createTextVNode("Merchants")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics/ai-usage",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`AI &amp; Usage`);
          } else {
            return [
              createTextVNode("AI & Usage")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics/catalog",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Catalog Insights`);
          } else {
            return [
              createTextVNode("Catalog Insights")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics/reports",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Reports`);
          } else {
            return [
              createTextVNode("Reports")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-5 gap-4">`);
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Total Omzet",
          value: formatRupiah(data.value.kpi.totalRevenue),
          icon: "heroicons:banknotes",
          accent: "#3B82F6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Total Transaksi",
          value: data.value.kpi.totalTransactions.toLocaleString("id-ID"),
          icon: "heroicons:receipt-percent",
          accent: "#10B981"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Avg Omzet/Toko",
          value: formatRupiah(data.value.kpi.avgRevenuePerStore),
          icon: "heroicons:chart-bar",
          accent: "#F59E0B"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Total Produk",
          value: data.value.kpi.totalProducts.toLocaleString("id-ID"),
          icon: "heroicons:cube",
          accent: "#8B5CF6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Growth (MoM)",
          value: `+${data.value.kpi.growthMoM}%`,
          icon: "heroicons:arrow-trending-up",
          accent: "#EC4899"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Platform Revenue Trend</h2>`);
        if (revenueOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: revenueOption.value,
            autoresize: "",
            class: "h-72 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">AI Chat Activity</h2>`);
        if (aiOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: aiOption.value,
            autoresize: "",
            class: "h-72 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Top 10 Merchants (by Revenue)</h2>`);
        if (topMerchantsOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: topMerchantsOption.value,
            autoresize: "",
            class: "h-72 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Category Distribution</h2>`);
        if (categoryOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: categoryOption.value,
            autoresize: "",
            class: "h-72 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col"><div class="p-4 border-b border-[var(--wp-border)] bg-slate-50/50"><h2 class="text-sm font-bold text-[var(--wp-navy)]">Trending Products</h2></div><table class="w-full text-left text-sm text-slate-600 table-fixed"><thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider"><tr><th class="px-5 py-3 w-3/4">Product Name</th><th class="px-5 py-3 w-1/4 text-right">Qty Sold</th></tr></thead><tbody>`);
        if (!data.value.tables.trendingProducts.length) {
          _push(`<tr><td colspan="2" class="px-5 py-8 text-center text-slate-400">No data available</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(data.value.tables.trendingProducts, (p, i) => {
          _push(`<tr class="border-b border-[var(--wp-border)] last:border-b-0 hover:bg-slate-50 transition-colors"><td class="px-5 py-3 font-medium text-[var(--wp-navy)] truncate">${ssrInterpolate(p.name)}</td><td class="px-5 py-3 text-right font-bold" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">${ssrInterpolate(p.sold)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col"><div class="p-4 border-b border-[var(--wp-border)] bg-slate-50/50 flex justify-between items-center"><h2 class="text-sm font-bold text-[var(--wp-navy)]">Global Low Stock Alerts</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/analytics/stocks",
          class: "text-xs font-bold",
          style: { "color": "var(--wp-gold-dark)" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View All`);
            } else {
              return [
                createTextVNode("View All")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><table class="w-full text-left text-sm text-slate-600 table-fixed"><thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider"><tr><th class="px-5 py-3 w-2/5">Product</th><th class="px-5 py-3 w-2/5">Merchant</th><th class="px-5 py-3 w-1/5 text-right">Stock</th></tr></thead><tbody>`);
        if (!data.value.tables.lowStocks.length) {
          _push(`<tr><td colspan="3" class="px-5 py-8 text-center text-slate-400">All stocks are healthy!</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(data.value.tables.lowStocks, (ls, i) => {
          _push(`<tr class="border-b border-[var(--wp-border)] last:border-b-0 hover:bg-slate-50 transition-colors"><td class="px-5 py-3 font-medium text-[var(--wp-navy)] truncate">${ssrInterpolate(ls.product)}</td><td class="px-5 py-3 text-xs text-slate-500 truncate">${ssrInterpolate(ls.store)}</td><td class="px-5 py-3 text-right font-bold text-red-600">${ssrInterpolate(ls.stock)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ciy6R1_Y.mjs.map
