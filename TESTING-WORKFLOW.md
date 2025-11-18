# 📱 Mobile Testing Workflow Guide

> **Complete guide for implementing mobile test automation following best practices**

---

## 🎯 Testing Workflow Overview

```
1. Test Case Creation → 2. Manual Execution → 3. Automation
```

This workflow ensures you understand the application behavior before automating tests.

---

## 📋 Phase 1: Test Case Creation

### Step 1: Create Test Case Documentation

Before writing any code, document your test cases using the provided templates.

**Location:** `test-cases/`

**Template:** Use `sample-test-case.md` as a reference

**Key Elements:**
- Test objective
- Pre-conditions
- Test steps (manual)
- Expected results
- Element locators (for automation)

**Example:**
```markdown
## Test Case ID: TC-LOGIN-001
### Test Case Title: Verify successful login with valid credentials

Pre-conditions:
- [ ] Emulator is running
- [ ] App is installed

Test Steps:
1. Launch app
2. Enter valid email
3. Enter valid password
4. Click login button
5. Verify home page is displayed
```

### Why Create Test Cases First?

✅ **Benefits:**
- Clear understanding of requirements
- Identifies edge cases early
- Serves as documentation
- Easier to review before coding
- Helps estimate automation effort

---

## 🔍 Phase 2: Manual Execution

### Step 2: Execute Tests Manually

Run through each test case manually to:
- Understand the app flow
- Identify timing issues
- Discover hidden elements
- Note any animations or transitions
- Document actual app behavior

### Step 3: Document Findings

Update your test case with:
- Screenshots of each step
- Timing observations
- Any unexpected behavior
- Notes for automation

---

## 🤖 Phase 3: Automation

### Prerequisites Setup

#### 1. **Start Your Emulator**

**Option A: Android Studio**
```
Android Studio → Device Manager → Start Emulator
```

**Option B: Command Line**
```powershell
emulator -avd <AVD_NAME>
```

#### 2. **Verify Device Connection**

```powershell
npm run check:device
```

Expected output:
```
List of devices attached
emulator-5554   device
```

> ⚠️ **Troubleshooting:** If you see "adb not recognized":
> 1. Add Android SDK to environment variables: `C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools`
> 2. Restart all terminals and applications
> 3. Run `npm run check:device` again

#### 3. **Start Appium Server**

**Open a new terminal** and run:
```powershell
appium
```

You should see:
```
[Appium] Welcome to Appium v3.x.x
[Appium] Appium REST http interface listener started on 0.0.0.0:4723
```

> 💡 **Keep this terminal open** while running tests!

#### 4. **Verify UIAutomator2 Driver**

```powershell
npm run check:appium
```

If not installed:
```powershell
npm run install:driver
```

---

## 🔎 Element Locator Strategy

Follow this priority order when locating elements:

### Priority 1: 🟢 Accessibility ID (Best Practice)

**Why?** Platform-independent, stable, designed for automation

```typescript
await driver.$('~login_button');
```

**Finding in Appium Inspector:**
- Look for: "accessibility id" or "content-desc" (Android) / "accessibility identifier" (iOS)

### Priority 2: 🟡 Resource ID

**Why?** Unique, stable, Android-specific

```typescript
await driver.$('id=com.example.app:id/login_btn');
```

**Finding in Appium Inspector:**
- Look for: "resource-id" (Android)

### Priority 3: 🔴 UiAutomator (Last Resort)

**Why?** Flexible but can be fragile, use when above options aren't available

```typescript
await driver.$('android=new UiSelector().text("Login")');
```

**Common UiAutomator patterns:**
```typescript
// By text
'android=new UiSelector().text("Button Text")'

// By partial text
'android=new UiSelector().textContains("Part of Text")'

// By class and index
'android=new UiSelector().className("android.widget.Button").index(0)'

// By class and text
'android=new UiSelector().className("android.widget.EditText").text("Email")'

// By description
'android=new UiSelector().description("Menu")'
```

---

## 🏗️ Implementation Steps

### Step 1: Use Appium Inspector to Find Elements

#### Launch Appium Inspector

1. Open **Appium Inspector** application
2. Configure connection:

**Remote Host:** `localhost`  
**Remote Port:** `4723`  
**Remote Path:** `/`

3. Add Desired Capabilities:

```json
{
  "platformName": "Android",
  "appium:deviceName": "emulator-5554",
  "appium:automationName": "UiAutomator2",
  "appium:app": "D:\\vs code\\mobile-test\\tests\\app.apk"
}
```

> 📝 **Note:** Use your actual device name from `adb devices`

4. Click **"Start Session"**

#### Identify Elements

1. Click on elements in the app screenshot
2. View element attributes in the right panel
3. Document locators in your test case:

```markdown
### Login Button
- **Accessibility ID:** `login_button`
- **Resource ID:** `com.example.app:id/login_btn`
- **UiAutomator:** `new UiSelector().text("Login")`
```

---

### Step 2: Implement Page Object Model

Create page classes in `page-objects/` folder.

#### Example: LoginPage.ts

```typescript
import { BasePage } from './BasePage';
import { Browser } from 'webdriverio';

export class LoginPage extends BasePage {
  constructor(driver: Browser) {
    super(driver);
  }

  private locators = {
    emailInput: {
      accessibilityId: 'email_input',
      resourceId: 'com.example.app:id/email_field',
      uiAutomator: 'new UiSelector().className("android.widget.EditText").instance(0)'
    },
    // ... more locators
  };

  private async getEmailInput() {
    try {
      return await this.findByAccessibilityId(this.locators.emailInput.accessibilityId);
    } catch {
      try {
        return await this.findByResourceId(this.locators.emailInput.resourceId);
      } catch {
        return await this.findByUiAutomator(this.locators.emailInput.uiAutomator);
      }
    }
  }

  async enterEmail(email: string) {
    const emailInput = await this.getEmailInput();
    await this.setValue(emailInput, email);
  }
}
```

**Benefits of Page Objects:**
- ✅ Reusable code
- ✅ Easy maintenance
- ✅ Readable tests
- ✅ Separation of concerns

---

### Step 3: Write Your Tests

Create test files in `tests/` folder.

#### Example: login.spec.ts

```typescript
import { test, expect } from '@playwright/test';
import { remote } from 'webdriverio';
import { LoginPage } from '../page-objects/LoginPage';
import { getConfig, setAppPath } from '../config/appium.config';

test.describe('Login Tests', () => {
  let driver;
  let loginPage;

  test.beforeEach(async () => {
    const config = getConfig('emulator');
    const appPath = path.join(__dirname, 'app.apk');
    
    driver = await remote(setAppPath(config, appPath));
    loginPage = new LoginPage(driver);
  });

  test.afterEach(async () => {
    await driver.deleteSession();
  });

  test('TC-LOGIN-001: Valid login', async () => {
    await loginPage.login('test@example.com', 'Password123');
    // Add assertions
  });
});
```

---

## 🚀 Running Tests

### Run All Tests
```powershell
npm test
```

### Run Specific Test Suite
```powershell
npm run test:login
npm run test:advanced
```

### Run with Debug Mode
```powershell
npm run test:debug
```

### Run Tests with Custom Device
```powershell
$env:DEVICE_NAME="emulator-5554"; npm test
```

---

## 📊 Project Structure

```
mobile-test/
├── config/
│   ├── appium.config.ts      # Appium configuration
│   └── test-data.ts           # Test data
├── helpers/
│   └── TestHelpers.ts         # Utility functions
├── page-objects/
│   ├── BasePage.ts            # Base page class
│   ├── LoginPage.ts           # Login page
│   └── HomePage.ts            # Home page
├── test-cases/
│   ├── sample-test-case.md    # Template
│   └── example-login-test.md  # Example
├── tests/
│   ├── app.apk                # Test app
│   ├── login.spec.ts          # Login tests
│   └── advanced.spec.ts       # Advanced tests
├── screenshots/               # Test screenshots
├── playwright.config.ts       # Playwright config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies & scripts
```

---

## ❌ Common Issues & Solutions

### Issue 1: "Cannot find server at URL"

**Problem:** Appium server is not running

**Solution:**
```powershell
# Start Appium in a new terminal
appium
```

---

### Issue 2: "UIAutomator2 not found"

**Problem:** Driver not installed

**Solution:**
```powershell
npm run check:appium
npm run install:driver
```

---

### Issue 3: "adb not recognized"

**Problem:** Android SDK not in PATH

**Solution:**
1. Add to environment variables:
   ```
   ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\Sdk
   ```
2. Add to PATH:
   ```
   %ANDROID_HOME%\platform-tools
   ```
3. **Restart all terminals and VS Code**

---

### Issue 4: Connection Failures

**Checklist:**
- ✅ Emulator is running (`adb devices`)
- ✅ Appium server is running (check terminal)
- ✅ Correct port (4723)
- ✅ Correct device name in config
- ✅ Correct app path (absolute path)

---

### Issue 5: Element Not Found

**Debug Steps:**
1. Use Appium Inspector to verify element exists
2. Try fallback locators (Resource ID → UiAutomator)
3. Add explicit waits
4. Check if element is inside a scroll view
5. Verify app state (correct screen?)

**Example Fix:**
```typescript
// Add wait before finding element
await driver.pause(2000);

// Or use explicit wait
await element.waitForDisplayed({ timeout: 10000 });
```

---

### Issue 6: Timing Issues

**Solutions:**
```typescript
// Use waits from test data
import { testData } from '../config/test-data';

await driver.pause(testData.timeouts.short);  // 5000ms
await driver.pause(testData.timeouts.medium); // 10000ms
await driver.pause(testData.timeouts.long);   // 15000ms

// Use explicit waits
await element.waitForDisplayed({ timeout: 15000 });
await element.waitForClickable({ timeout: 10000 });

// Wait for condition
await waitHelper.waitForCondition(
  async () => await homePage.isHomePageDisplayed(),
  15000
);
```

---

## 🎓 Best Practices

### 1. Always Create Test Cases First
Document before coding to ensure clear requirements.

### 2. Execute Manually Before Automating
Understand the app flow and identify issues early.

### 3. Use Page Object Model
Keep tests clean and maintainable.

### 4. Follow Locator Priority
Accessibility ID → Resource ID → UiAutomator

### 5. Add Explicit Waits
Don't rely on implicit waits, be explicit about what you're waiting for.

### 6. Take Screenshots
Especially on failures for easier debugging.

### 7. Use Meaningful Test Names
```typescript
// ✅ Good
test('TC-LOGIN-001: Successful login with valid credentials', ...)

// ❌ Bad
test('test1', ...)
```

### 8. Clean Up After Tests
Always close sessions in `afterEach`:
```typescript
test.afterEach(async () => {
  await driver.deleteSession();
});
```

### 9. Use Configuration Files
Keep test data and configs separate from test logic.

### 10. Log Your Steps
Add console logs to track test progress:
```typescript
console.log('📋 Step 1: Enter email');
console.log('✓ Email entered successfully');
```

---

## 📚 Helper Classes Usage

### ElementLocator
Find elements with automatic fallback:
```typescript
const element = await elementLocator.findWithFallback({
  accessibilityId: 'button_id',
  resourceId: 'com.app:id/button',
  uiAutomator: 'new UiSelector().text("Button")'
});
```

### WaitHelper
Custom waits and conditions:
```typescript
await waitHelper.waitForCondition(
  async () => await page.isDisplayed(),
  timeout
);
```

### GestureHelper
Perform mobile gestures:
```typescript
await gestureHelper.swipeUp();
await gestureHelper.swipeLeft();
await gestureHelper.longPress(element);
```

### DeviceHelper
Device operations:
```typescript
await deviceHelper.hideKeyboard();
await deviceHelper.takeScreenshot('test-name');
await deviceHelper.setOrientation('LANDSCAPE');
```

---

## 🔄 Complete Workflow Example

### 1. Create Test Case
File: `test-cases/login-test.md`
```markdown
## TC-LOGIN-001
Test: Successful login
Steps: Launch app → Enter credentials → Click login → Verify home
```

### 2. Manual Execution
- Open app manually
- Follow test steps
- Document actual behavior
- Note element properties in Appium Inspector

### 3. Implement Page Objects
File: `page-objects/LoginPage.ts`
```typescript
export class LoginPage extends BasePage {
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}
```

### 4. Write Test
File: `tests/login.spec.ts`
```typescript
test('TC-LOGIN-001: Valid login', async () => {
  await loginPage.login(email, password);
  expect(await homePage.isHomePageDisplayed()).toBeTruthy();
});
```

### 5. Run Test
```powershell
npm run test:login
```

---

## 📞 Support & Resources

### Useful Commands
```powershell
# Check setup
npm run check:device
npm run check:appium

# Install driver
npm run install:driver

# Run tests
npm test
npm run test:login
npm run test:advanced

# Get help
npm run help
```

### Documentation Links
- [Appium Documentation](https://appium.io/docs/)
- [WebdriverIO Docs](https://webdriver.io/)
- [Playwright Docs](https://playwright.dev/)
- [UIAutomator Selectors](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)

---

## ✅ Checklist for New Tests

Before writing automation:
- [ ] Test case documented
- [ ] Manual execution completed
- [ ] Elements identified in Appium Inspector
- [ ] Locators documented (following priority)
- [ ] Page objects created/updated
- [ ] Helper methods implemented if needed
- [ ] Test data added to config
- [ ] Test written with clear steps
- [ ] Assertions added
- [ ] Error handling implemented
- [ ] Screenshots on failure
- [ ] Clean up in afterEach

---

## 🎉 You're Ready!

Follow this workflow for consistent, maintainable test automation:

1. **Create** → Document test cases
2. **Execute** → Run manually to understand
3. **Automate** → Implement with best practices

Happy Testing! 🚀
