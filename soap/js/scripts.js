//Adiciona a máscara do cpf
$(document).ready(function(){
    var $cpf = $("#cpf");
    $cpf.mask('000.000.000-00', {reverse: true});
});

//Adiciona a máscara do cnpj
$(document).ready(function(){
    var $cpf = $("#cnpj");
    $cpf.mask('00.000.000/0000-00', {reverse: true});
});

