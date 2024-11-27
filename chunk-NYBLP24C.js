import{a as O}from"./chunk-KZRKERLB.js";import{a as te}from"./chunk-ORVO6GEW.js";import{A as _e,B as xe,E as N,a as ie,b as oe,c as I,e as ne,f as re,g as ae,j as ce,l as le,q as se,r as de,s as pe,t as me,u as fe,v as ue,w as ge,x as he}from"./chunk-FRFXNKVK.js";import{g as U,ga as ee,j as X,k as Y,m as Z}from"./chunk-SF2VDYYP.js";import{g as K,h as q,i as M,l as T}from"./chunk-UCIQEQ36.js";import"./chunk-EJJBCPAK.js";import{Cb as s,Fa as y,Ga as w,Hb as c,Rb as a,Sb as n,Tb as m,Ub as j,Vb as z,Xb as v,_b as g,ac as d,dc as V,dd as D,ed as x,fc as G,fd as Q,gc as $,hb as H,hc as B,ib as A,id as J,la as S,lb as r,lc as l,mb as u,mc as h,nc as _,wa as f,xa as b}from"./chunk-STDL2BFB.js";var E=class i{constructor(){this.title="dictionaryApp"}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=f({type:i,selectors:[["dictionary"]],decls:2,vars:2,consts:[[3,"toolKey","showBackButton"]],template:function(e,o){e&1&&m(0,"tool-header",0)(1,"router-outlet"),e&2&&c("toolKey","Dictionary")("showBackButton",!0)},dependencies:[I,q],encapsulation:2})}};var Ce=["audioPlayer"];function Se(i,t){if(i&1){let e=v();a(0,"button",7),g("click",function(){y(e);let p=d();return w(p.playAudio())}),m(1,"i",8),n()}}function be(i,t){if(i&1&&(a(0,"div",9)(1,"span",10),l(2),n(),a(3,"span",11),l(4),n()()),i&2){let e=d();r(2),h(e.wordDetails.cefr==null?null:e.wordDetails.cefr.phonetics),r(2),h(e.wordDetails.cefr==null?null:e.wordDetails.cefr.level)}}var P=class i{playAudio(){let t=this.audioPlayer.nativeElement;t.paused?t.play():t.pause()}static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275cmp=f({type:i,selectors:[["word-header"]],viewQuery:function(e,o){if(e&1&&G(Ce,5),e&2){let p;$(p=B())&&(o.audioPlayer=p.first)}},inputs:{wordDetails:"wordDetails"},decls:8,vars:4,consts:[["audioPlayer",""],[1,"word-header"],[1,"word-info"],[1,"word-title"],["class","play-audio-btn",3,"click",4,"ngIf"],["class","phonetics",4,"ngIf"],[3,"src"],[1,"play-audio-btn",3,"click"],[1,"fa-solid","fa-volume-high"],[1,"phonetics"],[1,"phonetics-text"],[1,"level-chip"]],template:function(e,o){e&1&&(a(0,"div",1)(1,"div",2)(2,"h4",3),l(3),s(4,Se,2,0,"button",4),n(),s(5,be,5,2,"div",5),n(),m(6,"audio",6,0),n()),e&2&&(r(3),_(" ",o.wordDetails.word," "),r(),c("ngIf",o.wordDetails.cefr==null?null:o.wordDetails.cefr.voice),r(),c("ngIf",o.wordDetails.cefr),r(),c("src",o.wordDetails.cefr==null?null:o.wordDetails.cefr.voice,A))},dependencies:[x],styles:[".word-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding-bottom:12px;border-bottom:4px solid #eee}.word-info[_ngcontent-%COMP%]{display:flex;flex-direction:column}.word-title[_ngcontent-%COMP%]{font-size:2rem;margin:0;display:flex;align-items:center;gap:10px}.play-audio-btn[_ngcontent-%COMP%]{background-color:transparent;color:#1a237e;border:none;cursor:pointer}.play-audio-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.2rem}.phonetics[_ngcontent-%COMP%]{margin-top:8px;display:flex;align-items:center;gap:10px}.phonetics-text[_ngcontent-%COMP%]{font-size:1.2rem;color:#000}.level-chip[_ngcontent-%COMP%]{background-color:#fbe9e7;color:#bf360c;padding:3px 9px;border-radius:14px;font-size:10px;font-weight:700}"]})}};function Oe(i,t){i&1&&m(0,"loader",3)}function Ie(i,t){i&1&&(j(0),l(1,"s"),z())}function Ee(i,t){if(i&1&&(a(0,"span",15),l(1),n()),i&2){let e=t.$implicit,o=d(3);c("ngStyle",o.getPartOfSpeechColor(e)),r(),_(" ",e," ")}}function Pe(i,t){if(i&1&&(a(0,"div",11)(1,"div",12),s(2,Ee,2,2,"span",13),n(),a(3,"p",14),l(4),n()()),i&2){let e=t.$implicit;r(2),c("ngForOf",e.pos.split(",")),r(2),h(e.definition)}}function ke(i,t){if(i&1&&(a(0,"li"),l(1),n()),i&2){let e=t.$implicit;r(),h(e)}}function Le(i,t){if(i&1&&(a(0,"div",16)(1,"h2",17),l(2,"Examples"),n(),a(3,"ul",18),s(4,ke,2,1,"li",19),n()()),i&2){let e=d(2);r(4),c("ngForOf",e.wordDetails.examples)}}function Fe(i,t){if(i&1&&(a(0,"mat-card",4),m(1,"word-header",5),a(2,"div",6)(3,"div",7),l(4," Definition"),s(5,Ie,2,0,"ng-container",8),n(),s(6,Pe,5,2,"div",9),n(),s(7,Le,5,1,"div",10),n()),i&2){let e=d();r(),c("wordDetails",e.wordDetails),r(4),c("ngIf",e.wordDetails.pos.length>1),r(),c("ngForOf",e.wordDetails.pos),r(),c("ngIf",(e.wordDetails.examples==null?null:e.wordDetails.examples.length)>0)}}var k=class i{constructor(t,e,o){this.router=t;this.route=e;this.wordService=o}ngOnInit(){this.route.params.subscribe(t=>{let e=t.word;e&&this.wordService.getWordDetails(e).subscribe(o=>{this.wordDetails=o})})}practiceWord(t){this.router.navigate(["/practice",t])}getPartOfSpeechColor(t){let e={noun:{background:"#E8F5E9",color:"#1B5E20"},verb:{background:"#E8EAF6",color:"#1A237E"},adjective:{background:"#FFEBEE",color:"#B71C1C"},adverb:{background:"#F3E5F5",color:"#ba68c8"},other:{background:"#FFF3E0",color:"#E65100"}};return e[t.toLowerCase()]||e.other}viewWord(){this.router.navigate(["dictionary/word",this.wordDetails.word])}static{this.\u0275fac=function(e){return new(e||i)(u(M),u(K),u(O))}}static{this.\u0275cmp=f({type:i,selectors:[["word-details"]],inputs:{wordDetails:"wordDetails"},decls:3,vars:2,consts:[["fxLayout","row","fxLayoutAlign","center",1,"word-page-container"],["fxLayout","row","fxLayoutAlign","center",4,"ngIf"],["class","word-page-card","fxLayout","column","fxLayoutGap","16px",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center"],["fxLayout","column","fxLayoutGap","16px",1,"word-page-card"],[3,"wordDetails"],["fxLayout","column","fxLayoutGap","12px",1,"definitions-container"],[1,"definitions-title"],[4,"ngIf"],["class","definitions","fxLayout","column","fxLayoutGap","8px",4,"ngFor","ngForOf"],["class","examples-section","fxLayout","column","fxLayoutGap","10px",4,"ngIf"],["fxLayout","column","fxLayoutGap","8px",1,"definitions"],["fxLayout","row","fxLayoutGap","20px"],["class","chip",3,"ngStyle",4,"ngFor","ngForOf"],[1,"definition-item"],[1,"chip",3,"ngStyle"],["fxLayout","column","fxLayoutGap","10px",1,"examples-section"],[1,"examples-title"],[1,"examples-list"],[4,"ngFor","ngForOf"]],template:function(e,o){e&1&&(a(0,"div",0),s(1,Oe,1,0,"loader",1)(2,Fe,8,4,"mat-card",2),n()),e&2&&(r(),c("ngIf",!o.wordDetails),r(),c("ngIf",o.wordDetails))},dependencies:[te,ee,X,Y,Z,U,D,x,Q,P],styles:["[_nghost-%COMP%]{background-image:url(/images/utils/stacked-steps-haikei.svg);width:100%;height:calc(100% - 60px);display:flex;justify-content:center}.word-page-container[_ngcontent-%COMP%]{width:100%;height:100%}.word-page-card[_ngcontent-%COMP%]{width:600px;background-color:#fff;text-align:left;padding:30px;margin:10px;overflow-y:auto}.definitions-title[_ngcontent-%COMP%], .examples-title[_ngcontent-%COMP%]{font-weight:600;margin:12px 0}.definitions[_ngcontent-%COMP%]{padding:12px 16px;border:1px solid #e9ecef;border-radius:8px}.chip[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:#495057;padding:6px 8px;border-radius:6px;max-width:max-content}.definition-item[_ngcontent-%COMP%]{font-size:1rem;line-height:1.6;color:#343a40}.view-word-btn[_ngcontent-%COMP%]{margin:16px auto}.examples-list[_ngcontent-%COMP%]{list-style-type:disc;margin-left:20px}.examples-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:10px}@media (max-width: 600px){.word-page-card[_ngcontent-%COMP%]{width:100%}}"]})}};function We(i,t){i&1&&(a(0,"h6",10),l(1,"Last Searches"),n())}function Te(i,t){if(i&1){let e=v();a(0,"mat-chip",13),g("click",function(){let p=y(e).$implicit,W=d(2);return w(W.navigateToWord(p))}),l(1),n()}if(i&2){let e=t.$implicit;V("matTooltip","Search '",e,"'"),r(),_(" ",e," ")}}function Ne(i,t){if(i&1&&(a(0,"mat-chip-set",11),s(1,Te,2,3,"mat-chip",12),n()),i&2){let e=d();r(),c("ngForOf",e.lastSearches)}}function Re(i,t){if(i&1){let e=v();a(0,"mat-list-item",16),g("click",function(){let p=y(e).$implicit,W=d(2);return w(W.onWordClick(p))}),m(1,"span",17),n()}if(i&2){let e=t.$implicit,o=d(2);r(),c("innerHTML",o.highlightMatch(e,o.wordControl.value),H)}}function He(i,t){if(i&1&&(a(0,"mat-list",14),s(1,Re,2,1,"mat-list-item",15),n()),i&2){let e=d();r(),c("ngForOf",e.recommendations)}}var L=class i{constructor(t,e){this.wordService=t;this.router=e;this.wordControl=new ce;this.recommendations=[];this.lastSearches=[];this.currentDate=new Date}ngOnInit(){let t=localStorage.getItem("lastSearches");t&&(this.lastSearches=JSON.parse(t)),this.wordControl.valueChanges.subscribe(e=>{e?this.wordService.getRecommendations(e).subscribe(o=>{this.recommendations=o.slice(0,10)}):this.recommendations=[]})}onEnter(){let t=this.wordControl.value;t&&(this.addLastSearch(t),this.router.navigate(["word",t]),this.clearRecommendations())}onWordClick(t){this.addLastSearch(t),this.router.navigate(["/dictionary/word",t]),this.clearRecommendations()}highlightMatch(t,e){if(!e)return t;let o=new RegExp(`(${e})`,"gi");return t.replace(o,'<span class="highlight">$1</span>')}clearRecommendations(){this.recommendations=[],this.wordControl.reset()}navigateToWord(t){this.addLastSearch(t),this.router.navigate(["/dictionary/word",t])}addLastSearch(t){this.lastSearches.includes(t)||(this.lastSearches.length===5&&this.lastSearches.pop(),this.lastSearches.unshift(t),localStorage.setItem("lastSearches",JSON.stringify(this.lastSearches)))}static{this.\u0275fac=function(e){return new(e||i)(u(O),u(M))}}static{this.\u0275cmp=f({type:i,selectors:[["search"]],decls:15,vars:4,consts:[[1,"container"],[1,"header"],[1,"header-subtitle"],[1,"search-section","mat-elevation-z4"],["appearance","outline",1,"search-field"],["matInput","","placeholder","Type a word...",3,"keydown.enter","formControl"],["mat-icon-button","","matSuffix","",3,"click"],["class","title",4,"ngIf"],["class","last-searches",4,"ngIf"],["class","recommendations",4,"ngIf"],[1,"title"],[1,"last-searches"],["class","search-chip",3,"matTooltip","click",4,"ngFor","ngForOf"],[1,"search-chip",3,"click","matTooltip"],[1,"recommendations"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[3,"innerHTML"]],template:function(e,o){e&1&&(a(0,"div",0)(1,"header",1)(2,"p",2),l(3,"Expand your vocabulary with ease"),n()(),a(4,"section",3)(5,"mat-form-field",4)(6,"mat-label"),l(7,"Search for a word"),n(),a(8,"input",5),g("keydown.enter",function(){return o.onEnter()}),n(),a(9,"button",6),g("click",function(){return o.onEnter()}),a(10,"mat-icon"),l(11,"search"),n()()(),s(12,We,2,0,"h6",7)(13,Ne,2,1,"mat-chip-set",8)(14,He,2,1,"mat-list",9),n()()),e&2&&(r(8),c("formControl",o.wordControl),r(4),c("ngIf",o.lastSearches.length>0&&!(o.wordControl.value!=null&&o.wordControl.value.length)),r(),c("ngIf",o.lastSearches.length>0&&!(o.wordControl.value!=null&&o.wordControl.value.length)),r(),c("ngIf",o.recommendations.length>0))},dependencies:[ne,ie,pe,me,he,ge,fe,ue,oe,_e,xe,re,ae,le,D,x],styles:["[_nghost-%COMP%]{height:calc(100% - 60px)}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:20px;background-image:url(/images/utils/stacked-steps-haikei.svg);gap:10px;color:#fff;height:100%}.header[_ngcontent-%COMP%]{text-align:center;margin-bottom:10px}.header-subtitle[_ngcontent-%COMP%]{font-size:1.2rem}.title[_ngcontent-%COMP%]{color:#000;font-size:1rem}.search-section[_ngcontent-%COMP%]{width:100%;max-width:500px;padding:20px;background:#fff;border-radius:8px;position:relative}.search-field[_ngcontent-%COMP%]{width:100%}.recommendations[_ngcontent-%COMP%]{margin-top:10px;border:1px solid #e0e0e0;border-radius:8px;background:#fff;max-height:300px;overflow-y:auto;position:absolute;width:93%;left:19px;top:70px}mat-list-item[_ngcontent-%COMP%]{padding:8px;cursor:pointer;transition:background-color .3s}mat-list-item[_ngcontent-%COMP%]:hover{background-color:#e3f2fd}.last-searches[_ngcontent-%COMP%]{margin-top:10px;display:flex;flex-wrap:wrap;gap:8px}.search-chip[_ngcontent-%COMP%]{background-color:#e3f2fd;color:#0d47a1;font-weight:700;cursor:pointer;transition:background-color .3s}.search-chip[_ngcontent-%COMP%]:hover{background-color:#bbdefb}"]})}};var Ae=[{path:"",component:E,children:[{path:"",component:L},{path:"word/:word",component:k}]}],F=class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=S({imports:[T.forChild(Ae),T]})}};var ve=class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=S({imports:[I,N,F,de,se,J,N]})}};export{ve as DictionaryModule};
