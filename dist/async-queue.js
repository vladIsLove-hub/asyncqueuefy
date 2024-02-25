import { AsyncQueueOptionsManager } from './async-queue.manager';
export class AsyncQueue {
    queue;
    options;
    interval;
    isRunning;
    currentIdleIteration = 0;
    prefix;
    asyncQueueOptionsManager = new AsyncQueueOptionsManager();
    constructor(options) {
        this.options = this.asyncQueueOptionsManager.setup(options);
        this.queue = [];
        this.isRunning = false;
        this.prefix = `[${AsyncQueue.name}]:`;
        if (options?.startExecOnInit) {
            this.start();
        }
    }
    add(item) {
        if (typeof item !== 'function') {
            throw new TypeError(`${this.prefix} the type of queue item must be a function`);
        }
        this.queue.push(item);
    }
    pause() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
    }
    resume() {
        this.start();
    }
    start() {
        if (this.interval) {
            return;
        }
        this.interval = this.runInterval();
    }
    async exec() {
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
            }
            else {
                for (let i = 0; i < this.options.batch; i++) {
                    const firstFn = fnsToExecute[0];
                    if (!firstFn) {
                        return;
                    }
                    await firstFn();
                    fnsToExecute.shift();
                }
            }
        }
        catch (error) {
            throw new Error(`${this.prefix} error occurred: ${error}`);
        }
        finally {
            this.isRunning = false;
        }
    }
    runInterval() {
        return setInterval(async () => {
            if (this.currentIdleIteration === this.options.idleMaxIterationLimit) {
                clearInterval(this.interval);
            }
            this.options.verbose && console.time(`${this.prefix} measure iteration`);
            await this.exec();
            this.options.verbose &&
                console.timeEnd(`${this.prefix} measure iteration`);
        }, this.options.intervalTimeout);
    }
}
