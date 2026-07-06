/**
 * Promise utility functions for handling async operations
 */

/**
 * Delay execution by specified milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry a function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delayMs?: number;
    backoffMultiplier?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {},
): Promise<T> => {
  const { maxAttempts = 3, delayMs = 1000, backoffMultiplier = 2, onRetry } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      onRetry?.(attempt, error as Error);
      await delay(delayMs * Math.pow(backoffMultiplier, attempt - 1));
    }
  }

  throw new Error('Failed to execute after maximum attempts');
};

/**
 * Cancel a promise after specified timeout
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Promise timeout')), timeoutMs),
    ),
  ]);
};

/**
 * Wait for condition to be true with timeout
 */
export const waitFor = async (
  condition: () => boolean,
  options: { timeoutMs?: number; checkIntervalMs?: number } = {},
): Promise<void> => {
  const { timeoutMs = 10000, checkIntervalMs = 100 } = options;
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeoutMs) {
      throw new Error('waitFor timeout exceeded');
    }
    await delay(checkIntervalMs);
  }
};

/**
 * Execute multiple promises with concurrency limit
 */
export const execWithConcurrency = async <T>(
  promises: (() => Promise<T>)[],
  concurrency: number,
): Promise<T[]> => {
  const results: T[] = [];
  const queue = [...promises];

  const worker = async () => {
    while (queue.length > 0) {
      const fn = queue.shift();
      if (!fn) break;
      results.push(await fn());
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
};
