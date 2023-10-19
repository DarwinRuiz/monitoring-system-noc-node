import mongoose from 'mongoose';
import { MongoDatabase } from '../../../../src/data/mongodb/init';
import { MongoLogDatasource } from '../../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogSeverityLevel } from '../../../../src/domain/enums/log-severity-level.enum';
import { LogModel } from '../../../../src/data/mongodb';


describe('Tests for mongo-log.datasource.ts file', () => {

    const logDatasource = new MongoLogDatasource();
    const log = new LogEntity({ level: LogSeverityLevel.LOW, message: 'test message', origin: 'mongo-log.datasource.test.ts' });


    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
    });

    afterEach(async () => {

        await LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');
        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo log created:', expect.any(String));

    });


    test('should get logs', async () => {

        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.LOW);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.LOW);
    });
})