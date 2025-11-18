# 📱 Mobile Test Automation Framework

A comprehensive mobile testing framework for Android applications using Appium, WebdriverIO, and Playwright.

## 🎯 Features

- ✅ **Page Object Model** - Clean, maintainable test structure
- ✅ **Locator Priority Strategy** - Accessibility ID → Resource ID → UiAutomator
- ✅ **Helper Utilities** - Element location, waits, gestures, device operations
- ✅ **Test Case Templates** - Document before you code
- ✅ **Configuration Management** - Centralized configs for different environments
- ✅ **Screenshot Support** - Automatic screenshots on test steps
- ✅ **TypeScript** - Type-safe test development

## 📋 Quick Start

### 1. Prerequisites

- ✅ Node.js (LTS version)
- ✅ Android Studio with SDK
- ✅ Android Emulator or Physical Device
- ✅ Appium & Appium Inspector

> 📖 See [setup.md](setup.md) for detailed installation instructions

### 2. Verify Setup

```powershell
# Run verification script
.\verify-setup.ps1

# Or manually check:
npm run check:device    # Verify device connection
npm run check:appium    # Verify Appium drivers
```

### 3. Start Testing

```powershell
# Start emulator (if not running)
# Android Studio → Device Manager → Start Emulator

# Verify device
npm run check:device

# Start Appium server (in new terminal)
appium

# Run tests
npm test
```

## 🚀 Usage

### Running Tests

```powershell
# Run all tests
npm test

# Run specific test suite
npm run test:login
npm run test:advanced

# Run with debug mode
npm run test:debug

# Run with custom device
$env:DEVICE_NAME="emulator-5554"; npm test
```

### Creating New Tests

Follow the **3-phase workflow**:

#### Phase 1: Create Test Case
1. Copy `test-cases/sample-test-case.md`
2. Document test steps and expected results
3. Add test case ID and metadata

#### Phase 2: Manual Execution
1. Launch app manually
2. Execute test steps
3. Use **Appium Inspector** to identify elements
4. Document locators in test case

#### Phase 3: Automate
1. Create/update page objects in `page-objects/`
2. Write test in `tests/`
3. Run and verify

> 📖 See [TESTING-WORKFLOW.md](TESTING-WORKFLOW.md) for detailed workflow guide

## 📁 Project Structure

```
mobile-test/
├── config/                    # Configuration files
│   ├── appium.config.ts      # Appium settings
│   └── test-data.ts          # Test data
├── helpers/                   # Utility functions
│   └── TestHelpers.ts        # Element locators, waits, gestures
├── page-objects/             # Page Object Model
│   ├── BasePage.ts           # Base page with common methods
│   ├── LoginPage.ts          # Login page
│   └── HomePage.ts           # Home page
├── test-cases/               # Test case documentation
│   ├── sample-test-case.md   # Template
│   └── example-login-test.md # Example
├── tests/                    # Test files
│   ├── app.apk              # Test application
│   ├── login.spec.ts        # Login tests
│   └── advanced.spec.ts     # Advanced tests
├── screenshots/              # Test screenshots
├── TESTING-WORKFLOW.md       # Detailed workflow guide
├── setup.md                  # Complete setup guide
└── verify-setup.ps1         # Setup verification script
```

## 🔍 Element Locator Strategy

Follow this priority order:

### 1️⃣ **Accessibility ID** (Best Practice)
```typescript
await driver.$('~login_button');
```

### 2️⃣ **Resource ID**
```typescript
await driver.$('id=com.example.app:id/login_btn');
```

### 3️⃣ **UiAutomator** (Last Resort)
```typescript
await driver.$('android=new UiSelector().text("Login")');
```

## 📝 Example Test

```typescript
import { test, expect } from '@playwright/test';
import { remote } from 'webdriverio';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';

test('Successful login', async () => {
  const driver = await remote(config);
  const loginPage = new LoginPage(driver);
  const homePage = new HomePage(driver);

  // Login
  await loginPage.login('test@example.com', 'Password123');

  // Verify
  expect(await homePage.isHomePageDisplayed()).toBeTruthy();

  await driver.deleteSession();
});
```

## 🛠️ Helper Classes

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
Custom waits:
```typescript
await waitHelper.waitForCondition(
  async () => await page.isDisplayed(),
  timeout
);
```

### GestureHelper
Mobile gestures:
```typescript
await gestureHelper.swipeUp();
await gestureHelper.swipeLeft();
```

### DeviceHelper
Device operations:
```typescript
await deviceHelper.hideKeyboard();
await deviceHelper.takeScreenshot('test-name');
```

## ❌ Troubleshooting

### "Cannot find server at URL"
**Solution:** Start Appium server
```powershell
appium
```

### "UIAutomator2 not found"
**Solution:** Install driver
```powershell
npm run install:driver
```

### "adb not recognized"
**Solution:** Add to PATH
```
C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools
```
Then restart terminals and VS Code.

### Element Not Found
1. Verify element exists in Appium Inspector
2. Try fallback locators
3. Add explicit waits
4. Check app state

> 📖 See [TESTING-WORKFLOW.md](TESTING-WORKFLOW.md#-common-issues--solutions) for more solutions

## 📚 Documentation

- **[setup.md](setup.md)** - Complete setup guide from scratch
- **[TESTING-WORKFLOW.md](TESTING-WORKFLOW.md)** - Detailed testing workflow
- **[test-cases/](test-cases/)** - Test case templates and examples

## 🎓 Best Practices

1. ✅ **Create test cases before coding**
2. ✅ **Execute manually first** to understand flow
3. ✅ **Use Page Object Model** for maintainability
4. ✅ **Follow locator priority** (Accessibility ID → Resource ID → UiAutomator)
5. ✅ **Add explicit waits** for reliable tests
6. ✅ **Take screenshots** for debugging
7. ✅ **Clean up sessions** in afterEach hooks
8. ✅ **Use meaningful test names** with test case IDs

## 🤝 Contributing

1. Follow the 3-phase workflow
2. Document test cases first
3. Use provided templates
4. Follow coding standards
5. Add tests for new features

## 📄 License

ISC

## 🔗 Resources

- [Appium Documentation](https://appium.io/docs/)
- [WebdriverIO Docs](https://webdriver.io/)
- [Playwright Docs](https://playwright.dev/)
- [UIAutomator Selectors](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)

---

## 📞 Need Help?

Run the verification script:
```powershell
.\verify-setup.ps1
```

Check available commands:
```powershell
npm run help
```

Read the documentation:
- [setup.md](setup.md) - Installation & configuration
- [TESTING-WORKFLOW.md](TESTING-WORKFLOW.md) - Testing workflow & troubleshooting

---

**Happy Testing! 🎉**