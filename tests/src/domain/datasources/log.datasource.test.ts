import { LogDatasource } from '../../../../src/domain/datasources/log.datasource';
import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogSeverityLevel } from '../../../../src/domain/enums/log-severity-level.enum';



describe('Tests for log.datasource.ts file', () => {


    const log = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message executed successfully from jest',
        level: LogSeverityLevel.LOW,
        createAt: new Date(),
    });

    class MockLogDatasource implements LogDatasource {

        async saveLog(newLog: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log];
        }

    }

    test('should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.LOW);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    })
})