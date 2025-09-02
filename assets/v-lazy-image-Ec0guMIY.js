import{Z as q,H as N,B as v,x as g,E as L,J as F,y as I,G as $,A as J,N as _,S,C as Q,$ as Z,a0 as X,c as C,o as w,m as V,z as Y,p as ee,t as te,r as ne,a1 as re,a as B,b as ie,a2 as ae,a3 as E}from"./index-Xrdqae12.js";function H(...t){if(t){let e=[];for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=typeof r;if(i==="string"||i==="number")e.push(r);else if(i==="object"){let a=Array.isArray(r)?[H(...r)]:Object.entries(r).map(([d,u])=>u?d:void 0);e=a.length?e.concat(a.filter(d=>!!d)):e}}return e.join(" ").trim()}}var P={_loadedStyleNames:new Set,getLoadedStyleNames:function(){return this._loadedStyleNames},isStyleNameLoaded:function(e){return this._loadedStyleNames.has(e)},setLoadedStyleName:function(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName:function(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames:function(){this._loadedStyleNames.clear()}};function se(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"pc",e=q();return"".concat(t).concat(e.replace("v-","").replaceAll("-","_"))}var D=v.extend({name:"common"});function A(t){"@babel/helpers - typeof";return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(t)}function oe(t){return K(t)||le(t)||W(t)||M()}function le(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function O(t,e){return K(t)||ue(t,e)||W(t,e)||M()}function M(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function W(t,e){if(t){if(typeof t=="string")return U(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(t,e):void 0}}function U(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function ue(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r,i,a,d,u=[],l=!0,c=!1;try{if(a=(n=n.call(t)).next,e===0){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=a.call(n)).done)&&(u.push(r.value),u.length!==e);l=!0);}catch(s){c=!0,i=s}finally{try{if(!l&&n.return!=null&&(d=n.return(),Object(d)!==d))return}finally{if(c)throw i}}return u}}function K(t){if(Array.isArray(t))return t}function x(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?x(Object(n),!0).forEach(function(r){T(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function T(t,e,n){return(e=de(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function de(t){var e=ce(t,"string");return A(e)=="symbol"?e:e+""}function ce(t,e){if(A(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(A(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var me={name:"BaseComponent",props:{pt:{type:Object,default:void 0},ptOptions:{type:Object,default:void 0},unstyled:{type:Boolean,default:void 0},dt:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0}},watch:{isUnstyled:{immediate:!0,handler:function(e){_.off("theme:change",this._loadCoreStyles),e||(this._loadCoreStyles(),this._themeChangeListener(this._loadCoreStyles))}},dt:{immediate:!0,handler:function(e,n){var r=this;_.off("theme:change",this._themeScopedListener),e?(this._loadScopedThemeStyles(e),this._themeScopedListener=function(){return r._loadScopedThemeStyles(e)},this._themeChangeListener(this._themeScopedListener)):this._unloadScopedThemeStyles()}}},scopedStyleEl:void 0,rootEl:void 0,uid:void 0,$attrSelector:void 0,beforeCreate:function(){var e,n,r,i,a,d,u,l,c,s,m,h=(e=this.pt)===null||e===void 0?void 0:e._usept,p=h?(n=this.pt)===null||n===void 0||(n=n.originalValue)===null||n===void 0?void 0:n[this.$.type.name]:void 0,f=h?(r=this.pt)===null||r===void 0||(r=r.value)===null||r===void 0?void 0:r[this.$.type.name]:this.pt;(i=f||p)===null||i===void 0||(i=i.hooks)===null||i===void 0||(a=i.onBeforeCreate)===null||a===void 0||a.call(i);var y=(d=this.$primevueConfig)===null||d===void 0||(d=d.pt)===null||d===void 0?void 0:d._usept,k=y?(u=this.$primevue)===null||u===void 0||(u=u.config)===null||u===void 0||(u=u.pt)===null||u===void 0?void 0:u.originalValue:void 0,b=y?(l=this.$primevue)===null||l===void 0||(l=l.config)===null||l===void 0||(l=l.pt)===null||l===void 0?void 0:l.value:(c=this.$primevue)===null||c===void 0||(c=c.config)===null||c===void 0?void 0:c.pt;(s=b||k)===null||s===void 0||(s=s[this.$.type.name])===null||s===void 0||(s=s.hooks)===null||s===void 0||(m=s.onBeforeCreate)===null||m===void 0||m.call(s),this.$attrSelector=se(),this.uid=this.$attrs.id||this.$attrSelector.replace("pc","pv_id_")},created:function(){this._hook("onCreated")},beforeMount:function(){var e;this.rootEl=Z(X(this.$el)?this.$el:(e=this.$el)===null||e===void 0?void 0:e.parentElement,"[".concat(this.$attrSelector,"]")),this.rootEl&&(this.rootEl.$pc=o({name:this.$.type.name,attrSelector:this.$attrSelector},this.$params)),this._loadStyles(),this._hook("onBeforeMount")},mounted:function(){this._hook("onMounted")},beforeUpdate:function(){this._hook("onBeforeUpdate")},updated:function(){this._hook("onUpdated")},beforeUnmount:function(){this._hook("onBeforeUnmount")},unmounted:function(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this._hook("onUnmounted")},methods:{_hook:function(e){if(!this.$options.hostName){var n=this._usePT(this._getPT(this.pt,this.$.type.name),this._getOptionValue,"hooks.".concat(e)),r=this._useDefaultPT(this._getOptionValue,"hooks.".concat(e));n?.(),r?.()}},_mergeProps:function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Q(e)?e.apply(void 0,r):g.apply(void 0,r)},_load:function(){P.isStyleNameLoaded("base")||(v.loadCSS(this.$styleOptions),this._loadGlobalStyles(),P.setLoadedStyleName("base")),this._loadThemeStyles()},_loadStyles:function(){this._load(),this._themeChangeListener(this._load)},_loadCoreStyles:function(){var e,n;!P.isStyleNameLoaded((e=this.$style)===null||e===void 0?void 0:e.name)&&(n=this.$style)!==null&&n!==void 0&&n.name&&(D.loadCSS(this.$styleOptions),this.$options.style&&this.$style.loadCSS(this.$styleOptions),P.setLoadedStyleName(this.$style.name))},_loadGlobalStyles:function(){var e=this._useGlobalPT(this._getOptionValue,"global.css",this.$params);I(e)&&v.load(e,o({name:"global"},this.$styleOptions))},_loadThemeStyles:function(){var e,n;if(!(this.isUnstyled||this.$theme==="none")){if(!S.isStyleNameLoaded("common")){var r,i,a=((r=this.$style)===null||r===void 0||(i=r.getCommonTheme)===null||i===void 0?void 0:i.call(r))||{},d=a.primitive,u=a.semantic,l=a.global,c=a.style;v.load(d?.css,o({name:"primitive-variables"},this.$styleOptions)),v.load(u?.css,o({name:"semantic-variables"},this.$styleOptions)),v.load(l?.css,o({name:"global-variables"},this.$styleOptions)),v.loadStyle(o({name:"global-style"},this.$styleOptions),c),S.setLoadedStyleName("common")}if(!S.isStyleNameLoaded((e=this.$style)===null||e===void 0?void 0:e.name)&&(n=this.$style)!==null&&n!==void 0&&n.name){var s,m,h,p,f=((s=this.$style)===null||s===void 0||(m=s.getComponentTheme)===null||m===void 0?void 0:m.call(s))||{},y=f.css,k=f.style;(h=this.$style)===null||h===void 0||h.load(y,o({name:"".concat(this.$style.name,"-variables")},this.$styleOptions)),(p=this.$style)===null||p===void 0||p.loadStyle(o({name:"".concat(this.$style.name,"-style")},this.$styleOptions),k),S.setLoadedStyleName(this.$style.name)}if(!S.isStyleNameLoaded("layer-order")){var b,j,R=(b=this.$style)===null||b===void 0||(j=b.getLayerOrderThemeCSS)===null||j===void 0?void 0:j.call(b);v.load(R,o({name:"layer-order",first:!0},this.$styleOptions)),S.setLoadedStyleName("layer-order")}}},_loadScopedThemeStyles:function(e){var n,r,i,a=((n=this.$style)===null||n===void 0||(r=n.getPresetTheme)===null||r===void 0?void 0:r.call(n,e,"[".concat(this.$attrSelector,"]")))||{},d=a.css,u=(i=this.$style)===null||i===void 0?void 0:i.load(d,o({name:"".concat(this.$attrSelector,"-").concat(this.$style.name)},this.$styleOptions));this.scopedStyleEl=u.el},_unloadScopedThemeStyles:function(){var e;(e=this.scopedStyleEl)===null||e===void 0||(e=e.value)===null||e===void 0||e.remove()},_themeChangeListener:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};P.clearLoadedStyleNames(),_.on("theme:change",e)},_removeThemeListeners:function(){_.off("theme:change",this._loadCoreStyles),_.off("theme:change",this._load),_.off("theme:change",this._themeScopedListener)},_getHostInstance:function(e){return e?this.$options.hostName?e.$.type.name===this.$options.hostName?e:this._getHostInstance(e.$parentInstance):e.$parentInstance:void 0},_getPropValue:function(e){var n;return this[e]||((n=this._getHostInstance(this))===null||n===void 0?void 0:n[e])},_getOptionValue:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return J(e,n,r)},_getPTValue:function(){var e,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,d=/./g.test(r)&&!!i[r.split(".")[0]],u=this._getPropValue("ptOptions")||((e=this.$primevueConfig)===null||e===void 0?void 0:e.ptOptions)||{},l=u.mergeSections,c=l===void 0?!0:l,s=u.mergeProps,m=s===void 0?!1:s,h=a?d?this._useGlobalPT(this._getPTClassValue,r,i):this._useDefaultPT(this._getPTClassValue,r,i):void 0,p=d?void 0:this._getPTSelf(n,this._getPTClassValue,r,o(o({},i),{},{global:h||{}})),f=this._getPTDatasets(r);return c||!c&&p?m?this._mergeProps(m,h,p,f):o(o(o({},h),p),f):o(o({},p),f)},_getPTSelf:function(){for(var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return g(this._usePT.apply(this,[this._getPT(e,this.$name)].concat(r)),this._usePT.apply(this,[this.$_attrsPT].concat(r)))},_getPTDatasets:function(){var e,n,r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",i="data-pc-",a=r==="root"&&I((e=this.pt)===null||e===void 0?void 0:e["data-pc-section"]);return r!=="transition"&&o(o({},r==="root"&&o(o(T({},"".concat(i,"name"),$(a?(n=this.pt)===null||n===void 0?void 0:n["data-pc-section"]:this.$.type.name)),a&&T({},"".concat(i,"extend"),$(this.$.type.name))),{},T({},"".concat(this.$attrSelector),""))),{},T({},"".concat(i,"section"),$(r)))},_getPTClassValue:function(){var e=this._getOptionValue.apply(this,arguments);return L(e)||F(e)?{class:e}:e},_getPT:function(e){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",i=arguments.length>2?arguments[2]:void 0,a=function(u){var l,c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,s=i?i(u):u,m=$(r),h=$(n.$name);return(l=c?m!==h?s?.[m]:void 0:s?.[m])!==null&&l!==void 0?l:s};return e!=null&&e.hasOwnProperty("_usept")?{_usept:e._usept,originalValue:a(e.originalValue),value:a(e.value)}:a(e,!0)},_usePT:function(e,n,r,i){var a=function(y){return n(y,r,i)};if(e!=null&&e.hasOwnProperty("_usept")){var d,u=e._usept||((d=this.$primevueConfig)===null||d===void 0?void 0:d.ptOptions)||{},l=u.mergeSections,c=l===void 0?!0:l,s=u.mergeProps,m=s===void 0?!1:s,h=a(e.originalValue),p=a(e.value);return h===void 0&&p===void 0?void 0:L(p)?p:L(h)?h:c||!c&&p?m?this._mergeProps(m,h,p):o(o({},h),p):p}return a(e)},_useGlobalPT:function(e,n,r){return this._usePT(this.globalPT,e,n,r)},_useDefaultPT:function(e,n,r){return this._usePT(this.defaultPT,e,n,r)},ptm:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this._getPTValue(this.pt,e,o(o({},this.$params),n))},ptmi:function(){var e,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=g(this.$_attrsWithoutPT,this.ptm(n,r));return i?.hasOwnProperty("id")&&((e=i.id)!==null&&e!==void 0||(i.id=this.$id)),i},ptmo:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this._getPTValue(e,n,o({instance:this},r),!1)},cx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.isUnstyled?void 0:this._getOptionValue(this.$style.classes,e,o(o({},this.$params),n))},sx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(n){var i=this._getOptionValue(this.$style.inlineStyles,e,o(o({},this.$params),r)),a=this._getOptionValue(D.inlineStyles,e,o(o({},this.$params),r));return[a,i]}}},computed:{globalPT:function(){var e,n=this;return this._getPT((e=this.$primevueConfig)===null||e===void 0?void 0:e.pt,void 0,function(r){return N(r,{instance:n})})},defaultPT:function(){var e,n=this;return this._getPT((e=this.$primevueConfig)===null||e===void 0?void 0:e.pt,void 0,function(r){return n._getOptionValue(r,n.$name,o({},n.$params))||N(r,o({},n.$params))})},isUnstyled:function(){var e;return this.unstyled!==void 0?this.unstyled:(e=this.$primevueConfig)===null||e===void 0?void 0:e.unstyled},$id:function(){return this.$attrs.id||this.uid},$inProps:function(){var e,n=Object.keys(((e=this.$.vnode)===null||e===void 0?void 0:e.props)||{});return Object.fromEntries(Object.entries(this.$props).filter(function(r){var i=O(r,1),a=i[0];return n?.includes(a)}))},$theme:function(){var e;return(e=this.$primevueConfig)===null||e===void 0?void 0:e.theme},$style:function(){return o(o({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},(this._getHostInstance(this)||{}).$style),this.$options.style)},$styleOptions:function(){var e;return{nonce:(e=this.$primevueConfig)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce}},$primevueConfig:function(){var e;return(e=this.$primevue)===null||e===void 0?void 0:e.config},$name:function(){return this.$options.hostName||this.$.type.name},$params:function(){var e=this._getHostInstance(this)||this.$parent;return{instance:this,props:this.$props,state:this.$data,attrs:this.$attrs,parent:{instance:e,props:e?.$props,state:e?.$data,attrs:e?.$attrs}}},$_attrsPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){var n=O(e,1),r=n[0];return r?.startsWith("pt:")}).reduce(function(e,n){var r=O(n,2),i=r[0],a=r[1],d=i.split(":"),u=oe(d),l=u.slice(1);return l?.reduce(function(c,s,m,h){return!c[s]&&(c[s]=m===h.length-1?a:{}),c[s]},e),e},{})},$_attrsWithoutPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){var n=O(e,1),r=n[0];return!(r!=null&&r.startsWith("pt:"))}).reduce(function(e,n){var r=O(n,2),i=r[0],a=r[1];return e[i]=a,e},{})}}},he=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,pe={root:function(e){var n=e.instance;return["p-progressbar p-component",{"p-progressbar-determinate":n.determinate,"p-progressbar-indeterminate":n.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},fe=v.extend({name:"progressbar",style:he,classes:pe}),ve={name:"BaseProgressBar",extends:me,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:fe,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},ge={name:"ProgressBar",extends:ve,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"},dataP:function(){return H({determinate:this.determinate,indeterminate:this.indeterminate})}}},ye=["aria-valuenow","data-p"],be=["data-p"],_e=["data-p"],Se=["data-p"];function $e(t,e,n,r,i,a){return w(),C("div",g({role:"progressbar",class:t.cx("root"),"aria-valuemin":"0","aria-valuenow":t.value,"aria-valuemax":"100","data-p":a.dataP},t.ptmi("root")),[a.determinate?(w(),C("div",g({key:0,class:t.cx("value"),style:a.progressStyle,"data-p":a.dataP},t.ptm("value")),[t.value!=null&&t.value!==0&&t.showValue?(w(),C("div",g({key:0,class:t.cx("label"),"data-p":a.dataP},t.ptm("label")),[Y(t.$slots,"default",{},function(){return[ee(te(t.value+"%"),1)]})],16,_e)):V("",!0)],16,be)):a.indeterminate?(w(),C("div",g({key:1,class:t.cx("value"),"data-p":a.dataP},t.ptm("value")),null,16,Se)):V("",!0)],16,ye)}ge.render=$e;var Pe=Object.defineProperty,Oe=Object.defineProperties,Te=Object.getOwnPropertyDescriptors,G=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,z=(t,e,n)=>e in t?Pe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,we=(t,e)=>{for(var n in e||(e={}))Ae.call(e,n)&&z(t,n,e[n]);if(G)for(var n of G(e))Ce.call(e,n)&&z(t,n,e[n]);return t},ke=(t,e)=>Oe(t,Te(e)),Le={props:{src:{type:String,required:!0},srcPlaceholder:{type:String,default:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},srcset:{type:String},intersectionOptions:{type:Object,default:()=>({})},usePicture:{type:Boolean,default:!1}},inheritAttrs:!1,setup(t,{attrs:e,slots:n,emit:r}){const i=ne(null),a=re({observer:null,intersected:!1,loaded:!1}),d=B(()=>a.intersected&&t.src?t.src:t.srcPlaceholder),u=B(()=>a.intersected&&t.srcset?t.srcset:!1),l=()=>{i.value&&i.value.getAttribute("src")!==t.srcPlaceholder&&(a.loaded=!0,r("load",i.value))},c=()=>r("error",i.value);return ie(()=>{"IntersectionObserver"in window&&(a.observer=new IntersectionObserver(s=>{s[0].isIntersecting&&(a.intersected=!0,a.observer.disconnect(),r("intersect"))},t.intersectionOptions),a.observer.observe(i.value))}),ae(()=>{"IntersectionObserver"in window&&a.observer&&a.observer.disconnect()}),()=>{const s=E("img",ke(we({ref:i,src:d.value,srcset:u.value||null},e),{class:[e.class,"v-lazy-image",{"v-lazy-image-loaded":a.loaded}],onLoad:l,onError:c}));return t.usePicture?E("picture",{ref:i,onLoad:l},a.intersected?[n.default,s]:[s]):s}}};export{P as B,me as a,H as f,Le as i,ge as s};
