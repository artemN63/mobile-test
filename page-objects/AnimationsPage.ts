import { BasePage } from './BasePage';
import { Browser } from 'webdriverio';

/**
 * Animations Page Object
 * Contains methods and locators for the Animations screen
 */
export class AnimationsPage extends BasePage {
  constructor(driver: Browser) {
    super(driver);
  }

  /**
   * Get Animation menu element
   */
  private async getAnimationMenu() {
    // Try accessibility ID first
    try {
      const element = await this.findByAccessibilityId('Animation');
      if (await element.isExisting()) {
        return element;
      }
    } catch (error) {
      // Continue to next strategy
    }

    // Try by text
    return await this.findByText('Animation');
  }

  /**
   * Get Hide-Show Animations menu element
   */
  private async getHideShowAnimationsMenu() {
    // Try accessibility ID first
    try {
      const element = await this.findByAccessibilityId('Hide-Show Animations');
      if (await element.isExisting()) {
        return element;
      }
    } catch (error) {
      // Continue to next strategy
    }

    // Try by text
    return await this.findByText('Hide-Show Animations');
  }

  /**
   * Get button element by index (0-3)
   * @param index - Button index (0-3)
   */
  private async getButton(index: number) {
    // The buttons have text="0", "1", "2", "3" (just the number)
    return await this.findByText(index.toString());
  }

  /**
   * Get Show Buttons element
   */
  private async getShowButtons() {
    // The button text is "Show Buttons"
    return await this.findByText('Show Buttons');
  }

  /**
   * Tap on Animation menu
   */
  async tapAnimation() {
    console.log('📱 Tapping on Animation menu...');
    const animationMenu = await this.getAnimationMenu();
    await this.clickElement(animationMenu);
    console.log('✓ Tapped on Animation menu');
  }

  /**
   * Tap on Hide-Show Animations menu
   */
  async tapHideShowAnimations() {
    console.log('📱 Tapping on Hide-Show Animations menu...');
    const hideShowMenu = await this.getHideShowAnimationsMenu();
    await this.clickElement(hideShowMenu);
    console.log('✓ Tapped on Hide-Show Animations menu');
  }

  /**
   * Tap on button by index
   * @param index - Button index (0-3)
   */
  async tapButton(index: number) {
    console.log(`📱 Tapping on button ${index}...`);
    const button = await this.getButton(index);
    await this.clickElement(button);
    console.log(`✓ Tapped on button ${index}`);
    
    // Wait a moment for animation to complete
    await this.pause(500);
  }

  /**
   * Tap Show Buttons
   */
  async tapShowButtons() {
    console.log('📱 Tapping on Show Buttons...');
    const showButtons = await this.getShowButtons();
    await this.clickElement(showButtons);
    console.log('✓ Tapped on Show Buttons');
    
    // Wait a moment for animation to complete
    await this.pause(500);
  }

  /**
   * Verify button is displayed
   * @param index - Button index (0-3)
   */
  async isButtonDisplayed(index: number): Promise<boolean> {
    try {
      const button = await this.getButton(index);
      return await this.isDisplayed(button);
    } catch (error) {
      console.log(`Button ${index} not found:`, error);
      return false;
    }
  }
}
