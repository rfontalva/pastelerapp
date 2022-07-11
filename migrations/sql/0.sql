CREATE TABLE User (
  id_user int NOT NULL AUTO_INCREMENT,
  username varchar(60) NOT NULL,
  firstname varchar(60) NOT NULL,
  lastname varchar(60) DEFAULT NULL,
  company varchar(60) DEFAULT NULL,
  email varchar(60) NOT NULL,
  password varchar(64) NOT NULL,
  image text,
  PRIMARY KEY (id_user),
  UNIQUE KEY username (username),
  UNIQUE KEY email (email)
);

create table Statement (
  id_statement int not null AUTO_INCREMENT primary key,
  id_user int not null,
  `date` timestamp,
  detail varchar(128),
  value float,
  `type` ENUM('income', 'outcome') default 'income',
  foreign key fk_user_statement (id_user) references User(id_user)
);

create table ResourceType (
	id_resourceType int auto_increment not null PRIMARY KEY,
    id_user int not null,
    resourceType varchar(128),
    CONSTRAINT fk_user_resourcetype FOREIGN KEY (id_user) references User(id_user)
);

create table Resource (
	id_resource int auto_increment not null PRIMARY KEY,
    id_user int not null,
    id_resourceType int not null,
    resource varchar(128),
    price float,
    quantity ENUM("x kg", "x lt", "x12", "x1", "pack") default "x1",
    CONSTRAINT fk_user_resource FOREIGN KEY (id_user) references User(id_user),
    CONSTRAINT fk_resourceType_resource FOREIGN KEY (id_resourceType) references ResourceType(id_resourcetype)
);

create table FixedCost(
	id_fixedCost int auto_increment not null primary key,
    id_user int not null,
    fixedCost varchar(128),
    cost float,
    constraint fk_user_fixedCost FOREIGN KEY (id_user) references User(id_user)
);
