import { browser, element, by } from 'protractor';

export class SenseCogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('snscg-root h1')).getText();
  }
}
