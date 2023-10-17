import { LogModel } from "../../data/mongodb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enums/log-severity-level.enum";

export class MongoLogDatasource implements LogDatasource {
    async saveLog(newLog: LogEntity): Promise<void> {
        const log = await LogModel.create(newLog);
        await log.save();
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });
        return logs.map(LogEntity.fromObject)
    }

}