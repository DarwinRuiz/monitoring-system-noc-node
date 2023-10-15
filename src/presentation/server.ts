import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource())

export class Server {
    public static start() {
        console.log('Server started');

        const job = CronService.createJob('*/5 * * * * *', () => {
            new CheckService(fileSystemLogRepository, () => console.log('success'), (error: string) => console.log(error)).execute('https://www.google.com')
        });
        job.start();
    }
}