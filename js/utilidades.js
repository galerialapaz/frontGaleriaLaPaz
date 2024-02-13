function downloadTxt(arr,txt){
  return new Promise(function(resolve,reject){  
    let jsonTxt = JSON.stringify(arr); 
    let data = new Blob([jsonTxt], {type: 'text/plain'});
    textFile = window.URL.createObjectURL(data);
    let a = document.createElement("a");
    a.download = txt+".txt"
    a.href = textFile;
    a.click()
  }) 
}

async function veryfiMoneda(e){
  var m = await radioBoton("moneda")
  if(m === false){alert("Estableser Moneda"); e.target.value="";}
}
function selecMoneda(e){
  document.getElementById("txtMoneda").textContent = e.target.parentNode.getElementsByTagName("label")[0].textContent
}
function ShowName(e) {
  let id = e.target.id
  let tmp = document.getElementById(id).value.split(" ");
  let f;
  tmp.forEach(e =>{
    if(f){
      f=f+" "+e.charAt(0).toUpperCase()+e.slice(1).toLocaleLowerCase();
    }else{
      f=e.charAt(0).toUpperCase()+e.slice(1).toLocaleLowerCase();
    }
  })
  document.getElementById(id).value = f;
}