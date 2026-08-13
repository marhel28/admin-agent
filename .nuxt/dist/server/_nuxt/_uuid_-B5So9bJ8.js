import { _ as __nuxt_component_0 } from "./nuxt-link-DFLTiKJE.js";
import __nuxt_component_1 from "./index-BMt2yK26.js";
import { defineComponent, ref, watch, mergeProps, useSSRContext, withCtx, createVNode, createTextVNode, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import maplibregl from "maplibre-gl";
/* empty css                     */
import "E:/lombas/frontend/admin-dashboard/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "E:/lombas/frontend/admin-dashboard/node_modules/hookable/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/unctx/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/h3/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/defu/dist/defu.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "E:/lombas/frontend/admin-dashboard/node_modules/klona/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "E:/lombas/frontend/admin-dashboard/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MerchantLocationEdit",
  __ssrInlineRender: true,
  props: {
    merchant: {}
  },
  emits: ["close", "saved"],
  setup(__props, { emit: __emit }) {
    const form = ref({
      address: "",
      latitude: null,
      longitude: null
    });
    const saving = ref(false);
    const mapLoading = ref(true);
    ref(null);
    watch([() => form.value.latitude, () => form.value.longitude], ([lat, lng]) => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" }, _attrs))}><div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"><div class="px-6 py-4 border-b bg-slate-50 flex items-center justify-between"><h3 class="text-base font-bold text-slate-800">Edit Lokasi Merchant</h3><button class="p-1 rounded-lg hover:bg-slate-200 text-slate-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="p-6 space-y-4"><p class="text-sm text-slate-500"> Atur lokasi untuk <strong>${ssrInterpolate(__props.merchant.store_name || __props.merchant.name)}</strong>. Klik pada peta untuk menentukan koordinat, atau masukkan manual. </p><div><label class="block text-xs font-bold text-slate-600 mb-1">Alamat</label><textarea rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" placeholder="Masukkan alamat lengkap...">${ssrInterpolate(form.value.address)}</textarea></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-bold text-slate-600 mb-1">Latitude</label><input${ssrRenderAttr("value", form.value.latitude)} type="number" step="any" min="-90" max="90" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="-6.2088"></div><div><label class="block text-xs font-bold text-slate-600 mb-1">Longitude</label><input${ssrRenderAttr("value", form.value.longitude)} type="number" step="any" min="-180" max="180" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="106.8456"></div></div><div class="rounded-xl overflow-hidden border h-[200px] relative"><div class="w-full h-full"></div>`);
      if (mapLoading.value) {
        _push(`<div class="absolute inset-0 bg-white/80 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-5 h-5 animate-spin text-blue-500"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-[11px] text-slate-400 text-center"> Klik pada peta untuk mengatur koordinat. Geser untuk menggeser marker. </p></div><div class="px-6 py-4 border-t bg-slate-50 flex gap-3 justify-end"><button class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50"> Reset </button><button class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50"> Batal </button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">`);
      if (saving.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-4 h-4 animate-spin"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(saving.value ? "Menyimpan..." : "Simpan")}</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MerchantLocationEdit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[uuid]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    route.params.uuid;
    const merchant = ref(null);
    const loading = ref(true);
    const wallet = ref({ balance: 0, total_earned: 0, total_withdrawn: 0, transactions: [] });
    const walletLoading = ref(false);
    const showLocationEdit = ref(false);
    const deletingLocation = ref(false);
    const editing = ref(false);
    const saving = ref(false);
    const editForm = ref({
      name: "",
      store_name: "",
      phone_number: "",
      category_store: "",
      store_type: "",
      address: "",
      description: ""
    });
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
    const STORE_TYPES = [
      "Warung Kecil",
      "Toko Kelontong",
      "Distributor",
      "Toko Online",
      "Grosir"
    ];
    const showDeleteConfirm = ref(false);
    const deleting = ref(false);
    const mapContainer = ref(null);
    let map = null;
    const formatRupiah = (value) => {
      return new Intl.NumberFormat("id-ID").format(value || 0);
    };
    const onLocationSaved = (updated) => {
      showLocationEdit.value = false;
      if (merchant.value) {
        merchant.value.latitude = updated.latitude;
        merchant.value.longitude = updated.longitude;
        merchant.value.address = updated.address;
      }
      if (merchant.value?.latitude && merchant.value?.longitude) {
        nextTick(() => {
          initMap(merchant.value.latitude, merchant.value.longitude);
        });
      }
    };
    const initMap = (lat, lng) => {
      if (!mapContainer.value) return;
      if (map) {
        map.remove();
        map = null;
      }
      map = new maplibregl.Map({
        container: mapContainer.value,
        style: {
          version: 8,
          sources: {
            "osm-tiles": {
              type: "raster",
              tiles: [
                "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              ],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap"
            }
          },
          layers: [
            {
              id: "osm-tiles-layer",
              type: "raster",
              source: "osm-tiles",
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: [lng, lat],
        zoom: 15
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      const el = (void 0).createElement("div");
      el.className = "w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md";
      new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
      map.on("load", () => {
        map.resize();
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      if (!loading.value && merchant.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 animate-fade-in" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
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
        _push(`<div><h1 class="text-2xl font-extrabold tracking-tight text-slate-800">${ssrInterpolate(merchant.value.store_name || merchant.value.name)}</h1><p class="text-sm mt-1 text-slate-500">Detail &amp; Analitik Pedagang</p></div></div><div class="flex gap-2"><button class="px-4 py-2 text-xs font-bold rounded-xl border bg-white text-red-600 border-red-100 hover:bg-red-50 transition-colors shadow-sm flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` Hapus </button></div></div>`);
        if (showDeleteConfirm.value) {
          _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"><div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 space-y-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:exclamation-triangle",
            class: "w-5 h-5 text-red-600"
          }, null, _parent));
          _push(`</div><h3 class="text-lg font-bold text-slate-800">Nonaktifkan Merchant?</h3></div><p class="text-sm text-slate-600"> Apakah Anda yakin ingin menonaktifkan <strong>${ssrInterpolate(merchant.value.store_name || merchant.value.name)}</strong>? Merchant tidak akan bisa login lagi, tetapi data (stok, transaksi, wallet) tetap tersimpan. </p><div class="flex gap-3 justify-end pt-2"><button class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50"> Batal </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">`);
          if (deleting.value) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-path",
              class: "w-4 h-4 animate-spin"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(deleting.value ? "Menonaktifkan..." : "Ya, Nonaktifkan")}</button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1 space-y-6"><div class="bg-white border rounded-2xl p-6 shadow-sm text-center relative">`);
        if (!editing.value) {
          _push(`<button class="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:pencil-square",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(` Edit </button>`);
        } else {
          _push(`<!---->`);
        }
        if (!editing.value) {
          _push(`<div><div class="w-24 h-24 mx-auto rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden mb-4">`);
          if (merchant.value.photo_profile) {
            _push(`<img${ssrRenderAttr("src", merchant.value.photo_profile)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-3xl">${ssrInterpolate(merchant.value.name.charAt(0))}</div>`);
          }
          _push(`</div><h2 class="text-lg font-bold text-slate-800">${ssrInterpolate(merchant.value.store_name || merchant.value.name)}</h2><p class="text-sm text-slate-500 mb-4">${ssrInterpolate(merchant.value.name)}</p><div class="flex flex-wrap justify-center gap-1.5 mb-6"><span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">${ssrInterpolate(merchant.value.category_store || "Tanpa Kategori")}</span>`);
          if (merchant.value.store_type) {
            _push(`<span class="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-100">${ssrInterpolate(merchant.value.store_type)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="space-y-3 text-left border-t pt-4"><div class="flex items-center gap-3 text-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:envelope",
            class: "w-4 h-4 text-slate-400"
          }, null, _parent));
          _push(`<span class="text-slate-700">${ssrInterpolate(merchant.value.email)}</span></div><div class="flex items-center gap-3 text-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:phone",
            class: "w-4 h-4 text-slate-400"
          }, null, _parent));
          _push(`<span class="text-slate-700">${ssrInterpolate(merchant.value.phone_number || "-")}</span></div><div class="flex items-center gap-3 text-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:calendar",
            class: "w-4 h-4 text-slate-400"
          }, null, _parent));
          _push(`<span class="text-slate-700">Bergabung ${ssrInterpolate(new Date(merchant.value.created_at).toLocaleDateString())}</span></div></div></div>`);
        } else {
          _push(`<div class="text-left"><h2 class="text-lg font-bold text-slate-800 mb-4 text-center">Edit Data Pedagang</h2><div class="space-y-3"><div><label class="block text-xs font-semibold text-slate-500 mb-1">Nama Pemilik</label><input${ssrRenderAttr("value", editForm.value.name)} type="text" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Nama Toko</label><input${ssrRenderAttr("value", editForm.value.store_name)} type="text" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Telepon</label><input${ssrRenderAttr("value", editForm.value.phone_number)} type="tel" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Kategori Usaha</label><select class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"><!--[-->`);
          ssrRenderList(STORE_CATEGORIES, (cat) => {
            _push(`<option${ssrRenderAttr("value", cat)}${ssrIncludeBooleanAttr(Array.isArray(editForm.value.category_store) ? ssrLooseContain(editForm.value.category_store, cat) : ssrLooseEqual(editForm.value.category_store, cat)) ? " selected" : ""}>${ssrInterpolate(cat)}</option>`);
          });
          _push(`<!--]--></select></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Tipe Toko / Jenis Usaha</label><select class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"><!--[-->`);
          ssrRenderList(STORE_TYPES, (st) => {
            _push(`<option${ssrRenderAttr("value", st)}${ssrIncludeBooleanAttr(Array.isArray(editForm.value.store_type) ? ssrLooseContain(editForm.value.store_type, st) : ssrLooseEqual(editForm.value.store_type, st)) ? " selected" : ""}>${ssrInterpolate(st)}</option>`);
          });
          _push(`<!--]--></select></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Alamat</label><textarea rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">${ssrInterpolate(editForm.value.address)}</textarea></div><div><label class="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label><textarea rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200">${ssrInterpolate(editForm.value.description)}</textarea></div></div><div class="flex gap-2 mt-4"><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="flex-1 px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">`);
          if (saving.value) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-path",
              class: "w-4 h-4 animate-spin"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(saving.value ? "Menyimpan..." : "Simpan")}</button><button class="px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 hover:bg-slate-50"> Batal </button></div></div>`);
        }
        _push(`</div>`);
        if (merchant.value.description) {
          _push(`<div class="bg-white border rounded-2xl p-6 shadow-sm"><h3 class="text-sm font-bold mb-2">Tentang Toko</h3><p class="text-sm text-slate-600 leading-relaxed">${ssrInterpolate(merchant.value.description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-2 space-y-6"><div class="bg-white border rounded-2xl p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:wallet",
          class: "w-5 h-5 text-emerald-500"
        }, null, _parent));
        _push(` Dompet Merchant </h3><button class="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: ["w-3.5 h-3.5", { "animate-spin": walletLoading.value }]
        }, null, _parent));
        _push(` Refresh </button></div><div class="grid grid-cols-3 gap-4 mb-4"><div class="bg-emerald-50 rounded-xl p-4 text-center"><p class="text-xs text-emerald-600 font-semibold mb-1">Saldo</p><p class="text-lg font-black text-emerald-700">Rp ${ssrInterpolate(formatRupiah(wallet.value.balance || 0))}</p></div><div class="bg-blue-50 rounded-xl p-4 text-center"><p class="text-xs text-blue-600 font-semibold mb-1">Total Pendapatan</p><p class="text-lg font-black text-blue-700">Rp ${ssrInterpolate(formatRupiah(wallet.value.total_earned || 0))}</p></div><div class="bg-orange-50 rounded-xl p-4 text-center"><p class="text-xs text-orange-600 font-semibold mb-1">Total Ditarik</p><p class="text-lg font-black text-orange-700">Rp ${ssrInterpolate(formatRupiah(wallet.value.total_withdrawn || 0))}</p></div></div>`);
        if (wallet.value.transactions && wallet.value.transactions.length > 0) {
          _push(`<div><h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transaksi Terakhir</h4><div class="space-y-2 max-h-40 overflow-y-auto"><!--[-->`);
          ssrRenderList(wallet.value.transactions, (txn, i) => {
            _push(`<div class="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"><div class="flex items-center gap-2"><div class="${ssrRenderClass([txn.type === "CREDIT" ? "bg-emerald-100" : "bg-red-100", "w-7 h-7 rounded-full flex items-center justify-center"])}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: txn.type === "CREDIT" ? "heroicons:arrow-down" : "heroicons:arrow-up",
              class: ["w-3.5 h-3.5", txn.type === "CREDIT" ? "text-emerald-600" : "text-red-600"]
            }, null, _parent));
            _push(`</div><div><p class="text-xs font-semibold text-slate-700">${ssrInterpolate(txn.description || txn.type)}</p><p class="text-[10px] text-slate-400">${ssrInterpolate(new Date(txn.created_at).toLocaleDateString())}</p></div></div><span class="${ssrRenderClass([txn.type === "CREDIT" ? "text-emerald-600" : "text-red-600", "text-xs font-bold"])}">${ssrInterpolate(txn.type === "CREDIT" ? "+" : "-")}Rp ${ssrInterpolate(formatRupiah(txn.amount))}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<div class="text-center py-4 text-sm text-slate-400"> Belum ada transaksi wallet. </div>`);
        }
        _push(`</div><div class="bg-white border rounded-2xl p-6 shadow-sm flex flex-col h-[450px]"><div class="flex items-center justify-between mb-4"><div><h3 class="text-base font-bold mb-1">Lokasi Toko</h3><p class="text-sm text-slate-500">${ssrInterpolate(merchant.value.address || "Tidak ada alamat")}</p></div><div class="flex items-center gap-2">`);
        if (merchant.value.latitude && merchant.value.longitude) {
          _push(`<button${ssrIncludeBooleanAttr(deletingLocation.value) ? " disabled" : ""} class="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(` Hapus Lokasi </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil-square",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` Edit Lokasi </button></div></div><div class="flex-1 rounded-xl overflow-hidden border bg-slate-50 relative">`);
        if (merchant.value.latitude && merchant.value.longitude) {
          _push(`<div class="w-full h-full"></div>`);
        } else {
          _push(`<div class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:map-pin",
            class: "w-8 h-8 mb-2 opacity-50"
          }, null, _parent));
          _push(`<p class="text-sm">Lokasi belum disematkan</p><button class="mt-2 text-xs text-blue-600 hover:underline font-semibold"> Tambah Lokasi </button></div>`);
        }
        _push(`</div></div></div></div>`);
        if (showLocationEdit.value) {
          _push(ssrRenderComponent(_sfc_main$1, {
            merchant: merchant.value,
            onClose: ($event) => showLocationEdit.value = false,
            onSaved: onLocationSaved
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-[50vh]" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 animate-spin text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-20" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-circle",
          class: "w-12 h-12 text-slate-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<h2 class="text-xl font-bold text-slate-700">Pedagang tidak ditemukan</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/merchants",
          class: "mt-4 inline-block text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Kembali ke Daftar Pedagang`);
            } else {
              return [
                createTextVNode("Kembali ke Daftar Pedagang")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/merchants/[uuid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_uuid_-B5So9bJ8.js.map
