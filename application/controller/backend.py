from model.modelo import *
from flask import Flask, json, jsonify, request

path = os.path.dirname(os.path.abspath(__file__))
retorno_receita=[]
np=[]

@app.route("/cadastrar_inquilinos", methods=["POST"])
def cadastrar_inquilinos():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo inquilino
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    if dados["nome_inquilino"]=="" or dados["idade"]=="" or dados["sexo"]=="" or dados["telefone"]=="" or dados["email"]=="":
        #verifica se o usuario não deixou nem um campo em branco
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Inquilinos(**dados)  # criar o novo inquilino
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": "fepp"})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!
@app.route("/lista_inquilinos", methods=["GET"])
def lista_inquilinos():
    # obter os Inquilinos cadastradas
    Usi = db.session.query(Inquilinos).all()
    # aplicar o método json que a classe Inquilinos possui a cada elemento da lista
    inquilinos_em_json = [ x.json() for x in Usi ]
    # converter a lista do python para json
    resposta = jsonify(inquilinos_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/cadastrar_unidades", methods=["POST"])
def cadastrar_unidades():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova unidade
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
   
    try:  # tentar executar a operação
        nova = Unidades(**dados)  # criar a nova conta
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/lista_unidades", methods=["GET"])
def lista_unidades():
    # obter as Unidades cadastradas
    Usi1 = db.session.query(Unidades).all()
    # aplicar o método json que a classe Unidades possui a cada elemento da lista
    unidades_em_json = [ x.json() for x in Usi1 ]
    # converter a lista do python para json
    resposta = jsonify(unidades_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/cadastrar_despesas", methods=["POST"])
def cadastrar_despesas():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova despesa
    dados2 = request.get_json()# (force=True) dispensa Content-Type na requisição
   
    try:  # tentar executar a operação
        informaçoes_unidade=Unidades.query.filter_by(idunidades=dados2['unidade_despesa']).first()#busca no banco de dados as informaçoes
        if informaçoes_unidade:
            nova = Despesas(**dados2)  # criar a nova despesa
            db.session.add(nova)  # adicionar no BD
            db.session.commit()  # efetivar a operação de gravação
        else:
            resposta = jsonify({"resultado": "erro", "detalhes": "voce digitou uma unidade que ainda não existe, cadastre essa unidade primeiro"})     
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/listar_despesas", methods=["POST"])
def listar_despesas():
    dados3 = request.get_json()
    try:
        if dados3["nomeunidade"]=="":
            # obter as Despesas cadastradas
            Usi1 = db.session.query(Despesas).all()
            # aplicar o método json que a classe Despesas possui a cada elemento da lista
            despesas_em_json = [ x.json() for x in Usi1 ]
            # converter a lista do python para json
            resposta = jsonify(despesas_em_json)
            # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
            resposta.headers.add("Access-Control-Allow-Origin", "*")
            return resposta # retornar...
        if  dados3["nomeunidade"]!="":
            filtro=db.session.query(Unidades).filter_by(unidade_nome=dados3["nomeunidade"]).first()
            filtro=int(filtro.idunidades)
            Usi1 = db.session.query(Despesas).filter_by(unidade_despesa=filtro).all()#faz o filtro
            # aplicar o método json que a classe Despesas possui a cada elemento da lista
            despesas_em_json = [ x.json() for x in Usi1 ]
            # converter a lista do python para json
            resposta = jsonify(despesas_em_json)
            # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
            resposta.headers.add("Access-Control-Allow-Origin", "*")
            return resposta # retornar...
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!

@app.route("/editar_despesas/<int:pessoa_id>", methods=["POST"]) 
def editar_despesas(pessoa_id): 
   # preparar uma resposta otimista 
   np.clear()
   try: 
       np.append(pessoa_id)#salva na lista
       resposta = jsonify({"resultado": "ok", "detalhes": str(np)}) 
   except Exception as e: 
      # informar mensagem de erro 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
   # adicionar cabeçalho de liberação de origem 
   resposta.headers.add("Access-Control-Allow-Origin", "*") 
   return resposta # responder!

@app.route("/editar_despesa", methods=['POST'])
def editar_despesa():
    dados = request.get_json() #pego os dados para atualizar
    valor=np[0]#recebe a id do usuario logado
    objeto=Despesas.query.filter_by(iddespesas=valor).first()#busca no banco de dados as informaçoes
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})#mensagem positiva
    try:
        #os if a baixo verifica o que o usuario deseja alterar
        if dados["EDdescriçao"]!="":
            objeto.desc = dados['EDdescriçao']
        if dados["EDtipo_despesa"]!="":
            objeto.tipo_despesa = dados['EDtipo_despesa']
        if dados["EDvalor"]!="":
            objeto.valor = dados['EDvalor']
        if dados["EDvencimento"]!="":
            objeto.vencimento = dados['EDvencimento']
        if dados["EDpagamento"]!="":
            objeto.pagamento = dados['EDpagamento']
        if dados["EDidunidade_despesa"]!="":
            informaçoes_unidade=Unidades.query.filter_by(idunidades=dados['EDidunidade_despesa']).first()
            if informaçoes_unidade:
                objeto.unidade_despesa = dados['EDidunidade_despesa']
            else:
                resposta = jsonify({"resultado": "erro", "detalhes": "voce digitou uma unidade que ainda não existe, cadastre essa unidade primeiro"}) 
        db.session.add(objeto)#salva as alterações no banco
        db.session.commit()#confirma as alterações
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(valor)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

#rota para apagar, recebe o id da despesa 
@app.route("/deletar_despesas/<int:id_pessoa>", methods=["DELETE"]) 
def cont_del(id_pessoa):
    try:
        resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
        Despesas.query.filter(Despesas.iddespesas == id_pessoa).delete() # excluir a despesa do ID informado
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
        # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
