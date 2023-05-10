import { watch as ce, ref as c, provide as G, inject as h, h as E, onUnmounted as ne, onBeforeUnmount as W, defineComponent as g, onMounted as O, markRaw as C, nextTick as f, render as Je, reactive as Ke, computed as Y } from "vue";
const de = (t, o) => {
  for (const e of Object.keys(o))
    t.on(e, o[e]);
}, me = (t) => {
  for (const o of Object.keys(t)) {
    const e = t[o];
    e && D(e.cancel) && e.cancel();
  }
}, Qe = (t) => !t || typeof t.charAt != "function" ? t : t.charAt(0).toUpperCase() + t.slice(1), D = (t) => typeof t == "function", S = (t, o, e) => {
  for (const n in e) {
    const a = "set" + Qe(n);
    t[a] ? ce(
      () => e[n],
      (s, l) => {
        t[a](s, l);
      }
    ) : o[a] && ce(
      () => e[n],
      (s) => {
        o[a](s);
      }
    );
  }
}, L = (t, o, e = {}) => {
  const n = { ...e };
  for (const a in t) {
    const s = o[a], l = t[a];
    s && (s && s.custom === !0 || l !== void 0 && (n[a] = l));
  }
  return n;
}, T = (t) => {
  const o = {};
  for (const e in t)
    if (e.startsWith("on") && !e.startsWith("onUpdate") && e !== "onReady") {
      const n = e.slice(2).toLocaleLowerCase();
      o[n] = t[e];
    }
  return o;
}, Xe = async (t) => {
  const o = await Promise.all([
    import("leaflet/dist/images/marker-icon-2x.png"),
    import("leaflet/dist/images/marker-icon.png"),
    import("leaflet/dist/images/marker-shadow.png")
  ]);
  delete t.Default.prototype._getIconUrl, t.Default.mergeOptions({
    iconRetinaUrl: o[0].default,
    iconUrl: o[1].default,
    shadowUrl: o[2].default
  });
}, V = (t) => {
  const o = c(
    (...n) => console.warn(`Method ${t} has been invoked without being replaced`)
  ), e = (...n) => o.value(...n);
  return e.wrapped = o, G(t, e), e;
}, x = (t, o) => t.wrapped.value = o, b = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || globalThis, m = (t) => {
  const o = h(t);
  if (o === void 0)
    throw new Error(
      `Attempt to inject ${t.description} before it was provided.`
    );
  return o;
}, j = Symbol(
  "useGlobalLeaflet"
), I = Symbol("addLayer"), ee = Symbol("removeLayer"), q = Symbol(
  "registerControl"
), ve = Symbol(
  "registerLayerControl"
), be = Symbol(
  "canSetParentHtml"
), fe = Symbol("setParentHtml"), Le = Symbol("setIcon"), he = Symbol("bindPopup"), ge = Symbol("bindTooltip"), Oe = Symbol("unbindPopup"), Se = Symbol("unbindTooltip"), J = {
  options: {
    type: Object,
    default: () => ({}),
    custom: !0
  }
}, K = (t) => ({ options: t.options, methods: {} }), F = {
  ...J,
  pane: {
    type: String
  },
  attribution: {
    type: String
  },
  name: {
    type: String,
    custom: !0
  },
  layerType: {
    type: String,
    custom: !0
  },
  visible: {
    type: Boolean,
    custom: !0,
    default: !0
  }
}, Q = (t, o, e) => {
  const n = m(I), a = m(ee), { options: s, methods: l } = K(t), r = L(
    t,
    F,
    s
  ), i = () => n({ leafletObject: o.value }), u = () => a({ leafletObject: o.value }), d = {
    ...l,
    setAttribution(y) {
      u(), o.value.options.attribution = y, t.visible && i();
    },
    setName() {
      u(), t.visible && i();
    },
    setLayerType() {
      u(), t.visible && i();
    },
    setVisible(y) {
      o.value && (y ? i() : u());
    },
    bindPopup(y) {
      if (!o.value || !D(o.value.bindPopup)) {
        console.warn(
          "Attempt to bind popup before bindPopup method available on layer."
        );
        return;
      }
      o.value.bindPopup(y);
    },
    bindTooltip(y) {
      if (!o.value || !D(o.value.bindTooltip)) {
        console.warn(
          "Attempt to bind tooltip before bindTooltip method available on layer."
        );
        return;
      }
      o.value.bindTooltip(y);
    },
    unbindTooltip() {
      o.value && (D(o.value.closeTooltip) && o.value.closeTooltip(), D(o.value.unbindTooltip) && o.value.unbindTooltip());
    },
    unbindPopup() {
      o.value && (D(o.value.closePopup) && o.value.closePopup(), D(o.value.unbindPopup) && o.value.unbindPopup());
    },
    updateVisibleProp(y) {
      e.emit("update:visible", y);
    }
  };
  return G(he, d.bindPopup), G(ge, d.bindTooltip), G(Oe, d.unbindPopup), G(Se, d.unbindTooltip), ne(() => {
    d.unbindPopup(), d.unbindTooltip(), u();
  }), { options: r, methods: d };
}, N = (t, o) => {
  if (t && o.default)
    return E("div", { style: { display: "none" } }, o.default());
}, je = {
  ...F,
  interactive: {
    type: Boolean,
    default: void 0
  },
  bubblingMouseEvents: {
    type: Boolean,
    default: void 0
  }
}, Ye = (t, o, e) => {
  const { options: n, methods: a } = Q(
    t,
    o,
    e
  );
  return { options: L(
    t,
    je,
    n
  ), methods: a };
}, se = {
  ...je,
  stroke: {
    type: Boolean,
    default: void 0
  },
  color: {
    type: String
  },
  weight: {
    type: Number
  },
  opacity: {
    type: Number
  },
  lineCap: {
    type: String
  },
  lineJoin: {
    type: String
  },
  dashArray: {
    type: String
  },
  dashOffset: {
    type: String
  },
  fill: {
    type: Boolean,
    default: void 0
  },
  fillColor: {
    type: String
  },
  fillOpacity: {
    type: Number
  },
  fillRule: {
    type: String
  },
  className: {
    type: String
  }
}, Ce = (t, o, e) => {
  const { options: n, methods: a } = Ye(t, o, e), s = L(
    t,
    se,
    n
  ), l = m(ee), r = {
    ...a,
    setStroke(i) {
      o.value.setStyle({ stroke: i });
    },
    setColor(i) {
      o.value.setStyle({ color: i });
    },
    setWeight(i) {
      o.value.setStyle({ weight: i });
    },
    setOpacity(i) {
      o.value.setStyle({ opacity: i });
    },
    setLineCap(i) {
      o.value.setStyle({ lineCap: i });
    },
    setLineJoin(i) {
      o.value.setStyle({ lineJoin: i });
    },
    setDashArray(i) {
      o.value.setStyle({ dashArray: i });
    },
    setDashOffset(i) {
      o.value.setStyle({ dashOffset: i });
    },
    setFill(i) {
      o.value.setStyle({ fill: i });
    },
    setFillColor(i) {
      o.value.setStyle({ fillColor: i });
    },
    setFillOpacity(i) {
      o.value.setStyle({ fillOpacity: i });
    },
    setFillRule(i) {
      o.value.setStyle({ fillRule: i });
    },
    setClassName(i) {
      o.value.setStyle({ className: i });
    }
  };
  return W(() => {
    l({ leafletObject: o.value });
  }), { options: s, methods: r };
}, ae = {
  ...se,
  /**
   * Radius of the marker in pixels.
   */
  radius: {
    type: Number
  },
  latLng: {
    type: [Object, Array],
    required: !0,
    custom: !0
  }
}, Pe = (t, o, e) => {
  const { options: n, methods: a } = Ce(
    t,
    o,
    e
  ), s = L(
    t,
    ae,
    n
  ), l = {
    ...a,
    setRadius(r) {
      o.value.setRadius(r);
    },
    setLatLng(r) {
      o.value.setLatLng(r);
    }
  };
  return { options: s, methods: l };
}, Be = {
  ...ae,
  /**
   * Radius of the circle in meters.
   */
  radius: {
    type: Number
  }
}, Ve = (t, o, e) => {
  const { options: n, methods: a } = Pe(t, o, e), s = L(
    t,
    Be,
    n
  ), l = {
    ...a
  };
  return { options: s, methods: l };
}, gt = g({
  name: "LCircle",
  props: Be,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = Ve(t, e, o);
    return O(async () => {
      const { circle: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(i(t.latLng, l));
      const u = T(o.attrs);
      e.value.on(u), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), Ot = g({
  name: "LCircleMarker",
  props: ae,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = Pe(
      t,
      e,
      o
    );
    return O(async () => {
      const { circleMarker: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        i(t.latLng, l)
      );
      const u = T(o.attrs);
      e.value.on(u), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), H = {
  ...J,
  position: {
    type: String
  }
}, X = (t, o) => {
  const { options: e, methods: n } = K(t), a = L(
    t,
    H,
    e
  ), s = {
    ...n,
    setPosition(l) {
      o.value && o.value.setPosition(l);
    }
  };
  return ne(() => {
    o.value && o.value.remove();
  }), { options: a, methods: s };
}, xe = (t) => t.default ? E("div", { ref: "root" }, t.default()) : null, St = g({
  name: "LControl",
  props: {
    ...H,
    disableClickPropagation: {
      type: Boolean,
      custom: !0,
      default: !0
    },
    disableScrollPropagation: {
      type: Boolean,
      custom: !0,
      default: !1
    }
  },
  setup(t, o) {
    const e = c(), n = c(), a = h(j), s = m(q), { options: l, methods: r } = X(t, e);
    return O(async () => {
      const { Control: i, DomEvent: u } = a ? b.L : await import("leaflet/dist/leaflet-src.esm"), d = i.extend({
        onAdd() {
          return n.value;
        }
      });
      e.value = C(new d(l)), S(r, e.value, t), s({ leafletObject: e.value }), t.disableClickPropagation && n.value && u.disableClickPropagation(n.value), t.disableScrollPropagation && n.value && u.disableScrollPropagation(n.value), f(() => o.emit("ready", e.value));
    }), { root: n, leafletObject: e };
  },
  render() {
    return xe(this.$slots);
  }
}), Te = {
  ...H,
  prefix: {
    type: String
  }
}, Re = (t, o) => {
  const { options: e, methods: n } = X(
    t,
    o
  ), a = L(
    t,
    Te,
    e
  ), s = {
    ...n,
    setPrefix(l) {
      o.value.setPrefix(l);
    }
  };
  return { options: a, methods: s };
}, jt = g({
  name: "LControlAttribution",
  props: Te,
  setup(t, o) {
    const e = c(), n = h(j), a = m(q), { options: s, methods: l } = Re(t, e);
    return O(async () => {
      const { control: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        r.attribution(s)
      ), S(l, e.value, t), a({ leafletObject: e.value }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
}), we = {
  ...H,
  collapsed: {
    type: Boolean,
    default: void 0
  },
  autoZIndex: {
    type: Boolean,
    default: void 0
  },
  hideSingleBase: {
    type: Boolean,
    default: void 0
  },
  sortLayers: {
    type: Boolean,
    default: void 0
  },
  sortFunction: {
    type: Function
  }
}, et = (t, o) => {
  const { options: e } = X(t, o);
  return { options: L(
    t,
    we,
    e
  ), methods: {
    addLayer(s) {
      s.layerType === "base" ? o.value.addBaseLayer(s.leafletObject, s.name) : s.layerType === "overlay" && o.value.addOverlay(s.leafletObject, s.name);
    },
    removeLayer(s) {
      o.value.removeLayer(s.leafletObject);
    }
  } };
}, Ct = g({
  name: "LControlLayers",
  props: we,
  setup(t, o) {
    const e = c(), n = h(j), a = m(ve), { options: s, methods: l } = et(t, e);
    return O(async () => {
      const { control: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        r.layers(void 0, void 0, s)
      ), S(l, e.value, t), a({
        ...t,
        ...l,
        leafletObject: e.value
      }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
}), Ie = {
  ...H,
  maxWidth: {
    type: Number
  },
  metric: {
    type: Boolean,
    default: void 0
  },
  imperial: {
    type: Boolean,
    default: void 0
  },
  updateWhenIdle: {
    type: Boolean,
    default: void 0
  }
}, tt = (t, o) => {
  const { options: e, methods: n } = X(
    t,
    o
  );
  return { options: L(
    t,
    Ie,
    e
  ), methods: n };
}, Pt = g({
  name: "LControlScale",
  props: Ie,
  setup(t, o) {
    const e = c(), n = h(j), a = m(q), { options: s, methods: l } = tt(t, e);
    return O(async () => {
      const { control: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(r.scale(s)), S(l, e.value, t), a({ leafletObject: e.value }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
}), Ae = {
  ...H,
  zoomInText: {
    type: String
  },
  zoomInTitle: {
    type: String
  },
  zoomOutText: {
    type: String
  },
  zoomOutTitle: {
    type: String
  }
}, ot = (t, o) => {
  const { options: e, methods: n } = X(
    t,
    o
  );
  return { options: L(
    t,
    Ae,
    e
  ), methods: n };
}, Bt = g({
  name: "LControlZoom",
  props: Ae,
  setup(t, o) {
    const e = c(), n = h(j), a = m(q), { options: s, methods: l } = ot(t, e);
    return O(async () => {
      const { control: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(r.zoom(s)), S(l, e.value, t), a({ leafletObject: e.value }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
}), te = {
  ...F
}, re = (t, o, e) => {
  const { options: n, methods: a } = Q(
    t,
    o,
    e
  ), s = L(
    t,
    te,
    n
  ), l = {
    ...a,
    addLayer(r) {
      o.value.addLayer(r.leafletObject);
    },
    removeLayer(r) {
      o.value.removeLayer(r.leafletObject);
    }
  };
  return G(I, l.addLayer), G(ee, l.removeLayer), { options: s, methods: l };
}, _e = {
  ...te
}, nt = (t, o, e) => {
  const { options: n, methods: a } = re(
    t,
    o,
    e
  ), s = L(
    t,
    _e,
    n
  ), l = {
    ...a
  };
  return { options: s, methods: l };
}, Tt = g({
  props: _e,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { methods: l, options: r } = nt(
      t,
      e,
      o
    );
    return O(async () => {
      const { featureGroup: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        i(void 0, r)
      );
      const u = T(o.attrs);
      e.value.on(u), S(l, e.value, t), s({
        ...t,
        ...l,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), Ge = {
  ...te,
  geojson: {
    type: [Object, Array],
    custom: !0
  },
  optionsStyle: {
    type: Function,
    custom: !0
  }
}, st = (t, o, e) => {
  const { options: n, methods: a } = re(
    t,
    o,
    e
  ), s = L(
    t,
    Ge,
    n
  );
  Object.prototype.hasOwnProperty.call(t, "optionsStyle") && (s.style = t.optionsStyle);
  const l = {
    ...a,
    setGeojson(r) {
      o.value.clearLayers(), o.value.addData(r);
    },
    setOptionsStyle(r) {
      o.value.setStyle(r);
    },
    getGeoJSONData() {
      return o.value.toGeoJSON();
    },
    getBounds() {
      return o.value.getBounds();
    }
  };
  return { options: s, methods: l };
}, wt = g({
  props: Ge,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { methods: l, options: r } = st(t, e, o);
    return O(async () => {
      const { geoJSON: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(i(t.geojson, r));
      const u = T(o.attrs);
      e.value.on(u), S(l, e.value, t), s({
        ...t,
        ...l,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), le = {
  ...F,
  opacity: {
    type: Number
  },
  zIndex: {
    type: Number
  },
  tileSize: {
    type: [Number, Array, Object]
  },
  noWrap: {
    type: Boolean,
    default: void 0
  },
  minZoom: {
    type: Number
  },
  maxZoom: {
    type: Number
  }
}, Me = (t, o, e) => {
  const { options: n, methods: a } = Q(
    t,
    o,
    e
  ), s = L(
    t,
    le,
    n
  ), l = {
    ...a,
    setTileComponent() {
      var r;
      (r = o.value) == null || r.redraw();
    }
  };
  return ne(() => {
    o.value.off();
  }), { options: s, methods: l };
}, at = (t, o, e, n) => t.extend({
  initialize(a) {
    this.tileComponents = {}, this.on("tileunload", this._unloadTile), e.setOptions(this, a);
  },
  createTile(a) {
    const s = this._tileCoordsToKey(a);
    this.tileComponents[s] = o.create("div");
    const l = E({ setup: n, props: ["coords"] }, { coords: a });
    return Je(l, this.tileComponents[s]), this.tileComponents[s];
  },
  _unloadTile(a) {
    const s = this._tileCoordsToKey(a.coords);
    this.tileComponents[s] && (this.tileComponents[s].innerHTML = "", this.tileComponents[s] = void 0);
  }
}), It = g({
  props: {
    ...le,
    childRender: {
      type: Function,
      required: !0
    }
  },
  setup(t, o) {
    const e = c(), n = c(null), a = c(!1), s = h(j), l = m(I), { options: r, methods: i } = Me(t, e, o);
    return O(async () => {
      const { GridLayer: u, DomUtil: d, Util: y } = s ? b.L : await import("leaflet/dist/leaflet-src.esm"), A = at(
        u,
        d,
        y,
        t.childRender
      );
      e.value = C(new A(r));
      const v = T(o.attrs);
      e.value.on(v), S(i, e.value, t), l({
        ...t,
        ...i,
        leafletObject: e.value
      }), a.value = !0, f(() => o.emit("ready", e.value));
    }), { root: n, ready: a, leafletObject: e };
  },
  render() {
    return this.ready ? E("div", { style: { display: "none" }, ref: "root" }) : null;
  }
}), pe = {
  iconUrl: {
    type: String
  },
  iconRetinaUrl: {
    type: String
  },
  iconSize: {
    type: [Object, Array]
  },
  iconAnchor: {
    type: [Object, Array]
  },
  popupAnchor: {
    type: [Object, Array]
  },
  tooltipAnchor: {
    type: [Object, Array]
  },
  shadowUrl: {
    type: String
  },
  shadowRetinaUrl: {
    type: String
  },
  shadowSize: {
    type: [Object, Array]
  },
  shadowAnchor: {
    type: [Object, Array]
  },
  bgPos: {
    type: [Object, Array]
  },
  className: {
    type: String
  }
}, At = g({
  name: "LIcon",
  props: {
    ...pe,
    ...J
  },
  setup(t, o) {
    const e = c(), n = h(j), a = m(be), s = m(fe), l = m(Le);
    let r, i, u, d, y;
    const A = (w, _, z) => {
      const $ = w && w.innerHTML;
      if (!_) {
        z && y && a() && s($);
        return;
      }
      const k = T(o.attrs);
      y && i(y, k);
      const { options: oe } = K(t), M = L(
        t,
        pe,
        oe
      );
      $ && (M.html = $), y = M.html ? u(M) : d(M), r(y, k), l(y);
    }, v = () => {
      f(() => A(e.value, !0, !1));
    }, U = () => {
      f(() => A(e.value, !1, !0));
    }, B = {
      setIconUrl: v,
      setIconRetinaUrl: v,
      setIconSize: v,
      setIconAnchor: v,
      setPopupAnchor: v,
      setTooltipAnchor: v,
      setShadowUrl: v,
      setShadowRetinaUrl: v,
      setShadowAnchor: v,
      setBgPos: v,
      setClassName: v,
      setHtml: v
    };
    return O(async () => {
      const {
        DomEvent: w,
        divIcon: _,
        icon: z
      } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      r = w.on, i = w.off, u = _, d = z, S(B, {}, t), new MutationObserver(U).observe(e.value, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }), v();
    }), { root: e };
  },
  render() {
    const t = this.$slots.default ? this.$slots.default() : void 0;
    return E("div", { ref: "root" }, t);
  }
}), Ne = {
  ...F,
  opacity: {
    type: Number
  },
  alt: {
    type: String
  },
  interactive: {
    type: Boolean,
    default: void 0
  },
  crossOrigin: {
    type: Boolean,
    default: void 0
  },
  errorOverlayUrl: {
    type: String
  },
  zIndex: {
    type: Number
  },
  className: {
    type: String
  },
  url: {
    type: String,
    required: !0,
    custom: !0
  },
  bounds: {
    type: [Array, Object],
    required: !0,
    custom: !0
  }
}, rt = (t, o, e) => {
  const { options: n, methods: a } = Q(
    t,
    o,
    e
  ), s = L(
    t,
    Ne,
    n
  ), l = {
    ...a,
    /**
     * Sets the opacity of the overlay.
     * @param {number} opacity
     */
    setOpacity(r) {
      return o.value.setOpacity(r);
    },
    /**
     * Changes the URL of the image.
     * @param {string} url
     */
    setUrl(r) {
      return o.value.setUrl(r);
    },
    /**
     * Update the bounds that this ImageOverlay covers
     * @param {LatLngBounds | Array<Array<number>>} bounds
     */
    setBounds(r) {
      return o.value.setBounds(r);
    },
    /**
     * Get the bounds that this ImageOverlay covers
     * @returns {LatLngBounds}
     */
    getBounds() {
      return o.value.getBounds();
    },
    /**
     * Returns the instance of HTMLImageElement used by this overlay.
     * @returns {HTMLElement}
     */
    getElement() {
      return o.value.getElement();
    },
    /**
     * Brings the layer to the top of all overlays.
     */
    bringToFront() {
      return o.value.bringToFront();
    },
    /**
     * Brings the layer to the bottom of all overlays.
     */
    bringToBack() {
      return o.value.bringToBack();
    },
    /**
     * Changes the zIndex of the image overlay.
     * @param {number} zIndex
     */
    setZIndex(r) {
      return o.value.setZIndex(r);
    }
  };
  return { options: s, methods: l };
}, _t = g({
  name: "LImageOverlay",
  props: Ne,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = rt(
      t,
      e,
      o
    );
    return O(async () => {
      const { imageOverlay: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        i(t.url, t.bounds, l)
      );
      const u = T(o.attrs);
      e.value.on(u), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), Gt = g({
  props: te,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { methods: l } = re(t, e, o);
    return O(async () => {
      const { layerGroup: r } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        r(void 0, t.options)
      );
      const i = T(o.attrs);
      e.value.on(i), S(l, e.value, t), s({
        ...t,
        ...l,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
});
function $e(t, o, e) {
  var n, a, s;
  o === void 0 && (o = 50), e === void 0 && (e = {});
  var l = (n = e.isImmediate) != null && n, r = (a = e.callback) != null && a, i = e.maxWait, u = Date.now(), d = [];
  function y() {
    if (i !== void 0) {
      var v = Date.now() - u;
      if (v + o >= i)
        return i - v;
    }
    return o;
  }
  var A = function() {
    var v = [].slice.call(arguments), U = this;
    return new Promise(function(B, w) {
      var _ = l && s === void 0;
      if (s !== void 0 && clearTimeout(s), s = setTimeout(function() {
        if (s = void 0, u = Date.now(), !l) {
          var $ = t.apply(U, v);
          r && r($), d.forEach(function(k) {
            return (0, k.resolve)($);
          }), d = [];
        }
      }, y()), _) {
        var z = t.apply(U, v);
        return r && r(z), B(z);
      }
      d.push({ resolve: B, reject: w });
    });
  };
  return A.cancel = function(v) {
    s !== void 0 && clearTimeout(s), d.forEach(function(U) {
      return (0, U.reject)(v);
    }), d = [];
  }, A;
}
const ye = {
  ...J,
  /**
   * The center of the map, supports .sync modifier
   */
  center: {
    type: [Object, Array]
  },
  /**
   * The bounds of the map, supports .sync modifier
   */
  bounds: {
    type: [Array, Object]
  },
  /**
   * The max bounds of the map
   */
  maxBounds: {
    type: [Array, Object]
  },
  /**
   * The zoom of the map, supports .sync modifier
   */
  zoom: {
    type: Number
  },
  /**
   * The minZoom of the map
   */
  minZoom: {
    type: Number
  },
  /**
   * The maxZoom of the map
   */
  maxZoom: {
    type: Number
  },
  /**
   * The paddingBottomRight of the map
   */
  paddingBottomRight: {
    type: [Object, Array]
  },
  /**
   * The paddingTopLeft of the map
   */
  paddingTopLeft: {
    type: Object
  },
  /**
   * The padding of the map
   */
  padding: {
    type: Object
  },
  /**
   * The worldCopyJump option for the map
   */
  worldCopyJump: {
    type: Boolean,
    default: void 0
  },
  /**
   * The CRS to use for the map. Can be an object that defines a coordinate reference
   * system for projecting geographical points into screen coordinates and back
   * (see https://leafletjs.com/reference-1.7.1.html#crs-l-crs-base), or a string
   * name identifying one of Leaflet's defined CRSs, such as "EPSG4326".
   */
  crs: {
    type: [String, Object]
  },
  maxBoundsViscosity: {
    type: Number
  },
  inertia: {
    type: Boolean,
    default: void 0
  },
  inertiaDeceleration: {
    type: Number
  },
  inertiaMaxSpeed: {
    type: Number
  },
  easeLinearity: {
    type: Number
  },
  zoomAnimation: {
    type: Boolean,
    default: void 0
  },
  zoomAnimationThreshold: {
    type: Number
  },
  fadeAnimation: {
    type: Boolean,
    default: void 0
  },
  markerZoomAnimation: {
    type: Boolean,
    default: void 0
  },
  noBlockingAnimations: {
    type: Boolean,
    default: void 0
  },
  useGlobalLeaflet: {
    type: Boolean,
    default: !0,
    custom: !0
  }
}, Mt = g({
  inheritAttrs: !1,
  emits: ["ready", "update:zoom", "update:center", "update:bounds"],
  props: ye,
  setup(t, o) {
    const e = c(), n = Ke({
      ready: !1,
      layersToAdd: [],
      layersInControl: []
    }), { options: a } = K(t), s = L(
      t,
      ye,
      a
    ), l = V(I), r = V(ee), i = V(q), u = V(
      ve
    );
    G(j, t.useGlobalLeaflet);
    const d = Y(() => {
      const B = {};
      return t.noBlockingAnimations && (B.animate = !1), B;
    }), y = Y(() => {
      const B = d.value;
      return t.padding && (B.padding = t.padding), t.paddingTopLeft && (B.paddingTopLeft = t.paddingTopLeft), t.paddingBottomRight && (B.paddingBottomRight = t.paddingBottomRight), B;
    }), A = {
      moveend: $e((B) => {
        n.leafletRef && (o.emit("update:zoom", n.leafletRef.getZoom()), o.emit("update:center", n.leafletRef.getCenter()), o.emit("update:bounds", n.leafletRef.getBounds()));
      }),
      overlayadd(B) {
        const w = n.layersInControl.find((_) => _.name === B.name);
        w && w.updateVisibleProp(!0);
      },
      overlayremove(B) {
        const w = n.layersInControl.find((_) => _.name === B.name);
        w && w.updateVisibleProp(!1);
      }
    };
    O(async () => {
      t.useGlobalLeaflet && (b.L = b.L || await import("leaflet"));
      const {
        map: B,
        CRS: w,
        Icon: _,
        latLngBounds: z,
        latLng: $,
        stamp: k
      } = t.useGlobalLeaflet ? b.L : await import("leaflet/dist/leaflet-src.esm");
      try {
        s.beforeMapMount && await s.beforeMapMount();
      } catch (p) {
        console.error(
          `The following error occurred running the provided beforeMapMount hook ${p.message}`
        );
      }
      await Xe(_);
      const oe = typeof s.crs == "string" ? w[s.crs] : s.crs;
      s.crs = oe || w.EPSG3857;
      const M = {
        addLayer(p) {
          p.layerType !== void 0 && (n.layerControl === void 0 ? n.layersToAdd.push(p) : n.layersInControl.find(
            (Z) => k(Z.leafletObject) === k(p.leafletObject)
          ) || (n.layerControl.addLayer(p), n.layersInControl.push(p))), p.visible !== !1 && n.leafletRef.addLayer(p.leafletObject);
        },
        removeLayer(p) {
          p.layerType !== void 0 && (n.layerControl === void 0 ? n.layersToAdd = n.layersToAdd.filter(
            (P) => P.name !== p.name
          ) : (n.layerControl.removeLayer(p.leafletObject), n.layersInControl = n.layersInControl.filter(
            (P) => k(P.leafletObject) !== k(p.leafletObject)
          ))), n.leafletRef.removeLayer(p.leafletObject);
        },
        registerLayerControl(p) {
          n.layerControl = p, n.layersToAdd.forEach((P) => {
            n.layerControl.addLayer(P);
          }), n.layersToAdd = [], i(p);
        },
        registerControl(p) {
          n.leafletRef.addControl(p.leafletObject);
        },
        setZoom(p) {
          const P = n.leafletRef.getZoom();
          p !== P && n.leafletRef.setZoom(p, d.value);
        },
        setCrs(p) {
          const P = n.leafletRef.getBounds();
          n.leafletRef.options.crs = p, n.leafletRef.fitBounds(P, {
            animate: !1,
            padding: [0, 0]
          });
        },
        fitBounds(p) {
          n.leafletRef.fitBounds(p, y.value);
        },
        setBounds(p) {
          if (!p)
            return;
          const P = z(p);
          if (!P.isValid())
            return;
          !(n.lastSetBounds || n.leafletRef.getBounds()).equals(P, 0) && (n.lastSetBounds = P, n.leafletRef.fitBounds(P));
        },
        setCenter(p) {
          if (p == null)
            return;
          const P = $(p), Z = n.lastSetCenter || n.leafletRef.getCenter();
          (Z.lat !== P.lat || Z.lng !== P.lng) && (n.lastSetCenter = P, n.leafletRef.panTo(P, d.value));
        }
      };
      x(l, M.addLayer), x(r, M.removeLayer), x(i, M.registerControl), x(u, M.registerLayerControl), n.leafletRef = C(B(e.value, s)), S(M, n.leafletRef, t);
      const qe = T(o.attrs);
      de(n.leafletRef, A), de(n.leafletRef, qe), n.ready = !0, f(() => o.emit("ready", n.leafletRef));
    }), W(() => {
      me(A), n.leafletRef && (n.leafletRef.off(), n.leafletRef.remove());
    });
    const v = Y(() => n.leafletRef), U = Y(() => n.ready);
    return { root: e, ready: U, leafletObject: v };
  },
  render() {
    return E(
      "div",
      { style: { width: "100%", height: "100%" }, ref: "root" },
      this.ready && this.$slots.default ? this.$slots.default() : {}
    );
  }
}), lt = ["Symbol(Comment)", "Symbol(Text)"], it = ["LTooltip", "LPopup"], ke = {
  ...F,
  draggable: {
    type: Boolean,
    default: void 0
  },
  icon: {
    type: [Object]
  },
  zIndexOffset: {
    type: Number
  },
  latLng: {
    type: [Object, Array],
    custom: !0,
    required: !0
  }
}, ut = (t, o, e) => {
  const { options: n, methods: a } = Q(
    t,
    o,
    e
  ), s = L(
    t,
    ke,
    n
  ), l = {
    ...a,
    setDraggable(r) {
      o.value.dragging && (r ? o.value.dragging.enable() : o.value.dragging.disable());
    },
    latLngSync(r) {
      e.emit("update:latLng", r.latlng), e.emit("update:lat-lng", r.latlng);
    },
    setLatLng(r) {
      if (r != null && o.value) {
        const i = o.value.getLatLng();
        (!i || !i.equals(r)) && o.value.setLatLng(r);
      }
    }
  };
  return { options: s, methods: l };
}, ct = (t, o) => {
  const e = o.slots.default && o.slots.default();
  return e && e.length && e.some(dt);
};
function dt(t) {
  return !(lt.includes(t.type.toString()) || it.includes(t.type.name));
}
const Nt = g({
  name: "LMarker",
  props: ke,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I);
    G(
      be,
      () => {
        var u;
        return !!((u = e.value) != null && u.getElement());
      }
    ), G(fe, (u) => {
      var y, A;
      const d = D((y = e.value) == null ? void 0 : y.getElement) && ((A = e.value) == null ? void 0 : A.getElement());
      d && (d.innerHTML = u);
    }), G(
      Le,
      (u) => {
        var d;
        return ((d = e.value) == null ? void 0 : d.setIcon) && e.value.setIcon(u);
      }
    );
    const { options: l, methods: r } = ut(t, e, o), i = {
      moveHandler: $e(r.latLngSync)
    };
    return O(async () => {
      const { marker: u, divIcon: d } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      ct(l, o) && (l.icon = d({ className: "" })), e.value = C(u(t.latLng, l));
      const y = T(o.attrs);
      e.value.on(y), e.value.on("move", i.moveHandler), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), W(() => me(i)), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), ie = {
  ...se,
  smoothFactor: {
    type: Number
  },
  noClip: {
    type: Boolean,
    default: void 0
  },
  latLngs: {
    type: Array,
    required: !0,
    custom: !0
  }
}, Ue = (t, o, e) => {
  const { options: n, methods: a } = Ce(
    t,
    o,
    e
  ), s = L(
    t,
    ie,
    n
  ), l = {
    ...a,
    setSmoothFactor(r) {
      o.value.setStyle({ smoothFactor: r });
    },
    setNoClip(r) {
      o.value.setStyle({ noClip: r });
    },
    addLatLng(r) {
      o.value.addLatLng(r);
    }
  };
  return { options: s, methods: l };
}, R = {
  ...ie
}, ze = (t, o, e) => {
  const { options: n, methods: a } = Ue(
    t,
    o,
    e
  ), s = L(
    t,
    R,
    n
  ), l = {
    ...a,
    toGeoJSON(r) {
      return o.value.toGeoJSON(r);
    }
  };
  return { options: s, methods: l };
}, $t = g({
  name: "LPolygon",
  props: R,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = ze(t, e, o);
    return O(async () => {
      const { polygon: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(i(t.latLngs, l));
      const u = T(o.attrs);
      e.value.on(u), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), kt = g({
  name: "LPolyline",
  props: ie,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = Ue(t, e, o);
    return O(async () => {
      const { polyline: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        i(t.latLngs, l)
      );
      const u = T(o.attrs);
      e.value.on(u), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), De = {
  ...J,
  content: {
    type: String,
    default: null
  }
}, Ee = (t, o) => {
  const { options: e, methods: n } = K(t), a = {
    ...n,
    setContent(s) {
      o.value && s !== null && s !== void 0 && o.value.setContent(s);
    }
  };
  return { options: e, methods: a };
}, Fe = (t) => t.default ? E("div", { ref: "root" }, t.default()) : null, pt = {
  ...De,
  latLng: {
    type: [Object, Array],
    default: () => []
  }
}, yt = (t, o) => {
  const { options: e, methods: n } = Ee(t, o);
  return { options: e, methods: n };
}, Ut = g({
  name: "LPopup",
  props: pt,
  setup(t, o) {
    const e = c(), n = c(null), a = h(j), s = m(he), l = m(Oe), { options: r, methods: i } = yt(t, e);
    return O(async () => {
      const { popup: u } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(u(r)), t.latLng !== void 0 && e.value.setLatLng(t.latLng), S(i, e.value, t);
      const d = T(o.attrs);
      e.value.on(d), e.value.setContent(t.content || n.value || ""), s(e.value), f(() => o.emit("ready", e.value));
    }), W(() => {
      l();
    }), { root: n, leafletObject: e };
  },
  render() {
    return Fe(this.$slots);
  }
}), He = {
  ...R,
  latLngs: {
    ...R.latLngs,
    required: !1
  },
  bounds: {
    type: Object,
    custom: !0
  }
}, mt = (t, o, e) => {
  const { options: n, methods: a } = ze(
    t,
    o,
    e
  ), s = L(
    t,
    He,
    n
  ), l = {
    ...a,
    setBounds(r) {
      o.value.setBounds(r);
    },
    setLatLngs(r) {
      o.value.setBounds(r);
    }
  };
  return { options: s, methods: l };
}, zt = g({
  name: "LRectangle",
  props: He,
  setup(t, o) {
    const e = c(), n = c(!1), a = h(j), s = m(I), { options: l, methods: r } = mt(t, e, o);
    return O(async () => {
      const { rectangle: i, latLngBounds: u } = a ? b.L : await import("leaflet/dist/leaflet-src.esm"), d = t.bounds ? u(t.bounds) : u(t.latLngs || []);
      e.value = C(i(d, l));
      const y = T(o.attrs);
      e.value.on(y), S(r, e.value, t), s({
        ...t,
        ...r,
        leafletObject: e.value
      }), n.value = !0, f(() => o.emit("ready", e.value));
    }), { ready: n, leafletObject: e };
  },
  render() {
    return N(this.ready, this.$slots);
  }
}), ue = {
  ...le,
  tms: {
    type: Boolean,
    default: void 0
  },
  subdomains: {
    type: [String, Array],
    validator: (t) => typeof t == "string" ? !0 : Array.isArray(t) ? t.every((o) => typeof o == "string") : !1
  },
  detectRetina: {
    type: Boolean,
    default: void 0
  },
  url: {
    type: String,
    required: !0,
    custom: !0
  }
}, Ze = (t, o, e) => {
  const { options: n, methods: a } = Me(t, o, e), s = L(
    t,
    ue,
    n
  ), l = {
    ...a
  };
  return { options: s, methods: l };
}, Dt = g({
  props: ue,
  setup(t, o) {
    const e = c(), n = h(j), a = m(I), { options: s, methods: l } = Ze(t, e, o);
    return O(async () => {
      const { tileLayer: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(r(t.url, s));
      const i = T(o.attrs);
      e.value.on(i), S(l, e.value, t), a({
        ...t,
        ...l,
        leafletObject: e.value
      }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
}), vt = {
  ...De
}, bt = (t, o) => {
  const { options: e, methods: n } = Ee(t, o), a = m(Se);
  return W(() => {
    a();
  }), { options: e, methods: n };
}, Et = g({
  name: "LTooltip",
  props: vt,
  setup(t, o) {
    const e = c(), n = c(null), a = h(j), s = m(ge), { options: l, methods: r } = bt(t, e);
    return O(async () => {
      const { tooltip: i } = a ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(i(l)), S(r, e.value, t);
      const u = T(o.attrs);
      e.value.on(u), e.value.setContent(t.content || n.value || ""), s(e.value), f(() => o.emit("ready", e.value));
    }), { root: n, leafletObject: e };
  },
  render() {
    return Fe(this.$slots);
  }
}), We = {
  ...ue,
  layers: {
    type: String,
    required: !0
  },
  styles: {
    type: String
  },
  format: {
    type: String
  },
  transparent: {
    type: Boolean,
    default: void 0
  },
  version: {
    type: String
  },
  crs: {
    type: Object
  },
  uppercase: {
    type: Boolean,
    default: void 0
  }
}, ft = (t, o, e) => {
  const { options: n, methods: a } = Ze(t, o, e);
  return {
    options: L(
      t,
      We,
      n
    ),
    methods: {
      ...a
    }
  };
}, Ft = g({
  props: We,
  setup(t, o) {
    const e = c(), n = h(j), a = m(I), { options: s, methods: l } = ft(
      t,
      e,
      o
    );
    return O(async () => {
      const { tileLayer: r } = n ? b.L : await import("leaflet/dist/leaflet-src.esm");
      e.value = C(
        r.wms(t.url, s)
      );
      const i = T(o.attrs);
      e.value.on(i), S(l, e.value, t), a({
        ...t,
        ...l,
        leafletObject: e.value
      }), f(() => o.emit("ready", e.value));
    }), { leafletObject: e };
  },
  render() {
    return null;
  }
});
export {
  gt as LCircle,
  Ot as LCircleMarker,
  St as LControl,
  jt as LControlAttribution,
  Ct as LControlLayers,
  Pt as LControlScale,
  Bt as LControlZoom,
  Tt as LFeatureGroup,
  wt as LGeoJson,
  It as LGridLayer,
  At as LIcon,
  _t as LImageOverlay,
  Gt as LLayerGroup,
  Mt as LMap,
  Nt as LMarker,
  $t as LPolygon,
  kt as LPolyline,
  Ut as LPopup,
  zt as LRectangle,
  Dt as LTileLayer,
  Et as LTooltip,
  Ft as LWmsTileLayer
};
