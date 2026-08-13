import __nuxt_component_1 from './index-BMt2yK26.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KpiCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    value: {},
    icon: {},
    accent: {},
    iconColor: {},
    change: {},
    changeLabel: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "bg-white border rounded-2xl p-5 shadow-sm transition hover:shadow-md relative overflow-hidden group",
        style: { "border-color": "var(--wp-border)" }
      }, _attrs))}><div class="absolute top-0 left-4 right-4 h-0.5 rounded-b" style="${ssrRenderStyle({ background: __props.accent })}"></div><div class="flex items-center justify-between mb-3"><span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">${ssrInterpolate(__props.title)}</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.icon,
        class: "w-5 h-5",
        style: { color: __props.iconColor || "var(--wp-gold)" }
      }, null, _parent));
      _push(`</div><p class="text-2xl font-extrabold tracking-tight text-slate-900" style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}">${ssrInterpolate(__props.value)}</p>`);
      if (__props.change !== void 0) {
        _push(`<p class="${ssrRenderClass([__props.change >= 0 ? "text-emerald-500" : "text-rose-500", "text-[11px] font-semibold mt-1.5 flex items-center gap-1"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.change >= 0 ? "heroicons:arrow-trending-up" : "heroicons:arrow-trending-down",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.change >= 0 ? "+" : "")}${ssrInterpolate(__props.change)}% <span class="font-medium ml-0.5 text-slate-400">${ssrInterpolate(__props.changeLabel || "vs last month")}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/KpiCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=KpiCard-D0K3NN2I.mjs.map
