link_back = "http://localhost:5000"
$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão btCadinquilino
    $(document).on("click", "#btCadinquilino", function () {
        //pegar dados da tela
        nome_inquilino = $("#camponome_inquilino").val();
        idade = $("#campoidade").val();
        sexo = $("#camposexo").val();
        telefone = $("#campotelefone").val();
        email = $("#campoemail").val();
        // preparar dados no formato json
        var dados = JSON.stringify({nome_inquilino: nome_inquilino, idade: idade, sexo: sexo, telefone:telefone, email:email});
        // fazer requisição para o back-end
        $.ajax({
            url: link_back+'/cadastrar_inquilinos',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_inquilinos, // chama a função cadastrar_inquilinos para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_inquilinos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                window.location.href = 'index.html';
                // limpar os campos
                $("#camponome_inquilino").val();
                $("#campoidade").val();
                $("#camposexo").val();
                $("#campotelefone").val();
                $("#campoemail").val();
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("EReRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});

$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: link_back+'/lista_inquilinos',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (Usi) {
        // percorrer a lista de Usi retornadas;
        for (var i in Usi) { //i vale a posição no vetor
            lin=
            '<div class="card text-white bg-primary mb-3" style="max-width: 95%;">'+
                '<div class="card-header">id da conta: ' + Usi[i].id +'</div>'+
                '<div class="card-body">'+
                    '<h3 class="card-title">Nome do Proprietario: '+ Usi[i].nome_inquilino + '</h3>'+
                    '<hr>'+
                    '<p class="card-text">Sexo: '+ Usi[i].sexo + '</p>'+
                    '<hr>'+
                    '<p class="card-text">Idade do inquilino: '+ Usi[i].idade + '</p>'+
                    '<hr>'+
                    '<p class="card-text">Tel: '+ Usi[i].telefone + '</p>'+
                    '<hr>'+
                    '<p class="card-text">Email:'+ Usi[i].email + '</p>'+
                '</div>'+
            '</div>';
            // adiciona a linha no corpo da tabela
            $('#listar_inquilinos1').append(lin);
        }
    }

});