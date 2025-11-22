import { BasePage } from './BasePage';
import { Browser } from 'webdriverio';

/**
 * Views Page Object
 * Contains methods and locators for the Views screen in API Demos
 */
export class ViewsPage extends BasePage {
  constructor(driver: Browser) {
    super(driver);
  }

  /**
   * Tap on Views menu element
   */
  async tapViews() {
    const viewsElement = await this.findByText('Views');
    await this.clickElement(viewsElement);
    await this.pause(1000);
  }

  /**
   * Scroll to the bottom of the list
   */
  async scrollToBottom() {
    const size = await this.driver.getWindowSize();
    const listElement = await this.driver.$('android.widget.ListView');
    const elementId = await listElement.elementId;
    
    let previousPageSource = '';
    let currentPageSource = await this.driver.getPageSource();
    let attempts = 0;
    const maxAttempts = 20;

    while (previousPageSource !== currentPageSource && attempts < maxAttempts) {
      previousPageSource = currentPageSource;
      await this.driver.execute('mobile: scrollGesture', {
        elementId,
        direction: 'down',
        percent: 0.75
      });
      await this.pause(300);
      currentPageSource = await this.driver.getPageSource();
      attempts++;
    }
  }

  /**
   * Scroll to the top of the list
   */
  async scrollToTop() {
    const size = await this.driver.getWindowSize();
    const listElement = await this.driver.$('android.widget.ListView');
    const elementId = await listElement.elementId;
    
    let previousPageSource = '';
    let currentPageSource = await this.driver.getPageSource();
    let attempts = 0;
    const maxAttempts = 20;

    while (previousPageSource !== currentPageSource && attempts < maxAttempts) {
      previousPageSource = currentPageSource;
      await this.driver.execute('mobile: scrollGesture', {
        elementId,
        direction: 'up',
        percent: 0.75
      });
      await this.pause(300);
      currentPageSource = await this.driver.getPageSource();
      attempts++;
    }
  }

  /**
   * Check if element with specific text is visible
   */
  async isElementVisible(text: string): Promise<boolean> {
    try {
      const element = await this.driver.$(`android=new UiSelector().textContains("${text}")`);
      const exists = await element.isExisting();
      if (!exists) return false;
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}
