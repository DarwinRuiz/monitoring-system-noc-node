import { LogSeverityLevel } from "../enums/log-severity-level.enum";

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createAt?: Date;
}