import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start() {
        console.log('Server started');
        const job = CronService.createJob('*/5 * * * * *', () => {
            new CheckService(() => console.log('success'), (error: string) => console.log(error)).execute('http://localhost:3000')
        });
        job.start();
    }
}