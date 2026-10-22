/*! PodNest - Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com> | MIT License */

"use strict";(()=>{var dn=Object.create;var Qt=Object.defineProperty;var un=Object.getOwnPropertyDescriptor;var pn=Object.getOwnPropertyNames;var mn=Object.getPrototypeOf,kn=Object.prototype.hasOwnProperty;var L=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(s){throw t=0,s}};var bn=(e,t,s,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of pn(t))!kn.call(e,n)&&n!==s&&Qt(e,n,{get:()=>t[n],enumerable:!(a=un(t,n))||a.enumerable});return e};var hn=(e,t,s)=>(s=e!=null?dn(mn(e)):{},bn(t||!e||!e.__esModule?Qt(s,"default",{value:e,enumerable:!0}):s,e));var oa=L((yr,na)=>{na.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var j=L(Q=>{var Ct,ro=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Q.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};Q.getSymbolTotalCodewords=function(t){return ro[t]};Q.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};Q.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');Ct=t};Q.isKanjiModeEnabled=function(){return typeof Ct<"u"};Q.toSJIS=function(t){return Ct(t)}});var Je=L(H=>{H.L={bit:1};H.M={bit:0};H.Q={bit:3};H.H={bit:2};function co(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return H.L;case"m":case"medium":return H.M;case"q":case"quartile":return H.Q;case"h":case"high":return H.H;default:throw new Error("Unknown EC Level: "+e)}}H.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4};H.from=function(t,s){if(H.isValid(t))return t;try{return co(t)}catch{return s}}});var ra=L((Sr,la)=>{function ia(){this.buffer=[],this.length=0}ia.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let s=0;s<t;s++)this.putBit((e>>>t-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};la.exports=ia});var da=L(($r,ca)=>{function Ee(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}Ee.prototype.set=function(e,t,s,a){let n=e*this.size+t;this.data[n]=s,a&&(this.reservedBit[n]=!0)};Ee.prototype.get=function(e,t){return this.data[e*this.size+t]};Ee.prototype.xor=function(e,t,s){this.data[e*this.size+t]^=s};Ee.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};ca.exports=Ee});var ua=L(Xe=>{var uo=j().getSymbolSize;Xe.getRowColCoords=function(t){if(t===1)return[];let s=Math.floor(t/7)+2,a=uo(t),n=a===145?26:Math.ceil((a-13)/(2*s-2))*2,o=[a-7];for(let i=1;i<s-1;i++)o[i]=o[i-1]-n;return o.push(6),o.reverse()};Xe.getPositions=function(t){let s=[],a=Xe.getRowColCoords(t),n=a.length;for(let o=0;o<n;o++)for(let i=0;i<n;i++)o===0&&i===0||o===0&&i===n-1||o===n-1&&i===0||s.push([a[o],a[i]]);return s}});var ka=L(ma=>{var po=j().getSymbolSize,pa=7;ma.getPositions=function(t){let s=po(t);return[[0,0],[s-pa,0],[0,s-pa]]}});var ba=L(C=>{C.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var Z={N1:3,N2:3,N3:40,N4:10};C.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7};C.from=function(t){return C.isValid(t)?parseInt(t,10):void 0};C.getPenaltyN1=function(t){let s=t.size,a=0,n=0,o=0,i=null,l=null;for(let r=0;r<s;r++){n=o=0,i=l=null;for(let d=0;d<s;d++){let u=t.get(r,d);u===i?n++:(n>=5&&(a+=Z.N1+(n-5)),i=u,n=1),u=t.get(d,r),u===l?o++:(o>=5&&(a+=Z.N1+(o-5)),l=u,o=1)}n>=5&&(a+=Z.N1+(n-5)),o>=5&&(a+=Z.N1+(o-5))}return a};C.getPenaltyN2=function(t){let s=t.size,a=0;for(let n=0;n<s-1;n++)for(let o=0;o<s-1;o++){let i=t.get(n,o)+t.get(n,o+1)+t.get(n+1,o)+t.get(n+1,o+1);(i===4||i===0)&&a++}return a*Z.N2};C.getPenaltyN3=function(t){let s=t.size,a=0,n=0,o=0;for(let i=0;i<s;i++){n=o=0;for(let l=0;l<s;l++)n=n<<1&2047|t.get(i,l),l>=10&&(n===1488||n===93)&&a++,o=o<<1&2047|t.get(l,i),l>=10&&(o===1488||o===93)&&a++}return a*Z.N3};C.getPenaltyN4=function(t){let s=0,a=t.data.length;for(let o=0;o<a;o++)s+=t.data[o];return Math.abs(Math.ceil(s*100/a/5)-10)*Z.N4};function mo(e,t,s){switch(e){case C.Patterns.PATTERN000:return(t+s)%2===0;case C.Patterns.PATTERN001:return t%2===0;case C.Patterns.PATTERN010:return s%3===0;case C.Patterns.PATTERN011:return(t+s)%3===0;case C.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(s/3))%2===0;case C.Patterns.PATTERN101:return t*s%2+t*s%3===0;case C.Patterns.PATTERN110:return(t*s%2+t*s%3)%2===0;case C.Patterns.PATTERN111:return(t*s%3+(t+s)%2)%2===0;default:throw new Error("bad maskPattern:"+e)}}C.applyMask=function(t,s){let a=s.size;for(let n=0;n<a;n++)for(let o=0;o<a;o++)s.isReserved(o,n)||s.xor(o,n,mo(t,o,n))};C.getBestMask=function(t,s){let a=Object.keys(C.Patterns).length,n=0,o=1/0;for(let i=0;i<a;i++){s(i),C.applyMask(i,t);let l=C.getPenaltyN1(t)+C.getPenaltyN2(t)+C.getPenaltyN3(t)+C.getPenaltyN4(t);C.applyMask(i,t),l<o&&(o=l,n=i)}return n}});var Pt=L(It=>{var z=Je(),Ge=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Ye=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];It.getBlocksCount=function(t,s){switch(s){case z.L:return Ge[(t-1)*4+0];case z.M:return Ge[(t-1)*4+1];case z.Q:return Ge[(t-1)*4+2];case z.H:return Ge[(t-1)*4+3];default:return}};It.getTotalCodewordsCount=function(t,s){switch(s){case z.L:return Ye[(t-1)*4+0];case z.M:return Ye[(t-1)*4+1];case z.Q:return Ye[(t-1)*4+2];case z.H:return Ye[(t-1)*4+3];default:return}}});var ha=L(Ze=>{var Le=new Uint8Array(512),Qe=new Uint8Array(256);(function(){let t=1;for(let s=0;s<255;s++)Le[s]=t,Qe[t]=s,t<<=1,t&256&&(t^=285);for(let s=255;s<512;s++)Le[s]=Le[s-255]})();Ze.log=function(t){if(t<1)throw new Error("log("+t+")");return Qe[t]};Ze.exp=function(t){return Le[t]};Ze.mul=function(t,s){return t===0||s===0?0:Le[Qe[t]+Qe[s]]}});var fa=L(Te=>{var Bt=ha();Te.mul=function(t,s){let a=new Uint8Array(t.length+s.length-1);for(let n=0;n<t.length;n++)for(let o=0;o<s.length;o++)a[n+o]^=Bt.mul(t[n],s[o]);return a};Te.mod=function(t,s){let a=new Uint8Array(t);for(;a.length-s.length>=0;){let n=a[0];for(let i=0;i<s.length;i++)a[i]^=Bt.mul(s[i],n);let o=0;for(;o<a.length&&a[o]===0;)o++;a=a.slice(o)}return a};Te.generateECPolynomial=function(t){let s=new Uint8Array([1]);for(let a=0;a<t;a++)s=Te.mul(s,new Uint8Array([1,Bt.exp(a)]));return s}});var ya=L((Br,va)=>{var ga=fa();function _t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}_t.prototype.initialize=function(t){this.degree=t,this.genPoly=ga.generateECPolynomial(this.degree)};_t.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");let s=new Uint8Array(t.length+this.degree);s.set(t);let a=ga.mod(s,this.genPoly),n=this.degree-a.length;if(n>0){let o=new Uint8Array(this.degree);return o.set(a,n),o}return a};va.exports=_t});var At=L(wa=>{wa.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}});var qt=L(F=>{var xa="[0-9]+",ko="[A-Z $%*+\\-./:]+",Ce="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Ce=Ce.replace(/u/g,"\\u");var bo="(?:(?![A-Z0-9 $%*+\\-./:]|"+Ce+`)(?:.|[\r
]))+`;F.KANJI=new RegExp(Ce,"g");F.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");F.BYTE=new RegExp(bo,"g");F.NUMERIC=new RegExp(xa,"g");F.ALPHANUMERIC=new RegExp(ko,"g");var ho=new RegExp("^"+Ce+"$"),fo=new RegExp("^"+xa+"$"),go=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");F.testKanji=function(t){return ho.test(t)};F.testNumeric=function(t){return fo.test(t)};F.testAlphanumeric=function(t){return go.test(t)}});var O=L(I=>{var vo=At(),Mt=qt();I.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};I.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};I.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};I.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};I.MIXED={bit:-1};I.getCharCountIndicator=function(t,s){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!vo.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?t.ccBits[0]:s<27?t.ccBits[1]:t.ccBits[2]};I.getBestModeForData=function(t){return Mt.testNumeric(t)?I.NUMERIC:Mt.testAlphanumeric(t)?I.ALPHANUMERIC:Mt.testKanji(t)?I.KANJI:I.BYTE};I.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")};I.isValid=function(t){return t&&t.bit&&t.ccBits};function yo(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return I.NUMERIC;case"alphanumeric":return I.ALPHANUMERIC;case"kanji":return I.KANJI;case"byte":return I.BYTE;default:throw new Error("Unknown mode: "+e)}}I.from=function(t,s){if(I.isValid(t))return t;try{return yo(t)}catch{return s}}});var Ta=L(ee=>{var et=j(),wo=Pt(),Sa=Je(),V=O(),Rt=At(),Ea=7973,$a=et.getBCHDigit(Ea);function xo(e,t,s){for(let a=1;a<=40;a++)if(t<=ee.getCapacity(a,s,e))return a}function La(e,t){return V.getCharCountIndicator(e,t)+4}function So(e,t){let s=0;return e.forEach(function(a){let n=La(a.mode,t);s+=n+a.getBitsLength()}),s}function $o(e,t){for(let s=1;s<=40;s++)if(So(e,s)<=ee.getCapacity(s,t,V.MIXED))return s}ee.from=function(t,s){return Rt.isValid(t)?parseInt(t,10):s};ee.getCapacity=function(t,s,a){if(!Rt.isValid(t))throw new Error("Invalid QR Code version");typeof a>"u"&&(a=V.BYTE);let n=et.getSymbolTotalCodewords(t),o=wo.getTotalCodewordsCount(t,s),i=(n-o)*8;if(a===V.MIXED)return i;let l=i-La(a,t);switch(a){case V.NUMERIC:return Math.floor(l/10*3);case V.ALPHANUMERIC:return Math.floor(l/11*2);case V.KANJI:return Math.floor(l/13);case V.BYTE:default:return Math.floor(l/8)}};ee.getBestVersionForData=function(t,s){let a,n=Sa.from(s,Sa.M);if(Array.isArray(t)){if(t.length>1)return $o(t,n);if(t.length===0)return 1;a=t[0]}else a=t;return xo(a.mode,a.getLength(),n)};ee.getEncodedBits=function(t){if(!Rt.isValid(t)||t<7)throw new Error("Invalid QR Code version");let s=t<<12;for(;et.getBCHDigit(s)-$a>=0;)s^=Ea<<et.getBCHDigit(s)-$a;return t<<12|s}});var Ba=L(Pa=>{var Dt=j(),Ia=1335,Eo=21522,Ca=Dt.getBCHDigit(Ia);Pa.getEncodedBits=function(t,s){let a=t.bit<<3|s,n=a<<10;for(;Dt.getBCHDigit(n)-Ca>=0;)n^=Ia<<Dt.getBCHDigit(n)-Ca;return(a<<10|n)^Eo}});var Aa=L((Dr,_a)=>{var Lo=O();function me(e){this.mode=Lo.NUMERIC,this.data=e.toString()}me.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};me.prototype.getLength=function(){return this.data.length};me.prototype.getBitsLength=function(){return me.getBitsLength(this.data.length)};me.prototype.write=function(t){let s,a,n;for(s=0;s+3<=this.data.length;s+=3)a=this.data.substr(s,3),n=parseInt(a,10),t.put(n,10);let o=this.data.length-s;o>0&&(a=this.data.substr(s),n=parseInt(a,10),t.put(n,o*3+1))};_a.exports=me});var Ma=L((Hr,qa)=>{var To=O(),Ht=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function ke(e){this.mode=To.ALPHANUMERIC,this.data=e}ke.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};ke.prototype.getLength=function(){return this.data.length};ke.prototype.getBitsLength=function(){return ke.getBitsLength(this.data.length)};ke.prototype.write=function(t){let s;for(s=0;s+2<=this.data.length;s+=2){let a=Ht.indexOf(this.data[s])*45;a+=Ht.indexOf(this.data[s+1]),t.put(a,11)}this.data.length%2&&t.put(Ht.indexOf(this.data[s]),6)};qa.exports=ke});var Da=L((Nr,Ra)=>{var Co=O();function be(e){this.mode=Co.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}be.getBitsLength=function(t){return t*8};be.prototype.getLength=function(){return this.data.length};be.prototype.getBitsLength=function(){return be.getBitsLength(this.data.length)};be.prototype.write=function(e){for(let t=0,s=this.data.length;t<s;t++)e.put(this.data[t],8)};Ra.exports=be});var Na=L((Ur,Ha)=>{var Io=O(),Po=j();function he(e){this.mode=Io.KANJI,this.data=e}he.getBitsLength=function(t){return t*13};he.prototype.getLength=function(){return this.data.length};he.prototype.getBitsLength=function(){return he.getBitsLength(this.data.length)};he.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let s=Po.toSJIS(this.data[t]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),e.put(s,13)}};Ha.exports=he});var Ua=L((Fr,Nt)=>{"use strict";var Ie={single_source_shortest_paths:function(e,t,s){var a={},n={};n[t]=0;var o=Ie.PriorityQueue.make();o.push(t,0);for(var i,l,r,d,u,c,m,k,h;!o.empty();){i=o.pop(),l=i.value,d=i.cost,u=e[l]||{};for(r in u)u.hasOwnProperty(r)&&(c=u[r],m=d+c,k=n[r],h=typeof n[r]>"u",(h||k>m)&&(n[r]=m,o.push(r,m),a[r]=l))}if(typeof s<"u"&&typeof n[s]>"u"){var g=["Could not find a path from ",t," to ",s,"."].join("");throw new Error(g)}return a},extract_shortest_path_from_predecessor_list:function(e,t){for(var s=[],a=t,n;a;)s.push(a),n=e[a],a=e[a];return s.reverse(),s},find_path:function(e,t,s){var a=Ie.single_source_shortest_paths(e,t,s);return Ie.extract_shortest_path_from_predecessor_list(a,s)},PriorityQueue:{make:function(e){var t=Ie.PriorityQueue,s={},a;e=e||{};for(a in t)t.hasOwnProperty(a)&&(s[a]=t[a]);return s.queue=[],s.sorter=e.sorter||t.default_sorter,s},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){var s={value:e,cost:t};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof Nt<"u"&&(Nt.exports=Ie)});var Ja=L(fe=>{var $=O(),ja=Aa(),za=Ma(),Oa=Da(),Va=Na(),Pe=qt(),tt=j(),Bo=Ua();function Fa(e){return unescape(encodeURIComponent(e)).length}function Be(e,t,s){let a=[],n;for(;(n=e.exec(s))!==null;)a.push({data:n[0],index:n.index,mode:t,length:n[0].length});return a}function Ka(e){let t=Be(Pe.NUMERIC,$.NUMERIC,e),s=Be(Pe.ALPHANUMERIC,$.ALPHANUMERIC,e),a,n;return tt.isKanjiModeEnabled()?(a=Be(Pe.BYTE,$.BYTE,e),n=Be(Pe.KANJI,$.KANJI,e)):(a=Be(Pe.BYTE_KANJI,$.BYTE,e),n=[]),t.concat(s,a,n).sort(function(i,l){return i.index-l.index}).map(function(i){return{data:i.data,mode:i.mode,length:i.length}})}function Ut(e,t){switch(t){case $.NUMERIC:return ja.getBitsLength(e);case $.ALPHANUMERIC:return za.getBitsLength(e);case $.KANJI:return Va.getBitsLength(e);case $.BYTE:return Oa.getBitsLength(e)}}function _o(e){return e.reduce(function(t,s){let a=t.length-1>=0?t[t.length-1]:null;return a&&a.mode===s.mode?(t[t.length-1].data+=s.data,t):(t.push(s),t)},[])}function Ao(e){let t=[];for(let s=0;s<e.length;s++){let a=e[s];switch(a.mode){case $.NUMERIC:t.push([a,{data:a.data,mode:$.ALPHANUMERIC,length:a.length},{data:a.data,mode:$.BYTE,length:a.length}]);break;case $.ALPHANUMERIC:t.push([a,{data:a.data,mode:$.BYTE,length:a.length}]);break;case $.KANJI:t.push([a,{data:a.data,mode:$.BYTE,length:Fa(a.data)}]);break;case $.BYTE:t.push([{data:a.data,mode:$.BYTE,length:Fa(a.data)}])}}return t}function qo(e,t){let s={},a={start:{}},n=["start"];for(let o=0;o<e.length;o++){let i=e[o],l=[];for(let r=0;r<i.length;r++){let d=i[r],u=""+o+r;l.push(u),s[u]={node:d,lastCount:0},a[u]={};for(let c=0;c<n.length;c++){let m=n[c];s[m]&&s[m].node.mode===d.mode?(a[m][u]=Ut(s[m].lastCount+d.length,d.mode)-Ut(s[m].lastCount,d.mode),s[m].lastCount+=d.length):(s[m]&&(s[m].lastCount=d.length),a[m][u]=Ut(d.length,d.mode)+4+$.getCharCountIndicator(d.mode,t))}}n=l}for(let o=0;o<n.length;o++)a[n[o]].end=0;return{map:a,table:s}}function Wa(e,t){let s,a=$.getBestModeForData(e);if(s=$.from(t,a),s!==$.BYTE&&s.bit<a.bit)throw new Error('"'+e+'" cannot be encoded with mode '+$.toString(s)+`.
 Suggested mode is: `+$.toString(a));switch(s===$.KANJI&&!tt.isKanjiModeEnabled()&&(s=$.BYTE),s){case $.NUMERIC:return new ja(e);case $.ALPHANUMERIC:return new za(e);case $.KANJI:return new Va(e);case $.BYTE:return new Oa(e)}}fe.fromArray=function(t){return t.reduce(function(s,a){return typeof a=="string"?s.push(Wa(a,null)):a.data&&s.push(Wa(a.data,a.mode)),s},[])};fe.fromString=function(t,s){let a=Ka(t,tt.isKanjiModeEnabled()),n=Ao(a),o=qo(n,s),i=Bo.find_path(o.map,"start","end"),l=[];for(let r=1;r<i.length-1;r++)l.push(o.table[i[r]].node);return fe.fromArray(_o(l))};fe.rawSplit=function(t){return fe.fromArray(Ka(t,tt.isKanjiModeEnabled()))}});var Ga=L(Xa=>{var at=j(),Ft=Je(),Mo=ra(),Ro=da(),Do=ua(),Ho=ka(),zt=ba(),Ot=Pt(),No=ya(),st=Ta(),Uo=Ba(),Fo=O(),Wt=Ja();function Wo(e,t){let s=e.size,a=Ho.getPositions(t);for(let n=0;n<a.length;n++){let o=a[n][0],i=a[n][1];for(let l=-1;l<=7;l++)if(!(o+l<=-1||s<=o+l))for(let r=-1;r<=7;r++)i+r<=-1||s<=i+r||(l>=0&&l<=6&&(r===0||r===6)||r>=0&&r<=6&&(l===0||l===6)||l>=2&&l<=4&&r>=2&&r<=4?e.set(o+l,i+r,!0,!0):e.set(o+l,i+r,!1,!0))}}function jo(e){let t=e.size;for(let s=8;s<t-8;s++){let a=s%2===0;e.set(s,6,a,!0),e.set(6,s,a,!0)}}function zo(e,t){let s=Do.getPositions(t);for(let a=0;a<s.length;a++){let n=s[a][0],o=s[a][1];for(let i=-2;i<=2;i++)for(let l=-2;l<=2;l++)i===-2||i===2||l===-2||l===2||i===0&&l===0?e.set(n+i,o+l,!0,!0):e.set(n+i,o+l,!1,!0)}}function Oo(e,t){let s=e.size,a=st.getEncodedBits(t),n,o,i;for(let l=0;l<18;l++)n=Math.floor(l/3),o=l%3+s-8-3,i=(a>>l&1)===1,e.set(n,o,i,!0),e.set(o,n,i,!0)}function jt(e,t,s){let a=e.size,n=Uo.getEncodedBits(t,s),o,i;for(o=0;o<15;o++)i=(n>>o&1)===1,o<6?e.set(o,8,i,!0):o<8?e.set(o+1,8,i,!0):e.set(a-15+o,8,i,!0),o<8?e.set(8,a-o-1,i,!0):o<9?e.set(8,15-o-1+1,i,!0):e.set(8,15-o-1,i,!0);e.set(a-8,8,1,!0)}function Vo(e,t){let s=e.size,a=-1,n=s-1,o=7,i=0;for(let l=s-1;l>0;l-=2)for(l===6&&l--;;){for(let r=0;r<2;r++)if(!e.isReserved(n,l-r)){let d=!1;i<t.length&&(d=(t[i]>>>o&1)===1),e.set(n,l-r,d),o--,o===-1&&(i++,o=7)}if(n+=a,n<0||s<=n){n-=a,a=-a;break}}}function Ko(e,t,s){let a=new Mo;s.forEach(function(r){a.put(r.mode.bit,4),a.put(r.getLength(),Fo.getCharCountIndicator(r.mode,e)),r.write(a)});let n=at.getSymbolTotalCodewords(e),o=Ot.getTotalCodewordsCount(e,t),i=(n-o)*8;for(a.getLengthInBits()+4<=i&&a.put(0,4);a.getLengthInBits()%8!==0;)a.putBit(0);let l=(i-a.getLengthInBits())/8;for(let r=0;r<l;r++)a.put(r%2?17:236,8);return Jo(a,e,t)}function Jo(e,t,s){let a=at.getSymbolTotalCodewords(t),n=Ot.getTotalCodewordsCount(t,s),o=a-n,i=Ot.getBlocksCount(t,s),l=a%i,r=i-l,d=Math.floor(a/i),u=Math.floor(o/i),c=u+1,m=d-u,k=new No(m),h=0,g=new Array(i),f=new Array(i),w=0,T=new Uint8Array(e.buffer);for(let se=0;se<i;se++){let ct=se<r?u:c;g[se]=T.slice(h,h+ct),f[se]=k.encode(g[se]),h+=ct,w=Math.max(w,ct)}let A=new Uint8Array(a),N=0,B,q;for(B=0;B<w;B++)for(q=0;q<i;q++)B<g[q].length&&(A[N++]=g[q][B]);for(B=0;B<m;B++)for(q=0;q<i;q++)A[N++]=f[q][B];return A}function Xo(e,t,s,a){let n;if(Array.isArray(e))n=Wt.fromArray(e);else if(typeof e=="string"){let d=t;if(!d){let u=Wt.rawSplit(e);d=st.getBestVersionForData(u,s)}n=Wt.fromString(e,d||40)}else throw new Error("Invalid data");let o=st.getBestVersionForData(n,s);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=o;else if(t<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);let i=Ko(t,s,n),l=at.getSymbolSize(t),r=new Ro(l);return Wo(r,t),jo(r),zo(r,t),jt(r,s,0),t>=7&&Oo(r,t),Vo(r,i),isNaN(a)&&(a=zt.getBestMask(r,jt.bind(null,r,s))),zt.applyMask(a,r),jt(r,s,a),{modules:r,version:t,errorCorrectionLevel:s,maskPattern:a,segments:n}}Xa.create=function(t,s){if(typeof t>"u"||t==="")throw new Error("No input text");let a=Ft.M,n,o;return typeof s<"u"&&(a=Ft.from(s.errorCorrectionLevel,Ft.M),n=st.from(s.version),o=zt.from(s.maskPattern),s.toSJISFunc&&at.setToSJISFunction(s.toSJISFunc)),Xo(t,n,a,o)}});var Vt=L(te=>{function Ya(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||t.length===5||t.length>8)throw new Error("Invalid hex color: "+e);(t.length===3||t.length===4)&&(t=Array.prototype.concat.apply([],t.map(function(a){return[a,a]}))),t.length===6&&t.push("F","F");let s=parseInt(t.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+t.slice(0,6).join("")}}te.getOptions=function(t){t||(t={}),t.color||(t.color={});let s=typeof t.margin>"u"||t.margin===null||t.margin<0?4:t.margin,a=t.width&&t.width>=21?t.width:void 0,n=t.scale||4;return{width:a,scale:a?4:n,margin:s,color:{dark:Ya(t.color.dark||"#000000ff"),light:Ya(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}};te.getScale=function(t,s){return s.width&&s.width>=t+s.margin*2?s.width/(t+s.margin*2):s.scale};te.getImageWidth=function(t,s){let a=te.getScale(t,s);return Math.floor((t+s.margin*2)*a)};te.qrToImageData=function(t,s,a){let n=s.modules.size,o=s.modules.data,i=te.getScale(n,a),l=Math.floor((n+a.margin*2)*i),r=a.margin*i,d=[a.color.light,a.color.dark];for(let u=0;u<l;u++)for(let c=0;c<l;c++){let m=(u*l+c)*4,k=a.color.light;if(u>=r&&c>=r&&u<l-r&&c<l-r){let h=Math.floor((u-r)/i),g=Math.floor((c-r)/i);k=d[o[h*n+g]?1:0]}t[m++]=k.r,t[m++]=k.g,t[m++]=k.b,t[m]=k.a}}});var Qa=L(nt=>{var Kt=Vt();function Go(e,t,s){e.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=s,t.width=s,t.style.height=s+"px",t.style.width=s+"px"}function Yo(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}nt.render=function(t,s,a){let n=a,o=s;typeof n>"u"&&(!s||!s.getContext)&&(n=s,s=void 0),s||(o=Yo()),n=Kt.getOptions(n);let i=Kt.getImageWidth(t.modules.size,n),l=o.getContext("2d"),r=l.createImageData(i,i);return Kt.qrToImageData(r.data,t,n),Go(l,o,i),l.putImageData(r,0,0),o};nt.renderToDataURL=function(t,s,a){let n=a;typeof n>"u"&&(!s||!s.getContext)&&(n=s,s=void 0),n||(n={});let o=nt.render(t,s,n),i=n.type||"image/png",l=n.rendererOpts||{};return o.toDataURL(i,l.quality)}});var tn=L(en=>{var Qo=Vt();function Za(e,t){let s=e.a/255,a=t+'="'+e.hex+'"';return s<1?a+" "+t+'-opacity="'+s.toFixed(2).slice(1)+'"':a}function Jt(e,t,s){let a=e+t;return typeof s<"u"&&(a+=" "+s),a}function Zo(e,t,s){let a="",n=0,o=!1,i=0;for(let l=0;l<e.length;l++){let r=Math.floor(l%t),d=Math.floor(l/t);!r&&!o&&(o=!0),e[l]?(i++,l>0&&r>0&&e[l-1]||(a+=o?Jt("M",r+s,.5+d+s):Jt("m",n,0),n=0,o=!1),r+1<t&&e[l+1]||(a+=Jt("h",i),i=0)):n++}return a}en.render=function(t,s,a){let n=Qo.getOptions(s),o=t.modules.size,i=t.modules.data,l=o+n.margin*2,r=n.color.light.a?"<path "+Za(n.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",d="<path "+Za(n.color.dark,"stroke")+' d="'+Zo(i,o,n.margin)+'"/>',u='viewBox="0 0 '+l+" "+l+'"',m='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+u+' shape-rendering="crispEdges">'+r+d+`</svg>
`;return typeof a=="function"&&a(null,m),m}});var an=L(_e=>{var ei=oa(),Xt=Ga(),sn=Qa(),ti=tn();function Gt(e,t,s,a,n){let o=[].slice.call(arguments,1),i=o.length,l=typeof o[i-1]=="function";if(!l&&!ei())throw new Error("Callback required as last argument");if(l){if(i<2)throw new Error("Too few arguments provided");i===2?(n=s,s=t,t=a=void 0):i===3&&(t.getContext&&typeof n>"u"?(n=a,a=void 0):(n=a,a=s,s=t,t=void 0))}else{if(i<1)throw new Error("Too few arguments provided");return i===1?(s=t,t=a=void 0):i===2&&!t.getContext&&(a=s,s=t,t=void 0),new Promise(function(r,d){try{let u=Xt.create(s,a);r(e(u,t,a))}catch(u){d(u)}})}try{let r=Xt.create(s,a);n(null,e(r,t,a))}catch(r){n(r)}}_e.create=Xt.create;_e.toCanvas=Gt.bind(null,sn.render);_e.toDataURL=Gt.bind(null,sn.renderToDataURL);_e.toString=Gt.bind(null,function(e,t,s){return ti.render(e,s)})});var b={async _req(e,t,s,a=6e4){let n=new AbortController,o=setTimeout(()=>n.abort(),a),i={method:e,headers:{"Content-Type":"application/json"},signal:n.signal};e!=="GET"&&e!=="HEAD"&&(i.headers["X-CSRF-Token"]=window.KP?.csrf??""),s!==void 0&&(i.body=JSON.stringify(s));try{let l=await fetch("/api"+t,i);clearTimeout(o);let r=l.status===204?null:await l.json().catch(()=>null);if(l.status===401)return window.location.href="/login?msg=expired",null;if(!l.ok)throw new Error(r?.error||`HTTP ${l.status}`);return r}catch(l){throw clearTimeout(o),l}},get:e=>b._req("GET",e),post:(e,t,s)=>b._req("POST",e,t,s),put:(e,t,s)=>b._req("PUT",e,t,s),delete:(e,t)=>b._req("DELETE",e,t),patch:(e,t)=>b._req("PATCH",e,t)};var v=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");function P(e){return e===0?"0 B":e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:e<1073741824?`${(e/1048576).toFixed(1)} MB`:`${(e/1073741824).toFixed(2)} GB`}var Ae=()=>'<div class="kp-spinner"><div uk-spinner="ratio: 1.25"></div></div>',_=e=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: warning; ratio: 2.5"></div>
        <div class="kp-empty-text">${v(e)}</div>
    </div>`,ae=(e,t)=>`<div class="kp-empty">
        <div class="kp-empty-icon" uk-icon="icon: ${e}; ratio: 2.5"></div>
        <div class="kp-empty-text">${t}</div>
    </div>`,K=e=>{let t={1:["running","Running"],2:["stopped","Stopped"],3:["restarting","Restarting"],4:["error","Error"]},[s,a]=t[e]||["stopped","Unknown"];return`<span class="kp-status kp-status-${s}">${a}</span>`},fn=e=>({3:"8.2",4:"8.3",5:"8.4",6:"8.5"})[e]||"?",ge=e=>({1:"WordPress",2:"PHP",3:"Static",4:"Node.js",5:".NET",6:"Reverse Proxy",7:"Python"})[e]||"?",M=()=>window.KP.user.role===window.KP.roles.admin,J=e=>{switch(e.SiteType){case 1:case 2:return`PHP ${fn(e.PHPVersion)}`;case 4:return`Node ${{2:"22",4:"24",5:"25",6:"26"}[e.RuntimeVersion]||"?"}`;case 5:return`.NET ${{1:"8.0",2:"9.0",3:"10.0"}[e.RuntimeVersion]||"?"}`;case 7:return`Python ${{1:"3.11",2:"3.12",3:"3.13",4:"3.14"}[e.RuntimeVersion]||"?"}`;case 6:return"Reverse Proxy";default:return""}},X=e=>({id:e.id??e.ID,uname:e.uname??e.UName,uhash:e.uhash??e.UHash,fname:e.fname??e.FName,lname:e.lname??e.LName,email:e.email??e.Email,phone:e.phone??e.Phone,role:e.role??e.Role,totp_enabled:e.totp_enabled??!1,notify_email:e.notify_email??!1,notify_sms:e.notify_sms??!1,node_uid:e.node_uid??0,blocked:e.blocked??!1,created:e.created??e.Created});function E(e,t){return new Promise(s=>{document.getElementById("kp-confirm-title").textContent=e,document.getElementById("kp-confirm-message").textContent=t;let a=UIkit.modal("#kp-confirm-modal");document.getElementById("kp-confirm-ok").addEventListener("click",()=>{a.hide(),s(!0)},{once:!0}),a.show(),document.getElementById("kp-confirm-modal").addEventListener("hidden",()=>s(!1),{once:!0})})}function S(e,t){let s=`
        <div id="kp-progress-modal" uk-modal="bg-close: false; esc-close: false; keyboard: false">
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-text-center" style="max-width:420px">
                <div uk-spinner="ratio: 1.5" style="color:var(--kp-blue)"></div>
                <h3 class="uk-modal-title uk-margin-small-top" id="kp-progress-title">${e}</h3>
                <p class="kp-muted uk-text-small" id="kp-progress-message">${t}</p>
                <p class="kp-muted">
                    This may take several minutes while the task(s) complete, make sure to keep screen open until it has completed.
                </p>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",s),UIkit.modal("#kp-progress-modal").show()}function x(){let e=document.getElementById("kp-progress-modal");e&&(UIkit.modal(e).hide(),setTimeout(()=>e.remove(),300))}function Zt(e){return new Promise(t=>{let s="kp-clone-modal",a=`
            <div id="${s}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Clone Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a name and domain for the clone of <strong>${e}</strong>.
                        Files, database, and configuration will be copied \u2014 the clone is served on its own domain.
                    </p>
                    <input id="kp-clone-name" class="uk-input kp-input" type="text"
                        placeholder="clone-name" autocomplete="off">
                    <input id="kp-clone-domain" class="uk-input kp-input uk-margin-small-top" type="text"
                        placeholder="staging.example.com" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-clone-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-clone-ok">
                            <span uk-icon="move"></span> Clone
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let n=UIkit.modal(`#${s}`),o=document.getElementById("kp-clone-name"),i=document.getElementById("kp-clone-domain"),l=document.getElementById("kp-clone-ok"),r=document.getElementById("kp-clone-cancel"),d=u=>{n.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),t(u)};l.addEventListener("click",()=>{let u=o.value.trim(),c=i.value.trim();if(!u){o.focus();return}if(!c){i.focus();return}d({name:u,domain:c})}),r.addEventListener("click",()=>d(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>d(null),{once:!0}),n.show(),setTimeout(()=>o.focus(),150),[o,i].forEach(u=>u.addEventListener("keydown",c=>{c.key==="Enter"&&l.click()}))})}function es(e){return new Promise(t=>{let s="kp-rename-modal",a=`
            <div id="${s}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:420px">
                    <h3 class="uk-modal-title">Rename Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Enter a new name for <strong>${e}</strong>.  Please have patience, this takes a few minutes.
                    </p>
                    <input id="kp-rename-name" class="uk-input kp-input" type="text"
                        value="${e}" autocomplete="off">
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-rename-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-rename-ok">
                            <span uk-icon="pencil"></span> Rename
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",a);let n=UIkit.modal(`#${s}`),o=document.getElementById("kp-rename-name"),i=document.getElementById("kp-rename-ok"),l=document.getElementById("kp-rename-cancel"),r=d=>{n.hide(),setTimeout(()=>document.getElementById(s)?.remove(),300),t(d)};i.addEventListener("click",()=>r(o.value.trim()||null),{once:!0}),l.addEventListener("click",()=>r(null),{once:!0}),document.getElementById(s).addEventListener("hidden",()=>r(null),{once:!0}),n.show(),setTimeout(()=>o.focus(),150),o.addEventListener("keydown",d=>{d.key==="Enter"&&i.click()})})}function ts(e,t,s){return new Promise(a=>{let n="kp-sync-modal",o=t.map(c=>`<option value="${c.ID}">${c.Name} (${c.ParentID===e.ID?"clone":"parent"})</option>`).join(""),i=`
            <div id="${n}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">Push Site</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        This will overwrite the selected content on the target with data from <strong>${e.Name}</strong>.
                        The target is backed up first, and the push is aborted if that backup fails.
                    </p>
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text" for="kp-sync-target">Push To</label>
                        <select id="kp-sync-target" class="uk-select kp-select">${o}</select>
                    </div>
                    <div class="uk-flex uk-margin-small" style="gap:16px">
                        <label><input class="uk-checkbox" type="checkbox" id="kp-sync-files" checked> &nbsp;Files</label>
                        ${s?'<label><input class="uk-checkbox" type="checkbox" id="kp-sync-db" checked> &nbsp;Database</label>':""}
                    </div>
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text" for="kp-sync-exclude">Exclude Paths (one per line, relative to the web root)</label>
                        <textarea class="uk-textarea kp-textarea" id="kp-sync-exclude" rows="3" placeholder="wp-content/uploads"></textarea>
                    </div>
                    <p class="kp-muted uk-text-small" style="color:var(--kp-red, #e05c5c)">
                        <span uk-icon="icon: warning; ratio: 0.85"></span>
                        The target will be temporarily unavailable during the push.
                    </p>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-sync-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-sync-ok">
                            <span uk-icon="cloud-upload"></span> Push Site
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",i);let l=UIkit.modal(`#${n}`),r=document.getElementById("kp-sync-ok"),d=document.getElementById("kp-sync-cancel"),u=c=>{l.hide(),setTimeout(()=>document.getElementById(n)?.remove(),300),a(c)};r.addEventListener("click",()=>{let c=parseInt(document.getElementById("kp-sync-target").value,10),m=document.getElementById("kp-sync-files").checked,k=document.getElementById("kp-sync-db")?.checked??!1,h=document.getElementById("kp-sync-exclude").value.split(`
`).map(g=>g.trim()).filter(Boolean);u({target_id:c,files:m,database:k,exclude:h})},{once:!0}),d.addEventListener("click",()=>u(null),{once:!0}),document.getElementById(n).addEventListener("hidden",()=>u(null),{once:!0}),l.show()})}var y={routes:{},_ownHashChange:!1,register(e,t){this.routes[e]=t},async go(e,t={}){let s=Object.keys(t).length?e+"/"+Object.values(t).join("/"):e;this._ownHashChange=!0,window.location.hash=s,setTimeout(()=>{this._ownHashChange=!1},0),document.querySelectorAll(".kp-nav-link").forEach(o=>{o.classList.toggle("kp-active",o.dataset.view===e)}),document.querySelectorAll(".kp-bn-item[data-view]").forEach(o=>{o.classList.toggle("kp-active",o.dataset.view===e)});let a=this.routes[e];if(!a)return;let n=document.getElementById("kp-view");n.innerHTML=Ae();try{await a(n,t)}catch(o){n.innerHTML=_(o.message)}}};function qe(){let t=(window.location.hash.replace("#","")||"dashboard").split("/"),s=t[0],a={};return s==="site-detail"&&t[1]&&(a.id=t[1]),s==="settings"&&t[1]&&(a.tab=t[1]),s==="site-detail"&&t[2]&&(a.tab=t[2]),s==="security"&&t[1]&&(a.tab=t[1]),s==="waf"&&t[1]&&(a.tab=t[1]),{view:s,params:a}}var p={show(e,t="info",s=7e3){let a={success:"check",error:"warning",info:"info"},n=document.createElement("div");n.className=`kp-toast kp-toast-${t}`,n.innerHTML=`<span uk-icon="${a[t]||"info"}"></span><span>${v(e)}</span>`,document.getElementById("kp-toasts").appendChild(n),UIkit.icon(n.querySelector("[uk-icon]")),setTimeout(()=>n.remove(),s)},success:e=>p.show(e,"success"),error:e=>p.show(e,"error"),info:e=>p.show(e,"info")};var gn=2e3;function vn(){return`
        <div id="admin-logs-panel">
            <div class="kp-card uk-padding-small">
                <h3 class="kp-view-title uk-margin-small-bottom">Admin Logs</h3>

                <div class="kp-log-controls">
                    <select class="uk-select kp-select" id="admin-log-source" style="width:160px;height:38px">
                        <option value="proxy">Proxy Access Log</option>
                        <option value="waf">WAF Log</option>
                    </select>
                    <select class="uk-select kp-select" id="admin-log-tail" style="width:120px;height:38px">
                        <option value="100">100 lines</option>
                        <option value="250">250 lines</option>
                        <option value="500">500 lines</option>
                        <option value="1000">1000 lines</option>
                    </select>
                    <button class="uk-button kp-btn-secondary kp-btn-sm" id="admin-log-connect"
                        uk-tooltip="Start Tailing the Logs">
                        <span uk-icon="play"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="admin-log-disconnect" disabled
                        uk-tooltip="Stop Tailing the Logs">
                        <span uk-icon="ban"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="admin-log-clear"
                        uk-tooltip="Clear the Logs">
                        <span uk-icon="trash"></span>
                    </button>
                    <label style="font-size:0.82rem;color:var(--kp-text-dim);display:flex;align-items:center;gap:6px">
                        <input type="checkbox" class="uk-checkbox" id="admin-log-autoscroll" checked>
                        Auto-scroll
                    </label>
                </div>

                <div class="kp-log-header">
                    <div class="kp-log-dot kp-log-dot-red"></div>
                    <div class="kp-log-dot kp-log-dot-yellow"></div>
                    <div class="kp-log-dot kp-log-dot-green"></div>
                    <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px"
                        id="admin-log-status">Disconnected</span>
                </div>
                <div class="kp-log-wrap" id="admin-log-output"></div>
            </div>
        </div>`}function yn(e){let t=null,s=!1,a=e.querySelector("#admin-log-output"),n=e.querySelector("#admin-log-connect"),o=e.querySelector("#admin-log-disconnect"),i=e.querySelector("#admin-log-clear"),l=e.querySelector("#admin-log-autoscroll"),r=e.querySelector("#admin-log-status");function d(m){for(m.split(`
`).forEach(k=>{if(!k)return;let h=document.createElement("div");h.className=k.match(/WAF BLOCK/i)?"kp-log-line-err":k.match(/WAF DETECT/i)?"kp-log-line-warn":k.match(/error|crit|emerg/i)?"kp-log-line-err":k.match(/warn/i)?"kp-log-line-warn":k.match(/info|notice/i)?"kp-log-line-info":"",h.textContent=k,a.appendChild(h)});a.childElementCount>gn;)a.removeChild(a.firstChild);l.checked&&(a.scrollTop=a.scrollHeight)}function u(){t&&(t.close(),t=null),s=!1,n.disabled=!1,o.disabled=!0,r&&(r.textContent="Disconnected")}n.addEventListener("click",()=>{u();let m=e.querySelector("#admin-log-source").value,k=e.querySelector("#admin-log-tail").value,h=location.protocol==="https:"?"wss":"ws",g=m==="waf"?`${h}://${location.host}/api/logs/waf?tail=${k}`:`${h}://${location.host}/api/logs/proxy?tail=${k}`;t=new WebSocket(g),t.onopen=()=>{s=!0,n.disabled=!0,o.disabled=!1,r&&(r.textContent=`Connected \u2014 ${m==="waf"?"WAF Log":"Proxy Access Log"}`)},t.onmessage=f=>d(f.data),t.onerror=()=>{},t.onclose=()=>{s=!1,n.disabled=!1,o.disabled=!0,r&&(r.textContent="Disconnected")}}),o.addEventListener("click",u),i.addEventListener("click",()=>{a.innerHTML=""}),e.querySelector("#admin-log-source").addEventListener("change",()=>{t&&t.readyState===WebSocket.OPEN&&(u(),n.click())});let c=y.go.bind(y);y.go=function(m,k={}){return t&&u(),c(m,k)}}function ss(e){e.innerHTML=vn(),yn(e)}var Re=50;function wn(e,t,s){let a=Math.max(1,Math.ceil(e.total/Re)),n=(e.entries??[]).map(as).join("")||'<tr><td colspan="8" class="uk-text-center" style="color:var(--kp-text-dim)">No records found</td></tr>';return`
        <div id="audit-log-panel">
            <div class="kp-view-header">
                <h1 class="kp-view-title" style="font-size:2rem;">Audit Log</h1>
            </div>

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-middle uk-flex-wrap kp-filter-bar">
                    <input class="uk-input kp-input" id="al-filter-user" type="text"
                        placeholder="Username" value="${R(t.username)}">
                    <input class="uk-input kp-input" id="al-filter-action" type="text"
                        placeholder="Action" value="${R(t.action)}">
                    <input class="uk-input kp-input" id="al-filter-target" type="text"
                        placeholder="Target type" value="${R(t.target_type)}">
                    <input class="uk-input kp-input" id="al-filter-date-from" type="date"
                        value="${R(t.date_from)}">
                    <input class="uk-input kp-input" id="al-filter-date-to" type="date"
                        value="${R(t.date_to)}">
                    <select class="uk-select kp-select" id="al-filter-auth">
                        <option value=""  ${t.auth===""?"selected":""}>All requests</option>
                        <option value="1" ${t.auth==="1"?"selected":""}>Authenticated</option>
                        <option value="0" ${t.auth==="0"?"selected":""}>Unauthenticated</option>
                    </select>
                    <div class="uk-flex uk-flex-middle" style="gap:4px">
                        <button class="uk-button kp-btn-primary kp-btn-sm" id="al-filter-apply">
                            <span uk-icon="icon: search; ratio: 0.85"></span>
                        </button>
                        <button class="uk-button kp-btn-ghost kp-btn-sm" id="al-filter-clear">
                            <span uk-icon="icon: close; ratio: 0.85"></span>
                        </button>
                    </div>
                    <span id="al-record-count" class="uk-margin-auto-left kp-text-dim kp-text-sm">
                        ${e.total} record${e.total!==1?"s":""}
                    </span>
                </div>
            </div>

            <div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                <table class="uk-table uk-table-divider uk-table-small uk-table-middle uk-margin-remove">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>User</th>
                            <th>IP</th>
                            <th>Method</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>State diff</th>
                        </tr>
                    </thead>
                    <tbody id="al-table-body">${n}</tbody>
                </table>
                </div>
            </div>

            ${a>1?`<div id="al-pager">${ns(s,a)}</div>`:'<div id="al-pager"></div>'}
        </div>`}function as(e){let t=new Date(e.ts).toLocaleString(),s=e.username?`<span style="font-family:monospace">${R(e.username)}</span>`:'<span style="color:var(--kp-text-dim)">\u2014</span>',a=xn(e.status),o=e.prior_state||e.new_state?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="${R(e.prior_state)}" data-new="${R(e.new_state)}">
               <span uk-icon="icon: git-fork; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>",i=e.details?`<button class="uk-button kp-btn-ghost kp-btn-sm al-diff-btn"
                data-prior="" data-new="${R(e.details)}">
               <span uk-icon="icon: info; ratio: 0.85"></span>
           </button>`:"<span>\u2014</span>";return`<tr>
        <td style="white-space:nowrap;font-size:0.82rem">${t}</td>
        <td>${s}</td>
        <td style="font-family:monospace;font-size:0.82rem">${R(e.ip)}</td>
        <td><span class="kp-badge">${R(e.method)}</span></td>
        <td style="font-family:monospace;font-size:0.82rem">${R(e.action)}</td>
        <td>${a}</td>
        <td>${i}</td>
        <td>${o}</td>
    </tr>`}function ns(e,t){let s=e>1?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-prev">\u2039 Prev</button>':"",a=e<t?'<button class="uk-button kp-btn-ghost kp-btn-sm" id="al-next">Next \u203A</button>':"";return`<div class="uk-flex uk-flex-middle uk-flex-center uk-margin-small-top" style="gap:12px">
        ${s}
        <span style="font-size:0.85rem;color:var(--kp-text-dim)">Page ${e} of ${t}</span>
        ${a}
    </div>`}function xn(e){return`<span class="kp-badge ${e>=500?"kp-badge-error":e>=400?"kp-badge-warn":e>=300?"kp-badge-info":"kp-badge-ok"}">${e}</span>`}var R=e=>v(e??"");async function os(e,t){let s=new URLSearchParams({page:t,page_size:Re});return e.username&&s.set("username",e.username),e.action&&s.set("action",e.action),e.target_type&&s.set("target_type",e.target_type),e.date_from&&s.set("date_from",e.date_from),e.date_to&&s.set("date_to",e.date_to),e.auth!==""&&s.set("auth",e.auth),b.get(`/audit?${s}`)}function Sn(e){return{username:e.querySelector("#al-filter-user").value.trim(),action:e.querySelector("#al-filter-action").value.trim(),target_type:e.querySelector("#al-filter-target").value.trim(),date_from:e.querySelector("#al-filter-date-from").value,date_to:e.querySelector("#al-filter-date-to").value,auth:e.querySelector("#al-filter-auth").value}}async function $n(e,t,s){async function a(i,l){let r=await os(i,l);e.querySelector("#al-table-body").innerHTML=(r.entries??[]).map(as).join("")||'<tr><td colspan="8" class="uk-text-center kp-text-dim">No records found</td></tr>';let d=Math.max(1,Math.ceil(r.total/Re)),u=e.querySelector("#al-pager");u&&(u.innerHTML=d>1?ns(l,d):""),e.querySelector("#al-record-count").textContent=`${r.total} record${r.total!==1?"s":""}`,n(e,i,l,d),t=i,s=l}function n(i,l,r,d){i.querySelector("#al-prev")?.addEventListener("click",()=>a(l,r-1)),i.querySelector("#al-next")?.addEventListener("click",()=>a(l,r+1))}e.querySelector("#al-filter-apply")?.addEventListener("click",()=>{a(Sn(e),1)}),e.querySelector("#al-filter-clear")?.addEventListener("click",()=>{["al-filter-user","al-filter-action","al-filter-target","al-filter-date-from","al-filter-date-to"].forEach(i=>{let l=e.querySelector(`#${i}`);l&&(l.value="")}),e.querySelector("#al-filter-auth").value="",a({username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},1)});let o=Math.max(1,Math.ceil(parseInt(e.querySelector("#al-record-count")?.textContent??"0")/Re));n(e,t,s,o),e.querySelector("#audit-log-panel")?.addEventListener("click",i=>{let l=i.target.closest(".al-diff-btn");if(!l)return;i.preventDefault(),i.stopPropagation();let r=l.dataset.prior??"",d=l.dataset.new??"",u="";r&&d?u=`=== BEFORE ===
`+Me(r)+`

=== AFTER ===
`+Me(d):d?u=Me(d):u=Me(r),document.body.insertAdjacentHTML("beforeend",`
            <div id="al-diff-modal-inst" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-bottom">Request Detail</h3>
                    <pre class="kp-cron-output">${R(u)}</pre>
                </div>
            </div>`);let c=document.getElementById("al-diff-modal-inst");UIkit.modal(c).show(),c.addEventListener("hidden",()=>c.remove(),{once:!0})})}function Me(e){try{return JSON.stringify(JSON.parse(e),null,2)}catch{return e}}async function is(e){if(!M()){e.innerHTML=_("Access denied");return}let t={username:"",action:"",target_type:"",date_from:"",date_to:"",auth:""},s=await os(t,1);e.innerHTML=wn(s,t,1),$n(e,t,1)}function De(){document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-create-site-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">New Site</h3>
                <form id="create-site-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Name</label>
                            <input class="uk-input kp-input" name="name" type="text" placeholder="mysite" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Type</label>
                            <select class="uk-select kp-select" name="site_type" id="cs-site-type">
                                <option value="1">PHP</option>
                                <option value="3">Static HTML</option>
                                <option value="4">Node.js</option>
                                <option value="5">.NET</option>
                                <option value="7">Python</option>                                
                                <option value="6">Reverse Proxy</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s" id="cs-php-version-wrap">
                            <label class="kp-label">PHP Version</label>
                            <select class="uk-select kp-select" name="php_version">
                                <option value="3" selected>PHP 8.2</option>
                                <option value="4">PHP 8.3</option>
                                <option value="5">PHP 8.4</option>
                                <option value="6">PHP 8.5</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-node-version-wrap">
                            <label class="kp-label">Node.js Version</label>
                            <select class="uk-select kp-select" name="node_version">
                                <option value="2" selected>Node 22 (LTS)</option>
                                <option value="4">Node 24</option>
                                <option value="5">Node 25</option>
                                <option value="6">Node 26</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-dotnet-version-wrap">
                            <label class="kp-label">.NET Version</label>
                            <select class="uk-select kp-select" name="dotnet_version">
                                <option value="1">.NET 8.0 (LTS)</option>
                                <option value="2">.NET 9.0</option>
                                <option value="3" selected>.NET 10.0 (LTS)</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="cs-python-version-wrap">
                            <label class="kp-label">Python Version</label>
                            <select class="uk-select kp-select" name="python_version">
                                <option value="1">Python 3.11</option>
                                <option value="2">Python 3.12</option>
                                <option value="3">Python 3.13</option>
                                <option value="4" selected>Python 3.14</option>
                            </select>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="cs-start-command-wrap">
                            <label class="kp-label">Start Command</label>
                            <input class="uk-input kp-input" name="start_command" type="text" placeholder="node server.js, dotnet MyApp.dll, or gunicorn -b 0.0.0.0:8000 app:app">
                        </div>
                        <div class="uk-width-1-1" id="cs-wordpress-wrap">
                            <label><input class="uk-checkbox" type="checkbox" name="install_wordpress" checked> Install WordPress</label>
                        </div>
                        <div class="uk-width-1-1" id="cs-domains-wrap">
                            <label class="kp-label">Domains (one per line)</label>
                            <textarea class="uk-textarea kp-textarea" name="domains" rows="3" placeholder="example.com&#10;www.example.com"></textarea>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="cs-rp-note">
                            <p class="kp-muted uk-text-small">Configure domain \u2192 upstream mappings in the Routes tab after creation.</p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="server"></span> Create Site
                        </button>
                    </div>
                </form>
            </div>
        </div>`);let t=UIkit.modal("#kp-create-site-modal"),s=document.getElementById("cs-site-type"),a=document.getElementById("cs-php-version-wrap"),n=document.getElementById("cs-node-version-wrap"),o=document.getElementById("cs-dotnet-version-wrap"),i=document.getElementById("cs-python-version-wrap"),l=document.getElementById("cs-start-command-wrap"),r=document.getElementById("cs-wordpress-wrap");t.show();let d=document.getElementById("cs-domains-wrap"),u=document.getElementById("cs-rp-note");s.addEventListener("change",()=>{let c=parseInt(s.value);a.classList.toggle("uk-hidden",c!==1&&c!==2||c===6),n.classList.toggle("uk-hidden",c!==4),o.classList.toggle("uk-hidden",c!==5),i.classList.toggle("uk-hidden",c!==7),l.classList.toggle("uk-hidden",c!==4&&c!==5&&c!==7),l.querySelector("input").required=c===7,r.classList.toggle("uk-hidden",c!==1||c===6),d.classList.toggle("uk-hidden",c===6),u.classList.toggle("uk-hidden",c!==6)}),document.getElementById("create-site-form").addEventListener("submit",async c=>{c.preventDefault();let m=c.target.querySelector('[type="submit"]'),k=m.innerHTML;m.disabled=!0,m.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let h=new FormData(c.target),g=parseInt(h.get("site_type")),f=null;g===4&&(f=parseInt(h.get("node_version"))),g===5&&(f=parseInt(h.get("dotnet_version"))),g===7&&(f=parseInt(h.get("python_version")));let w={name:h.get("name").trim(),php_version:parseInt(h.get("php_version"))||3,site_type:g,runtime_version:f,start_command:h.get("start_command")?.trim()||"",domains:h.get("domains").split(`
`).map(A=>A.trim()).filter(Boolean),install_wordpress:g===1?h.get("install_wordpress")==="on":!1};t.hide(),document.getElementById("kp-create-site-modal")?.remove();let T=g===6?`Setting up '${w.name}' as a reverse proxy...`:`Setting up '${w.name}' \u2014 pulling images and provisioning containers...`;S("Creating Site",T);try{await b.post("/sites",w,6e5),x(),p.success(`Site '${w.name}' created`),y.go("sites")}catch(A){x(),p.error(A.message),m.disabled=!1,m.innerHTML=k}}),document.getElementById("kp-create-site-modal").addEventListener("hidden",()=>document.getElementById("kp-create-site-modal")?.remove())}function ls(){return cs({title:"Add Node",intro:"On the child node, use Generate Pairing Code, then enter its URL and code here.",okLabel:"Pair",okIcon:"link",fields:`
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" placeholder="https://node.example.com" autocomplete="off">
            <label class="kp-label uk-margin-small-top">Pairing Code</label>
            <input id="kp-node-code" class="uk-input kp-input" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" autocomplete="off"
                style="letter-spacing:0.2em;text-align:center">`,read:()=>{let e=document.getElementById("kp-node-name"),t=document.getElementById("kp-node-url"),s=document.getElementById("kp-node-code");for(let a of[e,t,s])if(!a.value.trim())return a.focus(),null;return{name:e.value.trim(),url:t.value.trim(),code:s.value.trim()}}})}function rs(e){return cs({title:`Edit Node \u2014 ${v(e.name)}`,intro:"A URL change or re-key opens the child in a new tab to apply it; it takes effect once the child confirms.",okLabel:"Save",okIcon:"pencil",fields:`
            <label class="kp-label">Name</label>
            <input id="kp-node-name" class="uk-input kp-input" type="text" maxlength="100" value="${v(e.name)}" autocomplete="off">
            <label class="kp-label uk-margin-small-top">URL</label>
            <input id="kp-node-url" class="uk-input kp-input" type="text" value="${v(e.url)}" autocomplete="off"
                ${e.status!==2?"disabled":""}>
            <label class="uk-margin-small-top uk-display-block">
                <input id="kp-node-rekey" class="uk-checkbox" type="checkbox" ${e.status!==2?"disabled":""}> &nbsp;Re-key this link
            </label>`,read:()=>{let t=document.getElementById("kp-node-name");return t.value.trim()?{name:t.value.trim(),url:document.getElementById("kp-node-url").value.trim(),rekey:document.getElementById("kp-node-rekey").checked}:(t.focus(),null)}})}function cs({title:e,intro:t,okLabel:s,okIcon:a,fields:n,read:o}){return new Promise(i=>{let l="kp-node-modal";document.getElementById(l)?.remove();let r=`
            <div id="${l}" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                    <h3 class="uk-modal-title">${e}</h3>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">${t}</p>
                    ${n}
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button class="uk-button kp-btn-ghost uk-modal-close" id="kp-node-cancel">Cancel</button>
                        <button class="uk-button kp-btn-primary" id="kp-node-ok">
                            <span uk-icon="${a}"></span> ${s}
                        </button>
                    </div>
                </div>
            </div>`;document.body.insertAdjacentHTML("beforeend",r);let d=document.getElementById(l),u=UIkit.modal(d),c=!1,m=k=>{c||(c=!0,u.hide(),setTimeout(()=>d.remove(),300),i(k))};document.getElementById("kp-node-ok").addEventListener("click",()=>{let k=o();k&&m(k)}),document.getElementById("kp-node-cancel").addEventListener("click",()=>m(null),{once:!0}),d.addEventListener("hidden",()=>m(null),{once:!0}),d.querySelectorAll("input[type=text]").forEach(k=>k.addEventListener("keydown",h=>{h.key==="Enter"&&document.getElementById("kp-node-ok").click()})),u.show(),setTimeout(()=>document.getElementById("kp-node-name")?.focus(),150)})}var He=2;async function G(e){if(!M()){e.innerHTML=_("Access denied");return}let t=await b.get("/nodes");e.innerHTML=`
        <div id="kp-nodes">
            <div class="kp-view-header">
                <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Nodes</h1>
                <button class="uk-button kp-btn-primary" data-action="node-add">
                    <span uk-icon="plus"></span> Add Node
                </button>
            </div>
            ${t.length?`
            <div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                <table class="uk-table uk-table-divider uk-table-middle uk-margin-remove">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(En).join("")}
                    </tbody>
                </table>
                </div>
            </div>`:ae("server","No child nodes yet")}
        </div>`;let s=document.getElementById("kp-nodes");s.addEventListener("click",a=>Ln(a,e,t)),window.addEventListener("focus",()=>{document.getElementById("kp-nodes")===s&&G(e)},{once:!0})}function En(e){let t=e.status===He?'<span class="kp-status kp-status-running">Paired</span>':'<span class="kp-status kp-status-restarting">Pending</span>';return`<tr>
        <td><strong>${v(e.name)}</strong></td>
        <td><span style="font-family:monospace">${v(e.url)}</span></td>
        <td>${t}</td>
        <td><span class="kp-muted">${v(e.created)}</span></td>
        <td>
            <div class="uk-flex" style="gap:6px;justify-content:flex-end">
                ${e.status===He?`
                <button class="uk-button kp-btn-primary kp-btn-sm" data-action="node-open" data-nid="${e.id}" uk-tooltip="Open the Node">
                    <span uk-icon="icon: sign-in;"></span>
                </button>`:""}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="node-edit" data-nid="${e.id}" uk-tooltip="Edit the Node">
                    <span uk-icon="icon: pencil;"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="node-remove" data-nid="${e.id}" uk-tooltip="Remove the Node">
                    <span uk-icon="icon: trash;"></span>
                </button>
                ${e.status===He?`
                <button class="uk-button kp-btn-danger kp-btn-sm" data-action="node-force-remove" data-nid="${e.id}" uk-tooltip="Force remove without the child">
                    <span uk-icon="icon: ban;"></span>
                </button>`:""}
            </div>
        </td>
    </tr>`}async function Ln(e,t,s){let a=e.target.closest("[data-action^='node-']");if(!a)return;e.stopPropagation();let n=s.find(o=>o.id===Number(a.dataset.nid));try{switch(a.dataset.action){case"node-add":{let o=await ls();if(!o)return;let i=await b.post("/nodes",o);ne(i.link),p.success("Finish pairing in the new tab"),await G(t);break}case"node-open":{let o=await b.post(`/nodes/${n.id}/sso`);ne(o.link);break}case"node-edit":{let o=await rs(n);if(!o)return;let i=await b.put(`/nodes/${n.id}`,o);i?.link?(ne(i.link),p.success("Finish the update in the new tab")):p.success("Node updated"),await G(t);break}case"node-remove":{let o=n.status===He;if(!await E("Remove Node",o?`Unpair ${n.name}? The child opens in a new tab to drop this parent and its synced users.`:`Remove the pending node ${n.name}?`))return;let l=await b.delete(`/nodes/${n.id}`);l?.link?(ne(l.link),p.success("Finish unpairing in the new tab")):(p.success("Node removed"),await G(t));break}case"node-force-remove":{if(!await E("Force Remove Node",`Remove ${n.name} here without contacting it? Only for a child that is gone \u2014 a live child keeps trusting this parent until it is unparented on that host.`))return;await b.delete(`/nodes/${n.id}?force=1`),p.success("Node removed"),await G(t);break}}}catch(o){p.error(o.message)}}function ne(e){let t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noopener noreferrer",document.body.appendChild(t),t.click(),t.remove()}var oe=null;function Tn(e){return`${e.toFixed(1)}%`}var Ne=null;function dt(){return Ne||(Ne=new Promise(e=>{if(window.Chart){e();return}let t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/chart.umd.min.js",t.onload=e,t.onerror=e,document.body.appendChild(t)}),Ne)}function ut(e,t){return`
        <div id="stats-panel" data-site-id="${e}" data-site-type="${t}">

            <!-- traffic -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <h3 class="kp-view-title uk-margin-small-bottom">Site Traffic
                    <span class="kp-muted uk-text-small" style="font-weight:400"> \u2014 last 24 hours</span>
                </h3>

                <!-- status code badges -->
                <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-small-bottom" uk-grid>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-2xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-success)">2xx Success</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-3xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-cyan)">3xx Redirect</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-4xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-warning)">4xx Client Err</div>
                    </div></div>
                    <div><div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value" id="stats-5xx" style="font-size:1.6rem">\u2014</div>
                        <div class="kp-stat-label" style="color:var(--kp-danger)">5xx Server Err</div>
                    </div></div>
                </div>

                <!-- bandwidth -->
                <div class="kp-stats-bandwidth">
                    Total Bandwidth: <span id="stats-bandwidth" class="kp-stats-bandwidth-val">\u2014</span>
                </div>

                <!-- hits per hour chart -->
                <div class="kp-stats-chart-wrap">
                    <canvas id="stats-chart"></canvas>
                </div>
            </div>

            <!-- drilldown modal \u2014 populated on 4xx/5xx bar click -->
            <div id="stats-drilldown-modal" uk-modal>
                <div class="uk-modal-dialog uk-modal-body" style="min-width:min(96vw,900px)">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-small-bottom" id="stats-drilldown-title">Request Detail</h3>
                    <div id="stats-drilldown-body">
                        <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
                    </div>
                </div>
            </div>

            <!-- top IPs + UAs -->
            <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-bottom" uk-grid>
                <div>
                    <div class="kp-table-wrap">
                        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                            <thead><tr>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem">Top IPs</th>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                            </tr></thead>
                            <tbody id="stats-ip-rows">
                                <tr><td colspan="2" class="kp-muted uk-text-small">Loading\u2026</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="kp-table-wrap">
                        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                            <thead><tr>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem">Top User-Agents</th>
                                <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                            </tr></thead>
                            <tbody id="stats-ua-rows">
                                <tr><td colspan="2" class="kp-muted uk-text-small">Loading\u2026</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            ${t===6?"":`
        <!-- pod statistics -->
        <div class="kp-card uk-padding-small uk-margin-bottom">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <h3 class="kp-view-title">Pod Statistics</h3>
                <span id="stats-pod-indicator" class="kp-status kp-status-stopped" style="font-size:0.7rem">
                    Connecting\u2026
                </span>
            </div>
            <div id="stats-pod-table-wrap">
                <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
            </div>
        </div>

        <!-- disk usage -->
        <div class="kp-card uk-padding-small uk-margin-bottom">
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <h3 class="kp-view-title">Disk Usage</h3>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="stats-disk-refresh"
                    uk-tooltip="Refresh disk usage">
                    <span uk-icon="refresh"></span>
                </button>
            </div>
            <div id="stats-disk-wrap">
                <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
            </div>
        </div>`}

        </div>`}async function Cn(e){await dt();let t;try{t=await b.get(`/sites/${e}/stats/traffic`)}catch(o){document.getElementById("stats-ip-rows").innerHTML=`<tr><td colspan="2" class="kp-muted uk-text-small">Failed to load: ${v(o.message)}</td></tr>`;return}document.getElementById("stats-2xx").textContent=(t.status_codes["2xx"]??0).toLocaleString(),document.getElementById("stats-3xx").textContent=(t.status_codes["3xx"]??0).toLocaleString(),document.getElementById("stats-4xx").textContent=(t.status_codes["4xx"]??0).toLocaleString(),document.getElementById("stats-5xx").textContent=(t.status_codes["5xx"]??0).toLocaleString(),document.getElementById("stats-bandwidth").textContent=P(t.total_bandwidth??0);let s=document.getElementById("stats-chart");if(s&&window.Chart){let o=(t.hits_per_hour??[]).map(l=>new Date(l.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));oe&&(oe.destroy(),oe=null),oe=new window.Chart(s,{type:"bar",data:{labels:o,datasets:[{label:"2xx",data:(t.hits_per_hour??[]).map(l=>l["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:(t.hits_per_hour??[]).map(l=>l["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:(t.hits_per_hour??[]).map(l=>l["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:(t.hits_per_hour??[]).map(l=>l["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(l,r)=>{if(!r||!r.length)return;let d=r[0].datasetIndex,u=oe.data.datasets[d].label;if(u!=="4xx"&&u!=="5xx")return;let c=r[0].index,m=document.getElementById("stats-panel");if(!m||!m._hitsPerHour)return;let k=m._hitsPerHour[c]?.hour;k&&pt(`/sites/${e}/stats/drilldown`,k,u)},onHover:(l,r)=>{if(!r||!r.length){l.native.target.style.cursor="default";return}let d=oe.data.datasets[r[0].datasetIndex].label;l.native.target.style.cursor=d==="4xx"||d==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:l=>{l.native.target.style.cursor="pointer"},onLeave:l=>{l.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}});let i=document.getElementById("stats-panel");i&&(i._hitsPerHour=t.hits_per_hour??[])}let a=document.getElementById("stats-ip-rows");a&&(a.innerHTML=(t.top_ips??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_ips??[]).map(o=>`
                <tr>
                    <td class="kp-stats-table-cell-mono">${v(o.name)}</td>
                    <td class="kp-stats-table-cell-count">${o.count.toLocaleString()}</td>
                </tr>`).join(""));let n=document.getElementById("stats-ua-rows");n&&(n.innerHTML=(t.top_uas??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No data</td></tr>':(t.top_uas??[]).map(o=>`
                <tr>
                    <td class="kp-stats-ua-cell" title="${v(o.name)}">${v(o.name)}</td>
                    <td class="kp-stats-table-cell-count">${o.count.toLocaleString()}</td>
                </tr>`).join(""))}async function ds(e){let t=document.getElementById("stats-disk-wrap");if(t){t.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>';try{let s=await b.get(`/sites/${e}/stats/disk`);t.innerHTML=`
            <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${P(s.html_bytes??0)}</div>
                        <div class="kp-stat-label">Site Files</div>
                    </div>
                </div>
                <div>
                    <div class="kp-stat-card" style="padding:16px">
                        <div class="kp-stat-value kp-stats-disk-val">${P(s.db_bytes??0)}</div>
                        <div class="kp-stat-label">Database</div>
                    </div>
                </div>
            </div>`}catch(s){t.innerHTML=`<p class="kp-muted uk-text-small">Failed to load disk usage: ${v(s.message)}</p>`}}}function In(e){return!e||e.length===0?'<p class="kp-muted uk-text-small uk-margin-remove">No container data.</p>':`
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead><tr>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Container</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">CPU</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Memory</th>
                <th style="color:var(--kp-text-dim);font-size:0.75rem">Mem %</th>
            </tr></thead>
            <tbody>${e.map(s=>{let a=s.mem_limit>0?(s.mem_used/s.mem_limit*100).toFixed(1):0,n=a>80,o=s.name.split("-").pop();return`
            <tr>
                <td class="kp-stats-pod-role kp-stats-pod-role-btn"
                    data-container="${s.name}"
                    title="Restart ${o}"
                    style="cursor:pointer">${o}</td>
                <td class="kp-stats-pod-cpu${s.cpu_percent>80?" is-hot":""}">
                    ${Tn(s.cpu_percent)}
                </td>
                <td class="kp-stats-pod-mem">
                    ${P(s.mem_used)}
                    <span class="kp-stats-pod-mem-limit"> / ${P(s.mem_limit)}</span>
                </td>
                <td>
                    <div class="kp-stats-mem-wrap">
                        <div class="kp-stats-mem-bar-track">
                            <div class="kp-stats-mem-bar-fill${n?" is-hot":""}"
                                style="width:${a}%"></div>
                        </div>
                        <span class="kp-stats-mem-pct">${a}%</span>
                    </div>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}function Pn(e,t,s,a,n){if(!e||e.length===0)return'<p class="kp-muted uk-text-small">No matching requests found.</p>';let o=[...e].sort((c,m)=>{let k,h;switch(s){case"time":k=c.time,h=m.time;break;case"method":k=c.method,h=m.method;break;case"site":k=c.site_name,h=m.site_name;break;case"ip":k=c.client_ip,h=m.client_ip;break;default:k=c.status,h=m.status;break}return k<h?a?1:-1:k>h?a?-1:1:0}),i=50,l=Math.ceil(o.length/i),d=o.slice(t*i,(t+1)*i).map(c=>{let m=v(c.ua),k=c.status>=500?"kp-badge-danger":"kp-badge-warning";return`
            <tr>
                <td class="kp-stats-table-cell-mono" style="white-space:nowrap">${c.time.slice(11,19)}</td>
                ${n?`<td class="kp-stats-table-cell-mono" style="font-size:0.8rem">${v(c.site_name)}</td>`:""}
                <td class="kp-stats-table-cell-mono">${v(c.method)}</td>
                <td style="word-break:break-all;font-size:0.8rem">${v(c.path)}</td>
                <td><span class="kp-badge ${k}">${c.status}</span>${c.reason?` <span class="kp-badge kp-badge-danger" style="font-size:0.65rem" uk-tooltip="Blocked by security rule">${v(c.reason)}</span>`:""}</td>
                <td class="kp-stats-table-cell-mono">${v(c.client_ip)}</td>
                <td class="kp-dd-ua-cell">${m}</td>
            </tr>`}).join(""),u=l>1?`
        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-top">
            <span class="kp-muted uk-text-small">Page ${t+1} of ${l} \u2014 ${e.length} total</span>
            <div>
                ${t>0?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t-1}">\u2039 Prev</button>`:""}
                ${t<l-1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-dd-page="${t+1}">Next \u203A</button>`:""}
            </div>
        </div>`:"";return`
        <div class="kp-table-wrap uk-overflow-auto">
            <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                <thead><tr>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="time">Time ${s==="time"?a?"\u2193":"\u2191":"\u2195"}</th>
                    ${n?`<th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="site">Site ${s==="site"?a?"\u2193":"\u2191":"\u2195"}</th>`:""}
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="method">Method ${s==="method"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">Path</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="status">Status ${s==="status"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem;cursor:pointer;user-select:none" data-dd-col="ip">IP ${s==="ip"?a?"\u2193":"\u2191":"\u2195"}</th>
                    <th style="color:var(--kp-text-dim);font-size:0.75rem">UA</th>
                </tr></thead>
                <tbody>${d}</tbody>
            </table>
        </div>
        ${u}`}async function pt(e,t,s,a=!1){let n=document.getElementById("stats-drilldown-modal"),o=document.getElementById("stats-drilldown-title"),i=document.getElementById("stats-drilldown-body");if(!n||!i)return;o.textContent=`${s} Requests \u2014 ${new Date(t).toLocaleString([],{hour:"2-digit",minute:"2-digit",month:"short",day:"numeric"})}`,i.innerHTML='<div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>',UIkit.modal(n).show();let l=[],r=0,d="time",u=!0;function c(){i.innerHTML=Pn(l,r,d,u,a),i.querySelectorAll("th[data-dd-col]").forEach(m=>{m.addEventListener("click",()=>{let k=m.dataset.ddCol;d===k?u=!u:(d=k,u=!0),r=0,c()})}),i.querySelectorAll("[data-dd-page]").forEach(m=>{m.addEventListener("click",()=>{r=parseInt(m.dataset.ddPage,10),c()})})}try{l=await b.get(`${e}?hour=${encodeURIComponent(t)}&status=${s}`)}catch(m){i.innerHTML=`<p class="kp-muted uk-text-small">Failed to load: ${v(m.message)}</p>`;return}c()}function mt(e,t,s){let a=s===6,n=null;function o(){if(a)return;let r=e.querySelector("#stats-pod-indicator"),d=e.querySelector("#stats-pod-table-wrap");if(!d)return;let u=location.protocol==="https:"?"wss":"ws";n=new WebSocket(`${u}://${location.host}/api/sites/${t}/stats/pod`),n.onopen=()=>{r&&(r.className="kp-status kp-status-running",r.textContent="Live")},n.onmessage=c=>{try{let m=JSON.parse(c.data);d.innerHTML=In(m.containers??[]),d.querySelectorAll(".kp-stats-pod-role-btn").forEach(k=>{k.addEventListener("click",async()=>{let h=k.style.color;k.style.color="var(--kp-warning)";let g=k.dataset.container.split("-").pop();try{await b.post(`/sites/${t}/containers/${g}/restart`),p.success(`${g} restarted`)}catch(f){k.style.color=h,p.error(f.message)}})})}catch{}},n.onerror=()=>{r&&(r.className="kp-status kp-status-error",r.textContent="Error")},n.onclose=()=>{r&&r.textContent==="Live"&&(r.className="kp-status kp-status-stopped",r.textContent="Disconnected")}}function i(){n&&n.readyState===WebSocket.OPEN&&n.close(),n=null}e.querySelector("#stats-disk-refresh")?.addEventListener("click",()=>{ds(t)}),o();let l=new MutationObserver(()=>{document.getElementById("stats-panel")||(i(),l.disconnect())});l.observe(document.getElementById("main")??document.body,{childList:!0,subtree:!1})}async function kt(e,t){let s=t===6;await Cn(e),s||await ds(e)}async function us(e){let t=await b.get("/sites")??[];e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Sites</h1>
            <button class="uk-button kp-btn-primary" id="sites-new-btn" uk-tooltip="Create a New Site">
                <span uk-icon="plus"></span> New
            </button>
        </div>

        <!-- bulk action bar \u2014 always visible -->
        <div id="sites-bulk-bar" class="kp-bulk-bar">
            <div class="kp-bulk-actions">
                <span id="sites-bulk-count" class="kp-bulk-count">0 selected</span>
                <!-- desktop: individual buttons (hidden on mobile) -->
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-start" uk-tooltip="Start the Pod(s)" disabled>
                    <span uk-icon="play"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-stop" uk-tooltip="Stop the Pod(s)" disabled>
                    <span uk-icon="ban"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-restart" uk-tooltip="Restart the Pod(s)" disabled>
                    <span uk-icon="refresh"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm uk-visible@s" id="bulk-flush" uk-tooltip="Flush the Pod Cache(s)" disabled>
                    <span uk-icon="bolt"></span>
                </button>
                <!-- separator + dangerous bulk action -->
                <span class="uk-visible@s kp-vert-sep" aria-hidden="true"></span>
                <button class="uk-button kp-btn-danger kp-btn-recreate kp-btn-sm uk-visible@s" id="bulk-recreate" uk-tooltip="Recreate the Pod(s)" disabled>
                    <span uk-icon="cloud-download"></span>
                </button>
                <!-- mobile: actions dropdown (hidden on desktop), mirrors Manage dropdown -->
                <li id="kp-bulk-mobile-pill" class="uk-hidden@s" style="position:relative;list-style:none">
                    <a href="javascript:void(0);" class="kp-pill-dropdown-btn" id="kp-bulk-mobile-btn">
                        Actions <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                    </a>
                    <div class="kp-pill-dropdown" id="kp-bulk-mobile-dropdown" hidden>
                        <a href="#" id="bulk-mobile-start"><span uk-icon="icon: play; ratio: 0.85"></span> Start</a>
                        <a href="#" id="bulk-mobile-stop"><span uk-icon="icon: ban; ratio: 0.85"></span> Stop</a>
                        <a href="#" id="bulk-mobile-restart"><span uk-icon="icon: refresh; ratio: 0.85"></span> Restart</a>
                        <a href="#" id="bulk-mobile-flush"><span uk-icon="icon: bolt; ratio: 0.85"></span> Flush Caches</a>
                        <a href="#" id="bulk-mobile-recreate"><span uk-icon="icon: cloud-download; ratio: 0.85"></span> Recreate</a>
                    </div>
                </li>
            </div>
            <input class="uk-input kp-input kp-input-sm kp-sites-search"
                   id="sites-search" type="text" placeholder="Filter sites\u2026" autocomplete="off">
        </div>

        ${t.length===0?ae("world","No sites yet \u2014 create one to get started"):`<div class="kp-table-wrap">
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-hover uk-table-divider uk-table-small uk-margin-remove">
                        <thead>
                            <tr>
                                <th class="uk-table-shrink">
                                    <input class="uk-checkbox" type="checkbox" id="sites-select-all" uk-tooltip="Select All">
                                </th>
                                <th class="kp-sortable" data-col="status">Status <span class="kp-sort-icon" data-col="status"></span></th>
                                <th class="kp-sortable" data-col="name">Name <span class="kp-sort-icon" data-col="name"></span></th>
                                <th class="uk-visible@s kp-sortable" data-col="type">Type <span class="kp-sort-icon" data-col="type"></span></th>
                                <th class="uk-visible@m">Port</th>
                                <th class="uk-visible@m">UID</th>
                                <th class="uk-visible@m kp-sortable" data-col="domain">Domain <span class="kp-sort-icon" data-col="domain"></span></th>
                                <th class="uk-table-shrink">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map(s=>Bn(s,t)).join("")}
                        </tbody>
                    </table>
                </div>
            </div>`}`,document.getElementById("sites-new-btn").addEventListener("click",()=>De()),_n()}function Bn(e,t=[]){let s=e.Domains?.[0]??null,a=e.SiteType===6,n=e.ParentID>0?t.find(o=>o.ID===e.ParentID)??null:null;return`
        <tr data-site-id="${e.ID}" data-status="${a?"":e.SiteStatus}" data-type="${e.SiteType}">
            <!-- row checkbox -->
            <td class="uk-table-shrink">
                <input class="uk-checkbox kp-site-row-check" type="checkbox"
                       data-site-id="${e.ID}" data-site-type="${e.SiteType}">
            </td>
            <!-- status badge -->
            <td class="uk-table-shrink kp-site-row-status">${a?"":K(e.SiteStatus)}</td>

            <!-- name + optional parent clone link -->
            <td>
                <a class="kp-site-row-name" href="javascript:void(0)"
                   data-action="manage" data-id="${e.ID}">${e.Name}</a>
                ${n?`<div class="kp-muted uk-text-small kp-mono">
                           <span uk-icon="icon: git-fork; ratio: 0.7"></span>
                           <a href="javascript:void(0)" data-action="manage" data-id="${n.ID}"
                              style="color:var(--kp-cyan)">${n.Name}</a>
                       </div>`:""}
            </td>

            <!-- type / runtime version -->
            <td class="uk-visible@s kp-muted kp-mono uk-text-small">
                ${ge(e.SiteType)}${J(e)?" / "+J(e):""}
            </td>

            <!-- internal port -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">:${e.Port}</td>

            <!-- host-mapped owner UID of html/ -->
            <td class="uk-visible@m kp-muted kp-mono uk-text-small">${e.HostUID??(a?"":"\u2014")}</td>

            <!-- primary domain -->
            <td class="uk-visible@m uk-text-small">
                ${s?`<a href="http://${s}" target="_blank"
                          style="color:var(--kp-cyan)">${s}</a>`:'<span class="kp-muted">\u2014</span>'}
            </td>

            <!-- action buttons -->
            <td class="uk-table-shrink">
                <div class="kp-site-row-actions">
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="manage" data-id="${e.ID}"
                            uk-tooltip="Manage">
                        <span uk-icon="icon: cog;"></span>
                    </button>
                    ${a?"":`
                    ${e.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="stop" data-id="${e.ID}"
                                   uk-tooltip="Stop">
                               <span uk-icon="icon: ban;"></span>
                           </button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm"
                                   data-action="start" data-id="${e.ID}"
                                   uk-tooltip="Start">
                               <span uk-icon="icon: play;"></span>
                           </button>`}
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="restart" data-id="${e.ID}"
                            uk-tooltip="Restart">
                        <span uk-icon="icon: refresh;"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm"
                            data-action="flush" data-id="${e.ID}"
                            uk-tooltip="Flush Caches">
                        <span uk-icon="icon: bolt;"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="recreate" data-id="${e.ID}"
                            uk-tooltip="Recreate Pod">
                        <span uk-icon="icon: history;"></span>
                    </button>
                    `}
                    <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate"
                            data-action="delete" data-id="${e.ID}"
                            uk-tooltip="Delete">
                        <span uk-icon="icon: trash;"></span>
                    </button>
                </div>
            </td>
        </tr>`}function ps(e,t=[]){let s=e.Domains?.[0]??null,a=e.SiteType===6,n=e.ParentID>0?t.find(o=>o.ID===e.ParentID)??null:null;return`
        <div class="kp-site-card uk-margin" data-site-id="${e.ID}" data-status="${a?"":e.SiteStatus}" data-type="${e.SiteType}">
            <div class="kp-site-card-header">
                <div>
                    <h2 class="kp-view-title" data-action="manage" data-id="${e.ID}">${e.Name}</h2>
                    <div class="kp-site-meta">
                        <span class="kp-site-meta-item"><span uk-icon="icon: server; ratio: 0.75"></span> :${e.Port}</span>
                        <span class="kp-site-meta-item"><span uk-icon="icon: code; ratio: 0.75"></span> ${ge(e.SiteType)}${J(e)?" / "+J(e):""}</span>
                        ${s?`<span class="kp-site-meta-item" style="width:100%"><a href="http://${s}" target="_blank" style="color:var(--kp-cyan)">${s}</a></span>`:""}
                    </div>
                    ${n?`<div class="kp-site-meta kp-muted uk-text-small uk-margin-small-top"><span uk-icon="icon: git-fork; ratio: 0.75"></span> <a href="javascript:void(0)" data-action="manage" data-id="${n.ID}" style="color:var(--kp-cyan)">${n.Name}</a></div>`:""}
                </div>
                ${a?"":K(e.SiteStatus)}
            </div>
            <div class="kp-site-actions">
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="manage" data-id="${e.ID}" uk-tooltip="Manage This Site"><span uk-icon="icon: cog;"></span></button>
                ${a?"":`
                ${e.SiteStatus===1?`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="stop" data-id="${e.ID}" uk-tooltip="Stop the Site"><span uk-icon="icon: ban;"></span></button>`:`<button class="uk-button kp-btn-secondary kp-btn-sm" data-action="start" data-id="${e.ID}" uk-tooltip="Start the Site"><span uk-icon="icon: play;"></span></button>`}
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="restart" data-id="${e.ID}" uk-tooltip="Restart the Site"><span uk-icon="icon: refresh;"></span></button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="flush" data-id="${e.ID}" title="Flush cache" uk-tooltip="Flush the Caches"><span uk-icon="icon: bolt;"></span></button>
                <div class="kp-site-actions-break"></div>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="recreate" data-id="${e.ID}" title="Recreate pod" uk-tooltip="Recreate the Pod"><span uk-icon="icon: history;"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="delete" data-id="${e.ID}" title="Delete" uk-tooltip="Delete the Site"><span uk-icon="icon: trash;"></span></button>
            </div>
        </div>`}function _n(){let e=document.getElementById("sites-bulk-bar"),t=document.getElementById("sites-bulk-count"),s=document.getElementById("sites-select-all"),a=document.getElementById("sites-search"),n=document.querySelector(".kp-table-wrap tbody");if(!e||!s)return;let o=null,i=!0,l=()=>[...document.querySelectorAll(".kp-site-row-check:checked")],r=()=>{let h=l().length;t.textContent=`${h} selected`,["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(w=>{let T=document.getElementById(w);T&&(T.disabled=h===0)});let g=document.getElementById("kp-bulk-mobile-btn");g&&(g.disabled=h===0);let f=document.querySelectorAll(".kp-site-row-check");s.indeterminate=h>0&&h<f.length,s.checked=f.length>0&&h===f.length},d=()=>{let k=a.value.trim().toLowerCase();document.querySelectorAll(".kp-table-wrap tbody tr").forEach(h=>{let g=h.querySelector(".kp-site-row-name")?.textContent.toLowerCase()??"",f=h.querySelector("td:nth-child(6)")?.textContent.toLowerCase()??"";h.style.display=!k||g.includes(k)||f.includes(k)?"":"none"})},u=k=>{o===k?i=!i:(o=k,i=!0),document.querySelectorAll(".kp-sort-icon").forEach(g=>{g.textContent=g.dataset.col===k?i?" \u2191":" \u2193":" \u2195"});let h=[...n.querySelectorAll("tr")];h.sort((g,f)=>{let w="",T="";return k==="name"?(w=g.querySelector(".kp-site-row-name")?.textContent??"",T=f.querySelector(".kp-site-row-name")?.textContent??""):k==="status"?(w=g.dataset.status??"",T=f.dataset.status??""):k==="type"?(w=g.dataset.type??"",T=f.dataset.type??""):k==="domain"&&(w=g.querySelector("td:nth-child(6)")?.textContent.trim()??"",T=f.querySelector("td:nth-child(6)")?.textContent.trim()??""),i?w.localeCompare(T):T.localeCompare(w)}),h.forEach(g=>n.appendChild(g))};s.addEventListener("change",()=>{document.querySelectorAll(".kp-site-row-check").forEach(k=>{k.checked=s.checked}),r()}),n?.addEventListener("change",k=>{k.target.classList.contains("kp-site-row-check")&&r()}),a?.addEventListener("input",d),document.querySelectorAll(".kp-sortable").forEach(k=>{k.addEventListener("click",()=>u(k.dataset.col))}),["bulk-start","bulk-stop","bulk-restart","bulk-flush","bulk-recreate"].forEach(k=>{let h=k.replace("bulk-","");document.getElementById(k)?.addEventListener("click",()=>{let g=l().filter(f=>f.dataset.siteType!=="6").map(f=>f.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:h,ids:g}}))})});let c=document.getElementById("kp-bulk-mobile-pill"),m=document.getElementById("kp-bulk-mobile-dropdown");document.getElementById("kp-bulk-mobile-btn")?.addEventListener("click",k=>{k.stopPropagation(),m.hidden=!m.hidden}),document.addEventListener("click",k=>{m&&!c?.contains(k.target)&&(m.hidden=!0)},{capture:!0}),["start","stop","restart","flush","recreate"].forEach(k=>{document.getElementById(`bulk-mobile-${k}`)?.addEventListener("click",h=>{h.preventDefault(),m.hidden=!0;let g=l().filter(f=>f.dataset.siteType!=="6").map(f=>f.dataset.siteId);document.dispatchEvent(new CustomEvent("kp:bulk-action",{detail:{action:k,ids:g}}))})}),document.querySelectorAll(".kp-sort-icon").forEach(k=>{k.textContent=" \u2195"}),r()}var ie=null,le=null;function An(){le&&(le.close(),le=null);let e=(a,n)=>n>0?`${(a/n*100).toFixed(1)}%`:"\u2014",t=location.protocol==="https:"?"wss":"ws",s=new WebSocket(`${t}://${location.host}/api/stats/host`);le=s,s.onmessage=a=>{let n=document.getElementById("dash-host-cpu");if(!n){s.close();return}let o;try{o=JSON.parse(a.data)}catch{return}n.textContent=`${(o.cpu_percent??0).toFixed(1)}%`,document.getElementById("dash-host-mem").textContent=e(o.mem_used,o.mem_total),document.getElementById("dash-host-mem-sub").textContent=`${P(o.mem_used??0)} / ${P(o.mem_total??0)}`,document.getElementById("dash-host-disk").textContent=e(o.disk_used,o.disk_total),document.getElementById("dash-host-disk-sub").textContent=`${P(o.disk_used??0)} / ${P(o.disk_total??0)}`,document.getElementById("dash-host-procs").textContent=(o.procs_running??0).toLocaleString(),document.getElementById("dash-host-procs-sub").textContent=`of ${(o.procs_total??0).toLocaleString()} threads`},s.onclose=()=>{le===s&&(le=null)}}async function ms(e){let[t,s,a]=await Promise.all([b.get("/sites").catch(()=>[]),b.get("/stats/traffic").catch(()=>null),window.KP?.user?.role===99?b.get("/nodes").catch(()=>[]):[]]),n=t.filter(d=>d.SiteType!==6&&d.SiteStatus===1).length,o=t.filter(d=>d.SiteType===6).length,i=t.filter(d=>d.SiteType!==6&&d.SiteStatus===4).length,l=window.KP?.user?.role===99,r=a.filter(d=>d.status===2);if(e.innerHTML=`

        <!-- global counts -->
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Dashboard</h1>
        </div>
        <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-bottom" uk-grid>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value">${t.length}</div>
                            <div class="kp-stat-label">Total Sites</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: world; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-success)">${n}</div>
                            <div class="kp-stat-label">Running</div>
                        </div>
                        <span style="color:var(--kp-success)" uk-icon="icon: check; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-cyan)">${o}</div>
                            <div class="kp-stat-label">Proxies</div>
                        </div>
                        <span style="color:var(--kp-cyan)" uk-icon="icon: link; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" style="color:var(--kp-danger)">${i}</div>
                            <div class="kp-stat-label">Errors</div>
                        </div>
                        <span style="color:var(--kp-danger)" uk-icon="icon: warning; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- live host usage \u2014 admin only -->
        ${l?`
        <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-medium-bottom" uk-grid>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-cpu">\u2014</div>
                            <div class="kp-stat-label">Host CPU</div>
                            <div class="kp-muted uk-text-small kp-mono">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: bolt; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-mem">\u2014</div>
                            <div class="kp-stat-label">Host Memory</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-mem-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: server; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-disk">\u2014</div>
                            <div class="kp-stat-label">Host Disk</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-disk-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: database; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="kp-stat-card">
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <div class="kp-stat-value" id="dash-host-procs">\u2014</div>
                            <div class="kp-stat-label">Running Processes</div>
                            <div class="kp-muted uk-text-small kp-mono" id="dash-host-procs-sub">&nbsp;</div>
                        </div>
                        <span class="kp-stat-icon" uk-icon="icon: list; ratio: 1.75"></span>
                    </div>
                </div>
            </div>
        </div>
        `:""}
        
        <!-- paired nodes \u2014 admin only -->
        ${r.length?`
        <div class="uk-flex uk-flex-wrap uk-margin-medium-bottom" id="dash-nodes" style="gap:8px">
            ${r.map(d=>`
            <button class="uk-button kp-btn-primary kp-btn-sm" data-action="dash-node-open" data-nid="${d.id}" uk-tooltip="Open the Node">
                <span uk-icon="icon: sign-in;"></span> ${v(d.name)}
            </button>`).join("")}
        </div>
        `:""}

        <!-- global traffic -->
        <div class="kp-view-header uk-margin-top">
            <h2 class="kp-view-title" style="font-size:1.25rem">Traffic
                <span class="kp-muted uk-text-small" style="font-weight:400"> \u2014 last 24 hours</span>
            </h2>
        </div>
        <div class="kp-card uk-padding-small uk-margin-medium-bottom">
            <div class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-margin-small-bottom" uk-grid>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-success)">
                        ${(s?.status_codes?.["2xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-success)">2xx Success</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-cyan)">
                        ${(s?.status_codes?.["3xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-cyan)">3xx Redirect</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-warning)">
                        ${(s?.status_codes?.["4xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-warning)">4xx Client Err</div>
                </div></div>
                <div><div class="kp-stat-card" style="padding:16px">
                    <div class="kp-stat-value" style="font-size:1.6rem;color:var(--kp-danger)">
                        ${(s?.status_codes?.["5xx"]??0).toLocaleString()}
                    </div>
                    <div class="kp-stat-label" style="color:var(--kp-danger)">5xx Server Err</div>
                </div></div>
            </div>
            <div class="uk-margin-small-bottom" style="color:var(--kp-text-dim);font-size:0.85rem">
                Total Bandwidth:
                <span style="color:var(--kp-cyan);font-family:'JetBrains Mono',monospace">
                    ${P(s?.total_bandwidth??0)}
                </span>
            </div>
            <div style="position:relative;height:180px">
                <canvas id="dash-traffic-chart"></canvas>
            </div>
        </div>

        <!-- drilldown modal \u2014 populated on 4xx/5xx bar click -->
        <div id="stats-drilldown-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body" style="min-width:min(96vw,900px)">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title uk-margin-small-bottom" id="stats-drilldown-title">Request Detail</h3>
                <div id="stats-drilldown-body">
                    <div uk-spinner="ratio:0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>
        </div>

        <!-- global pod aggregate + top sites -->
        <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-medium-bottom" uk-grid>
            <div>

                <!-- recent sites -->
                <div class="kp-view-header">
                    <h2 class="kp-view-title" style="font-size:1.25rem">Recent Sites</h2>
                </div>
                <div class="">
                    ${t.length===0?emptyState("world","No sites yet"):t.slice(-3).reverse().map(d=>ps(d,t)).join("")}
                </div>

            </div>
            <div>

                <!-- top traffic sites -->
                <div class="kp-view-header">
                    <h2 class="kp-view-title" style="font-size:1.25rem">Top Sites by Traffic</h2>
                </div>
                <div class="kp-table-wrap">
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <thead><tr>
                            <th style="color:var(--kp-text-dim);font-size:0.75rem">Host</th>
                            <th style="color:var(--kp-text-dim);font-size:0.75rem;text-align:right">Hits</th>
                        </tr></thead>
                        <tbody>
                            ${(s?.top_sites??[]).length===0?'<tr><td colspan="2" class="kp-muted uk-text-small">No traffic data</td></tr>':(s?.top_sites??[]).map(d=>`
                                    <tr>
                                        <td class="kp-mono" style="font-size:0.8rem">${v(d.name)}</td>
                                        <td style="text-align:right;color:var(--kp-cyan);
                                            font-family:'JetBrains Mono',monospace;font-size:0.8rem">
                                            ${d.count.toLocaleString()}
                                        </td>
                                    </tr>`).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `,l&&An(),document.getElementById("dash-nodes")?.addEventListener("click",async d=>{let u=d.target.closest('[data-action="dash-node-open"]');if(u)try{let c=await b.post(`/nodes/${u.dataset.nid}/sso`);ne(c.link)}catch(c){p.error(c.message)}}),s?.hits_per_hour?.length){await dt();let d=document.getElementById("dash-traffic-chart");d&&window.Chart&&(ie&&(ie.destroy(),ie=null),ie=new window.Chart(d,{type:"bar",data:{labels:s.hits_per_hour.map(u=>new Date(u.hour).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),datasets:[{label:"2xx",data:s.hits_per_hour.map(u=>u["2xx"]),backgroundColor:"rgba(39,174,96,0.75)",borderColor:"rgba(39,174,96,1)",borderWidth:1,borderRadius:3},{label:"3xx",data:s.hits_per_hour.map(u=>u["3xx"]),backgroundColor:"rgba(43,142,255,0.75)",borderColor:"rgba(43,142,255,1)",borderWidth:1,borderRadius:3},{label:"4xx",data:s.hits_per_hour.map(u=>u["4xx"]),backgroundColor:"rgba(255,171,0,0.75)",borderColor:"rgba(255,171,0,1)",borderWidth:1,borderRadius:3},{label:"5xx",data:s.hits_per_hour.map(u=>u["5xx"]),backgroundColor:"rgba(235,59,90,0.75)",borderColor:"rgba(235,59,90,1)",borderWidth:1,borderRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,onClick:(u,c)=>{if(!c||!c.length)return;let m=c[0].datasetIndex,k=ie.data.datasets[m].label;if(k!=="4xx"&&k!=="5xx")return;let h=s.hits_per_hour[c[0].index]?.hour;h&&pt("/stats/drilldown",h,k,!0)},onHover:(u,c)=>{if(!c||!c.length){u.native.target.style.cursor="default";return}let m=ie.data.datasets[c[0].datasetIndex].label;u.native.target.style.cursor=m==="4xx"||m==="5xx"?"pointer":"default"},plugins:{legend:{display:!0,labels:{color:"#6b8cae",font:{size:11}},onHover:u=>{u.native.target.style.cursor="pointer"},onLeave:u=>{u.native.target.style.cursor="default"}},tooltip:{mode:"index",backgroundColor:"#0c1530",borderColor:"#1a2a4a",borderWidth:1,titleColor:"#dde8f5",bodyColor:"#6b8cae"}},scales:{x:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10},maxRotation:45},grid:{color:"rgba(26,42,74,0.6)"}},y:{stacked:!0,ticks:{color:"#6b8cae",font:{size:10}},grid:{color:"rgba(26,42,74,0.6)"},beginAtZero:!0}}}}))}document.getElementById("dash-new-site")?.addEventListener("click",()=>De())}function ve(e=null){let t=e?`/sites/${e}/security/ip`:"/security/ip",s=e?`/sites/${e}/security/ua`:"/security/ua",a=e?`/sites/${e}/security/country`:"/security/country",n=e?`/sites/${e}/security/asn`:"/security/asn";return`
        <div id="security-panel" data-ip-base="${t}" data-ua-base="${s}" data-geo-base="${a}" data-asn-base="${n}" ${e?`data-site-id="${e}"`:""}>

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-sec-pills">
                <li data-tab="ip"><a href="#"><span uk-icon="icon: location; ratio: 0.85"></span> IP Rules</a></li>
                <li data-tab="ua"><a href="#"><span uk-icon="icon: laptop; ratio: 0.85"></span> User-Agent</a></li>
                <li data-tab="country"><a href="#"><span uk-icon="icon: world; ratio: 0.85"></span> Country</a></li>
                <li data-tab="asn"><a href="#"><span uk-icon="icon: server; ratio: 0.85"></span> ASN</a></li>
                ${e?`
                <li data-tab="malware"><a href="#"><span uk-icon="icon: bolt; ratio: 0.85"></span> Malware</a></li>
                `:""}
                ${e?"":`
                <li data-tab="proxies"><a href="#"><span uk-icon="icon: link; ratio: 0.85"></span> Trusted Proxies</a></li>
                <li data-tab="bypass"><a href="#"><span uk-icon="icon: unlock; ratio: 0.85"></span> Bypass</a></li>
                `}
            </ul>

            <!-- switcher panels -->
            <ul class="uk-switcher uk-margin-large-bottom" id="kp-sec-switcher">

                <!-- ip rules -->
                <li>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        <span uk-icon="icon: warning; ratio: 0.75"></span>
                        The Spamhaus DROP lists are enforced alongside these rules on every
                        request. Whitelist an IP here to allow it through regardless.
                        <a href="https://www.spamhaus.org/blocklists/do-not-route-or-peer/" target="_blank" rel="noopener">
                            About Spamhaus DROP
                        </a>
                    </p>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">IP Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${t}/export" download="${e?`site-${e}-ip-rules.csv`:"podnest-global-ip-rules.csv"}" uk-tooltip="Export IP rules as CSV">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import IP rules from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-ip-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-ip-save" uk-tooltip="Save the IP Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One IP address or CIDR block per line (e.g. <span class="kp-mono">1.2.3.4</span>
                            or <span class="kp-mono">10.0.0.0/8</span>).
                            A whitelisted IP is allowed outright, ahead of both the global and
                            per-site blacklists. Whitelist is disabled when empty.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ip-whitelist" rows="6"
                                    placeholder="# allow only these IPs&#10;1.2.3.4&#10;10.0.0.0/8"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ip-blacklist" rows="6"
                                    placeholder="# block these IPs&#10;5.6.7.8&#10;192.168.99.0/24"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- user-agent rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">User-Agent Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api${s}/export" download="${e?`site-${e}-ua-rules.csv`:"podnest-global-ua-rules.csv"}" uk-tooltip="Export UA rules as CSV">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import UA rules from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-ua-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-ua-save" uk-tooltip="Save the User-Agent Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One substring per line \u2014 matched case-insensitively against the full User-Agent header.
                            Blacklist always wins. Whitelist is disabled when empty.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ua-whitelist" rows="6"
                                    placeholder="# allow only these agents&#10;mozilla&#10;googlebot"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-ua-blacklist" rows="6"
                                    placeholder="# block these agents&#10;sqlmap&#10;nikto&#10;masscan"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- country rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Country Rules</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-geo-save" uk-tooltip="Save the Country Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One ISO 3166-1 alpha-2 country code per line (e.g. <span class="kp-mono">US</span>
                            or <span class="kp-mono">DE</span>).
                            Blacklist always wins. Whitelist is disabled when empty.
                            Unresolvable IPs (private ranges, unknown) are always allowed.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-geo-whitelist" rows="6"
                                    placeholder="# allow only these countries&#10;US&#10;CA"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-geo-blacklist" rows="6"
                                    placeholder="# block these countries&#10;CN&#10;RU"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- asn rules -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">ASN Rules</h3>
                            <div class="uk-flex uk-flex-middle" style="gap:8px">
                                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sec-asn-lookup" uk-tooltip="Look up the ASN for an IP or domain">
                                    <span uk-icon="eye"></span>
                                </button>
                                <div style="width:1px;align-self:stretch;background:var(--kp-border)"></div>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-asn-save" uk-tooltip="Save the ASN Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            One autonomous system number per line (e.g. <span class="kp-mono">AS15169</span>
                            or <span class="kp-mono">15169</span>).
                            Blacklist always wins. Whitelist is disabled when empty.
                            Unresolvable IPs (private ranges, unknown) are always allowed.
                        </p>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: check; ratio: 0.75" style="color:var(--kp-success)"></span>
                                    Whitelist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-asn-whitelist" rows="6"
                                    placeholder="# allow only these networks&#10;AS7922&#10;AS20115"></textarea>
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="kp-label">
                                    <span uk-icon="icon: ban; ratio: 0.75" style="color:var(--kp-danger)"></span>
                                    Blacklist
                                </label>
                                <textarea class="uk-textarea kp-textarea" id="sec-asn-blacklist" rows="6"
                                    placeholder="# block these networks&#10;AS16509&#10;AS14061"></textarea>
                            </div>
                        </div>
                    </div>
                </li>

                ${e?`
                <!-- malware scans -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Malware Scans</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-malware-scan" uk-tooltip="Scan this site now" disabled>
                                    <span uk-icon="search"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            The site's html directory is scanned nightly at midnight with ClamAV and Linux Malware Detect.
                            Findings are reported only \u2014 quarantine moves a file out of
                            the site and out of SFTP reach. History is kept for <span id="sec-malware-retain">30</span> days.
                        </p>
                        <div id="sec-malware-list">
                            <div uk-spinner="ratio: 0.6"></div>
                        </div>
                    </div>
                </li>
                `:""}

                ${e?"":`
                <!-- trusted proxy ranges -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Trusted Proxy Ranges</h3>
                            <div class="uk-flex" style="gap:8px">
                                <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/trusted-proxies/export" download="podnest-trusted-proxies.csv" uk-tooltip="Export trusted proxies">
                                    <span uk-icon="download"></span>
                                </a>
                                <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import trusted proxies from CSV">
                                    <span uk-icon="upload"></span>
                                    <input type="file" id="sec-tp-import" accept=".csv" style="display:none">
                                </label>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-tp-save" uk-tooltip="Save Trusted Proxy Ranges">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Custom IP ranges (one CIDR per line) to trust in addition to the
                            auto-fetched Cloudflare, Fastly, and CloudFront ranges.
                            <code>X-Forwarded-For</code> is only honoured when a request arrives
                            from one of these addresses.
                        </p>
                        <textarea class="uk-textarea kp-textarea kp-mono" id="sec-tp-cidrs" rows="12"
                            placeholder="192.168.1.0/24"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            One IPv4 or IPv6 CIDR per line. Auto-fetched provider ranges are
                            managed automatically and do not need to be entered here.
                        </p>
                    </div>
                </li>

                <!-- security bypass -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Security Bypass</h3>
                            <div class="uk-flex" style="gap:8px">
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-bypass-save" uk-tooltip="Save Bypass Rules">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            IPs or CIDRs that skip all security checks (IP rules, UA rules, WAF).
                            Use for trusted services that must not be blocked. Supports inline
                            notes with <code>#</code> e.g. <code>1.2.3.4/32 # WP Umbrella</code>
                        </p>
                        <textarea class="uk-textarea kp-textarea kp-mono" id="sec-bypass-cidrs" rows="12"
                            placeholder="1.2.3.4/32 # WP Umbrella&#10;2001:db8::/32 # monitoring"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            One IPv4, IPv6, or CIDR per line. Bypassed IPs are still proxied normally \u2014 only enforcement is skipped.
                        </p>
                    </div>
                </li>
                `}

            </ul>
        </div>`}function Fe(e,t){let s=e.querySelector("#security-panel"),a=e.querySelector("#kp-sec-pills"),n=e.querySelector("#kp-sec-switcher");if(!s||!a||!n)return;let o=s.dataset.siteId,i=[...a.querySelectorAll(":scope > li")],l=(r,d)=>{if(UIkit.switcher(n).show(r),i.forEach((c,m)=>c.classList.toggle("kp-pill-active",m===r)),!d)return;let u=i[r].dataset.tab;history.replaceState(null,"",o?`#site-detail/${o}/${u}`:r===0?"#security":`#security/${u}`)};i.forEach((r,d)=>{r.querySelector(":scope > a").addEventListener("click",u=>{u.preventDefault(),l(d,!0)})}),l(Math.max(0,i.findIndex(r=>r.dataset.tab===t)),!1)}async function Y(e){let t=e.querySelector("#security-panel");if(!t)return;let s=t.dataset.ipBase,a=t.dataset.uaBase;try{let n=t.dataset.geoBase,o=t.dataset.asnBase,i=[b.get(s),b.get(a),b.get(n),b.get(o)];t.dataset.siteId||i.push(b.get("/settings/trusted-proxies"),b.get("/security/bypass"));let[l,r,d,u,c,m]=await Promise.all(i);if(!e.querySelector("#sec-ip-whitelist"))return;if(e.querySelector("#sec-ip-whitelist").value=l.whitelist??"",e.querySelector("#sec-ip-blacklist").value=l.blacklist??"",e.querySelector("#sec-ua-whitelist").value=r.whitelist??"",e.querySelector("#sec-ua-blacklist").value=r.blacklist??"",e.querySelector("#sec-geo-whitelist").value=d.whitelist??"",e.querySelector("#sec-geo-blacklist").value=d.blacklist??"",e.querySelector("#sec-asn-whitelist").value=u.whitelist??"",e.querySelector("#sec-asn-blacklist").value=u.blacklist??"",c){let k=e.querySelector("#sec-tp-cidrs");k&&(k.value=c.trusted_proxies_custom??"")}if(m){let k=e.querySelector("#sec-bypass-cidrs");k&&(k.value=m.bypass??"")}}catch(n){p.error("Failed to load security rules: "+n.message)}t.dataset.siteId&&Ue(e,t.dataset.siteId)}var qn={1:["restarting","Running"],2:["running","Clean"],3:["error","Infected"],4:["stopped","Failed"]},ks=null;function Mn(e){return e.scannable?e.scans.length?`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead>
                <tr>
                    <th>Started</th>
                    <th>Trigger</th>
                    <th>Status</th>
                    <th>Files</th>
                    <th>Hits</th>
                </tr>
            </thead>
            <tbody>${e.scans.map(s=>{let[a,n]=qn[s.status]||["stopped","Unknown"],o=s.status===1,i=(s.findings||[]).map(l=>`
            <tr>
                <td colspan="4" style="padding-left:24px">
                    <div class="kp-mono" style="font-size:0.8rem">${v(l.path)}</div>
                    <div class="kp-muted uk-text-small">${v(l.signature)}</div>
                </td>
                <td>
                    ${l.quarantined?'<span class="kp-muted uk-text-small">Quarantined</span>':`<button class="uk-button kp-btn-danger kp-btn-sm sec-malware-quarantine" data-id="${l.id}" uk-tooltip="Move this file into quarantine">
                               <span uk-icon="lock"></span>
                           </button>`}
                </td>
            </tr>`).join("");return`
            <tr>
                <td>${new Date(s.started).toLocaleString()}</td>
                <td>${s.trigger==="manual"?"Manual":"Scheduled"}</td>
                <td>
                    <span class="kp-status kp-status-${a}">${n}</span>
                    ${s.error?`<div class="kp-muted uk-text-small">${v(s.error)}</div>`:""}
                </td>
                <td>${o?"\u2014":s.files_scanned}</td>
                <td>${o?"\u2014":s.infected}</td>
            </tr>${i}`}).join("")}</tbody>
        </table>
        </div>`:'<p class="kp-muted uk-text-small uk-margin-remove">No scans yet.</p>':'<p class="kp-muted uk-text-small uk-margin-remove">This site has no html directory to scan.</p>'}async function Ue(e,t){if(clearTimeout(ks),!!e.querySelector("#sec-malware-list"))try{let s=await b.get(`/sites/${t}/malware`),a=e.querySelector("#sec-malware-list");if(!a)return;let n=s.scans.some(o=>o.status===1);a.innerHTML=Mn(s),e.querySelector("#sec-malware-scan").disabled=!s.scannable||n,e.querySelector("#sec-malware-retain").textContent=s.retain_days,n&&(ks=setTimeout(()=>Ue(e,t),1e4))}catch(s){p.error("Failed to load malware scans: "+s.message)}}function We(e){let t=e.querySelector("#security-panel");if(!t)return;let s=t.dataset.ipBase,a=t.dataset.uaBase,n=t.dataset.geoBase;e.querySelector("#sec-ip-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-ip-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put(s,{whitelist:e.querySelector("#sec-ip-whitelist").value,blacklist:e.querySelector("#sec-ip-blacklist").value}),p.success("IP rules saved")}catch(l){p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-ua-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-ua-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put(a,{whitelist:e.querySelector("#sec-ua-whitelist").value,blacklist:e.querySelector("#sec-ua-blacklist").value}),p.success("UA rules saved")}catch(l){p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-geo-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-geo-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l={whitelist:e.querySelector("#sec-geo-whitelist").value,blacklist:e.querySelector("#sec-geo-blacklist").value},r=await b.put(n,l);r?.status==="confirm"&&(await UIkit.modal.confirm(`${r.reason}. Save anyway?`),r=await b.put(n,{...l,confirm:!0})),p.success("Country rules saved")}catch(l){l instanceof Error&&p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-asn-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-asn-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let l=e.querySelector("#security-panel").dataset.asnBase,r={whitelist:e.querySelector("#sec-asn-whitelist").value,blacklist:e.querySelector("#sec-asn-blacklist").value},d=await b.put(l,r);d?.status==="confirm"&&(await UIkit.modal.confirm(`${d.reason}. Save anyway?`),d=await b.put(l,{...r,confirm:!0})),p.success("ASN rules saved")}catch(l){l instanceof Error&&p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-asn-lookup")?.addEventListener("click",()=>Rn(e)),e.querySelector("#sec-malware-scan")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-malware-scan"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.post(`/sites/${t.dataset.siteId}/malware/scan`),p.success("Malware scan queued"),await Ue(e,t.dataset.siteId)}catch(l){p.error(l.message),o.disabled=!1}finally{o.innerHTML=i}}),e.querySelector("#sec-malware-list")?.addEventListener("click",async o=>{let i=o.target.closest(".sec-malware-quarantine");if(!(!i||!await E("Quarantine File","This moves the file out of the site's html directory. If it is legitimately needed, the site may break. Continue?"))){i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.post(`/sites/${t.dataset.siteId}/malware/findings/${i.dataset.id}/quarantine`),p.success("File quarantined")}catch(r){p.error(r.message)}finally{await Ue(e,t.dataset.siteId)}}}),e.querySelector("#sec-tp-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-tp-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put("/settings/trusted-proxies",{trusted_proxies_custom:e.querySelector("#sec-tp-cidrs").value.trim()}),p.success("Trusted proxy ranges saved")}catch(l){p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-bypass-save")?.addEventListener("click",async()=>{let o=e.querySelector("#sec-bypass-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put("/security/bypass",{bypass:e.querySelector("#sec-bypass-cidrs").value.trim()}),p.success("Bypass rules saved")}catch(l){p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}}),e.querySelector("#sec-tp-import")?.addEventListener("change",async o=>{let i=o.target.files[0];if(!i)return;let l=new FormData;l.append("file",i);try{let r=await fetch("/api/settings/trusted-proxies/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await Y(e),p.success("Trusted proxies imported")}catch(r){p.error(r.message)}finally{o.target.value=""}}),e.querySelector("#sec-ip-import")?.addEventListener("change",async o=>{let i=o.target.files[0];if(!i)return;let l=new FormData;l.append("file",i);try{let r=await fetch("/api"+s+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await Y(e),p.success("IP rules imported")}catch(r){p.error(r.message)}finally{o.target.value=""}}),e.querySelector("#sec-ua-import")?.addEventListener("change",async o=>{let i=o.target.files[0];if(!i)return;let l=new FormData;l.append("file",i);try{let r=await fetch("/api"+a+"/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:l}),d=r.status===204?null:await r.json().catch(()=>null);if(!r.ok)throw new Error(d?.error||`HTTP ${r.status}`);await Y(e),p.success("UA rules imported")}catch(r){p.error(r.message)}finally{o.target.value=""}})}function Rn(e){document.getElementById("kp-asn-lookup-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-asn-lookup-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">ASN Lookup</h3>
                <div class="uk-flex uk-margin-top" style="gap:8px">
                    <input class="uk-input kp-input" id="asn-lookup-q" type="text" placeholder="IP address or domain">
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="asn-lookup-go" uk-tooltip="Look it up">
                        <span uk-icon="search"></span>
                    </button>
                </div>
                <div id="asn-lookup-result" class="uk-margin-top"></div>
            </div>
        </div>`);let s=UIkit.modal("#kp-asn-lookup-modal");s.show();let a=async()=>{let n=document.getElementById("asn-lookup-q").value.trim();if(!n)return;let o=document.getElementById("asn-lookup-result");o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let i=await b.get(`/security/asn/lookup?q=${encodeURIComponent(n)}`);if(!i?.asn){o.innerHTML='<p class="kp-muted uk-text-small">No ASN found for <span class="kp-mono"></span>.</p>',o.querySelector(".kp-mono").textContent=i?.ip||n;return}o.innerHTML=`
                <p class="uk-text-small">
                    <span class="kp-mono" id="asn-lookup-ip"></span> \u2192
                    <span class="kp-mono">AS${i.asn}</span>
                    <span id="asn-lookup-org"></span>
                    ${i.country?`<span class="kp-muted">(${i.country})</span>`:""}
                </p>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="asn-lookup-add">
                    <span uk-icon="ban"></span> Add AS${i.asn} to blacklist
                </button>`,o.querySelector("#asn-lookup-ip").textContent=i.ip,o.querySelector("#asn-lookup-org").textContent=i.org||"",o.querySelector("#asn-lookup-add").addEventListener("click",()=>{let l=e.querySelector("#sec-asn-blacklist"),r=`AS${i.asn}`;l.value.split(`
`).some(d=>d.trim().toUpperCase()===r)||(l.value=l.value.trim()?`${l.value.replace(/\s+$/,"")}
${r}`:r),s.hide(),p.success(`${r} added to blacklist \u2014 save to apply`)})}catch(i){o.innerHTML="",p.error(i.message)}};document.getElementById("asn-lookup-go").addEventListener("click",a),document.getElementById("asn-lookup-q").addEventListener("keydown",n=>{n.key==="Enter"&&a()})}async function bs(e,t={}){if(!M()){e.innerHTML=_("Access denied");return}e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global Security</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global rules apply to all sites before per-site rules are evaluated.
            Blacklist always wins \u2014 except for IP rules, where a whitelist match
            in either scope allows the request outright.
        </p>
        ${ve(null)}`,We(e),Fe(e,t.tab),Y(e)}function Dn(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function hs(e){let t=document.getElementById("admin-domain-ssl");if(!(!t||!e))try{let s=await b.get(`/ssl-status?domain=${encodeURIComponent(e)}`);t.outerHTML=Dn(s.status)}catch{}}var fs=["general","backups","notifications","malware"];function je(e){return`
        <div class="uk-flex" style="gap:8px">
            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/export?group=${e}" download="podnest-settings-${e}.csv" uk-tooltip="Export these settings">
                <span uk-icon="download"></span>
            </a>
            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import these settings from CSV">
                <span uk-icon="upload"></span>
                <input type="file" class="kp-settings-import" data-group="${e}" accept=".csv" style="display:none">
            </label>
        </div>`}async function bt(e,t={}){if(!M()){e.innerHTML=_("Access denied");return}let[s,a,n,o,i]=await Promise.all([b.get("/settings"),b.get("/settings/backup"),b.get("/settings/notifications"),b.get("/settings/resources"),b.get("/settings/malware")]);e.innerHTML=`
    <div class="kp-view-header">
        <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Settings</h1>
    </div>

    <!-- tab pills -->
    <ul class="kp-tab-pills" id="kp-settings-pills">
        <li data-pill="0"><a href="#"><span uk-icon="icon: cog; ratio: 0.85"></span> General</a></li>
        <li data-pill="1"><a href="#"><span uk-icon="icon: cloud-upload; ratio: 0.85"></span> Backups</a></li>
        <li data-pill="2"><a href="#"><span uk-icon="icon: bell; ratio: 0.85"></span> Notifications</a></li>
        <li data-pill="3"><a href="#"><span uk-icon="icon: bolt; ratio: 0.85"></span> Malware</a></li>
    </ul>

    <!-- switcher panels -->
    <ul class="uk-switcher uk-margin-large-bottom" id="kp-settings-switcher">

        <!-- general: panel configuration + host resource watcher -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${je("general")}
                </div>
                <form id="settings-form" class="uk-form-stacked">
                    <div class="uk-margin">
                        <label class="kp-label" for="admin-domain">Management UI Domain</label>
                        <div class="uk-flex kp-settings-domain-wrap">
                            <span id="admin-domain-ssl" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
                            <input
                                class="uk-input kp-input"
                                id="admin-domain"
                                name="admin_domain"
                                type="text"
                                placeholder="panel.example.com"
                                value="${s.admin_domain??""}">
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            When set, the proxy will route this domain to the management UI and issue
                            a Let's Encrypt certificate automatically. Leave blank to disable.
                        </p>
                    </div>

                    <h3 class="kp-view-title uk-margin-bottom uk-margin-top">Host Resource Watcher</h3>
                    <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                        <div>
                            <label class="kp-label" for="resource-ram-reserve">RAM Reserve (GB)</label>
                            <input class="uk-input kp-input" id="resource-ram-reserve" name="resource_ram_reserve_gb" type="number"
                                min="0.5" max="64" step="0.5" placeholder="2"
                                value="${o.resource_ram_reserve_gb??"2"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Amount of RAM to keep free for the host OS. Throttling fires when aggregate pod usage exceeds total RAM minus this value.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="resource-poll-interval">Poll Interval (seconds)</label>
                            <input class="uk-input kp-input" id="resource-poll-interval" name="resource_poll_interval" type="number"
                                min="5" max="300" step="5" placeholder="30"
                                value="${o.resource_poll_interval??"30"}">
                        </div>
                        <div>
                            <label class="kp-label" for="resource-throttle-pct">Throttle Aggressiveness (%)</label>
                            <input class="uk-input kp-input" id="resource-throttle-pct" name="resource_throttle_pct" type="number"
                                min="10" max="90" step="5" placeholder="50"
                                value="${o.resource_throttle_pct??"50"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Percentage to reduce the offending pod's current memory usage by when throttling.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="shutdown-job-timeout">Shutdown Job Drain (minutes)</label>
                            <input class="uk-input kp-input" id="shutdown-job-timeout" name="shutdown_job_timeout" type="number"
                                min="1" max="60" step="1" placeholder="5"
                                value="${o.shutdown_job_timeout??"5"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                How long to wait for in-flight backups, restores, and imports to finish before the process exits on stop or restart.
                            </p>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label" for="resource-webhook-url">Webhook URL <span class="kp-muted">(optional)</span></label>
                            <input class="uk-input kp-input kp-mono" id="resource-webhook-url" name="resource_webhook_url" type="url"
                                placeholder="https://hooks.example.com/notify"
                                value="${o.resource_webhook_url??""}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                HTTP POST with JSON payload on threshold breach and resolution. Compatible with Uptime Kuma, PagerDuty, Slack, etc.
                            </p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- backups: schedule/retention + S3 storage -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${je("backups")}
                </div>
                <form id="backup-form" class="uk-form-stacked">
                    <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">Schedule</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="backup-schedule">Cron Schedule</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="backup-schedule"
                                    name="backup_schedule"
                                    type="text"
                                    placeholder="0 2 * * *"
                                    value="${a.backup_schedule??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Standard 5-field cron expression. Leave blank to disable automatic backups.<br>
                                    Examples: <span class="kp-mono">0 2 * * *</span> (daily at 2am) &nbsp;
                                    <span class="kp-mono">0 */6 * * *</span> (every 6 hours)
                                </p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="backup-retain-days">Retain Backups (days)</label>
                                <input
                                    class="uk-input kp-input"
                                    id="backup-retain-days"
                                    name="backup_retain_days"
                                    type="number"
                                    min="1"
                                    max="365"
                                    placeholder="30"
                                    value="${a.backup_retain_days??"30"}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Snapshots older than this many days will be pruned automatically after each backup run.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">S3 Storage</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-endpoint">Endpoint URL</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-endpoint"
                                    name="s3_endpoint"
                                    type="url"
                                    placeholder="https://s3.amazonaws.com"
                                    value="${a.s3_endpoint??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    AWS S3 or any S3-compatible endpoint (Backblaze B2, MinIO, Wasabi, etc.)
                                </p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-bucket">Bucket</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-bucket"
                                    name="s3_bucket"
                                    type="text"
                                    placeholder="my-podnest-backups"
                                    value="${a.s3_bucket??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-region">Region</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-region"
                                    name="s3_region"
                                    type="text"
                                    placeholder="us-east-1"
                                    value="${a.s3_region??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-access-key">Access Key ID</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-access-key"
                                    name="s3_access_key"
                                    type="text"
                                    placeholder="AKIAIOSFODNN7EXAMPLE"
                                    value="${a.s3_access_key??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="s3-secret-key">Secret Access Key</label>
                                <input
                                    class="uk-input kp-input kp-mono"
                                    id="s3-secret-key"
                                    name="s3_secret_key"
                                    type="password"
                                    placeholder="${a.s3_secret_key?"saved \u2014 enter new value to change":"enter secret key"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Leave blank to keep the existing key.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- notifications: smtp + aws sns -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-flex-middle uk-margin-bottom">
                    ${je("notifications")}
                </div>
                <form id="notifications-form" class="uk-form-stacked">
                    <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">Email (SMTP)</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-host">SMTP Host</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-host" name="smtp_host" type="text"
                                    placeholder="smtp.example.com" value="${n.smtp_host??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-port">Port</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-port" name="smtp_port" type="text"
                                    placeholder="587" value="${n.smtp_port??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-username">Username</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-username" name="smtp_username" type="text"
                                    placeholder="user@example.com" value="${n.smtp_username??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-password">Password</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-password" name="smtp_password" type="password"
                                    placeholder="${n.smtp_password?"saved \u2014 enter new value to change":"enter password"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">Leave blank to keep the existing password.</p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="smtp-from">From Address</label>
                                <input class="uk-input kp-input kp-mono" id="smtp-from" name="smtp_from" type="email"
                                    placeholder="podnest@example.com" value="${n.smtp_from??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label">
                                    <input class="uk-checkbox" type="checkbox" id="smtp-tls" name="smtp_tls"
                                        ${n.smtp_tls==="true"||n.smtp_tls==="1"?"checked":""}>
                                    &nbsp;Use implicit TLS (port 465)
                                </label>
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Unchecked uses STARTTLS (port 587). Check only for port 465 / SSL-only servers.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 class="kp-view-title uk-margin-bottom">SMS (AWS SNS)</h4>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-access-key">Access Key ID</label>
                                <input class="uk-input kp-input kp-mono" id="aws-access-key" name="aws_access_key" type="text"
                                    placeholder="AKIAIOSFODNN7EXAMPLE" value="${n.aws_access_key??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-secret-key">Secret Access Key</label>
                                <input class="uk-input kp-input kp-mono" id="aws-secret-key" name="aws_secret_key" type="password"
                                    placeholder="${n.aws_secret_key?"saved \u2014 enter new value to change":"enter secret key"}"
                                    value="">
                                <p class="kp-muted uk-text-small uk-margin-small-top">Leave blank to keep the existing key.</p>
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-region">AWS Region</label>
                                <input class="uk-input kp-input kp-mono" id="aws-region" name="aws_region" type="text"
                                    placeholder="us-east-1" value="${n.aws_region??""}">
                            </div>
                            <div class="uk-margin">
                                <label class="kp-label" for="aws-sns-sender-id">Sender ID <span class="kp-muted">(optional)</span></label>
                                <input class="uk-input kp-input kp-mono" id="aws-sns-sender-id" name="aws_sns_sender_id" type="text"
                                    placeholder="PodNest" value="${n.aws_sns_sender_id??""}">
                                <p class="kp-muted uk-text-small uk-margin-small-top">
                                    Alphanumeric sender name shown on the recipient's phone. Supported in select AWS regions only.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>

        <!-- malware: scan history retention + scanner resource caps -->
        <li>
            <div class="kp-card uk-padding">
                <div class="uk-flex uk-flex-right uk-margin-bottom">
                    ${je("malware")}
                </div>
                <form id="malware-form" class="uk-form-stacked">
                    <p class="kp-muted uk-text-small uk-margin-bottom">
                        Every site's html directory is scanned nightly at midnight with ClamAV and Linux Malware Detect.
                        Scans run one site at a time in a throwaway container.
                    </p>
                    <div class="uk-grid-small uk-child-width-1-3@m" uk-grid>
                        <div>
                            <label class="kp-label" for="malware-retain-days">Retain History (days)</label>
                            <input class="uk-input kp-input" id="malware-retain-days" name="malware_retain_days" type="number"
                                min="1" max="3650" step="1" placeholder="30"
                                value="${i.malware_retain_days||"30"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Scan results older than this are pruned after each nightly run.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="malware-memory-mb">Scanner Memory (MB)</label>
                            <input class="uk-input kp-input" id="malware-memory-mb" name="malware_memory_mb" type="number"
                                min="512" max="65536" step="1" placeholder="2048"
                                value="${i.malware_memory_mb||"2048"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                ClamAV's signature set alone needs over 1 GB; too low and scans fail out of memory.
                            </p>
                        </div>
                        <div>
                            <label class="kp-label" for="malware-cpus">Scanner CPUs</label>
                            <input class="uk-input kp-input" id="malware-cpus" name="malware_cpus" type="number"
                                min="0.1" max="64" step="0.1" placeholder="1"
                                value="${i.malware_cpus||"1"}">
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                CPU cores the scanner may use. Fractions are allowed (e.g. 0.5).
                            </p>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button type="submit" class="uk-button kp-btn-primary">
                            <span uk-icon="check"></span> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </li>
    </ul>
    `;let l=e.querySelector("#kp-settings-pills"),r=e.querySelector("#kp-settings-switcher"),d=u=>{UIkit.switcher(r).show(u),l.querySelectorAll(":scope > li").forEach((c,m)=>c.classList.toggle("kp-pill-active",m===u)),history.replaceState(null,"",u===0?"#settings":`#settings/${fs[u]}`)};l.querySelectorAll(":scope > li > a").forEach(u=>{u.addEventListener("click",c=>{c.preventDefault(),d(parseInt(u.closest("li").dataset.pill,10))})}),d(Math.max(0,fs.indexOf(t.tab))),s.admin_domain&&hs(s.admin_domain),e.querySelectorAll(".kp-settings-import").forEach(u=>{u.addEventListener("change",async c=>{let m=c.target.files[0];if(!m)return;let k=c.target.dataset.group,h=new FormData;h.append("file",m);try{let g=await fetch(`/api/settings/import?group=${encodeURIComponent(k)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:h}),f=g.status===204?null:await g.json().catch(()=>null);if(!g.ok)throw new Error(f?.error||`HTTP ${g.status}`);p.success("Settings imported"),await bt(e,{tab:k})}catch(g){p.error(g.message)}finally{c.target.value=""}})}),document.getElementById("settings-form").addEventListener("submit",async u=>{u.preventDefault();let c=u.target.querySelector('[type="submit"]'),m=c.innerHTML;c.disabled=!0,c.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let k=new FormData(u.target),h={admin_domain:k.get("admin_domain").trim()},g={resource_ram_reserve_gb:k.get("resource_ram_reserve_gb").trim(),resource_poll_interval:k.get("resource_poll_interval").trim(),resource_throttle_pct:k.get("resource_throttle_pct").trim(),resource_webhook_url:k.get("resource_webhook_url").trim(),shutdown_job_timeout:k.get("shutdown_job_timeout").trim()};try{await b.put("/settings",h),await b.put("/settings/resources",g),p.success("Settings saved"),hs(h.admin_domain)}catch(f){p.error(f.message)}finally{c.disabled=!1,c.innerHTML=m}}),document.getElementById("backup-form").addEventListener("submit",async u=>{u.preventDefault();let c=u.target.querySelector('[type="submit"]'),m=c.innerHTML;c.disabled=!0,c.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let k=new FormData(u.target),h={backup_schedule:k.get("backup_schedule").trim(),backup_retain_days:k.get("backup_retain_days").trim(),s3_endpoint:k.get("s3_endpoint").trim(),s3_bucket:k.get("s3_bucket").trim(),s3_region:k.get("s3_region").trim(),s3_access_key:k.get("s3_access_key").trim()},g=k.get("s3_secret_key").trim();g&&(h.s3_secret_key=g);try{await b.put("/settings/backup",h),p.success("Backup settings saved")}catch(f){p.error(f.message)}finally{c.disabled=!1,c.innerHTML=m}}),document.getElementById("notifications-form").addEventListener("submit",async u=>{u.preventDefault();let c=u.target.querySelector('[type="submit"]'),m=c.innerHTML;c.disabled=!0,c.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let k=new FormData(u.target),h={smtp_host:k.get("smtp_host").trim(),smtp_port:k.get("smtp_port").trim(),smtp_username:k.get("smtp_username").trim(),smtp_from:k.get("smtp_from").trim(),smtp_tls:k.get("smtp_tls")?"true":"false",aws_access_key:k.get("aws_access_key").trim(),aws_region:k.get("aws_region").trim(),aws_sns_sender_id:k.get("aws_sns_sender_id").trim()},g=k.get("smtp_password").trim();g&&(h.smtp_password=g);let f=k.get("aws_secret_key").trim();f&&(h.aws_secret_key=f);try{await b.put("/settings/notifications",h),p.success("Notification settings saved")}catch(w){p.error(w.message)}finally{c.disabled=!1,c.innerHTML=m}}),document.getElementById("malware-form").addEventListener("submit",async u=>{u.preventDefault();let c=u.target.querySelector('[type="submit"]'),m=c.innerHTML;c.disabled=!0,c.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let k=new FormData(u.target),h={malware_retain_days:k.get("malware_retain_days").trim(),malware_memory_mb:k.get("malware_memory_mb").trim(),malware_cpus:k.get("malware_cpus").trim()};try{await b.put("/settings/malware",h),p.success("Malware settings saved")}catch(g){p.error(g.message)}finally{c.disabled=!1,c.innerHTML=m}})}async function gs(e){let t=`
        <div id="kp-edit-site-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit Site \u2014 ${e.Name}</h3>
                <form id="edit-site-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Name</label>
                            <input class="uk-input kp-input" name="name" type="text" value="${e.Name}" readonly disabled>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Site Type</label>
                            <select class="uk-select kp-select" name="site_type" id="es-site-type">
                                <option value="1" ${e.SiteType===1?"selected":""}>PHP</option>
                                <option value="3" ${e.SiteType===3?"selected":""}>Static HTML</option>
                                <option value="4" ${e.SiteType===4?"selected":""}>Node.js</option>
                                <option value="5" ${e.SiteType===5?"selected":""}>.NET</option>
                                <option value="7" ${e.SiteType===7?"selected":""}>Python</option>
                                <option value="6" ${e.SiteType===6?"selected":""}>Reverse Proxy</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s" id="es-php-version-wrap">
                            <label class="kp-label">PHP Version</label>
                            <select class="uk-select kp-select" name="php_version">
                                <option value="3" ${e.PHPVersion===3?"selected":""}>PHP 8.2</option>
                                <option value="4" ${e.PHPVersion===4?"selected":""}>PHP 8.3</option>
                                <option value="5" ${e.PHPVersion===5?"selected":""}>PHP 8.4</option>
                                <option value="6" ${e.PHPVersion===6?"selected":""}>PHP 8.5</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-node-version-wrap">
                            <label class="kp-label">Node.js Version</label>
                            <select class="uk-select kp-select" name="node_version">
                                <option value="2" ${e.RuntimeVersion===2?"selected":""}>Node 22 (LTS)</option>
                                <option value="4" ${e.RuntimeVersion===4?"selected":""}>Node 24</option>
                                <option value="5" ${e.RuntimeVersion===5?"selected":""}>Node 25</option>
                                <option value="6" ${e.RuntimeVersion===6?"selected":""}>Node 26</option>                                
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-dotnet-version-wrap">
                            <label class="kp-label">.NET Version</label>
                            <select class="uk-select kp-select" name="dotnet_version">
                                <option value="1" ${e.RuntimeVersion===1?"selected":""}>.NET 8.0 (LTS)</option>
                                <option value="2" ${e.RuntimeVersion===2?"selected":""}>.NET 9.0</option>
                                <option value="3" ${e.RuntimeVersion===3?"selected":""}>.NET 10.0 (LTS)</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s uk-hidden" id="es-python-version-wrap">
                            <label class="kp-label">Python Version</label>
                            <select class="uk-select kp-select" name="python_version">
                                <option value="1" ${e.SiteType===7&&e.RuntimeVersion===1?"selected":""}>Python 3.11</option>
                                <option value="2" ${e.SiteType===7&&e.RuntimeVersion===2?"selected":""}>Python 3.12</option>
                                <option value="3" ${e.SiteType===7&&e.RuntimeVersion===3?"selected":""}>Python 3.13</option>
                                <option value="4" ${e.SiteType!==7||e.RuntimeVersion===4?"selected":""}>Python 3.14</option>
                            </select>
                        </div>
                        <div class="uk-width-1-1 uk-hidden" id="es-start-command-wrap">
                            <label class="kp-label">Start Command</label>
                            <input class="uk-input kp-input" name="start_command" type="text" value="${e.StartCommand||""}">
                        </div>
                        <div class="uk-width-1-1 ${e.SiteType!==1?"uk-hidden":""}" id="es-wordpress-wrap">
                            <label><input class="uk-checkbox" type="checkbox" name="install_wordpress" checked> WordPress</label>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",t);let s=UIkit.modal("#kp-edit-site-modal"),a=document.getElementById("es-site-type"),n=document.getElementById("es-php-version-wrap"),o=document.getElementById("es-node-version-wrap"),i=document.getElementById("es-dotnet-version-wrap"),l=document.getElementById("es-python-version-wrap"),r=document.getElementById("es-start-command-wrap"),d=document.getElementById("es-wordpress-wrap");s.show();let u=c=>{n.classList.toggle("uk-hidden",c!==1&&c!==2||c===6),o.classList.toggle("uk-hidden",c!==4),i.classList.toggle("uk-hidden",c!==5),l.classList.toggle("uk-hidden",c!==7),r.classList.toggle("uk-hidden",c!==4&&c!==5&&c!==7),r.querySelector("input").required=c===7,d.classList.toggle("uk-hidden",c!==1)};u(e.SiteType),a.addEventListener("change",()=>u(parseInt(a.value))),document.getElementById("edit-site-form").addEventListener("submit",async c=>{c.preventDefault();let m=c.target.querySelector('[type="submit"]'),k=m.innerHTML;m.disabled=!0,m.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let h=new FormData(c.target),g=parseInt(h.get("site_type")),f=null;g===4&&(f=parseInt(h.get("node_version"))),g===5&&(f=parseInt(h.get("dotnet_version"))),g===7&&(f=parseInt(h.get("python_version")));let w={php_version:parseInt(h.get("php_version"))||3,site_type:g,runtime_version:f,start_command:h.get("start_command")?.trim()||""},T=g===1?h.get("install_wordpress")==="on":!1;try{if(await b.put(`/sites/${e.ID}`,w),s.hide(),document.getElementById("kp-edit-site-modal")?.remove(),g!==6){S("Applying Changes","Saving changes and recreating pod...");try{await b.post(`/sites/${e.ID}/recreate`,{install_wordpress:T,prune:!0}),x(),p.success("Site updated and pod recreated")}catch(A){x(),p.error("Site saved but pod recreate failed: "+A.message)}}else p.success("Site updated");y.go("site-detail",{id:String(e.ID)})}catch(A){p.error(A.message),m.disabled=!1,m.innerHTML=k}}),document.getElementById("kp-edit-site-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-site-modal")?.remove())}function ys(e){return`
        <div id="backups-panel" data-site-id="${e}">

            <!-- repo config card -->
            <div class="kp-card uk-padding-small uk-margin-bottom">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Backup Destinations</h3>
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="backup-repo-save" uk-tooltip="Save Your Backup Configuration">
                        <span uk-icon="check"></span>
                    </button>
                </div>
                <div class="uk-flex" style="gap:24px;flex-wrap:wrap" id="backup-repo-toggles">
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="backup-local-enabled">
                        <span class="kp-text">Local</span>
                    </label>
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="backup-s3-enabled">
                        <span class="kp-text">S3</span>
                    </label>
                </div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Local backups are stored under the site's SFTP home directory and are accessible
                    over SFTP as <span class="kp-mono">backups/local/</span>. S3 requires global S3
                    credentials to be configured under Settings.
                </p>
            </div>

            <!-- backup list card -->
            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Snapshots</h3>
                    <div class="uk-flex" style="gap:6px">
                        <button class="uk-button kp-btn-primary kp-btn-sm" id="backup-run-btn" uk-tooltip="Run a Manual Backup">
                            <span uk-icon="cloud-upload"></span>
                        </button>
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="backup-import-btn"
                            uk-toggle="target: #import-backup-modal" uk-tooltip="Import a backup archive">
                            <span uk-icon="upload"></span>
                        </button>
                    </div>
                </div>
                <div id="backup-error-banner"></div>
                <div id="backup-list-wrap">
                    <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>

            <!-- import modal -->
            <div id="import-backup-modal" uk-modal>
                <div class="uk-modal-dialog uk-modal-body">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title uk-margin-small-bottom">Import Backup Archive</h3>

                    <!-- target site selector -->
                    <div class="uk-margin-small">
                        <label class="uk-form-label kp-text">Restore To</label>
                        <select class="uk-select kp-input" id="import-target-site"></select>
                    </div>

                    <hr class="uk-divider-small">

                    <!-- upload section -->
                    <h4 class="kp-text uk-margin-small-bottom">Upload Archive</h4>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Maximum upload size is <strong>512 MB</strong>. For larger archives, transfer
                        the file to <span class="kp-mono">backups/import/</span> via SFTP and use
                        the <em>Import from SFTP</em> section below.
                    </p>
                    <div class="uk-margin-small">
                        <input type="file" class="uk-input kp-input" id="import-file-input"
                            accept=".tar.gz,.tar.xz,.zip">
                    </div>
                    <button class="uk-button kp-btn-primary kp-btn-sm uk-margin-small-top" id="import-upload-btn">
                        Upload &amp; Restore
                    </button>

                    <hr class="uk-divider-small uk-margin-small">

                    <!-- SFTP section -->
                    <h4 class="kp-text uk-margin-small-bottom">Import from SFTP</h4>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Files found in <span class="kp-mono">backups/import/</span> on this site's SFTP.
                    </p>
                    <div id="import-sftp-list">
                        <div uk-spinner="ratio: 0.6" style="color:var(--kp-blue)"></div>
                    </div>
                </div>
            </div>

        </div>`}function Hn(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No snapshots yet.</p>';let t=a=>a===2?'<span class="kp-mono" style="color:var(--kp-cyan)">S3</span>':'<span class="kp-mono" style="color:var(--kp-blue)">Local</span>';return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
            <thead>
                <tr>
                    <th>Snapshot ID</th>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(a=>`
        <tr>
            <td class="kp-mono" style="font-size:0.8rem">${v(a.SnapshotID)}</td>
            <td>${a.Label?v(a.Label):"\u2014"}</td>
            <td>${t(a.BackupType)}</td>
            <td>${P(a.SizeBytes)}</td>
            <td>${new Date(a.Created).toLocaleString()}</td>
            <td>
                <div class="uk-flex" style="gap:6px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm backup-download-btn"
                        data-id="${a.ID}" uk-tooltip="Download backup archive">
                        <span uk-icon="download"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm backup-restore-btn"
                        data-id="${a.ID}" uk-tooltip="Restore from this snapshot">
                        <span uk-icon="history"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm backup-delete-btn"
                        data-id="${a.ID}" uk-tooltip="Delete this snapshot">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}function vs(e,t,s){let a=Date.now()+18e5,n=setInterval(async()=>{try{let o=await b.get(`/sites/${s||t}/backups/restore-status`);(!o?.active||Date.now()>a)&&(clearInterval(n),x(),o?.active?p.error("Import timed out \u2014 check server logs"):o?.error?p.error(`Import failed: ${o.error}`):p.success("Import complete"),await re(e,t))}catch{Date.now()>a&&(clearInterval(n),x(),p.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function re(e,t){try{let[s,a]=await Promise.all([b.get(`/sites/${t}/backup-repo`),b.get(`/sites/${t}/backups`)]),n=e.querySelector("#backup-local-enabled"),o=e.querySelector("#backup-s3-enabled");n&&(n.checked=!!s.LocalEnabled),o&&(o.checked=!!s.S3Enabled);let i=e.querySelector("#backup-error-banner");if(i)if(s.last_error){let r=s.last_error_at?` (${new Date(s.last_error_at).toLocaleString()})`:"";i.innerHTML=`
                    <div uk-alert class="uk-alert-warning">
                        <a class="uk-alert-close" uk-close></a>
                        <p><strong>Last scheduled backup failed${r}:</strong> ${v(s.last_error)}</p>
                    </div>`}else i.innerHTML="";let l=e.querySelector("#backup-list-wrap");l&&(l.innerHTML=Hn(a))}catch(s){let a=e.querySelector("#backup-list-wrap");a&&(a.innerHTML=`<p class="kp-muted uk-text-small">Failed to load backups: ${v(s.message)}</p>`)}}function ws(e,t){e.querySelector("#backup-repo-save")?.addEventListener("click",async()=>{let a={local_enabled:e.querySelector("#backup-local-enabled")?.checked??!1,s3_enabled:e.querySelector("#backup-s3-enabled")?.checked??!1};try{await b.put(`/sites/${t}/backup-repo`,a),p.success("Backup destinations saved")}catch(n){p.error(n.message)}}),e.querySelector("#backup-run-btn")?.addEventListener("click",async()=>{try{await b.post(`/sites/${t}/backups`,{label:"manual"})}catch(o){p.error(o.message);return}S("Backup Running","Snapshotting files and database \u2014 this may take a few minutes.");let a=Date.now()+1800*1e3,n=setInterval(async()=>{try{let o=await b.get(`/sites/${t}/backups/backup-status`);(!o?.active||Date.now()>a)&&(clearInterval(n),x(),await re(e,t),o?.active?p.error("Backup is taking longer than expected \u2014 check server logs for status"):o?.error?p.error(`Backup failed: ${o.error}`):p.success("Backup complete"))}catch{}},4e3)}),e.querySelector("#backup-list-wrap")?.addEventListener("click",async a=>{let n=a.target.closest(".backup-restore-btn");if(n){let l=n.dataset.id;if(!await E("Restore Site","This will restore the site from the selected snapshot. The site will show a maintenance page during the restore. Continue?"))return;try{await b.post(`/sites/${t}/backups/${l}/restore`)}catch(m){p.error(m.message);return}S("Restore Running","Restoring files and database \u2014 the site will return automatically when complete.");let d=Date.now(),u=Date.now()+900*1e3,c=setInterval(async()=>{try{let m=await b.get(`/sites/${t}/backups/restore-status`);(!m?.active||Date.now()>u)&&(clearInterval(c),x(),m?.active?p.error("Restore timed out"):p.success("Restore complete"),await re(e,t))}catch{}},3e3);return}let o=a.target.closest(".backup-delete-btn");if(o){let l=o.dataset.id;if(!await E("Delete Snapshot","This will permanently remove the snapshot from all configured repositories. This cannot be undone."))return;S("Deleting Snapshot","Removing snapshot data from repositories \u2014 this may take a moment.");try{await b.delete(`/sites/${t}/backups/${l}`),x(),p.success("Snapshot deleted"),await re(e,t)}catch(d){x(),p.error(d.message)}}let i=a.target.closest(".backup-download-btn");if(i){let l=i.dataset.id,r=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,d=`kp_dl_${r}`;S("Preparing Download","Your backup archive is being generated \u2014 this may take a moment depending on site size. Your download will begin automatically. Do not close this tab."),setTimeout(()=>{let u=document.createElement("a");u.href=`/api/sites/${t}/backups/${l}/download?dl=${r}`,u.style.display="none",document.body.appendChild(u),u.click(),document.body.removeChild(u);let c=Date.now(),m=setInterval(()=>{!document.cookie.split(";").some(h=>h.trim().startsWith(`${d}=`))&&Date.now()-c<18e5||(clearInterval(m),document.cookie=`${d}=; Path=/; Max-Age=0`,x())},500)},300);return}});let s=e.querySelector("#import-backup-modal");s&&(UIkit.util.on(s,"beforeshow",async()=>{let a=s.querySelector("#import-target-site");try{let o=await b.get("/sites"),i=Number(t);a.innerHTML=o.map(l=>`<option value="${l.ID}"${Number(l.ID)===i?" selected":""}>${l.Name}</option>`).join("")}catch{a.innerHTML='<option value="">Failed to load sites</option>'}let n=s.querySelector("#import-sftp-list");try{let o=await b.get(`/sites/${t}/backups/import/files`);!o||o.length===0?n.innerHTML='<p class="kp-muted uk-text-small">No files found.</p>':n.innerHTML=o.map(i=>`
                    <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                        <span class="kp-mono uk-text-small">${v(i)}</span>
                        <button class="uk-button kp-btn-primary kp-btn-sm import-sftp-btn" data-file="${v(i)}">
                            Restore
                        </button>
                    </div>`).join("")}catch(o){n.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${v(o.message)}</p>`}}),s.querySelector("#import-upload-btn")?.addEventListener("click",async()=>{let a=s.querySelector("#import-file-input"),n=s.querySelector("#import-target-site")?.value;if(!a?.files?.length){p.error("Select an archive file first");return}let o=a.files[0],i=new FormData;i.append("archive",o),i.append("target_site_id",n),UIkit.modal(s).hide(),S("Importing Backup","Uploading and restoring \u2014 this may take several minutes.");try{await fetch(`/api/sites/${t}/backups/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:i,credentials:"same-origin"}).then(async l=>{if(!l.ok){let r=await l.json().catch(()=>({}));throw new Error(r.error||`HTTP ${l.status}`)}})}catch(l){x(),p.error(l.message);return}vs(e,t,n)}),s.querySelector("#import-sftp-list")?.addEventListener("click",async a=>{let n=a.target.closest(".import-sftp-btn");if(!n)return;let o=n.dataset.file,i=s.querySelector("#import-target-site")?.value;UIkit.modal(s).hide(),S("Importing from SFTP","Restoring archive \u2014 this may take several minutes.");try{await b.post(`/sites/${t}/backups/import/sftp`,{filename:o,target_site_id:parseInt(i,10)})}catch(l){x(),p.error(l.message);return}vs(e,t,i)}))}function ht(){return`
        <div class="kp-card uk-padding uk-margin-top" id="basicauth-panel">
            <h3 class="kp-view-title uk-margin-bottom">Basic Auth</h3>
            <p class="kp-muted uk-text-small uk-margin-small-bottom">
                Enforced at the proxy level \u2014 no nginx involvement. All requests to this
                site will require valid credentials before any content is served.
            </p>

            <div class="uk-grid-small uk-margin-bottom" uk-grid>
                <div class="uk-width-1-2@s">
                    <label class="kp-label">
                        <input class="uk-checkbox" type="checkbox" id="ba-enabled">
                        &nbsp;Enable Basic Auth
                    </label>
                </div>
                <div class="uk-width-1-2@s">
                    <label class="kp-label" for="ba-realm">Realm</label>
                    <input class="uk-input kp-input" type="text" id="ba-realm" placeholder="Restricted">
                </div>
            </div>

            <div class="uk-flex uk-flex-right uk-margin-bottom">
                <button class="uk-button kp-btn-primary kp-btn-sm" id="ba-config-save">
                    <span uk-icon="check"></span> Save Settings
                </button>
            </div>

            <hr class="kp-divider">

            <h4 class="kp-label uk-margin-small-bottom">Credentials</h4>
            <div id="ba-users-list" class="uk-margin-small-bottom"></div>

            <div class="uk-grid-small uk-margin-small-top" uk-grid>
                <div class="uk-width-1-3@s">
                    <input class="uk-input kp-input" type="text" id="ba-new-username" placeholder="Username">
                </div>
                <div class="uk-width-1-3@s">
                    <input class="uk-input kp-input" type="password" id="ba-new-password" placeholder="Password">
                </div>
                <div class="uk-width-1-3@s">
                    <button class="uk-button kp-btn-ghost" id="ba-add-user">
                        <span uk-icon="plus"></span> Add / Update
                    </button>
                </div>
            </div>
        </div>`}async function ye(e){let t=document.getElementById("basicauth-panel");if(t)try{let[s,a]=await Promise.all([b.get(`/sites/${e}/basicauth`),b.get(`/sites/${e}/basicauth/users`)]),n=t.querySelector("#ba-enabled"),o=t.querySelector("#ba-realm");n&&(n.checked=!!s.Enabled),o&&(o.value=s.Realm??"Restricted"),Nn(t,a??[])}catch(s){p.error("Failed to load basic auth settings: "+s.message)}}function Nn(e,t){let s=e.querySelector("#ba-users-list");if(s){if(!t.length){s.innerHTML='<p class="kp-muted uk-text-small">No credentials configured.</p>';return}s.innerHTML=t.map(a=>`
        <div class="uk-flex uk-flex-middle uk-margin-small-bottom ba-user-row" data-uid="${a.id}" style="gap:8px">
            <span class="kp-mono" style="flex:1">${v(a.username)}</span>
            <a href="javascript:void(0);" class="kp-muted ba-delete-btn" uk-icon="trash" uk-tooltip="Remove credential"></a>
        </div>`).join("")}}function ft(e,t){let s=new AbortController,a={signal:s.signal};e.addEventListener("click",async n=>{if(!n.target.closest("#ba-config-save"))return;let o=e.querySelector("#ba-config-save"),i=o.innerHTML;o.disabled=!0,o.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put(`/sites/${t}/basicauth`,{enabled:e.querySelector("#ba-enabled").checked,realm:e.querySelector("#ba-realm").value.trim()||"Restricted"}),p.success("Basic auth settings saved")}catch(l){p.error(l.message)}finally{o.disabled=!1,o.innerHTML=i}},a),e.addEventListener("click",async n=>{if(!n.target.closest("#ba-add-user"))return;let o=e.querySelector("#ba-new-username").value.trim(),i=e.querySelector("#ba-new-password").value;if(!o||!i){p.error("Username and password are required");return}let l=e.querySelector("#ba-add-user"),r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put(`/sites/${t}/basicauth/users`,{username:o,password:i}),p.success(`Credential saved for ${o}`),e.querySelector("#ba-new-username").value="",e.querySelector("#ba-new-password").value="",await ye(t)}catch(d){p.error(d.message)}finally{l.disabled=!1,l.innerHTML=r}},a),e.addEventListener("click",async n=>{let o=n.target.closest(".ba-delete-btn");if(!o)return;let i=o.closest(".ba-user-row")?.dataset.uid;if(i)try{await b.delete(`/sites/${t}/basicauth/users/${i}`),p.success("Credential removed"),await ye(t)}catch(l){p.error(l.message)}},a),e.__basicAuthAbort?.abort(),e.__basicAuthAbort=s}var we={1:"Nginx",2:"PHP",3:"MariaDB",4:"Redis",5:"Varnish"};function Se(e,t,s){let a=s?Object.entries(s):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">${we[t]}</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="${t}" uk-tooltip="Add a Key">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="${t}" data-site="${e}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="${t}" data-site="${e}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${e}/configs/${t}/export" download="${e}-config-${t}.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="${t}" data-site="${e}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="${t}" data-site="${e}">
                    </label>
                </div>
            </div>
            <div class="kp-config-grid cfg-rows" data-type="${t}">
                ${a.map(([n,o])=>xe(n,o)).join("")}
            </div>
        </div>`}function xs(e,t){let s=t?.enabled==="true",a=t?Object.entries(t).filter(([n])=>n!=="enabled"):[];return`
        <div>
            <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom" uk-tooltip="Add a Key">
                <div class="uk-flex uk-flex-middle" style="gap:10px">
                    <h4 class="kp-view-title uk-margin-remove">Varnish</h4>
                </div>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-add-row" data-type="5">
                        <span uk-icon="plus"></span>
                    </button>
                    <button class="uk-button kp-btn-secondary kp-btn-sm cfg-save" data-type="5" data-site="${e}" uk-tooltip="Save the Configuration">
                        <span uk-icon="check"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cfg-reset" data-type="5" data-site="${e}" uk-tooltip="Reset to Defaults">
                        <span uk-icon="refresh"></span>
                    </button>
                    <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/sites/${e}/configs/5/export" download="${e}-config-5.csv" uk-tooltip="Export config as CSV">
                        <span uk-icon="download"></span>
                    </a>
                    <label class="uk-button kp-btn-ghost kp-btn-sm cfg-import-label" data-type="5" data-site="${e}" uk-tooltip="Import config from CSV" style="cursor:pointer">
                        <span uk-icon="upload"></span>
                        <input type="file" class="cfg-import-input" accept=".csv" style="display:none" data-type="5" data-site="${e}">
                    </label>
                </div>
            </div>

            <!-- enable/disable toggle \u2014 requires pod recreate to take effect -->
            <div class="uk-margin-small-bottom" style="background:var(--kp-surface-2);padding:10px 12px;border-radius:6px">
                <label class="uk-flex uk-flex-middle" style="gap:10px;cursor:pointer">
                    <input type="checkbox" class="uk-checkbox varnish-enabled-toggle" ${s?"checked":""}>
                    <span>Enable Varnish Cache</span>
                    <span class="kp-muted uk-text-small">\u2014 requires pod recreate to take effect</span>
                </label>
            </div>

            <div class="kp-config-grid cfg-rows" data-type="5">
                ${a.map(([n,o])=>xe(n,o)).join("")}
            </div>
        </div>`}function xe(e="",t=""){return`<div class="kp-config-row">
        <div class="kp-config-key">
            <input class="cfg-key" type="text" value="${e}" placeholder="key">
        </div>
        <div class="kp-config-val">
            <input class="cfg-val" type="text" value="${t}" placeholder="value">
        </div>
        <button class="kp-config-del cfg-del-row" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function Ss(e,t,s){e.addEventListener("click",a=>{if(a.target.closest(".cfg-add-row")){let n=a.target.closest(".cfg-add-row");e.querySelector(`.cfg-rows[data-type="${n.dataset.type}"]`).insertAdjacentHTML("beforeend",xe())}},{signal:s}),e.addEventListener("click",a=>{a.target.closest(".cfg-del-row")&&a.target.closest(".kp-config-row").remove()},{signal:s}),e.addEventListener("click",async a=>{let n=a.target.closest(".cfg-save");if(!n)return;let{type:o,site:i}=n.dataset,l=e.querySelectorAll(`.cfg-rows[data-type="${o}"] .kp-config-row`),r={};if(l.forEach(d=>{let u=d.querySelector(".cfg-key").value.trim(),c=d.querySelector(".cfg-val").value.trim();u&&(r[u]=c)}),o==="5"){let d=e.querySelector(".varnish-enabled-toggle");r.enabled=d?.checked?"true":"false"}try{await b.put(`/sites/${i}/configs/${o}`,r),p.success(`${we[o]} config saved`)}catch(d){p.error(d.message)}},{signal:s}),e.addEventListener("click",async a=>{let n=a.target.closest(".cfg-reset");if(!n)return;let{type:o,site:i}=n.dataset;if(await E("Reset Config",`Reset ${we[o]} config to defaults?`))try{let r=await b.post(`/sites/${i}/configs/${o}/reset`),d=e.querySelector(`.cfg-rows[data-type="${o}"]`);d.innerHTML=Object.entries(r).map(([u,c])=>xe(u,c)).join(""),p.success(`${we[o]} reset to defaults`)}catch(r){p.error(r.message)}},{signal:s}),e.addEventListener("change",async a=>{let n=a.target.closest(".cfg-import-input");if(!n)return;let{type:o,site:i}=n.dataset,l=n.files[0];if(!l)return;let r=new FormData;r.append("file",l);try{let d=await fetch(`/api/sites/${i}/configs/${o}/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:r}),u=d.status===204?null:await d.json().catch(()=>null);if(!d.ok)throw new Error(u?.error||`HTTP ${d.status}`);let c=e.querySelector(`.cfg-rows[data-type="${o}"]`);c.innerHTML=Object.entries(u).map(([m,k])=>xe(m,k)).join(""),p.success(`${we[o]} config imported`)}catch(d){p.error(d.message)}finally{n.value=""}},{signal:s})}function Es(e){return`
        <div id="crons-panel" data-site-id="${e}">
            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Cron Jobs</h3>
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="cron-add-btn" uk-tooltip="Add Cron Job">
                        <span uk-icon="plus"></span>
                    </button>
                </div>
                <div id="cron-list-wrap">
                    <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                </div>
            </div>

            <!-- add / edit modal -->
            <div id="cron-modal" uk-modal>
                <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h3 class="kp-view-title" id="cron-modal-title">Add Cron Job</h3>
                    <div class="uk-form-stacked uk-margin-top">
                        <div class="uk-grid-small" uk-grid>
                            <input type="hidden" id="cron-modal-id">
                            <div class="uk-width-1-1">
                                <label class="kp-label">Label</label>
                                <input class="uk-input kp-input" type="text" id="cron-modal-label" placeholder="e.g. Daily cleanup">
                            </div>
                            <div class="uk-width-1-1">
                                <label class="kp-label">Command</label>
                                <textarea class="uk-textarea kp-textarea kp-mono" id="cron-modal-command" rows="3"
                                    placeholder="e.g. php /var/www/html/artisan schedule:run"></textarea>
                            </div>
                            <div class="uk-width-1-1">
                                <label class="kp-label">Schedule <span class="kp-muted uk-text-small">(5-field cron expression)</span></label>
                                <input class="uk-input kp-input kp-mono" type="text" id="cron-modal-schedule" placeholder="e.g. 0 3 * * *">
                                <p class="kp-muted uk-text-small uk-margin-small-top uk-margin-remove-bottom" id="cron-schedule-preview"></p>
                            </div>
                            <div class="uk-width-1-1">
                                <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                                    <input type="checkbox" class="uk-checkbox" id="cron-modal-enabled" checked>
                                    <span class="kp-text">Enabled</span>
                                </label>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                            <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                            <button class="uk-button kp-btn-primary" id="cron-modal-save">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>`}function Ls(e){if(!e||e.length===0)return'<p class="kp-muted uk-text-small uk-margin-remove">No cron jobs configured.</p>';let t=a=>a?new Date(a).toLocaleString():"\u2014";return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Schedule</th>
                    <th>Last Run</th>
                    <th>Status</th>
                    <th>Enabled</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(a=>`
        <tr>
            <td class="kp-text">${a.Label||'<span class="kp-muted">\u2014</span>'}</td>
            <td class="kp-mono kp-text-sm">${a.Schedule}</td>
            <td class="kp-muted uk-text-small">${t(a.LastRun)}</td>
            <td>
                ${a.LastError?'<span class="kp-badge kp-badge-error">Error</span>':a.LastRun?'<span class="kp-badge kp-badge-success">OK</span>':'<span class="kp-muted uk-text-small">\u2014</span>'}
                ${a.LastOutput||a.LastError?`<a class="kp-cron-detail-btn cron-detail-btn" data-id="${a.ID}" uk-tooltip="View Run Details">
                            <span uk-icon="icon: info; ratio: 0.75"></span>
                        </a>`:""}
            </td>
            <td>
                <input type="checkbox" class="uk-checkbox cron-toggle"
                    data-id="${a.ID}" ${a.Enabled?"checked":""}>
            </td>
            <td>
                <div class="uk-flex kp-cron-actions">
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-run-btn"
                        data-id="${a.ID}" uk-tooltip="Run Now">
                        <span uk-icon="play"></span>
                    </button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm cron-edit-btn"
                        data-id="${a.ID}" uk-tooltip="Edit">
                        <span uk-icon="pencil"></span>
                    </button>
                    <button class="uk-button kp-btn-danger kp-btn-sm cron-delete-btn"
                        data-id="${a.ID}" uk-tooltip="Delete">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`).join("")}</tbody>
        </table>
        </div>`}async function ze(e,t){let s=e.querySelector("#cron-list-wrap");if(s)try{let a=await b.get(`/sites/${t}/crons`);s.innerHTML=Ls(a)}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to load cron jobs: ${v(a.message)}</p>`}}function Ts(e,t){let s=[],a=e.querySelector("#cron-modal"),n=e.querySelector("#cron-modal-title"),o=e.querySelector("#cron-modal-id"),i=e.querySelector("#cron-modal-label"),l=e.querySelector("#cron-modal-command"),r=e.querySelector("#cron-modal-schedule"),d=e.querySelector("#cron-schedule-preview"),u=e.querySelector("#cron-modal-enabled");r?.addEventListener("input",()=>{d.textContent=$s(r.value.trim())}),e.querySelector("#cron-add-btn")?.addEventListener("click",()=>{n.textContent="Add Cron Job",o.value="",i.value="",l.value="",r.value="",d.textContent="",u.checked=!0,UIkit.modal(a).show()}),e.querySelector("#cron-modal-save")?.addEventListener("click",async()=>{let c=l.value.trim(),m=r.value.trim();if(!c||!m){p.error("Command and schedule are required");return}let k={label:i.value.trim(),command:c,schedule:m,enabled:u.checked},h=o.value;try{h?(await b.put(`/sites/${t}/crons/${h}`,k),p.success("Cron job updated")):(await b.post(`/sites/${t}/crons`,k),p.success("Cron job created")),UIkit.modal(a).hide(),await ze(e,t),s=await b.get(`/sites/${t}/crons`)}catch(g){p.error(g.message)}}),e.querySelector("#cron-list-wrap")?.addEventListener("click",async c=>{let m=c.target.closest(".cron-detail-btn");if(m){let f=m.dataset.id,w=s.find(A=>String(A.ID)===f);if(!w)return;document.body.insertAdjacentHTML("beforeend",`
                <div id="cron-detail-modal" uk-modal>
                    <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                        <button class="uk-modal-close-default" type="button" uk-close></button>
                        <h3 class="kp-view-title uk-margin-bottom">Run Details \u2014 ${v(w.Label||String(w.ID))}</h3>
                        <div class="uk-margin-small-bottom">
                            <label class="kp-label">Output</label>
                            <pre class="kp-cron-output">${v(w.LastOutput||"(no output)")}</pre>
                        </div>
                        <div class="uk-margin-small-top">
                            <label class="kp-label">Error</label>
                            <pre class="kp-cron-output kp-cron-output-error">${v(w.LastError||"(no error)")}</pre>
                        </div>
                    </div>
                </div>`);let T=document.getElementById("cron-detail-modal");UIkit.modal(T).show(),T.addEventListener("hidden",()=>T.remove(),{once:!0});return}let k=c.target.closest(".cron-edit-btn");if(k){let f=k.dataset.id,w=s.find(T=>String(T.ID)===f);if(!w)return;n.textContent="Edit Cron Job",o.value=w.ID,i.value=w.Label||"",l.value=w.Command,r.value=w.Schedule,d.textContent=$s(w.Schedule),u.checked=w.Enabled,UIkit.modal(a).show();return}let h=c.target.closest(".cron-delete-btn");if(h){let f=h.dataset.id;if(!await E("Delete Cron Job","This will permanently remove the cron job. Continue?"))return;try{await b.delete(`/sites/${t}/crons/${f}`),p.success("Cron job deleted"),await ze(e,t),s=await b.get(`/sites/${t}/crons`)}catch(T){p.error(T.message)}return}let g=c.target.closest(".cron-run-btn");if(g){let f=g.dataset.id;try{await b.post(`/sites/${t}/crons/${f}/run`)}catch(N){p.error(N.message);return}S("Running Cron Job","Executing the job inside the container \u2014 please wait.");let w=null;try{w=(await b.get(`/sites/${t}/crons`)).find(B=>String(B.ID)===f)?.LastRun??null}catch{}let T=Date.now()+300*1e3,A=setInterval(async()=>{try{let N=await b.get(`/sites/${t}/crons`),B=N.find(q=>String(q.ID)===f);if(!B||B.LastRun!==w||Date.now()>T){clearInterval(A),x(),s=N??[];let q=e.querySelector("#cron-list-wrap");q&&(q.innerHTML=Ls(N)),B?.LastError?p.error(`Job failed: ${B.LastError}`):p.success("Cron job complete")}}catch{}},2e3);return}}),e.querySelector("#cron-list-wrap")?.addEventListener("change",async c=>{let m=c.target.closest(".cron-toggle");if(!m)return;let k=m.dataset.id;try{await b.patch(`/sites/${t}/crons/${k}/toggle`,{enabled:m.checked}),p.success(m.checked?"Cron job enabled":"Cron job disabled")}catch(h){p.error(h.message),m.checked=!m.checked}}),b.get(`/sites/${t}/crons`).then(c=>{s=c??[]}).catch(()=>{})}function $s(e){if(!e)return"";let t=e.trim().split(/\s+/);if(t.length!==5)return"invalid expression";let[s,a,n,o,i]=t;if(e==="* * * * *")return"every minute";if(s!=="*"&&a!=="*"&&n==="*"&&o==="*"&&i==="*")return`daily at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`;if(s!=="*"&&a!=="*"&&n==="*"&&o==="*"&&i!=="*"){let l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return`weekly on ${i.split(",").map(d=>l[parseInt(d)]??d).join(", ")} at ${a.padStart(2,"0")}:${s.padStart(2,"0")}`}return s.startsWith("*/")?`every ${s.slice(2)} minutes`:a.startsWith("*/")?`every ${a.slice(2)} hours`:e}function Bs(e,t){return`
        <div id="dbtools-panel" data-site-id="${e}">

            <!-- tab pills -->
            <ul class="kp-tab-pills" id="kp-db-pills">
                <li data-tab="db-export"><a href="#"><span uk-icon="icon: download; ratio: 0.85"></span> Export</a></li>
                <li data-tab="db-import"><a href="#"><span uk-icon="icon: upload; ratio: 0.85"></span> Import</a></li>
                ${t===1?'<li data-tab="db-replace"><a href="#"><span uk-icon="icon: search; ratio: 0.85"></span> Search &amp; Replace</a></li>':""}
                <li data-tab="db-tables"><a href="#"><span uk-icon="icon: table; ratio: 0.85"></span> Optimize &amp; Repair</a></li>
            </ul>

            <!-- switcher panels -->
            <ul class="uk-switcher uk-margin-large-bottom" id="kp-db-switcher">

                <!-- export -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Export</h3>
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-dump-btn" uk-tooltip="Download a Database Dump">
                                <span uk-icon="download"></span>
                            </button>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            Downloads a gzip-compressed SQL dump of the site's database, including stored routines.
                        </p>
                    </div>
                </li>

                <!-- import -->
                <li>
                    <label class="uk-flex uk-flex-middle" style="gap:8px;cursor:pointer">
                        <input type="checkbox" class="uk-checkbox" id="dbtools-wipe">
                        <span class="kp-text">Wipe the database before importing</span>
                    </label>
                    <p class="kp-muted uk-text-small uk-margin-small-top uk-margin-small-bottom">
                        Without wipe, the dump is merged into the existing database \u2014 tables the dump recreates are
                        replaced, everything else is kept. The site is in maintenance mode while the import runs.
                    </p>

                    <div class="kp-card uk-padding-small uk-margin-bottom">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Upload Dump</h3>
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-upload-btn" uk-tooltip="Upload &amp; Import">
                                <span uk-icon="cloud-upload"></span>
                            </button>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Accepts <span class="kp-mono">.sql</span> or <span class="kp-mono">.sql.gz</span>. Maximum upload
                            size is <strong>512 MB</strong>. For larger dumps, transfer the file to
                            <span class="kp-mono">backups/import/</span> via SFTP and use <em>Import from SFTP</em> below.
                        </p>
                        <input type="file" class="uk-input kp-input" id="dbtools-file-input" accept=".sql,.gz">
                    </div>

                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Import from SFTP</h3>
                            <button class="uk-button kp-btn-ghost kp-btn-sm" id="dbtools-sftp-refresh" uk-tooltip="Refresh the SFTP File List">
                                <span uk-icon="refresh"></span>
                            </button>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-bottom">
                            Dumps found in <span class="kp-mono">backups/import/</span> on this site's SFTP.
                        </p>
                        <div id="dbtools-sftp-list">
                            <div uk-spinner="ratio: 0.6" style="color:var(--kp-blue)"></div>
                        </div>
                    </div>
                </li>

                ${t===1?`
                <!-- search-replace (WordPress only) -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Search &amp; Replace</h3>
                            <div class="uk-flex" style="gap:6px">
                                <button class="uk-button kp-btn-secondary kp-btn-sm" id="dbtools-sr-preview" uk-tooltip="Count Matches Without Changing Anything">
                                    <span uk-icon="search"></span>
                                </button>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="dbtools-sr-run" uk-tooltip="Run the Search &amp; Replace">
                                    <span uk-icon="play"></span>
                                </button>
                            </div>
                        </div>
                        <div class="uk-grid-small uk-child-width-1-2@s" uk-grid>
                            <div>
                                <label class="uk-form-label kp-text" for="dbtools-sr-search">Search</label>
                                <input class="uk-input kp-input" id="dbtools-sr-search" type="text" maxlength="1024" autocomplete="off">
                            </div>
                            <div>
                                <label class="uk-form-label kp-text" for="dbtools-sr-replace">Replace</label>
                                <input class="uk-input kp-input" id="dbtools-sr-replace" type="text" maxlength="1024" autocomplete="off">
                            </div>
                        </div>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            Runs WP-CLI's serialization-safe search-replace across every table in the site's database.
                            Preview first to see how many replacements would be made.
                        </p>
                        <div id="dbtools-sr-result"></div>
                    </div>
                </li>`:""}

                <!-- optimize / repair -->
                <li>
                    <div class="kp-card uk-padding-small">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                            <h3 class="kp-view-title">Optimize &amp; Repair</h3>
                            <div class="uk-flex" style="gap:6px">
                                <button class="uk-button kp-btn-ghost kp-btn-sm" id="dbtools-tables-refresh" uk-tooltip="Refresh the Table List">
                                    <span uk-icon="refresh"></span>
                                </button>
                                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-maintain-btn" data-action="optimize" uk-tooltip="Optimize the Selected Tables" disabled>
                                    <span uk-icon="bolt"></span>
                                </button>
                                <button class="uk-button kp-btn-secondary kp-btn-sm dbtools-maintain-btn" data-action="repair" uk-tooltip="Repair the Selected Tables" disabled>
                                    <span uk-icon="cog"></span>
                                </button>
                            </div>
                        </div>
                        <div id="dbtools-tables-wrap">
                            <div uk-spinner="ratio: 0.8" style="color:var(--kp-blue)"></div>
                        </div>
                        <div id="dbtools-maintain-result"></div>
                    </div>
                </li>
            </ul>
        </div>`}function _s(e,t){let s=e.querySelector("#dbtools-panel"),a=e.querySelector("#kp-db-pills"),n=e.querySelector("#kp-db-switcher");if(!s||!a||!n)return;let o=s.dataset.siteId,i=[...a.querySelectorAll(":scope > li")],l=(r,d)=>{UIkit.switcher(n).show(r),i.forEach((u,c)=>u.classList.toggle("kp-pill-active",c===r)),d&&history.replaceState(null,"",`#site-detail/${o}/${i[r].dataset.tab}`)};i.forEach((r,d)=>{r.querySelector(":scope > a").addEventListener("click",u=>{u.preventDefault(),l(d,!0)})}),l(Math.max(0,i.findIndex(r=>r.dataset.tab===t)),!1)}function As(e,t){e.querySelector("#dbtools-dump-btn")?.addEventListener("click",()=>{let s=`${Date.now().toString(36)}${Math.random().toString(36).slice(2,10)}`,a=`kp_dl_${s}`;S("Preparing Download","Your database dump is being generated \u2014 your download will begin automatically. Do not close this tab."),setTimeout(()=>{let n=document.createElement("a");n.href=`/api/sites/${t}/db/dump?dl=${s}`,n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n);let o=Date.now(),i=setInterval(()=>{!document.cookie.split(";").some(r=>r.trim().startsWith(`${a}=`))&&Date.now()-o<18e5||(clearInterval(i),document.cookie=`${a}=; Path=/; Max-Age=0`,x())},500)},300)}),e.querySelector("#dbtools-upload-btn")?.addEventListener("click",async()=>{let s=e.querySelector("#dbtools-file-input");if(!s?.files?.length){p.error("Select a .sql or .sql.gz file first");return}let a=await Cs(e);if(a===null)return;let n=new FormData;n.append("dump",s.files[0]),n.append("wipe",a?"1":"0"),S("Importing Database","Uploading and importing \u2014 the site is in maintenance mode until this completes.");try{await fetch(`/api/sites/${t}/db/import/upload`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:n,credentials:"same-origin"}).then(async o=>{if(!o.ok){let i=await o.json().catch(()=>({}));throw new Error(i.error||`HTTP ${o.status}`)}})}catch(o){x(),p.error(o.message);return}s.value="",Is(e,t)}),e.querySelector("#dbtools-sftp-list")?.addEventListener("click",async s=>{let a=s.target.closest(".dbtools-sftp-btn");if(!a)return;let n=await Cs(e);if(n!==null){S("Importing Database","Importing from SFTP \u2014 the site is in maintenance mode until this completes.");try{await b.post(`/sites/${t}/db/import/sftp`,{filename:a.dataset.file,wipe:n})}catch(o){x(),p.error(o.message);return}Is(e,t)}}),e.querySelector("#dbtools-sr-preview")?.addEventListener("click",()=>Ps(e,t,!0)),e.querySelector("#dbtools-sr-run")?.addEventListener("click",()=>Ps(e,t,!1)),e.querySelector("#dbtools-tables-wrap")?.addEventListener("change",s=>{s.target.id==="dbtools-tables-all"&&e.querySelectorAll(".dbtools-table-check").forEach(a=>{a.checked=s.target.checked}),yt(e)}),e.querySelectorAll(".dbtools-maintain-btn").forEach(s=>{s.addEventListener("click",()=>Un(e,t,s.dataset.action))}),e.querySelector("#dbtools-tables-refresh")?.addEventListener("click",()=>vt(e,t)),vt(e,t),e.querySelector("#dbtools-sftp-refresh")?.addEventListener("click",()=>gt(e,t)),gt(e,t)}async function Cs(e){let t=!!e.querySelector("#dbtools-wipe")?.checked;return await E(t?"Wipe & Import Database":"Import Database",t?"Every table, view and routine in this site's database will be dropped before the import. This cannot be undone.":"The dump will be merged into this site's database, replacing any tables it recreates. This cannot be undone.")?t:null}async function gt(e,t){let s=e.querySelector("#dbtools-sftp-list");if(s)try{let a=await b.get(`/sites/${t}/db/import/files`);if(!a||a.length===0){s.innerHTML='<p class="kp-muted uk-text-small uk-margin-remove">No files found.</p>';return}s.innerHTML=a.map(n=>`
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom">
                <span class="kp-mono uk-text-small">${v(n)}</span>
                <button class="uk-button kp-btn-primary kp-btn-sm dbtools-sftp-btn" data-file="${v(n)}">
                    Import
                </button>
            </div>`).join("")}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to list files: ${v(a.message)}</p>`}}function Is(e,t){let s=Date.now()+18e5,a=setInterval(async()=>{try{let n=await b.get(`/sites/${t}/db/import/status`);(!n?.active||Date.now()>s)&&(clearInterval(a),x(),n?.active?p.error("Import timed out \u2014 check server logs"):n?.error?p.error(`Import failed: ${n.error}`):p.success("Import complete"),await gt(e,t))}catch{Date.now()>s&&(clearInterval(a),x(),p.error("Import status unavailable \u2014 check server logs"))}},3e3)}async function Ps(e,t,s){let a=e.querySelector("#dbtools-sr-search")?.value??"",n=e.querySelector("#dbtools-sr-replace")?.value??"",o=e.querySelector("#dbtools-sr-result");if(!a){p.error("Enter a search term first");return}if(!(!s&&!await E("Run Search & Replace",`Every occurrence of "${a}" in this site's database will be replaced with "${n}". This cannot be undone \u2014 download a dump first if unsure.`))){S(s?"Previewing Search & Replace":"Running Search & Replace","Scanning every table in the site's database \u2014 this may take a while on large sites.");try{let i=await b.post(`/sites/${t}/db/search-replace`,{search:a,replace:n,dry_run:s},18e5);x();let l=i?.count??0,r=s?`${l} replacement${l===1?"":"s"} would be made`:`${l} replacement${l===1?"":"s"} made`;o&&(o.innerHTML=`<p class="kp-text uk-text-small uk-margin-small-top uk-margin-remove-bottom">${v(r)}</p>`),s||p.success(r)}catch(i){x(),p.error(i.message)}}}async function vt(e,t){let s=e.querySelector("#dbtools-tables-wrap");if(s){try{let a=await b.get(`/sites/${t}/db/tables`);if(!a||a.length===0){s.innerHTML='<p class="kp-muted uk-text-small uk-margin-remove">No tables found.</p>',yt(e);return}let n=a.map(o=>`
            <tr>
                <td><input class="uk-checkbox dbtools-table-check" type="checkbox" value="${v(o.name)}"></td>
                <td class="kp-mono" style="font-size:0.8rem">${v(o.name)}</td>
                <td>${v(o.engine||"\u2014")}</td>
                <td class="uk-visible@s">${Number(o.rows).toLocaleString()}</td>
                <td>${P(o.size)}</td>
            </tr>`).join("");s.innerHTML=`
            <div class="uk-overflow-auto">
            <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                <thead>
                    <tr>
                        <th class="uk-table-shrink">
                            <input class="uk-checkbox" type="checkbox" id="dbtools-tables-all" uk-tooltip="Select All">
                        </th>
                        <th>Table</th>
                        <th>Engine</th>
                        <th class="uk-visible@s">Rows</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>${n}</tbody>
            </table>
            </div>`}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small">Failed to list tables: ${v(a.message)}</p>`}yt(e)}}function yt(e){let t=[...e.querySelectorAll(".dbtools-table-check")],s=t.filter(n=>n.checked).length,a=e.querySelector("#dbtools-tables-all");a&&(a.checked=s>0&&s===t.length,a.indeterminate=s>0&&s<t.length),e.querySelectorAll(".dbtools-maintain-btn").forEach(n=>{n.disabled=s===0})}async function Un(e,t,s){let a=[...e.querySelectorAll(".dbtools-table-check:checked")].map(l=>l.value);if(a.length===0)return;let n=s==="repair"?"Repair":"Optimize";if(!await E(`${n} Tables`,`${n} ${a.length} table${a.length===1?"":"s"}? Tables may be briefly locked while this runs.`))return;S(`${n} Running`,`Running ${s} on ${a.length} table${a.length===1?"":"s"} \u2014 this may take a while on large tables.`);let i=e.querySelector("#dbtools-maintain-result");try{let l=await b.post(`/sites/${t}/db/tables/maintain`,{action:s,tables:a},18e5);x(),i&&(i.innerHTML=`<pre class="kp-cron-output uk-margin-small-top">${v(l?.output||"(no output)")}</pre>`),p.success(`${n} complete`)}catch(l){x(),p.error(l.message)}await vt(e,t)}var U="";function Hs(e){return`
        <div class="kp-card uk-padding uk-margin-top" id="fm-root" data-site="${e}">
            <div class="uk-flex uk-flex-middle uk-flex-between uk-margin-bottom" style="gap:8px;flex-wrap:wrap">
                <nav id="fm-breadcrumb" class="kp-fm-breadcrumb uk-text-small"></nav>
                <div class="uk-flex" style="gap:8px;flex-wrap:wrap">
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-new-file" uk-tooltip="New File"><span uk-icon="file-edit"></span></button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-new-dir" uk-tooltip="New Folder"><span uk-icon="folder"></span></button>
                    <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Upload">
                        <span uk-icon="upload"></span>
                        <input type="file" id="fm-upload" multiple style="display:none">
                    </label>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="fm-refresh" uk-tooltip="Refresh"><span uk-icon="refresh"></span></button>
                </div>
            </div>
            <div id="fm-list"></div>
        </div>`}function Fn(){let e=U?U.split("/"):[],t="",s=['<a href="#" data-path="">html</a>'];for(let a of e)t=t?t+"/"+a:a,s.push(`<span class="kp-fm-sep">/</span><a href="#" data-path="${v(t)}">${v(a)}</a>`);return s.join("")}function Wn(e){let t=new Date(e);return isNaN(t)?"":t.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function qs(e){return e==="d"?"folder":e==="l"?"link":"file-text"}function ce(e,t){return e?e+"/"+t:t}var Ms=new Set(["php","js","jsx","ts","tsx","css","scss","sass","less","html","htm","xml","json","txt","md","markdown","yml","yaml","ini","conf","cnf","toml","env","sh","bash","sql","log","csv","tsv","svg","htaccess","gitignore","lock","map"]);function jn(e,t){if(t)return!1;let s=e.lastIndexOf(".");return e.startsWith(".")&&s===0?Ms.has(e.slice(1).toLowerCase()):s>=0&&Ms.has(e.slice(s+1).toLowerCase())}function zn(e){if(!e||!e.length)return ae("folder","This folder is empty");let t=document.getElementById("fm-root").dataset.site;return`
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>Name</th><th>Size</th><th>Perms</th><th>Modified</th><th></th>
                </tr>
            </thead>
            <tbody>${e.map(a=>{let n=ce(U,a.name),o=a.is_dir,i=jn(a.name,o),l=o?`<a href="#" class="fm-nav" data-path="${v(n)}"><span uk-icon="icon: ${qs(a.type)}; ratio: 0.9"></span> ${v(a.name)}</a>`:`<span><span uk-icon="icon: ${qs(a.type)}; ratio: 0.9"></span> ${v(a.name)}</span>`;return`
            <tr data-path="${v(n)}" data-name="${v(a.name)}" data-dir="${o?1:0}" data-mode="${v(a.mode)}">
                <td class="kp-fm-name">${l}</td>
                <td class="uk-text-nowrap">${P(a.size,o)}</td>
                <td><code class="kp-mono">${v(a.mode)}</code></td>
                <td class="uk-text-nowrap uk-text-small kp-muted">${Wn(a.mod_time)}</td>
                <td class="uk-text-right uk-text-nowrap">
                    ${i?`<button class="kp-fm-act fm-edit" data-path="${v(n)}" uk-tooltip="Edit"><span uk-icon="icon: pencil; ratio: 0.85"></span></button>`:""}
                    ${o?"":`<a class="kp-fm-act fm-download" href="/api/sites/${t}/files/download?path=${encodeURIComponent(n)}" uk-tooltip="Download"><span uk-icon="icon: download; ratio: 0.85"></span></a>`}
                    <button class="kp-fm-act fm-chmod" uk-tooltip="Permissions"><span uk-icon="icon: settings; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-rename" uk-tooltip="Rename / Move"><span uk-icon="icon: move; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-copy" uk-tooltip="Copy"><span uk-icon="icon: copy; ratio: 0.85"></span></button>
                    <button class="kp-fm-act fm-delete" uk-tooltip="Delete"><span uk-icon="icon: trash; ratio: 0.85"></span></button>
                </td>
            </tr>`}).join("")}</tbody>
        </table>`}async function D(e){let t=document.getElementById("fm-list"),s=document.getElementById("fm-breadcrumb");if(t){t.innerHTML=Ae(),s&&(s.innerHTML=Fn());try{let a=await b.get(`/sites/${e}/files?path=${encodeURIComponent(U)}`);t.innerHTML=zn(a)}catch(a){t.innerHTML=_("Failed to list files: "+a.message)}}}function Rs(e,t){U=t||"",D(e)}function $e(e,t,s=""){return new Promise(a=>{let n="fm-prompt-modal";document.getElementById(n)?.remove();let o=document.createElement("div");o.id=n,o.setAttribute("uk-modal",""),o.innerHTML=`
            <div class="uk-modal-dialog uk-modal-body kp-modal">
                <h3 class="uk-modal-title">${v(e)}</h3>
                <label class="kp-label uk-margin-small-bottom">${v(t)}</label>
                <input class="uk-input kp-input" id="fm-prompt-input" value="${v(s)}" autocomplete="off">
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                    <button class="uk-button kp-btn-primary" id="fm-prompt-ok">OK</button>
                </div>
            </div>`,document.body.appendChild(o),window.UIkit&&UIkit.icon(o);let i=UIkit.modal(o),l=o.querySelector("#fm-prompt-input"),r=!1,d=u=>{r||(r=!0,a(u),i.hide())};o.querySelector("#fm-prompt-ok").addEventListener("click",()=>d(l.value.trim()||null)),l.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),d(l.value.trim()||null))}),UIkit.util.on(o,"hidden",()=>{r||(r=!0,a(null)),o.remove()}),i.show(),setTimeout(()=>l.focus(),50)})}async function On(e,t){let s=ce(U,t.name),a=await fetch(`/api/sites/${e}/files/upload?path=${encodeURIComponent(s)}`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:t}),n=a.status===204?null:await a.json().catch(()=>null);if(!a.ok)throw new Error(n?.error||`HTTP ${a.status}`)}function Ns(e,t){U="",e.addEventListener("click",s=>{let a=s.target.closest("#fm-breadcrumb a");if(a){s.preventDefault(),Rs(t,a.dataset.path);return}let n=s.target.closest(".fm-nav");if(n){s.preventDefault(),Rs(t,n.dataset.path);return}let o=s.target.closest(".fm-edit");if(o){s.preventDefault(),Jn(t,o.dataset.path,o.dataset.path.split("/").pop());return}}),e.querySelector("#fm-new-file")?.addEventListener("click",async()=>{let s=await $e("New File","File name");if(s)try{await b.post(`/sites/${t}/files/file`,{path:ce(U,s)}),D(t)}catch(a){p.error(a.message)}}),e.querySelector("#fm-new-dir")?.addEventListener("click",async()=>{let s=await $e("New Folder","Folder name");if(s)try{await b.post(`/sites/${t}/files/dir`,{path:ce(U,s)}),D(t)}catch(a){p.error(a.message)}}),e.querySelector("#fm-upload")?.addEventListener("change",async s=>{let a=[...s.target.files];if(a.length)try{for(let n of a)await On(t,n);p.success(a.length===1?"File uploaded":`${a.length} files uploaded`),D(t)}catch(n){p.error(n.message)}finally{s.target.value=""}}),e.querySelector("#fm-refresh")?.addEventListener("click",()=>D(t)),e.addEventListener("click",async s=>{let a=s.target.closest("tr[data-path]");if(!a)return;let n=a.dataset.path,o=a.dataset.name;if(s.target.closest(".fm-chmod")){let i=await $e("Permissions",`Octal mode for "${o}"`,a.dataset.mode);if(!i)return;try{await b.patch(`/sites/${t}/files/chmod`,{path:n,mode:i}),D(t)}catch(l){p.error(l.message)}return}if(s.target.closest(".fm-rename")){let i=await $e("Rename / Move","New path (relative to current folder)",o);if(!i||i===o)return;try{await b.post(`/sites/${t}/files/move`,{src:n,dst:ce(U,i)}),D(t)}catch(l){p.error(l.message)}return}if(s.target.closest(".fm-copy")){let i=await $e("Copy","Destination name",o+"-copy");if(!i)return;try{await b.post(`/sites/${t}/files/copy`,{src:n,dst:ce(U,i)}),D(t)}catch(l){p.error(l.message)}return}if(s.target.closest(".fm-delete")){if(!await E("Delete",`Delete "${o}"? This cannot be undone.`))return;try{await b.delete(`/sites/${t}/files?path=${encodeURIComponent(n)}`),D(t)}catch(l){p.error(l.message)}return}})}var Oe=null;function Ds(e){if(document.querySelector(`link[href="${e}"]`))return;let t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}function wt(e){return new Promise((t,s)=>{let a=document.querySelector(`script[src="${e}"]`);if(a){if(a.dataset.loaded)return t();a.addEventListener("load",()=>t()),a.addEventListener("error",()=>s(new Error("failed to load "+e)));return}let n=document.createElement("script");n.src=e,n.addEventListener("load",()=>{n.dataset.loaded="1",t()}),n.addEventListener("error",()=>s(new Error("failed to load "+e))),document.head.appendChild(n)})}function Vn(){if(Oe)return Oe;let e="/static/vendor/codemirror";return Ds(`${e}/lib/codemirror.css`),Ds(`${e}/theme/material-darker.css`),Oe=wt(`${e}/lib/codemirror.js`).then(()=>Promise.all([wt(`${e}/mode/meta.js`),wt(`${e}/addon/mode/loadmode.js`)])).then(()=>{window.CodeMirror.modeURL=`${e}/mode/%N/%N.js`}),Oe}function Kn(e){let t=window.CodeMirror.findModeByFileName(e);return t?t.mode:null}async function Jn(e,t,s){let a;try{a=await b.get(`/sites/${e}/files/content?path=${encodeURIComponent(t)}`)}catch(m){let k=/too large/i.test(m.message)?"File is too large to edit \u2014 download it instead.":/binary/i.test(m.message)?"Binary file \u2014 download it instead of editing.":m.message;p.error(k);return}try{await Vn()}catch(m){p.error("Editor failed to load: "+m.message);return}let n="fm-editor-modal";document.getElementById(n)?.remove();let o=document.createElement("div");o.id=n,o.setAttribute("uk-modal",""),o.innerHTML=`
        <div class="uk-modal-dialog kp-modal kp-fm-editor-dialog">
            <div class="uk-flex uk-flex-middle uk-flex-between uk-padding-small">
                <h3 class="uk-modal-title uk-margin-remove"><span uk-icon="file-text"></span> ${v(s)} <span id="fm-ed-dirty" class="kp-muted uk-text-small" hidden>\u2022 unsaved</span></h3>
                <div class="uk-flex" style="gap:8px">
                    <button class="uk-button kp-btn-primary kp-btn-sm" id="fm-ed-save"><span uk-icon="icon: check; ratio: 0.85"></span> Save</button>
                    <button class="uk-button kp-btn-ghost kp-btn-sm uk-modal-close"><span uk-icon="icon: close; ratio: 0.85"></span></button>
                </div>
            </div>
            <div class="kp-fm-editor-body">
                <textarea id="fm-ed-area"></textarea>
            </div>
        </div>`,document.body.appendChild(o),window.UIkit&&UIkit.icon(o);let i=UIkit.modal(o,{bgClose:!1,escClose:!0}),l=o.querySelector("#fm-ed-dirty"),r=null,d=!0,u=m=>{d=!m,l.hidden=!m};UIkit.util.on(o,"shown",()=>{if(r)return;r=window.CodeMirror.fromTextArea(o.querySelector("#fm-ed-area"),{value:a.content,lineNumbers:!0,theme:"material-darker",indentUnit:4,lineWrapping:!1,extraKeys:{"Ctrl-S":c,"Cmd-S":c,"Ctrl-F":"findPersistent","Ctrl-/":"toggleComment"}}),r.setValue(a.content),r.on("change",()=>u(!0));let m=Kn(s);m&&(r.setOption("mode",m),window.CodeMirror.autoLoadMode(r,m)),setTimeout(()=>r.refresh(),30)}),UIkit.util.on(o,"hidden",()=>o.remove());async function c(){if(!r)return;let m=o.querySelector("#fm-ed-save"),k=m.innerHTML;m.disabled=!0,m.innerHTML='<div uk-spinner="ratio: 0.6"></div>';try{await b.put(`/sites/${e}/files/content`,{path:t,content:r.getValue()}),u(!1),p.success("Saved"),D(e)}catch(h){p.error(h.message)}finally{m.disabled=!1,m.innerHTML=k}}o.querySelector("#fm-ed-save").addEventListener("click",c),UIkit.util.on(o,"beforehide",m=>{!d&&!window.confirm("Discard unsaved changes?")&&m.preventDefault()}),i.show()}var Xn=2e3;function xt(e,t){return`
        <div>
            <div class="kp-log-controls">
                <select class="uk-select kp-select" id="log-container" style="width:140px;height:38px">
                    ${t===6?'<option value="access">Access Log</option><option value="waf">WAF Log</option>':`<option value="access">Access</option>
            <option value="nginx">Nginx</option>
                    ${(()=>{switch(t){case 1:case 2:return'<option value="php">PHP-FPM</option>';case 4:return'<option value="app">Node.js</option>';case 5:return'<option value="app">.NET</option>';case 7:return'<option value="app">Python</option>';default:return""}})()}
                    <option value="waf">WAF Log</option>`}
                </select>
                <select class="uk-select kp-select" id="log-tail" style="width:120px;height:38px">
                    <option value="100">100 lines</option>
                    <option value="250">250 lines</option>
                    <option value="500">500 lines</option>
                    <option value="1000">1000 lines</option>
                </select>
                <button class="uk-button kp-btn-secondary kp-btn-sm" id="log-connect" uk-tooltip="Start Tailing the Logs">
                    <span uk-icon="play"></span>
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="log-disconnect" disabled uk-tooltip="Stop Tailing the Logs">
                    <span uk-icon="ban"></span>
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="log-clear" uk-tooltip="Clear the Logs">
                    <span uk-icon="trash"></span>
                </button>
                <label style="font-size:0.82rem;color:var(--kp-text-dim);display:flex;align-items:center;gap:6px">
                    <input type="checkbox" class="uk-checkbox" id="log-autoscroll" checked>
                    Auto-scroll
                </label>
            </div>
            <div class="kp-log-header">
                <div class="kp-log-dot kp-log-dot-red"></div>
                <div class="kp-log-dot kp-log-dot-yellow"></div>
                <div class="kp-log-dot kp-log-dot-green"></div>
                <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px" id="log-status">Disconnected</span>
            </div>
            <div class="kp-log-wrap" id="log-output"></div>
        </div>`}function Us(e,t){let s=null,a=!1,n=e.querySelector("#log-output"),o=e.querySelector("#log-connect"),i=e.querySelector("#log-disconnect"),l=e.querySelector("#log-clear"),r=e.querySelector("#log-autoscroll"),d=e.querySelector("#log-status");function u(k){for(k.split(`
`).forEach(h=>{if(!h)return;let g=document.createElement("div");g.className=h.match(/WAF BLOCK/i)?"kp-log-line-err":h.match(/WAF DETECT/i)?"kp-log-line-warn":h.match(/error|crit|emerg/i)?"kp-log-line-err":h.match(/warn/i)?"kp-log-line-warn":h.match(/info|notice/i)?"kp-log-line-info":"",g.textContent=h,n.appendChild(g)});n.childElementCount>Xn;)n.removeChild(n.firstChild);r.checked&&(n.scrollTop=n.scrollHeight)}function c(){s&&(s.close(),s=null),a=!1,o.disabled=!1,i.disabled=!0,d&&(d.textContent="Disconnected")}o.addEventListener("click",()=>{c();let k=e.querySelector("#log-container").value,h=e.querySelector("#log-tail").value,g=location.protocol==="https:"?"wss":"ws",f=k==="waf"?`${g}://${location.host}/api/sites/${t}/logs/waf?tail=${h}`:k==="proxy"?`${g}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:k==="access"?`${g}://${location.host}/api/sites/${t}/logs/proxy?tail=${h}`:`${g}://${location.host}/api/sites/${t}/logs?container=${k}&tail=${h}`;s=new WebSocket(f),s.onopen=()=>{a=!0,o.disabled=!0,i.disabled=!1,d&&(d.textContent=`Connected \u2014 ${k}`)},s.onmessage=w=>u(w.data),s.onerror=()=>{},s.onclose=()=>{a=!1,o.disabled=!1,i.disabled=!0,d&&(d.textContent="Disconnected")}}),i.addEventListener("click",c),l.addEventListener("click",()=>{n.innerHTML=""}),e.querySelector("#log-container").addEventListener("change",()=>{s&&s.readyState===WebSocket.OPEN&&(c(),o.click())});let m=y.go.bind(y);y.go=function(k,h={}){return s&&c(),m(k,h)}}function Gn(e){switch(e){case"valid":return'<span class="kp-ssl-valid" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Valid SSL certificate"></span>';case"self-signed":return'<span class="kp-ssl-self-signed" uk-icon="icon: lock; ratio: 0.85" uk-tooltip="Self-signed certificate"></span>';case"expired":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Expired certificate"></span>';case"mismatch":return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="Certificate does not match this domain"></span>';default:return'<span class="kp-ssl-none" uk-icon="icon: warning; ratio: 0.85" uk-tooltip="No SSL certificate"></span>'}}async function Fs(e,t){try{let s=await b.get(`/ssl-status?domain=${encodeURIComponent(e)}`),a=document.getElementById(`ssl-icon-${t}`);a&&(a.outerHTML=Gn(s.status))}catch{}}function Ws(e){e.forEach(t=>Fs(t.Domain,t.ID))}function js(e,t,s,a=0,n=null,o=[]){let i=e.SiteType!==3&&e.PMAPort>0;return`
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-2@m">
                <div class="kp-card uk-padding-small">
                    <h3 class="kp-view-title uk-margin-bottom">Site Info</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Name</td><td>${e.Name}</td></tr>
                            ${n?`<tr><td class="kp-muted">Parent</td><td><a href="javascript:void(0)" data-action="manage" data-id="${a}" style="color:var(--kp-cyan)">${n}</a></td></tr>`:""}
                            <tr><td class="kp-muted">Internal Port</td><td>:${e.Port}</td></tr>
                            <tr><td class="kp-muted">Type</td><td>${ge(e.SiteType)}</td></tr>
                            <tr><td class="kp-muted">Version</td><td>${J(e)}</td></tr>
                            <tr><td class="kp-muted">Status</td><td>${K(e.SiteStatus)}</td></tr>
                            <tr><td class="kp-muted">Containers</td><td><div id="sd-health-badges" class="kp-health-badges"></div></td></tr>
                            <tr><td class="kp-muted">Created</td><td>${new Date(e.Created).toLocaleString()}</td></tr>
                        </tbody>
                    </table>
                </div>
                
                ${o.length?`
                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">Site Sync</h3>
                    <p class="kp-muted uk-text-small uk-margin-remove-bottom">
                        Push files and/or database from this site onto its parent or one of its clones.
                    </p>
                    <div class="uk-flex uk-margin-small-top" style="gap:8px">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="sync-push-btn">
                            <span uk-icon="cloud-upload"></span> Push Site
                        </button>
                    </div>
                </div>`:""}

                ${i?`
                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">phpMyAdmin</h3>
                    <p class="kp-muted uk-text-small uk-margin-remove-bottom">
                        Opens a secure time-limited session. Link expires after 10 minutes or first use.
                    </p>
                    <div class="uk-margin-small-top">
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="pma-open-btn">
                            <span uk-icon="database"></span> Open phpMyAdmin
                        </button>
                    </div>
                </div>`:""}
                
            </div>

            <div class="uk-width-1-2@m">

                <div class="kp-card uk-padding-small">
                    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                        <h3 class="kp-view-title uk-margin-bottom">Domains</h3>
                        <button class="uk-button kp-btn-secondary kp-btn-sm" id="domain-add-btn" uk-tooltip="Add a New Domain">
                            <span uk-icon="plus"></span>
                        </button>
                    </div>
                    <div id="domain-list">
                        ${t.length?t.map(zs).join(""):'<p class="kp-muted uk-text-small">No domains configured</p>'}
                    </div>
                    <div id="domain-add-form" class="uk-hidden uk-margin-small-top">
                        <div class="uk-flex kp-domain-add-wrap">
                            <input class="uk-input kp-input kp-input-sm" id="domain-add-input" type="text" placeholder="example.com">
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="domain-save-btn">Add</button>
                            <button class="uk-button kp-btn-ghost kp-btn-sm" id="domain-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="kp-card uk-padding-small uk-margin-small-top">
                    <h3 class="kp-view-title uk-margin-bottom">SFTP Access</h3>
                    <table class="uk-table uk-table-small uk-table-divider uk-margin-remove">
                        <tbody>
                            <tr><td class="kp-muted">Host</td><td class="kp-mono">${location.hostname}</td></tr>
                            <tr><td class="kp-muted">Port</td><td class="kp-mono">2222</td></tr>
                            <tr><td class="kp-muted">User</td><td class="kp-mono">${s?.Username??e.Name}</td></tr>
                            <tr>
                                <td class="kp-muted">Password</td>
                                <td>
                                    <span id="sftp-pass-display" class="kp-mono kp-sftp-pass" data-revealed="0">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span>
                                    <button class="uk-button kp-btn-secondary kp-btn-sm uk-margin-small-left" id="sftp-reveal-btn" uk-tooltip="Reveal the Password">
                                        <span uk-icon="icon: eye; ratio: 0.75"></span>
                                    </button>
                                    <button class="uk-button kp-btn-secondary kp-btn-sm uk-margin-small-left" id="sftp-copy-btn" uk-tooltip="Copy the Password">
                                        <span uk-icon="icon: copy; ratio: 0.75"></span>
                                    </button>
                                </td>
                            </tr>
                            <tr><td class="kp-muted">Path</td><td class="kp-mono">/html</td></tr>
                        </tbody>
                    </table>
                    <div class="uk-margin-small-top">
                        <button class="uk-button kp-btn-ghost kp-btn-sm" id="sftp-regen-btn">
                            <span uk-icon="refresh"></span> Regenerate Password
                        </button>
                    </div>
                </div>

            </div>
        </div>`}function zs(e){return`<div class="uk-flex uk-flex-between uk-flex-middle kp-config-row" data-domain-id="${e.ID}">
        <div class="uk-flex uk-flex-middle kp-domain-row-inner">
            <span id="ssl-icon-${e.ID}" class="kp-ssl-pending" uk-icon="icon: more; ratio: 0.85"></span>
            <span class="uk-text-small kp-mono">${e.Domain}</span>
        </div>
        <button class="kp-config-del" data-action="delete-domain" data-did="${e.ID}" title="Remove">
            <span uk-icon="icon: close; ratio: 0.8"></span>
        </button>
    </div>`}function Os(e,t){e.querySelector("#domain-add-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.remove("uk-hidden")}),e.querySelector("#domain-cancel-btn")?.addEventListener("click",()=>{e.querySelector("#domain-add-form").classList.add("uk-hidden")}),e.querySelector("#domain-save-btn")?.addEventListener("click",async()=>{let s=e.querySelector("#domain-add-input").value.trim();if(s)try{let a=await b.post(`/sites/${t}/domains`,{domain:s});e.querySelector("#domain-list").insertAdjacentHTML("beforeend",zs(a)),Fs(a.Domain,a.ID),e.querySelector("#domain-add-form").classList.add("uk-hidden"),e.querySelector("#domain-add-input").value="",p.success("Domain added")}catch(a){p.error(a.message)}}),e.querySelector("#domain-list")?.addEventListener("click",async s=>{let a=s.target.closest('[data-action="delete-domain"]');if(!(!a||!await E("Remove Domain","Remove this domain from the site?")))try{await b.delete(`/sites/${t}/domains/${a.dataset.did}`),a.closest("[data-domain-id]").remove(),p.success("Domain removed")}catch(o){p.error(o.message)}})}function Vs(e,t,s=null,a=[]){e.querySelector("#sftp-regen-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#sftp-regen-btn"),l=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let r=await b.post(`/sites/${t}/sftp-regen`),d=e.querySelector("#sftp-pass-display");if(d&&r?.password){d.textContent=r.password,d.dataset.revealed="1";let u=e.querySelector("#sftp-reveal-btn");u&&(u.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>')}p.success("SFTP password regenerated"),y.go("site-detail",{id:String(t)})}catch(r){p.error(r.message),i.disabled=!1,i.innerHTML=l}});let n=async()=>(await b.get(`/sites/${t}/sftp-password`))?.password??"",o=i=>{if(navigator.clipboard)navigator.clipboard.writeText(i).then(()=>p.success("Password copied to clipboard")).catch(()=>p.error("Failed to copy password"));else{let l=document.createElement("textarea");l.value=i,l.style.cssText="position:fixed;opacity:0",document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l),p.success("Password copied to clipboard")}};e.querySelector("#sftp-reveal-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#sftp-pass-display"),l=e.querySelector("#sftp-reveal-btn");if(!i)return;if(i.dataset.revealed==="1"){i.textContent="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",i.dataset.revealed="0",l.innerHTML='<span uk-icon="icon: eye; ratio: 0.75"></span>';return}let r=l.innerHTML;l.disabled=!0,l.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{i.textContent=await n(),i.dataset.revealed="1",l.innerHTML='<span uk-icon="icon: eye-slash; ratio: 0.75"></span>'}catch(d){p.error(d.message),l.innerHTML=r}finally{l.disabled=!1}}),e.querySelector("#sftp-copy-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#sftp-copy-btn"),l=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{let r=await n();r&&o(r)}catch(r){p.error(r.message)}finally{i.disabled=!1,i.innerHTML=l}}),e.querySelector("#pma-open-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#pma-open-btn"),l=i.innerHTML;i.disabled=!0,i.innerHTML='<div uk-spinner="ratio: 0.5"></div> Opening...';try{let r=await b.post(`/sites/${t}/pma-token`);window.open(r.url,"_blank")}catch(r){p.error(r.message)}finally{i.disabled=!1,i.innerHTML=l}}),e.querySelector("#sync-push-btn")?.addEventListener("click",async()=>{let i=await ts(s,a,s.SiteType!==3&&s.PMAPort>0);if(!i)return;let l=a.find(u=>u.ID===i.target_id)?.Name??"target";try{await b.post(`/sites/${t}/push`,i)}catch(u){p.error(u.message);return}S("Push Running",`Backing up ${l}, then pushing ${s.Name} onto it.`);let r=Date.now()+1800*1e3,d=setInterval(async()=>{try{let u=await b.get(`/sites/${t}/push-status`);(!u?.active||Date.now()>r)&&(clearInterval(d),x(),u?.active?p.error("Push is taking longer than expected \u2014 check server logs for status"):u?.error?p.error(`Push failed: ${u.error}`):p.success(`Push to ${l} complete`))}catch{}},4e3)})}function Ks(){return`
        <div class="kp-card uk-padding uk-margin-top">
            <h3 class="kp-view-title uk-margin-bottom">Redirects</h3>
            <p class="kp-muted uk-text-small uk-margin-small-bottom">
                Rules are evaluated in order. The first matching source wins.
                Source is a path (e.g. <code>/old-page</code>) or a regular expression (e.g. <code>^/blog/(d+)$</code>). Target is a full URL or path.
            </p>
            <div id="redirects-list" class="uk-margin-small-bottom"></div>
            <div class="uk-flex uk-flex-middle uk-margin-small-top" style="gap:8px">
                <button type="button" class="uk-button kp-btn-ghost uk-button-small" id="redirect-add-btn">
                    <span uk-icon="plus"></span> Add Rule
                </button>
            </div>
            <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                <button type="button" class="uk-button kp-btn-primary" id="redirect-save-btn">
                    <span uk-icon="check"></span> Save
                </button>
            </div>
        </div>`}function Js(e="",t="",s=301){return`
        <div class="redirect-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <input class="uk-input kp-input redirect-source" type="text" placeholder="/old-path" value="${e}" style="flex:1">
            <input class="uk-input kp-input redirect-target" type="text" placeholder="https://example.com/new-path" value="${t}" style="flex:2">
            <select class="uk-select kp-select redirect-code" style="width:90px">
                <option value="301" ${s===301?"selected":""}>301</option>
                <option value="302" ${s===302?"selected":""}>302</option>
                <option value="307" ${s===307?"selected":""}>307</option>
                <option value="308" ${s===308?"selected":""}>308</option>
            </select>
            <a href="javascript:void(0);" class="kp-muted redirect-remove-btn" uk-icon="trash"></a>
        </div>`}async function Xs(e){let t=document.getElementById("redirects-list");if(!t)return;t.innerHTML="";let s=await b.get(`/sites/${e}/redirects`);t.innerHTML=s.map(a=>Js(a.Source,a.Target,a.Code)).join("")}function Gs(e,t){let s=new AbortController,a={signal:s.signal};e.addEventListener("click",n=>{n.target.closest("#redirect-add-btn")&&document.getElementById("redirects-list").insertAdjacentHTML("beforeend",Js()),n.target.closest(".redirect-remove-btn")&&n.target.closest(".redirect-row").remove()},a),e.addEventListener("click",async n=>{if(!n.target.closest("#redirect-save-btn"))return;let o=[...document.querySelectorAll(".redirect-row")].map(i=>({Source:i.querySelector(".redirect-source").value.trim(),Target:i.querySelector(".redirect-target").value.trim(),Code:parseInt(i.querySelector(".redirect-code").value,10)}));try{await b.put(`/sites/${t}/redirects`,o),p.success("Redirects saved")}catch(i){p.error(i.message||"Failed to save redirects")}},a),e.__redirectsAbort?.abort(),e.__redirectsAbort=s}var ue=[{id:"ab-threshold",key:"threshold",api:"Threshold",mult:1,label:"Error Responses",help:"4xx/5xx responses within the window that trigger the 429."},{id:"ab-window",key:"window_secs",api:"WindowSecs",mult:1,label:"Window (seconds)",help:"Span the error responses are counted over."},{id:"ab-cooldown",key:"cooldown_secs",api:"CooldownSecs",mult:60,label:"429 Cooldown (minutes)",help:"Hitting the limit again during the cooldown converts it to a ban."},{id:"ab-ban",key:"ban_secs",api:"BanSecs",mult:60,label:"Ban Length (minutes)",help:"How long a ban lasts."},{id:"ab-strikes",key:"perm_strikes",api:"PermStrikes",mult:1,label:"Bans Before Permanent",help:"Bans within the strike window that make the ban permanent."},{id:"ab-strike-win",key:"perm_window_secs",api:"PermWindowSecs",mult:3600,label:"Strike Window (hours)",help:"Span the bans are counted over."}],$t={id:"ab-escalate",key:"escalate_sites",api:"EscalateSites",mult:1,label:"Sites Before Global Ban",help:"An IP banned on this many sites is banned on all of them."},de=e=>e?`/sites/${e}/security/autoban`:"/security/autoban";function Ve(e=null){let t=e?ue:[...ue,$t];return`
        <div id="autoban-panel">

            <div class="kp-card uk-padding-small uk-margin-bottom">
                <ul class="kp-accordion uk-margin-remove" uk-accordion>
                    <li>
                        <a class="uk-accordion-title" href="#"><h3 class="kp-view-title">Auto-Ban Settings</h3></a>
                        <div class="uk-accordion-content">
                            <div class="uk-flex uk-flex-between uk-flex-top uk-margin-small-bottom" style="gap:8px">
                                <p class="kp-muted uk-text-small uk-margin-remove">
                                    ${e?"Counts this site's 4xx/5xx responses per IP. Leave a field blank to inherit the global value shown.":"The global scope counts hits on unregistered domains; per-site counters use these values unless a site overrides them."}
                                    Bypassed and whitelisted IPs are never counted.
                                </p>
                                <button class="uk-button kp-btn-primary kp-btn-sm" id="ab-save" uk-tooltip="Save Auto-Ban Settings">
                                    <span uk-icon="check"></span>
                                </button>
                            </div>
                            ${e?`
                            <div class="uk-margin-small-bottom">
                                <label class="kp-label">
                                    <input class="uk-checkbox" type="checkbox" id="ab-enabled">
                                    &nbsp;Enable auto-ban for this site
                                </label>
                            </div>`:""}
                            <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                                ${t.map(s=>`
                                <div>
                                    <label class="kp-label" for="${s.id}">${s.label}</label>
                                    <input class="uk-input kp-input" id="${s.id}" type="number" min="1" step="1">
                                    <p class="kp-muted uk-text-small uk-margin-small-top">${s.help}</p>
                                </div>`).join("")}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="kp-card uk-padding-small">
                <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                    <h3 class="kp-view-title">Banned IPs</h3>
                    <button class="uk-button kp-btn-ghost kp-btn-sm" id="ab-refresh" uk-tooltip="Refresh the list">
                        <span uk-icon="refresh"></span>
                    </button>
                </div>
                <div id="ab-list"><span class="kp-muted uk-text-small">Loading\u2026</span></div>
            </div>
        </div>`}function Yn(e){if(!e.length)return'<p class="kp-muted uk-text-small uk-margin-remove">No IPs are currently banned.</p>';let t=M();return`
        <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-table-middle kp-fm-table">
            <thead>
                <tr>
                    <th>IP</th>
                    <th>Hits</th>
                    <th>Strikes</th>
                    <th>Banned</th>
                    <th>Expires</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>${e.map(a=>{let n=!a.Expires;return`
        <tr>
            <td class="kp-mono">${v(a.IP)}</td>
            <td>${a.Hits}</td>
            <td>${a.Strikes}</td>
            <td>${new Date(a.Created).toLocaleString()}</td>
            <td>${n?'<span class="kp-muted">Permanent</span>':new Date(a.Expires).toLocaleString()}</td>
            <td>
                <div class="uk-flex uk-flex-right" style="gap:4px">
                    ${n?"":`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="permanent" data-id="${a.ID}" uk-tooltip="Ban permanently">
                        <span uk-icon="lock"></span>
                    </button>`}
                    ${t?`
                    <button class="uk-button kp-btn-ghost kp-btn-sm" data-ab-action="allow" data-id="${a.ID}" uk-tooltip="Allow \u2014 add to Security Bypass">
                        <span uk-icon="check"></span>
                    </button>`:""}
                    <button class="uk-button kp-btn-danger kp-btn-sm" data-ab-action="remove" data-id="${a.ID}" uk-tooltip="Remove the ban">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </td>
        </tr>`}).join("")}</tbody>
        </table>
        </div>`}async function St(e,t){let s=e.querySelector("#ab-list");try{let a=await b.get(de(t));s.innerHTML=Yn(a??[])}catch(a){s.innerHTML=`<p class="kp-muted uk-text-small uk-margin-remove">Failed to load bans: ${v(a.message)}</p>`}}async function Qn(e,t){try{let s=await b.get(`${de(t)}/settings`),a=t?s.global:s,n=t?s.override:s;(t?ue:[...ue,$t]).forEach(l=>{let r=e.querySelector(`#${l.id}`);r&&(r.placeholder=String(a[l.api]/l.mult),r.value=n[l.api]==null?"":String(n[l.api]/l.mult))});let i=e.querySelector("#ab-enabled");i&&(i.checked=!!s.override?.Enabled)}catch(s){p.error("Failed to load auto-ban settings: "+s.message)}}async function Zn(e,t){let s=t?ue:[...ue,$t],a={};for(let n of s){let o=e.querySelector(`#${n.id}`).value.trim();if(o===""){if(!t)throw new Error(`${n.label} is required`);a[n.key]=null;continue}let i=Number(o);if(!Number.isInteger(i)||i<1)throw new Error(`${n.label} must be a whole number above 0`);a[n.key]=i*n.mult}t&&(a.enabled=e.querySelector("#ab-enabled").checked),await b.put(`${de(t)}/settings`,a)}function Ke(e,t=null){let s=e.querySelector("#autoban-panel");s&&(s.querySelector("#ab-save")?.addEventListener("click",async a=>{let n=a.currentTarget,o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await Zn(s,t),p.success("Auto-ban settings saved")}catch(i){p.error(i.message)}finally{n.disabled=!1,n.innerHTML=o}}),s.querySelector("#ab-refresh")?.addEventListener("click",()=>St(s,t)),s.querySelector("#ab-list")?.addEventListener("click",async a=>{let n=a.target.closest("[data-ab-action]");if(!n)return;let o=n.dataset.id,i=n.dataset.abAction,l=n.closest("tr")?.querySelector("td")?.textContent??"this IP";try{if(i==="permanent"){if(!await E("Ban Permanently",`Ban ${l} permanently? It stays banned until removed.`))return;await b.post(`${de(t)}/${o}/permanent`),p.success(`${l} banned permanently`)}else if(i==="allow"){if(!await E("Allow IP",`Add ${l} to Security Bypass? It will skip every security check, including the WAF, on all sites.`))return;await b.post(`${de(t)}/${o}/allow`),p.success(`${l} added to Security Bypass`)}else if(i==="remove"){if(!await E("Remove Ban",`Remove the ban on ${l}? Its strike history is cleared too.`))return;await b.delete(`${de(t)}/${o}`),p.success(`Ban on ${l} removed`)}await St(s,t)}catch(r){p.error(r.message)}}),Qn(s,t),St(s,t))}function eo(e){return`
        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-waf-pills">
            <li data-tab="crs"><a href="#"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> Core Rule Set</a></li>
            <li data-tab="autoban"><a href="#"><span uk-icon="icon: ban; ratio: 0.85"></span> Auto-Ban</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher uk-margin-large-bottom" id="kp-waf-switcher">

            <!-- core rule set -->
            <li>
                <div class="kp-card uk-padding">
                    <h3 class="kp-view-title uk-margin-bottom">WAF Override</h3>
                    <form id="waf-override-form" class="uk-form-stacked">
                        <div class="uk-margin">
                            <label class="kp-label" for="waf-override">Site Behaviour</label>
                            <select class="uk-select kp-select" id="waf-override" name="override">
                                <option value="0">Inherit global setting</option>
                                <option value="1">Force ON for this site</option>
                                <option value="2">Force OFF for this site</option>
                            </select>
                        </div>
                        <div class="uk-margin">
                            <label class="kp-label">CRS Plugins</label>
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Select OWASP CRS plugins to enable for this site. Only plugins present in the
                                local CRS install are shown. Changes recompile the site WAF engine in the background.
                            </p>
                            <div id="waf-plugins-list" class="uk-margin-small-top">
                                <span class="kp-muted uk-text-small">Loading available plugins\u2026</span>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="kp-label" for="waf-site-exclusions">Additional Rule Exclusions</label>
                            <textarea
                                class="uk-textarea kp-input kp-mono kp-waf-exclusions"
                                id="waf-site-exclusions"
                                name="exclusions"
                                rows="15"
                                placeholder="# Numeric = rule ID, text = tag name, one per line&#10;942100&#10;attack-xss"></textarea>
                            <p class="kp-muted uk-text-small uk-margin-small-top">
                                Merged on top of global exclusions. Useful for WooCommerce, contact forms, or file upload paths that trigger false positives.
                            </p>
                        </div>
                        <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                            <a class="uk-button kp-btn-ghost" id="waf-export-btn" href="#" uk-tooltip="Export WAF settings">
                                <span uk-icon="download"></span>
                            </a>
                            <label class="uk-button kp-btn-ghost" style="cursor:pointer" uk-tooltip="Import WAF settings">
                                <span uk-icon="upload"></span>
                                <input type="file" id="waf-import" accept=".json" style="display:none">
                            </label>
                            <button type="submit" class="uk-button kp-btn-primary">
                                <span uk-icon="check"></span> Save
                            </button>
                        </div>
                    </form>
                </div>
            </li>

            <!-- auto-ban -->
            <li>${Ve(e)}</li>

        </ul>`}function Et(e,t,s=null){let a=e.querySelector("#kp-waf-pills"),n=e.querySelector("#kp-waf-switcher");if(!a||!n)return;let o=[...a.querySelectorAll(":scope > li")],i=(l,r)=>{if(UIkit.switcher(n).show(l),o.forEach((u,c)=>u.classList.toggle("kp-pill-active",c===l)),!r)return;let d=o[l].dataset.tab;history.replaceState(null,"",s?`#site-detail/${s}/${d}`:l===0?"#waf":`#waf/${d}`)};o.forEach((l,r)=>{l.querySelector(":scope > a").addEventListener("click",d=>{d.preventDefault(),i(r,!0)})}),i(Math.max(0,o.findIndex(l=>l.dataset.tab===t)),!1)}async function Lt(e,t){let s=document.getElementById("waf-tab-panel");if(!s)return;s.innerHTML=eo(e),Et(s,t,e),Ke(s,e);let a=document.getElementById("waf-export-btn");a&&(a.href=`/api/sites/${e}/waf/export`);try{let n=await b.get(`/sites/${e}/waf`),o=document.getElementById("waf-override"),i=document.getElementById("waf-site-exclusions");o&&(o.value=String(n.Override??0)),i&&(i.value=n.Exclusions??"");let l=document.getElementById("waf-plugins-list");if(l){let[r,d]=await Promise.all([b.get("/settings/waf/plugins"),b.get(`/sites/${e}/waf/plugins`)]),u=new Set(d??[]);!r||r.length===0?l.innerHTML='<span class="kp-muted uk-text-small">No plugins found in local CRS install.</span>':window.matchMedia("(max-width: 959px)").matches?l.innerHTML=`
                    <select multiple class="uk-select kp-select waf-plugin-select" size="${Math.min(r.length,8)}">
                        ${r.map(c=>`
                        <option value="${c}" ${u.has(c)?"selected":""}>${c}</option>
                        `).join("")}
                    </select>`:(l.innerHTML=`
                    <div class="waf-plugin-pills">
                        ${r.map(c=>`
                        <span class="waf-plugin-pill ${u.has(c)?"active":""}"
                            data-plugin="${c}">${c}</span>
                        `).join("")}
                    </div>`,l.querySelectorAll(".waf-plugin-pill").forEach(c=>{c.addEventListener("click",()=>c.classList.toggle("active"))}))}}catch(n){p.error("Failed to load WAF settings: "+n.message)}}function Ys(e,t,s){e.addEventListener("submit",async a=>{if(a.target.id!=="waf-override-form")return;a.preventDefault();let n=a.target.querySelector('[type="submit"]'),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let i=new FormData(a.target),l={override:parseInt(i.get("override"),10),exclusions:i.get("exclusions").trim()};try{await b.put(`/sites/${t}/waf`,l);let r=document.querySelector(".waf-plugin-select"),d=r?[...r.selectedOptions].map(u=>u.value):[...document.querySelectorAll(".waf-plugin-pill.active")].map(u=>u.dataset.plugin);await b.put(`/sites/${t}/waf/plugins`,d),p.success("WAF override saved \u2014 engine recompiling in background")}catch(r){p.error(r.message)}finally{n.disabled=!1,n.innerHTML=o}},{signal:s}),e.addEventListener("change",async a=>{if(a.target.id!=="waf-import")return;let n=a.target.files[0];if(!n)return;let o=new FormData;o.append("file",n);try{let i=await fetch(`/api/sites/${t}/waf/import`,{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:o}),l=i.status===204?null:await i.json().catch(()=>null);if(!i.ok)throw new Error(l?.error||`HTTP ${i.status}`);await Lt(t),p.success("WAF settings imported")}catch(i){p.error(i.message)}finally{a.target.value=""}},{signal:s})}var to=[{label:"Cache Flush",cmd:"cache flush"},{label:"Plugin List",cmd:"plugin list"},{label:"Theme List",cmd:"theme list"},{label:"User List",cmd:"user list"},{label:"Core Check",cmd:"core check-update"},{label:"Core Update",cmd:"core update"},{label:"Plugin Updates",cmd:"plugin update --all"},{label:"Theme Updates",cmd:"theme update --all"},{label:"Rewrite Flush",cmd:"rewrite flush"},{label:"Transient Delete",cmd:"transient delete --all"},{label:"Search Replace",cmd:"search-replace '' ''"}];function Qs(e){return`
        <div class="kp-wpcli">
            <div class="kp-log-controls" style="flex-wrap:wrap;gap:6px">
                ${to.map(t=>`
                   <button class="uk-button kp-btn-ghost kp-btn-sm"
                        data-action="wpcli-quick"
                        data-cmd="${t.cmd}">
                        ${t.label}
                    </button>`).join("")}
            </div>
            
            <p class="kp-muted uk-text-small uk-margin-small-top">
                <span uk-icon="icon: info; ratio: 0.75"></span>
                WP-CLI <span class="kp-mono">db</span> subcommands are not available for security.
            </p>

            <div class="uk-flex uk-flex-middle uk-margin-small-top" style="gap:8px">
                <span class="kp-mono" style="color:var(--kp-cyan);font-size:0.85rem;flex-shrink:0">wp&gt;</span>
                <input
                    class="uk-input kp-input"
                    id="wpcli-input"
                    type="text"
                    placeholder="plugin list --status=active"
                    style="height:38px;font-family:'JetBrains Mono',monospace;font-size:0.85rem"
                    autocomplete="off"
                    spellcheck="false">
                <button class="uk-button kp-btn-primary kp-btn-sm" id="wpcli-run">
                    <span uk-icon="play"></span> Run
                </button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="wpcli-clear">
                    <span uk-icon="trash"></span> Clear
                </button>
            </div>

            <div class="kp-log-header uk-margin-small-top">
                <div class="kp-log-dot kp-log-dot-red"></div>
                <div class="kp-log-dot kp-log-dot-yellow"></div>
                <div class="kp-log-dot kp-log-dot-green"></div>
                <span style="font-size:0.72rem;color:var(--kp-text-dim);margin-left:8px" id="wpcli-status">Ready</span>
            </div>
            <div class="kp-log-wrap" id="wpcli-output" style="height:500px"></div>
        </div>`}function Zs(e,t){let s=e.querySelector("#wpcli-output"),a=e.querySelector("#wpcli-input"),n=e.querySelector("#wpcli-run"),o=e.querySelector("#wpcli-clear"),i=e.querySelector("#wpcli-status"),l=[],r=-1;function d(m,k=""){m.split(`
`).forEach(h=>{if(!h)return;let g=document.createElement("div");k?g.className=k:g.className=h.match(/error|fatal|critical/i)?"kp-log-line-err":h.match(/warning|warn/i)?"kp-log-line-warn":h.match(/success|done\]/i)?"kp-log-line-info":"",g.textContent=h,s.appendChild(g)}),s.scrollTop=s.scrollHeight}function u(m){if(m=m.trim(),!m)return;l.unshift(m),r=-1,d(`wp> ${m}`,"kp-log-line-info"),a.disabled=!0,n.disabled=!0,i&&(i.textContent="Running...");let k=location.protocol==="https:"?"wss":"ws",h=new WebSocket(`${k}://${location.host}/api/sites/${t}/wpcli`);h.onopen=()=>{h.send(JSON.stringify({command:m}))},h.onmessage=g=>{let f=g.data;if(f.trim()==="[done]"){h.close();return}if(f.startsWith("[info]")){d(f,"kp-muted");return}if(f.startsWith("[error]")){d(f,"kp-log-line-err");return}d(f)},h.onerror=()=>{d("[error] WebSocket connection failed","kp-log-line-err")},h.onclose=()=>{a.disabled=!1,n.disabled=!1,i&&(i.textContent="Ready"),a.focus()}}n.addEventListener("click",()=>{u(a.value),a.value=""}),a.addEventListener("keydown",m=>{if(m.key==="Enter"){u(a.value),a.value="",r=-1;return}if(m.key==="ArrowUp"){m.preventDefault(),r<l.length-1&&(r++,a.value=l[r]);return}m.key==="ArrowDown"&&(m.preventDefault(),r>0?(r--,a.value=l[r]):(r=-1,a.value=""))}),e.querySelectorAll('[data-action="wpcli-quick"]').forEach(m=>{m.addEventListener("click",()=>{let k=m.dataset.cmd;if(k.startsWith("search-replace")){a.value=k,a.focus();let h=k.indexOf("''")+1;a.setSelectionRange(h,h);return}u(k)})}),o.addEventListener("click",()=>{s.innerHTML=""});let c=y.go.bind(y);y.go=function(m,k={}){return c(m,k)},a.focus()}var pe=null,W=null;function ea(e,t,s){let a=e.querySelector("#kp-site-pills"),n=e.querySelector("#kp-site-switcher"),o=e.querySelector("#kp-manage-pill"),i=e.querySelector("#kp-manage-dropdown");if(!a||!n)return;let l=["#kp-sec-pills","#kp-waf-pills","#kp-db-pills"].map(m=>e.querySelector(m)).filter(Boolean),r=m=>[...n.children].findIndex(k=>k.contains(m));function d(m,k=!1){UIkit.switcher(n).show(m),a.querySelectorAll(":scope > li[data-pill]").forEach(f=>f.classList.remove("kp-pill-active")),k?(o?.classList.add("kp-pill-active"),i?.querySelectorAll("a[data-switcher]").forEach(f=>{f.classList.toggle("kp-dd-active",parseInt(f.dataset.switcher,10)===m)})):(o?.classList.remove("kp-pill-active"),i?.querySelectorAll("a[data-switcher]").forEach(f=>f.classList.remove("kp-dd-active")));let g=l.find(f=>r(f)===m)?.querySelector(":scope > li.kp-pill-active")?.dataset.tab;history.replaceState(null,"",g?`#site-detail/${t}/${g}`:`#site-detail/${t}`)}a.querySelectorAll(":scope > li[data-pill] > a").forEach(m=>{m.addEventListener("click",k=>{k.preventDefault();let h=parseInt(m.closest("li").dataset.pill,10);d(h,!1)})}),o?.querySelector(".kp-pill-dropdown-btn")?.addEventListener("click",m=>{m.stopPropagation(),i.hidden=!i.hidden,o.classList.toggle("kp-pill-active",!i.hidden)}),i?.querySelectorAll("a[data-switcher]").forEach(m=>{m.addEventListener("click",k=>{k.preventDefault(),i.hidden=!0,d(parseInt(m.dataset.switcher,10),!0)})}),document.addEventListener("click",m=>{i&&!o.contains(m.target)&&(i.hidden=!0)},{capture:!0});let c=s?l.find(m=>[...m.children].some(k=>k.dataset.tab===s)):null;c?d(r(c),!0):UIkit.switcher(n).show(1)}function so(){return`
        <div class="kp-card uk-padding uk-margin-top">
            <h3 class="kp-view-title uk-margin-bottom">Upstream Routes</h3>
            <p class="kp-muted uk-text-small uk-margin-bottom">
                Each domain maps to one or more upstream URLs. Multiple upstreams for the same
                domain are load-balanced via round-robin.
            </p>
            <div id="rp-routes-list"></div>
            <button class="uk-button kp-btn-ghost uk-margin-small-top" id="rp-add-row">
                <span uk-icon="plus"></span> Add Route
            </button>
            <div class="uk-flex uk-flex-right uk-margin-top">
                <button class="uk-button kp-btn-primary" id="rp-save-btn">
                    <span uk-icon="check"></span> Save Routes
                </button>
            </div>
        </div>`}function Tt(e="",t="",s=!1){return`
        <div class="rp-route-row uk-flex uk-flex-middle uk-margin-small-bottom" style="gap:8px">
            <span>Host:</span><input class="uk-input kp-input" style="flex:1" placeholder="example.com" value="${e}" data-field="domain">
            <span>Upstream:</span><input class="uk-input kp-input" style="flex:2" placeholder="https://10.0.0.1:8080" value="${t}" data-field="upstream">
            <label style="white-space:nowrap;font-size:0.75rem;color:var(--kp-text-dim)" title="Send incoming domain as Host header instead of upstream hostname">
                <input type="checkbox" class="uk-checkbox" data-field="pass_host" ${s?"checked":""}> Pass Host
            </label>
            <button class="uk-button kp-btn-ghost kp-btn-sm rp-remove-row" uk-tooltip="Remove"><span uk-icon="trash"></span></button>
        </div>`}async function ao(e){let t=document.getElementById("rp-routes-list");if(t)try{let s=await b.get(`/sites/${e}/rp-routes`);t.innerHTML=s.length?s.map(a=>Tt(a.Domain,a.Upstream,a.PassHost)).join(""):Tt()}catch(s){p.error("Failed to load routes: "+s.message)}}function no(e,t){e.addEventListener("click",async s=>{if(s.target.closest("#rp-add-row")){document.getElementById("rp-routes-list").insertAdjacentHTML("beforeend",Tt());return}if(s.target.closest(".rp-remove-row")){s.target.closest(".rp-route-row").remove();return}if(!s.target.closest("#rp-save-btn"))return;let a=s.target.closest("#rp-save-btn"),n=a.innerHTML;a.disabled=!0,a.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let o=[...document.querySelectorAll(".rp-route-row")].map(i=>({Domain:i.querySelector('[data-field="domain"]').value.trim(),Upstream:i.querySelector('[data-field="upstream"]').value.trim(),PassHost:i.querySelector('[data-field="pass_host"]').checked})).filter(i=>i.Domain&&i.Upstream);try{await b.put(`/sites/${t}/rp-routes`,o),p.success("Routes saved")}catch(i){p.error(i.message)}finally{a.disabled=!1,a.innerHTML=n}},{signal:pe.signal})}function oo(e){return e.endsWith("-nginx")?"world":e.endsWith("-php")?"code":e.endsWith("-db")?"database":e.endsWith("-redis")?"server":e.endsWith("-varnish")?"grid":e.endsWith("-pma")?"table":e.endsWith("-app")?"laptop":"bolt"}function ta(e){let t=e.split("-").pop();return{nginx:"Nginx",php:"PHP-FPM",db:"MariaDB",redis:"Redis",varnish:"Varnish",pma:"phpMyAdmin",app:"App"}[t]??t}function sa(e){switch(e){case"running":return"var(--kp-success)";case"exited":case"stopped":case"dead":return"var(--kp-danger)";case"created":case"configured":case"initialized":case"paused":case"stopping":case"restarting":return"var(--kp-warning)";default:return"var(--kp-text-dim)"}}function io(e){return!e||!e.length?"":e.filter(t=>!t.name.endsWith("-infra")).map(t=>`
            <span class="kp-health-badge"
                data-container="${v(t.name)}"
                title="Restart the Container"
                style="cursor:pointer;color:${sa(t.status)}">
                <span uk-icon="icon: ${oo(t.name)}; ratio: 1.1"></span>
                <span class="kp-health-badge-label">${v(ta(t.name))}</span>
            </span>
        `).join("")}function lo(e,t){W&&(W.close(),W=null);let s=document.getElementById("sd-health-badges");if(!s)return;let a=location.protocol==="https:"?"wss":"ws";W=new WebSocket(`${a}://${location.host}/api/sites/${t}/health/stream`);let n=[],o=()=>{s.innerHTML=io(n),s.querySelectorAll(".kp-health-badge").forEach(i=>{i.addEventListener("click",async()=>{i.style.color=sa("restarting");let l=i.dataset.container,r=l.split("-").pop();try{await b.post(`/sites/${t}/containers/${r}/restart`),p.success(`${ta(l)} restarted`)}catch(d){p.error(d.message)}o()})})};W.onmessage=i=>{try{n=JSON.parse(i.data),o()}catch{}},W.onerror=()=>{},W.onclose=()=>{W=null}}async function aa(e,{id:t,tab:s}){let[{site:a,domains:n,sftp:o},i,l]=await Promise.all([b.get(`/sites/${t}`),b.get("/sites"),b.get(`/sites/${t}/configs`)]),r=Array.isArray(i)?i:[],d=r.filter(f=>f.ID===a.ParentID||f.ParentID===a.ID),u=a.SiteType===1||a.SiteType===2,c=a.SiteType===6,m=[1,2,4,5,7].includes(a.SiteType),k=[1,2,4,5,7].includes(a.SiteType);if(pe&&pe.abort(),pe=new AbortController,e.innerHTML=`
        <div class="kp-view-header">
            <div class="uk-flex uk-flex-middle" style="gap:12px">
                <button class="kp-btn-icon" id="sd-back"><span uk-icon="arrow-left"></span></button>
                <div class="kp-site-nav-wrap">
                    <select id="sd-site-nav" class="uk-select kp-select">
                        ${r.map(f=>`<option value="${f.ID}" ${f.ID===a.ID?"selected":""}>${f.Name}</option>`).join("")}
                    </select>
                    <span class="kp-site-nav-arrow">&#9660;</span>
                </div>
                ${c?"":K(a.SiteStatus)}
            </div>
            <div class="uk-flex" style="gap:8px;flex-wrap:wrap">
                ${c?"":`
                ${a.SiteStatus===1?`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="stop" data-id="${t}" uk-tooltip="Stop the Site"><span uk-icon="ban"></span></button>`:`<button class="uk-button kp-btn-ghost kp-btn-sm" data-action="start" data-id="${t}" uk-tooltip="Start the Site"><span uk-icon="play"></span></button>`}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="restart" data-id="${t}" uk-tooltip="Restart the Site"><span uk-icon="refresh"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="flush" data-id="${t}" uk-tooltip="Flush the Caches"><span uk-icon="bolt"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm kp-btn-recreate" id="sd-recreate" uk-tooltip="Recreate &amp; Update the Pod"><span uk-icon="history"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-clone" uk-tooltip="Clone the Site"><span uk-icon="move"></span></button>
                `}
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-rename" uk-tooltip="Rename the Site"><span uk-icon="tag"></span></button>
                <button class="uk-button kp-btn-ghost kp-btn-sm" id="sd-edit" uk-tooltip="Edit the Site"><span uk-icon="pencil"></span></button>
            </div>
        </div>
 
        ${c?`
        <!-- tab pills (reverse proxy) -->
        <ul class="kp-tab-pills" id="kp-site-pills">
            <li data-pill="0"><a href="#">Routes</a></li>
            <li id="kp-manage-pill">
                <a href="javascript:void(0);" class="kp-pill-dropdown-btn">
                    Manage <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                </a>
                <div class="kp-pill-dropdown" id="kp-manage-dropdown" hidden>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="3"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="4"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="5"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="2"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${so()}</li>
            <li>${ut(t,a.SiteType)}</li>
            <li>${xt(t,a.SiteType)}</li>
            <li>${ve(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${ht()}</li>
        </ul>
        `:`
        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-site-pills">
            <li data-pill="0"><a href="#">Overview</a></li>
            <li id="kp-manage-pill">
                <a href="javascript:void(0);" class="kp-pill-dropdown-btn">
                    Manage <span uk-icon="icon: chevron-down; ratio: 0.8"></span>
                </a>
                <div class="kp-pill-dropdown" id="kp-manage-dropdown" hidden>
                    <div class="kp-pill-dropdown-section">Config</div>
                    <a href="#" data-switcher="2"><span uk-icon="icon: settings; ratio: 0.85"></span> Nginx</a>
                    ${u?'<a href="#" data-switcher="3"><span uk-icon="icon: code; ratio: 0.85"></span> PHP</a>':""}
                    <a href="#" data-switcher="${u?4:3}"><span uk-icon="icon: database; ratio: 0.85"></span> MariaDB</a>
                    <a href="#" data-switcher="${u?5:4}"><span uk-icon="icon: server; ratio: 0.85"></span> Redis</a>
                    <a href="#" data-switcher="${u?6:5}"><span uk-icon="icon: world; ratio: 0.85"></span> Varnish</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Security</div>
                    <a href="#" data-switcher="${u?8:7}"><span uk-icon="icon: lock; ratio: 0.85"></span> Security</a>
                    <a href="#" data-switcher="${u?9:8}"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> WAF</a>
                    <a href="#" data-switcher="${u?10:9}"><span uk-icon="icon: user; ratio: 0.85"></span> Basic Auth</a>
                    <hr>
                    <div class="kp-pill-dropdown-section">Tools</div>
                    ${a.SiteType===1?`<a href="#" data-switcher="${u?11:10}"><span uk-icon="icon: file-text; ratio: 0.85"></span> WP-CLI</a>`:""}
                    <a href="#" data-switcher="${a.SiteType===1?u?12:11:u?11:10}"><span uk-icon="icon: history; ratio: 0.85"></span> Backups</a>
                    ${k?'<a href="#" data-switcher="database"><span uk-icon="icon: table; ratio: 0.85"></span> Database</a>':""}
                    ${m?`<a href="#" data-switcher="${a.SiteType===1?u?13:12:u?12:11}"><span uk-icon="icon: clock; ratio: 0.85"></span> Crons</a>`:""}
                    <a href="#" data-switcher="${(a.SiteType===1?u?14:13:u?13:12)-(m?0:1)}"><span uk-icon="icon: forward; ratio: 0.85"></span> Redirects</a>
                    <a href="#" data-switcher="files"><span uk-icon="icon: folder; ratio: 0.85"></span> Files</a>
                </div>
            </li>
            <li data-pill="1"><a href="#">Stats</a></li>
            <li data-pill="${u?7:6}"><a href="#">Logs</a></li>
        </ul>

        <!-- switcher panels (driven by pills above) -->
        <ul class="uk-switcher" id="kp-site-switcher">
            <li>${js(a,n??[],o,a.ParentID??0,r.find(f=>f.ID===a.ParentID)?.Name??null,d)}</li>
            <li>${ut(t,a.SiteType)}</li>
            <li>${Se(t,1,l[1])}</li>
            ${u?`<li>${Se(t,2,l[2])}</li>`:""}
            <li>${Se(t,3,l[3])}</li>
            <li>${Se(t,4,l[4])}</li>
            <li>${xs(t,l[5])}</li>
            <li>${xt(t,a.SiteType)}</li>
            <li>${ve(t)}</li>
            <li id="waf-tab-panel"></li>
            <li>${ht()}</li>
            ${a.SiteType===1?`<li>${Qs(t)}</li>`:""}
            <li>${ys(t)}</li>
            ${m?`<li>${Es(t)}</li>`:""}
            <li>${Ks()}</li>
            ${k?`<li>${Bs(t,a.SiteType)}</li>`:""}
            <li>${Hs(t)}</li>
        </ul>`}`,document.getElementById("sd-back").addEventListener("click",()=>y.go("sites")),document.getElementById("sd-edit").addEventListener("click",()=>gs(a)),document.getElementById("sd-rename").addEventListener("click",async()=>{let f=await es(a.Name);if(!(!f||f===a.Name)){S("Renaming Site","Moving the database, files, and pod \u2014 this may take a few minutes...");try{await b.post(`/sites/${t}/rename`,{name:f},18e5),x(),p.success(`Site renamed to '${f}'`),y.go("site-detail",{id:t})}catch(w){x(),p.error(w.message)}}}),document.getElementById("sd-site-nav")?.addEventListener("change",f=>{y.go("site-detail",{id:f.target.value})}),We(e),Fe(e,s),Y(e),Us(e,t),Ys(e,t,pe.signal),Lt(t,s),c){no(e,t),ao(t),mt(e,t,a.SiteType),kt(t,a.SiteType),ft(e,t),ye(t),ea(e,t,s);return}document.getElementById("sd-recreate").addEventListener("click",async()=>{S("Recreating Pod","Recreating containers for this site...");try{await b.post(`/sites/${t}/recreate`,{prune:!0}),x(),p.success("Pod recreated"),y.go("site-detail",{id:t})}catch(f){x(),p.error(f.message)}}),document.getElementById("sd-clone")?.addEventListener("click",async()=>{let f=await Zt(a.Name);if(f){S("Cloning Site","Copying files and database \u2014 this may take a few minutes...");try{await b.post(`/sites/${t}/clone`,f,6e5),x(),p.success(`Site cloned as '${f.name}'`),y.go("sites")}catch(w){x(),p.error(w.message)}}}),Ss(e,t,pe.signal),Os(e,t),a.SiteType===1&&Zs(e,t),Vs(e,t,a,d),ws(e,t),re(e,t),m&&(Ts(e,t),ze(e,t)),Gs(e,t),Xs(t);let h=e.querySelector("#kp-site-switcher"),g=e.querySelector('a[data-switcher="files"]');if(h&&g&&(g.dataset.switcher=String(h.children.length-1)),Ns(e,t),D(t),k){let f=e.querySelector('a[data-switcher="database"]'),w=e.querySelector("#dbtools-panel");h&&f&&w&&(f.dataset.switcher=String([...h.children].findIndex(T=>T.contains(w)))),As(e,t),_s(e,s)}lo(e,t),mt(e,t,a.SiteType),kt(t,a.SiteType),ea(e,t,s),ft(e,t),ye(t),Ws(n??[])}var Yt=hn(an());async function ot(e){let t=document.getElementById("totp-qr-img"),s=document.getElementById("totp-qr-wrap");if(!t||!s)return;if(s.querySelectorAll(".totp-uri-text").forEach(n=>n.remove()),typeof Yt.default<"u")try{let n=await new Promise((o,i)=>{Yt.default.toDataURL(e,{width:220,margin:2},(l,r)=>{l?i(l):o(r)})});t.src=n,t.style.display="";return}catch{}let a=document.createElement("p");a.className="totp-uri-text kp-muted uk-text-small",a.style.wordBreak="break-all",a.textContent=e,s.appendChild(a)}function it(e){document.getElementById("kp-backup-codes-modal")?.remove();let s=`
        <div id="kp-backup-codes-modal" uk-modal="bg-close:false;esc-close:false">
            <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:480px">
                <h3 class="uk-modal-title" style="color:var(--kp-yellow,#f0b429)">
                    <span uk-icon="warning"></span>&nbsp;Save Your Backup Codes
                </h3>
                <p class="kp-muted uk-text-small uk-margin-small-bottom">
                    These codes let you access your account if you lose your authenticator.
                    Each code works <strong>once only</strong>. Keep them somewhere safe.
                </p>
                <div class="kp-backup-codes-grid uk-margin-small">${e.map(n=>`<code class="kp-backup-code">${n}</code>`).join("")}</div>
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    These codes will <strong>not</strong> be shown again.
                </p>
                <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                    <button id="kp-backup-copy-btn" class="uk-button kp-btn-ghost">Copy All</button>
                    <button id="kp-backup-done-btn" class="uk-button kp-btn-primary">I've Saved These</button>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",s);let a=UIkit.modal("#kp-backup-codes-modal");a.show(),document.getElementById("kp-backup-copy-btn").addEventListener("click",()=>{let n=e.join(`
`),o=document.getElementById("kp-backup-copy-btn");if(navigator.clipboard)navigator.clipboard.writeText(n).then(()=>{o.textContent="Copied!"});else{let i=document.createElement("textarea");i.value=n,i.style.cssText="position:fixed;opacity:0",document.body.appendChild(i),i.select();try{document.execCommand("copy"),o.textContent="Copied!"}catch{}i.remove()}}),document.getElementById("kp-backup-done-btn").addEventListener("click",()=>{a.hide(),document.getElementById("kp-backup-codes-modal")?.remove(),y.go("users")})}function nn(e){document.body.insertAdjacentHTML("beforeend",`
        <div id="kp-create-user-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">New User</h3>
                <form id="create-user-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">First Name</label>
                            <input class="uk-input kp-input" name="fname" type="text" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Last Name</label>
                            <input class="uk-input kp-input" name="lname" type="text" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label">Username</label>
                            <input class="uk-input kp-input" name="uname" type="text" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Email</label>
                            <input class="uk-input kp-input" name="email" type="email" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Phone</label>
                            <input class="uk-input kp-input" name="phone" type="tel" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label uk-margin-small-bottom">Notifications</label>
                            <div class="uk-flex" style="gap:24px">
                                <label><input class="uk-checkbox" type="checkbox" name="notify_email"> &nbsp;Email</label>
                                <label><input class="uk-checkbox" type="checkbox" name="notify_sms"> &nbsp;SMS</label>
                            </div>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Password</label>
                            <input class="uk-input kp-input" name="password" type="password" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Role</label>
                            <select class="uk-select kp-select" name="role">
                                <option value="50">Manager</option>
                                <option value="99">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Create User</button>
                    </div>
                </form>

                <div id="cu-totp-section" style="display:none">
                    <hr class="uk-divider-muted uk-margin-top">
                    <h4 class="uk-margin-small-bottom kp-view-title">Two-Factor Authentication</h4>
                    <div class="uk-flex uk-flex-middle" style="gap:12px">
                        <span class="kp-badge kp-badge-manager" style="font-size:0.75rem">Disabled</span>
                        <button id="cu-totp-setup-btn" class="uk-button kp-btn-primary kp-btn-sm">Enable TOTP</button>
                    </div>
                    <div id="totp-setup-area" style="display:none" class="uk-margin-top">
                        <p class="kp-muted uk-text-small">Scan the QR code with your authenticator app, then enter the 6-digit code to activate.</p>
                        <div class="uk-text-center uk-margin-small" id="totp-qr-wrap">
                            <img id="totp-qr-img" style="display:none;width:220px;height:220px;border-radius:6px" alt="TOTP QR Code">
                        </div>
                        <p class="kp-muted uk-text-small uk-text-center uk-margin-remove-top">
                            Manual key: <code id="totp-secret-text" style="word-break:break-all"></code>
                        </p>
                        <div class="uk-flex" style="gap:8px;margin-top:8px">
                            <input class="uk-input kp-input" id="totp-confirm-code" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" style="letter-spacing:0.2em">
                            <button id="cu-totp-confirm-btn" class="uk-button kp-btn-primary" style="white-space:nowrap">Confirm &amp; Enable</button>
                        </div>
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top">
                        <button id="cu-totp-skip-btn" class="uk-button kp-btn-ghost">Skip for now</button>
                    </div>
                </div>
            </div>
        </div>`);let s=UIkit.modal("#kp-create-user-modal");s.show(),document.getElementById("create-user-form").addEventListener("submit",async a=>{a.preventDefault();let n=a.target.querySelector('[type="submit"]'),o=n.innerHTML;n.disabled=!0,n.innerHTML='<div uk-spinner="ratio: 0.6"></div> Creating...';let i=new FormData(a.target),l={fname:i.get("fname").trim(),lname:i.get("lname").trim(),uname:i.get("uname").trim(),email:i.get("email").trim(),phone:i.get("phone").trim(),password:i.get("password"),role:parseInt(i.get("role")),notify_email:i.get("notify_email")==="on",notify_sms:i.get("notify_sms")==="on"};try{let r=X(await b.post("/users",l));document.getElementById("users-table-body").insertAdjacentHTML("beforeend",lt(r)),p.success(`User '${r.uname}' created`),document.getElementById("create-user-form").style.display="none",document.getElementById("cu-totp-section").style.display="",si(r.id,s)}catch(r){p.error(r.message),n.disabled=!1,n.innerHTML=o}}),document.getElementById("kp-create-user-modal").addEventListener("hidden",()=>document.getElementById("kp-create-user-modal")?.remove())}function si(e,t){let s=()=>{t.hide(),document.getElementById("kp-create-user-modal")?.remove(),y.go("users")};document.getElementById("cu-totp-skip-btn").addEventListener("click",s),document.getElementById("cu-totp-setup-btn").addEventListener("click",async()=>{let a=document.getElementById("cu-totp-setup-btn");a.disabled=!0,a.textContent="Setting up\u2026";try{let n=await b.post(`/users/${e}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=n.secret,document.getElementById("totp-setup-area").style.display="",document.getElementById("cu-totp-skip-btn").style.display="none",await ot(n.uri)}catch(n){p.error(n.message),a.disabled=!1,a.textContent="Enable TOTP"}}),document.getElementById("cu-totp-confirm-btn").addEventListener("click",async()=>{let a=document.getElementById("totp-confirm-code").value.trim();if(a.length!==6){p.error("Enter a 6-digit code");return}let n=document.getElementById("cu-totp-confirm-btn");n.disabled=!0;try{let o=await b.post(`/users/${e}/totp/confirm`,{code:a});t.hide(),document.getElementById("kp-create-user-modal")?.remove(),p.success("TOTP enabled"),o.backup_codes?.length?it(o.backup_codes):y.go("users")}catch(o){p.error(o.message),n.disabled=!1}})}async function on(e,t){document.getElementById("kp-edit-user-modal")?.remove();let s;try{s=X(await b.get(`/users/${t}`))}catch(c){p.error(c.message);return}let a=window.KP?.user?.role===99,n=Number(t)===Number(window.KP?.user?.id),o=s.node_uid>0,i=`
        <div id="kp-edit-user-modal" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body uk-width-large">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="kp-view-title">Edit User \u2014 ${s.uname}</h3>
                ${o?'<p class="kp-muted uk-text-small uk-margin-small-top">Synced from the parent node \u2014 changes here are overwritten the next time this user signs in from the parent.</p>':""}
                <form id="edit-user-form" class="uk-form-stacked uk-margin-top">
                    <div class="uk-grid-small" uk-grid>
                        ${a?`
                        <div class="uk-width-1-1">
                            <label class="kp-label">Username</label>
                            <input class="uk-input kp-input" name="uname" type="text" value="${v(s.uname)}" autocomplete="off">
                        </div>`:""}
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">First Name</label>
                            <input class="uk-input kp-input" name="fname" type="text" value="${v(s.fname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Last Name</label>
                            <input class="uk-input kp-input" name="lname" type="text" value="${v(s.lname)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Email</label>
                            <input class="uk-input kp-input" name="email" type="email" value="${v(s.email)}" required>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Phone</label>
                            <input class="uk-input kp-input" name="phone" type="tel" value="${v(s.phone||"")}" required>
                        </div>
                        <div class="uk-width-1-1">
                            <label class="kp-label uk-margin-small-bottom">Notifications</label>
                            <div class="uk-flex" style="gap:24px">
                                <label><input class="uk-checkbox" type="checkbox" name="notify_email" ${s.notify_email?"checked":""}> &nbsp;Email</label>
                                <label><input class="uk-checkbox" type="checkbox" name="notify_sms" ${s.notify_sms?"checked":""}> &nbsp;SMS</label>
                            </div>
                        </div>
                        ${a?`
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">Role</label>
                            <select class="uk-select kp-select" name="role">
                                <option value="50" ${s.role===50?"selected":""}>Manager</option>
                                <option value="99" ${s.role===99?"selected":""}>Admin</option>
                            </select>
                        </div>`:""}
                        ${o?"":`
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">New Password</label>
                            <input class="uk-input kp-input" name="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" uk-tooltip="leave blank to keep">
                        </div>`}
                        ${n&&!o?`
                        <div class="uk-margin" id="edit-user-current-pw">
                            <label class="uk-form-label">Current Password</label>
                            <input class="uk-input kp-input" name="current_password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" uk-tooltip="required when changing your own password">
                        </div>`:""}                      
                    </div>
                    <div class="uk-flex uk-flex-right uk-margin-top" style="gap:8px">
                        <button type="button" class="uk-button kp-btn-ghost uk-modal-close">Cancel</button>
                        <button type="submit" class="uk-button kp-btn-primary">Save Changes</button>
                    </div>
                </form>

                <hr class="uk-divider-muted uk-margin-top" ${o?'style="display:none"':""}>

                <div id="totp-section" ${o?'style="display:none"':""}>
                    <h4 class="uk-margin-small-bottom kp-view-title">Two-Factor Authentication</h4>
                    ${s.totp_enabled?`<div class="uk-flex uk-flex-middle" style="gap:12px">
                            <span class="kp-badge kp-badge-admin" style="font-size:0.75rem">Enabled</span>
                            <button id="totp-disable-btn" class="uk-button kp-btn-secondary kp-btn-sm">Disable TOTP</button>
                           </div>
                           ${n?`<div class="uk-flex uk-margin-small-top" style="gap:8px">
                            <input class="uk-input kp-input" id="totp-disable-password" type="password" placeholder="Current password">
                            <input class="uk-input kp-input" id="totp-disable-code" type="text" inputmode="numeric" placeholder="TOTP or backup code">
                           </div>`:""}`:`<div class="uk-flex uk-flex-middle" style="gap:12px">
                            <span class="kp-badge kp-badge-manager" style="font-size:0.75rem">Disabled</span>
                            <button id="totp-setup-btn" class="uk-button kp-btn-primary kp-btn-sm">Enable TOTP</button>
                           </div>`}
                    <div id="totp-setup-area" style="display:none" class="uk-margin-top">
                        <p class="kp-muted uk-text-small">Scan the QR code with your authenticator app, then enter the 6-digit code to activate.</p>
                        <div class="uk-text-center uk-margin-small" id="totp-qr-wrap">
                            <img id="totp-qr-img" style="display:none;width:220px;height:220px;border-radius:6px" alt="TOTP QR Code">
                        </div>
                        <p class="kp-muted uk-text-small uk-text-center uk-margin-remove-top">
                            Manual key: <code id="totp-secret-text" style="word-break:break-all"></code>
                        </p>
                        <div class="uk-flex" style="gap:8px;margin-top:8px">
                            <input class="uk-input kp-input" id="totp-confirm-code" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" style="letter-spacing:0.2em">
                            <button id="totp-confirm-btn" class="uk-button kp-btn-primary" style="white-space:nowrap">Confirm &amp; Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",i);let l=UIkit.modal("#kp-edit-user-modal");l.show(),document.getElementById("edit-user-form").addEventListener("submit",async c=>{c.preventDefault();let m=c.target.querySelector('[type="submit"]'),k=m.innerHTML;m.disabled=!0,m.innerHTML='<div uk-spinner="ratio: 0.6"></div> Saving...';let h=new FormData(c.target),g={fname:h.get("fname").trim(),lname:h.get("lname").trim(),email:h.get("email").trim(),phone:h.get("phone").trim(),notify_email:h.get("notify_email")==="on",notify_sms:h.get("notify_sms")==="on"};if(a){g.role=parseInt(h.get("role"));let w=h.get("uname");w&&(g.uname=w.trim())}let f=h.get("password");f&&(g.password=f),f&&n&&(g.current_password=h.get("current_password"));try{await b.put(`/users/${t}`,g),l.hide(),document.getElementById("kp-edit-user-modal")?.remove(),p.success("User updated"),y.go("users")}catch(w){p.error(w.message),m.disabled=!1,m.innerHTML=k}});let r=document.getElementById("totp-setup-btn");r&&r.addEventListener("click",async()=>{r.disabled=!0,r.textContent="Setting up\u2026";try{let c=await b.post(`/users/${t}/totp/setup`,{});document.getElementById("totp-secret-text").textContent=c.secret,document.getElementById("totp-setup-area").style.display="",await ot(c.uri)}catch(c){p.error(c.message),r.disabled=!1,r.textContent="Enable TOTP"}});let d=document.getElementById("totp-confirm-btn");d&&d.addEventListener("click",async()=>{let c=document.getElementById("totp-confirm-code").value.trim();if(c.length!==6){p.error("Enter a 6-digit code");return}d.disabled=!0;try{let m=await b.post(`/users/${t}/totp/confirm`,{code:c});l.hide(),document.getElementById("kp-edit-user-modal")?.remove(),p.success("TOTP enabled"),m.backup_codes?.length?it(m.backup_codes):y.go("users")}catch(m){p.error(m.message),d.disabled=!1}});let u=document.getElementById("totp-disable-btn");u&&u.addEventListener("click",async()=>{u.disabled=!0;try{await b.delete(`/users/${t}/totp`,n?{current_password:document.getElementById("totp-disable-password").value,code:document.getElementById("totp-disable-code").value.trim()}:void 0),p.success("TOTP disabled"),l.hide(),document.getElementById("kp-edit-user-modal")?.remove(),y.go("users")}catch(c){p.error(c.message),u.disabled=!1}}),document.getElementById("kp-edit-user-modal").addEventListener("hidden",()=>document.getElementById("kp-edit-user-modal")?.remove())}async function ln(e){if(!M()){e.innerHTML=_("Access denied");return}let t=await b.get("/users");e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Users</h1>
            <button class="uk-button kp-btn-primary" id="users-new-btn">
                <span uk-icon="plus"></span> New User
            </button>
        </div>
        <div class="kp-table-wrap">
            <div class="uk-overflow-auto">
            <table class="uk-table uk-table-divider uk-table-middle uk-margin-remove">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th class="uk-text-center">2FA</th>
                        <th class="uk-text-center">Notify</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="users-table-body">
                    ${t.map(s=>lt(X(s))).join("")}
                </tbody>
            </table>
            </div>
        </div>`,document.getElementById("users-new-btn").addEventListener("click",()=>nn(e)),ai(e)}function lt(e){let t=e.role===99?'<span class="kp-badge kp-badge-admin">Admin</span>':'<span class="kp-badge kp-badge-manager">Manager</span>',s=[e.notify_email?'<span uk-icon="icon: mail; ratio: 0.85" uk-tooltip="Email notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: mail; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="Email notifications off"></span>',e.notify_sms?'<span uk-icon="icon: receiver; ratio: 0.85" uk-tooltip="SMS notifications on" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: receiver; ratio: 0.85" style="color:var(--kp-text-dim)" uk-tooltip="SMS notifications off"></span>'].join(" ");return`<tr data-user-id="${e.id}">
        <td><strong>${v(e.fname)} ${v(e.lname)}</strong></td>
        <td><span style="font-family:monospace">${v(e.uname)}</span></td>
        <td>${v(e.email)}</td>
        <td>${t}${e.node_uid>0?' <span class="kp-badge kp-badge-manager" uk-tooltip="Synced from the parent node">Synced</span>':""}${e.blocked?' <span class="kp-status kp-status-error">Blocked</span>':""}</td>
        <td class="uk-text-center">${e.totp_enabled?'<span uk-icon="icon: check; ratio: 0.9" style="color:var(--kp-success)"></span>':'<span uk-icon="icon: close; ratio: 0.9" style="color:var(--kp-text-dim)"></span>'}</td>
        <td class="uk-text-center">${s}</td>
        <td><span class="kp-muted">${v(e.created)}</span></td>
        <td>
            <div class="uk-flex" style="gap:6px;justify-content:flex-end">
                ${e.node_uid>0&&e.id!==window.KP.user.id?`
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="toggle-block-user" data-uid="${e.id}" data-blocked="${e.blocked?1:0}" uk-tooltip="${e.blocked?"Unblock":"Block"} the User">
                    <span uk-icon="icon: ${e.blocked?"unlock":"lock"};"></span>
                </button>`:""}
                <button class="uk-button kp-btn-ghost kp-btn-sm" data-action="edit-user" data-uid="${e.id}" title="Edit" uk-tooltip="Edit the User">
                    <span uk-icon="icon: pencil;"></span>
                </button>
                <button class="uk-button kp-btn-secondary kp-btn-sm" data-action="delete-user" data-uid="${e.id}" title="Delete" uk-tooltip="Delete the User">
                    <span uk-icon="icon: trash;"></span>
                </button>
            </div>
        </td>
    </tr>`}function ai(e){e.addEventListener("click",async t=>{let s=t.target.closest('[data-action="delete-user"]');if(!(!s||!await E("Delete User","Delete this user? This cannot be undone.")))try{await b.delete(`/users/${s.dataset.uid}`),s.closest("tr").remove(),p.success("User deleted")}catch(n){p.error(n.message)}}),e.addEventListener("click",async t=>{let s=t.target.closest('[data-action="edit-user"]');s&&on(e,s.dataset.uid)}),e.addEventListener("click",async t=>{let s=t.target.closest('[data-action="toggle-block-user"]');if(!s)return;let a=s.dataset.blocked!=="1";if(await E(a?"Block User":"Unblock User",a?"Block this synced user? They are signed out here and can no longer sign in to this node from the parent.":"Unblock this synced user?"))try{await b.put(`/users/${s.dataset.uid}/blocked`,{blocked:a});let o=X(await b.get(`/users/${s.dataset.uid}`));s.closest("tr").outerHTML=lt(o),p.success(a?"User blocked":"User unblocked")}catch(o){p.error(o.message)}})}async function rn(e,t={}){if(!M()){e.innerHTML=_("Access denied");return}e.innerHTML=`
        <div class="kp-view-header">
            <h1 class="kp-view-title kp-cursor" style="font-size:2rem;">Global WAF</h1>
        </div>
        <p class="kp-muted uk-text-small uk-margin-bottom">
            Global WAF settings apply to all sites. Per-site overrides are set on each site's WAF tab.
        </p>

        <!-- tab pills -->
        <ul class="kp-tab-pills" id="kp-waf-pills">
            <li data-tab="crs"><a href="#"><span uk-icon="icon: lifesaver; ratio: 0.85"></span> Core Rule Set</a></li>
            <li data-tab="autoban"><a href="#"><span uk-icon="icon: ban; ratio: 0.85"></span> Auto-Ban</a></li>
        </ul>

        <!-- switcher panels -->
        <ul class="uk-switcher uk-margin-large-bottom" id="kp-waf-switcher">

            <!-- core rule set -->
            <li>
                <div class="kp-card uk-padding-small">
                    <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
                        <h3 class="kp-view-title">Web Application Firewall</h3>
                        <div class="uk-flex" style="gap:8px">
                            <a class="uk-button kp-btn-ghost kp-btn-sm" href="/api/settings/waf/export" download="podnest-waf-settings.json" uk-tooltip="Export WAF settings">
                                <span uk-icon="download"></span>
                            </a>
                            <label class="uk-button kp-btn-ghost kp-btn-sm" style="cursor:pointer" uk-tooltip="Import WAF settings from JSON">
                                <span uk-icon="upload"></span>
                                <input type="file" id="sec-waf-import" accept=".json" style="display:none">
                            </label>
                            <button class="uk-button kp-btn-primary kp-btn-sm" id="sec-waf-save" uk-tooltip="Save WAF Settings">
                                <span uk-icon="check"></span>
                            </button>
                        </div>
                    </div>
                    <p class="kp-muted uk-text-small uk-margin-small-bottom">
                        Inspects all proxied requests using the OWASP Core Rule Set.
                        Start in Detection mode to review false positives before enabling Prevention.
                        The engine recompiles in the background after saving.
                    </p>
                    <div class="uk-grid-small uk-margin-small-bottom" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label" for="sec-waf-mode">Mode</label>
                            <select class="uk-select kp-select" id="sec-waf-mode">
                                <option value="0">Detection \u2014 log matches only</option>
                                <option value="1">Prevention \u2014 block matching requests</option>
                            </select>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label" for="sec-waf-paranoia">Paranoia Level</label>
                            <select class="uk-select kp-select" id="sec-waf-paranoia">
                                <option value="1">1 \u2014 Baseline (recommended)</option>
                                <option value="2">2 \u2014 Moderate</option>
                                <option value="3">3 \u2014 Strict</option>
                                <option value="4">4 \u2014 Paranoid</option>
                            </select>
                        </div>
                    </div>
                    <div class="uk-grid-small uk-margin-small-bottom" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">
                                <input class="uk-checkbox" type="checkbox" id="sec-waf-enabled">
                                &nbsp;Enable WAF (OWASP Core Rule Set)
                            </label>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="kp-label">
                                <input class="uk-checkbox" type="checkbox" id="sec-waf-audit">
                                &nbsp;Enable Audit Log
                            </label>
                        </div>
                    </div>
                    <div class="uk-margin-small-bottom">
                        <label class="kp-label" for="sec-waf-exclusions">Global Rule Exclusions</label>
                        <textarea class="uk-textarea kp-textarea kp-mono kp-waf-exclusions" id="sec-waf-exclusions" rows="15"
                            placeholder="# Numeric = rule ID, text = tag name, one per line&#10;920350&#10;attack-sqli"></textarea>
                        <p class="kp-muted uk-text-small uk-margin-small-top">
                            Numeric entries map to <span class="kp-mono">SecRuleRemoveById</span>;
                            text entries to <span class="kp-mono">SecRuleRemoveByTag</span>.
                        </p>
                    </div>
                </div>
            </li>

            <!-- auto-ban -->
            <li>${Ve()}</li>

        </ul>`,ni(e),Et(e,t.tab),cn(e),Ke(e)}async function cn(e){try{let t=await b.get("/settings/waf");if(!e.querySelector("#sec-waf-enabled"))return;e.querySelector("#sec-waf-enabled").checked=!!t.Enabled,e.querySelector("#sec-waf-audit").checked=!!t.AuditLog,e.querySelector("#sec-waf-mode").value=String(t.Mode??0),e.querySelector("#sec-waf-paranoia").value=String(t.ParanoiaLevel??1),e.querySelector("#sec-waf-exclusions").value=t.Exclusions??""}catch(t){p.error("Failed to load WAF settings: "+t.message)}}function ni(e){e.querySelector("#sec-waf-save")?.addEventListener("click",async()=>{let t=e.querySelector("#sec-waf-save"),s=t.innerHTML;t.disabled=!0,t.innerHTML='<div uk-spinner="ratio: 0.5"></div>';try{await b.put("/settings/waf",{enabled:e.querySelector("#sec-waf-enabled").checked,mode:parseInt(e.querySelector("#sec-waf-mode").value,10),paranoia_level:parseInt(e.querySelector("#sec-waf-paranoia").value,10),audit_log:e.querySelector("#sec-waf-audit").checked,exclusions:e.querySelector("#sec-waf-exclusions").value.trim()}),p.success("WAF settings saved \u2014 engine recompiling in background")}catch(a){p.error(a.message)}finally{t.disabled=!1,t.innerHTML=s}}),e.querySelector("#sec-waf-import")?.addEventListener("change",async t=>{let s=t.target.files[0];if(!s)return;let a=new FormData;a.append("file",s);try{let n=await fetch("/api/settings/waf/import",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""},body:a}),o=n.status===204?null:await n.json().catch(()=>null);if(!n.ok)throw new Error(o?.error||`HTTP ${n.status}`);await cn(e),p.success("WAF settings imported")}catch(n){p.error(n.message)}finally{t.target.value=""}})}y.register("dashboard",e=>ms(e));y.register("sites",e=>us(e));y.register("site-detail",(e,t)=>aa(e,t));y.register("users",e=>ln(e));y.register("nodes",e=>G(e));y.register("settings",(e,t)=>bt(e,t));y.register("security",(e,t)=>bs(e,t));y.register("waf",(e,t)=>rn(e,t));y.register("admin-logs",e=>ss(e));y.register("audit-log",e=>is(e));document.addEventListener("keydown",e=>{let t=e.target;t?.matches?.("input, textarea, select, [contenteditable='true']")&&(t.closest?.(".CodeMirror")||t.id==="wpcli-input"&&(e.key==="ArrowUp"||e.key==="ArrowDown")||["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&e.stopPropagation())},!0);document.addEventListener("click",e=>{let t=e.target.closest("[data-view]");t&&(e.preventDefault(),y.go(t.dataset.view))});document.addEventListener("click",async e=>{let t=e.target.closest("[data-action]");if(!t)return;e.stopPropagation();let{action:s,id:a}=t.dataset;switch(s){case"manage":y.go("site-detail",{id:a});break;case"start":await rt(a,"start","Starting Site","Starting all containers - please wait...");break;case"stop":await rt(a,"stop","Stopping Site","Gracefully stopping all containers - please wait...");break;case"restart":await rt(a,"restart","Restarting Site","Restarting all containers - please wait...");break;case"flush":await rt(a,"flush","Flushing Caches","Clearing container caches - please wait...");break;case"delete":await oi(a);break;case"recreate":S("Recreating Pod","Recreating containers for this site - this may take a few minutes...");try{await b.post(`/sites/${a}/recreate`,{prune:!0}),x(),p.success("Pod recreated"),y.go("sites")}catch(n){x(),p.error(n.message)}break}});document.addEventListener("kp:bulk-action",async e=>{let{action:t,ids:s}=e.detail;if(!s.length)return;let a={start:"Starting",stop:"Stopping",restart:"Restarting",flush:"Flushing Caches",recreate:"Recreating"},n=t==="recreate"?"Please hold while we update your Pods":"Please wait...",o=t==="recreate"?{prune:!0}:void 0,i=t==="recreate"?1200*1e3:void 0;S(`${a[t]} ${s.length} Site${s.length!==1?"s":""}`,n);let l=await Promise.allSettled(s.map(d=>b.post(`/sites/${d}/${t}`,o,i)));x();let r=l.filter(d=>d.status==="rejected").length;r===0?p.success(`${t.charAt(0).toUpperCase()+t.slice(1)} complete for ${s.length} site${s.length!==1?"s":""}`):p.error(`${r} of ${s.length} sites failed \u2014 check logs`),["start","stop","restart","recreate"].includes(t)&&y.go("sites")});async function rt(e,t,s,a){S(s,a);try{if(await b.post(`/sites/${e}/${t}`),x(),p.success(s+" complete"),t!=="flush"){let{view:n,params:o}=qe();y.go(n,o)}}catch(n){x(),p.error(n.message)}}async function oi(e){if(!await E("Delete Site",`This will stop and permanently remove the pod and all its data. Are you sure?

A final backup will be created before deletion. This may take a moment.`))return;S("Deleting Site","Creating final backup and removing the pod \u2014 please wait...");let s;try{s=await fetch(`/api/sites/${e}`,{method:"DELETE",headers:{"X-CSRF-Token":window.KP?.csrf??""}})}catch{}if(x(),s?.ok&&s.headers.get("Content-Type")?.includes("gzip")){let i=(s.headers.get("Content-Disposition")??"").match(/filename="([^"]+)"/)?.[1]??`${e}_final.tar.gz`,l=await s.blob(),r=document.createElement("a");r.href=URL.createObjectURL(l),r.download=i,r.click(),URL.revokeObjectURL(r.href),p.success("Site deleted. Final backup downloaded."),y.go("sites");return}let a=!1,n=0;for(;!a&&n<10;){try{await new Promise(i=>setTimeout(i,2e3)),a=!(await b.get("/sites")).find(i=>i.ID===parseInt(e))}catch{}n++}a?(p.success("Site deleted. Final backup saved to S3."),y.go("sites")):p.error("Delete failed - site still exists after 20s")}if(window.KP?.user?.role===99){let e=document.getElementById("kp-resource-warning"),t=document.getElementById("kp-resource-warning-msg"),s=async()=>{try{let a=await b.get("/settings/resource-warning");a?.active&&e&&t?(t.textContent=`${a.current_mb}MB used, threshold ${a.threshold_mb}MB \u2014 throttling ${a.offender}.`,e.style.display=""):e&&(e.style.display="none")}catch{}};s(),setInterval(s,3e4)}window.addEventListener("hashchange",()=>{if(y._ownHashChange)return;let{view:e,params:t}=qe();y.go(e,t)});(()=>{let e=document.getElementById("kp-totop");if(!e)return;let t=()=>{e.classList.toggle("is-visible",window.scrollY>150)};window.addEventListener("scroll",t,{passive:!0}),t(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})})();(()=>{let e=document.querySelectorAll(".kp-logout-link");e.length&&e.forEach(t=>{t.addEventListener("click",async s=>{s.preventDefault(),await fetch("/logout",{method:"POST",headers:{"X-CSRF-Token":window.KP?.csrf??""}}),window.location.href="/login"})})})();(()=>{let e=document.querySelectorAll(".kp-pair-code-link");e.length&&e.forEach(t=>{t.addEventListener("click",async s=>{s.preventDefault();try{ii(await b.post("/nodes/pair-code"))}catch(a){p.error(a.message)}})})})();function ii({code:e,url:t,expires_in:s}){let a="kp-pair-code-modal";document.getElementById(a)?.remove();let n=`
        <div id="${a}" uk-modal>
            <div class="uk-modal-dialog kp-modal uk-modal-body" style="max-width:460px">
                <h3 class="uk-modal-title">Pairing Code</h3>
                <p class="kp-muted uk-text-small">
                    On the parent node, choose Add Node and enter this URL and code.
                    The code works once, and only for this URL.
                </p>
                <label class="kp-label">URL</label>
                <input class="uk-input kp-input" type="text" readonly value="${v(t)}">
                <label class="kp-label uk-margin-small-top">Code</label>
                <input class="uk-input kp-input" type="text" readonly value="${v(e)}"
                    style="letter-spacing:0.2em;font-size:1.2rem;text-align:center">
                <p class="kp-muted uk-text-small uk-margin-small-top">
                    Expires in <span id="kp-pair-code-ttl"></span>
                </p>
                <div class="uk-flex uk-flex-right uk-margin-top">
                    <button class="uk-button kp-btn-ghost uk-modal-close">Close</button>
                </div>
            </div>
        </div>`;document.body.insertAdjacentHTML("beforeend",n);let o=document.getElementById(a),i=document.getElementById("kp-pair-code-ttl"),l=s,r=()=>{if(l<=0){i.textContent="\u2014 expired",clearInterval(d);return}i.textContent=`${Math.floor(l/60)}:${String(l%60).padStart(2,"0")}`,l--},d=setInterval(r,1e3);r(),o.addEventListener("hidden",()=>{clearInterval(d),setTimeout(()=>o.remove(),300)},{once:!0}),UIkit.modal(o).show()}var{view:li,params:ri}=qe();y.go(li,ri);})();
