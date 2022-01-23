$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão btCadespesas
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
                // redireciona a pagina
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
    // código para mapear click do botão btLisdespesas
    $(document).on("click", "#btLisdespesas", function () {
        //pegar dados da tela
        date = $("#campodate").val();
        nomeunidade = $("#camponomeunidade").val();
        // preparar dados no formato json
        var dados3 = JSON.stringify({date: date, nomeunidade: nomeunidade});
        // fazer requisição para o back-end
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
                if(date!=""){
                    if(Usi1[i].pagamento=="Em aberto"){
                        var data_venc=new Date(Usi1[i].vencimento)//transforma em data
                        if (data_venc<data_filtro){//filtro de data
                            linhaUni=
                            '<div class="divisoria">'+
                            '<div class="linha"></div>'+
                                '<h3 class="titulo"> id da despesa: ' + Usi1[i].iddespesas +'</h3>'+
                                '<div style="background-color: #f0efefef;" classe="row-1">'+
                                    '<p>Descrição da despesa: '+ Usi1[i].desc + '</p>'+
                                    '<p>Tipo de Despesa: '+ Usi1[i].tipo_despesa + '</p>'+
                                    '<p>Data de vencimento: '+ Usi1[i].vencimento + '</p>'+
                                    '<p>Unidade da despesa: '+ Usi1[i].unidade_despesa + '</p>'+
                                    '<div class="linha">'+
                                    '<p style="display:inline-block">Status: '+ Usi1[i].pagamento + '</p>'+
                                    '<p id="editar_' + Usi1[i].iddespesas +'"' + 
                                    'class="editar_despesas btn"><img style="possition: relative; right:100px" src="../imagens/pencil-square.svg" '+ 
                                    'alt="editar despesas" title="editar despesas"></p>'+
                                    '</div>'+
                            '</div>'+
                        '</div>';
                            // adiciona a linha no corpo da tabela
                            $('#lista_despesas').append(linhaUni);
                        }
                    }
                }   
                else{
                    linhaUni=
                    '<div class="divisoria">'+
                    '<div class="linha"></div>'+
                        '<h3 class="titulo"> id da despesa: ' + Usi1[i].iddespesas +'</h3>'+
                        '<div style="background-color: #f0efefef;" classe="row-1">'+
                            '<p>Descrição da despesa: '+ Usi1[i].desc + '</p>'+
                            '<p>Tipo de Despesa: '+ Usi1[i].tipo_despesa + '</p>'+
                            '<p>Data de vencimento: '+ Usi1[i].vencimento + '</p>'+
                            '<p>Unidade da despesa: '+ Usi1[i].unidade_despesa + '</p>'+
                            '<div class="linha">'+
                            '<p style="display:inline-block">Status: '+ Usi1[i].pagamento + '</p>'+
                            '<div style="margin-left:20%" class="img-container">'+
                                '<p id="editar_' + Usi1[i].iddespesas +'"' + 
                                'class="editar_despesas btn"><img src="../imagens/pencil-square.svg" '+ 
                                'alt="editar despesas" title="editar despesas"></p>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                // adiciona a linha no corpo da tabela
                    $('#lista_despesas').append(linhaUni);
                }
            }
        }
    })
});

$(function() { // quando o documento estiver pronto/carregado
    // código para mapear click do botão btLimpardespesas
    $(document).on("click", "#btLimpardespesas", function () {
        location.reload();
    })     
});

$(function() { // quando o documento estiver pronto/carregado
    $(document).on("click", ".editar_despesas", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone
        var nome_icone = "editar_";
        var id_pessoa = componente_clicado.substring(nome_icone.length);
        // solicitar a edição da despesa
        $.ajax({
            url: 'http://localhost:5000/editar_despesas/'+id_pessoa,
            type: 'POST', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: pessoasalva, // chama a função pessoasalva para processar o resultado
            error: erroAosalvar
        });
        function pessoasalva (retorno) {
            alert(retorno.detalhes)
            window.location.href = 'editdespesas.html';
        }
        function erroAosalvar (retorno) {
            // informar mensagem de erro
            alert("erro");
        }
    });
});

$(function () { // quando o documento estiver pronto/carregado
    // código para mapear click do botão btEDCadespesas
    $(document).on("click", "#btEDCadespesas", function () {
        //pegar dados da tela
        EDdescriçao = $("#campoEDdescriçao").val();
        EDtipo_despesa = $("#campoEDtipo_despesa").val();
        EDvalor = $("#campoEDvalor").val();
        EDvencimento = $("#campoEDvencimento").val();
        EDpagamento = $("#campoEDpagamento").val();
        EDidunidade_despesa = $("#campoEDidunidade_despesa").val();
        // preparar dados no formato json
        var dados = JSON.stringify({EDdescriçao: EDdescriçao, EDtipo_despesa: EDtipo_despesa, EDvalor: EDvalor, EDvencimento:EDvencimento, EDpagamento:EDpagamento, EDidunidade_despesa:EDidunidade_despesa});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/editar_despesa',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: editar_despesa, // chama a função editar_despesa para processar o resultado
            error: erroAoIncluir
        });
        function editar_despesa (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Despesa alterada com sucesso!");
                window.location.href = 'despesas.html';
                // limpar os campos
                $("#campoEDdescriçao").val();
                $("#campoEDtipo_despesa").val();
                $("#campoEDvalor").val();
                $("#campoEDvencimento").val();
                $("#campoET_conta").val();
                $("#campoEDidunidade_despesa").val();
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