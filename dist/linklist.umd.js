!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.VueLinkList={})}(this,function(e){"use strict";function t(){var e=document.head||document.getElementsByTagName("head")[0],n=t.styles||(t.styles={}),i="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(t,r){if(!document.querySelector('style[data-vue-ssr-id~="'+t+'"]')){var a=i?r.media||"default":t,s=n[a]||(n[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(t)){var o=r.source,c=s.ids.length;if(s.ids.push(t),i&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var l=s.element=document.createElement("style");l.type="text/css",r.media&&l.setAttribute("media",r.media),i&&(l.setAttribute("data-group",a),l.setAttribute("data-next-index","0")),e.appendChild(l)}if(i&&(c=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",c+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var d=document.createTextNode(o),u=s.element.childNodes;u[c]&&s.element.removeChild(u[c]),u.length?s.element.insertBefore(d,u[c]):s.element.appendChild(d)}}}}}var n={props:{source:Array},data:function(){return{active:{},pairs:[]}},computed:{box:function(){return{width:100,height:50,margin:10,space:80}},lines:function(){var e=this;return this.pairs.map(function(t){return{start:e.findElementIndex({category:t.start.category,name:t.start.name}),end:e.findElementIndex({category:t.end.category,name:t.end.name})}})}},methods:{findElementIndex:function(e){var t=e.category,n=e.name,i=this.source.findIndex(function(e){return e.category===t});return{categoryIndex:i,nameIndex:this.source[i].elements.findIndex(function(e){return e.name===n})}},onStartClicked:function(e,t){this.$set(this.active,"category",e),this.$set(this.active,"name",t)},onEndClicked:function(e,t){if(this.active.category&&this.active.name){var n=this.findElementIndex({category:this.active.category,name:this.active.name});this.findElementIndex({category:e,name:t}).categoryIndex-n.categoryIndex==1&&(this.pairs.push({start:{category:this.active.category,name:this.active.name},end:{category:e,name:t}}),this.active={},this.$emit("updatedList",this.pairs))}},categoryX:function(e){return(this.box.width+this.box.space)*e},elementY:function(e){return(this.box.height+this.box.margin)*e},elementTransform:function(e){return"translate(0, "+this.elementY(e)+")"},categoryTransform:function(e){return"translate("+this.categoryX(e)+", 0)"}}},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{attrs:{width:"640",height:"480",xmlns:"http://www.w3.org/2000/svg"}},[n("g",{attrs:{transform:"translate(20, 20)"}},[n("title",[e._v("linklist")]),e._l(e.lines,function(t){return n("line",{attrs:{"stroke-linecap":"null","stroke-linejoin":"null",x1:e.categoryX(t.start.categoryIndex)+e.box.width,y1:e.elementY(t.start.nameIndex)+e.box.height/2,x2:e.categoryX(t.end.categoryIndex),y2:e.elementY(t.end.nameIndex)+e.box.height/2,"fill-opacity":"null","stroke-opacity":"null","stroke-width":"10",stroke:"rgb(119, 0, 255)",fill:"none"}})}),e._l(e.source,function(t,i){return n("g",{attrs:{transform:e.categoryTransform(i)}},[e._l(t.elements,function(r,a){return[n("g",{attrs:{transform:e.elementTransform(a)}},[n("rect",{attrs:{height:e.box.height,width:e.box.width,x:"0",y:"0","stroke-width":"1.5",stroke:"#000",fill:"#fff"}}),n("text",{attrs:{x:"20",y:"30","xml:space":"preserve","text-anchor":"start","font-family":"Helvetica, Arial, sans-serif","font-size":"18","stroke-width":"0",stroke:"#000",fill:"#000000"}},[e._v(e._s(r.name))]),i!==e.source.length-1?n("circle",{class:{active:e.active.category===t.category&&e.active.name===r.name},attrs:{cx:e.box.width,cy:e.box.height/2,r:"10"},on:{click:function(n){e.onStartClicked(t.category,r.name)}}}):e._e(),0!==i?n("circle",{class:{active:!1},attrs:{cx:0,cy:e.box.height/2,r:"10"},on:{click:function(n){e.onEndClicked(t.category,r.name)}}}):e._e()])]})],2)})],2)])},r=[];i._withStripped=!0;var a=function(e,t,n,i,r,a,s,o){var c=("function"==typeof n?n.options:n)||{};c.__file="/Users/genichiro/git/vue-linklist/src/linklist.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,r&&(c.functional=!0)),c._scopeId=i;var l;if(t&&(l=function(e){t.call(this,s(e))}),void 0!==l)if(c.functional){var d=c.render;c.render=function(e,t){return l.call(t),d(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return c}({render:i,staticRenderFns:r},function(e){e&&e("data-v-584d4e32_0",{source:"\ncircle[data-v-584d4e32] {\n  fill: #333;\n  transition: all 0.4s cubic-bezier(0.17, 0.67, 0.88, 1.74);\n  stroke: #7700ff;\n  stroke-width: 1px;\n}\n.active[data-v-584d4e32] {\n  fill: white;\n  stroke-width: 5px;\n}\n\n/*# sourceMappingURL=linklist.vue.map */",map:{version:3,sources:["/Users/genichiro/git/vue-linklist/src/linklist.vue","linklist.vue"],names:[],mappings:";AAoJA;EACA,WAAA;EACA,0DAAA;EACA,gBAAA;EACA,kBAAA;CACA;AACA;EACA,YAAA;EACA,kBAAA;CACA;;ACnJA,wCAAwC",file:"linklist.vue",sourcesContent:[null,"circle {\n  fill: #333;\n  transition: all 0.4s cubic-bezier(0.17, 0.67, 0.88, 1.74);\n  stroke: #7700ff;\n  stroke-width: 1px; }\n\n.active {\n  fill: white;\n  stroke-width: 5px; }\n\n/*# sourceMappingURL=linklist.vue.map */"]},media:void 0})},n,"data-v-584d4e32",!1,void 0,t,void 0);e.default=a,Object.defineProperty(e,"__esModule",{value:!0})});
