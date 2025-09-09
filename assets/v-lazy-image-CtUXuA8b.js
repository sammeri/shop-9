import{a as y,f as A}from"./index-CjkaUewl.js";import{B as P,c as o,o as l,e as c,z as d,C as w,q as k,t as O,r as B,M as _,g as u,h as S,N as I,P as b}from"./index-CLWnTIfX.js";var z=`
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
`,j={root:function(n){var t=n.instance;return["p-progressbar p-component",{"p-progressbar-determinate":t.determinate,"p-progressbar-indeterminate":t.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},E=P.extend({name:"progressbar",style:z,classes:j}),N={name:"BaseProgressBar",extends:y,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:E,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},V={name:"ProgressBar",extends:N,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"},dataP:function(){return A({determinate:this.determinate,indeterminate:this.indeterminate})}}},D=["aria-valuenow","data-p"],L=["data-p"],q=["data-p"],C=["data-p"];function M(e,n,t,i,a,r){return l(),o("div",d({role:"progressbar",class:e.cx("root"),"aria-valuemin":"0","aria-valuenow":e.value,"aria-valuemax":"100","data-p":r.dataP},e.ptmi("root")),[r.determinate?(l(),o("div",d({key:0,class:e.cx("value"),style:r.progressStyle,"data-p":r.dataP},e.ptm("value")),[e.value!=null&&e.value!==0&&e.showValue?(l(),o("div",d({key:0,class:e.cx("label"),"data-p":r.dataP},e.ptm("label")),[w(e.$slots,"default",{},function(){return[k(O(e.value+"%"),1)]})],16,q)):c("",!0)],16,L)):r.indeterminate?(l(),o("div",d({key:1,class:e.cx("value"),"data-p":r.dataP},e.ptm("value")),null,16,C)):c("",!0)],16,D)}V.render=M;var R=Object.defineProperty,$=Object.defineProperties,x=Object.getOwnPropertyDescriptors,m=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,g=(e,n,t)=>n in e?R(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,Q=(e,n)=>{for(var t in n||(n={}))G.call(n,t)&&g(e,t,n[t]);if(m)for(var t of m(n))H.call(n,t)&&g(e,t,n[t]);return e},T=(e,n)=>$(e,x(n)),K={props:{src:{type:String,required:!0},srcPlaceholder:{type:String,default:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},srcset:{type:String},intersectionOptions:{type:Object,default:()=>({})},usePicture:{type:Boolean,default:!1}},inheritAttrs:!1,setup(e,{attrs:n,slots:t,emit:i}){const a=B(null),r=_({observer:null,intersected:!1,loaded:!1}),v=u(()=>r.intersected&&e.src?e.src:e.srcPlaceholder),f=u(()=>r.intersected&&e.srcset?e.srcset:!1),p=()=>{a.value&&a.value.getAttribute("src")!==e.srcPlaceholder&&(r.loaded=!0,i("load",a.value))},h=()=>i("error",a.value);return S(()=>{"IntersectionObserver"in window&&(r.observer=new IntersectionObserver(s=>{s[0].isIntersecting&&(r.intersected=!0,r.observer.disconnect(),i("intersect"))},e.intersectionOptions),r.observer.observe(a.value))}),I(()=>{"IntersectionObserver"in window&&r.observer&&r.observer.disconnect()}),()=>{const s=b("img",T(Q({ref:a,src:v.value,srcset:f.value||null},n),{class:[n.class,"v-lazy-image",{"v-lazy-image-loaded":r.loaded}],onLoad:p,onError:h}));return e.usePicture?b("picture",{ref:a,onLoad:p},r.intersected?[t.default,s]:[s]):s}}};export{K as i,V as s};
