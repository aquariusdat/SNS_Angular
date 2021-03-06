USE [TodoList]
GO
/****** Object:  Table [dbo].[Todo]    Script Date: 6/28/2021 8:45:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Todo](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Level] [nvarchar](50) NULL,
	[isDone] [bit] NULL,
 CONSTRAINT [PK_Todo] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 6/28/2021 8:45:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](200) NULL,
	[Email] [varchar](200) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (1, N'Đi bơi', N'Small', 1)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (2, N'Đi học thêm', N'Small', 1)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (3, N'Làm việc nhà', N'Small', 1)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (4, N'Học tiếng Anh', N'High', 1)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (5, N'Đi học bơi', N'High', 0)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (6, N'Đi học nhảy', N'Small', 0)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (7, N'Học ReactJS', N'Medium', 0)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (8, N'Đi học lập trình', N'Small', 1)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (9, N'Học C#', N'Small', 0)
INSERT [dbo].[Todo] ([ID], [Name], [Level], [isDone]) VALUES (10, N'Học Angular', N'High', 1)
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([ID], [UserName], [Password], [Email]) VALUES (1, N'tondat', N'tondat', N'tondat@gmail.com')
SET IDENTITY_INSERT [dbo].[User] OFF
