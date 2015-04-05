/*
 Copyright (c) 2015, Ben Schulz
 License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
*/
var u;
(function(z){"function"===typeof define&&define.amd?define(["require","knockout","ko-data-source","ko-indexed-repeat"],z):window["ko-grid"]=z(function(q,r){if(!Array.isArray(q)||1!==q.length||"string"!==typeof q[0]||"function"!==typeof r)throw Error("Assertion error.");var v=window.ko.bindingHandlers.grid.config=window.ko.bindingHandlers.grid.config||{};r(v[q[0]])},window.ko)})(function(z,q){var r,v,F,G,A,H,D;r=function(){var a;a=function(){function a(h,l){return Object.prototype.hasOwnProperty.call(h,l)}
return{Xa:function(a,l){if(a===l)return!0;var g=!!l&&"function"===typeof l.valueOf;return!!a&&"function"===typeof a.valueOf&&g&&a.valueOf()===l.valueOf()},extend:function(a,l){Array.prototype.slice.call(arguments,1).forEach(function(g){for(var d=Object.keys(g),b=0,c=d.length;b<c;b++){var e=d[b],f=Object.getOwnPropertyDescriptor(g,e);void 0!==f&&f.enumerable&&Object.defineProperty(a,e,f)}});return a},aa:function(h,l){for(var g in h)a(h,g)&&l(g,h[g])},r:a,ub:function(h,l){var g={},d;for(d in h)a(h,
d)&&(g[d]=l(h[d],d,h));return g}}}();return function(a){return a}(function(a,h,l){return{f:a,c:h,H:l}}(function(a){function h(b){return b.filter(function(b,e,f){return f.lastIndexOf(b)===e})}function l(b,c){for(var e=b.length,f=-1,a=0;a<e;++a)if(c(b[a])){if(0<=f)throw Error("Multiple elements match the predicate.");f=a}return f}function g(b,c){return b&&"function"===typeof b.valueOf&&c&&"function"===typeof c.valueOf?b.valueOf()<=c.valueOf()?b.valueOf()<c.valueOf()?-1:0:1:b<=c?b<c?-1:0:1}function d(b,
c){var e=b.length,f=Array(e),a=Array(e),k;for(k=0;k<e;++k)f[k]=k,a[k]=b[k];k=b;b=a;a=k;f.sort(function(n,x){return c(b[n],b[x])||n-x});for(k=0;k<e;++k)a[k]=b[f[k]];return a}return{contains:function(b,c){return 0<=b.indexOf(c)},jb:function(b){if(50<b.length){for(var c=b.length,e={},f,d=0;d<c;++d)if(f=b[d],"string"===typeof f)if(a.r(e,f))break;else e[f]=!0;else if(b.lastIndexOf(f)!==d)break;if(!(d>=c)){for(var k=b.slice(0,d);d<c;++d)f=b[d],"string"===typeof f?a.r(e,f)||(e[f]=!0,k.push(f)):b.lastIndexOf(f)===
d&&k.push(f);b=k}}else b=h(b);return b},$:function(b,c){return Array.prototype.concat.apply([],b.map(c))},Ab:function(b,c){var e=l(b,c);if(0>e)throw Error("None of the elements matches the predicate.");return b[e]},Bb:function(b,c){var e=l(b,c);return 0<=e?b[e]:null},Na:function(b,c){var e=c||g;window.chrome?e=d(b,e):(b.sort(e),e=b);return e}}}(a),a,{sa:function(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},cb:function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},
format:function(a){var h=arguments;return a.replace(/{(\d+)}/g,function(a,g){var d=parseInt(g,10)+1;return typeof h.length<=d?a:h[d]})}}))}();v=function(a,m){function h(a){var d={key:["char","charCode","key","keyCode"],mouse:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" ")},d="altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp type view which".split(" ").concat(d[a.type.substr(0,3)]||[]).concat(d[a.type.substr(0,
5)]||[]);this.I=a;this.b=a.defaultPrevented;d.forEach(function(b){return Object.defineProperty(this,b,{get:function(){return a[b]}})}.bind(this))}function l(a,d){this.ba=a;this.Ma=d}h.prototype={preventDefault:function(){this.b=!0;return this.I.preventDefault()},l:function(){this.b=!0},get defaultPrevented(){return this.b}};h.prototype=a.c.extend({},{get defaultPrevented(){return this.defaultPrevented},preventDefault:h.prototype.preventDefault,preventApplicationButAllowBrowserDefault:h.prototype.l},
h.prototype);return function(g){function d(c,e,f){function d(b){b=Array.prototype.slice.call(c.querySelectorAll(b)).filter(function(b){return m.ya(b,e.target)});return b.length?b[b.length-1]:void 0}var k=m.ta.bind(null,c),n=b.map(function(b){var n=b.Ma?d(b.Ma):c;return{ba:b.ba,match:n,depth:n?k(n):-1}}).filter(function(b){return!!b.match});a.f.Na(n,function(b,n){return n.depth-b.depth});n.forEach(function(b){b.ba.apply(c,f)})}g=g||function(b){return[b]};var b=[];this.s=function(a,e){var d=1<arguments.length?
a:void 0;e=1<arguments.length?e:a;b.push(new l(e,d));return{dispose:function(){e&&(b.splice(b.indexOf(e),1),e=null)}}};this.ea=function(b){return{Y:function(a){var f=m.element.qa(a.target,b);f&&(a=new h(a),d(f,a,g(a,f)))}}}}}(r,function(){return function(a){return a}(function(){function a(a,g){return!!(a.compareDocumentPosition(g)&16)}var m=window.Element,h=m.prototype.webkitMatchesSelector||m.prototype.mozMatchesSelector||m.prototype.msMatchesSelector||m.prototype.matches;return{ta:function(a,g){for(var d=
0;g;){if(g===a)return d;g=g.parentNode;++d}throw Error("The given node is not part of the subtree.");},ya:function(l,g){return l===g||a(l,g)},Cb:a,element:{qa:function(a,g){do{if(h.call(a,g))return a;a=a.parentElement}while(a);return null},matches:function(a,g){return h.call(a,g)}}}}())}());F=function(){var a=/^[a-z]+(-[a-z]+)*$/,m=/\x3c!--(?:(before|after):)?([a-z]+(-[a-z]+)*)--\x3e*/g;return function(h){function l(a,c){c=c||function(b,a){return a+b};return function(k){var n=g(k,a);return{L:function(a,
k){var f=k?a:null,C=(k=k?k:a)?f:null,E=k,f=c;C&&b(C,2);d(E);C=C?g(C,3)+E+g(C,4):E;f=f(n,C);e=e.replace(n,f)}}}}function g(a,b){function k(b){if(c[a]!==b)throw Error("Operation is not defined for placeholder `"+a+"`.");}if(!c[a])throw Error("Unknown placeholder id `"+a+"`.");var n="\x3c!--"+a+"--\x3e",d="\x3c!--before:"+a+"--\x3e",e="\x3c!--after:"+a+"--\x3e";switch(b){case 1:return k(1),delete c[a],n;case 2:return k(1),n;case 3:return k(2),d;case 4:return k(2),e;case 5:case 6:return 1===c[a]?n:5===
b?e:d}throw Error("Assertion error. Unkown operator: `"+b+"`");}function d(a){for(var c;c=m.exec(a);){var k=c[1],n="before"===k;c=c[2];if(k&&1!==(a.match(new RegExp((n?"after":"before")+":"+c,"g"))||[]).length)throw Error("Multiple or unmatched before-/after-placeholders for placeholder id `"+c+"`.");k&&!n||b(c,k?2:1)}}function b(b,d){if(!a.test(b))throw Error("Invalid placeholder id `"+b+"`");if(c[b])throw Error("Placeholder id `"+b+"` is already taken.");c[b]=d}var c={},e=h;d(e);this.replace=function(a){return{ha:l(1,
function(a,b){return b})(a).L}};this.Oa=function(a){return{append:l(5)(a).L,Ja:l(6,function(a,b){return a+b})(a).L}};this.Za=function(){return e.replace(m,"")}}}();G=function(a,m,h){function l(a){return null===a?"":""+a}function g(d,b,c){this.id=this.id=c.id;this.property=this.da=c.property||this.id;this.userDefined=this.ga=!1!==c.ga;this.n=!c.hidden;this.visible=this.visible;this.label=this.label=a.observable(c.label);this.width=this.width=a.observable(c.width);this.widthInPixels=this.P=function(){var a=
this.width();if("px"!==a.substr(-2))throw Error("The only currently supported column width values are absolute pixel lengths.");return parseInt(a.substring(0,a.length-2),10)}.bind(this);this.wa=a.observableArray(c.headerClasses||c.classes||[]);this.pa=a.observableArray(c.cellClasses||c.classes||[]);this.b=a.observableArray(c.footerClasses||c.classes||[]);this.headerClasses=this.wa;this.cellClasses=this.pa;this.footerClasses=this.b;this.metadata=this.I=b.columnMetadataSupplier?b.columnMetadataSupplier(d.Ya,
c):{};this.renderValue=this.F=b.cellValueRenderer?b.cellValueRenderer.bind(void 0,this):l;this.eb=function(a){this.F=a(this.F)}.bind(this);this.l=function(a){a=this.la(a,{e:this.V,update:this.W});if(!a||!a.e||!a.update)throw Error("The cell value binding must define an `init` as well as an `update` method.");this.V=a.e;this.W=a.update}.bind(this);this.la=function(a,b){var c=a(m.c.extend({e:b.e,update:b.update},{init:b.e,update:b.update}));return{e:c.e||c.init,update:c.update||c.update}};this.overrideValueRendering=
this.eb;this.overrideValueBinding=this.l}a.bindingHandlers.__gridColumn={init:function(){},update:function(a,b){var c=b();a.style.width=c.width()}};return{e:function(a){a.replace("columns").ha(h)},m:function(d,b,c){function e(a){a=new g(c,b,a);b.columnInitializer&&b.columnInitializer(a);return a}var f=[];this.all=this.all=a.observableArray(d.columns.map(e));this.byId=this.oa=function(a){var b=this.Pa(a);if(!b)throw Error("The column id `"+a+"` is undefined.");return b}.bind(this);this.tryById=this.Pa=
function(a){var b=this.all().filter(function(b){return b.id===a});if(1<b.length)throw Error("Assertion error: Multiple columns with id `"+a+"`.");return b[0]}.bind(this);var h=a.observable(this.all().filter(function(a){return a.n}));this.displayed=this.h=function(){return h()};this.show=function(a){this.G(function(b){return b.n||b===a})}.bind(this);this.nb=function(a){this.G(function(b){return b.n&&b!==a})}.bind(this);this.show=this.show;this.hide=this.nb;this.reorder=this.zb=function(a){var b=this.all().slice(),
c=[];a.forEach(function(a){b.splice(b.indexOf(a),1);c.push(a)});if(b.length)throw Error("The new column order must contain all columns.");this.all(c);this.G(function(a){return a.n})}.bind(this);this.showOnlyThoseWhich=this.G=function(a){var b=this.all();a=b.filter(a);b.forEach(function(a){a.n=!1});a.forEach(function(a){a.n=!0});h(a)}.bind(this);this.combinedWidth=this.ab=a.pureComputed(function(){for(var a=0,b=this.h(),c=0;c<b.length;++c)a+=b[c].P();return a}.bind(this));this.add=this.add=function(a){a=
e({ga:!1,id:"$"+a.id,label:a.label,hidden:a.hidden||!1,width:a.width});this.all.unshift(a);this.G(function(a){return a.n});return a}.bind(this);this.o=function(){f.forEach(function(a){a.dispose()})}}}}(q,r,'<colgroup class="ko-grid-colgroup">\n    <col class="ko-grid-col" data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\' }" data-repeat-bind="__gridColumn: column()">\n</colgroup>');A=function(a){var m,h,l;m=function(a){return function(d,b){return a.c.extend(d,
{get stringifyable(){return b()}})}}(a);h=function(a,d){function b(){return 0}function c(a,b){return"string"===typeof a&&"string"===typeof b?a.localeCompare(b):a<=b?a<b?-1:0:1}function e(b,c){a.c.extend(b,{get onResultOf(){return this.D},get reverse(){return this.reverse},get callable(){return this.C}},{get D(){return function(a){return f(a,b)}},get reverse(){return function(){return c||h(b)}},get C(){return b}})}function f(a,b){function c(d,e){return b(a(d),a(e))}e(c);d(c,function(){return{type:"by-function-comparator",
"function":a.stringifyable,comparator:b.stringifyable}});return c}function h(a){function b(c,d){return-a(c,d)}e(b,a);d(b,function(){return{type:"reversed-comparator",comparator:a.stringifyable}});return b}e(c);d(c,function(){return{type:"natural-comparator"}});e(b);d(b,function(){return{type:"indifferent-comparator"}});return{qb:b,b:c}}(a,m);l=function(a,d){function b(b){a.c.extend(b,{get callable(){return this.C}},{get C(){return b}})}return{xb:function(a){function e(b){return b[a]}b(e);d(e,function(){return{type:"property-accessor",
propertyName:a}});return e}}}(a,m);a=function(a,d){function b(){return!0}function c(){return!1}function e(b,c){a.c.extend(b,{get and(){return this.B},get negate(){return this.Ba},get onResultOf(){return this.D},get or(){return this.O},get callable(){return this.C}},{get B(){return function(a){return f([b,a])}},get Ba(){return function(){return c||k(b)}},get D(){return function(a){return h(a,b)}},get O(){return function(a){return n([b,a])}},get C(){return b}})}function f(a){function c(b){for(var d=
0,e=a.length;d<e;++d)if(!a[d](b))return!1;return!0}if(!a.length)return b;e(c);d(c,function(){return{type:"and-predicate",components:a.map(function(a){return a.stringifyable})}});return c}function h(a,b){function c(d){return b(a(d))}e(c);d(c,function(){return{type:"by-function-predicate","function":a.stringifyable,predicate:b.stringifyable}});return c}function k(a){function b(c){return!a(c)}e(b,a);d(b,function(){return{type:"negated-predicate",predicate:a.stringifyable}});return b}function n(a){function b(c){for(var d=
0,e=a.length;d<e;++d)if(a[d](c))return!0;return!1}if(!a.length)return c;e(b);d(b,function(){return{type:"or-predicate",components:a.map(function(a){return a.stringifyable})}});return b}e(c);d(c,function(){return{type:"always-false-predicate"}});e(b);d(b,function(){return{type:"always-true-predicate"}});return{b:c,l:b,B:f,I:function(a,b){function c(b){return a(b)}e(c);d(c,b);return c},O:n,yb:function(a){function b(c){return a.test(c)}e(b);d(b,function(){return{type:"regular-expression-predicate",regularExpression:a.source,
caseSensitive:!a.ignoreCase,multiline:a.multiline}});return b}}}(a,m);return function(a){return a}({v:h,K:l,j:a,tb:m,Db:function(a,d){return"function"===typeof d||"object"===typeof d?d.stringifyable||d:d}})}(r);A=function(a,m,h,l,g){function d(a){this.k(function(b){b();this.u=a.element.querySelector(".ko-grid-tbody")}.bind(this));return function(){this.u=null}.bind(this)}function b(){var b=[],c={};this.rows=this.rows=c;c.h=a.observableArray([]);c.displayed=c.h;c.Z=a.observable(!1).extend({Mb:"always"});
c.displayedSynchronized=c.Z;c.__handleDisplayedRowsDeviate=function(){this.rows.Z(!1)}.bind(this);c.__handleDisplayedRowsSynchronized=function(){this.rows.Z(!0)}.bind(this);var d=this.view;c.__dirty=d.dirty;b.push(d.observables.subscribe(function(a){c.h(a)}));c.h(d.observables());var e=[];c.__classify=function(a){var b=e.map(function(b){return b(a)});return Array.prototype.concat.apply([],b)};c.rb=function(a){e.push(a)};c.installClassifier=c.rb;return function(){b.forEach(function(a){a.dispose()})}}
function c(){function b(c,d){var e=a.contextFor(d),n=e.row(),e=e.column();return[c,n[e.da],n,e]}function c(a){return function(b){a.ea(".ko-grid-cell").Y(b);return!b.defaultPrevented}}var d=new l(b),e=new l(b),n=new l(b),f=new l(b);this.wb=d.s.bind(d);this.Ca=e.s.bind(e);this.Da=n.s.bind(n);this.vb=f.s.bind(f);this["onCellMouseDown "]=this.wb;this["onCellClick "]=this.Ca;this["onCellDoubleClick "]=this.Da;this["onCellContextMenu "]=this.vb;this.k(function(a){a();this.u.addEventListener("mousedown",
c(d));this.u.addEventListener("click",c(e));this.u.addEventListener("dblclick",c(n));this.u.addEventListener("contextmenu",c(f))}.bind(this));return function(){}}function e(b){function c(a,b){for(var d=a.firstChild,e=-1;d;){if(d.nodeType===p&&"TD"===d.tagName&&0<=(" "+d.className+" ").indexOf("td")&&++e===b)return d;d=d.nextSibling}throw Error("Column `"+b+"` does not exist.");}var d=function(a){for(var b=this.u.firstChild,c=-1;b;){if(b.nodeType===p&&"TR"===b.tagName&&0<=(" "+b.className+" ").indexOf("ko-grid-row")&&
++c===a)return b;b=b.nextSibling}throw Error("Row `"+a+"` does not exist.");}.bind(this),e=0,g={};this.rows.__handleElementRecycling=function(a,b){h(a,b,function(a,b,c){a["__@__hijacked"]=null;f(a,b,c)})};this.rows.__handleElementRecycled=function(a,b){h(a,b,function(a,b,c,d){d.element=a;d.fa=b;a["__@__hijacked"]=d;f(a,b,c);y(a,b,c)})};var h=function(c,d,n){if(e){var f=d.row();d=this.ca(a.unwrap(f[b.primaryKey]));m.c.r(g,d)&&g[d].forEach(function(a){var d=a.p,e=b.g.h().indexOf(d);n(c.children[e],
f,d,a)})}}.bind(this);this.lookupCell=this.Aa=function(h,p){function x(a){function b(){1===d.length?delete g[B]:d.splice(d.indexOf(c),1);--e;c.element["__@__hijacked"]===c&&(c.element["__@__hijacked"]=null,f(c.element,c.fa,c.p),y(c.element,c.fa,c.p))}if(w["__@__hijacked"])throw Error("Illegal state: This cell is already hijacked.");a=p.la(a||function(a){return a},{e:p.V||k,update:p.W||n});var c=w["__@__hijacked"]={element:w,fa:h,p:p,e:a.e,update:a.update},d=g[B]=g[B]||[];d.push(c);++e;f(w,h,p);y(w,
h,p);return m.c.extend({b:b,dispose:b},{dispose:b,release:b})}var B=this.ca(a.unwrap(h[b.primaryKey])),l=J(this.rows.h()),I=b.g.h().indexOf(p),w=c(d(l),I);return m.c.extend({element:w,ob:x},{element:w,hijack:x})}.bind(this);return function(){}}function f(b,c,d){for(var e=b["__@__hijacked"];b.firstChild;)a.removeNode(b.firstChild);(e&&e.e||d.V||k)(b,c,d)}function y(a,b,c){var d=b[c.da],e=a["__@__hijacked"],f=c.pa.peek().join(" ");a.className="ko-grid-td ko-grid-cell "+f;(e&&e.update||c.W||n)(a,d,b,
c)}function k(a){a.insertBefore(B.createTextNode(""),a.firstChild)}function n(b,c,d,e){for(b=b.firstChild;b.nodeType!==x;)b=b.nextSibling;b.nodeValue=e.F(a.unwrap(c))}var x=window.Node.TEXT_NODE,p=window.Node.ELEMENT_NODE,B=window.document;a.bindingHandlers.__gridRow={init:function(){},update:function(a,b){var c=b(),d=c.classify,e=c.row(),c=1===c.index()%2?["ko-grid-tr","ko-grid-row","alternate"]:["ko-grid-tr","ko-grid-row"],d=d(e);a.className=c.concat(d).join(" ")}};a.bindingHandlers.__gridCell=
{init:function(a,b){var c=b();f(a,c.row,c.column());return{controlsDescendantBindings:!0}},update:function(a,b){var c=b(),d=c.row(),c=c.column.peek();y(a,d,c)}};return{e:function(a){a.replace("body").ha("body",g);a.Oa("table").Ja("<div class=\"ko-grid-load-indicator\" data-bind=\"style: { display: data.rows.__dirty() ? 'block' : 'none' }\">Loading&hellip;</div>")},m:function(n,f,g){var p=[];this.source=n.dataSource;this.valueSelector=this.Qa=n.valueSelector||f.valueSelector||function(a){return a};
this.observableValueSelector=this.ca=n.observableValueSelector||f.observableValueSelector||this.Qa;this.predicates=this.j=a.observableArray(n.filters||[]);this.predicate=this.Ia=a.pureComputed(function(){return h.j.B(this.j().map(a.unwrap))}.bind(this));this.comparator=this.ra=a.observable(h.v.qb);this.offset=this.offset=a.observable(0);this.limit=this.za=a.observable(Number.POSITIVE_INFINITY);n=this.source.openView(function(a){return a.filteredBy(this.Ia).sortedBy(this.ra).offsetBy(this.offset).limitedTo(this.za)}.bind(this));
p.push(n.dispose.bind(n));this.view=this.view=n;this.A=function(){};this.k=function(a){var b=this.A;this.A=function(){a(b)}}.bind(this);p.push(d.call(this,g));p.push(b.call(this));p.push(c.call(this));p.push(e.call(this,g));this.o=function(){p.forEach(function(a){a()})}}}}(q,r,A,v,'<tbody class="ko-grid-tbody" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    <tr class="ko-grid-tr ko-grid-row"\n        data-bind="indexedRepeat: {\n            forEach: data.rows.displayed,\n            indexedBy: function(r) { return grid.data.observableValueSelector(ko.unwrap(r[grid.primaryKey])); },\n            as: \'row\',\n            at: \'rowIndex\',\n            beforeElementRecycling: data.rows.__handleElementRecycling,\n            afterElementRecycled: data.rows.__handleElementRecycled,\n            allowDeviation: true,\n            onDeviation: data.rows.__handleDisplayedRowsDeviate,\n            onSynchronization: data.rows.__handleDisplayedRowsSynchronized }"\n        data-repeat-bind="__gridRow: { classify: grid.data.rows.__classify, row: row, index: rowIndex }">\n\n        <td data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\', allowElementRecycling: false }"\n            data-repeat-bind="__gridCell: { row: row, column: column }"></td>\n    </tr>\n</tbody>');
H=function(a,m,h,l){function g(b){this.id=this.id="column-header-"+b.id;this.element=this.element=a.observable(null);this.rowSpan=this.rowSpan=a.observable(1);this.columnSpan=this.q=a.observable(1);this.label=this.label=b.label;this.column=this.p=b;this.columns=this.g=[b];this.T=function(a){this.rowSpan(a)}.bind(this)}function d(b){this.id=this.id="column-group-header-"+(b.id||"@__"+ ++k);this.element=this.element=a.observable(null);this.Wa=b;this.rowSpan=this.rowSpan=a.observable(b.height);this.columnSpan=
this.q=a.observable(1);this.label=this.label=a.observable(b.label);this.columns=this.g=[];this.T=function(a){this.g=[a];this.q(1)}.bind(this)}function b(a){function b(a){a.$a.forEach(function(b){var c=d[b];if(!c)d[b]=a;else if(c!==a)throw Error("Column `"+b+"` is element of column group `"+c.label+"` as well as `"+a.label+"`.");});a.J&&b(a.J)}var d={};m.f.$(a,c.bind(this,null)).forEach(function(a){b(a)});return d}function c(a,b){var d=e(b),f=b.elements.filter(function(a){return"string"!==typeof a}),
g=b.elements.filter(function(a){return"string"===typeof a}),d={id:b.id,label:b.label,J:a,depth:a?a.depth+1:0,height:a?a.Ga-d:1,Ga:d,$a:g};return f.length?m.f.$(f,c.bind(this,d)):d}function e(a){a=a.elements.filter(function(a){return"string"!==typeof a});return 1+Math.max.apply(Math,[0].concat(a.map(e)))}var f=window.document,y=window.Node,k=0;a.bindingHandlers.__gridHeader={init:function(b,c){var d=c()();d.element(b);a.utils.domNodeDisposal.addDisposeCallback(b,function(){d.element(null)});for(var e=
b.firstChild;e;){var g=e;g.nodeType===y.TEXT_NODE&&a.removeNode(g);e=e.nextSibling}b.insertBefore(f.createTextNode(""),b.firstChild);return{controlsDescendantBindings:!0}},update:function(a,b){var c=b()(),d=c.id.replace(/[\s]/g,"_");a.className=c.p?"ko-grid-th ko-grid-column-header "+d+" "+c.p.wa().join(" "):"ko-grid-th ko-grid-column-group-header "+d;d=c.g.map(function(a){return a.P()}).reduce(function(a,b){return a+b})+"px";a.style.width=d;a.style.maxWidth=d;a.rowSpan=c.rowSpan();a.colSpan=c.q();
for(d=a.firstChild;d.nodeType!==y.TEXT_NODE;)d=d.nextSibling;d.nodeValue=c.label()}};return{e:function(a){a.replace("head").ha(l)},m:function(c,e,f){function k(a,b,c){if(!a)return[];if(b[a.depth]&&b[a.depth].Wa===a){var e=a;do{var f=b[e.depth];f.g.push(c);f.q(f.q()+1);e=e.J}while(e);return[]}b.length=a.depth;var e=k(a.J,b,c),g=f=a.depth;a=l(y,new d(a));a.T(c);e[f]=b[g]=a;return e}function l(a,b){var c=b.id;return a[c]=a[c]||b}var m=b(c.columnGroups||[]),y={},q={},t=[];this.__rows=this.U=a.computed(function(){var b=
f.g.h(),c=0;b.forEach(function(a){a=m[a.id];c=Math.max(c,a?a.depth+a.Ga:0)});t.length=c+1;for(var d=0;d<t.length;++d)t[d]=t[d]||a.observableArray(),t[d].__rowId="header-row-"+d,t[d].valueWillMutate(),t[d]().length=0;var e=[];b.forEach(function(a){var b=m[a.id],d=b?b.depth+b.height:0;e.length=d;var f=l(q,new g(a));f.T(c-d+1);t[d]().push(f);a=k(b,e,a);for(b=0;b<a.length;++b)a[b]&&t[b]().push(a[b])});t.forEach(function(a){a.valueHasMutated()});return t});this.all=this.all=a.computed(function(){var a=
[];this.U().forEach(function(b){Array.prototype.push.apply(a,b())});return a}.bind(this));this.forColumn=this.mb=function(a){a="column-header-"+a.id;if(!Object.prototype.hasOwnProperty.call(q,a))throw Error("Es existiert kein Header f\u00fcr die gegebene Spalte.");return q[a]};var r=new h(function(b,c){return[b,a.contextFor(c).header()]});this.__handleClick=function(a,b){r.ea(".ko-grid-column-header, .ko-grid-column-group-header").Y(b);return!b.defaultPrevented};this.Fa=r.s.bind(r);this.Ea=function(a,
b){function c(a,d){d instanceof g&&b.apply(this,arguments)}var d=1<arguments.length;b=d?b:a;r.s.apply(r,d?[a,c]:[c])};this.onHeaderClick=this.Fa;this.onColumnHeaderClick=this.Ea;this.o=function(){this.U.dispose();this.all.dispose()}.bind(this)}}}(q,r,v,'<thead class="ko-grid-thead" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    \x3c!--before:headers--\x3e\n    <tr class="ko-grid-tr ko-grid-headers"\n        data-bind="indexedRepeat: { forEach: headers.__rows, indexedBy: \'__rowId\', as: \'headerRow\' }"\n        data-repeat-bind="click: headers.__handleClick">\n\n        <th class="ko-grid-th"\n            data-bind="indexedRepeat: { forEach: headerRow(), indexedBy: \'id\', as: \'header\' }"\n            data-repeat-bind="__gridHeader: header"></th>\n    </tr>\n    \x3c!--after:headers--\x3e\n</thead>');
D=function(a,m,h,l,g){a=a.bindingHandlers.grid=a.bindingHandlers.grid||{};return a.core=a.core||{columns:m,data:h,headers:l,layout:g}}(q,G,A,H,function(a){function m(a,b,c,e){var f=a.element,g=f.querySelector(".ko-grid-table-scroller-padding"),h=f.querySelector(".ko-grid-table-scroller"),n=f.querySelector(".ko-grid-thead"),m=f.querySelector(".ko-grid-tfoot"),p=!1;return function(a){if(!p)try{b(p=!0);var d=h.scrollLeft;a&&a();c.forEach(function(a){a.call(f)});l(f,function(){g.style.borderTopWidth=
Math.max(n.clientHeight,0)+"px";g.style.borderBottomWidth=Math.max(m.clientHeight,0)+"px"});h.scrollLeft=d;e.forEach(function(a){a.call(f)})}finally{b(!1),p=!1}}}function h(a){a=a.element;var b=a.querySelector(".ko-grid-table-scroller"),c=a.querySelector(".ko-grid-thead"),e=a.querySelector(".ko-grid-tfoot");b.addEventListener("scroll",function(){var a=-b.scrollLeft+"px";c.style.left=a;e.style.left=a})}function l(a,b){if(a.offsetWidth&&a.offsetHeight)b();else{var c=a.parentNode,e=g.createComment("placeholder");
c.replaceChild(e,a);var f=a.style.position;a.style.position="absolute";a.style.visibility="hidden";g.body.appendChild(a);try{b()}finally{c.replaceChild(a,e),a.style.position=f,a.style.visibility="visible"}}}var g=window.document;return{e:function(){},m:function(d,b,c){function e(a){a&&a()}var f=a.observable(!1);this.recalculate=this.La=function(a){e(a)};var l=a.computed(function(){f()||(c.g.h().forEach(function(a){a.width()}),e())}),k=[],n=[];this.na=function(a){k.push(a)};this.ma=function(a){n.push(a)};
this.beforeRelayout=this.na;this.afterRelayout=this.ma;this.A=function(){h.call(this,c);e=m(c,f,k,n);c.Ha(e)}.bind(this);this.determineCellDimensions=this.ib=function(a){var b=g.createElement("div");b.className="ko-grid-td ko-grid-cell";b.appendChild("string"===typeof a?g.createTextNode(a):a);b.style.position="absolute";b.style.visibility="hidden";g.body.appendChild(b);try{return{width:b.offsetWidth,height:b.offsetHeight}}finally{g.body.removeChild(b)}};this.o=function(){l.dispose()}}}}(q));(function(a,
m){function h(a,c){if(m.c.r(d,a))throw Error("Extension id or alias already in use: `"+a+"`.");d[a]=c;c.S.push(a);return c}function l(a,c){this.Ka=a;this.X=c.X||[];this.xa=c.xa||function(){};this.m=c.m;this.S=[]}var g=a.bindingHandlers.grid=a.bindingHandlers.grid||{},d=g.extensions=g.extensions||{};g.hb=function(a,c){return h(a,new l(a,c))};g.N=function(a){if(!m.c.r(d,a))throw Error("No known extension id or alias: `"+a+"`.");return d[a]};g.fb=function(a,c){return h(a,g.N(c))};g.gb=function(a,c){var d=
g.N(c);a.forEach(function(a){return h(a,d)});return d};l.prototype={get sb(){return this.S.slice()},va:function(a,c){var d=this.ka(a,function(a){throw Error("Conflicting configurations "+a.map(function(a){return"`"+a+"`"}).join(", ")+" (configuration: `"+c+"`).");});if(!d)throw Error("The extension `"+this.Ka+"` must be configured (configuration: `"+c+"`)");return a[d]},Fb:function(a){var c=this.ka(a,function(a){throw Error("Conflicting binding values "+a.map(function(a){return"`"+a+"`"}).join(", ")+
".");});return a[c]},ka:function(a,c){var d=this.S.filter(function(c){return m.c.r(a,c)});1<d.length&&c(d);return d[0]}};return d})(q,r);return function(a){return a}(function(a,m,h,l){function g(b,d){function e(){var a=k[b];d(a.bb,a.Eb,a.kb)}k[b]?e():a([b],function(a){function d(e){e=c.N(e);var f=e.Ka,k=e.va(l,b);if(!h.f.contains(m,f)){if(h.f.contains(t,f))throw Error("Dependency-Cycle: .. -> "+t.join(" -> ")+" -> "+f+" -> ..");t.push(f);e.X.forEach(d);e.xa(g,k,a);if(t.pop()!==f)throw Error("Assertion error.");
m.push(f)}}var g=new F('<div class="ko-grid">\n    \x3c!--before:grid--\x3e\n    <div class="ko-grid-table-container">\n        \x3c!--before:table--\x3e\n        <div class="ko-grid-table-scroller-padding">\n            <div class="ko-grid-table-scroller">\n                <table class="ko-grid-table" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n                    \x3c!--columns--\x3e\n                    \x3c!--head--\x3e\n                    <tfoot class="ko-grid-tfoot" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\x3c!--tfoot--\x3e</tfoot>\n                    \x3c!--body--\x3e\n                </table>\n            </div>\n        </div>\n        \x3c!--after:table--\x3e\n    </div>\n    \x3c!--after:grid--\x3e\n</div>');
f.forEach(function(b){b.e(g,a)});var l=a.extensions,m=[],t=[];Object.keys(l).forEach(d);var q="ko-grid-template-"+b;r.b(q,g.Za());k[b]={bb:a,Eb:q,kb:m};e()})}function d(a,b){this.Ya=b;this.primaryKey=this.primaryKey=b.primaryKey;this.rootElement=a;this.element=this.element=null;this.o=function(){};this.k=function(){};this.Ha=function(a){if(!this.k)throw Error("Illegal state: postApplyBindings-callbacks have been called already.");var b=this.k;this.k=function(){b();a()}}.bind(this);var c=new l;this.b=
c.s.bind(c);this["onKeyDown "]=this.b;a.addEventListener("keydown",function(a){c.ea(".ko-grid").Y(a);return!a.defaultPrevented})}var b=window.document,c=m.bindingHandlers.grid=m.bindingHandlers.grid||{},e=["columns","headers","data","layout"],f=e.map(function(a){return D[a]}),r=new m.nativeTemplateEngine;r.b=function(a,c){var d=b.createElement("script");d.id=a;d.type="text/html";d.text=c;b.querySelector("head").appendChild(d)};m.bindingHandlers.grid.init=function(a,b,f,k,l){function q(a){return"function"===
typeof a?a.apply(void 0,Array.prototype.slice.call(arguments,1)):a}var v=b(),z=v.config;g(z,function(b,f,g){var k=[],p=new d(a,v);m.utils.domNodeDisposal.addDisposeCallback(a,function(){p.o();k.forEach(function(a){a()})});h.c.aa(D,function(a,c){var d=new c.m(v,b,p);p[a]=d;p.g=p.columns;p.headers=p.headers;p.data=p.data;p.l=p.layout;"function"===typeof d.o&&k.push(d.o.bind(d))});var x=b.extensions,B=v.extensions||{},A=p.extensions=p.lb={};for(g.forEach(function(a){a=c.N(a);var d=a.Fb(B)||{},e=q(a.va(x,
z),d,v);if((!1!==e.enabled||!0===d.enabled)&&!1!==d.enabled){a.X.forEach(function(a){if(!A[a])throw Error("Dependency '"+a+"' was disabled.");});var f=new a.m(d,e,p,v,b);a.sb.forEach(function(a){A[a]=f});"function"===typeof f.dispose&&k.push(f.dispose.bind(f))}});a.firstChild;)m.removeNode(a.firstChild);g=l.createChildContext(p,"grid");m.renderTemplate(f,g,{templateEngine:r},a);var w=a.querySelector(".ko-grid");p.element=w;p.element=w;h.c.aa(x,function(a){w.className+=" with-"+h.H.sa(a)});e.forEach(function(a){p[a].A&&
p[a].A()});p.k();p.k=null});return{controlsDescendantBindings:!0}};m.bindingHandlers.grid.update=function(){};var k={};m.bindingHandlers._gridWidth={init:function(){},update:function(a,b){var c=b();a.style.width=c;a.style.maxWidth=c}};return c}(z,q,r,v))});