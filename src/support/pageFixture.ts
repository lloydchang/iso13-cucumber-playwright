import { Page } from "playwright";

export const fixture = {
  // This commentsuppresses TypeScript error because 'page' will be initialized later.
  //@ts-expect-error: Initialization of 'page' is deferred
  page: undefined as Page,
  // ...
};
