import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import { _ as _sfc_main$1 } from './KpiCard-D0K3NN2I.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
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
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "finance",
  __ssrInlineRender: true,
  setup(__props) {
    use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);
    const loading = ref(true);
    const data = ref(null);
    const formatRupiah = (value) => {
      if (!value) return "Rp 0";
      if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)}M`;
      return `Rp ${value.toLocaleString("id-ID")}`;
    };
    const salesOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "axis", formatter: "{b}<br/>{a}: Rp {c}" },
        grid: { left: 50, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "category", boundaryGap: false, data: data.value.charts.salesTrend.dates },
        yAxis: { type: "value", axisLabel: { formatter: (v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v } },
        series: [
          {
            name: "Gross Sales",
            type: "line",
            smooth: true,
            data: data.value.charts.salesTrend.values,
            itemStyle: { color: "#3B82F6" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ offset: 0, color: "#3B82F644" }, { offset: 1, color: "#3B82F600" }]
              }
            }
          }
        ]
      };
    });
    const paymentOption = computed(() => {
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
            data: data.value.charts.paymentMethods.map((pm) => ({
              name: pm.name || "Unknown",
              value: pm.value
            }))
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_KpiCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Financial Analytics</h1><p class="text-sm mt-1 text-slate-500">Deep dive into revenue, margins, and payment methods.</p></div><div class="flex items-center gap-2"><div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm"><button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button><button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button></div><button class="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:document-arrow-down",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Export CSV </button></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">`);
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
        class: "px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap"
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
          title: "Gross Revenue",
          value: formatRupiah(data.value.kpi.grossRevenue),
          icon: "heroicons:banknotes",
          accent: "#3B82F6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Net Revenue (Est.)",
          value: formatRupiah(data.value.kpi.netRevenue),
          icon: "heroicons:currency-dollar",
          accent: "#10B981"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Platform Margin",
          value: formatRupiah(data.value.kpi.margin),
          icon: "heroicons:scale",
          accent: "#F59E0B"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Avg Order Value",
          value: formatRupiah(data.value.kpi.aov),
          icon: "heroicons:shopping-bag",
          accent: "#8B5CF6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Refund Rate",
          value: `${data.value.kpi.refundRate}%`,
          icon: "heroicons:arrow-uturn-left",
          accent: "#EF4444"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white border rounded-2xl p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-slate-800">Daily Sales Trend (Gross)</h2>`);
        if (salesOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: salesOption.value,
            autoresize: "",
            class: "h-80 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border rounded-2xl p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-slate-800">Payment Methods Breakdown</h2>`);
        if (paymentOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: paymentOption.value,
            autoresize: "",
            class: "h-80 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/finance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=finance-BXTmzkvG.mjs.map
