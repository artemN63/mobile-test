import { test, expect } from '@playwright/test';
import { remote, Browser } from 'webdriverio';
import * as path from 'path';
import { getConfig, setAppPath, setDeviceName } from '../config/appium.config';
import { ElementLocator, WaitHelper, DeviceHelper, GestureHelper } from '../helpers/TestHelpers';

/**
 * Advanced Mobile Test - Demonstrating Helper Utilities with API Demos
 * 
 * This test shows how to use helper classes for:
 * - Element location with fallback strategies
 * - Custom waits
 * - Device interactions
 * - Gestures and swipes
 */

test.describe('API Demos - Advanced Helper Features', () => {
  let driver: Browser;
  let elementLocator: ElementLocator;
  let waitHelper: WaitHelper;
  let deviceHelper: DeviceHelper;
  let gestureHelper: GestureHelper;

  test.beforeEach(async () => {
    console.log('\n🚀 Starting advanced test setup...');
    
    const deviceName = process.env.DEVICE_NAME || 'emulator-5554';
    const appPath = path.join(__dirname, 'app.apk');
    
    let config = getConfig('emulator');
    config = setAppPath(config, appPath);
    config = setDeviceName(config, deviceName);
    
    driver = await remote(config);
    
    // Initialize helpers
    elementLocator = new ElementLocator(driver);
    waitHelper = new WaitHelper(driver);
    deviceHelper = new DeviceHelper(driver);
    gestureHelper = new GestureHelper(driver);
    
    console.log('✅ Setup complete with all helpers initialized');
  });

  test.afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  test('Example: Using element locator with fallback', async () => {
    console.log('\n🧪 Test: Element Locator with Fallback Strategy');
    
    await driver.pause(2000);
    
    // Find an element that exists in API Demos with multiple strategies
    const element = await elementLocator.findWithFallback({
      accessibilityId: 'Accessibility',
      resourceId: 'android:id/text1',
      uiAutomator: 'new UiSelector().text("Accessibility")'
    });
    
    expect(await element.isExisting()).toBeTruthy();
    console.log('✓ Element found using fallback strategy');
    
    // Wait for element with custom timeout
    await elementLocator.waitForElement({
      accessibilityId: 'Animation',
      resourceId: 'android:id/text1',
      uiAutomator: 'new UiSelector().text("Animation")'
    }, 15000);
    
    console.log('✓ Element found and is visible');
  });

  test('Example: Using device helpers', async () => {
    console.log('\n🧪 Test: Device Helper Features');
    
    // Get device information
    const currentActivity = await deviceHelper.getCurrentActivity();
    console.log(`Current Activity: ${currentActivity}`);
    
    const currentPackage = await deviceHelper.getCurrentPackage();
    console.log(`Current Package: ${currentPackage}`);
    
    const orientation = await deviceHelper.getOrientation();
    console.log(`Current Orientation: ${orientation}`);
    
    // Take screenshot
    await deviceHelper.takeScreenshot('device-info-test');
    
    // Hide keyboard if visible
    await deviceHelper.hideKeyboard();
    
    console.log('✓ Device helpers working correctly');
  });

  test('Example: Using gesture helpers', async () => {
    console.log('\n🧪 Test: Gesture Helper Features');
    
    await driver.pause(2000);
    
    // Demonstrate different gestures on the API Demos list
    console.log('Performing swipe up...');
    await gestureHelper.swipeUp();
    await waitHelper.pause(1000);
    
    console.log('Performing swipe down...');
    await gestureHelper.swipeDown();
    await waitHelper.pause(1000);
    
    // Take screenshot after gestures
    await deviceHelper.takeScreenshot('after-gestures');
    console.log('✓ Gesture helpers working correctly');
  });

  test('Example: Using wait helpers with conditions', async () => {
    console.log('\n🧪 Test: Wait Helper with Custom Conditions');
    
    await driver.pause(2000);
    
    // Wait for custom condition (list view to be visible)
    const listViewLoaded = await waitHelper.waitForCondition(
      async () => {
        const listView = await driver.$('android=new UiSelector().className("android.widget.ListView")');
        return await listView.isExisting();
      },
      10000,
      1000
    );
    
    expect(listViewLoaded).toBeTruthy();
    console.log('✓ Custom wait condition successful');
    
    // Wait for specific text to appear
    const textFound = await waitHelper.waitForCondition(
      async () => {
        const element = await driver.$('android=new UiSelector().text("Views")');
        return await element.isExisting();
      },
      10000,
      1000
    );
    
    expect(textFound).toBeTruthy();
    console.log('✓ Wait for text condition successful');
  });

  test('Example: Complete workflow with all helpers', async () => {
    console.log('\n🧪 Test: Complete Workflow Demo');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Step 1: Take initial screenshot
    await deviceHelper.takeScreenshot('01-workflow-start');
    console.log('✓ Initial screenshot taken');
    
    // Step 2: Get device info
    const activity = await deviceHelper.getCurrentActivity();
    const packageName = await deviceHelper.getCurrentPackage();
    console.log(`✓ Current Activity: ${activity}`);
    console.log(`✓ Current Package: ${packageName}`);
    
    // Step 3: Find element using locator with fallback
    const accessibilityOption = await elementLocator.findWithFallback({
      accessibilityId: 'Accessibility',
      resourceId: 'android:id/text1',
      uiAutomator: 'new UiSelector().text("Accessibility")'
    });
    console.log('✓ Element found using locator');
    
    // Step 4: Wait for element to be clickable
    await elementLocator.waitForElement({
      accessibilityId: 'Accessibility',
      resourceId: 'android:id/text1',
      uiAutomator: 'new UiSelector().text("Accessibility")'
    }, 10000);
    console.log('✓ Element is clickable');
    
    // Step 5: Click the element
    await accessibilityOption.click();
    await waitHelper.pause(1000);
    console.log('✓ Clicked element');
    
    // Step 6: Take screenshot after interaction
    await deviceHelper.takeScreenshot('02-after-click');
    console.log('✓ Screenshot after click taken');
    
    // Step 7: Navigate back
    await driver.back();
    await waitHelper.pause(1000);
    console.log('✓ Navigated back');
    
    // Step 8: Perform gesture
    await gestureHelper.swipeUp();
    await waitHelper.pause(500);
    console.log('✓ Swipe gesture performed');
    
    // Step 9: Take final screenshot
    await deviceHelper.takeScreenshot('03-workflow-complete');
    console.log('✓ Final screenshot taken');
    
    // Step 10: Verify we're back on the main screen
    const isBackOnMain = await waitHelper.waitForCondition(
      async () => {
        const listView = await driver.$('android=new UiSelector().className("android.widget.ListView")');
        return await listView.isExisting();
      },
      10000,
      500
    );
    expect(isBackOnMain).toBeTruthy();
    console.log('✓ Verified back on main screen');
    
    console.log('\n✅ Complete workflow test passed');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  });
});
