//作者QQ:1026770372
function t(t) { 
  var n = t.getFullYear(),
   o = t.getMonth() + 1,
    r = t.getDate(),
     u = t.getHours(),
      i = t.getMinutes(),
       g = t.getSeconds(); 
       return [ o, r].map(e).join("月") + "日" + [u, i].map(e).join(":") 
       } function e(t) { return t = t.toString(), t[1] ? t : "0" + t } module.exports = { formatTime: t }
