import { _ as __nuxt_component_0 } from './nuxt-link-DFLTiKJE.mjs';
import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@iconify/utils/lib/css/icon';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const STORE_CATEGORIES = [
      "Makanan & Minuman",
      "Toko Retail",
      "Fashion",
      "Kecantikan & Perawatan",
      "Kesehatan",
      "Elektronik & Gadget",
      "Rumah Tangga & Furniture",
      "Pertanian",
      "Peternakan",
      "Perikanan",
      "Otomotif",
      "Konstruksi & Bangunan",
      "Percetakan & Advertising",
      "Jasa Profesional",
      "Jasa Digital",
      "Pendidikan",
      "Pariwisata",
      "Transportasi & Logistik",
      "Kerajinan",
      "Industri & Produksi",
      "Hewan Peliharaan",
      "Laundry & Kebersihan",
      "Marketplace & Online Shop",
      "Lainnya"
    ];
    const form = ref({
      name: "",
      store_name: "",
      email: "",
      phone_number: "",
      category_store: "Makanan & Minuman",
      address: "",
      description: ""
    });
    const saving = ref(false);
    const created = ref(null);
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in pb-10" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/merchants",
        class: "p-2 border rounded-xl hover:bg-slate-50 text-slate-500 transition-colors bg-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-left",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">Tambah Pedagang Baru</h1><p class="text-sm mt-1 text-slate-500">Daftarkan merchant baru secara manual sebagai admin.</p></div></div>`);
      if (created.value) {
        _push(`<div class="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-5 h-5 text-emerald-600"
        }, null, _parent));
        _push(`</div><div><h3 class="text-lg font-bold text-slate-800">Merchant Berhasil Dibuat</h3><p class="text-sm text-slate-500">Bagikan kata sandi sementara ke merchant.</p></div></div><div class="bg-amber-50 border border-amber-200 rounded-xl p-4"><p class="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Penting!</p><p class="text-sm text-amber-800">Simpan kata sandi di bawah ini. Kata sandi <strong>tidak akan ditampilkan lagi</strong> setelah Anda meninggalkan halaman ini.</p></div><div class="space-y-3"><div class="flex items-center justify-between border-b pb-3"><span class="text-sm text-slate-500">Email</span><span class="text-sm font-semibold text-slate-800">${ssrInterpolate(created.value.email)}</span></div><div class="flex items-center justify-between border-b pb-3"><span class="text-sm text-slate-500">Kata Sandi Sementara</span><div class="flex items-center gap-2"><code class="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg tracking-wide">${ssrInterpolate(created.value.temp_password)}</code><button class="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:clipboard",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` ${ssrInterpolate(copied.value ? "Tersalin!" : "Salin")}</button></div></div></div><div class="flex gap-3 pt-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/merchants/${created.value.uuid}`,
          class: "px-5 py-2 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-right",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` Lihat Detail Merchant `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-right",
                  class: "w-4 h-4"
                }),
                createTextVNode(" Lihat Detail Merchant ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/merchants",
          class: "px-5 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kembali ke Daftar `);
            } else {
              return [
                createTextVNode(" Kembali ke Daftar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<form class="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl space-y-5"><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div><label class="block text-xs font-semibold text-slate-500 mb-1">Nama Pemilik <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: Budi Santoso"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Nama Toko <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", form.value.store_name)} type="text" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: Toko Berkah"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Email <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", form.value.email)} type="email" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: budi@example.com"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Telepon <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", form.value.phone_number)} type="tel" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="cth: 081234567890"></div><div class="md:col-span-2"><label class="block text-xs font-semibold text-slate-500 mb-1">Kategori</label><select class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"><!--[-->`);
        ssrRenderList(STORE_CATEGORIES, (cat) => {
          _push(`<option${ssrRenderAttr("value", cat)}${ssrIncludeBooleanAttr(Array.isArray(form.value.category_store) ? ssrLooseContain(form.value.category_store, cat) : ssrLooseEqual(form.value.category_store, cat)) ? " selected" : ""}>${ssrInterpolate(cat)}</option>`);
        });
        _push(`<!--]--></select></div><div class="md:col-span-2"><label class="block text-xs font-semibold text-slate-500 mb-1">Alamat <span class="text-red-500">*</span></label><textarea rows="2" required class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Alamat lengkap toko">${ssrInterpolate(form.value.address)}</textarea></div><div class="md:col-span-2"><label class="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label><textarea rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Deskripsi singkat toko (opsional)">${ssrInterpolate(form.value.description)}</textarea></div></div><div class="flex items-center gap-3 pt-2"><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-5 py-2 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2">`);
        if (saving.value) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-4 h-4 animate-spin"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(saving.value ? "Membuat..." : "Buat Merchant")}</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/merchants",
          class: "px-5 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Batal `);
            } else {
              return [
                createTextVNode(" Batal ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merchants/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-D1V2V2bY.mjs.map
