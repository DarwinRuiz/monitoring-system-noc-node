import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { SQLServerLogDatasource } from "../infrastructure/datasources/sqlserver-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron.service";

const fsLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const mongodbLogRepository = new LogRepositoryImplementation(new MongoLogDatasource());
const sqlServerLogRepository = new LogRepositoryImplementation(new SQLServerLogDatasource());

export class Server {
    public static start() {
        console.log('Server started');

        const job = CronService.createJob('*/5 * * * * *', () => {
            new CheckServiceMultiple([fsLogRepository, mongodbLogRepository, sqlServerLogRepository], () => console.log('success'), (error: string) => console.log(error)).execute('https://www.google.com')
        });
        job.start();
    }
}