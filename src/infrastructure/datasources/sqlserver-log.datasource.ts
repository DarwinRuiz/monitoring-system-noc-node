import { PrismaClient } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enums/log-severity-level.enum";

export class SQLServerLogDatasource implements LogDatasource {

    private prismaClient = new PrismaClient();

    async saveLog(newLog: LogEntity): Promise<void> {
        await this.prismaClient.logModel.create({ data: newLog })
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await this.prismaClient.logModel.findMany({ where: { level: severityLevel } })

        return logs.map(LogEntity.fromObject)
    }

}