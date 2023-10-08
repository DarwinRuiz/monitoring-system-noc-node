import { CheckServiceUseCase } from "../../interfaces/check-service-use-case.interface";
import { SuccessCallback, ErrorCallback } from "../../types/check-service";

export class CheckService implements CheckServiceUseCase {

    constructor(private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const request = await fetch(url);
            if (!request.ok) throw new Error(`Error on check service ${url}`);

            this.successCallback();
            return true;
        } catch (error) {

            this.errorCallback(`${error}`);
            return false;
        }

    }

}