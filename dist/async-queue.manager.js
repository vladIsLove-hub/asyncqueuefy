export class AsyncQueueOptionsManager {
    static DEFAULT_BATCH_SIZE = 10;
    static DEFAULT_HANDLE_TIMEOUT_VALUE = 5e3;
    static DEFAULT_PARALLEL_MODE = false;
    static DEFAULT_START_EXEC_ON_INIT = true;
    static DEFAULT_IDLE_MAX_ITERATION = Infinity;
    static DEFAULT_VERBOSE = true;
    prefix;
    constructor() {
        this.prefix = `[AsyncQueue]:`;
    }
    setup(userOptions) {
        const options = {
            batch: this.getBatch(userOptions?.batch),
            intervalTimeout: this.getIntervalTimeout(userOptions?.intervalTimeout),
            parallel: this.getParallel(userOptions?.parallel),
            verbose: this.getVerbose(userOptions?.verbose),
            startExecOnInit: this.getStartExecOnInit(userOptions?.startExecOnInit),
            idleMaxIterationLimit: this.getIdleMaxIterationLimit(userOptions?.idleMaxIterationLimit),
        };
        return options;
    }
    getStartExecOnInit(startExecOnInit) {
        if (startExecOnInit === undefined) {
            return AsyncQueueOptionsManager.DEFAULT_START_EXEC_ON_INIT;
        }
        return startExecOnInit;
    }
    getParallel(parallel) {
        if (parallel === undefined) {
            return AsyncQueueOptionsManager.DEFAULT_PARALLEL_MODE;
        }
        return parallel;
    }
    getVerbose(verbose) {
        if (verbose === undefined) {
            return AsyncQueueOptionsManager.DEFAULT_VERBOSE;
        }
        return verbose;
    }
    getBatch(batch) {
        if (typeof batch !== 'number') {
            return AsyncQueueOptionsManager.DEFAULT_BATCH_SIZE;
        }
        if (batch <= 0) {
            throw RangeError(`${this.prefix} batch property must be greater than 0`);
        }
        if (batch > 2048) {
            throw RangeError(`${this.prefix} batch property must be less than 2048`);
        }
        return batch;
    }
    getIntervalTimeout(intervalTimeout) {
        if (typeof intervalTimeout !== 'number') {
            return AsyncQueueOptionsManager.DEFAULT_HANDLE_TIMEOUT_VALUE;
        }
        if (intervalTimeout < 0) {
            throw RangeError(`${this.prefix} intervalTimeout property must be greater than 0`);
        }
        return intervalTimeout;
    }
    getIdleMaxIterationLimit(idleMaxIterationLimit) {
        if (typeof idleMaxIterationLimit !== 'number') {
            return AsyncQueueOptionsManager.DEFAULT_IDLE_MAX_ITERATION;
        }
        if (idleMaxIterationLimit <= 0) {
            throw RangeError(`${this.prefix} batch property must be greater than 0`);
        }
        return idleMaxIterationLimit;
    }
}
