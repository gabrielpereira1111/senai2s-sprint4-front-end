use Gufi


--Seleciona todos os dados da entidade evento
select * from evento
--Seleciona todos os dados da entidade instituicao
select * from instituicao
--Seleciona todos os dados da entidade presenca
select * from presenca
--Seleciona todos os dados da entidade tipoEvento
select * from tipoEvento
--Seleciona todos os dados da entidade tipoUsuario
select * from tipoUsuario
--Seleciona todos os dados da entidade usuario
select * from usuario


--Seleciona os usuários junto com o seu tipo de usuário
select idUsuario, nomeUsuario AS [Usuário], tituloTipoUsuario AS [Permissão], email from usuario
inner join tipoUsuario
on usuario.idTipoUsuario = tipoUsuario.idTipoUsuario

--Seleciona dados do evento, tipo de evento e instituição
select idEvento, nomeEvento as Evento, acessoLivre, dataEvento as [Data], descricao, nomeFantasia, tituloTipoEvento,
endereco from evento
inner join instituicao
on evento.idInstituicao = instituicao.idInstituicao
inner join tipoEvento
on evento.idTipoEvento = tipoEvento.idTipoEvento

-- Seleciona os dados dos eventos, da instituição, dos tipos de eventos e dos usuários
SELECT nomeUsuario Usuario, email, nomeEvento Evento, tituloTipoEvento Tema, dataEvento [Data]
FROM usuario 
INNER JOIN presenca 
ON presenca.idUsuario = usuario.idUsuario
INNER JOIN Evento 
ON presenca.idEvento = evento.idEvento
INNER JOIN tipoEvento 
ON evento.idTipoEvento = tipoEvento.idTipoEvento;


--Busca por email e senha
select nomeUsuario, email, tituloTipoUsuario as [Permissão] from usuario
inner join tipoUsuario
on usuario.idTipoUsuario = tipoUsuario.idTipoUsuario
where email = 'adm@adm.com' and senha = 'adm123'