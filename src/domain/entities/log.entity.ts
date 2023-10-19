import { LogSeverityLevel } from "../enums/log-severity-level.enum";
import { LogEntityOptions } from "../interfaces/log-entity-options.interface";

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createAt = new Date() } = options
        this.level = level;
        this.message = message;
        this.createAt = createAt;
        this.origin = origin;
    }

    public static fromJson = (json: string): LogEntity => {

        const jsonFormated = json === '' ? '{}' : json;

        if (!this.validateStructureEntityFromJson(jsonFormated)) throw new Error('The json does not meet the requirements to be an entity of "LogEntity"');

        const { message, level, origin, createAt } = JSON.parse(jsonFormated);

        return new LogEntity({ message, level, origin, createAt: new Date(createAt) });
    }

    public static fromObject = (object: { [key: string]: any }): LogEntity => {
        if (!this.validateStructureEntityFromJson(JSON.stringify(object))) throw new Error('The json does not meet the requirements to be an entity of "LogEntity"');
        const { message, level, origin, createAt } = object;
        return new LogEntity({ message, level, origin, createAt: new Date(createAt) });
    }

    private static validateStructureEntityFromJson = (json: string): boolean => {

        const { message, level, createAt } = JSON.parse(json);
        if (!message) return false;
        if (!level) return false;
        if (!createAt) return false;

        return true;
    }
}