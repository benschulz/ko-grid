/*
 Copyright (c) 2015, Ben Schulz
 License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
*/
var t;
(function(z){"function"===typeof define&&define.amd?define(["require","knockout","ko-data-source","ko-indexed-repeat"],z):window["ko-grid"]=z(function(q,r){if(!Array.isArray(q)||1!==q.length||"string"!==typeof q[0]||"function"!==typeof r)throw Error("Assertion error.");var u=window.ko.bindingHandlers.grid.config=window.ko.bindingHandlers.grid.config||{};r(u[q[0]])},window.ko)})(function(z,q){var r,u,G,H,B,I,D;r=function(){var b;b=function(){function b(h,l){return Object.prototype.hasOwnProperty.call(h,l)}
return{$a:function(b,l){if(b===l)return!0;var g=!!l&&"function"===typeof l.valueOf;return!!b&&"function"===typeof b.valueOf&&g&&b.valueOf()===l.valueOf()},extend:function(b,l){Array.prototype.slice.call(arguments,1).forEach(function(g){for(var c=Object.keys(g),a=0,d=c.length;a<d;a++){var e=c[a],f=Object.getOwnPropertyDescriptor(g,e);void 0!==f&&f.enumerable&&Object.defineProperty(b,e,f)}});return b},ba:function(h,l){for(var g in h)b(h,g)&&l(g,h[g])},r:b,ub:function(h,l){var g={},c;for(c in h)b(h,
c)&&(g[c]=l(h[c],c,h));return g}}}();return function(b){return b}(function(b,h,l){return{f:b,c:h,H:l}}(function(b){function h(a){return a.filter(function(a,e,f){return f.lastIndexOf(a)===e})}function l(a,d){for(var e=a.length,f=-1,c=0;c<e;++c)if(d(a[c])){if(0<=f)throw Error("Multiple elements match the predicate.");f=c}return f}function g(a,d){return a&&"function"===typeof a.valueOf&&d&&"function"===typeof d.valueOf?a.valueOf()<=d.valueOf()?a.valueOf()<d.valueOf()?-1:0:1:a<=d?a<d?-1:0:1}function c(a,
d){var e=a.length,f=Array(e),c=Array(e),p;for(p=0;p<e;++p)f[p]=p,c[p]=a[p];p=a;a=c;c=p;f.sort(function(k,n){return d(a[k],a[n])||k-n});for(p=0;p<e;++p)c[p]=a[f[p]];return c}return{contains:function(a,d){return 0<=a.indexOf(d)},lb:function(a){if(50<a.length){for(var d=a.length,e={},f,c=0;c<d;++c)if(f=a[c],"string"===typeof f)if(b.r(e,f))break;else e[f]=!0;else if(a.lastIndexOf(f)!==c)break;if(!(c>=d)){for(var p=a.slice(0,c);c<d;++c)f=a[c],"string"===typeof f?b.r(e,f)||(e[f]=!0,p.push(f)):a.lastIndexOf(f)===
c&&p.push(f);a=p}}else a=h(a);return a},aa:function(a,d){return Array.prototype.concat.apply([],a.map(d))},Ab:function(a,d){var c=l(a,d);if(0>c)throw Error("None of the elements matches the predicate.");return a[c]},Bb:function(a,c){var e=l(a,c);return 0<=e?a[e]:null},Qa:function(a,d){var e=d||g;window.chrome?e=c(a,e):(a.sort(e),e=a);return e}}}(b),b,{sa:function(b){return b.replace(/([A-Z])/g,function(b){return"-"+b.toLowerCase()})},gb:function(b){return b.replace(/-([a-z])/g,function(b){return b[1].toUpperCase()})},
format:function(b){var h=arguments;return b.replace(/{(\d+)}/g,function(b,g){var c=parseInt(g,10)+1;return typeof h.length<=c?b:h[c]})}}))}();u=function(b,m){function h(b){var c={key:["char","charCode","key","keyCode"],mouse:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" ")},c="altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp type view which".split(" ").concat(c[b.type.substr(0,3)]||[]).concat(c[b.type.substr(0,
5)]||[]);this.J=b;this.b=b.defaultPrevented;c.forEach(function(a){return Object.defineProperty(this,a,{get:function(){return b[a]}})}.bind(this))}function l(b,c){this.ca=b;this.Pa=c}h.prototype={preventDefault:function(){this.b=!0;return this.J.preventDefault()},k:function(){this.b=!0},get defaultPrevented(){return this.b}};h.prototype=b.c.extend({},{get defaultPrevented(){return this.defaultPrevented},preventDefault:h.prototype.preventDefault,preventApplicationButAllowBrowserDefault:h.prototype.k},
h.prototype);return function(g){function c(c,e,f){function g(a){a=Array.prototype.slice.call(c.querySelectorAll(a)).filter(function(a){return m.Ba(a,e.target)});return a.length?a[a.length-1]:void 0}var p=m.ua.bind(null,c),k=a.map(function(a){var k=a.Pa?g(a.Pa):c;return{ca:a.ca,match:k,depth:k?p(k):-1}}).filter(function(a){return!!a.match});b.f.Qa(k,function(a,k){return k.depth-a.depth});k.forEach(function(a){a.ca.apply(c,f)})}g=g||function(a){return[a]};var a=[];this.s=function(c,b){var f=1<arguments.length?
c:void 0;b=1<arguments.length?b:c;a.push(new l(b,f));return{dispose:function(){b&&(a.splice(a.indexOf(b),1),b=null)}}};this.fa=function(a){return{Z:function(b){var f=m.element.qa(b.target,a);f&&(b=new h(b),c(f,b,g(b,f)))}}}}}(r,function(){return function(b){return b}(function(){function b(b,g){return!!(b.compareDocumentPosition(g)&16)}var m=window.Element,h=m.prototype.webkitMatchesSelector||m.prototype.mozMatchesSelector||m.prototype.msMatchesSelector||m.prototype.matches;return{ua:function(b,g){for(var c=
0;g;){if(g===b)return c;g=g.parentNode;++c}throw Error("The given node is not part of the subtree.");},Ba:function(l,g){return l===g||b(l,g)},Cb:b,element:{qa:function(b,g){do{if(h.call(b,g))return b;b=b.parentElement}while(b);return null},matches:function(b,g){return h.call(b,g)}}}}())}());G=function(){var b=/^[a-z]+(-[a-z]+)*$/,m=/\x3c!--(?:(before|after):)?([a-z]+(-[a-z]+)*)--\x3e*/g;return function(h){function l(b,d){d=d||function(a,b){return b+a};return function(p){var k=g(p,b);return{M:function(b,
p){var f=p?b:null,A=(p=p?p:b)?f:null,F=p,f=d;A&&a(A,2);c(F);A=A?g(A,3)+F+g(A,4):F;f=f(k,A);e=e.replace(k,f)}}}}function g(a,b){function c(b){if(d[a]!==b)throw Error("Operation is not defined for placeholder `"+a+"`.");}if(!d[a])throw Error("Unknown placeholder id `"+a+"`.");var k="\x3c!--"+a+"--\x3e",n="\x3c!--before:"+a+"--\x3e",e="\x3c!--after:"+a+"--\x3e";switch(b){case 1:return c(1),delete d[a],k;case 2:return c(1),k;case 3:return c(2),n;case 4:return c(2),e;case 5:case 6:return 1===d[a]?k:5===
b?e:n}throw Error("Assertion error. Unkown operator: `"+b+"`");}function c(b){for(var c;c=m.exec(b);){var d=c[1],k="before"===d;c=c[2];if(d&&1!==(b.match(new RegExp((k?"after":"before")+":"+c,"g"))||[]).length)throw Error("Multiple or unmatched before-/after-placeholders for placeholder id `"+c+"`.");d&&!k||a(c,d?2:1)}}function a(a,c){if(!b.test(a))throw Error("Invalid placeholder id `"+a+"`");if(d[a])throw Error("Placeholder id `"+a+"` is already taken.");d[a]=c}var d={},e=h;c(e);this.replace=function(a){return{ia:l(1,
function(a,b){return b})(a).M}};this.Ra=function(a){return{append:l(5)(a).M,Ma:l(6,function(a,b){return a+b})(a).M}};this.bb=function(){return e.replace(m,"")}}}();H=function(b,m,h){function l(b){return null===b?"":""+b}function g(c,a,d){this.id=this.id=d.id;this.property=this.ea=d.property||this.id;this.userDefined=this.ha=!1!==d.ha;this.n=!d.hidden;this.visible=this.visible;this.label=this.label=b.observable(d.label);this.width=this.width=b.observable(d.width);this.widthInPixels=this.Q=function(){var a=
this.width();if("px"!==a.substr(-2))throw Error("The only currently supported column width values are absolute pixel lengths.");return parseInt(a.substring(0,a.length-2),10)}.bind(this);this.ya=b.observableArray(d.headerClasses||d.classes||[]);this.pa=b.observableArray(d.cellClasses||d.classes||[]);this.b=b.observableArray(d.footerClasses||d.classes||[]);this.headerClasses=this.ya;this.cellClasses=this.pa;this.footerClasses=this.b;this.metadata=this.J=a.columnMetadataSupplier?a.columnMetadataSupplier(c.ab,
d):{};this.renderValue=this.F=a.cellValueRenderer?a.cellValueRenderer.bind(void 0,this):l;this.hb=function(a){this.F=a(this.F)}.bind(this);this.k=function(a){a=this.la(a,{e:this.W,update:this.X});if(!a||!a.e||!a.update)throw Error("The cell value binding must define an `init` as well as an `update` method.");this.W=a.e;this.X=a.update}.bind(this);this.la=function(a,b){var c=a(m.c.extend({e:b.e,update:b.update},{init:b.e,update:b.update}));return{e:c.e||c.init,update:c.update||c.update}};this.overrideValueRendering=
this.hb;this.overrideValueBinding=this.k}b.bindingHandlers.__gridColumn={init:function(){},update:function(b,a){var d=a();b.style.width=d.width()}};return{e:function(b){b.replace("columns").ia(h)},m:function(c,a,d){function e(b){b=new g(d,a,b);a.columnInitializer&&a.columnInitializer(b);return b}var f=[];this.all=this.all=b.observableArray(c.columns.map(e));this.byId=this.oa=function(a){var b=this.Sa(a);if(!b)throw Error("The column id `"+a+"` is undefined.");return b}.bind(this);this.tryById=this.Sa=
function(a){var b=this.all().filter(function(b){return b.id===a});if(1<b.length)throw Error("Assertion error: Multiple columns with id `"+a+"`.");return b[0]}.bind(this);var h=b.observable(this.all().filter(function(a){return a.n}));this.displayed=this.i=function(){return h()};this.show=function(a){this.G(function(b){return b.n||b===a})}.bind(this);this.ob=function(a){this.G(function(b){return b.n&&b!==a})}.bind(this);this.show=this.show;this.hide=this.ob;this.reorder=this.zb=function(a){var b=this.all().slice(),
c=[];a.forEach(function(a){b.splice(b.indexOf(a),1);c.push(a)});if(b.length)throw Error("The new column order must contain all columns.");this.all(c);this.G(function(a){return a.n})}.bind(this);this.showOnlyThoseWhich=this.G=function(a){var b=this.all();a=b.filter(a);b.forEach(function(a){a.n=!1});a.forEach(function(a){a.n=!0});h(a)}.bind(this);this.combinedWidth=this.eb=b.pureComputed(function(){for(var a=0,b=this.i(),c=0;c<b.length;++c)a+=b[c].Q();return a}.bind(this));this.add=this.add=function(a){a=
e({ha:!1,id:"$"+a.id,label:a.label,hidden:a.hidden||!1,width:a.width});this.all.unshift(a);this.G(function(a){return a.n});return a}.bind(this);this.o=function(){f.forEach(function(a){a.dispose()})}}}}(q,r,'<colgroup class="ko-grid-colgroup">\n    <col class="ko-grid-col" data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\' }" data-repeat-bind="__gridColumn: column()">\n</colgroup>');B=function(b){var m,h,l;m=function(b){return function(c,a){return b.c.extend(c,
{get stringifyable(){return a()}})}}(b);h=function(b,c){function a(){return 0}function d(a,b){return"string"===typeof a&&"string"===typeof b?a.localeCompare(b):a<=b?a<b?-1:0:1}function e(a,c){b.c.extend(a,{get onResultOf(){return this.D},get reverse(){return this.reverse},get callable(){return this.C}},{get D(){return function(b){return f(b,a)}},get reverse(){return function(){return c||h(a)}},get C(){return a}})}function f(a,b){function d(c,e){return b(a(c),a(e))}e(d);c(d,function(){return{type:"by-function-comparator",
"function":a.stringifyable,comparator:b.stringifyable}});return d}function h(a){function b(c,d){return-a(c,d)}e(b,a);c(b,function(){return{type:"reversed-comparator",comparator:a.stringifyable}});return b}e(d);c(d,function(){return{type:"natural-comparator"}});e(a);c(a,function(){return{type:"indifferent-comparator"}});return{rb:a,b:d}}(b,m);l=function(b,c){function a(a){b.c.extend(a,{get callable(){return this.C}},{get C(){return a}})}return{xb:function(b){function e(a){return a[b]}a(e);c(e,function(){return{type:"property-accessor",
propertyName:b}});return e}}}(b,m);b=function(b,c){function a(){return!0}function d(){return!1}function e(a,c){b.c.extend(a,{get and(){return this.B},get negate(){return this.Ea},get onResultOf(){return this.D},get or(){return this.P},get callable(){return this.C}},{get B(){return function(b){return f([a,b])}},get Ea(){return function(){return c||l(a)}},get D(){return function(b){return h(b,a)}},get P(){return function(b){return k([a,b])}},get C(){return a}})}function f(b){function d(a){for(var c=
0,k=b.length;c<k;++c)if(!b[c](a))return!1;return!0}if(!b.length)return a;e(d);c(d,function(){return{type:"and-predicate",components:b.map(function(a){return a.stringifyable})}});return d}function h(a,b){function d(c){return b(a(c))}e(d);c(d,function(){return{type:"by-function-predicate","function":a.stringifyable,predicate:b.stringifyable}});return d}function l(a){function b(c){return!a(c)}e(b,a);c(b,function(){return{type:"negated-predicate",predicate:a.stringifyable}});return b}function k(a){function b(c){for(var d=
0,k=a.length;d<k;++d)if(a[d](c))return!0;return!1}if(!a.length)return d;e(b);c(b,function(){return{type:"or-predicate",components:a.map(function(a){return a.stringifyable})}});return b}e(d);c(d,function(){return{type:"always-false-predicate"}});e(a);c(a,function(){return{type:"always-true-predicate"}});return{b:d,k:a,B:f,J:function(a,b){function d(b){return a(b)}e(d);c(d,b);return d},P:k,yb:function(a){function b(c){return a.test(c)}e(b);c(b,function(){return{type:"regular-expression-predicate",regularExpression:a.source,
caseSensitive:!a.ignoreCase,multiline:a.multiline}});return b}}}(b,m);return function(b){return b}({v:h,L:l,j:b,tb:m,Db:function(b,c){return"function"===typeof c||"object"===typeof c?c.stringifyable||c:c}})}(r);B=function(b,m,h,l,g){function c(a){this.l(function(b){b();this.u=a.element.querySelector(".ko-grid-tbody")}.bind(this));return function(){this.u=null}.bind(this)}function a(){var a=[],c={};this.rows=this.rows=c;c.i=b.observableArray([]);c.displayed=c.i;c.$=b.observable(!1).extend({Mb:"always"});
c.displayedSynchronized=c.$;c.__handleDisplayedRowsDeviate=function(){this.rows.$(!1)}.bind(this);c.__handleDisplayedRowsSynchronized=function(){this.rows.$(!0)}.bind(this);var d=this.view;c.__dirty=d.dirty;a.push(d.observables.subscribe(function(a){c.i(a)}));c.i(d.observables());var k=[];c.__classify=function(a){var b=k.map(function(b){return b(a)});return Array.prototype.concat.apply([],b)};c.Aa=function(a){k.push(a)};c.installClassifier=c.Aa;return function(){a.forEach(function(a){a.dispose()})}}
function d(){function a(c,d){var k=b.contextFor(d),e=k.row(),k=k.column();return[c,e[k.ea],e,k]}function c(a){return function(b){a.fa(".ko-grid-cell").Z(b);return!b.defaultPrevented}}var d=new l(a),k=new l(a),e=new l(a),f=new l(a);this.wb=d.s.bind(d);this.Fa=k.s.bind(k);this.Ga=e.s.bind(e);this.vb=f.s.bind(f);this.onCellMouseDown=this.wb;this.onCellClick=this.Fa;this.onCellDoubleClick=this.Ga;this.onCellContextMenu=this.vb;this.l(function(a){a();this.u.addEventListener("mousedown",c(d));this.u.addEventListener("click",
c(k));this.u.addEventListener("dblclick",c(e));this.u.addEventListener("contextmenu",c(f))}.bind(this));return function(){}}function e(a){function c(a,b){for(var d=a.firstChild,k=-1;d;){if(d.nodeType===y&&"TD"===d.tagName&&0<=(" "+d.className+" ").indexOf("td")&&++k===b)return d;d=d.nextSibling}throw Error("Column `"+b+"` does not exist.");}var d=function(a){for(var b=this.u.firstChild,c=-1;b;){if(b.nodeType===y&&"TR"===b.tagName&&0<=(" "+b.className+" ").indexOf("ko-grid-row")&&++c===a)return b;
b=b.nextSibling}throw Error("Row `"+a+"` does not exist.");}.bind(this),e=0,g={};this.rows.__handleElementRecycling=function(a,b){h(a,b,function(a,b,c){a["__@__hijacked"]=null;f(a,b,c)})};this.rows.__handleElementRecycled=function(a,b){h(a,b,function(a,b,c,d){d.element=a;d.ga=b;a["__@__hijacked"]=d;f(a,b,c);x(a,b,c)})};var h=function(c,d,k){if(e){var f=d.row();d=this.da(b.unwrap(f[a.primaryKey]));m.c.r(g,d)&&g[d].forEach(function(b){var d=b.p,e=a.h.i().indexOf(d);k(c.children[e],f,d,b)})}}.bind(this);
this.lookupCell=this.Da=function(h,n){function y(a){function b(){1===d.length?delete g[l]:d.splice(d.indexOf(c),1);--e;c.element["__@__hijacked"]===c&&(c.element["__@__hijacked"]=null,f(c.element,c.ga,c.p),x(c.element,c.ga,c.p))}if(v["__@__hijacked"])throw Error("Illegal state: This cell is already hijacked.");a=n.la(a||function(a){return a},{e:n.W||p,update:n.X||k});var c=v["__@__hijacked"]={element:v,ga:h,p:n,e:a.e,update:a.update},d=g[l]=g[l]||[];d.push(c);++e;f(v,h,n);x(v,h,n);return m.c.extend({b:b,
dispose:b},{dispose:b,release:b})}var l=this.da(b.unwrap(h[a.primaryKey])),E=this.rows.i().tryFirstIndexOf(h),C=a.h.i().indexOf(n),v=c(d(E),C);return m.c.extend({element:v,pb:y},{element:v,hijack:y})}.bind(this);return function(){}}function f(a,c,d){for(var k=a["__@__hijacked"];a.firstChild;)b.removeNode(a.firstChild);(k&&k.e||d.W||p)(a,c,d)}function x(a,b,c){var d=b[c.ea],e=a["__@__hijacked"],f=c.pa.peek().join(" ");a.className="ko-grid-td ko-grid-cell "+f;(e&&e.update||c.X||k)(a,d,b,c)}function p(a){a.insertBefore(E.createTextNode(""),
a.firstChild)}function k(a,c,d,k){for(a=a.firstChild;a.nodeType!==n;)a=a.nextSibling;a.nodeValue=k.F(b.unwrap(c))}var n=window.Node.TEXT_NODE,y=window.Node.ELEMENT_NODE,E=window.document;b.bindingHandlers.__gridRow={init:function(){},update:function(a,b){var c=b(),d=c.classify,k=c.row(),c=1===c.index()%2?["ko-grid-tr","ko-grid-row","alternate"]:["ko-grid-tr","ko-grid-row"],d=d(k);a.className=c.concat(d).join(" ")}};b.bindingHandlers.__gridCell={init:function(a,b){var c=b();f(a,c.row,c.column());return{controlsDescendantBindings:!0}},
update:function(a,b){var c=b(),d=c.row(),c=c.column.peek();x(a,d,c)}};return{e:function(a){a.replace("body").ia("body",g);a.Ra("table").Ma("<div class=\"ko-grid-load-indicator\" data-bind=\"style: { display: data.rows.__dirty() ? 'block' : 'none' }\">Loading&hellip;</div>")},m:function(k,f,g){var n=[];this.source=k.dataSource;this.valueSelector=this.Ta=k.valueSelector||f.valueSelector||function(a){return a};this.observableValueSelector=this.da=k.observableValueSelector||f.observableValueSelector||
this.Ta;this.predicates=this.j=b.observableArray(k.filters||[]);this.predicate=this.La=b.pureComputed(function(){return h.j.B(this.j().map(b.unwrap))}.bind(this));this.comparator=this.ra=b.observable(h.v.rb);this.offset=this.offset=b.observable(0);this.limit=this.Ca=b.observable(Number.POSITIVE_INFINITY);k=this.source.openView(function(a){return a.filteredBy(this.La).sortedBy(this.ra).offsetBy(this.offset).limitedTo(this.Ca)}.bind(this));n.push(k.dispose.bind(k));this.view=this.view=k;this.A=function(){};
this.l=function(a){var b=this.A;this.A=function(){a(b)}}.bind(this);n.push(c.call(this,g));n.push(a.call(this));n.push(d.call(this));n.push(e.call(this,g));this.o=function(){n.forEach(function(a){a()})}}}}(q,r,B,u,'<tbody class="ko-grid-tbody" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    <tr class="ko-grid-tr ko-grid-row"\n        data-bind="indexedRepeat: {\n            forEach: data.rows.displayed,\n            indexedBy: function(r) { return grid.data.observableValueSelector(ko.unwrap(r[grid.primaryKey])); },\n            as: \'row\',\n            at: \'rowIndex\',\n            beforeElementRecycling: data.rows.__handleElementRecycling,\n            afterElementRecycled: data.rows.__handleElementRecycled,\n            allowDeviation: true,\n            onDeviation: data.rows.__handleDisplayedRowsDeviate,\n            onSynchronization: data.rows.__handleDisplayedRowsSynchronized }"\n        data-repeat-bind="__gridRow: { classify: grid.data.rows.__classify, row: row, index: rowIndex }">\n\n        <td data-bind="indexedRepeat: { forEach: columns.displayed, indexedBy: \'id\', as: \'column\', allowElementRecycling: false }"\n            data-repeat-bind="__gridCell: { row: row, column: column }"></td>\n    </tr>\n</tbody>');
I=function(b,m,h,l){function g(a){this.id=this.id="column-header-"+a.id;this.element=this.element=b.observable(null);this.rowSpan=this.rowSpan=b.observable(1);this.columnSpan=this.q=b.observable(1);this.label=this.label=a.label;this.column=this.p=a;this.columns=this.h=[a];this.U=function(a){this.rowSpan(a)}.bind(this)}function c(a){this.id=this.id="column-group-header-"+(a.id||"@__"+ ++p);this.element=this.element=b.observable(null);this.Za=a;this.rowSpan=this.rowSpan=b.observable(a.height);this.columnSpan=
this.q=b.observable(1);this.label=this.label=b.observable(a.label);this.columns=this.h=[];this.U=function(a){this.h=[a];this.q(1)}.bind(this)}function a(a){function b(a){a.cb.forEach(function(b){var d=c[b];if(!d)c[b]=a;else if(d!==a)throw Error("Column `"+b+"` is element of column group `"+d.label+"` as well as `"+a.label+"`.");});a.K&&b(a.K)}var c={};m.f.aa(a,d.bind(this,null)).forEach(function(a){b(a)});return c}function d(a,b){var c=e(b),f=b.elements.filter(function(a){return"string"!==typeof a}),
g=b.elements.filter(function(a){return"string"===typeof a}),c={id:b.id,label:b.label,K:a,depth:a?a.depth+1:0,height:a?a.Ja-c:1,Ja:c,cb:g};return f.length?m.f.aa(f,d.bind(this,c)):c}function e(a){a=a.elements.filter(function(a){return"string"!==typeof a});return 1+Math.max.apply(Math,[0].concat(a.map(e)))}var f=window.document,x=window.Node,p=0;b.bindingHandlers.__gridHeader={init:function(a,c){var d=c()();d.element(a);b.utils.domNodeDisposal.addDisposeCallback(a,function(){d.element(null)});a.insertBefore(f.createTextNode(""),
a.firstChild);return{controlsDescendantBindings:!0}},update:function(a,b){var c=b()(),d=c.id.replace(/[\s]/g,"_");a.className=c.p?"ko-grid-th ko-grid-column-header "+d+" "+c.p.ya().join(" "):"ko-grid-th ko-grid-column-group-header "+d;d=c.h.map(function(a){return a.Q()}).reduce(function(a,b){return a+b})+"px";a.style.width=d;a.style.maxWidth=d;a.rowSpan=c.rowSpan();a.colSpan=c.q();for(d=a.firstChild;d.nodeType!==x.TEXT_NODE;)d=d.nextSibling;d.nodeValue=c.label()}};return{e:function(a){a.replace("head").ia(l)},
m:function(d,e,f){function l(a,b,d){if(!a)return[];if(b[a.depth]&&b[a.depth].Za===a){var e=a;do{var f=b[e.depth];f.h.push(d);f.q(f.q()+1);e=e.K}while(e);return[]}b.length=a.depth;var e=l(a.K,b,d),k=f=a.depth;a=m(x,new c(a));a.U(d);e[f]=b[k]=a;return e}function m(a,b){var c=b.id;return a[c]=a[c]||b}var p=a(d.columnGroups||[]),x={},q={},w=[];this.__rows=this.V=b.computed(function(){var a=f.h.i(),c=0;a.forEach(function(a){a=p[a.id];c=Math.max(c,a?a.depth+a.Ja:0)});w.length=c+1;for(var d=0;d<w.length;++d)w[d]=
w[d]||b.observableArray(),w[d].__rowId="header-row-"+d,w[d].valueWillMutate(),w[d]().length=0;var e=[];a.forEach(function(a){var b=p[a.id],d=b?b.depth+b.height:0;e.length=d;var f=m(q,new g(a));f.U(c-d+1);w[d]().push(f);a=l(b,e,a);for(b=0;b<a.length;++b)a[b]&&w[b]().push(a[b])});w.forEach(function(a){a.valueHasMutated()});return w});this.all=this.all=b.computed(function(){var a=[];this.V().forEach(function(b){Array.prototype.push.apply(a,b())});return a}.bind(this));this.forColumn=this.xa=function(a){a=
"column-header-"+a.id;if(!Object.prototype.hasOwnProperty.call(q,a))throw Error("There is no header for the given column.");return q[a]};var r=new h(function(a,c){return[a,b.contextFor(c).header()]});this.__handleClick=function(a,b){r.fa(".ko-grid-column-header, .ko-grid-column-group-header").Z(b);return!b.defaultPrevented};this.Ia=r.s.bind(r);this.Ha=function(a,b){function c(a,d){d instanceof g&&b.apply(this,arguments)}var d=1<arguments.length;b=d?b:a;r.s.apply(r,d?[a,c]:[c])};this.onHeaderClick=
this.Ia;this.onColumnHeaderClick=this.Ha;this.o=function(){this.V.dispose();this.all.dispose()}.bind(this)}}}(q,r,u,'<thead class="ko-grid-thead" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n    \x3c!--before:headers--\x3e\n    <tr class="ko-grid-tr ko-grid-headers"\n        data-bind="indexedRepeat: { forEach: headers.__rows, indexedBy: \'__rowId\', as: \'headerRow\' }"\n        data-repeat-bind="click: headers.__handleClick">\n\n        <th class="ko-grid-th"\n            data-bind="indexedRepeat: { forEach: headerRow(), indexedBy: \'id\', as: \'header\' }"\n            data-repeat-bind="__gridHeader: header"></th>\n    </tr>\n    \x3c!--after:headers--\x3e\n</thead>');
D=function(b,m,h,l,g){b=b.bindingHandlers.grid=b.bindingHandlers.grid||{};return b.core=b.core||{columns:m,data:h,headers:l,layout:g}}(q,H,B,I,function(b){function m(b,a,d,e){var f=b.element,g=f.querySelector(".ko-grid-table-scroller-padding"),h=f.querySelector(".ko-grid-table-scroller"),k=f.querySelector(".ko-grid-thead"),n=f.querySelector(".ko-grid-tfoot"),m=!1;return function(b){if(!m)try{a(m=!0);var c=h.scrollLeft;b&&b();d.forEach(function(a){a.call(f)});l(f,function(){g.style.borderTopWidth=
Math.max(k.clientHeight,0)+"px";g.style.borderBottomWidth=Math.max(n.clientHeight,0)+"px"});h.scrollLeft=c;e.forEach(function(a){a.call(f)})}finally{a(!1),m=!1}}}function h(b){b=b.element;var a=b.querySelector(".ko-grid-table-scroller"),d=b.querySelector(".ko-grid-thead"),e=b.querySelector(".ko-grid-tfoot");a.addEventListener("scroll",function(){var b=-a.scrollLeft+"px";d.style.left=b;e.style.left=b})}function l(b,a){if(b.offsetWidth&&b.offsetHeight)a();else{var d=b.parentNode,e=g.createComment("placeholder");
d.replaceChild(e,b);var f=b.style.position;b.style.position="absolute";b.style.visibility="hidden";g.body.appendChild(b);try{a()}finally{d.replaceChild(b,e),b.style.position=f,b.style.visibility="visible"}}}var g=window.document;return{e:function(){},m:function(c,a,d){function e(a){a&&a()}var f=b.observable(!1);this.recalculate=this.Oa=function(a){e(a)};var l=b.computed(function(){f()||(d.h.i().forEach(function(a){a.width()}),e())}),p=[],k=[];this.na=function(a){p.push(a)};this.ma=function(a){k.push(a)};
this.beforeRelayout=this.na;this.afterRelayout=this.ma;this.A=function(){h.call(this,d);e=m(d,f,p,k);d.Ka(e)}.bind(this);this.determineCellDimensions=this.ta=function(a){var b=g.createElement("div");b.className="ko-grid-td ko-grid-cell";b.appendChild("string"===typeof a?g.createTextNode(a):a);b.style.position="absolute";b.style.visibility="hidden";g.body.appendChild(b);try{return{width:b.offsetWidth,height:b.offsetHeight}}finally{g.body.removeChild(b)}};this.o=function(){l.dispose()}}}}(q));(function(b,
m){function h(a,b){if(m.c.r(c,a))throw Error("Extension id or alias already in use: `"+a+"`.");c[a]=b;b.T.push(a);return b}function l(a,b){this.Na=a;this.Y=b.Y||[];this.za=b.za||function(){};this.m=b.m;this.T=[]}var g=b.bindingHandlers.grid=b.bindingHandlers.grid||{},c=g.extensions=g.extensions||{};g.kb=function(a,b){return h(a,new l(a,b))};g.O=function(a){if(!m.c.r(c,a))throw Error("No known extension id or alias: `"+a+"`.");return c[a]};g.ib=function(a,b){return h(a,g.O(b))};g.jb=function(a,b){var c=
g.O(b);a.forEach(function(a){return h(a,c)});return c};l.prototype={get sb(){return this.T.slice()},wa:function(a,b){var c=this.ka(a,function(a){throw Error("Conflicting configurations "+a.map(function(a){return"`"+a+"`"}).join(", ")+" (configuration: `"+b+"`).");});if(!c)throw Error("The extension `"+this.Na+"` must be configured (configuration: `"+b+"`)");return a[c]},Fb:function(a){var b=this.ka(a,function(a){throw Error("Conflicting binding values "+a.map(function(a){return"`"+a+"`"}).join(", ")+
".");});return a[b]},ka:function(a,b){var c=this.T.filter(function(b){return m.c.r(a,b)});1<c.length&&b(c);return c[0]}};return c})(q,r);return function(b){return b}(function(b,m,h,l){function g(a,c){function e(){var b=p[a];c(b.fb,b.Eb,b.mb)}p[a]?e():b([a],function(b){function c(e){e=d.O(e);var f=e.Na,p=e.wa(l,a);if(!h.f.contains(m,f)){if(h.f.contains(n,f))throw Error("Dependency-Cycle: .. -> "+n.join(" -> ")+" -> "+f+" -> ..");n.push(f);e.Y.forEach(c);e.za(g,p,b);if(n.pop()!==f)throw Error("Assertion error.");
m.push(f)}}var g=new G('<div class="ko-grid">\n    \x3c!--before:grid--\x3e\n    <div class="ko-grid-table-container">\n        \x3c!--before:table--\x3e\n        <div class="ko-grid-table-scroller-padding">\n            <div class="ko-grid-table-scroller">\n                <table class="ko-grid-table" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\n                    \x3c!--columns--\x3e\n                    \x3c!--head--\x3e\n                    <tfoot class="ko-grid-tfoot" data-bind="_gridWidth: columns.combinedWidth() + \'px\'">\x3c!--tfoot--\x3e</tfoot>\n                    \x3c!--body--\x3e\n                </table>\n            </div>\n        </div>\n        \x3c!--after:table--\x3e\n    </div>\n    \x3c!--after:grid--\x3e\n</div>');
f.forEach(function(a){a.e(g,b)});var l=b.extensions||{},m=[],n=[];Object.keys(l).forEach(c);var q="ko-grid-template-"+a;r.b(q,g.bb());p[a]={fb:b,Eb:q,mb:m};e()})}function c(a,b){this.ab=b;this.primaryKey=this.primaryKey=b.primaryKey;this.rootElement=a;this.element=this.element=null;this.o=function(){};this.l=function(){};this.Ka=function(a){if(!this.l)throw Error("Illegal state: postApplyBindings-callbacks have been called already.");var b=this.l;this.l=function(){b();a()}}.bind(this);var c=new l;
this.b=c.s.bind(c);this["onKeyDown "]=this.b;a.addEventListener("keydown",function(a){c.fa(".ko-grid").Z(a);return!a.defaultPrevented})}var a=window.document,d=m.bindingHandlers.grid=m.bindingHandlers.grid||{},e=["columns","headers","data","layout"],f=e.map(function(a){return D[a]}),r=new m.nativeTemplateEngine;r.b=function(b,c){var d=a.createElement("script");d.id=b;d.type="text/html";d.text=c;a.querySelector("head").appendChild(d)};m.bindingHandlers.grid.init=function(a,b,f,l,p){function q(a){return"function"===
typeof a?a.apply(void 0,Array.prototype.slice.call(arguments,1)):a}var u=b(),z=u.config;g(z,function(b,f,g){var l=[],n=new c(a,u);m.utils.domNodeDisposal.addDisposeCallback(a,function(){n.o();l.forEach(function(a){a()})});h.c.ba(D,function(a,c){var d=new c.m(u,b,n);n[a]=d;n.h=n.columns;n.headers=n.headers;n.data=n.data;n.k=n.layout;"function"===typeof d.o&&l.push(d.o.bind(d))});var y=b.extensions,B=u.extensions||{},C=n.extensions=n.nb={};for(g.forEach(function(a){a=d.O(a);var c=a.Fb(B)||{},e=q(a.wa(y,
z),c,u);if((!1!==e.enabled||!0===c.enabled)&&!1!==c.enabled){a.Y.forEach(function(a){if(!C[a])throw Error("Dependency '"+a+"' was disabled.");});var f=new a.m(c,e,n,u,b);a.sb.forEach(function(a){C[a]=f});"function"===typeof f.dispose&&l.push(f.dispose.bind(f))}});a.firstChild;)m.removeNode(a.firstChild);g=p.createChildContext(n,"grid");m.renderTemplate(f,g,{templateEngine:r},a);var v=a.querySelector(".ko-grid");n.element=v;n.element=v;h.c.ba(y,function(a){v.className+=" with-"+h.H.sa(a)});e.forEach(function(a){n[a].A&&
n[a].A()});n.l();n.l=null});return{controlsDescendantBindings:!0}};m.bindingHandlers.grid.update=function(){};var p={};m.bindingHandlers._gridWidth={init:function(){},update:function(a,b){var c=b();a.style.width=c;a.style.maxWidth=c}};return d}(z,q,r,u))});