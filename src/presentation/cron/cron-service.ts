import { CronJob } from "cron";
import { CronTime, onTick } from "../types/cron-service";

export class CronService {

    public static createJob(cronTime: CronTime, onTick: onTick): CronJob {
        return new CronJob(cronTime, onTick);
    }
}