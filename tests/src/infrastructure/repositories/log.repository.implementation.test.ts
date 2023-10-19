import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogSeverityLevel } from '../../../../src/domain/enums/log-severity-level.enum';
import { LogRepositoryImplementation } from './../../../../src/infrastructure/repositories/log.repository.implementation';


describe('Tests for log.repository.implementation.ts file', () => {

    const MockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const log = new LogEntity({ message: 'test log', level: LogSeverityLevel.LOW, origin: 'log.repository.implementation.ts' });

    test('saveLog should call the datasource with arguments', async () => {
        const logRepositoryImplementation = new LogRepositoryImplementation(MockDatasource);
        await logRepositoryImplementation.saveLog(log);

        expect(MockDatasource.saveLog).toBeCalledWith(expect.objectContaining(log));
    });


    test('getLogs should call the datasource with arguments', async () => {
        const logRepositoryImplementation = new LogRepositoryImplementation(MockDatasource);
        await logRepositoryImplementation.getLogs(LogSeverityLevel.LOW)

        expect(MockDatasource.getLogs).toBeCalledWith(LogSeverityLevel.LOW);
    });
})