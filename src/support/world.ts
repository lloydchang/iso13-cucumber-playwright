import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from 'playwright';

export class CustomWorld extends World {
  page: Page | undefined;

  constructor(options: any) { // Setting options type to any
    super(options);
    this.page = undefined;
  }
}

setWorldConstructor(CustomWorld);
