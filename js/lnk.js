function lnk(e){ 
  var a = document.createElement("a"); 
  a.href = e+".html"; 
  a.click() 
}
function lnkRel(rut){
  let a = document.createElement("a"); 
  a.href = location.href.split("/")[0]+"//"+(location.href.split("/")[2]).split(":")[0]+":"+window.location.port+"/"+rut+".html" 
  a.click()
}
function lnkRutId(id,rt){ 
  localStorage.setItem("id",id); 
  lnk(rt) 
}
async function lnkRelId(id,rut){
  localStorage.setItem("id",id);
  lnkRel(rut)  
}



