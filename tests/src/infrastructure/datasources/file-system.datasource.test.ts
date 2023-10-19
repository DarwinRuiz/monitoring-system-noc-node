import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../../src/infrastructure/datasources/file-system.datasource';
import { LogSeverityLevel } from '../../../../src/domain/enums/log-severity-level.enum';
import { LogEntity } from '../../../../src/domain/entities/log.entity';


describe('Tests for file-system.datasource.ts file', () => {

    const logPath = path.join(__dirname, '../../../../logs');


    beforeEach(() => {
        if (fs.existsSync(logPath))
            fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create logs files if they do not exists', () => {
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    });


    test('should save a log in logs-all.log file', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({ message: 'test message', level: LogSeverityLevel.LOW, origin: 'file-system.datasource.test.ts' });
        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
    });


    test('should save a log in logs-all.log file and logs-medium.log file', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({ message: 'test message', level: LogSeverityLevel.MEDIUM, origin: 'file-system.datasource.test.ts' });
        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });


    test('should save a log in logs-all.log file and logs-high.log file', () => {
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({ message: 'test message', level: LogSeverityLevel.HIGH, origin: 'file-system.datasource.test.ts' });
        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });


    test('should return all logs', async () => {

        const logDatasource = new FileSystemDatasource();


        const log = new LogEntity({ message: 'test low level', level: LogSeverityLevel.LOW, origin: 'file-system.datasource.test.ts' });
        const logMedium = new LogEntity({ message: 'test medium level', level: LogSeverityLevel.MEDIUM, origin: 'file-system.datasource.test.ts' });
        const logHigh = new LogEntity({ message: 'test high level', level: LogSeverityLevel.HIGH, origin: 'file-system.datasource.test.ts' });

        await logDatasource.saveLog(log);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);


        const lowLogs = await logDatasource.getLogs(LogSeverityLevel.LOW);
        const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.MEDIUM);
        const highLogs = await logDatasource.getLogs(LogSeverityLevel.HIGH);

        expect(lowLogs).toEqual(expect.arrayContaining([log, logMedium, logHigh]));
        expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]));
        expect(highLogs).toEqual(expect.arrayContaining([logHigh]));
    });
})