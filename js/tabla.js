function filtroBus(){
  const text = document.getElementById("buscar").value.toUpperCase()
  for (let i = 0; i < items.length; i++) {
    const txtItm = items[i].txt.toUpperCase()
    const idItm = items[i].id
    if(txtItm.indexOf(text)>-1){document.getElementById(idItm).style.display=""}else{document.getElementById(idItm).style.display = "none" }
  }
  localStorage.setItem("buscar",document.getElementById("buscar").value)
}
let listCol
function manejoColumnas(tab){
  listCol = storageJson(tab)
  const head = document.getElementById("headColm").querySelectorAll("th")
  let listCkeck = ``;
  for (let i = 0; i < head.length; i++) {
    const td = head[i];
    listCkeck += 
    `<div>
      <input onclick="togleColm('cr${i+1}','${tab}')" type="checkbox" id="cr${i+1}" >
      <label for="cr${i+1}">${td.textContent}</label>
    </div>` 
    if(listCol["cr"+(i+1)]==undefined){listCol["cr"+(i+1)] = true}
  }
  document.querySelector("#contedOcultador").innerHTML = listCkeck;
  for (const key in listCol) { document.getElementById(key).checked = listCol[key]; }
  establacerColumnas(listCol)
}
function togleColm(id,tab){
  listCol[id] = document.getElementById(id).checked
  localStorage.setItem(tab, JSON.stringify(listCol))
  establacerColumnas(listCol)
}
function establacerColumnas(listCol){
  let head = document.getElementById("headColm").querySelectorAll("th")
  for (let i = 0; i < head.length; i++) {
    listCol["cr"+(i+1)]
    head[i].style.display = listCol["cr"+(i+1)]?"":"none"
  }
  var body = document.getElementById("listaDitem").querySelectorAll("tr")
  for (let i = 0; i < body.length; i++) {
    const fila = body[i].querySelectorAll("td");
    for (let i = 0; i < fila.length; i++) {
      listCol["cr"+(i+1)]
      fila[i].style.display = listCol["cr"+(i+1)]?"":"none"
    }
  }
  let tfoot = document.getElementById("headColm").querySelectorAll("th")
  for (let i = 0; i < tfoot.length; i++) {
    listCol["cr"+(i+1)]
    tfoot[i].style.display = listCol["cr"+(i+1)]?"":"none"
  }
}
function listVer(){ document.getElementById("contedOcultador").classList.add("listVer") }
function oculVer(){ document.getElementById("contedOcultador").classList.remove("listVer") }
let asend = true
function sortTable(ord,typ,elm,arr){
  return new Promise(function(resolve,reject){
    if(ord){
      if(typ=='txt'){
        if(asend){
          arr.sort((a, b) => {
            if(a[elm] < b[elm]) return 1;
            if(a[elm] > b[elm]) return -1;
            return 0;
          })
          asend = false
        }else{
          arr.sort((a, b) => {
            if(a[elm] < b[elm]) return -1;
            if(a[elm] > b[elm]) return 1;
            return 0;
          })
          asend = true
        }  
      }else{
        if(asend){
          arr.sort(((a, b) => b[elm] - a[elm]));
          asend = false
        }else{
          arr.sort(((a, b) => a[elm] - b[elm]));
          asend = true
        }
      }
      resolve(arr)
    }else{ resolve(arr) }
  })
}


function limpiarBus(){
  document.getElementById("buscar").value = ""
  renderTab() 
}

/* filtro */
function cmp(df,cm){
  if(df){
    return true;
  }else{
    if(cm){ return true; }else{ return false; } 
  }
}
function datFil(){
  let f1 = {"fechaAll":true,"fecha":fecActInp()}
  let f2 = {"cuenta":"Todos"}
  let fl = {...f1,...f2}
  let f = localStorage.getItem("datfil")==null?fl:JSON.parse(localStorage.getItem("datfil"))
  return  f
}
function filterV1(dat){
  return new Promise(function(resolve,reject){ 
    let f = datFil()
    let newArr = []
    for (let i = 0; i < dat.length; i++) {
      let el = dat[i];
      let ins = true
      if(!cmp(f.fechaAll,fecActInp(el.fecha) == f.fecha)){ins=false;continue} 
      if(!cmp(el.cuenta == "Todos",el.cuenta == f.cuenta)){ins=false;continue} 
      if(ins){newArr.push(el)}
    }
    resolve(newArr)
  }) 
}
/* filtro */

function filtroModel1(dat,fil){
  return new Promise(function(resolve,reject){ 
    var rslt = dat.filter((e,idx,arr)=>{ 
      let fecha = fil.todo?true:fecActInp(e.fecha)==fil.fecha
      let lugar = fil.lugar=="todos"?true:e.origen==fil.lugar
      return lugar && fecha
    });
    rslt.sort((a,b)=>{ return (b.fecha - a.fecha) })
    resolve(rslt)
  }) 
}

function filtroModel2(dat,fil){
  return new Promise(function(resolve,reject){ 
    var rslt = dat.filter((e,idx,arr)=>{ 
       let fecha = fil.todo?true:fecActInp(e.fecha)==fil.fecha
      let user = fil.user=="todos"?true:e.user==fil.user
      return user && fecha
    });
    rslt.sort((a,b)=>{ return (b.fecha - a.fecha) })
    resolve(rslt)
  }) 
}