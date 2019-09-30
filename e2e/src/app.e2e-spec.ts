import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('MEANChat App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Meanchat', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Login to MEANChat!');
  });


  //insert other e2e it cases here, minimum 10

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
