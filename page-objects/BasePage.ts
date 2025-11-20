import { Browser } from 'webdriverio';

/**
 * Base Page Object Model
 * Contains common methods and utilities shared across all page objects
 */
export class BasePage {
  protected driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  /**
   * Find element using Accessibility ID (Priority 1)
   * @param accessibilityId - The accessibility identifier
   */
  async findByAccessibilityId(accessibilityId: string) {
    return await this.driver.$(`~${accessibilityId}`);
  }

  /**
   * Find element using Resource ID (Priority 2)
   * @param resourceId - The resource identifier (e.g., 'com.example:id/button')
   */
  async findByResourceId(resourceId: string) {
    return await this.driver.$(`id=${resourceId}`);
  }

  /**
   * Find element using UiAutomator selector (Priority 3)
   * @param selector - UiAutomator selector string
   */
  async findByUiAutomator(selector: string) {
    return await this.driver.$(`android=${selector}`);
  }

  /**
   * Find element using text
   * @param text - The text to search for
   */
  async findByText(text: string) {
    return await this.driver.$(`android=new UiSelector().text("${text}")`);
  }

  /**
   * Find element using partial text
   * @param text - Partial text to search for
   */
  async findByTextContains(text: string) {
    return await this.driver.$(`android=new UiSelector().textContains("${text}")`);
  }

  /**
   * Wait for element to be visible
   * @param element - The element to wait for
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForElement(element: any, timeout: number = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for element to be clickable (mobile-compatible)
   * @param element - The element to wait for
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForClickable(element: any, timeout: number = 10000) {
    await element.waitForDisplayed({ timeout });
    await element.waitForEnabled({ timeout });
  }

  /**
   * Click on an element with wait
   * @param element - The element to click
   */
  async clickElement(element: any) {
    await this.waitForElement(element);
    await element.click();
  }

  /**
   * Set value in input field
   * @param element - The input element
   * @param value - The value to set
   */
  async setValue(element: any, value: string) {
    await this.waitForElement(element);
    await element.clearValue();
    await element.setValue(value);
  }

  /**
   * Get text from element
   * @param element - The element to get text from
   */
  async getText(element: any): Promise<string> {
    await this.waitForElement(element);
    return await element.getText();
  }

  /**
   * Check if element is displayed
   * @param element - The element to check
   */
  async isDisplayed(element: any): Promise<boolean> {
    try {
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if element exists
   * @param element - The element to check
   */
  async isExisting(element: any): Promise<boolean> {
    try {
      return await element.isExisting();
    } catch (error) {
      return false;
    }
  }

  /**
   * Scroll to element
   * @param element - The element to scroll to
   */
  async scrollToElement(element: any) {
    await element.scrollIntoView();
  }

  /**
   * Hide keyboard if visible
   */
  async hideKeyboard() {
    try {
      await this.driver.hideKeyboard();
    } catch (error) {
      // Keyboard might not be visible, ignore error
      console.log('Keyboard not visible or already hidden');
    }
  }

  /**
   * Swipe from one point to another
   * @param startX - Start X coordinate
   * @param startY - Start Y coordinate
   * @param endX - End X coordinate
   * @param endY - End Y coordinate
   */
  async swipe(startX: number, startY: number, endX: number, endY: number) {
    await this.driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: endX, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe up on screen
   */
  async swipeUp() {
    const size = await this.driver.getWindowSize();
    const startX = size.width / 2;
    const startY = size.height * 0.8;
    const endY = size.height * 0.2;
    await this.swipe(startX, startY, startX, endY);
  }

  /**
   * Swipe down on screen
   */
  async swipeDown() {
    const size = await this.driver.getWindowSize();
    const startX = size.width / 2;
    const startY = size.height * 0.2;
    const endY = size.height * 0.8;
    await this.swipe(startX, startY, startX, endY);
  }

  /**
   * Take screenshot
   * @param filename - Name of the screenshot file
   */
  async takeScreenshot(filename: string) {
    await this.driver.saveScreenshot(`./screenshots/${filename}.png`);
  }

  /**
   * Wait for a specific duration
   * @param milliseconds - Duration to wait
   */
  async pause(milliseconds: number) {
    await this.driver.pause(milliseconds);
  }

  /**
   * Go back (press back button)
   */
  async goBack() {
    await this.driver.back();
  }

  /**
   * Get current activity (Android)
   */
  async getCurrentActivity(): Promise<string> {
    return await this.driver.getCurrentActivity();
  }

  /**
   * Get current package (Android)
   */
  async getCurrentPackage(): Promise<string> {
    return await this.driver.getCurrentPackage();
  }

  /**
   * Terminate app
   */
  async terminateApp(bundleId: string) {
    await this.driver.terminateApp(bundleId);
  }

  /**
   * Launch app
   */
  async activateApp(bundleId: string) {
    await this.driver.activateApp(bundleId);
  }
}
