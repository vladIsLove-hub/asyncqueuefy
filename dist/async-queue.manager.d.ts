import { AsyncQueueOptions, IAsyncQueueOptionsManager } from './async-queue.types';
export declare class AsyncQueueOptionsManager implements IAsyncQueueOptionsManager {
    private static DEFAULT_BATCH_SIZE;
    private static DEFAULT_HANDLE_TIMEOUT_VALUE;
    private static DEFAULT_PARALLEL_MODE;
    private static DEFAULT_START_EXEC_ON_INIT;
    private static DEFAULT_IDLE_MAX_ITERATION;
    private static DEFAULT_VERBOSE;
    private prefix;
    constructor();
    setup(userOptions: Partial<AsyncQueueOptions>): AsyncQueueOptions;
    private getStartExecOnInit;
    private getParallel;
    private getVerbose;
    private getBatch;
    private getIntervalTimeout;
    private getIdleMaxIterationLimit;
}
