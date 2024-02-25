export type FnType = () => unknown | Promise<unknown>;
export interface IAsyncQueue {
    add: (item: FnType) => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
}
export interface IAsyncQueueOptionsManager {
    setup: (userOptions: Partial<AsyncQueueOptions>) => AsyncQueueOptions;
}
export type AsyncQueueOptions = {
    batch: number;
    intervalTimeout: number;
    parallel: boolean;
    startExecOnInit: boolean;
    idleMaxIterationLimit: number;
    verbose: boolean;
};
