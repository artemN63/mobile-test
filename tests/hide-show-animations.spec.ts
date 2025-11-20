import { test, expect } from '@playwright/test';
import { remote, Browser } from 'webdriverio';
import * as path from 'path';
import { getConfig, setAppPath, setDeviceName } from '../config/appium.config';
import { AnimationsPage } from '../page-objects/AnimationsPage';

test.describe('Animations - Hide-Show Animations', () => {
  let driver: Browser;
  let animationsPage: AnimationsPage;

  test.beforeEach(async () => {
    // Get device name from environment or use default
    const deviceName = process.env.DEVICE_NAME || 'emulator-5554';
    
    // Set app path to APIDemos.apk (app.apk contains API Demos)
    const appPath = path.join(__dirname, 'app.apk');
    
    // Configure Appium
    let config = getConfig('emulator');
    config = setAppPath(config, appPath);
    config = setDeviceName(config, deviceName);
    
    // Start WebDriver session
    driver = await remote(config);
    
    // Initialize page object
    animationsPage = new AnimationsPage(driver);
    
    // Wait for app to load
    await driver.pause(2000);
  });

  test.afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  test('TC-008: Hide and show animation buttons', async () => {
    // Step 2: Tap 'Animation' menu element
    await animationsPage.tapAnimation();
    
    // Step 3: Tap 'Hide-Show Animations' menu element
    await animationsPage.tapHideShowAnimations();
    
    // Step 4: Tap on button 0 and validate it's gone
    expect(await animationsPage.isButtonDisplayed(0)).toBeTruthy();
    await animationsPage.tapButton(0);
    expect(await animationsPage.isButtonDisplayed(0)).toBeFalsy();
    
    // Step 5: Tap on button 1 and validate it's gone
    expect(await animationsPage.isButtonDisplayed(1)).toBeTruthy();
    await animationsPage.tapButton(1);
    expect(await animationsPage.isButtonDisplayed(1)).toBeFalsy();
    
    // Step 6: Tap on button 2 and validate it's gone
    expect(await animationsPage.isButtonDisplayed(2)).toBeTruthy();
    await animationsPage.tapButton(2);
    expect(await animationsPage.isButtonDisplayed(2)).toBeFalsy();
    
    // Step 7: Tap on button 3 and validate it's gone
    expect(await animationsPage.isButtonDisplayed(3)).toBeTruthy();
    await animationsPage.tapButton(3);
    expect(await animationsPage.isButtonDisplayed(3)).toBeFalsy();
    
    // Step 8: Tap on 'Show Buttons' and verify all buttons are back
    await animationsPage.tapShowButtons();
    expect(await animationsPage.isButtonDisplayed(0)).toBeTruthy();
    expect(await animationsPage.isButtonDisplayed(1)).toBeTruthy();
    expect(await animationsPage.isButtonDisplayed(2)).toBeTruthy();
    expect(await animationsPage.isButtonDisplayed(3)).toBeTruthy();
  });
});
