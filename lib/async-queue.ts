import { setTimeout as sleep } from 'node:timers/promises';
import {
  AsyncQueueOptions,
  FnType,
  IAsyncQueue,
  IAsyncQueueOptionsManager,
} from './async-queue.types';
import { AsyncQueueOptionsManager } from './async-queue.manager';

export class AsyncQueue implements IAsyncQueue {
  private queue: FnType[];

  private options: AsyncQueueOptions;

  private interval: NodeJS.Timeout | undefined;
  private isRunning: boolean;
  private currentIdleIteration: number = 0;

  private prefix: string;

  private asyncQueueOptionsManager: IAsyncQueueOptionsManager =
    new AsyncQueueOptionsManager();
  constructor(options: Partial<AsyncQueueOptions>) {
    this.options = this.asyncQueueOptionsManager.setup(options);

    this.queue = [];

    this.isRunning = false;

    this.prefix = `[${AsyncQueue.name}]:`;

    if (options?.startExecOnInit) {
      this.start();
    }
  }

  public add(item: FnType) {
    if (typeof item !== 'function') {
      throw new TypeError(
        `${this.prefix} the type of queue item must be a function`
      );
    }

    this.queue.push(item);
  }

  public pause() {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
  }

  public resume() {
    this.start();
  }

  public start() {
    if (this.interval) {
      return;
    }

    this.interval = this.runInterval();
  }

  private async exec() {
    try {
      if (!this.queue.length) {
        this.currentIdleIteration += 1;
        return;
      }

      if (this.isRunning) {
        return;
      }

      this.isRunning = true;

      const fnsToExecute = this.queue.splice(0, this.options.batch);

      if (this.options.parallel) {
        await Promise.all(fnsToExecute.map((fn) => fn()));
      } else {
        for (let i = 0; i < this.options.batch; i++) {
          const firstFn = fnsToExecute[0];
          if (!firstFn) {
            return;
          }
          await firstFn();
          fnsToExecute.shift();
        }
      }
    } catch (error) {
      throw new Error(`${this.prefix} error occurred: ${error}`);
    } finally {
      this.isRunning = false;
    }
  }

  private runInterval() {
    return setInterval(async () => {
      if (this.currentIdleIteration === this.options.idleMaxIterationLimit) {
        clearInterval(this.interval);
      }
      this.options.verbose && console.time(`${this.prefix} measure iteration`);
      await this.exec();
      this.options.verbose && console.timeEnd(`${this.prefix} measure iteration`);
    }, this.options.intervalTimeout);
  }
}