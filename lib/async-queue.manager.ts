import {
  AsyncQueueOptions,
  IAsyncQueueOptionsManager,
} from './async-queue.types';

export class AsyncQueueOptionsManager implements IAsyncQueueOptionsManager {
  private static DEFAULT_BATCH_SIZE = 10;
  private static DEFAULT_HANDLE_TIMEOUT_VALUE = 5e3;
  private static DEFAULT_PARALLEL_MODE = false;
  private static DEFAULT_START_EXEC_ON_INIT = true;
  private static DEFAULT_IDLE_MAX_ITERATION = Infinity;
  private static DEFAULT_VERBOSE = true;

  private prefix: string;
  constructor() {
    this.prefix = `[AsyncQueue]:`;
  }

  public setup(userOptions: Partial<AsyncQueueOptions>): AsyncQueueOptions {
    const options: AsyncQueueOptions = {
      batch: this.getBatch(userOptions?.batch),
      intervalTimeout: this.getIntervalTimeout(userOptions?.intervalTimeout),
      parallel: this.getParallel(userOptions?.parallel),
      verbose: this.getVerbose(userOptions?.verbose),
      startExecOnInit: this.getStartExecOnInit(userOptions?.startExecOnInit),
      idleMaxIterationLimit: this.getIdleMaxIterationLimit(
        userOptions?.idleMaxIterationLimit
      ),
    };

    return options;
  }

  private getStartExecOnInit(startExecOnInit: boolean | undefined): boolean {
    if (startExecOnInit === undefined) {
      return AsyncQueueOptionsManager.DEFAULT_START_EXEC_ON_INIT;
    }

    return startExecOnInit;
  }

  private getParallel(parallel: boolean | undefined): boolean {
    if (parallel === undefined) {
      return AsyncQueueOptionsManager.DEFAULT_PARALLEL_MODE;
    }

    return parallel;
  }

  private getVerbose(verbose: boolean | undefined): boolean {
    if (verbose === undefined) {
      return AsyncQueueOptionsManager.DEFAULT_VERBOSE;
    }

    return verbose;
  }

  private getBatch(batch: number | undefined): number {
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

  private getIntervalTimeout(intervalTimeout: number | undefined): number {
    if (typeof intervalTimeout !== 'number') {
      return AsyncQueueOptionsManager.DEFAULT_HANDLE_TIMEOUT_VALUE;
    }

    if (intervalTimeout < 0) {
      throw RangeError(
        `${this.prefix} intervalTimeout property must be greater than 0`
      );
    }

    return intervalTimeout;
  }

  private getIdleMaxIterationLimit(
    idleMaxIterationLimit: number | undefined
  ): number {
    if (typeof idleMaxIterationLimit !== 'number') {
      return AsyncQueueOptionsManager.DEFAULT_IDLE_MAX_ITERATION;
    }

    if (idleMaxIterationLimit <= 0) {
      throw RangeError(`${this.prefix} batch property must be greater than 0`);
    }

    return idleMaxIterationLimit;
  }
}
