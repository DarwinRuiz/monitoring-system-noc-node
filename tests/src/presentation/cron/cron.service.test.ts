import { CronService } from '../../../../src/presentation/cron/cron.service';


describe('Tests for cron.service.ts file', () => {


    const mockTick = jest.fn();

    test('should create job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);
        job.start();

        setTimeout(() => {
            expect(mockTick).toBeCalledTimes(2);
            job.stop();
            done();
        }, 2000)
    })

});