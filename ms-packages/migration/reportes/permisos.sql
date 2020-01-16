
insert into PQ_UserAction(Name, Active, Deleted) VALUES('packagesExportForExpiration', 1,0);

insert into PQ_UserRoleToAction(UserRoleID, UserActionID, Active, Deleted)
values(
	(SELECT ID From PQ_UserRole where Name = 'Administrador PaqueryPoint'),
	(SELECT ID From PQ_UserAction where Name = 'packagesExportForExpiration'),
	1,0
);

insert into PQ_UserRoleToAction(UserRoleID, UserActionID, Active, Deleted)
values(
	(SELECT ID From PQ_UserRole where Name = 'Operador PaqueryPoint'),
	(SELECT ID From PQ_UserAction where Name = 'packagesExportForExpiration'),
	1,0
);