import { CheckServiceUseCase } from "../../interfaces/check-service-use-case.interface";
import { SuccessCallback, ErrorCallback } from "../../types/check-service";
import { LogRepository } from '../../repository/log.repository';
import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../enums/log-severity-level.enum";

export class CheckServiceMultiple implements CheckServiceUseCase {

    private fileName: string = 'check-service.ts';

    constructor(private readonly logRepositories: LogRepository[], private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const request = await fetch(url);
            if (!request.ok) throw new Error(`Error on check service ${url}`);

            this.callLogs(new LogEntity({ message: `Service ${url} working`, level: LogSeverityLevel.LOW, origin: this.fileName }));
            this.successCallback();
            return true;
        } catch (error) {
            const errorString: string = `${url} is not working, ${error}`;
            this.callLogs(new LogEntity({ message: errorString, level: LogSeverityLevel.HIGH, origin: this.fileName }));
            this.errorCallback(errorString);
            return false;
        }

    }

    private callLogs(log: LogEntity) {
        this.logRepositories.forEach(logRepository => {
            logRepository.saveLog(log);
        })
    }
}