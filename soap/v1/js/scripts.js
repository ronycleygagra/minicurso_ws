//Adiciona a pontuacao do cpf
/*
$(document).ready(function(){
    var $cpf = $("#cpf");
    $cpf.mask('000.000.000-00', {reverse: true});
});
*/

//Verifica as validacoes do cpf
$("#formulario-cpf").submit(function(e){
    e.preventDefault();
    var cpf = $("#cpf").val();    

    if(validarCPF(cpf)){
        buscarCPF(cpf);
        return false;
    }else{
        $("#cpf").val('');
        $("#cpf").focus();
        return false;
    }    
});

//Valida o CPF e faz a busca no DB
function buscarCPF(cpf) {
    document.getElementById('mostrarInscritos').style.display="inherit";
    var cpf_pontuacao = cpf;
    var valor = cpf;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') {
        document.getElementById('resultado').innerHTML = "<div class='alert alert-danger' style='text-align:center;' role='alert'>Por favor, Digite um CPF v&aacute;lido</div>";
        return false;
    }

    if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999") {
        document.getElementById('resultado').innerHTML = "<div class='alert alert-danger' style='text-align:center;' role='alert'>Por favor, Digite um CPF v&aacute;lido</div>";
        return false;
    }
    // Valida 1º digito 
    var add = 0;
    for (i = 0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9))) {
        document.getElementById('resultado').innerHTML = "<div class='alert alert-danger' style='text-align:center;' role='alert'>Por favor, Digite um CPF v&aacute;lido</div>";
        return false;
    }
    // Valida 2º digito 
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10))) {
        document.getElementById('resultado').innerHTML = "<div class='alert alert-danger' style='text-align:center;' role='alert'>Por favor, Digite um CPF v&aacute;lido</div>";
        return false;
    // busca o cpf no banco de dados    
    } else {
        var req;
        cpf = cpf.replace(/[^\d]+/g, '');
    
        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
         }
         else if(window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
         }
          
         var url = "buscar_cpf.php?cpf=" + cpf_pontuacao;
         req.open("GET", url, true); 
         
         req.onreadystatechange = function() {  
             if(req.readyState == 1) {
                 document.getElementById('resultado').innerHTML = 'Buscando CPF...';
             }
          
             if(req.readyState == 4 && req.status == 200) {
                 var resposta = req.responseText;
                 document.getElementById('resultado').innerHTML = resposta;
                 //document.getElementById('imgcheckin').setAttribute("tabIndex", "-1");
             }
         }
         req.send(null);
    }
}

function buscarNome (nome) {
    document.getElementById('mostrarInscritos').style.display="inherit";
    var req;

    if (nome == '') {
        document.getElementById('resultado').innerHTML = "<div class='alert alert-danger' style='text-align:center;' role='alert'>Por favor, Digite um nome v&aacute;lido</div>";
        return false;
    }

    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
     }
     else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
     }
      
     var url = "buscar_nome.php?nome=" + nome;
     req.open("GET", url, true); 
     
     req.onreadystatechange = function() {  
         if(req.readyState == 1) {
             document.getElementById('resultado').innerHTML = 'Buscando Registro...';
         }
      
         if(req.readyState == 4 && req.status == 200) {
             var resposta = req.responseText;
             document.getElementById('resultado').innerHTML = resposta;
         }
     }
     req.send(null);
}

function confirmarPresenca(cpf, count) {
    var req;
    var div_id = 'checkin-'+count;

    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
     }
     else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
     }
      
     var url = "confirmar_presenca.php?cpf=" + cpf;
     req.open("GET", url, true); 
     
     req.onreadystatechange = function() {  
         if(req.readyState == 1) {
             document.getElementById('resultado').innerHTML = 'Registrando inscrição...';
         }
      
         if(req.readyState == 4 && req.status == 200) {
             var resposta = req.responseText;
             if (resposta){
                document.getElementById(div_id).innerHTML = "CONFIRMADO";
             } else {
                document.getElementById('resultado').innerHTML = resposta;
             }
         }
     }
     req.send(null);
}