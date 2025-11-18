# 🔧 Quick Setup Verification Script

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📱 Mobile Testing Setup Verification" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js" -ForegroundColor Red
}

# Check npm
Write-Host "`nChecking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm -v
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Check ADB
Write-Host "`nChecking ADB..." -ForegroundColor Yellow
try {
    $adbVersion = adb version
    Write-Host "✅ ADB installed" -ForegroundColor Green
} catch {
    Write-Host "❌ ADB not found. Please add Android SDK to PATH" -ForegroundColor Red
    Write-Host "   Add to PATH: C:\Users\<YourName>\AppData\Local\Android\Sdk\platform-tools" -ForegroundColor Yellow
}

# Check connected devices
Write-Host "`nChecking connected devices..." -ForegroundColor Yellow
try {
    $devices = adb devices
    Write-Host "$devices" -ForegroundColor White
    if ($devices -match "device$") {
        Write-Host "✅ Device/Emulator connected" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No devices connected. Start your emulator" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Cannot check devices" -ForegroundColor Red
}

# Check Appium
Write-Host "`nChecking Appium..." -ForegroundColor Yellow
try {
    $appiumVersion = appium -v
    Write-Host "✅ Appium installed: $appiumVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Appium not found. Install with: npm install -g appium" -ForegroundColor Red
}

# Check Appium drivers
Write-Host "`nChecking Appium drivers..." -ForegroundColor Yellow
try {
    $drivers = appium driver list --installed
    Write-Host "$drivers" -ForegroundColor White
    if ($drivers -match "uiautomator2") {
        Write-Host "✅ UIAutomator2 driver installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  UIAutomator2 driver not found" -ForegroundColor Yellow
        Write-Host "   Install with: appium driver install uiautomator2" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Cannot check drivers" -ForegroundColor Red
}

# Check if Appium server is running
Write-Host "`nChecking Appium server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4723/status" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ Appium server is running" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Appium server not running. Start with: appium" -ForegroundColor Yellow
}

# Check project structure
Write-Host "`nChecking project structure..." -ForegroundColor Yellow
$folders = @("config", "helpers", "page-objects", "test-cases", "tests", "screenshots")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "✅ $folder/ exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $folder/ missing" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📊 Setup Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Ensure emulator is running (adb devices)" -ForegroundColor White
Write-Host "2. Start Appium server (appium)" -ForegroundColor White
Write-Host "3. Run tests (npm test)`n" -ForegroundColor White

Write-Host "For detailed setup, see:" -ForegroundColor Yellow
Write-Host "  - setup.md" -ForegroundColor White
Write-Host "  - TESTING-WORKFLOW.md`n" -ForegroundColor White
