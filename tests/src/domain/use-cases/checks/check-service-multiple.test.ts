import { LogEntity } from '../../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../../src/domain/use-cases/checks/check-service-multiple';
describe('Tests from check-service-multiple.ts file', () => {

    const mockRespositoryTemplate = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const mockRepositories = [{ ...mockRespositoryTemplate }, { ...mockRespositoryTemplate }, { ...mockRespositoryTemplate }]

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const checkServiceMultiple = new CheckServiceMultiple(mockRepositories, successCallback, errorCallback);

    test('should call successCallback when fetch return true', async () => {

        const wasOk = await checkServiceMultiple.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        mockRepositories.forEach(mockRepository => {

            expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        })

    });

    test('should call errorCallback when fetch had error', async () => {

        const wasOk = await checkServiceMultiple.execute('https://google.com.test');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        mockRepositories.forEach(mockRepository => {

            expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        })
    });
})