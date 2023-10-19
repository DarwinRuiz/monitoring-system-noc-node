import mongoose from "mongoose";
import { MongoDatabase } from "../../../../../src/data/mongodb/init";
import { LogEntity } from '../../../../../src/domain/entities/log.entity';
import { LogSeverityLevel } from "../../../../../src/domain/enums/log-severity-level.enum";
import { LogModel } from '../../../../../src/data/mongodb/models/log.model';

describe('Tests for the log.model.ts of mongodb', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('Should return the log model', async () => {
        const logData: LogEntity = {
            origin: 'log.model.test.ts',
            message: 'test-message executed successfully from jest',
            level: LogSeverityLevel.LOW,
            createAt: new Date(),
        };

        const log = await LogModel.create(logData);
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            id: expect.any(String)
        }))


        await LogModel.findByIdAndDelete(log.id);
    });


    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function) },
                level: {
                    type: expect.any(Function),
                    enum: ['LOW', 'MEDIUM', 'HIGH'],
                    default: 'LOW'
                },
                createAt: expect.any(Object)
            }
        ))
    });
})