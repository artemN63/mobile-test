# Test Case Template

## Test Case ID: TC-001

### Test Case Title
[Brief description of what this test validates]

---

## 📋 Test Information

| Field | Details |
|-------|---------|
| **Module** | [e.g., Login, Registration, Checkout] |
| **Priority** | [High/Medium/Low] |
| **Type** | [Functional/UI/Integration/Regression] |
| **Created By** | [Your Name] |
| **Date** | [Creation Date] |

---

## 🎯 Test Objective

[Clear description of what functionality or behavior this test validates]

---

## 📝 Pre-conditions

- [ ] Emulator/Device is running
- [ ] App is installed
- [ ] [Any specific app state required]
- [ ] [Any test data needed]

---

## 🔧 Test Data

| Field | Value |
|-------|-------|
| Username | testuser@example.com |
| Password | Test@123 |
| [Other data] | [Values] |

---

## 📱 Test Steps (Manual Execution)

### Step 1: [Action]
**Expected Result:** [What should happen]

### Step 2: [Action]
**Expected Result:** [What should happen]

### Step 3: [Action]
**Expected Result:** [What should happen]

---

## ✅ Expected Results

- [ ] [Specific outcome 1]
- [ ] [Specific outcome 2]
- [ ] [Specific outcome 3]

---

## 🔍 Element Locators

> Document all elements needed for automation (identified via Appium Inspector)

### Element 1: [Element Name]
- **Priority Locator (Accessibility ID):** `~accessibility_id_value`
- **Fallback (Resource ID):** `com.example:id/element_id`
- **Fallback (UiAutomator):** `new UiSelector().text("Button Text")`
- **Screenshot:** [Optional - add inspector screenshot]

### Element 2: [Element Name]
- **Priority Locator (Accessibility ID):** `~accessibility_id_value`
- **Fallback (Resource ID):** `com.example:id/element_id`
- **Fallback (UiAutomator):** `new UiSelector().className("android.widget.Button").index(0)`

---

## 🤖 Automation Notes

### Implementation Approach
[Notes about how to automate this test]

### Challenges/Considerations
- [ ] [Any timing issues to consider]
- [ ] [Dynamic elements]
- [ ] [Special waits needed]

### Dependencies
- [ ] [Related page objects]
- [ ] [Helper functions needed]

---

## 📊 Test Execution Results

### Manual Execution

| Date | Tester | Result | Comments |
|------|--------|--------|----------|
| [Date] | [Name] | ✅ Pass / ❌ Fail | [Any notes] |

### Automated Execution

| Date | Build | Result | Comments |
|------|-------|--------|----------|
| [Date] | [Build #] | ✅ Pass / ❌ Fail | [Any notes] |

---

## 🐛 Known Issues

- [List any known issues or bugs related to this test case]

---

## 📎 Related Test Cases

- [TC-XXX: Related test case name]
- [TC-XXX: Another related test]
