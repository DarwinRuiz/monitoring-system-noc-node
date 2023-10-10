import { CheckServiceUseCase } from "../../interfaces/check-service-use-case.interface";
import { SuccessCallback, ErrorCallback } from "../../types/check-service";
import { LogRepository } from '../../repository/log.repository';
import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../enums/log-severity-level.enum";

export class CheckService implements CheckServiceUseCase {

    constructor(private readonly logRepository: LogRepository, private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const request = await fetch(url);
            if (!request.ok) throw new Error(`Error on check service ${url}`);

            this.logRepository.saveLog(new LogEntity(`Service ${url} working`, LogSeverityLevel.LOW));
            this.successCallback();
            return true;
        } catch (error) {
            const errorString: string = `${url} is not working, ${error}`;
            this.logRepository.saveLog(new LogEntity(errorString, LogSeverityLevel.HIGH));
            this.errorCallback(errorString);
            return false;
        }

    }

}