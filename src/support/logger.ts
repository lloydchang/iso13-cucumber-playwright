// src/support/logger.ts
export const logger = {
  error: (message: string, ...args: any[]) => {
    console.error(`ERROR: ${message}`, ...args);
  },
  info: (message: string, ...args: any[]) => {
    console.info(`INFO: ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    console.debug(`DEBUG: ${message}`, ...args);
  },
};
