parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"shFI":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function t(n,r,o,i,u){e(this,t),this._nombre=n,this._lenguaje=r,this._rate=o,this._tono=i,this._color=u}return n(t,[{key:"nombre",get:function(){return this._nombre}},{key:"lenguaje",get:function(){return this._lenguaje}},{key:"rate",get:function(){return this._rate}},{key:"tono",get:function(){return this._tono}},{key:"color",get:function(){return this._color}}]),t}(),o=r;exports.default=o;
},{}],"ftND":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./perfil.js"));function t(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}var s=function(){function e(t,n){a(this,e),this._chat=t,this._users=n}return r(e,[{key:"construirChat",value:function(){var e,t,a=document.getElementById("chat");for(e=0;e<this._chat.length;e++)t=Object.keys(this._chat)[e],this.crearDialogo(this._chat[t],a)}},{key:"crearDialogo",value:function(e,t){var a=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div"),s=document.createElement("a");a.classList.add("campo"),a.classList.add("ocultar"),n.classList.add("imagen"),n.classList.add(e.author),r.classList.add("texto"),a.appendChild(n),a.appendChild(r),r.appendChild(s),t.appendChild(a),this.normal(e,s)}},{key:"normal",value:function(e,t){this.configurarSynth(this._users[e.author],e.message,t)}},{key:"wordByWord",value:function(e,t){var a,n,r=e.message.split(" ");for(a=0;a<r.length;a++)n=r[a]+" ",this.configurarSynth(this._users[e.author],n,t)}},{key:"configurarSynth",value:function(e,t,a){var n=new SpeechSynthesisUtterance;n.lang=e.lenguaje,n.text=t,n.rate=e.rate,n.volume=.4,n.pitch=e.tono,n.onstart=function(){if(0===a.childNodes.length){var n=document.createTextNode(t);a.appendChild(n),a.parentNode.parentNode.classList.remove("ocultar"),a.classList.add(e.color)}else a.childNodes[0].data=a.childNodes[0].data+t},speechSynthesis.speak(n)}},{key:"letterToLetter",value:function(e,t){var a,n,r=e.message.split(" ");for(a=0;a<r.length;a++)n=r[a]+" ",this.sinthLetter(this._users[e.author],n,t)}},{key:"sinthLetter",value:function(e,t,a){var n,r,s=0;for(n=0;n<t.length;n++)(r=new SpeechSynthesisUtterance).lang=e.lenguaje,r.rate=e.rate,r.volume=.4,r.pitch=e.tono,r.onstart=function(){if(0===a.childNodes.length){var n=document.createTextNode(t.charAt(s));a.appendChild(n),a.parentNode.parentNode.classList.remove("ocultar"),a.classList.add(e.color),s++}else a.childNodes[0].data=a.childNodes[0].data+t.charAt(s),s++},r.text=t.charAt(n),speechSynthesis.speak(r)}}]),e}(),o=s;exports.default=o;
},{"./perfil.js":"shFI"}],"QvaY":[function(require,module,exports) {
"use strict";var e=t(require("./conversation.js")),a=t(require("./perfil.js"));function t(e){return e&&e.__esModule?e:{default:e}}document.getElementById("boton").onclick=function(){document.getElementById("boton").classList.add("ocultar"),document.getElementById("conv").classList.remove("ocultar");var t={Lars:new a.default("Lars","en",1,1.5,"rojo"),Whammet:new a.default("Whammet","en",1,1,"amarillo"),Jason:new a.default("Jason","en",1,1,"verde"),Mustaine:new a.default("Mustaine","en",1,1,"blanco")};new e.default([{author:"Lars",message:"Seriously! This is the fucking sandbox."},{author:"Whammet",message:"Well, he´s wounded"},{author:"Lars",message:"huh?"},{author:"Whammet",message:"he´s wounde. yeah, but you know its up to him to mend himself"},{author:"Whammet",message:"and we´re giving him every opportunity.."},{author:"Lars",message:"He fucking left the band!, He fucking left the band!"},{author:"Lars",message:"I mean, period! Exclamation point!"},{author:"Jason",message:"No way!"},{author:"Mustaine",message:"Oh,you too ?. Wanna hang up in a concert with us ?"}],t).construirChat(),document.getElementById("video").classList.remove("ocultar")};
},{"./conversation.js":"ftND","./perfil.js":"shFI"}]},{},["QvaY"], null)
//# sourceMappingURL=/dsi-p3-synth-kenshinsamue/js.c3b96ca5.js.map