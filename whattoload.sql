create database classmem;

\c classmem

create role classviewer with login;

create table students (
	id serial,
		firstname text,
		lastname text,
		class text
);

grant select on students to classviewer;

insert into classviewer(firstname, lastname,class) VALUES

	('john','bonipart','cpsc240'),

	('alice','hooligan','cpsc240'),

	('nick','leback','ventriloquy'),

	('joe','dimmagio','guitar'),

	('mit','peck','guitar'),

	('an','gerissues','meditation'),

	('test','thething','remedialLiteracy'),

	('ignoremeplease','nodont','vim'),

	('a','a','vim');


