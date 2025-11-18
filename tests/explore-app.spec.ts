import { test } from '@playwright/test';
import { remote, Browser } from 'webdriverio';
import * as path from 'path';
import { getConfig, setAppPath, setDeviceName } from '../config/appium.config';

/**
 * App Explorer Test
 * Use this to discover what elements are actually in your app
 */

test('Explore app and find elements', async () => {
  console.log('\n🔍 Starting app exploration...');
  
  const deviceName = process.env.DEVICE_NAME || 'emulator-5554';
  const appPath = path.join(__dirname, 'app.apk');
  
  let config = getConfig('emulator');
  config = setAppPath(config, appPath);
  config = setDeviceName(config, deviceName);
  
  const driver: Browser = await remote(config);
  
  console.log('✅ App launched successfully!');
  console.log('\n📱 Current Activity:', await driver.getCurrentActivity());
  console.log('📦 Current Package:', await driver.getCurrentPackage());
  
  // Get the page source to see all elements
  console.log('\n📄 Getting page source...');
  const pageSource = await driver.getPageSource();
  console.log('\n=== PAGE SOURCE ===');
  console.log(pageSource);
  console.log('=== END PAGE SOURCE ===\n');
  
  // Take screenshot
  await driver.saveScreenshot('./screenshots/app-exploration.png');
  console.log('📸 Screenshot saved: app-exploration.png');
  
  // Wait so you can see the app
  await driver.pause(10000);
  
  // Try to find ANY EditText elements
  console.log('\n🔍 Looking for EditText elements...');
  try {
    const editTexts = await driver.$$('android=new UiSelector().className("android.widget.EditText")');
    const editTextCount = await editTexts.length;
    console.log(`Found ${editTextCount} EditText elements`);
    
    for (let i = 0; i < editTextCount; i++) {
      console.log(`\n--- EditText #${i} ---`);
      try {
        const text = await editTexts[i].getText();
        const resourceId = await editTexts[i].getAttribute('resource-id');
        const contentDesc = await editTexts[i].getAttribute('content-desc');
        console.log(`Text: ${text}`);
        console.log(`Resource ID: ${resourceId}`);
        console.log(`Content Description: ${contentDesc}`);
      } catch (e) {
        console.log('Could not get attributes');
      }
    }
  } catch (e) {
    console.log('No EditText elements found or error:', e);
  }
  
  // Try to find ANY Button elements
  console.log('\n🔍 Looking for Button elements...');
  try {
    const buttons = await driver.$$('android=new UiSelector().className("android.widget.Button")');
    const buttonCount = await buttons.length;
    console.log(`Found ${buttonCount} Button elements`);
    
    for (let i = 0; i < buttonCount; i++) {
      console.log(`\n--- Button #${i} ---`);
      try {
        const text = await buttons[i].getText();
        const resourceId = await buttons[i].getAttribute('resource-id');
        const contentDesc = await buttons[i].getAttribute('content-desc');
        console.log(`Text: ${text}`);
        console.log(`Resource ID: ${resourceId}`);
        console.log(`Content Description: ${contentDesc}`);
      } catch (e) {
        console.log('Could not get attributes');
      }
    }
  } catch (e) {
    console.log('No Button elements found or error:', e);
  }
  
  // Try to find ANY TextView elements
  console.log('\n🔍 Looking for TextView elements...');
  try {
    const textViews = await driver.$$('android=new UiSelector().className("android.widget.TextView")');
    const textViewCount = await textViews.length;
    console.log(`Found ${textViewCount} TextView elements (showing first 10)`);
    
    for (let i = 0; i < Math.min(textViewCount, 10); i++) {
      console.log(`\n--- TextView #${i} ---`);
      try {
        const text = await textViews[i].getText();
        const resourceId = await textViews[i].getAttribute('resource-id');
        console.log(`Text: ${text}`);
        console.log(`Resource ID: ${resourceId}`);
      } catch (e) {
        console.log('Could not get attributes');
      }
    }
  } catch (e) {
    console.log('No TextView elements found or error:', e);
  }
  
  console.log('\n\n✅ Exploration complete!');
  console.log('📋 Next steps:');
  console.log('1. Check the console output above for actual element details');
  console.log('2. Check screenshots/app-exploration.png');
  console.log('3. Use Appium Inspector for more detailed exploration');
  console.log('4. Update your Page Objects with the REAL locators\n');
  
  await driver.deleteSession();
});
