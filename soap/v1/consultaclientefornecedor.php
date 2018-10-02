<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>WEBSERVICES SEBRAE-PB</title>
        <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery.mask.js"></script>
        <script type="text/javascript" src="js/scripts.js"></script>   
        <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="./css/style.css">
        <script>
            //Verifica as validacoes do cpf
            function enviar() {
                var cpf = $("#cpf").val();
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', 'http://rmportal.sebraepb.com.br/businessconnect/wsIntegracaoGenerica.asmx', true);
                xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                xmlhttp.setRequestHeader('SOAPAction', 'http://tempuri.org/ConsultaClienteFornecedor');
                var strRequest = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tem='http://tempuri.org/'>" +
                        "   <soapenv:Header><wsse:Security soapenv:mustUnderstand='1' \n\
            xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd' \n\
xmlns:wsu='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'>\n\
<wsse:UsernameToken wsu:Id='UsernameToken-C117B3932D3C29EB2115367586015063'>\n\
<wsse:Username>Webservice.sgtec</wsse:Username>\n\
<wsse:Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>NTBGWG1pMDA=</wsse:Password>\n\
<wsse:Nonce EncodingType='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary'>\n\
uugbsvUuHd8LhL19vVVjPQ==</wsse:Nonce><wsu:Created>2018-09-12T13:23:21.506Z</wsu:Created></wsse:UsernameToken></wsse:Security>\n\
</soapenv:Header>" +
                        "   <soapenv:Body>" +
                        "      <tem:ConsultaClienteFornecedor>" +
                        "         <tem:CodColigada>1</tem:CodColigada>" +
                        "         <tem:Filter>CGCCFO = '" + cpf + "'</tem:Filter>" +
                        "         <tem:ResultFields>CODCFO;NOME;CGCCFO;PAGREC</tem:ResultFields>" +
                        "         <tem:Schema>false</tem:Schema>" +
                        "      </tem:ConsultaClienteFornecedor>" +
                        "   </soapenv:Body>" +
                        "</soapenv:Envelope>";

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {

                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlhttp.response, "text/xml");
                        resultado = xmlDoc.getElementsByTagName("ConsultaClienteFornecedorResult")[0].childNodes[0].nodeValue;

                        resultforn = parser.parseFromString(resultado, "text/xml");
                        $("#nome").text(resultforn.getElementsByTagName("NOME")[0].childNodes[0].nodeValue);
                        $("#codigo").text(resultforn.getElementsByTagName("CODCFO")[0].childNodes[0].nodeValue);
                        $("#cgccnpj").text(resultforn.getElementsByTagName("CGCCFO")[0].childNodes[0].nodeValue);
                    }
                };

                xmlhttp.send(strRequest);
            }

        </script>
    </head>
    <body>
        <div class="container">
            <center>
                <img src="./imagens/sebrae.jpg">
                <H3>WEBSERVICES | SEBRAEPB | UTIC</H3>
            </center>
            <form id="formenviar" method="POST">
                <div class="form-group">
                    <label for="exampleInputEmail1">CPF</label>
                    <input class="form-control" type="text" placeholder="Default input" name="cpf" id="cpf">
                </div>
                <button type="button" onclick="enviar();" class="btn btn-primary">Pesquisar</button>
            </form>
            <br>

                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            CLIENTE/FORNECEDOR
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">Nome</h6>
                            <p class="card-text" id="nome"></p>
                            <h6 class="card-title">Código</h6>
                            <p class="card-text" id="codigo"></p>
                            <h6 class="card-title">CPF/CNPJ</h6>
                            <p class="card-text" id="cgccnpj"></p>
                        </div>
                    </div>
                </div>
        </div>
    </body>
</html>