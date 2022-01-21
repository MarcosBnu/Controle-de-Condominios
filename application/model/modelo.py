
from config import db
import os
#importa as bibliotecas necessarias do arquivo __init__.py


caminho = os.path.dirname(os.path.abspath(__file__)) 
arquivobd = os.path.join(caminho, "banco.db") #recebe o caminho do arquivo banco.db






class Inquilinos (db.Model):#cria a tabela Inquilinos 
    #cria as colunas
    id = db.Column(db.Integer, primary_key=True)#chave primaria
    nome_inquilino=db.Column(db.String(200), nullable=False)
    idade= db.Column(db.Integer, nullable=False)
    sexo= db.Column(db.String(18), nullable=False)
    telefone= db.Column(db.String(20), nullable=False)
    email= db.Column(db.String(200), unique=True, nullable=False)
    #nullable significa que o campo não pode ser nulo
    def __str__(self):
        return f'{str(self.id)},{self.nome_inquilino}, {self.idade}, {self.sexo}, {self.telefone}, {self.email}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "id" : self.id,
            "nome_inquilino" : self.nome_inquilino,
            "idade" : self.idade,
            "sexo" : self.sexo,
            "telefone" : self.telefone,
            "email" : self.email,
            #retorna em join as informaçoes
        }
        
class Unidades (db.Model):#cria a tabela Unidades
    #cria as colunas
    idunidades = db.Column(db.Integer, primary_key=True)#chave primaria
    condominio=db.Column(db.String(200), nullable=False)
    endereço= db.Column(db.String(400), nullable=False)
    #nullable significa que o campo não pode ser nulo
    proprietario = db.Column(db.String(400), nullable= False)
    def __str__(self):
        return f'{str(self.idunidades)}, {self.condominio}, {self.endereço}, {self.proprietario}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "idunidades" : self.idunidades,
            "condominio" : self.condominio,
            "endereço" : self.endereço,
            "proprietario" : self.proprietario,
            #retorna em join as informaçoes
        }


class Despesas(db.Model):#cria a tabela Despesas
    #cria as colunas
    iddespesas = db.Column(db.Integer, primary_key=True)#chave primaria
    desc=db.Column(db.String(500), nullable=False)
    tipo_despesa=db.Column(db.String(100), nullable=False)
    valor= db.Column(db.Integer, nullable=False) 
    vencimento= db.Column(db.String, nullable=False)
    pagamento = db.Column(db.String, nullable= False)
    
    # relacionamento das clases
    unidade_despesa = db.Column(db.Integer, db.ForeignKey(Unidades.idunidades), nullable= False)
    unidades = db.relationship("Unidades", foreign_keys =  unidade_despesa)#chave estrangeira
    #nullable significa que o campo não pode ser nulo
    def __str__(self):
        return f'{str(self.iddespesas)}, {self.desc}, {self.tipo_despesa}, {self.valor}, {self.vencimento}, {self.pagamento}, {self.unidade_despesa}'
    #retorna em string as informaçoes
    def json(self):
        return{
            "iddespesas" : self.iddespesas,
            "desc" : self.desc,
            "tipo_despesa" : self.tipo_despesa,
            "valor" : self.valor,
            "vencimento" : self.vencimento,
            "pagamento" : self.pagamento,
            "unidade_despesa": self.unidade_despesa
            #retorna em join as informaçoes
        }
        
if __name__=="__main__":#testa as classes
    if os.path.exists(arquivobd):
        os.remove(arquivobd)#remove o banco de dados se existir
        print("foi")
    db.create_all()#cria o banco de dados