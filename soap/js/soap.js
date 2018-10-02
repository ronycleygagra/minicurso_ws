/**
 * @description Armazena as funções que fazem a comunicação com os WebServices
 * @author SEBRAE/PB - UTIC - Ronycley Gonçalves Agra - suportecg@sebraepb.com.br
 * @param String value_cpf
 * @returns void
 * @requires ./config.js
 * 14/09/2018
 */

/**
 * @param String value_cpf
 * @returns void
 * 14/09/2018
 */
function consultaclientefornecedor(value_cpf) {
    var cpfcnpj = value_cpf;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url_consultaclientefornecedor, true);
    xmlhttp.setRequestHeader('Content-Type', contenttype);
    xmlhttp.setRequestHeader('SOAPAction', soapaction_consultaclientefornecedor);
    
    var strRequest = 
            "<soapenv:Envelope \n\
                xmlns:soapenv= '"+ soapenv + "' \n\
                xmlns:tem='"+ tem + "'>" +
            "   <soapenv:Header>\n\
                    <wsse:Security \n\
                        soapenv:mustUnderstand='"+ mustUnderstand + "' \n\
                        xmlns:wsse='"+ wsse + "' \n\
                        xmlns:wsu='"+ wsu + "'>\n\
                        <wsse:UsernameToken wsu:Id='"+ UsernameTokenId + "'>\n\
                            <wsse:Username>"+ Username + "</wsse:Username>\n\
                            <wsse:Password \n\
                                Type='"+ passwordtype + "'>"+ password + "</wsse:Password>\n\
                            <wsse:Nonce EncodingType='"+ nonceencodingtype + "'>"+ nonce + "</wsse:Nonce>\n\
                        </wsse:UsernameToken>\n\
                    </wsse:Security>\n\
                </soapenv:Header>" +
            "   <soapenv:Body>" +
            "      <tem:ConsultaClienteFornecedor>" +
            "         <tem:CodColigada>"+ codcoligada + "</tem:CodColigada>" +
            "         <tem:Filter>CGCCFO = '" + cpfcnpj + "'</tem:Filter>" +
            "         <tem:ResultFields>"+resultfields+"</tem:ResultFields>" +
            "         <tem:Schema>"+schema+"</tem:Schema>" +
            "      </tem:ConsultaClienteFornecedor>" +
            "   </soapenv:Body>" +
            "</soapenv:Envelope>";
    //console.log(strRequest);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlhttp.response, encodingxmltostring);
            var resultado = xmlDoc.getElementsByTagName(tagname)[0].childNodes[0].nodeValue;

            var resultforn = parser.parseFromString(resultado, encodingxmltostring);
            $("#nome").text(resultforn.getElementsByTagName("NOME")[0].childNodes[0].nodeValue);
            $("#codigo").text(resultforn.getElementsByTagName("CODCFO")[0].childNodes[0].nodeValue);
            $("#cgccnpj").text(resultforn.getElementsByTagName("CGCCFO")[0].childNodes[0].nodeValue);
        }
    };
    xmlhttp.send(strRequest);
}