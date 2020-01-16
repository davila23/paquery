/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Enterprise Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/

/****** Object:  Table [dbo].[PQ_Advertising]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Advertising](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[AdvertisingType] [int] NOT NULL,
	[Detail] [nvarchar](500) NULL,
	[Image] [nvarchar](50) NULL,
	[Link] [nvarchar](250) NULL,
	[ValidFrom] [datetime] NULL,
	[ValidTo] [datetime] NULL,
	[LogisticOperatorID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Advertising] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ApiKey]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ApiKey](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Key] [nvarchar](150) NOT NULL,
	[ApiUID] [uniqueidentifier] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[DueDate] [datetime] NULL,
	[OwnerType] [int] NOT NULL,
	[OwnerID] [int] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ApiKey] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ApiSetting]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ApiSetting](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Value] [nvarchar](max) NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ApiSetting] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_AppSetting]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_AppSetting](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Value] [nvarchar](max) NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_AppSetting] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_City]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_City](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[DialingCode] [nvarchar](10) NULL,
	[ThreeLetterISOCode] [nvarchar](3) NOT NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NULL,
	[Lat] [decimal](10, 5) NULL,
	[CountryID] [int] NOT NULL,
	[Show] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[ExternalPlaceID] nvarchar(500)  NULL,
    [ExternalRefernceID] nvarchar(500)  NULL,
 CONSTRAINT [PK_PQ_City] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Country]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Country](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[DialingCode] [nvarchar](10) NULL,
	[TwoLetterISOCode] [nvarchar](2) NULL,
	[ThreeLetterISOCode] [nvarchar](3) NULL,
	[CurrencyCode] [nvarchar](3) NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NULL,
	[Lat] [decimal](10, 5) NULL,
	[Show] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Country] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Depot]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Depot](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Detail] [nvarchar](500) NULL,
	[OwnerType] [int] NOT NULL,
	[OwnerID] [int] NOT NULL,
	[CityID] [int] NOT NULL,
	[LocationID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Depot] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_DistributionList]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_DistributionList](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[NotificationType] [int] NOT NULL,
	[MessageType] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ScheduleDate] [datetime] NULL,
	[SentDate] [datetime] NULL,
	[CreationUser] [int] NULL,
	[CreatedBySystem] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_DistributionList] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Driver]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Driver](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](25) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[LastName] [nvarchar](250) NULL,
	[Email] [nvarchar](250) NOT NULL,
	[Mobile] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[Avatar] [nvarchar](50) NULL,
	[Pwd] [nvarchar](75) NOT NULL,
	[SaltKey] [nvarchar](16) NOT NULL,
	[LastAccess] [datetime] NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModificationDate] [datetime] NULL,
	[Status] [int] NOT NULL,
	[DocType] [int] NOT NULL,
	[DocNumber] [nvarchar](50) NOT NULL,
	[CityID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[LogisticOperatorID] [int] NULL,
	[MarketplaceID] [int] NULL,
	[VehicleID] [int] NULL,
 CONSTRAINT [PK_PQ_Driver] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_DriverToCity]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_DriverToCity](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CityID] [int] NOT NULL,
	[DriverID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_DriverToCity] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_DriverToLogisticOperator]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_DriverToLogisticOperator](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DriverID] [int] NOT NULL,
	[LogisticOperatorID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_DriverToLogisticOperator] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Geolocation]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Geolocation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Detail] [nvarchar](250) NOT NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NOT NULL,
	[Lat] [decimal](10, 5) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[GeolocationType] [int] NOT NULL,
	[ObjectID] [int] NOT NULL,
	[CityID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Geolocation] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_InsuranceCompany]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_InsuranceCompany](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Phone] [nvarchar](250) NULL,
	[Detail] [nvarchar](500) NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_InsuranceCompany] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Log]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Log](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[Exception] [nvarchar](max) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[LogType] [int] NOT NULL,
	[LogLevel] [int] NOT NULL,
	[ObjectType] [int] NULL,
	[ObjectID] [int] NULL,
	[UserID] [int] NULL,
	[Deleted] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Log] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_LogisticOperator]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_LogisticOperator](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Detail] [nvarchar](500) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[ContactName] [nvarchar](250) NULL,
	[Published] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[IsPrivate] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_LogisticOperator] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_LogisticOperatorToMarketPlace]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_LogisticOperatorToMarketPlace](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[LogisticOperatorID] [int] NOT NULL,
	[MarketPlaceID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_LogisticOperatorToMarketPlace] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Marketplace]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Marketplace](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Detail] [nvarchar](500) NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[Published] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Marketplace] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Media]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Media](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Caption] [nvarchar](250) NOT NULL,
	[MediaType] [int] NOT NULL,
	[ObjectType] [int] NOT NULL,
	[ObjectID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Media] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_NotificationTracing]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_NotificationTracing](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TraceMessage] [nvarchar](250) NULL,
	[PackageStatus] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ConfirmedDate] [datetime] NULL,
	[PackageID] [int] NOT NULL,
	[ShippingScheduleID] [int] NOT NULL,
	[DriverID] [int] NULL,
	[UserID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_NotificationTracing] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Package]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Package](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Caption] [nvarchar](250) NULL,
	[Rate] [money] NULL,
	[Detail] [nvarchar](500) NULL,
	[AdditionalCode] [nvarchar](50) NOT NULL,
	[Avatar] [nvarchar](50) NULL,
	[Status] [int] NOT NULL,
	[PackageSize] [int] NOT NULL,
	[PackageType] [int] NOT NULL,
	[EstimatedCost] [money] NULL,
	[Rating] [money] NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModificationDate] [datetime] NULL,
	[OwnerType] [int] NULL,
	[OwnerID] [int] NULL,
	[DepotID] [int] NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[CancelationDate] [datetime] NULL,
	[ExternalCode] [nvarchar](50) NULL,
	[ExternalTypeCode] [int] NULL,
 CONSTRAINT [PK_PQ_Package] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_PackageSetting]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_PackageSetting](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Value] [nvarchar](250) NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_PackageSetting] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_PackageTracing]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_PackageTracing](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Comment] [nvarchar](250) NULL,
	[TraceData] [nvarchar](250) NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NULL,
	[Lat] [decimal](10, 5) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ApproveDate] [datetime] NULL,
	[CreationUserID] [int] NULL,
	[CreatedBySystem] [bit] NOT NULL,
	[DepotID] [int] NULL,
	[PackageID] [int] NOT NULL,
	[CityID] [int] NULL,
	[GeolocationID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_PackageTracing] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Payment]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Payment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [money] NOT NULL,
	[TransactionCode] [nvarchar](50) NOT NULL,
	[TransactionTrace] [nvarchar](max) NULL,
	[CreationDate] [datetime] NOT NULL,
	[PaymentProvider] [int] NOT NULL,
	[PaymentStatus] [int] NOT NULL,
	[PaymentType] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[PackageID] [int] NULL,
 CONSTRAINT [PK_PQ_Payment] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_PaymentTransaction]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_PaymentTransaction](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PackageID] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Amount] [money] NOT NULL,
	[PaymentID] [int] NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_PQ_PaymentTransaction] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_QueuedNotification]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_QueuedNotification](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Priority] [int] NOT NULL,
	[FromData] [nvarchar](500) NOT NULL,
	[FromName] [nvarchar](500) NOT NULL,
	[ToData] [nvarchar](500) NULL,
	[ToName] [nvarchar](500) NULL,
	[Cc] [nvarchar](500) NULL,
	[Bcc] [nvarchar](500) NULL,
	[ReplyTo] [nvarchar](500) NULL,
	[Subject] [nvarchar](500) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[MessageType] [int] NOT NULL,
	[NotificationType] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ScheduleDate] [datetime] NOT NULL,
	[SendTries] [int] NOT NULL,
	[SentDate] [datetime] NULL,
	[ObjectType] [int] NULL,
	[ObjectID] [int] NULL,
	[UserID] [int] NULL,
	[DistributionListID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[DriverID] [int] NULL,
 CONSTRAINT [PK_PQ_QueuedNotification] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ServiceRate]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ServiceRate](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Comment] [nvarchar](250) NULL,
	[Ranking] [money] NOT NULL,
	[ServiceRateType] [int] NOT NULL,
	[ObjectID] [int] NOT NULL,
	[UserID] [int] NULL,
	[DriverID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ServiceRate] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ShippingAddress]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ShippingAddress](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[AddressDetail] [nvarchar](750) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Comment] [nvarchar](250) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModificationDate] [datetime] NULL,
	[AddressType] [int] NOT NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NULL,
	[Lat] [decimal](10, 5) NULL,
	[UserID] [int] NOT NULL,
	[CityID] [int] NULL,
	[Show] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ShippingAddress] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ShippingSchedule]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ShippingSchedule](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Comment] [nvarchar](250) NULL,
	[AddressDetail] [nvarchar](750) NULL,
	[DestinationEmail] [nvarchar](250) NULL,
	[ScheduledDate] [datetime] NOT NULL,
	[ScheduledHour] [nvarchar](10) NOT NULL,
	[IsImmediateDelivery] [bit] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[ScheduleType] [int] NOT NULL,
	[UserPairCode] [nvarchar](6) NOT NULL,
	[DriverPairCode] [nvarchar](6) NOT NULL,
	[UserConfirmationDate] [datetime] NULL,
	[DriverConfirmationDate] [datetime] NULL,
	[UserID] [int] NOT NULL,
	[DriverID] [int] NULL,
	[PackageID] [int] NOT NULL,
	[ShippingAddressID] [int] NULL,
	[InsuranceCompanyID] [int] NULL,
	[CityID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ShippingSchedule] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Store]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Store](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[Address] [nvarchar](250) NULL,
	[ContactName] [nvarchar](250) NULL,
	[GeoKey] [nvarchar](250) NULL,
	[Lng] [decimal](10, 5) NULL,
	[Lat] [decimal](10, 5) NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Store] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Subscription]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Subscription](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Amount] [money] NOT NULL,
	[ValidFrom] [datetime] NULL,
	[ValidTo] [datetime] NULL,
	[DaysSpan] [int] NULL,
	[SubscriptionType] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModificationDate] [datetime] NULL,
	[CreationUser] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Subscription] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_SubscriptionToUser]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_SubscriptionToUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[LockedAmount] [money] NULL,
	[PendingAmount] [money] NULL,
	[CreationDate] [datetime] NOT NULL,
	[DueDate] [datetime] NULL,
	[UserID] [int] NOT NULL,
	[SubscriptionID] [int] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_SubscriptionToUser] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_SysTransaction]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_SysTransaction](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Caption] [nvarchar](50) NOT NULL,
	[SysTransactionType] [int] NOT NULL,
	[CreatedBySystem] [bit] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ObjectType] [int] NOT NULL,
	[ObjectID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_SysTransaction] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_User]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](25) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[LastName] [nvarchar](250) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Mobile] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[Avatar] [nvarchar](50) NOT NULL,
	[AuthMode] [int] NOT NULL,
	[AuthModeData] [nvarchar](250) NULL,
	[Pwd] [nvarchar](75) NOT NULL,
	[SaltKey] [nvarchar](16) NOT NULL,
	[LastAccess] [datetime] NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModificationDate] [datetime] NULL,
	[Status] [int] NOT NULL,
	[DocType] [int] NOT NULL,
	[DocNumber] [nvarchar](50) NOT NULL,
	[UserType] [int] NOT NULL,
	[Source] [int] NOT NULL,
	[UserRoleID] [int] NULL,
	[CityID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
	[LogisticOperatorID] [int] NULL,
 CONSTRAINT [PK_PQ_User] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserAccount]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserAccount](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [money] NOT NULL,
	[LockedAmount] [money] NOT NULL,
	[SpentMoney] [money] NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserAccount] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserAction]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserAction](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserAction] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserRole]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserRole](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserRole] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserRoleToAction]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserRoleToAction](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserRoleID] [int] NOT NULL,
	[UserActionID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserRoleToAction] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserSession]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserSession](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Token] [nvarchar](500) NOT NULL,
	[LastAccess] [datetime] NOT NULL,
	[TransactionDetail] [nvarchar](500) NOT NULL,
	[IsExpired] [bit] NOT NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserSession] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_UserSetting]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_UserSetting](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Value] [nvarchar](max) NOT NULL,
	[UserID] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_UserSetting] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_ValidationCode]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_ValidationCode](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nchar](10) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[SentDate] [datetime] NOT NULL,
	[ExpirationDate] [datetime] NULL,
	[ValidationCodeType] [int] NOT NULL,
	[IsUsed] [bit] NOT NULL,
	[ObjectID] [int] NULL,
	[ObjectType] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_ValidationCode] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PQ_Vehicle]    Script Date: 8/30/2017 10:33:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PQ_Vehicle](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Detail] [nvarchar](500) NULL,
	[VehicleModel] [nvarchar](50) NULL,
	[VehicleBrand] [nvarchar](50) NULL,
	[VehiclePatent] [nvarchar](50) NULL,
	[VehicleType] [int] NOT NULL,
	[InsuranceCompanyID] [int] NULL,
	[Active] [bit] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_PQ_Vehicle] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PQ_City] ON
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (1, N'Buenos Aires', NULL, N'BUE', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 1, 1, 1, 0)
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (2, N'San Luis', NULL, N'LUQ', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 1, 1, 1, 0)
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (4, N'Montevideo', NULL, N'MVD', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 3, 1, 1, 0)
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (5, N'Punta del Este', NULL, N'PDP', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 3, 1, 1, 0)
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (6, N'Santiago de Chile', NULL, N'SCL', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 2, 1, 1, 0)
GO
INSERT [dbo].[PQ_City] ([ID], [Name], [DialingCode], [ThreeLetterISOCode], [GeoKey], [Lng], [Lat], [CountryID], [Show], [Active], [Deleted]) VALUES (7, N'Valparaiso', NULL, N'VAP', N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 2, 1, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_City] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_Country] ON
GO
INSERT [dbo].[PQ_Country] ([ID], [Name], [DialingCode], [TwoLetterISOCode], [ThreeLetterISOCode], [CurrencyCode], [GeoKey], [Lng], [Lat], [Show], [Active], [Deleted]) VALUES (1, N'ARGENTINA', N'+54', N'AR', N'ARG', NULL, N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 1, 1, 0)
GO
INSERT [dbo].[PQ_Country] ([ID], [Name], [DialingCode], [TwoLetterISOCode], [ThreeLetterISOCode], [CurrencyCode], [GeoKey], [Lng], [Lat], [Show], [Active], [Deleted]) VALUES (2, N'CHILE', N'+56', N'CL', N'CHL', NULL, N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 1, 1, 0)
GO
INSERT [dbo].[PQ_Country] ([ID], [Name], [DialingCode], [TwoLetterISOCode], [ThreeLetterISOCode], [CurrencyCode], [GeoKey], [Lng], [Lat], [Show], [Active], [Deleted]) VALUES (3, N'URUGUAY', N'+598', N'UY', N'URY', NULL, N'', CAST(0.00000 AS Decimal(10, 5)), CAST(0.00000 AS Decimal(10, 5)), 1, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_Country] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_Depot] ON
GO
INSERT [dbo].[PQ_Depot] ([ID], [Code], [Name], [Detail], [OwnerType], [OwnerID], [CityID], [LocationID], [Active], [Deleted]) VALUES (1, N'D001', N'Depósito Principal', N'Depósito Principal', 10, 1, 1, 0, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_Depot] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_Driver] ON
GO
INSERT [dbo].[PQ_Driver] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [CityID], [Active], [Deleted], [LogisticOperatorID], [MarketplaceID], [VehicleID]) VALUES (1, N'00000001', N'Driver', N'PaQuery', N'paquer@paquery.com', N'12341234', NULL, N'20172706002748.jpg', N'F9AjcyZflt/AEu5upP277w==', N'YWaekcH9EVcoow==', NULL, CAST(N'2017-06-16T23:43:50.447' AS DateTime), NULL, 1, 1, N'1234567890', 1, 1, 0, 1, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[PQ_Driver] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_LogisticOperator] ON
GO
INSERT [dbo].[PQ_LogisticOperator] ([ID], [Name], [Detail], [Phone], [ContactName], [Published], [IsPrivate], [Active], [Deleted]) VALUES (1, N'PaQuery', N'PaQuery', N'111', N'', 1, 0, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_LogisticOperator] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_Marketplace] ON
GO
INSERT [dbo].[PQ_Marketplace] ([ID], [Name], [Detail], [Active], [Deleted], [Published]) VALUES (1, N'PAQUERY', N'PAQUERY', 1, 0, 1)
GO
SET IDENTITY_INSERT [dbo].[PQ_Marketplace] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_User] ON
GO
INSERT [dbo].[PQ_User] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [AuthMode], [AuthModeData], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [UserType], [Source], [UserRoleID], [CityID], [Active], [Deleted], [LogisticOperatorID])
						VALUES (1, N'00000001', N'Admin', N'PaQuery', N'admin@paquery.com', N'0000000000', N'', N'', 1, NULL, N'IikQUsaOgkxP9Zy3W6sA6A==', N'NWZOlxlFJ7kcKg==', NULL, CAST(N'2017-06-16T21:34:28.110' AS DateTime), NULL, 1, 1, N'', 1, 1, 1, 1, 1, 0, 1)
GO
INSERT [dbo].[PQ_User] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [AuthMode], [AuthModeData], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [UserType], [Source], [UserRoleID], [CityID], [Active], [Deleted], [LogisticOperatorID]) VALUES (2, N'00000002', N'User', N'PaQuery', N'user@paquery.com', N'0000000000', N'', N'', 1, NULL, N'IikQUsaOgkxP9Zy3W6sA6A==', N'NWZOlxlFJ7kcKg==', NULL, CAST(N'2017-06-16T21:34:28.110' AS DateTime), NULL, 1, 1, N'', 2, 1, 2, 1, 1, 0, NULL)
GO
INSERT [dbo].[PQ_User] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [AuthMode], [AuthModeData], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [UserType], [Source], [UserRoleID], [CityID], [Active], [Deleted], [LogisticOperatorID]) VALUES (3, N'00000001', N'OPL Moderator', N'PaQuery', N'oplmoderator@paquery.com', N'0000000000', N'', N'', 1, NULL, N'IikQUsaOgkxP9Zy3W6sA6A==', N'NWZOlxlFJ7kcKg==', NULL, CAST(N'2017-06-16T21:34:28.110' AS DateTime), NULL, 1, 1, N'', 1, 1, 4, 1, 1, 0, 1)
GO
INSERT [dbo].[PQ_User] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [AuthMode], [AuthModeData], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [UserType], [Source], [UserRoleID], [CityID], [Active], [Deleted], [LogisticOperatorID]) VALUES (4, N'00000001', N'OPL Admin', N'PaQuery', N'opladmin@paquery.com', N'0000000000', N'', N'', 1, NULL, N'IikQUsaOgkxP9Zy3W6sA6A==', N'NWZOlxlFJ7kcKg==', NULL, CAST(N'2017-06-16T21:34:28.110' AS DateTime), NULL, 1, 1, N'', 1, 1, 3, 1, 1, 0, 1)
GO
INSERT [dbo].[PQ_User] ([ID], [Code], [Name], [LastName], [Email], [Mobile], [Phone], [Avatar], [AuthMode], [AuthModeData], [Pwd], [SaltKey], [LastAccess], [CreationDate], [ModificationDate], [Status], [DocType], [DocNumber], [UserType], [Source], [UserRoleID], [CityID], [Active], [Deleted], [LogisticOperatorID]) VALUES (5, N'00000001', N'PaqueryPoint Moderator', N'PaQuery', N'ppmoderator@paquery.com', N'0000000000', N'', N'', 1, NULL, N'IikQUsaOgkxP9Zy3W6sA6A==', N'NWZOlxlFJ7kcKg==', NULL, CAST(N'2017-06-16T21:34:28.110' AS DateTime), NULL, 1, 1, N'', 1, 1, 8, 1, 1, 0, 1)
GO
SET IDENTITY_INSERT [dbo].[PQ_User] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_UserAccount] ON
GO
INSERT [dbo].[PQ_UserAccount] ([ID], [Amount], [LockedAmount], [SpentMoney], [ModificationDate], [UserID], [Active], [Deleted]) VALUES (1, 10000.0000, 0.0000, 0.0000, CAST(N'2017-06-16T21:34:28.127' AS DateTime), 1, 1, 0)
GO
INSERT [dbo].[PQ_UserAccount] ([ID], [Amount], [LockedAmount], [SpentMoney], [ModificationDate], [UserID], [Active], [Deleted]) VALUES (2, 10000.0000, 0.0000, 0.0000, CAST(N'2017-06-16T21:34:28.127' AS DateTime), 2, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_UserAccount] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_UserAction] ON
GO
INSERT [dbo].[PQ_UserAction] ([ID], [Name], [Active], [Deleted]) VALUES (1, N'Paquetes', 1, 0)
GO
INSERT [dbo].[PQ_UserAction] ([ID], [Name], [Active], [Deleted]) VALUES (2, N'Paquers', 1, 0)
GO
INSERT [dbo].[PQ_UserAction] ([ID], [Name], [Active], [Deleted]) VALUES (3, N'Enviar', 1, 0)
GO
INSERT [dbo].[PQ_UserAction] ([ID], [Name], [Active], [Deleted]) VALUES (4, N'changePackageStatusOperator', 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_UserAction] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_UserRole] ON
GO
INSERT INTO [dbo].[PQ_UserRole]
           (
		   [ID],
		   [Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (1
		   ,'Administrador'
           ,1
           ,0)
GO
INSERT INTO [dbo].[PQ_UserRole]
           (
		   [ID],
		   [Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (2
		   ,'Cliente'
           ,1
           ,0)
GO
INSERT INTO [dbo].[PQ_UserRole]
           (
		   [ID],
		   [Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (3
		   ,'Administrador OPL'
           ,1
           ,0)
GO

INSERT INTO [dbo].[PQ_UserRole]
           ([ID],[Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (
		   4
		   ,'Operador OPL'
           ,1
           ,0)
GO


INSERT INTO [dbo].[PQ_UserRole]
           ([ID],[Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (
		   5,
		   'Administrador MP'
           ,1
           ,0)
GO

INSERT INTO [dbo].[PQ_UserRole]
           ([ID],[Name]
           ,[Active]
           ,[Deleted])
     VALUES
           (6,'Operador MP'
           ,1
           ,0)
GO

GO
SET IDENTITY_INSERT [dbo].[PQ_UserRole] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_UserRoleToAction] ON
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (1, 3, 1, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (2, 3, 2, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (3, 3, 3, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (4, 3, 4, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (5, 4, 4, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (6, 7, 4, 1, 0)
GO
INSERT [dbo].[PQ_UserRoleToAction] ([ID], [UserRoleID], [UserActionID], [Active], [Deleted]) VALUES (7, 8, 4, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_UserRoleToAction] OFF
GO
SET IDENTITY_INSERT [dbo].[PQ_Vehicle] ON
GO
INSERT [dbo].[PQ_Vehicle] ([ID], [Name], [Detail], [VehicleModel], [VehicleBrand], [VehiclePatent], [VehicleType], [InsuranceCompanyID], [Active], [Deleted]) VALUES (1, N'PaQuery', N'PaQuery', N'2017', N'1234', N'-', 2, 1, 1, 0)
GO
SET IDENTITY_INSERT [dbo].[PQ_Vehicle] OFF
GO
ALTER TABLE [dbo].[PQ_Package] ADD  CONSTRAINT [DF_PQ_Package_PackageSize]  DEFAULT ((1)) FOR [PackageSize]
GO
ALTER TABLE [dbo].[PQ_Package] ADD  CONSTRAINT [DF_PQ_Package_PackageType]  DEFAULT ((1)) FOR [PackageType]
GO
ALTER TABLE [dbo].[PQ_User] ADD  CONSTRAINT [DF__PQ_User__AuthMod__30F848ED]  DEFAULT ((0)) FOR [AuthMode]
GO


--- Cambios para para actualizar a ultima version de base 17/04/2019

alter table [dbo].[PQ_User] add OwnerType int null;
alter table [dbo].[PQ_User] add OwnerID int null;
alter table [dbo].[PQ_User] add TermsAndConditions bit not null default(0);

alter table [dbo].[PQ_Driver] add CUIL nvarchar(50) null;
alter table [dbo].[PQ_Driver] add CBU nvarchar(50) null;
alter table [dbo].[PQ_Driver] add BirthDate nvarchar(50) null;

alter table [dbo].[PQ_Vehicle] add OwnerID int not null default(0);
alter table [dbo].[PQ_Vehicle] add OwnerType int not null default(0);


alter table [dbo].[PQ_Package] add DeliveryTerm int null;
alter table [dbo].[PQ_Package] add DeliveryDate DATETIME null;
alter table [dbo].[PQ_Package] add Attachment nvarchar(250) null;
alter table [dbo].[PQ_Package] add RollContainerPosition nvarchar(500) null;
alter table [dbo].[PQ_Package] add SignatureImage nvarchar(250) null;
alter table [dbo].[PQ_Package] add Reason nvarchar(500) null;
alter table [dbo].[PQ_Package] add RollContainerStatus bit null;
alter table [dbo].[PQ_Package] add Arrived bit null;

alter table [dbo].[PQ_ShippingSchedule] add DestinationAclaration nvarchar(500) null;
alter table [dbo].[PQ_ShippingSchedule] add DestinationDocNumber nvarchar(500) null;


CREATE TABLE [dbo].[PQ_Visit] (
                                [ID] int IDENTITY(1,1) NOT NULL,
                                [CreationDate] datetime  NOT NULL,
                                [ShippingScheduleID] int  NOT NULL,
                                [Active] bit  NOT NULL,
                                [Deleted] bit  NOT NULL );


ALTER TABLE [dbo].[PQ_Visit]
  ADD CONSTRAINT [PK_PQ_Visit]
    PRIMARY KEY CLUSTERED ([ID] ASC);



CREATE TABLE [dbo].[PQ_ChangeStatusLog] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [PackageID] int  NOT NULL,
    [PreviusStatus] int  NOT NULL,
    [NextStatus] int  NOT NULL,
    [CreationDate] datetime  NOT NULL,
    [UserID] int  NOT NULL,
    [UserEmail] varchar(500)  NOT NULL
);

ALTER TABLE [dbo].[PQ_ChangeStatusLog]
ADD CONSTRAINT [PK_PQ_ChangeStatusLog]
    PRIMARY KEY CLUSTERED ([ID] ASC);
