import { SenseCogPage } from './app.po';

describe('sense-cog App', () => {
  let page: SenseCogPage;

  beforeEach(() => {
    page = new SenseCogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('snscg works!');
  });
});
