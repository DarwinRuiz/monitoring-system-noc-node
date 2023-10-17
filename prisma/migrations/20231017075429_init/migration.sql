BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[LogModel] (
    [id] INT NOT NULL IDENTITY(1,1),
    [message] NVARCHAR(1000) NOT NULL,
    [origin] NVARCHAR(1000) NOT NULL,
    [level] NVARCHAR(1000) NOT NULL,
    [createAt] DATETIME2 NOT NULL CONSTRAINT [LogModel_createAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [LogModel_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH