import { envs } from './../../../../src/config/plugins/envs.plugin';



describe('Tests for the file envs.plugin.ts', () => {
    test('Exist envs and contains values', () => {
        expect(envs).toEqual({
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'darwinorlandoruiz15@gmail.com',
            MAILER_SECRET_KEY: 'qncafkvudbcotyry',
            MONGO_URL: 'mongodb://darwinruiz:123456@localhost:27017',
            MONGO_DB_NAME: 'NOC',
            MONGO_USER: 'darwinruiz',
            MONGO_PASS: '123456',
            SQL_SERVER_URL: 'sqlserver://localhost:1433;database=noc;user=sa;password=AdM1n1sTr4D0r;trustServerCertificate=true'
        });
    })

    test('should return error if not found envs', async () => {
        jest.resetModules();
        process.env.MONGO_URL = ''

        try {
            await import('./../../../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('env-var: "MONGO_URL" is a required variable, but its value was empty')
        }
    })
})