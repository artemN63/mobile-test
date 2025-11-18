import { BasePage } from './BasePage';
import { Browser } from 'webdriverio';

/**
 * Login Page Object
 * Contains methods and locators for the login screen
 */
export class LoginPage extends BasePage {
  constructor(driver: Browser) {
    super(driver);
  }

  // Locator strategies - Following priority: Accessibility ID → Resource ID → UiAutomator
  private locators = {
    emailInput: {
      accessibilityId: 'email_input',
      resourceId: 'com.example.app:id/email_field',
      uiAutomator: 'new UiSelector().className("android.widget.EditText").instance(0)'
    },
    passwordInput: {
      accessibilityId: 'password_input',
      resourceId: 'com.example.app:id/password_field',
      uiAutomator: 'new UiSelector().className("android.widget.EditText").instance(1)'
    },
    loginButton: {
      accessibilityId: 'login_button',
      resourceId: 'com.example.app:id/login_btn',
      uiAutomator: 'new UiSelector().text("Login")'
    },
    errorMessage: {
      accessibilityId: 'error_message',
      resourceId: 'com.example.app:id/error_text',
      uiAutomator: 'new UiSelector().className("android.widget.TextView").textContains("Error")'
    }
  };

  /**
   * Get email input element using priority locator strategy
   */
  private async getEmailInput() {
    try {
      return await this.findByAccessibilityId(this.locators.emailInput.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.emailInput.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.emailInput.uiAutomator);
      }
    }
  }

  /**
   * Get password input element using priority locator strategy
   */
  private async getPasswordInput() {
    try {
      return await this.findByAccessibilityId(this.locators.passwordInput.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.passwordInput.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.passwordInput.uiAutomator);
      }
    }
  }

  /**
   * Get login button element using priority locator strategy
   */
  private async getLoginButton() {
    try {
      return await this.findByAccessibilityId(this.locators.loginButton.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.loginButton.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.loginButton.uiAutomator);
      }
    }
  }

  /**
   * Get error message element using priority locator strategy
   */
  private async getErrorMessage() {
    try {
      return await this.findByAccessibilityId(this.locators.errorMessage.accessibilityId);
    } catch (error) {
      try {
        return await this.findByResourceId(this.locators.errorMessage.resourceId);
      } catch (error) {
        return await this.findByUiAutomator(this.locators.errorMessage.uiAutomator);
      }
    }
  }

  /**
   * Enter email address
   * @param email - The email to enter
   */
  async enterEmail(email: string) {
    const emailInput = await this.getEmailInput();
    await this.setValue(emailInput, email);
    console.log(`✓ Entered email: ${email}`);
  }

  /**
   * Enter password
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    const passwordInput = await this.getPasswordInput();
    await this.setValue(passwordInput, password);
    console.log('✓ Entered password');
  }

  /**
   * Click login button
   */
  async clickLogin() {
    const loginButton = await this.getLoginButton();
    await this.clickElement(loginButton);
    console.log('✓ Clicked login button');
  }

  /**
   * Perform complete login action
   * @param email - The email address
   * @param password - The password
   */
  async login(email: string, password: string) {
    console.log('🔐 Performing login...');
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.hideKeyboard();
    await this.clickLogin();
    console.log('✅ Login action completed');
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    try {
      const errorElement = await this.getErrorMessage();
      return await this.isDisplayed(errorElement);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorText(): Promise<string> {
    const errorElement = await this.getErrorMessage();
    return await this.getText(errorElement);
  }

  /**
   * Verify login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    try {
      const emailInput = await this.getEmailInput();
      const passwordInput = await this.getPasswordInput();
      const loginButton = await this.getLoginButton();
      
      return (
        await this.isDisplayed(emailInput) &&
        await this.isDisplayed(passwordInput) &&
        await this.isDisplayed(loginButton)
      );
    } catch (error) {
      return false;
    }
  }
}
