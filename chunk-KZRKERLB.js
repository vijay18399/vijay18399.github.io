import{a as i,b as o}from"./chunk-UCIQEQ36.js";import{ka as s,pa as n}from"./chunk-STDL2BFB.js";var a=class r{constructor(t){this.http=t;this.apiUrl="https://dictionaryapp-44vf.onrender.com"}isActive(){return this.http.get(`${this.apiUrl}`)}getWordDetails(t){return this.http.get(`${this.apiUrl}/wordInfo/${t}`)}getRecommendations(t){return this.http.get(`${this.apiUrl}/recommendations/${t}`)}getRandomWord(){return this.http.get(`${this.apiUrl}/random`)}getWordfTheDay(){return this.http.get(`${this.apiUrl}/wordOfTheDay`)}getCEFRWords(t,e,p){let l=new i().set("level",t).set("page",e.toString()).set("pageSize",p.toString());return this.http.get(`${this.apiUrl}/cefr`,{params:l})}getCEFRWordsByLevels(t){let e=new i().set("levels",t.selectedLevels.join(",")).set("limit",t.questionCount);return this.http.get(`${this.apiUrl}/cefr-words`,{params:e})}static{this.\u0275fac=function(e){return new(e||r)(n(o))}}static{this.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"})}};export{a};
