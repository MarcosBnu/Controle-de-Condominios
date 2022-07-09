$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão btCadunidade
    $(document).on("click", "#btCadunidade", function () {
        //pegar dados da tela
        unidade_nome = $("#camponomeunidade").val();
        endereço = $("#campoendereço").val();
        condominio = $("#campocondominio").val();
        proprietario = $("#camponomeproprietario").val();
        // preparar dados no formato json
        var dados = JSON.stringify({unidade_nome: unidade_nome, condominio: condominio, endereço: endereço, proprietario:proprietario});
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
                // redireciona a pagina
                window.location.href = 'unidade.html';
                // limpar os campos
                $("#camponomeunidade").val();
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
            linhaUni=
            '<div class="card text-white bg-primary mb-3" style="max-width: 100%;">'+
                '<div class="card-header">id da unidade: ' + Usi1[i].idunidades +'</div>'+
                '<div class="card-body">'+
                    '<h3 class="card-title">Nome da Unidade: '+ Usi1[i].unidade_nome + '</h3>'+
                    '<hr>'+
                    '<p class="card-text">Nome do condominio: '+ Usi1[i].condominio + '</p>'+
                    '<hr>'+
                    '<p class="card-text">Endereço: '+ Usi1[i].endereço + '</p>'+
                '</div>'+
            '</div>';
            // adiciona a linha no corpo da tabela
            $('#lista_unidades1').append(linhaUni);
        }
    }

});