

-- DROP TABLE master.dbo.PQ_CurrentCredentials GO

CREATE TABLE dbo.PQ_CurrentCredentials (
                                                id bigint IDENTITY(1,1) NOT NULL,
                                                CredentialsType int NOT NULL,
                                                expiresIn bigint NULL,
                                                lastModification datetime2(7) NULL,
                                                OwnerID bigint NOT NULL,
                                                OwnerType int NOT NULL,
                                                Payload varchar(2000) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                CONSTRAINT PK__PQ_Curre__3213E83F72234C16 PRIMARY KEY (id)
) GO;



CREATE TABLE dbo.PQ_ExternalServiceCredentials (
                                                  ID bigint IDENTITY(1,1) NOT NULL,
                                                  ApiUrl varchar(400) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                  NameService varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                  credentialsType int NOT NULL,
                                                  LoginFlowType int NOT NULL,
                                                  LoginUrl varchar(400) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                  OwnerID bigint NOT NULL,
                                                  OwnerType int NOT NULL,
                                                  parametersResolverType int NOT NULL,
                                                  Password varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                  Username varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
                                                  CONSTRAINT PK__PQ_Exter__3214EC27EBD2CA8C PRIMARY KEY (ID)
) GO;

CREATE INDEX idx_ExternalSrvCreds_Owner on PQ_ExternalServiceCredentials(OwnerID, OwnerType);