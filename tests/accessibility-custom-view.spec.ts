import { test, expect } from '@playwright/test';
import { remote, Browser } from 'webdriverio';
import * as path from 'path';
import { getConfig, setAppPath, setDeviceName } from '../config/appium.config';

test.describe('Accessibility - Custom View Text Verification', () => {
  let driver: Browser;

  test.beforeEach(async () => {
    const deviceName = process.env.DEVICE_NAME || 'emulator-5554';
    const appPath = path.join(__dirname, 'app.apk');
    
    let config = getConfig('emulator');
    config = setAppPath(config, appPath);
    config = setDeviceName(config, deviceName);
    
    driver = await remote(config);
  });

  test.afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  test('TC-007: Navigate to Accessibility > Custom View and verify TalkBack text', async () => {
    await driver.pause(2000);
    
    let accessibilityMenu = null;
    let found = false;
    
    try {
      const element = await driver.$('~Accessibility');
      if (await element.isExisting()) {
        accessibilityMenu = element;
        found = true;
      }
    } catch (error) {
      // Try next strategy
    }
    
    if (!found) {
      try {
        const element = await driver.$('android=new UiSelector().text("Accessibility")');
        if (await element.isExisting()) {
          accessibilityMenu = element;
          found = true;
        }
      } catch (error) {
        // Element not found
      }
    }
    
    expect(found).toBeTruthy();
    if (accessibilityMenu) {
      await accessibilityMenu.click();
    }
    
    await driver.pause(1000);
    
    let customViewMenu = null;
    found = false;
    
    try {
      const element = await driver.$('~Custom View');
      if (await element.isExisting()) {
        customViewMenu = element;
        found = true;
      }
    } catch (error) {
      // Try next strategy
    }
    
    if (!found) {
      try {
        const element = await driver.$('android=new UiSelector().text("Custom View")');
        if (await element.isExisting()) {
          customViewMenu = element;
          found = true;
        }
      } catch (error) {
        // Element not found
      }
    }
    
    expect(found).toBeTruthy();
    if (customViewMenu) {
      await customViewMenu.click();
    }
    
    await driver.pause(2000);
    
    const expectedText = '1. Enable TalkBack (Settings -> Accessibility -> TalkBack). \n\n2. Enable Explore-by-Touch (Settings -> Accessibility -> Explore by Touch). \n\n3. Touch explore/poke the buttons.';
    
    let actualText = '';
    let textFound = false;
    
    try {
      const textElement = await driver.$('android=new UiSelector().textContains("Enable TalkBack")');
      if (await textElement.isExisting()) {
        actualText = await textElement.getText();
        textFound = true;
      }
    } catch (error) {
      // Try next strategy
    }
    
    if (!textFound) {
      try {
        const textElement = await driver.$('android=new UiSelector().textContains("TalkBack")');
        if (await textElement.isExisting()) {
          actualText = await textElement.getText();
          textFound = true;
        }
      } catch (error) {
        // Try next strategy
      }
    }
    
    if (!textFound) {
      try {
        const textViews = await driver.$$('android.widget.TextView');
        
        for (const textView of textViews) {
          try {
            const text = await textView.getText();
            if (text && text.includes('Enable TalkBack')) {
              actualText = text;
              textFound = true;
              break;
            }
          } catch (error) {
            // Skip this element
          }
        }
      } catch (error) {
        // Try next strategy
      }
    }
    
    if (!textFound) {
      try {
        const pageSource = await driver.getPageSource();
        if (pageSource.includes('Enable TalkBack')) {
          textFound = true;
          actualText = 'Text found in page source but could not extract element text';
        }
      } catch (error) {
        // Element not found
      }
    }
    
    expect(textFound).toBeTruthy();
    expect(actualText).toBe(expectedText);
  });
});
