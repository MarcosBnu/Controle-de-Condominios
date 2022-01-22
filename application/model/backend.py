from modelo import *
from config import *
from flask import Flask, json, jsonify, request

path = os.path.dirname(os.path.abspath(__file__))
retorno_receita=[]
np=[]

@app.route("/cadastrar_inquilinos", methods=["POST"])
def cadastrar_inquilinos():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova conta
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    if dados["nome_inquilino"]=="" or dados["idade"]=="" or dados["sexo"]=="" or dados["telefone"]=="" or dados["email"]=="":
        #verifica se o usuario não deixou nem um campo em branco
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Inquilinos(**dados)  # criar a nova conta
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
    # receber as informações da nova conta
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
    # receber as informações da nova conta
    dados2 = request.get_json()# (force=True) dispensa Content-Type na requisição
   
    try:  # tentar executar a operação
        informaçoes_unidade=Unidades.query.filter_by(idunidades=dados2['unidade_despesa']).first()#busca no banco de dados as informaçoes
        if informaçoes_unidade:
            nova = Despesas(**dados2)  # criar a nova conta
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
            filtro=db.session.query(Unidades).filter_by(condominio=dados3["nomeunidade"]).first()
            filtro=int(filtro.idunidades)
            Usi1 = db.session.query(Despesas).filter_by(unidade_despesa=filtro).all()
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
app.run(debug = True, host="0.0.0.0")