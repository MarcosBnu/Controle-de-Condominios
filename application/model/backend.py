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
@app.route("/lista_inquilinos")
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

app.run(debug = True, host="0.0.0.0")