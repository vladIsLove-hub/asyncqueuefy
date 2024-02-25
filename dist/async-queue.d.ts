import { AsyncQueueOptions, FnType, IAsyncQueue } from './async-queue.types';
export declare class AsyncQueue implements IAsyncQueue {
    private queue;
    private options;
    private interval;
    private isRunning;
    private currentIdleIteration;
    private prefix;
    private asyncQueueOptionsManager;
    constructor(options: Partial<AsyncQueueOptions>);
    add(item: FnType): void;
    pause(): void;
    resume(): void;
    start(): void;
    private exec;
    private runInterval;
}
