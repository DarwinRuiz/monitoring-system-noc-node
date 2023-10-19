import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogSeverityLevel } from '../../../../src/domain/enums/log-severity-level.enum';
describe('Tests for log.entity.ts file', () => {

    const objectLogTest = {
        message: 'test message',
        level: LogSeverityLevel.HIGH,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {
        const log = new LogEntity(objectLogTest);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(objectLogTest.message);
        expect(log.level).toBe(objectLogTest.level);
        expect(log.origin).toBe(objectLogTest.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity from json', () => {

        const log = LogEntity.fromJson(JSON.stringify({ ...objectLogTest, createAt: new Date() }));

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(objectLogTest.message);
        expect(log.level).toBe(objectLogTest.level);
        expect(log.origin).toBe(objectLogTest.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity from generic object', () => {

        const log = LogEntity.fromObject({ ...objectLogTest, createAt: new Date() });

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(objectLogTest.message);
        expect(log.level).toBe(objectLogTest.level);
        expect(log.origin).toBe(objectLogTest.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

})