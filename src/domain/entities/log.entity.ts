import { LogSeverityLevel } from "../enums/log-severity-level.enum";

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createAt = new Date();
    }

    public static fromJson = (json: string): LogEntity => {
        if (!this.validateStructureEntityFromJson(json)) throw new Error('The json does not meet the requirements to be an entity of "LogEntity"');

        const { message, level, createAt } = JSON.parse(json);

        const log = new LogEntity(message, level);
        log.createAt = createAt;

        return log;
    }

    private static validateStructureEntityFromJson = (json: string): boolean => {
        const { message, level, createAt } = JSON.parse(json);
        if (!message) return false;
        if (!level) return false;
        if (!createAt) return false;

        return true;
    }
}