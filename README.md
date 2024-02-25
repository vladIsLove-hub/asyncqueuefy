# AsyncQueuefy

**Fast and lightweight async queue library**

Install using npm:

```bash
npm install asyncqueuefy --save
```

```typescript
import AsyncQueue from 'asyncqueuefy';

// Create a new instance of the queue with a batch size of 20 and execute it every 10 second
const queue = new AsyncQueue({ batch: 20, intervalTimeout: 10e3, startExecOnInit: false });

async function fn1() {
  return 42;
}

queue.add(fn1);

queue.start();
```

# AsyncQueuefy Usage Example

The queue runs all tasks at a specified time interval that you have either provided or with the default interval of 5 seconds.

Here are the options that can be passed to the constructor:

- `batch`: Number of tasks to run in one iteration - default is 10.
- `intervalTimeout`: Time interval for queue execution - default is 5 seconds.
- `parallel`: Whether to run all tasks in parallel in one iteration - default is false.
- `verbose`: Whether to log performance measurements - default is true.
- `startExecOnInit`: Whether to start queue execution immediately upon initialization - default is true.
- `idleMaxIterationLimit`: After how many idle iterations the queue should finish iterations, clear timeouts, and terminate - default is Infinity.
