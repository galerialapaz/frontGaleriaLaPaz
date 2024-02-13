var urlApi 
var urlWs
if(location.href.split("/")[0]=="http:"){
  let serverDataBaseLocal = (location.href.split("/")[2]).split(":")[0]
  urlWs = 'ws://'+serverDataBaseLocal
  urlApi = "http://"+serverDataBaseLocal
}else{
  let serverDataBase = "galeria-la-paz-demo.glitch.me"
  urlWs = 'wss://'+serverDataBase
  urlApi = "https://"+serverDataBase
}
//urlWs = 'wss://galeria-la-paz-demo.glitch.me'
//urlApi = "https://galeria-la-paz-demo.glitch.me"

const token = JSON.parse((localStorage.getItem("datUser")==null||localStorage.getItem("datUser")=="")?"{}":localStorage.getItem("datUser")).token
function apiPostJsonCrud(metodo,dat,coleccion){//post json token - respons json
  return new Promise(function(resolve,reject){
    dat["coleccion"] = coleccion
    fetch(urlApi+`/`+metodo,{method:'post',headers:{'Accept':'application/json,text/plain','Content-Type':'application/json','x-access-token':token},body:JSON.stringify(dat)}).then(rsp=>{ if(rsp.ok){ rsp.json().then(d=>{ resolve(d) })}});
  })
}
function apiPostJsonRut(metodo,dat){//post json token - respons json
  return new Promise(function(resolve,reject){
    fetch(urlApi+`/`+metodo,{method:'post',headers:{'Accept':'application/json,text/plain','Content-Type':'application/json','x-access-token':token},body:JSON.stringify(dat)}).then(rsp=>{ if(rsp.ok){ rsp.json().then(d=>{ resolve(d) })}});
  })
}

function timCol(tim){ return (localStorage.getItem(tim)==null||localStorage.getItem(tim)=="")?0:parseInt(localStorage.getItem(tim)) }
function elemtDif(d1,d2){
  var ar = [];
  for (var i = 0; i < d1.length; i++) {
    var ig = false;
    for (var j = 0; j < d2.length & !ig; j++){ if(d1[i].id == d2[j]){ ig=true } }
    if(!ig){ ar.push(d1[i].id) }
  }
  return ar
}

/////////// SINCRO DATA BASE //////////
async function sincroBD(col,tp){
  console.log("bajando "+col);iniSinAmi(tp)
  let datCloud
  if(col=="movimientos"){
    let fil = await storageJsonSetup("filtro",{"fecha":fecActInp()})
    const fecha1 = dateTimeLocal(fil.fecha)
    const fecha2 = dateTimeLocal(fil.fecha)+235959
    datCloud = await apiPostJsonCrud("readTimeTime",{"fecha1":fecha1,"fecha2":fecha2},col)
  }else{
    datCloud = await apiPostJsonCrud("readTime",{"timeStamp":timCol(col+"timeStamp")},col)
  }
  let datos = datCloud["record"]
  for (let i = 0; i < datos.length; i++) {
    let item = datos[i];
    await write_DB(item,col)
    if(item["timeStamp"]>timCol(col+"timeStamp")){ localStorage.setItem(col+"timeStamp",item["timeStamp"]) }
  }
  var datLocal = await read_DB(col)///borrando eliminados
  if(datCloud["count"]<datLocal.length){ 
    let arrCloud = await apiPostJsonCrud("readIds",{},col)
    let sincroDel = elemtDif(datLocal,arrCloud)
    for (let i = 0; i < sincroDel.length; i++) {
      let id = sincroDel[i];
      await del_DB(id,col)
      console.log("eleiminando..!!")
    }
    console.log(col+" bajado...!!!");finSinAmi(tp)
  }else{
    console.log(col+" bajado...!!!");finSinAmi(tp)
  }
}
function iniSinAmi(t){
  if(t=="m"){loadData()}
  if(t=="a"){sincConect()}
  if(t=="r"){sincConect()}
}
function finSinAmi(t){
  if(t=="m"){successDat("r")}
  if(t=="a"){sincConectStop();renderTab()}
  if(t=="r"){sincConectStop();renderTab()}
}
/////////// SINCRO DATA BASE //////////
/////////// WEBSOCKET CONECCION //////////
let sinAct 
let socket;
function openSocket(act){
  sinAct = act
  socket = new WebSocket(urlWs);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readMessage);
}
function closeConnection(){ setTimeout(openSocket(sinAct),500) }
function openConnection(){
  if(socket.readyState===WebSocket.OPEN){
    if(sinAct=="sincVEN"){ sincroBD('movimientos','a') }
    if(sinAct=="sincINV"){ sincroBD('articulos','a') }
  }
}
function readMessage(e){ 
  console.log(e.data); 
  if(sinAct=="sincVEN"){ sincroBD('movimientos','r') }
  if(sinAct=="sincINV"){ sincroBD('articulos','r') }
}
function sendMessage(){
  return new Promise(function(resolve,reject){
    if(socket.readyState===WebSocket.OPEN){ 
      socket.send("upDB"); 
      resolve(true)
    } 
  })
}
/////////// WEBSOCKET CONECCION //////////
