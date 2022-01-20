$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btCadunidade", function () {
        //pegar dados da tela
        endereço = $("#campoendereço").val();
        condominio = $("#campocondominio").val();
        proprietario = $("#camponomeproprietario").val();
        // preparar dados no formato json
        var dados = JSON.stringify({condominio: condominio, endereço: endereço, proprietario:proprietario});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_unidades',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_unidades, // chama a função cadastrar_unidades para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_unidades (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                window.location.href = 'unidade.html';
                // limpar os campos
                $("#campoendereço").val();
                $("#campocondominio").val();
                $("#camponomeproprietario").val();
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});

$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/lista_unidades',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (Usi1) {
        // percorrer a lista de Usi1 retornadas;
        for (var i in Usi1) { //i vale a posição no vetor
          //lin='<div class="card cores10card col-3">'+
            linhaUni='<div style="margin: 30px;">'+
                '<h4 class="card-title"> id da conta: ' + Usi1[i].idunidades +'</h4>'+
                '<p class="card-text">Nome do Proprietario: '+ Usi1[i].condominio + '</p>'+
                '<p class="card-text">Tipo de Conta: '+ Usi1[i].endereço + '</p>'+
                '<p class="card-text">Institução Financeira: '+ Usi1[i].proprietario + '</p>'+
                '</div>'+
                '<br>';
            // adiciona a linha no corpo da tabela
            $('#lista_unidades1').append(linhaUni);
        }
    }

});