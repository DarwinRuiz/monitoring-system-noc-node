import { LogEntity } from "../entities/log.entity";
import { LogSeverityLevel } from "../enums/log-severity-level.enum";

export abstract class LogRepository {
    abstract saveLog(newLog: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}