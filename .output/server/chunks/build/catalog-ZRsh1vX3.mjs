import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { _ as _sfc_main$1 } from './KpiCard-D0K3NN2I.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
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
  __name: "catalog",
  __ssrInlineRender: true,
  setup(__props) {
    use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);
    const loading = ref(true);
    const data = ref(null);
    const formatRupiah = (value) => {
      if (!value) return "Rp 0";
      return `Rp ${value.toLocaleString("id-ID")}`;
    };
    const growthOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "axis", formatter: "{b}<br/>{a}: +{c} Products" },
        grid: { left: 40, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "category", boundaryGap: false, data: data.value.charts.catalogGrowth.dates },
        yAxis: { type: "value" },
        series: [
          {
            name: "New Products",
            type: "line",
            smooth: true,
            data: data.value.charts.catalogGrowth.values,
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
    const saturationOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "item", formatter: "{b}: {c} SKUs ({d}%)" },
        legend: { bottom: 0, type: "scroll" },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
            label: { show: false },
            data: data.value.charts.categorySaturation
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_KpiCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Catalog &amp; Ecosystem Insights</h1><p class="text-sm mt-1 text-slate-500">Macro-level analysis of platform products, categories, and stock health.</p></div><div class="flex items-center gap-2"><div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm"><button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button><button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button></div></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics",
        class: "px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 whitespace-nowrap"
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
        class: "px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap"
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
        _push(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-4 gap-4">`);
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Total Platform SKUs",
          value: data.value.kpi.totalSku.toLocaleString("id-ID"),
          icon: "heroicons:cube-transparent",
          accent: "#3B82F6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Active Products",
          value: data.value.kpi.activeSku.toLocaleString("id-ID"),
          icon: "heroicons:check-circle",
          accent: "#10B981"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Stockout Rate",
          value: `${data.value.kpi.stockoutRate.toFixed(1)}%`,
          icon: "heroicons:archive-box-x-mark",
          accent: "#EF4444"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Avg Price Index",
          value: formatRupiah(data.value.kpi.avgPrice),
          icon: "heroicons:tag",
          accent: "#8B5CF6"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Catalog Growth Trend (New Products)</h2>`);
        if (growthOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: growthOption.value,
            autoresize: "",
            class: "h-80 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">Category Saturation</h2>`);
        if (saturationOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: saturationOption.value,
            autoresize: "",
            class: "h-80 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col"><div class="p-5 border-b border-[var(--wp-border)] bg-slate-50/50"><h2 class="text-base font-bold text-[var(--wp-navy)]">Category Performance Matrix</h2></div><div class="overflow-x-auto"><table class="w-full text-left text-sm text-slate-600 table-fixed"><thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider"><tr><th class="px-5 py-3 w-2/5">Category Name</th><th class="px-5 py-3 w-1/5 text-right">Total SKUs</th><th class="px-5 py-3 w-1/5 text-right">Avg Price</th><th class="px-5 py-3 w-1/5 text-right">Units Sold</th></tr></thead><tbody>`);
        if (!data.value.tables.categoryPerformance.length) {
          _push(`<tr><td colspan="4" class="px-5 py-8 text-center text-slate-400">No category data available</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(data.value.tables.categoryPerformance, (cat, i) => {
          _push(`<tr class="border-b border-[var(--wp-border)] last:border-b-0 hover:bg-slate-50 transition-colors"><td class="px-5 py-3 font-bold text-[var(--wp-navy)] truncate">${ssrInterpolate(cat.category)}</td><td class="px-5 py-3 text-right">${ssrInterpolate(cat.totalSku.toLocaleString("id-ID"))}</td><td class="px-5 py-3 text-right">${ssrInterpolate(formatRupiah(cat.avgPrice))}</td><td class="px-5 py-3 text-right font-bold" style="${ssrRenderStyle({ "color": "var(--wp-navy)" })}">${ssrInterpolate(cat.qtySold.toLocaleString("id-ID"))}</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/catalog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=catalog-ZRsh1vX3.mjs.map
