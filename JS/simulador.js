function calc(){
    let cons = parseFloat(document.getElementById("consumo").value)
   let pes = parseFloat(document.getElementById("pessoas").value)

   let calculo_diat = ((cons*1000)/30)/pes
   
   
   let calculo_mest =(cons*1000)/pes

        /* document.getElementById("dica1").style.height="140vh"
       document.getElementById("caixa").style.height="150vh"  */

       if (calculo_diat % 2 == 0) {
           calculo_dia = calculo_diat
       }else{
           calculo_dia = (((cons*1000)/30)/pes).toFixed(2)
       }

       if (calculo_mest%2==0) {
           calculo_mes = calculo_mest
       }else{
           calculo_mes =((cons*1000)/pes).toFixed(2)
       }

       if (calculo_dia >= 150) {
           document.getElementById("resultado4").innerHTML = "* O seu consumo está superior ao definido como necessário pela ONU, o necessário é de 110 litros por dia"
            document.getElementById("resultado4").style.color= "red " 
           document.getElementById("resultado4").style.backgroundColor = " rgba(0, 0, 0, 0.411)"
           document.getElementById("resultado4").style.padding = "10px"
           document.getElementById("resultado4").style.borderRadius = "2vw"
       }else if(calculo_dia < 150 && calculo_dia >110){
           document.getElementById("resultado4").innerHTML = "* O seu consumo está levemente superior do definido como necessário pela ONU, o necessário é de 110 litros por dia"
           document.getElementById("resultado4").style.color= "#ffc400"
           document.getElementById("resultado4").style.backgroundColor = " transparent"
       }else if(calculo_dia <= 110) {
           document.getElementById("resultado4").innerHTML = "* O seu consumo está dentro do definido como necessário pela ONU, o necessário é de 110 litros por dia"
           document.getElementById("resultado4").style.color= "#00ff62"
           document.getElementById("resultado4").style.backgroundColor = " transparent"
       }

       document.getElementById("resultado1").innerHTML = "* O seu consumo diário por pessoa foi de " + calculo_dia + " litros." 
       document.getElementById("resultado2").innerHTML = "* O consumo mensal por pessoa foi de " + calculo_mes +" litros. " 
       document.getElementById("resultado3").innerHTML = "* O consumo mensal geral foi de " + cons*1000 + " litros."
       
}
   