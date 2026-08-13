import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import __nuxt_component_1 from "./index-BMt2yK26.js";
import { _ as _sfc_main$1 } from "./KpiCard-D0K3NN2I.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "vue-router";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "merchants",
  __ssrInlineRender: true,
  setup(__props) {
    use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);
    const loading = ref(true);
    const data = ref(null);
    const formatRupiah = (value) => {
      if (!value) return "Rp 0";
      if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)}M`;
      return `Rp ${value.toLocaleString("id-ID")}`;
    };
    const acqOption = computed(() => {
      if (!data.value) return null;
      return {
        tooltip: { trigger: "axis", formatter: "{b}<br/>{a}: {c} Merchants" },
        grid: { left: 40, right: 20, top: 20, bottom: 20 },
        xAxis: { type: "category", data: data.value.charts.acquisitionTrend.dates },
        yAxis: { type: "value" },
        series: [
          {
            name: "New Registrations",
            type: "bar",
            data: data.value.charts.acquisitionTrend.values,
            itemStyle: { color: "#3B82F6", borderRadius: [4, 4, 0, 0] }
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_KpiCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Merchants Performance</h1><p class="text-sm mt-1 text-slate-500">Track acquisition, churn, and top performing sellers.</p></div><div class="flex items-center gap-2"><div class="flex items-center gap-2 bg-white border p-1 rounded-xl shadow-sm"><button class="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg">30 Days</button><button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">90 Days</button></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants/map",
        class: "px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:map",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` View Live Map `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:map",
                class: "w-4 h-4"
              }),
              createTextVNode(" View Live Map ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">`);
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
        class: "px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap"
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
        _push(`<!--[--><div class="grid grid-cols-2 lg:grid-cols-4 gap-4">`);
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Total Merchants",
          value: data.value.kpi.totalMerchants.toLocaleString("id-ID"),
          icon: "heroicons:building-storefront",
          accent: "#3B82F6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "New Merchants (30d)",
          value: `+${data.value.kpi.newMerchants.toLocaleString("id-ID")}`,
          icon: "heroicons:user-plus",
          accent: "#10B981"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Active Ratio",
          value: `${data.value.kpi.activeRatio}%`,
          icon: "heroicons:check-badge",
          accent: "#8B5CF6"
        }, null, _parent));
        _push(ssrRenderComponent(_component_KpiCard, {
          title: "Churn Rate",
          value: `${data.value.kpi.churnRate}%`,
          icon: "heroicons:exclamation-triangle",
          accent: "#EF4444"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-1 xl:grid-cols-3 gap-6"><div class="xl:col-span-2 bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm"><h2 class="text-base font-bold mb-4 text-[var(--wp-navy)]">New Merchant Acquisition Trend</h2>`);
        if (acqOption.value) {
          _push(ssrRenderComponent(unref(VChart), {
            option: acqOption.value,
            autoresize: "",
            class: "h-80 w-full"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white border border-[var(--wp-border)] rounded-sm p-6 shadow-sm flex flex-col items-center justify-center text-center"><div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" style="${ssrRenderStyle({ "background": "rgba(212,168,67,0.1)", "color": "var(--wp-gold-dark)" })}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:map-pin",
          class: "w-8 h-8"
        }, null, _parent));
        _push(`</div><h3 class="font-bold text-lg text-[var(--wp-navy)] mb-2">Geographic Distribution</h3><p class="text-sm text-slate-500 mb-6">Explore where your merchants are located around the globe to plan hyper-local campaigns.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/merchants/map",
          class: "px-6 py-3 text-white font-bold rounded-sm shadow-sm transition-transform hover:scale-105",
          style: { "background": "linear-gradient(135deg, var(--wp-navy), #0f172a)" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Explore Full Map `);
            } else {
              return [
                createTextVNode(" Explore Full Map ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col"><div class="p-5 border-b border-[var(--wp-border)] bg-slate-50/50 flex items-center justify-between"><h2 class="text-base font-bold text-[var(--wp-navy)]">Top Performing Merchants</h2></div><div class="overflow-x-auto"><table class="w-full text-left text-sm text-slate-600"><thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider"><tr><th class="px-5 py-4">Rank</th><th class="px-5 py-4">Store Name</th><th class="px-5 py-4 text-center">Status</th><th class="px-5 py-4 text-right">Total Orders</th><th class="px-5 py-4 text-right">Revenue</th><th class="px-5 py-4 text-right">Growth</th></tr></thead><tbody>`);
        if (!data.value.tables.leaderboard.length) {
          _push(`<tr><td colspan="6" class="px-5 py-10 text-center text-slate-400">No merchant data available</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(data.value.tables.leaderboard, (m, i) => {
          _push(`<tr class="border-b border-[var(--wp-border)] last:border-b-0 hover:bg-slate-50 transition-colors"><td class="${ssrRenderClass([{
            "text-[var(--wp-gold)]": i === 0,
            "text-slate-400": i === 1,
            "text-amber-700": i === 2,
            "text-slate-500": i > 2
          }, "px-5 py-4 font-bold"])}">#${ssrInterpolate(i + 1)}</td><td class="px-5 py-4 font-medium text-[var(--wp-navy)]">${ssrInterpolate(m.store_name)}</td><td class="px-5 py-4 text-center">`);
          if (m.verified) {
            _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold" style="${ssrRenderStyle({ "background": "rgba(212,168,67,0.1)", "color": "var(--wp-gold-dark)" })}">VERIFIED</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">PENDING</span>`);
          }
          _push(`</td><td class="px-5 py-4 text-right">${ssrInterpolate(m.orders.toLocaleString("id-ID"))}</td><td class="px-5 py-4 text-right font-bold text-[var(--wp-navy)]">${ssrInterpolate(formatRupiah(m.revenue))}</td><td class="px-5 py-4 text-right text-emerald-600 text-xs font-bold">+${ssrInterpolate(m.growth)}%</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/merchants.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=merchants-D_Cmfa4P.js.map
