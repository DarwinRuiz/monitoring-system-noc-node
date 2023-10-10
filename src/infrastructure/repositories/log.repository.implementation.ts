import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enums/log-severity-level.enum";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository {

    constructor(private readonly logDatasource: LogDatasource) { }

    async saveLog(newLog: LogEntity): Promise<void> {
        this.logDatasource.saveLog(newLog);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}