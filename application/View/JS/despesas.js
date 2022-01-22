$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btCadespesas", function () {
        //pegar dados da tela
        desc = $("#campodescriçao").val();
        tipo_despesa = $("#campotipo_despesa").val();
        valor = $("#campovalor").val();
        vencimento = $("#campovencimento").val();
        pagamento = $("#campopagamento").val();
        unidade_despesa = $("#campoidunidade_despesa").val();
        // preparar dados no formato json
        var dados = JSON.stringify({desc: desc, tipo_despesa: tipo_despesa, valor: valor, vencimento:vencimento, pagamento:pagamento,  unidade_despesa:unidade_despesa});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/cadastrar_despesas',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: cadastrar_despesas, // chama a função cadastrar_despesas para processar o resultado
            error: erroAoIncluir
        });
        function cadastrar_despesas (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                window.location.href = 'despesas.html';
                // limpar os campos
                $("#campodescriçao").val();
                $("#campotipo_despesa").val();
                $("#campovalor").val();
                $("#campovencimento").val();
                $("#campoidunidade_despesa").val();
                $("#campoidunidade_despesa").val();
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
    $(document).on("click", "#btLisdespesas", function () {
        date = $("#campodate").val();
        nomeunidade = $("#camponomeunidade").val();
        var dados3 = JSON.stringify({date: date, nomeunidade: nomeunidade});
        $.ajax({
            url: 'http://localhost:5000/listar_despesas',
            method: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados3, // estes são os dados enviados
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert(dados3);
            }
        });
        function listar (Usi1) {
            // percorrer a lista de Usi1 retornadas;
            alert("Aviso: lembre-se sempre de limpar o filtro antes de filtrar novamente")
            var data_filtro=new Date(date);
            for (var i in Usi1) { //i vale a posição no vetor
                alert(date)
                if(date!=""){
                    alert("passou")
                    if(Usi1[i].pagamento=="Em aberto"){
                        alert("passou1")
                        var data_venc=new Date(Usi1[i].vencimento)
                        if (data_venc<data_filtro){
                            alert("passou2")
                            linhaUni='<div style="margin: 30px;">'+
                                '<h1 class="card-title"> id da conta: ' + Usi1[i].iddespesas +'</h1>'+
                                '<p class="card-text">Nome do Proprietario: '+ Usi1[i].desc + '</p>'+
                                '<p class="card-text">Tipo de Conta: '+ Usi1[i].tipo_despesa + '</p>'+
                                '<p class="card-text">Institução Financeira: '+ Usi1[i].valor + '</p>'+
                                '<p class="card-text">Institução Financeira: '+ Usi1[i].vencimento + '</p>'+
                                '<p class="card-text">Institução Financeira: '+ Usi1[i].pagamento + '</p>'+
                                '<p class="card-text">Institução Financeira: '+ Usi1[i].unidade_despesa + '</p>'+
                                '</div>'+
                                '<br>';
                            // adiciona a linha no corpo da tabela
                            $('#lista_despesas').append(linhaUni);
                        }
                    }
                }   
                //lin='<div class="card cores10card col-3">'+
                else{
                    linhaUni='<div style="margin: 30px;">'+
                    '<h1 class="card-title"> id da conta: ' + Usi1[i].iddespesas +'</h1>'+
                    '<p class="card-text">Nome do Proprietario: '+ Usi1[i].desc + '</p>'+
                    '<p class="card-text">Tipo de Conta: '+ Usi1[i].tipo_despesa + '</p>'+
                    '<p class="card-text">Institução Financeira: '+ Usi1[i].valor + '</p>'+
                    '<p class="card-text">Institução Financeira: '+ Usi1[i].vencimento + '</p>'+
                    '<p class="card-text">Institução Financeira: '+ Usi1[i].pagamento + '</p>'+
                    '<p class="card-text">Institução Financeira: '+ Usi1[i].unidade_despesa + '</p>'+
                    '</div>'+
                    '<br>';
                // adiciona a linha no corpo da tabela
                    $('#lista_despesas').append(linhaUni);
                }
            }
        }
    })
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", "#btLimpardespesas", function () {
        location.reload();
    })     
});