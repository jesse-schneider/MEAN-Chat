import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('MEANChat App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    
  });

  it('should display Meanchat', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Login to MEANChat!');
  });

  it('should fail login', () => {
    browser.get('/');
    element(by.id('submitbutton')).click();
    browser.sleep(3000);
    browser.switchTo().alert().then((alert) => {
      expect(alert.getText()).toEqual("Please check you credentials and try again.");
      alert.accept();
    });
  });

  it('should not navigate to home', () => {
    browser.get('/home');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4201/');
  });

  it('should login correctly', () => {
    browser.get('/');
    element(by.id('username')).sendKeys('super');
    element(by.id('password')).sendKeys('test');
    element(by.id('submitbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4201/home');
  });

  it('should create and remove a group', () => {
    element(by.id('startButton')).click();
    element(by.id('newGroup')).sendKeys('e2e-testing');
    element(by.id('submitbutton')).click();
    browser.sleep(3000); 
    element.all(by.css('.list-group-item')).then((arr) => {
      for(const i in arr) {
        arr[i].getText().then((resolvedText) => {
          var str = resolvedText.split('\n');
          var text = str[0];
          console.log(text);
          if (text === "e2e-testing") {
            arr[i].element(by.buttonText('Remove')).click();
            browser.sleep(1000);
            browser.switchTo().alert().accept();
          }
        });
      }
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
