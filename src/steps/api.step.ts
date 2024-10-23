import {Given, When, Then} from '@cucumber/cucumber';
import {request, APIResponse} from 'playwright';
import {expect} from '@playwright/test';

let apiContext: any;
let responses: APIResponse[] = [];
let endpoint: string;



