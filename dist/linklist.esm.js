function moveAt(e){var t=e.array,n=e.index,r=e.at;if(n===r||n>t.length-1||r>t.length-1)return t;var i=Object.assign([],t),a=i[n],s=i.slice(n+1);return i.splice(n),Array.prototype.push.apply(i,s),i.splice(r,0,a),i}function __vue_normalize__(e,t,n,r,i,a,s,o){var c=("function"==typeof n?n.options:n)||{};c.__file="/Users/eg00018/dev/vue-linklist/src/linklist.vue",c.render||(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,i&&(c.functional=!0)),c._scopeId=r;var d;if(t&&(d=function(e){t.call(this,s(e))}),void 0!==d)if(c.functional){var u=c.render;c.render=function(e,t){return d.call(t),u(e,t)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,d):[d]}return c}function __vue_create_injector__(){var e=document.head||document.getElementsByTagName("head")[0],t=__vue_create_injector__.styles||(__vue_create_injector__.styles={}),n="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){var a=n?i.media||"default":r,s=t[a]||(t[a]={ids:[],parts:[],element:void 0});if(!s.ids.includes(r)){var o=i.source,c=s.ids.length;if(s.ids.push(r),n&&(s.element=s.element||document.querySelector("style[data-group="+a+"]")),!s.element){var d=s.element=document.createElement("style");d.type="text/css",i.media&&d.setAttribute("media",i.media),n&&(d.setAttribute("data-group",a),d.setAttribute("data-next-index","0")),e.appendChild(d)}if(n&&(c=parseInt(s.element.getAttribute("data-next-index")),s.element.setAttribute("data-next-index",c+1)),s.element.styleSheet)s.parts.push(o),s.element.styleSheet.cssText=s.parts.filter(Boolean).join("\n");else{var u=document.createTextNode(o),h=s.element.childNodes;h[c]&&s.element.removeChild(h[c]),h.length?s.element.insertBefore(u,h[c]):s.element.appendChild(u)}}}}}var script={props:{source:{type:Array,required:!0},width:{type:[Number,String],default:640},height:{type:[Number,String],default:480},box:{type:Object,default:function(){return{width:100,height:50,margin:10,space:80}}},defaultPairs:{type:Array,default:function(){return[]}}},data:function(){return{active:{},pairs:[],dragIndex:null,dragCategoryIndex:null,dragY:0,startObject:{categoryIndex:-1,nameIndex:-1},endObject:{categoryIndex:-1,nameIndex:-1}}},mounted:function(){Array.isArray(this.source)&&0===this.pairs.length&&(this.pairs=this.defaultPairs)},computed:{hoveredObjects:{get:function(){return{startObject:this.startObject,endObject:this.endObject}},set:function(e){var t=e.line;e.hoverState?(this.startObject.categoryIndex=t.start.categoryIndex,this.startObject.nameIndex=t.start.nameIndex,this.endObject.categoryIndex=t.end.categoryIndex,this.endObject.nameIndex=t.end.nameIndex):(this.startObject.categoryIndex=-1,this.startObject.nameIndex=-1,this.endObject.categoryIndex=-1,this.endObject.nameIndex=-1)}},lines:function(){var e=this;return this.pairs.map(function(t){return{start:Object.assign(t.start,e.findElementIndex(t.start)),end:Object.assign(t.end,e.findElementIndex(t.end))}})},dropIndex:function(){return Math.floor(this.dragY/(this.box.height+this.box.margin))},dragLineY:function(){return(this.box.height+this.box.margin)*this.dropIndex-this.box.margin/2}},methods:{findElementIndex:function(e){var t=e.category,n=e.name,r=this.source.findIndex(function(e){return e.category===t});return{categoryIndex:r,nameIndex:this.source[r].elements.findIndex(function(e){return e.name===n})}},hasConnected:function(e){var t=e.start,n=e.end;return!!this.pairs.find(function(e){return e.start.category===t.category&&e.start.name===t.name&&e.end.category===n.category&&e.end.name===n.name})},onStartClicked:function(e,t){this.$set(this.active,"category",e),this.$set(this.active,"name",t)},onEndClicked:function(e,t){if(this.active.category&&this.active.name){var n=this.findElementIndex({category:this.active.category,name:this.active.name});this.findElementIndex({category:e,name:t}).categoryIndex-n.categoryIndex==1&&(this.hasConnected({start:this.active,end:{category:e,name:t}})||(this.pairs.push({start:{category:this.active.category,name:this.active.name},end:{category:e,name:t}}),this.active={},this.noticeToParent()))}},onLineClicked:function(e){this.removeLine(e)},onDragStarted:function(e,t,n){this.dragCategoryIndex=e,this.dragIndex=t,this.dragY=n.layerY},onDragging:function(e){null!==this.dragCategoryIndex&&(this.dragY=e.layerY)},onDropped:function(){null!==this.dragCategoryIndex&&(this.source[this.dragCategoryIndex].elements=moveAt({array:this.source[this.dragCategoryIndex].elements,index:this.dragIndex,at:this.dropIndex-(this.dragIndex<this.dropIndex?1:0)}),this.onMouseLeft(),this.noticeSourceToParent())},onMouseLeft:function(){this.dragCategoryIndex=null,this.dragIndex=null},removeLine:function(e){this.pairs=this.pairs.filter(function(t){return t.start.category!==e.start.category||t.start.name!==e.start.name||t.end.category!==e.end.category||t.end.name!==e.end.name}),this.changeClassToBothCircle(e,!1),this.noticeToParent()},changeClassToBothCircle:function(e,t){this.hoveredObjects={line:e,hoverState:t}},checkHoveredObject:function(e,t,n){return e===this.hoveredObjects[n].categoryIndex&&t===this.hoveredObjects[n].nameIndex},noticeToParent:function(){this.$emit("updatedList",this.pairs)},noticeSourceToParent:function(){this.$emit("updatedSource",this.source)},noticeToUpdatePairs:function(){this.$emit("updatedPairs",this.source)},categoryX:function(e){return(this.box.width+this.box.space)*e},elementY:function(e){return(this.box.height+this.box.margin)*e},elementTransform:function(e){return"translate(0, "+this.elementY(e)+")"},categoryTransform:function(e){return"translate("+this.categoryX(e)+", 0)"},updatePairs:function(e){this.pairs=e}}},__vue_script__=script,__vue_render__=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{attrs:{width:e.width,height:e.height,xmlns:"http://www.w3.org/2000/svg"},on:{mouseup:function(t){e.onDropped()},mousemove:e.onDragging,mouseleave:function(t){e.onMouseLeft()}}},[n("g",{attrs:{transform:"translate(20, 20)"}},[e._l(e.lines,function(t){return n("line",{attrs:{x1:e.categoryX(t.start.categoryIndex)+e.box.width,y1:e.elementY(t.start.nameIndex)+e.box.height/2,x2:e.categoryX(t.end.categoryIndex),y2:e.elementY(t.end.nameIndex)+e.box.height/2,"stroke-width":"10",stroke:"rgb(119, 0, 255)"},on:{click:function(n){e.onLineClicked(t)},mouseover:function(n){e.changeClassToBothCircle(t,!0)},mouseleave:function(n){e.changeClassToBothCircle(t,!1)}}})}),e._l(e.source,function(t,r){return n("g",{attrs:{transform:e.categoryTransform(r)}},[e.dragCategoryIndex===r?n("line",{attrs:{x1:-20,y1:e.dragLineY,x2:e.box.width+20,y2:e.dragLineY,"stroke-width":"2",stroke:"rgb(100, 0, 255)"}}):e._e(),e._l(t.elements,function(i,a){return[n("g",{attrs:{transform:e.elementTransform(a)}},[n("g",{on:{mousedown:function(t){e.onDragStarted(r,a,t)}}},[n("rect",{attrs:{x:"0",y:"0",height:e.box.height,width:e.box.width,"stroke-width":"1.5",stroke:e.dragCategoryIndex===r&&e.dragIndex===a?"rgb(100, 0, 255)":"#000",fill:e.dragCategoryIndex===r&&e.dragIndex===a?"rgb(100, 0, 255)":"#fff"}}),n("foreignObject",{attrs:{width:e.box.width,height:e.box.height}},[e._t("default",null,{element:i,categoryIndex:r,elementIndex:a,xmlns:"http://www.w3.org/1999/xhtml"})],2)],1),n("g",[r!==e.source.length-1?n("circle",{class:{active:e.active.category===t.category&&e.active.name===i.name,hover:e.checkHoveredObject(r,a,"startObject")},attrs:{cx:e.box.width,cy:e.box.height/2,r:"10"},on:{click:function(n){e.onStartClicked(t.category,i.name)}}}):e._e(),0!==r?n("circle",{class:{active:!1,hover:e.checkHoveredObject(r,a,"endObject")},attrs:{cx:0,cy:e.box.height/2,r:"10"},on:{click:function(n){e.onEndClicked(t.category,i.name)}}}):e._e()])])]})],2)})],2)])},__vue_staticRenderFns__=[];__vue_render__._withStripped=!0;var __vue_inject_styles__=function(e){e&&e("data-v-61cf8bf9_0",{source:"\nforeignObject[data-v-61cf8bf9] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n/*# sourceMappingURL=linklist.vue.map */",map:{version:3,sources:["/Users/eg00018/dev/vue-linklist/src/linklist.vue","linklist.vue"],names:[],mappings:";AA+QA;EACA,0BACA;KADA,uBACA;MADA,sBACA;UADA,kBACA;CAAA;;AC9QA,wCAAwC",file:"linklist.vue",sourcesContent:[null,"foreignObject {\n  user-select: none; }\n\n/*# sourceMappingURL=linklist.vue.map */"]},media:void 0})},__vue_scope_id__="data-v-61cf8bf9",__vue_module_identifier__=void 0,__vue_is_functional_template__=!1,linklist=__vue_normalize__({render:__vue_render__,staticRenderFns:__vue_staticRenderFns__},__vue_inject_styles__,__vue_script__,__vue_scope_id__,__vue_is_functional_template__,__vue_module_identifier__,__vue_create_injector__,void 0);export default linklist;
