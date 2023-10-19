import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enums/log-severity-level.enum";

export class FileSystemDatasource implements LogDatasource {

    private readonly LOG_PATH: string = 'logs/';
    private readonly ALL_LOGS_PATH: string = 'logs/logs-all.log';
    private readonly ALL_MEDIUM_PATH: string = 'logs/logs-medium.log';
    private readonly ALL_HIGH_PATH: string = 'logs/logs-high.log';

    constructor() {
        this.createLogFiles();
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.ALL_LOGS_PATH, logAsJson);

        if (newLog.level === LogSeverityLevel.LOW) return;
        if (newLog.level === LogSeverityLevel.MEDIUM) fs.appendFileSync(this.ALL_MEDIUM_PATH, logAsJson)
        if (newLog.level === LogSeverityLevel.HIGH) fs.appendFileSync(this.ALL_HIGH_PATH, logAsJson)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.LOW:
                return this.getLogsFromFiles(this.ALL_LOGS_PATH);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFiles(this.ALL_MEDIUM_PATH);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFiles(this.ALL_HIGH_PATH);
            default:
                throw new Error("Unknown severity level: " + severityLevel)
        }
    }

    private createLogFiles = (): void => {
        if (!fs.existsSync(this.LOG_PATH)) fs.mkdirSync(this.LOG_PATH);

        [this.ALL_LOGS_PATH, this.ALL_MEDIUM_PATH, this.ALL_HIGH_PATH].forEach((path: string) => {
            if (!fs.existsSync(path)) fs.writeFileSync(path, '');
        })
    }

    private getLogsFromFiles = (path: string): LogEntity[] => {
        const contentFile: string = fs.readFileSync(path, 'utf-8');
        const contentFilter = contentFile.split('\n').filter((json: string) => json !== '')
        return contentFilter.map(LogEntity.fromJson);
    }
}