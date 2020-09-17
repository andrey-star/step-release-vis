/*
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO(#138): review the autogenerated config, once the file is actually in use, and we have more insight on the real needs
import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<
      string
    >;
  }
}
