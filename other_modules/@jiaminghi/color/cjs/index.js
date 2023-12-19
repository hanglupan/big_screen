"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const R=require("./config/keywords.js");function o(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e))}function p(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^(rgb\(|RGB\()/.test(e))}function s(e){return typeof e!="string"?!1:(e=e.toLowerCase(),/^(rgba|RGBA)/.test(e))}function f(e){return/^(rgb|rgba|RGB|RGBA)/.test(e)}function c(e){return R.ColorKeywords[e]}function b(e){if(o(e)||f(e))return e;const t=c(e);if(!t)throw new Error(`Color: Invalid Input of ${e}`);return t}function m(e){e=e.replace("#",""),e.length===3&&(e=Array.from(e).map(r=>r+r).join(""));const t=e.split("");return new Array(3).fill(0).map((r,n)=>parseInt(`0x${t[n*2]}${t[n*2+1]}`))}function d(e){return e.replace(/rgb\(|rgba\(|\)/g,"").split(",").slice(0,3).map(t=>parseInt(t))}function a(e){const r=b(e).toLowerCase();return o(r)?m(r):d(r)}function l(e){const t=b(e);return s(t)?Number(t.toLowerCase().split(",").slice(-1)[0].replace(/[)|\s]/g,"")):1}function u(e){const t=a(e);return t&&[...t,l(e)]}function w(e,t){const r=a(e);return typeof t=="number"?`rgba(${r.join(",")},${t})`:`rgb(${r.join(",")})`}function y(e){if(o(e))return e;const t=a(e),r=n=>Number(n).toString(16).padStart(2,"0");return`#${t.map(r).join("")}`}function i(e){if(!Array.isArray(e))throw new Error(`getColorFromRgbValue: ${e} is not an array`);const{length:t}=e;if(t!==3&&t!==4)throw new Error("getColorFromRgbValue: value length should be 3 or 4");return(t===3?"rgb(":"rgba(")+e.join(",")+")"}function C(e,t=0){let r=u(e);return r=r.map((n,g)=>g===3?n:n-Math.ceil(2.55*t)).map(n=>n<0?0:n),i(r)}function V(e,t=0){let r=u(e);return r=r.map((n,g)=>g===3?n:n+Math.ceil(2.55*t)).map(n=>n>255?255:n),i(r)}function h(e,t=100){const r=a(e);return i([...r,t/100])}exports.darken=C;exports.fade=h;exports.getColorFromRgbValue=i;exports.getOpacity=l;exports.getRgbValue=a;exports.getRgbaValue=u;exports.isHex=o;exports.isRgb=p;exports.isRgbOrRgba=f;exports.isRgba=s;exports.lighten=V;exports.toHex=y;exports.toRgb=w;
