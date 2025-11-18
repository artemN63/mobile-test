import { BasePage } from './BasePage';
import { Browser } from 'webdriverio';

/**
 * Home Page Object
 * Contains methods and locators for the home screen
 */
export class HomePage extends BasePage {
  constructor(driver: Browser) {
    super(driver);
  }

  // Locator strategies - Following priority: Accessibility ID → Resource ID → UiAutomator
  private locators = {
    homeTitle: {
      accessibilityId: 'home_title',
      resourceId: 'com.example.app:id/home_title',
      uiAutomator: 'new UiSelector().text("Home")'
    },
    welcomeMessage: {
      accessibilityId: 'welcome_message',
      resourceId: 'com.example.app:id/welcome_text',
      uiAutomator: 'new UiSelector().textContains("Welcome")'
    },
    menuButton: {
      accessibilityId: 'menu_button',
      resourceId: 'com.example.app:id/menu_btn',
      uiAutomator: 'new UiSelector().description("Menu")'
    },
    logoutButton: {
      accessibilityId: 'logout_button',
      resourceId: 'com.example.app:id/logout_btn',
      uiAutomator: 'new UiSelector().text("Logout")'
    }
  };

  /**
   * Get home title element using priority locator strategy
   */
  private async getHomeTitle() {
    try {
      return await this.findByAccessibilityId(this.locators.homeTitle.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.homeTitle.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.homeTitle.uiAutomator);
      }
    }
  }

  /**
   * Get welcome message element using priority locator strategy
   */
  private async getWelcomeMessage() {
    try {
      return await this.findByAccessibilityId(this.locators.welcomeMessage.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.welcomeMessage.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.welcomeMessage.uiAutomator);
      }
    }
  }

  /**
   * Get menu button element using priority locator strategy
   */
  private async getMenuButton() {
    try {
      return await this.findByAccessibilityId(this.locators.menuButton.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.menuButton.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.menuButton.uiAutomator);
      }
    }
  }

  /**
   * Get logout button element using priority locator strategy
   */
  private async getLogoutButton() {
    try {
      return await this.findByAccessibilityId(this.locators.logoutButton.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.logoutButton.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.logoutButton.uiAutomator);
      }
    }
  }

  /**
   * Verify home page is displayed
   */
  async isHomePageDisplayed(): Promise<boolean> {
    try {
      const homeTitle = await this.getHomeTitle();
      return await this.isDisplayed(homeTitle);
    } catch (error) {
      console.log('Home page not displayed:', error);
      return false;
    }
  }

  /**
   * Get home title text
   */
  async getHomeTitleText(): Promise<string> {
    const title = await this.getHomeTitle();
    return await this.getText(title);
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessageText(): Promise<string> {
    const message = await this.getWelcomeMessage();
    return await this.getText(message);
  }

  /**
   * Wait for home page to load
   * @param timeout - Timeout in milliseconds (default: 15000)
   */
  async waitForHomePageToLoad(timeout: number = 15000) {
    console.log('⏳ Waiting for home page to load...');
    const homeTitle = await this.getHomeTitle();
    await this.waitForElement(homeTitle, timeout);
    console.log('✅ Home page loaded successfully');
  }

  /**
   * Click menu button
   */
  async clickMenu() {
    const menuButton = await this.getMenuButton();
    await this.clickElement(menuButton);
    console.log('✓ Clicked menu button');
  }

  /**
   * Perform logout
   */
  async logout() {
    console.log('🚪 Performing logout...');
    await this.clickMenu();
    const logoutButton = await this.getLogoutButton();
    await this.clickElement(logoutButton);
    console.log('✅ Logout completed');
  }

  /**
   * Verify user is logged in
   */
  async verifyUserLoggedIn(): Promise<boolean> {
    try {
      const isDisplayed = await this.isHomePageDisplayed();
      if (isDisplayed) {
        console.log('✅ User successfully logged in - Home page displayed');
        return true;
      } else {
        console.log('❌ User not logged in - Home page not displayed');
        return false;
      }
    } catch (error) {
      console.log('❌ Error verifying login:', error);
      return false;
    }
  }
}
