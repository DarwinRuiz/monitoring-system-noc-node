import { LogEntity } from '../../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../../src/domain/use-cases/checks/check-service';


describe('Tests for check-service.ts file', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    test('should call successCallback when fetch return true', async () => {

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch had error', async () => {

        const wasOk = await checkService.execute('https://google.com.test');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    });
})