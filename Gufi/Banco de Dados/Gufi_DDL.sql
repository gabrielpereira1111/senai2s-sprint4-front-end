--cria um banco de dados chamado gufi
create database gufi									
go						

--cria tabela de tipoUsuario
use gufi												
go														


--cria tabela de tipoUsuario
create table tipoUsuario								
(
	idTipoUsuario		int primary key identity,
	tituloTipoUsuario	varchar(200) unique not null		
);
go


--cria tabela de usuários
create table usuario
(
	idUsuario			int primary key identity,
	idTipoUsuario		int foreign key references tipoUsuario(idTipoUsuario),
	nomeUsuario			varchar(200) not null,
	email				varchar(200) unique not null,
	senha				varchar(200) not null
);
go

--cria tabela instituicao
create table instituicao
(
	idInstituicao		int primary key identity,
	cnpj				char(14) unique not null,
	nomeFantasia		varchar(200) not null,
	endereco			varchar(250) unique not null
);
go

--cria tabela tipoEvento
create table tipoEvento
(
	idTipoEvento		int primary key identity,
	tituloTipoEvento	varchar(200) unique not null
);
go

--cria tabela de eventos
create table evento
(
	idEvento			int primary key identity,
	idTipoEvento		int foreign key references tipoEvento(idTipoEvento),
	idInstituicao		int foreign key references instituicao(idInstituicao),
	nomeEvento			varchar(250) not null,
	acessoLivre			bit default(1),
	dataEvento			date not null,
	descricao			varchar(300)
);
go

--cria tabela presenca
create table presenca
(
	idPresenca			int primary key identity,
	idUsuario			int foreign key references usuario(idUsuario),
	idEvento			int foreign key references evento(idEvento),
	situacao			varchar(250) not null
);
go





