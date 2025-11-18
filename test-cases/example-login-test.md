# Test Case: User Login Flow

## Test Case ID: TC-LOGIN-001

### Test Case Title
Verify successful user login with valid credentials

---

## 📋 Test Information

| Field | Details |
|-------|---------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Created By** | QA Team |
| **Date** | November 17, 2025 |

---

## 🎯 Test Objective

Validate that a user can successfully log into the application using valid credentials and is redirected to the home screen.

---

## 📝 Pre-conditions

- [x] Android emulator is running (verify with `adb devices`)
- [x] App APK is available in tests folder
- [x] Appium server is running on port 4723
- [x] Test user account exists in the system

---

## 🔧 Test Data

| Field | Value |
|-------|-------|
| Email | testuser@example.com |
| Password | Test@12345 |

---

## 📱 Test Steps (Manual Execution)

### Step 1: Launch the application
**Action:** Open the app on the emulator
**Expected Result:** App launches successfully and displays the login screen

### Step 2: Enter email address
**Action:** Tap on the email input field and enter "testuser@example.com"
**Expected Result:** Email is displayed in the input field

### Step 3: Enter password
**Action:** Tap on the password input field and enter "Test@12345"
**Expected Result:** Password is masked and displayed as dots/asterisks

### Step 4: Tap login button
**Action:** Tap on the "Login" or "Sign In" button
**Expected Result:** Loading indicator appears briefly

### Step 5: Verify successful login
**Action:** Wait for navigation to complete
**Expected Result:** User is redirected to home screen/dashboard

---

## ✅ Expected Results

- [x] Login screen is displayed on app launch
- [x] Email and password fields accept input
- [x] Login button is clickable
- [x] Successful authentication occurs
- [x] User is navigated to home screen
- [x] No error messages are displayed

---

## 🔍 Element Locators

> Elements identified using Appium Inspector

### Email Input Field
- **Priority (Accessibility ID):** `~email_input`
- **Fallback (Resource ID):** `com.example.app:id/email_field`
- **Fallback (UiAutomator):** `new UiSelector().className("android.widget.EditText").instance(0)`

### Password Input Field
- **Priority (Accessibility ID):** `~password_input`
- **Fallback (Resource ID):** `com.example.app:id/password_field`
- **Fallback (UiAutomator):** `new UiSelector().className("android.widget.EditText").instance(1)`

### Login Button
- **Priority (Accessibility ID):** `~login_button`
- **Fallback (Resource ID):** `com.example.app:id/login_btn`
- **Fallback (UiAutomator):** `new UiSelector().text("Login")`

### Home Screen Title (Verification Element)
- **Priority (Accessibility ID):** `~home_title`
- **Fallback (Resource ID):** `com.example.app:id/home_title`
- **Fallback (UiAutomator):** `new UiSelector().text("Home")`

---

## 🤖 Automation Notes

### Implementation Approach
1. Create LoginPage class with page object model
2. Implement methods: enterEmail(), enterPassword(), clickLogin()
3. Create HomePage class with verification methods
4. Implement explicit waits for element visibility
5. Add assertions to verify successful navigation

### Challenges/Considerations
- [x] Wait for app to fully load before interacting
- [x] Handle potential splash screen delays
- [x] Keyboard may cover elements - need to dismiss
- [x] Network delays during authentication
- [x] Different screen resolutions may affect element positions

### Dependencies
- [x] LoginPage page object
- [x] HomePage page object
- [x] ElementHelper utility for waits
- [x] AppConfig for test data

---

## 📊 Test Execution Results

### Manual Execution

| Date | Tester | Result | Comments |
|------|--------|--------|----------|
| 2025-11-17 | QA Team | ✅ Pass | Login flow works as expected |

### Automated Execution

| Date | Build | Result | Comments |
|------|-------|--------|----------|
| - | - | Pending | Automation in progress |

---

## 🐛 Known Issues

None currently

---

## 📎 Related Test Cases

- TC-LOGIN-002: Verify login with invalid credentials
- TC-LOGIN-003: Verify login with empty fields
- TC-LOGIN-004: Verify password visibility toggle
- TC-LOGOUT-001: Verify logout functionality
