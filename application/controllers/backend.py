from model.modelo import Inquilinos
from model.config import *
from flask import Flask, json, jsonify, request

path = os.path.dirname(os.path.abspath(__file__))
retorno_receita=[]
np=[]
@app.route("/cadastrar_usuario", methods=["POST"])
def cadastrar_usuario():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova conta
    dados = request.get_json()# (force=True) dispensa Content-Type na requisição
    if dados["Nome_usuario"]=="" or dados["Email"]=="" or dados["Senha"]=="" or dados["Saldo"]=="" or dados["Status"]=="" or dados["financeira"]=="":
        #verifica se o usuario não deixou nem um campo em branco
        resposta = jsonify({"resultado": "erro", "detalhes": "preencha todos os campos"})
        return resposta        
    try:  # tentar executar a operação
        nova = Inquilinos(**dados)  # criar a nova conta
        db.session.add(nova)  # adicionar no BD
        db.session.commit()  # efetivar a operação de gravação
    except Exception as e:  # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta  # responder!