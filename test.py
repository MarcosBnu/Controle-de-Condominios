from application.model.modelo import *




def teste():
    
    
    db.drop_all()
    db.create_all()

    Inquilinos1 =Inquilinos(nome_inquilino="Rodri", idade= 74, sexo="Masculino", telefone=4784891980, email="Rodri@gmail.com") 
    Inquilinos2 =Inquilinos(nome_inquilino="Marta", idade= 54, sexo="Feminino", telefone=4791971309, email="Marta@gmail.com") 

    Unidades1 = Unidades(unidade_nome="dinei", condominio="condominio 1", endereço="rua 123 bairro badenfurt", proprietario="Lucas paulo")
    Unidades2 = Unidades(unidade_nome="samb", condominio="condominio 2", endereço="Rua 321 bairro vila nova", proprietario="matheus gabriel")

    Despesas1 = Despesas(desc="Despesas da Unidades 1", tipo_despesa= "conta de manutenção do elevador", valor=123, vencimento="2021-10-10", pagamento="Em aberto", unidade_despesa=1)
    Despesas2 = Despesas(desc="Despesas da Unidades 2", tipo_despesa= "conta de limpeza", valor=112, vencimento="2022-12-22", pagamento="Pago", unidade_despesa=2)
    Despesas3 = Despesas(desc="Despesas da Unidades 2", tipo_despesa= "conta de agua", valor=1001, vencimento="2021-12-29", pagamento="Pago", unidade_despesa=2)
    Despesas4 = Despesas(desc="Despesas da Unidades 1", tipo_despesa= "conta de luz", valor=230, vencimento="2021-12-30", pagamento="Em aberto", unidade_despesa=1)

    db.session.add_all([Inquilinos1,Inquilinos2, Unidades1, Unidades2, Despesas1, Despesas2, Despesas3, Despesas4])
    db.session.commit()
teste()