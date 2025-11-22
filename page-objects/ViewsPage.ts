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
   * Swipe by pixel coordinates
   */
  async swipeByCoordinates(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    await this.driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 500 },
          { type: "pointerMove", duration: 500, x: endX, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await this.driver.releaseActions();
  }

  /**
   * Scroll to the bottom of the list
   */
  async scrollToBottom() {
    const size = await this.driver.getWindowSize();
    const startX = Math.round(size.width / 2);
    const startY = Math.round(size.height * 0.8);
    const endY = Math.round(size.height * 0.2);
    
    let previousPageSource = '';
    let currentPageSource = await this.driver.getPageSource();
    let attempts = 0;
    const maxAttempts = 20;

    while (previousPageSource !== currentPageSource && attempts < maxAttempts) {
      previousPageSource = currentPageSource;
      await this.swipeByCoordinates(startX, startY, startX, endY);
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
    const startX = Math.round(size.width / 2);
    const startY = Math.round(size.height * 0.2);
    const endY = Math.round(size.height * 0.8);
    
    let previousPageSource = '';
    let currentPageSource = await this.driver.getPageSource();
    let attempts = 0;
    const maxAttempts = 20;

    while (previousPageSource !== currentPageSource && attempts < maxAttempts) {
      previousPageSource = currentPageSource;
      await this.swipeByCoordinates(startX, startY, startX, endY);
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
