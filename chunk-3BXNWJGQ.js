import{a as s,b as n}from"./chunk-UCIQEQ36.js";import{ka as i,pa as o}from"./chunk-STDL2BFB.js";var a=class r{constructor(t){this.http=t;this.apiUrl="http://localhost:3000"}isActive(){return this.http.get(`${this.apiUrl}`)}getWordDetails(t){return this.http.get(`${this.apiUrl}/wordInfo/${t}`)}getRecommendations(t){return this.http.get(`${this.apiUrl}/recommendations/${t}`)}getRandomWord(){return this.http.get(`${this.apiUrl}/random`)}getWordfTheDay(){return this.http.get(`${this.apiUrl}/wordOfTheDay`)}getCEFRWords(t,e,l){let p=new s().set("level",t).set("page",e.toString()).set("pageSize",l.toString());return this.http.get(`${this.apiUrl}/cefr`,{params:p})}getCEFRWordsByLevels(t){let e=new s().set("levels",t.selectedLevels.join(",")).set("limit",t.questionCount);return this.http.get(`${this.apiUrl}/cefr-words`,{params:e})}static{this.\u0275fac=function(e){return new(e||r)(o(n))}}static{this.\u0275prov=i({token:r,factory:r.\u0275fac,providedIn:"root"})}};export{a};