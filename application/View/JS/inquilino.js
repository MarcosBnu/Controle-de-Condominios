$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
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
            url: 'http://localhost:5000/cadastrar_inquilinos',
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
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});

$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/lista_inquilinos',
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
          //lin='<div class="card cores10card col-3">'+
            lin='<div style="margin: 30px;">'+
                '<h4 class="card-title"> id da conta: ' + Usi[i].id +'</h4>'+
                '<p class="card-text">Nome do Proprietario: '+ Usi[i].nome_inquilino + '</p>'+
                '<p class="card-text">Tipo de Conta: '+ Usi[i].idade + '</p>'+
                '<p class="card-text">Institução Financeira: '+ Usi[i].sexo + '</p>'+
                '<p class="card-text">Institução Financeira: '+ Usi[i].telefone + '</p>'+
                '<p class="card-text">Institução Financeira: '+ Usi[i].email + '</p>'+
                '</div>'+
                '<br>';
            // adiciona a linha no corpo da tabela
            $('#listar_inquilinos1').append(lin);
        }
    }

});