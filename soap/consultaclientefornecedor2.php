<?php
require_once 'header2.html';
?>
<div class="row">
    <div class="col-md-6">
        <form id="formenviarcpf"  name="formenviarcpf"
              action="javascript:consultaclientefornecedor(formenviarcpf.cpf.value);">
            <div class="form-group">
                <label for="exampleInputEmail1">CPF/CNPJ</label>
                <input class="form-control" type="text" 
                       placeholder="000.000.000-00" 
                       name="cpf" id="cpf" >
            </div>
        </form>
    </div>
    <div class="col-md-6">
        <form id="formenviarcnpj"  name="formenviarcnpj"
              action="javascript:consultaclientefornecedor(formenviarcnpj.cnpj.value);">
            <div class="form-group">
                <label for="exampleInputEmail1">CPF/CNPJ</label>
                <input class="form-control" type="text" 
                       placeholder="00.000.000/0000-00" 
                       name="cnpj" id="cnpj" >
            </div>
        </form>
    </div>
</div>
<!--
<button type="button" onclick="consultaclientefornecedor(document.getElementById('cpf').value);" 
        class="btn btn-primary">Pesquisar</button>-->
<br>
<div class="col-12">
    <div class="card">
        <div class="card-header">
            CLIENTE/FORNECEDOR
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <h6 class="card-title">Nome</h6>
                    <p class="card-text" id="nome"></p>
                </div>
                <div class="col-md-4">
                    <h6 class="card-title">Código</h6>
                    <p class="card-text" id="codigo"></p>
                </div>
                <div class="col-md-4">
                    <h6 class="card-title">CPF/CNPJ</h6>
                    <p class="card-text" id="cgccnpj"></p>
                </div>
            </div>  
        </div>
    </div>
</div>
<?php

require_once 'footer.html';
?>