import { test, expect } from '@playwright/test';
import { remote, Browser } from 'webdriverio';
import * as path from 'path';
import { getConfig, setAppPath, setDeviceName } from '../config/appium.config';
import { ViewsPage } from '../page-objects/ViewsPage';

test.describe('Views - Scroll Validation', () => {
  let driver: Browser;
  let viewsPage: ViewsPage;

  test.beforeEach(async () => {
    const deviceName = process.env.DEVICE_NAME || 'emulator-5554';
    const appPath = path.join(__dirname, 'app.apk');
    
    let config = getConfig('emulator');
    config = setAppPath(config, appPath);
    config = setDeviceName(config, deviceName);
    
    driver = await remote(config);
    viewsPage = new ViewsPage(driver);
    
    await driver.pause(2000);
  });

  test.afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  test('Validate scroll to bottom and top with element visibility', async () => {
    // Step 2: Tap 'Views' menu element
    await viewsPage.tapViews();
    
    // Step 3: Scroll all the way to the bottom
    await viewsPage.scrollToBottom();
    
    // Step 4: Validate 'WebView3' is visible
    const isWebView3Visible = await viewsPage.isElementVisible('WebView3');
    expect(isWebView3Visible).toBeTruthy();
    
    // Step 5: Scroll all the way to the up
    await viewsPage.scrollToTop();
    
    // Step 6: Validate 'Animations' is visible (checking for 'Animation' as it appears in the app)
    const isAnimationsVisible = await viewsPage.isElementVisible('Animation');
    expect(isAnimationsVisible).toBeTruthy();
  });
});
