import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "reports",
  __ssrInlineRender: true,
  setup(__props) {
    const merchantExportState = ref("idle");
    const merchantDownloadUrl = ref("");
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Reports Generation</h1><p class="text-sm mt-1 text-slate-500">Generate, download, and schedule automated platform reports.</p></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 border-b">`);
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
        class: "px-4 py-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600 whitespace-nowrap"
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
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-4"><div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-blue-300 transition-colors"><div class="p-3 bg-blue-50 text-blue-600 rounded-xl">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><div class="flex-1"><h3 class="text-lg font-bold text-slate-800">Master Merchant Data (CSV)</h3><p class="text-sm text-slate-500 mt-1 mb-4">Export all registered merchants, verification status, contact info, and total revenue into a spreadsheet. Processed via Celery background worker.</p>`);
      if (merchantExportState.value === "idle") {
        _push(`<div class="flex gap-2"><button class="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:play",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Generate Now </button></div>`);
      } else if (merchantExportState.value === "processing") {
        _push(`<div class="flex items-center gap-3 text-blue-600 font-medium">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-5 h-5 animate-spin"
        }, null, _parent));
        _push(` Processing via Celery Worker... </div>`);
      } else if (merchantExportState.value === "done") {
        _push(`<div class="flex gap-2"><a${ssrRenderAttr("href", merchantDownloadUrl.value)} class="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-down-tray",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Download CSV </a><button class="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200"> Dismiss </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-emerald-300 transition-colors"><div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:banknotes",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><div class="flex-1"><h3 class="text-lg font-bold text-slate-800">Platform Financial Report (PDF)</h3><p class="text-sm text-slate-500 mt-1 mb-4">A complete breakdown of platform revenue, merchant payouts, and net margins for the current month. Ready for accounting.</p><button class="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:document-text",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Generate PDF (Coming Soon) </button></div></div><div class="bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-purple-300 transition-colors"><div class="p-3 bg-purple-50 text-purple-600 rounded-xl">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:sparkles",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><div class="flex-1"><h3 class="text-lg font-bold text-slate-800">AI Quality &amp; Hallucination Log (CSV)</h3><p class="text-sm text-slate-500 mt-1 mb-4">Export all 1-2 star rated AI interactions and failed Copilot workflows for prompt engineering improvements.</p><button class="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:code-bracket",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Export AI Logs (Coming Soon) </button></div></div></div><div class="space-y-6"><div class="bg-white border rounded-2xl p-6 shadow-sm"><h2 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(` Automated Schedules </h2><p class="text-sm text-slate-500 mb-4">These reports are automatically processed by Celery Beat and delivered via Telegram/Email.</p><div class="space-y-3"><div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:document-chart-bar",
        class: "w-5 h-5 text-slate-400"
      }, null, _parent));
      _push(`<div><div class="text-sm font-bold text-slate-800">Daily Platform Summary</div><div class="text-xs text-slate-500">Every 08:00 AM</div></div></div><div class="w-8 h-4 bg-blue-600 rounded-full flex items-center p-0.5"><div class="w-3 h-3 bg-white rounded-full translate-x-4"></div></div></div><div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:exclamation-circle",
        class: "w-5 h-5 text-rose-400"
      }, null, _parent));
      _push(`<div><div class="text-sm font-bold text-slate-800">Global Stockout Alert</div><div class="text-xs text-slate-500">Every 2 Hours</div></div></div><div class="w-8 h-4 bg-blue-600 rounded-full flex items-center p-0.5"><div class="w-3 h-3 bg-white rounded-full translate-x-4"></div></div></div><div class="flex items-center justify-between p-3 border rounded-xl bg-slate-50"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "w-5 h-5 text-slate-400"
      }, null, _parent));
      _push(`<div><div class="text-sm font-bold text-slate-800">Weekly Merchant Churn</div><div class="text-xs text-slate-500">Every Monday</div></div></div><div class="w-8 h-4 bg-slate-200 rounded-full flex items-center p-0.5"><div class="w-3 h-3 bg-white rounded-full"></div></div></div></div><button class="w-full mt-4 py-2 border border-dashed border-slate-300 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 flex justify-center items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Schedule </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reports-BlHzdbCn.mjs.map
