use Gufi
go

insert into tipoUsuario(tituloTipoUsuario)
values				   ('Administrador')
					  ,('Comum')
go

insert into usuario(idTipoUsuario, nomeUsuario, email, senha)
values			   (1, 'Administrador', 'adm@adm.com', 'adm123')
				  ,(2, 'Caique', 'caique@email.com', 'caique123')
				  ,(2, 'Saulo', 'saulo@email.com', 'saulo123')
go

insert into instituicao(cnpj, nomeFantasia, endereco)
values				   ('99999999999999', 'Escola SENAI de Inform�tica', 'Al. Bar�o de Limeira, 538')
go

insert into tipoEvento(tituloTipoEvento)
values				  ('C#')
					 ,('ReactJS')
					 ,('SQL')
go

insert into evento(idTipoEvento, idInstituicao, nomeEvento, acessoLivre, dataEvento, descricao)
values			  (1, 1, 'Orienta��o a Objetos', 1, '07/04/2021', 'Conceitos sobre os pilares da programa��o orientada a objetos')
				 ,(2, 1, 'Ciclo de Vida', 0, '08/04/2021', 'Como utilizar os ciclos de vida com a biblioteca ReactJs')
				 ,(3, 1, 'Introdu��o a SQL', 1,'09/04/2021', 'Comandos b�sicos utilizando SQL Server')
go

insert into presenca(idUsuario, idEvento, situacao)
values				(2,2, 'n�o confirmada')
				   ,(3,1,'confirmada')
				   ,(2, 3, 'confirmada')
go





