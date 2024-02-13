function ValNum(id){
  let nod = document.getElementById(id)
  if(nod.tagName=="INPUT"){
    let val = nod.value
    return (val==""?0:parseFloat(val))
  }else{
    let val = nod.textContent
    return (val==""?0:parseFloat(val))
  }
}
function saveText(e,i){
  let js = Object.keys(e.target.dataset)[0] 
  let jsv = storageJson(js)
  jsv[e.target.id] = e.target.value
  localStorage.setItem(js,JSON.stringify(jsv))
  if(e.target.type=="date"){
    document.getElementById(e.target.id+"_Txt").textContent = diaMesYear(e.target.value)
  }
  if(e.target.type=="number"){
    if(e.target.dataset[js]=="text"){
      jsv[e.target.id] = e.target.value
    }else{
      jsv[e.target.id] = parseFloat(e.target.value)
    }
    localStorage.setItem(js,JSON.stringify(jsv))
  }
  if(e.target.type=="option"){
    jsv[e.target.id] = e.target.value 
    localStorage.setItem(js,JSON.stringify(jsv))
  }
  if(i==true){renderVentas()}
  if(i=="init"){init_m()}
}
function checkbox(e,i){
  let js = Object.keys(e.target.dataset)[0] 
  let jsv = storageJson(js)
  jsv[e.target.id] = e.target.checked
  localStorage.setItem(js,JSON.stringify(jsv))
  if(i==true){renderVentas()}
}

function radioBoton(name){
  return new Promise(function(resolve,reject){  
    var r = document.querySelector('input[type=radio][name='+name+']:checked');
    if(r==null){resolve(false)}else{resolve(r.id)}
  }) 
}

function dc2(n){ return parseFloat((n).toFixed(2)) }
function dc1(n){ return parseFloat((n).toFixed(1)) }
function dcm(n){ 
  if(n==""){return 0}else{return parseFloat((n).toFixed(1))}
}

function inputDateForm(id){// 20 Mayo 2023
  return new Promise(function(resolve,reject){  
    document.getElementById(id).value = fecActInp()
    document.getElementById(id+"_Txt").textContent = diaMesYear()
    document.getElementById(id).addEventListener("change",(e)=>{
      document.getElementById(id+"_Txt").textContent = diaMesYear(e.target.value)
    })
    resolve()
  }) 
}
function inputDateFormCorto(id,f){// 2/May./2022
  return new Promise(function(resolve,reject){  
    document.getElementById(id).value = fecActInp(f)
    document.getElementById(id+"_Txt").textContent = fechaTxtMed(f)
    document.getElementById(id).addEventListener("change",(e)=>{
      document.getElementById(id+"_Txt").textContent = fechaTxtMed(e.target.value)
    })
    resolve()
  }) 
}
function json_to_from(idf,stg){
  return new Promise(function(resolve,reject){
    let f = document.querySelectorAll('[data-'+idf+']')
    let js;if(stg==undefined){js = storageJson(idf)}else{js=stg}
    for (let i = 0; i < f.length; i++) {
      let id = f[i].id
      let vl = js[id] 
      if(f[i].type=="text"){ if(vl){ document.getElementById(id).value =  vl } }
      if(f[i].type=="number"){ if(vl){ document.getElementById(id).value =  vl } }
      if(f[i].type=="date"){
        if(vl){ 
          document.getElementById(id).value = fecActInp(vl)  
          document.getElementById(id+"_Txt").textContent = diaMesYear(vl)
        }else{
          document.getElementById(id+"_Txt").textContent = diaMesYear()
          document.getElementById(id).value = fecActInp()
        }
        document.getElementById(id).addEventListener("change",(e)=>{
          document.getElementById(id+"_Txt").textContent = fechaTxtMed(e.target.value)
        })
      }
      if(f[i].tagName=="SELECT"){ if(vl){ document.getElementById(id).value = vl } }
      if(f[i].tagName=="IMG"){ if(vl){ document.getElementById(id).src = vl }  }
      if(f[i].tagName=="LABEL"){ if(vl){ document.getElementById(id).textContent = vl } }
      if(f[i].type=="checkbox"){ if(vl){ document.getElementById(id).checked = vl } }
      if(f[i].type=="radio"){ 
        if(js[f[i].name]!=""){document.getElementById(js[f[i].name]).checked}
      }
      /*fecha compuesta*/
      let fc = f[i].dataset[idf]
      let fe = f[i].dataset["fechcomp"]
      if(fc=="fechComp"){
        let f = document.querySelectorAll('[data-fecha='+fe+']')
        if(js[fe]==undefined){continue}
        f[0].value = parseInt(js[fe].split("-")[2]) 
        f[1].value = js[fe].split("-")[1]
        f[2].value = js[fe].split("-")[0]
        continue
      }
      /*fecha compuesta*/
      /*secion info*/
      if(f[i].tagName=="DIV"){
        document.getElementById(id).textContent = vl;
        if(fc=="diaMesYear"){ if(vl){ document.getElementById(id).textContent=diaMesYear(vl) } }
      }
      /*secion info*/
    }
    resolve(true)
  })
}
function form_to_json(set,id){
  return new Promise(function(resolve,reject){
    const f = document.querySelectorAll('[data-'+set+']')
    let j = {}
    for (let i = 0; i < f.length; i++) {
      let id = f[i].id
      let vl = f[i].value
      let ty = f[i].type
           
      if(ty=="text"){j[id] = vl}
      if(ty=="password"){j[id] = vl}
      if(ty=="email"){j[id] = vl}
      if(ty=="select-one"){j[id] = vl}
      if(ty=="checkbox"){j[id] = f[i].checked}
      if(ty=="date"){j[id] = dateTimeLocal(vl)}
      if(ty=="radio"){
        var r = document.querySelector('input[type=radio][name='+f[i].name+']:checked');
        if(r!=null){j[f[i].name] = r.id}else{j[f[i].name] = ""}
      }


      let dt = f[i].dataset[set]
      if(ty=="number"){
        if(vl==""){
          if(dt=="text"){j[id]=""}else{j[id]=0}
        }else{
          if(dt=="text"){j[id]=vl}else{j[id]=parseFloat(vl)}
        }
      }

      let fc = f[i].dataset.user// fecha compuesto
      let fe = f[i].dataset["fechcomp"]
      if(fc=="fechComp"){
        let f = document.querySelectorAll('[data-fecha='+fe+']')
        let dia = f[0].value<10?("0"+f[0].value):f[0].value;if(dia=="0"){continue}
        let mes = f[1].value
        let ano = f[2].value;if(ano==""){continue}
        let fecha = ano+"-"+mes+"-"+dia
        j[fe] = fecha
      }
      
      let tg = f[i].tagName

      let rq = f[i].required
      if(rq){
        if(j[id]==""||j[fe]==""){
          document.getElementById(id).style.backgroundColor="rgb(255, 200, 200)"
          alert("existen datos faltantes")
          resolve(false)
        }else{
          document.getElementById(id).style.backgroundColor="rgb(255, 255, 255)"
        }
      }

      if(dt=="cdl"){ 
        let cdl = document.getElementById("cdl").value
        let xpdd = document.getElementById("xpdd").value
        j["ci"] = cdl+" "+xpdd 
      }
    }

    let du = storageJson("dataUser")
    if(id==undefined){
      j["timeStamp"] = dateTimeLocal() 
      j["userStamp"] = du.nom
      j["dataUser"] = {"nom":du.nom,"user":du.user}
      j["user"] = du.user
      j["id"] = new Date().getTime().toString()
      j["fecha"] = dateTimeLocal()
    }else{
      j["timeStamp"] = dateTimeLocal() 
      j["userStamp"] = du.nom
      j["id"] = id
    }
    resolve(j)
  })
}
