import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "pending",
  __ssrInlineRender: true,
  setup(__props) {
    const merchants = ref([]);
    const loading = ref(true);
    const page = ref(1);
    const total = ref(0);
    const totalPages = ref(1);
    const actionLoading = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Menunggu Verifikasi</h1><p class="text-sm mt-1 text-slate-500">Tinjau dan setujui pedagang baru sebelum mereka dapat berjualan.</p></div></div><div class="bg-white border border-[var(--wp-border)] rounded-sm shadow-sm overflow-hidden flex flex-col"><div class="p-4 border-b border-[var(--wp-border)] flex justify-between items-center bg-slate-50/50"><h2 class="font-bold text-[var(--wp-navy)] text-sm">Menunggu Persetujuan</h2><button class="text-slate-500 hover:text-[var(--wp-navy)] p-2 rounded-sm transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="overflow-x-auto"><table class="w-full text-left text-sm text-slate-600"><thead class="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-[var(--wp-border)] tracking-wider"><tr><th class="px-5 py-3">Pedagang</th><th class="px-5 py-3">Kategori</th><th class="px-5 py-3">Kontak</th><th class="px-5 py-3">Tanggal Terdaftar</th><th class="px-5 py-3 text-right">Aksi</th></tr></thead><tbody>`);
      if (loading.value) {
        _push(`<tr class="border-b border-[var(--wp-border)]"><td colspan="5" class="px-5 py-12 text-center text-slate-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin mx-auto mb-2"
        }, null, _parent));
        _push(`<p>Memuat pedagang yang tertunda...</p></td></tr>`);
      } else if (merchants.value.length === 0) {
        _push(`<tr class="border-b border-[var(--wp-border)]"><td colspan="5" class="px-5 py-12 text-center text-slate-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-12 h-12 mx-auto mb-3",
          style: { "color": "var(--wp-gold)", "opacity": "0.8" }
        }, null, _parent));
        _push(`<p class="font-bold text-[var(--wp-navy)]">Semua sudah selesai!</p><p class="text-xs mt-1">Tidak ada pedagang yang menunggu verifikasi.</p></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(merchants.value, (m) => {
        _push(`<tr class="border-b border-[var(--wp-border)] hover:bg-slate-50/50 transition-colors"><td class="px-5 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-sm bg-slate-200 shrink-0 overflow-hidden">`);
        if (m.photo_profile) {
          _push(`<img${ssrRenderAttr("src", m.photo_profile)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center text-white font-bold uppercase" style="${ssrRenderStyle({ "background": "var(--wp-navy)" })}">${ssrInterpolate(m.name.charAt(0))}</div>`);
        }
        _push(`</div><div><p class="font-bold text-[var(--wp-navy)]">${ssrInterpolate(m.store_name || m.name)}</p><p class="text-xs text-slate-500">${ssrInterpolate(m.store_name ? m.name : "Tidak Ada Nama Toko")}</p></div></div></td><td class="px-5 py-4 font-medium"><span class="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider" style="${ssrRenderStyle({ "background": "rgba(212,168,67,0.1)", "color": "var(--wp-gold-dark)" })}">${ssrInterpolate(m.category_store || "TANPA KATEGORI")}</span></td><td class="px-5 py-4 text-xs space-y-1"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:envelope",
          class: "w-3 h-3 text-slate-400"
        }, null, _parent));
        _push(` ${ssrInterpolate(m.email)}</div>`);
        if (m.phone_number) {
          _push(`<div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:phone",
            class: "w-3 h-3 text-slate-400"
          }, null, _parent));
          _push(` ${ssrInterpolate(m.phone_number)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="px-5 py-4 whitespace-nowrap text-xs">${ssrInterpolate(new Date(m.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }))}</td><td class="px-5 py-4 text-right"><div class="flex justify-end items-center gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/merchants/${m.uuid}`,
          class: "p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors",
          title: "Lihat Detail"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:eye",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button${ssrIncludeBooleanAttr(actionLoading.value === m.uuid) ? " disabled" : ""} class="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50" title="Tolak">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button${ssrIncludeBooleanAttr(actionLoading.value === m.uuid) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold text-white shadow-sm rounded transition-colors disabled:opacity-50 flex items-center gap-1" style="${ssrRenderStyle({ "background": "var(--wp-navy)" })}">`);
        if (actionLoading.value === m.uuid) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-3 h-3 animate-spin"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:check",
            class: "w-3 h-3"
          }, null, _parent));
        }
        _push(` Setujui </button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="p-4 border-t flex items-center justify-between bg-white"><p class="text-xs text-slate-500"> Menampilkan <span class="font-bold">${ssrInterpolate(merchants.value.length)}</span> dari <span class="font-bold">${ssrInterpolate(total.value)}</span> pedagang tertunda </p><div class="flex gap-2"><button${ssrIncludeBooleanAttr(page.value === 1) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"> Sebelumnya </button><button${ssrIncludeBooleanAttr(page.value >= totalPages.value) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"> Selanjutnya </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merchants/pending.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pending-B9XlR5R7.mjs.map
