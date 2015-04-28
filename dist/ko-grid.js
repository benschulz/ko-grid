/*
 Copyright (c) 2015, Ben Schulz
 License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
*/
var w;
(function(z){"function"===typeof define&&define.amd?define(["require","knockout","ko-data-source","ko-indexed-repeat"],z):window["ko-grid"]=z(function(p,q){if(!Array.isArray(p)||1!==p.length||"string"!==typeof p[0]||"function"!==typeof q)throw Error("Assertion error.");var x=window.ko.bindingHandlers.grid.config=window.ko.bindingHandlers.grid.config||{};q(x[p[0]])},window.ko)})(function(z,p){var q,x,G,H,y,I,D;q=function(){var a;a=function(){function a(k,h){return Object.prototype.hasOwnProperty.call(k,h)}
return{bb:function(a,h){if(a===h)return!0;var f=!!h&&"function"===typeof h.valueOf;return!!a&&"function"===typeof a.valueOf&&f&&a.valueOf()===h.valueOf()},extend:function(a,h){Array.prototype.slice.call(arguments,1).forEach(function(f){for(var g=Object.keys(f),b=0,c=g.length;b<c;b++){var d=g[b],t=Object.getOwnPropertyDescriptor(f,d);void 0!==t&&t.enumerable&&Object.defineProperty(a,d,t)}});return a},ba:function(k,h){for(var f in k)a(k,f)&&h(f,k[f])},q:a,xb:function(k,h){var f={},g;for(g in k)a(k,
g)&&(f[g]=h(k[g],g,k));return f}}}();return function(a){return a}(function(a,k,h){return{f:a,c:k,H:h}}(function(a){function k(b){return b.filter(function(b,d,a){return a.lastIndexOf(b)===d})}function h(b,c){for(var d=b.length,a=-1,n=0;n<d;++n)if(c(b[n])){if(0<=a)throw Error("Multiple elements match the predicate.");a=n}return a}function f(b,c){return b&&"function"===typeof b.valueOf&&c&&"function"===typeof c.valueOf?b.valueOf()<=c.valueOf()?b.valueOf()<c.valueOf()?-1:0:1:b<=c?b<c?-1:0:1}function g(b,
c){var d=b.length,a=Array(d),n=Array(d),l;for(l=0;l<d;++l)a[l]=l,n[l]=b[l];l=b;b=n;n=l;a.sort(function(e,d){return c(b[e],b[d])||e-d});for(l=0;l<d;++l)n[l]=b[a[l]];return n}return{contains:function(b,c){return 0<=b.indexOf(c)},nb:function(b){if(50<b.length){for(var c=b.length,d={},f,n=0;n<c;++n)if(f=b[n],"string"===typeof f)if(a.q(d,f))break;else d[f]=!0;else if(b.lastIndexOf(f)!==n)break;if(!(n>=c)){for(var l=b.slice(0,n);n<c;++n)f=b[n],"string"===typeof f?a.q(d,f)||(d[f]=!0,l.push(f)):b.lastIndexOf(f)===
n&&l.push(f);b=l}}else b=k(b);return b},aa:function(b,c){return Array.prototype.concat.apply([],b.map(c))},Db:function(b,c){var d=h(b,c);if(0>d)throw Error("None of the elements matches the predicate.");return b[d]},Eb:function(b,c){var d=h(b,c);return 0<=d?b[d]:null},Qa:function(b,c){var d=c||f;window.chrome?d=g(b,d):(b.sort(d),d=b);return d}}}(a),a,{sa:function(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},ib:function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},
format:function(a){var k=arguments;return a.replace(/{(\d+)}/g,function(a,f){var g=parseInt(f,10)+1;return typeof k.length<=g?a:k[g]})}}))}();x=function(a,m){function k(a){var g={key:["char","charCode","key","keyCode"],mouse:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" ")},g="altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp type view which".split(" ").concat(g[a.type.substr(0,3)]||[]).concat(g[a.type.substr(0,
5)]||[]);this.J=a;this.b=a.defaultPrevented;g.forEach(function(b){return Object.defineProperty(this,b,{get:function(){return a[b]}})}.bind(this))}function h(a,g){this.ca=a;this.Pa=g}k.prototype={preventDefault:function(){this.b=!0;return this.J.preventDefault()},k:function(){this.b=!0},get defaultPrevented(){return this.b}};k.prototype=a.c.extend({},{get defaultPrevented(){return this.defaultPrevented},preventDefault:k.prototype.preventDefault,preventApplicationButAllowBrowserDefault:k.prototype.k},
k.prototype);return function(f){function g(c,d,f){function n(e){e=Array.prototype.slice.call(c.querySelectorAll(e)).filter(function(e){return m.Ba(e,d.target)});return e.length?e[e.length-1]:void 0}var l=m.ua.bind(null,c),e=b.map(function(e){var b=e.Pa?n(e.Pa):c;return{ca:e.ca,match:b,depth:b?l(b):-1}}).filter(function(e){return!!e.match});a.f.Qa(e,function(e,b){return b.depth-e.depth});e.forEach(function(e){e.ca.apply(c,f)})}f=f||function(b){return[b]};var b=[];this.r=function(a,d){var f=1<arguments.length?
a:void 0;d=1<arguments.length?d:a;b.push(new h(d,f));return{dispose:function(){d&&(b.splice(b.indexOf(d),1),d=null)}}};this.ga=function(b){return{Z:function(a){var t=m.element.qa(a.target,b);t&&(a=new k(a),g(t,a,f(a,t)))}}}}}(q,function(){return function(a){return a}(function(){function a(a,f){return!!(a.compareDocumentPosition(f)&16)}var m=window.Element,k=m.prototype.webkitMatchesSelector||m.prototype.mozMatchesSelector||m.prototype.msMatchesSelector||m.prototype.matches;return{ua:function(a,f){for(var g=
0;f;){if(f===a)return g;f=f.parentNode;++g}throw Error("The given node is not part of the subtree.");},Ba:function(h,f){return h===f||a(h,f)},Fb:a,element:{qa:function(a,f){do{if(k.call(a,f))return a;a=a.parentElement}while(a);return null},matches:function(a,f){return k.call(a,f)}}}}())}());G=function(){var a=/^[a-z]+(-[a-z]+)*$/,m=/\x3c!--(?:(before|after):)?([a-z]+(-[a-z]+)*)--\x3e*/g;return function(k){function h(a,c){c=c||function(a,e){return e+a};return function(l){var e=f(l,a);return{M:function(a,
l){var u=l?a:null,A=(l=l?l:a)?u:null,E=l,u=c;A&&b(A,2);g(E);A=A?f(A,3)+E+f(A,4):E;u=u(e,A);d=d.replace(e,u)}}}}function f(a,b){function d(e){if(c[a]!==e)throw Error("Operation is not defined for placeholder `"+a+"`.");}if(!c[a])throw Error("Unknown placeholder id `"+a+"`.");var e="\x3c!--"+a+"--\x3e",f="\x3c!--before:"+a+"--\x3e",g="\x3c!--after:"+a+"--\x3e";switch(b){case 1:return d(1),delete c[a],e;case 2:return d(1),e;case 3:return d(2),f;case 4:return d(2),g;case 5:case 6:return 1===c[a]?e:5===
b?g:f}throw Error("Assertion error. Unkown operator: `"+b+"`");}function g(a){for(var d;d=m.exec(a);){var c=d[1],e="before"===c;d=d[2];if(c&&1!==(a.match(new RegExp((e?"after":"before")+":"+d,"g"))||[]).length)throw Error("Multiple or unmatched before-/after-placeholders for placeholder id `"+d+"`.");c&&!e||b(d,c?2:1)}}function b(b,d){if(!a.test(b))throw Error("Invalid placeholder id `"+b+"`");if(c[b])throw Error("Placeholder id `"+b+"` is already taken.");c[b]=d}var c={},d=k;g(d);this.replace=function(a){return{ia:h(1,
function(a,b){return b})(a).M}};this.Sa=function(a){return{append:h(5)(a).M,La:h(6,function(a,b){return a+b})(a).M}};this.eb=function(){return d.replace(m,"")}}}();H=function(a,m,k){function h(a){return null===a?"":""+a}function f(f,b,c){this.id=this.id=c.id;this.property=this.fa=c.property||this.id;this.userDefined=this.ha=!1!==c.ha;this.m=!c.hidden;this.visible=this.J=function(){return this.m}.bind(this);this.label=this.label=a.observable(c.label);this.width=this.width=a.observable(c.width);this.widthInPixels=
this.Q=function(){var a=this.width();if("px"!==a.substr(-2))throw Error("The only currently supported column width values are absolute pixel lengths.");return parseInt(a.substring(0,a.length-2),10)}.bind(this);this.ya=a.observableArray(c.headerClasses||c.classes||[]);this.pa=a.observableArray(c.cellClasses||c.classes||[]);this.b=a.observableArray(c.footerClasses||c.classes||[]);this.headerClasses=this.ya;this.cellClasses=this.pa;this.footerClasses=this.b;this.metadata=this.jb=b.columnMetadataSupplier?
b.columnMetadataSupplier(f.cb,c):{};this.renderValue=this.F=b.cellValueRenderer?b.cellValueRenderer.bind(void 0,this):h;this.ob=function(a){this.F=a(this.F)}.bind(this);this.k=function(a){a=this.la(a,{e:this.W,update:this.X});if(!a||!a.e||!a.update)throw Error("The cell value binding must define an `init` as well as an `update` method.");this.W=a.e;this.X=a.update}.bind(this);this.la=function(a,b){var c=a(m.c.extend({e:b.e,update:b.update},{init:b.e,update:b.update}));return{e:c.e||c.init,update:c.update||
c.update}};this.overrideValueRendering=this.ob;this.overrideValueBinding=this.k}a.bindingHandlers.__gridColumn={init:function(){},update:function(a,b){var c=b();a.style.width=c.width()}};return{e:function(a){a.replace("columns").ia(k)},n:function(g,b,c){function d(a){a=new f(c,b,a);b.columnInitializer&&b.columnInitializer(a);return a}this.all=this.all=a.observableArray(g.columns.map(d));this.byId=this.oa=function(a){var b=this.Ta(a);if(!b)throw Error("The column id `"+a+"` is undefined.");return b}.bind(this);
this.tryById=this.Ta=function(a){var b=this.all().filter(function(b){return b.id===a});if(1<b.length)throw Error("Assertion error: Multiple columns with id `"+a+"`.");return b[0]}.bind(this);var k=a.observable(this.all().filter(function(a){return a.m}));this.displayed=this.i=function(){return k()};this.show=function(a){this.G(function(b){return b.m||b===a})}.bind(this);this.rb=function(a){this.G(function(b){return b.m&&b!==a})}.bind(this);this.show=this.show;this.hide=this.rb;this.reorder=this.Cb=
function(a){var b=this.all().slice(),e=[];a.forEach(function(a){b.splice(b.indexOf(a),1);e.push(a)});if(b.length)throw Error("The new column order must contain all columns.");this.all(e);this.G(function(a){return a.m})}.bind(this);this.showOnlyThoseWhich=this.G=function(a){var b=this.all();a=b.filter(a);b.forEach(function(a){a.m=!1});a.forEach(function(a){a.m=!0});k(a)}.bind(this);this.combinedWidth=this.gb=a.pureComputed(function(){for(var a=0,b=this.i(),e=0;e<b.length;++e)a+=b[e].Q();return a}.bind(this));
this.add=this.add=function(a){a=d({ha:!1,id:"$"+a.id,label:a.label,hidden:a.hidden||!1,width:a.width});this.all.unshift(a);this.G(function(a){return a.m});return a}.bind(this)}}}(p,q,'<colgroup class="ko-grid-colgroup">\n    <col class="ko-grid-col" data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\' }" data-repeat-bind="__gridColumn: column()">\n</colgroup>');y=function(a){var m,k,h;m=function(a){return function(g,b){return a.c.extend(g,{get stringifyable(){return b()}})}}(a);
k=function(a,g){function b(){return 0}function c(a,b){return"string"===typeof a&&"string"===typeof b?a.localeCompare(b):a<=b?a<b?-1:0:1}function d(b,e){a.c.extend(b,{get onResultOf(){return this.D},get reverse(){return this.reverse},get callable(){return this.C}},{get D(){return function(a){return k(a,b)}},get reverse(){return function(){return e||h(b)}},get C(){return b}})}function k(a,b){function c(d,f){return b(a(d),a(f))}d(c);g(c,function(){return{type:"by-function-comparator","function":a.stringifyable,
comparator:b.stringifyable}});return c}function h(a){function b(c,e){return-a(c,e)}d(b,a);g(b,function(){return{type:"reversed-comparator",comparator:a.stringifyable}});return b}d(c);g(c,function(){return{type:"natural-comparator"}});d(b);g(b,function(){return{type:"indifferent-comparator"}});return{ub:b,b:c}}(a,m);h=function(a,g){function b(b){a.c.extend(b,{get callable(){return this.C}},{get C(){return b}})}return{Ab:function(a){function d(b){return b[a]}b(d);g(d,function(){return{type:"property-accessor",
propertyName:a}});return d}}}(a,m);a=function(a,g){function b(){return!0}function c(){return!1}function d(b,c){a.c.extend(b,{get and(){return this.B},get negate(){return this.Ea},get onResultOf(){return this.D},get or(){return this.P},get callable(){return this.C}},{get B(){return function(a){return k([b,a])}},get Ea(){return function(){return c||l(b)}},get D(){return function(a){return h(a,b)}},get P(){return function(a){return e([b,a])}},get C(){return b}})}function k(a){function e(b){for(var c=
0,d=a.length;c<d;++c)if(!a[c](b))return!1;return!0}if(!a.length)return b;d(e);g(e,function(){return{type:"and-predicate",components:a.map(function(a){return a.stringifyable})}});return e}function h(a,b){function e(c){return b(a(c))}d(e);g(e,function(){return{type:"by-function-predicate","function":a.stringifyable,predicate:b.stringifyable}});return e}function l(a){function b(e){return!a(e)}d(b,a);g(b,function(){return{type:"negated-predicate",predicate:a.stringifyable}});return b}function e(a){function b(e){for(var c=
0,d=a.length;c<d;++c)if(a[c](e))return!0;return!1}if(!a.length)return c;d(b);g(b,function(){return{type:"or-predicate",components:a.map(function(a){return a.stringifyable})}});return b}d(c);g(c,function(){return{type:"always-false-predicate"}});d(b);g(b,function(){return{type:"always-true-predicate"}});return{b:c,k:b,B:k,J:function(a,b){function e(b){return a(b)}d(e);g(e,b);return e},P:e,Bb:function(a){function b(e){return a.test(e)}d(b);g(b,function(){return{type:"regular-expression-predicate",regularExpression:a.source,
caseSensitive:!a.ignoreCase,multiline:a.multiline}});return b}}}(a,m);return function(a){return a}({v:k,L:h,j:a,wb:m,Gb:function(a,g){return"function"===typeof g||"object"===typeof g?g.stringifyable||g:g}})}(q);y=function(a,m,k,h,f){function g(a){this.l(function(b){b();this.t=a.element.querySelector(".ko-grid-tbody")}.bind(this));return function(){this.t=null}.bind(this)}function b(){var b=[],e={};this.rows=this.rows=e;e.i=a.observableArray([]);e.displayed=e.i;e.$=a.observable(!1).extend({Qb:"always"});
e.displayedSynchronized=e.$;e.__handleDisplayedRowsDeviate=function(){this.rows.$(!1)}.bind(this);e.__handleDisplayedRowsSynchronized=function(){this.rows.$(!0)}.bind(this);var c=this.view;e.__dirty=c.dirty;b.push(c.observables.subscribe(function(a){e.i(a)}));e.i(c.observables());var d=[];e.__classify=function(a){var b=d.map(function(b){return b(a)});return Array.prototype.concat.apply([],b)};e.Aa=function(a){d.push(a)};e.installClassifier=e.Aa;return function(){b.forEach(function(a){a.dispose()})}}
function c(){function b(e,c){var d=a.contextFor(c),f=d.row(),d=d.column();return[e,f[d.fa],f,d]}function e(a){return function(b){a.ga(".ko-grid-cell").Z(b);return!b.defaultPrevented}}var c=new h(b),d=new h(b),f=new h(b),g=new h(b);this.zb=c.r.bind(c);this.Fa=d.r.bind(d);this.Ga=f.r.bind(f);this.yb=g.r.bind(g);this.onCellMouseDown=this.zb;this.onCellClick=this.Fa;this.onCellDoubleClick=this.Ga;this.onCellContextMenu=this.yb;this.l(function(a){a();this.t.addEventListener("mousedown",e(c));this.t.addEventListener("click",
e(d));this.t.addEventListener("dblclick",e(f));this.t.addEventListener("contextmenu",e(g))}.bind(this));return function(){}}function d(b){function c(a,b){var e=a.children[b];if(!e)throw Error("Column `"+b+"` does not exist.");return e}function d(a,e,c){var f=a.row();h(f,function(a){var d=a.o,g=b.h.i().indexOf(d);c(a,e.children[g],f,d)})}var f=function(a){var b=this.t.querySelector("tr.ko-grid-row:nth-child("+(a+1)+")");if(!b)throw Error("Row `"+a+"` does not exist.");return b}.bind(this),g=0,k={};
this.rows.__handleElementRecycling=function(a,b){d(b,a,function(a,b,e,c){a.Ra();n(b,e,c)})};this.rows.__handleElementRecycled=function(a,b){d(b,a,function(a,b,e,c){a.Oa(e,b);n(b,e,c);l(b,e,c)})};var h=function(e,c){if(g){var d=this.da(a.unwrap(e[b.primaryKey]));m.c.q(k,d)&&k[d].forEach(c)}}.bind(this);this.$a=function(a,b){var e=a.row(),c=a.column();h(e,function(a){a.o===c&&b(a)})};this.lookupCell=this.Da=function(d,h){function u(a){function b(){1===f.length?delete k[F]:f.splice(f.indexOf(c),1);--g;
if(!c.Hb){var a=c.element,e=c.b,d=c.o;c.Ra();n(a,e,d);l(a,e,d)}}if(B["__@__hijacked"])throw Error("Illegal state: This cell is already hijacked.");a=h.la(a,{e:h.W||e,update:h.X||J});var c=B["__@__hijacked"]=new t(B,d,h,a),f=k[F]=k[F]||[];f.push(c);++g;n(B,d,h);l(B,d,h);return m.c.extend({b:b,dispose:b},{dispose:b,release:b})}var F=this.da(a.unwrap(d[b.primaryKey])),C=this.rows.i().tryFirstIndexOf(d),K=b.h.i().indexOf(h),B=c(f(C),K);return m.c.extend({element:B,sb:u},{element:B,hijack:u})}.bind(this);
return function(){}}function t(a,b,e,c){this.element=a;this.b=b;this.o=e;this.e=c.e;this.update=c.update}function n(b,c,d){for(var f=b["__@__hijacked"];b.firstChild;)a.removeNode(b.firstChild);(f&&f.e||d.W||e)(b,c,d)}function l(a,b,e){var c=b[e.fa],d=a["__@__hijacked"],f=e.pa.peek().join(" ");a.className="ko-grid-td ko-grid-cell "+f;(d&&d.update||e.X||J)(a,c,b,e)}function e(a){a.insertBefore(u.createTextNode(""),a.firstChild)}function J(b,e,c,d){for(b=b.firstChild;b.nodeType!==C;)b=b.nextSibling;
b.nodeValue=d.F(a.unwrap(e))}var C=window.Node.TEXT_NODE,u=window.document;t.prototype={get Hb(){return null===this.element},Oa:function(a,b){this.element=b;this.b=a;b["__@__hijacked"]=this},Ra:function(){this.element=this.element["__@__hijacked"]=null}};a.bindingHandlers.__gridRow={init:function(){},update:function(a,b){var e=b(),c=e.classify,d=e.row(),e=1===e.index()%2?["ko-grid-tr","ko-grid-row","alternate"]:["ko-grid-tr","ko-grid-row"],c=c(d);a.className=e.concat(c).join(" ")}};a.bindingHandlers.__gridCell=
{init:function(a,b,e,c,d){b=b();var f=b.row;b=b.column;d.grid.data.$a(d,function(b){return b.Oa(f(),a)});n(a,f,b());return{controlsDescendantBindings:!0}},update:function(a,b){var e=b(),c=e.row(),e=e.column.peek();l(a,c,e)}};return{e:function(a){a.replace("body").ia("body",f);a.Sa("table").La("<div class=\"ko-grid-load-indicator\" data-bind=\"style: { display: data.rows.__dirty() ? 'block' : 'none' }\">Loading&hellip;</div>")},n:function(e,f,h){var u=[];this.source=e.dataSource;this.valueSelector=
this.Ua=e.valueSelector||f.valueSelector||function(a){return a};this.observableValueSelector=this.da=e.observableValueSelector||f.observableValueSelector||this.Ua;this.predicates=this.j=a.observableArray(e.filters||[]);this.predicate=this.Ka=a.pureComputed(function(){return k.j.B(this.j().map(a.unwrap))}.bind(this));this.comparator=this.ra=a.observable(k.v.ub);this.offset=this.offset=a.observable(0);this.limit=this.Ca=a.observable(Number.POSITIVE_INFINITY);e=this.source.openView(function(a){return a.filteredBy(this.Ka).sortedBy(this.ra).offsetBy(this.offset).limitedTo(this.Ca)}.bind(this));
u.push(e.dispose.bind(e));this.view=this.view=e;this.A=function(){};this.l=function(a){var b=this.A;this.A=function(){a(b)}}.bind(this);u.push(g.call(this,h));u.push(b.call(this));u.push(c.call(this));u.push(d.call(this,h));this.u=function(){u.forEach(function(a){a()})}}}}(p,q,y,x,'<tbody class="ko-grid-tbody" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    <tr class="ko-grid-tr ko-grid-row"\n        data-bind="indexedRepeat: {\n            forEach: data.rows.displayed,\n            indexedBy: function(r) { return grid.data.observableValueSelector(ko.unwrap(r[grid.primaryKey])); },\n            as: \'row\',\n            at: \'rowIndex\',\n            beforeElementRecycling: data.rows.__handleElementRecycling,\n            afterElementRecycled: data.rows.__handleElementRecycled,\n            allowDeviation: true,\n            onDeviation: data.rows.__handleDisplayedRowsDeviate,\n            onSynchronization: data.rows.__handleDisplayedRowsSynchronized }"\n        data-repeat-bind="__gridRow: { classify: grid.data.rows.__classify, row: row, index: rowIndex }">\n\n        <td data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\', allowElementRecycling: false }"\n            data-repeat-bind="__gridCell: { row: row, column: column }"></td>\n    </tr>\n</tbody>');
I=function(a,m,k,h){function f(b){this.id=this.id="column-header-"+b.id;this.element=this.element=a.observable(null);this.rowSpan=this.rowSpan=a.observable(1);this.columnSpan=this.p=a.observable(1);this.label=this.label=b.label;this.column=this.o=b;this.columns=this.h=[b];this.U=function(a){this.rowSpan(a)}.bind(this)}function g(b){this.id=this.id="column-group-header-"+(b.id||"@__"+ ++l);this.element=this.element=a.observable(null);this.ab=b;this.rowSpan=this.rowSpan=a.observable(b.height);this.columnSpan=
this.p=a.observable(1);this.label=this.label=a.observable(b.label);this.columns=this.h=[];this.U=function(a){this.h=[a];this.p(1)}.bind(this)}function b(a){function b(a){a.fb.forEach(function(b){var e=d[b];if(!e)d[b]=a;else if(e!==a)throw Error("Column `"+b+"` is element of column group `"+e.label+"` as well as `"+a.label+"`.");});a.K&&b(a.K)}var d={};m.f.aa(a,c.bind(this,null)).forEach(function(a){b(a)});return d}function c(a,b){var f=d(b),g=b.elements.filter(function(a){return"string"!==typeof a}),
k=b.elements.filter(function(a){return"string"===typeof a}),f={id:b.id,label:b.label,K:a,depth:a?a.depth+1:0,height:a?a.Ja-f:1,Ja:f,fb:k};return g.length?m.f.aa(g,c.bind(this,f)):f}function d(a){a=a.elements.filter(function(a){return"string"!==typeof a});return 1+Math.max.apply(Math,[0].concat(a.map(d)))}var t=window.document,n=window.Node,l=0;a.bindingHandlers.__gridHeader={init:function(b,c){var d=c()();d.element(b);a.utils.domNodeDisposal.addDisposeCallback(b,function(){d.element(null)});b.insertBefore(t.createTextNode(""),
b.firstChild);return{controlsDescendantBindings:!0}},update:function(a,b){var c=b()(),d=c.id.replace(/[\s]/g,"_");a.className=c.o?"ko-grid-th ko-grid-column-header "+d+" "+c.o.ya().join(" "):"ko-grid-th ko-grid-column-group-header "+d;d=c.h.map(function(a){return a.Q()}).reduce(function(a,b){return a+b})+"px";a.style.width=d;a.style.maxWidth=d;a.rowSpan=c.rowSpan();a.colSpan=c.p();for(d=a.firstChild;d.nodeType!==n.TEXT_NODE;)d=d.nextSibling;d.nodeValue=c.label()}};return{e:function(a){a.replace("head").ia(h)},
n:function(c,d,h){function l(a,b,c){if(!a)return[];if(b[a.depth]&&b[a.depth].ab===a){var e=a;do{var d=b[e.depth];d.h.push(c);d.p(d.p()+1);e=e.K}while(e);return[]}b.length=a.depth;var e=l(a.K,b,c),f=d=a.depth;a=m(t,new g(a));a.U(c);e[d]=b[f]=a;return e}function m(a,b){var c=b.id;return a[c]=a[c]||b}var n=b(c.columnGroups||[]),t={},p={},v=[];this.__rows=this.V=a.computed(function(){var b=h.h.i(),c=0;b.forEach(function(a){a=n[a.id];c=Math.max(c,a?a.depth+a.Ja:0)});v.length=c+1;for(var e=0;e<v.length;++e)v[e]=
v[e]||a.observableArray(),v[e].__rowId="header-row-"+e,v[e].valueWillMutate(),v[e]().length=0;var d=[];b.forEach(function(a){var b=n[a.id],e=b?b.depth+b.height:0;d.length=e;var g=m(p,new f(a));g.U(c-e+1);v[e]().push(g);a=l(b,d,a);for(b=0;b<a.length;++b)a[b]&&v[b]().push(a[b])});v.forEach(function(a){a.valueHasMutated()});return v});this.all=this.all=a.computed(function(){var a=[];this.V().forEach(function(b){Array.prototype.push.apply(a,b())});return a}.bind(this));this.forColumn=this.xa=function(a){a=
"column-header-"+a.id;if(!Object.prototype.hasOwnProperty.call(p,a))throw Error("There is no header for the given column.");return p[a]};var q=new k(function(b,e){return[b,a.contextFor(e).header()]});this.__handleClick=function(a,b){q.ga(".ko-grid-column-header, .ko-grid-column-group-header").Z(b);return!b.defaultPrevented};this.Ia=q.r.bind(q);this.Ha=function(a,b){function e(a,c){c instanceof f&&b.apply(this,arguments)}var c=1<arguments.length;b=c?b:a;q.r.apply(q,c?[a,e]:[e])};this.onHeaderClick=
this.Ia;this.onColumnHeaderClick=this.Ha;this.u=function(){this.V.dispose();this.all.dispose()}.bind(this)}}}(p,q,x,'<thead class="ko-grid-thead" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    \x3c!--before:headers--\x3e\n    <tr class="ko-grid-tr ko-grid-headers"\n        data-bind="indexedRepeat: { forEach: headers.__rows, indexedBy: \'__rowId\', as: \'headerRow\' }"\n        data-repeat-bind="click: headers.__handleClick">\n\n        <th class="ko-grid-th"\n            data-bind="indexedRepeat: { forEach: headerRow(), indexedBy: \'id\', as: \'header\' }"\n            data-repeat-bind="__gridHeader: header"></th>\n    </tr>\n    \x3c!--after:headers--\x3e\n</thead>');
D=function(a,m,k,h,f){a=a.bindingHandlers.grid=a.bindingHandlers.grid||{};return a.core=a.core||{columns:m,data:k,headers:h,layout:f}}(p,H,y,I,function(a){function m(a,g,b,c){var d=a.element,k=d.querySelector(".ko-grid-table-scroller-padding"),h=d.querySelector(".ko-grid-table-scroller"),l=d.querySelector(".ko-grid-thead"),e=d.querySelector(".ko-grid-tfoot"),m=!1;return function(a){if(!m)try{g(m=!0);var f=h.scrollLeft;a&&a();b.forEach(function(a){a.call(d)});k.style.borderTopWidth=Math.max(l.clientHeight,
0)+"px";k.style.borderBottomWidth=Math.max(e.clientHeight,0)+"px";h.scrollLeft=f;c.forEach(function(a){a.call(d)})}finally{g(!1),m=!1}}}function k(a){a=a.element;var g=a.querySelector(".ko-grid-table-scroller"),b=a.querySelector(".ko-grid-thead"),c=a.querySelector(".ko-grid-tfoot");g.addEventListener("scroll",function(){var a=-g.scrollLeft+"px";b.style.left=a;c.style.left=a})}var h=window.document;return{e:function(){},n:function(f,g,b){function c(a){a&&a()}var d=a.observable(!1);this.recalculate=
this.Na=function(a){c(a)};var t=a.computed(function(){d()||(b.h.i().forEach(function(a){a.width()}),c())}),n=[],l=[];this.na=function(a){n.push(a)};this.ma=function(a){l.push(a)};this.beforeRelayout=this.na;this.afterRelayout=this.ma;this.A=function(){k.call(this,b);c=m(b,d,n,l);b.ea(c)}.bind(this);this.determineCellDimensions=this.ta=function(a){var b=h.createElement("div");b.className="ko-grid-td ko-grid-cell";b.appendChild("string"===typeof a?h.createTextNode(a):a);b.style.position="absolute";
b.style.visibility="hidden";h.body.appendChild(b);try{return{width:b.offsetWidth,height:b.offsetHeight}}finally{h.body.removeChild(b)}};this.u=function(){t.dispose()}}}}(p));(function(a,m){function k(a,c){if(m.c.q(g,a))throw Error("Extension id or alias already in use: `"+a+"`.");g[a]=c;c.T.push(a);return c}function h(a,c){this.Ma=a;this.Y=c.dependencies||c.Y||[];this.za=c.initializer||c.za||function(){};this.n=c.Constructor||c.n;this.T=[]}var f=a.bindingHandlers.grid=a.bindingHandlers.grid||{},g=
f.extensions=f.extensions||{};f.defineExtension=f.mb=function(a,c){return k(a,new h(a,c))};f.O=function(a){if(!m.c.q(g,a))throw Error("No known extension id or alias: `"+a+"`.");return g[a]};f.declareExtensionAlias=f.kb=function(a,c){return k(a,f.O(c))};f.declareExtensionAliases=f.lb=function(a,c){var d=f.O(c);a.forEach(function(a){return k(a,d)});return d};h.prototype={get vb(){return this.T.slice()},wa:function(a,c){var d=this.ka(a,function(a){throw Error("Conflicting configurations "+a.map(function(a){return"`"+
a+"`"}).join(", ")+" (configuration: `"+c+"`).");});if(!d)throw Error("The extension `"+this.Ma+"` must be configured (configuration: `"+c+"`)");return a[d]},Jb:function(a){var c=this.ka(a,function(a){throw Error("Conflicting binding values "+a.map(function(a){return"`"+a+"`"}).join(", ")+".");});return a[c]},ka:function(a,c){var d=this.T.filter(function(c){return m.c.q(a,c)});1<d.length&&c(d);return d[0]}};return g})(p,q);return function(a){return a}(function(a,m,k,h){function f(b,d){function f(){var a=
l[b];d(a.hb,a.Ib,a.pb)}l[b]?f():a([b],function(a){function d(f){f=c.O(f);var l=f.Ma,n=f.wa(h,b);if(!k.f.contains(m,l)){if(k.f.contains(v,l))throw Error("Dependency cycle: .. -> "+v.join(" -> ")+" -> "+l+" -> ..");v.push(l);f.Y.forEach(d);f.za(g,n,a);m.push(v.pop())}}var g=new G('<div class="ko-grid">\n    \x3c!--before:grid--\x3e\n    <div class="ko-grid-table-container">\n        \x3c!--before:table--\x3e\n        <div class="ko-grid-table-scroller-padding">\n            <div class="ko-grid-table-scroller">\n                <table class="ko-grid-table" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n                    \x3c!--columns--\x3e\n                    \x3c!--head--\x3e\n                    <tfoot class="ko-grid-tfoot" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\x3c!--tfoot--\x3e</tfoot>\n                    \x3c!--body--\x3e\n                </table>\n            </div>\n        </div>\n        \x3c!--after:table--\x3e\n    </div>\n    \x3c!--after:grid--\x3e\n</div>');
t.forEach(function(b){b.e(g,a)});var h=a.extensions||{},m=[],v=[];Object.keys(h).forEach(d);var q="ko-grid-template-"+b;n.b(q,g.eb());l[b]={hb:a,Ib:q,pb:m};f()})}function g(a,b){this.cb=b;this.primaryKey=this.primaryKey=b.primaryKey;this.rootElement=a;this.element=this.element=null;this.u=function(){};this.l=function(){};this.postApplyBindings=this.ea=function(a){if(!this.l)throw Error("Illegal state: postApplyBindings-callbacks have been called already.");var b=this.l;this.l=function(){b();a()}}.bind(this);
var c=new h;this.b=c.r.bind(c);this["onKeyDown "]=this.b;a.addEventListener("keydown",function(a){c.ga(".ko-grid").Z(a);return!a.defaultPrevented})}var b=window.document,c=m.bindingHandlers.grid=m.bindingHandlers.grid||{},d=["columns","headers","data","layout"],t=d.map(function(a){return D[a]}),n=new m.nativeTemplateEngine;n.b=function(a,c){var d=b.createElement("script");d.id=a;d.type="text/html";d.text=c;b.querySelector("head").appendChild(d)};m.bindingHandlers.grid.init=function(a,b,h,l,q){function t(a){return"function"===
typeof a?a.apply(void 0,Array.prototype.slice.call(arguments,1)):a}var p=b(),x=p.config;f(x,function(b,f,h){var l=[],r=new g(a,p);m.utils.domNodeDisposal.addDisposeCallback(a,function(){r.u();l.forEach(function(a){a()})});k.c.ba(D,function(a,c){var d=new c.n(p,b,r);r[a]=d;r.h=r.columns;r.headers=r.headers;r.data=r.data;r.k=r.layout;"function"===typeof d.u&&l.push(d.u.bind(d))});var u=b.extensions,C=p.extensions||{},z=r.extensions=r.qb={};for(h.forEach(function(a){a=c.O(a);var d=a.Jb(C)||{},e=t(a.wa(u,
x),d,p);if((!1!==e.enabled||!0===d.enabled)&&!1!==d.enabled){a.Y.forEach(function(a){if(!z[a])throw Error("Dependency '"+a+"' was disabled.");});var f=new a.n(d,e,r,p,b);a.vb.forEach(function(a){z[a]=f});"function"===typeof f.dispose&&l.push(f.dispose.bind(f))}});a.firstChild;)m.removeNode(a.firstChild);h=q.createChildContext(r,"grid");m.renderTemplate(f,h,{templateEngine:n},a);var y=a.querySelector(".ko-grid");r.element=y;r.element=y;k.c.ba(u,function(a){y.className+=" with-"+k.H.sa(a)});d.forEach(function(a){r[a].A&&
r[a].A()});r.l();r.l=null});return{controlsDescendantBindings:!0}};m.bindingHandlers.grid.update=function(){};var l={};m.bindingHandlers._gridWidth={init:function(){},update:function(a,b){var c=b();a.style.width=c;a.style.maxWidth=c}};return c}(z,p,q,x))});