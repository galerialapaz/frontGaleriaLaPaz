const nombreMeses =  'Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre'.split(' ')
const nombreMesesCorto =  'Ene. Feb. Mar. Abr. May. Jun. Jul. Ago. Sep. Oct. Nov. Dic.'.split(' ')
const NombreDias= 'Domingo Lunes Martes Miércoles Jueves Viernes Sábado '.split(' ')
const nomDiaCor= 'Dom. Lun. Mar. Mié. Jue. Vie. Sáb. '.split(' ')
function dateTOtxt(f){
  let d 
  if(f==undefined){
    d = new Date() // captura fecha del Dispositivo "2024-02-07"
  }else{
    if(isNaN(f)){ // captura fecha input aaaa-mm-dd y estableciendo h m s
      d = new Date(f.split("-")[0],f.split("-")[1]-1,f.split("-")[2],0,0,0,0);
    }else{
      let v = f.toString().split("")
      d = new Date(20+v[0]+v[1],v[2]+v[3]-1,v[4]+v[5],v[6]+v[7],v[8]+v[9],v[10]+v[11]) /// -> 23 05 15 21 60 15
    }
  }
  
  let s = d.getSeconds()<10?("0"+d.getSeconds()):d.getSeconds()
  let m = d.getMinutes()<10?("0"+d.getMinutes()):d.getMinutes()
  let h = d.getHours()<10?("0"+d.getHours()):d.getHours()
  let diN = d.getDate()<10?("0"+d.getDate()):d.getDate()
  let di = d.getDate()
  let diTc = nomDiaCor[d.getDay()]
  let diT = NombreDias[d.getDay()]
  let meN = (d.getMonth()+1)<10?("0"+(d.getMonth()+1)):(d.getMonth()+1)
  let meTc = nombreMesesCorto[d.getMonth()]
  let meT = nombreMeses[d.getMonth()]
  let ye = d.getFullYear()
  return {s,m,h,diN,diTc,diT,di,meN,meTc,meT,ye}
}
function diaMesYear(t){// 20 Mayo 2023
  let d = dateTOtxt(t); return(d.di+" "+d.meT+" "+d.ye);
}
function fechaTxtMed(t){// 2/May./2022
  let d = dateTOtxt(t);return (d.di+"/"+d.meTc+"/"+d.ye);
}
function diaMesCorto(t){// 5 May.
  let d = dateTOtxt(t); return (d.di+" "+d.meTc);
}
function timeToMesDia(t){//  1 Mayo
  let d = dateTOtxt(t);return (d.di+" "+d.meT);
}
function fecActInp(t){// 2023-05-04
  let d = dateTOtxt(t);return (d.ye+"-"+d.meN+"-"+d.diN);
}
function fechTxtFull(tim){// 14:20:22 hrs. / lunes / 12 may. 2020
  let d = dateTOtxt(tim);return (d.h+":"+d.m+":"+d.s+" hrs. / "+d.diTc +" / "+d.diN+" "+d.meTc+" "+d.ye)
}

function diaDmesDyear(t){//4 de Diciembre de 2023
  let d = dateTOtxt(t);return (d.di+" de "+d.meT+" de "+d.ye);
}
function monthTOtxt(f){
  let fc = f.split("-");return (nombreMeses[fc[1]-1] +" / "+fc[0])
}
function timToMontfYear(tim){
  let d = dateTOtxt(tim);return (d.ye+"-"+d.meN);
}

function dateTimeLocal(t){///hoy -> 23 05 15 21 60 15 
  let d = dateTOtxt(t);
  let y = d.ye.toString().split("")[2]+d.ye.toString().split("")[3]
  return (parseInt(y+d.meN+d.diN+d.h+d.m+d.s));
}