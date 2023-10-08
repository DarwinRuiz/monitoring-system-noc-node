export interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}