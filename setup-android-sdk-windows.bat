@echo off
REM ====================================================================
REM Android SDK Environment Setup Script for Windows
REM This script will permanently set Android SDK environment variables
REM ====================================================================

echo Android SDK Environment Setup for Windows
echo ==========================================
echo.

REM Prompt user for Android SDK location
set /p ANDROID_HOME="Enter your Android SDK path (e.g., C:\Users\YourName\AppData\Local\Android\Sdk): "

REM Check if the directory exists
if not exist "%ANDROID_HOME%" (
    echo.
    echo ERROR: The specified Android SDK path does not exist: %ANDROID_HOME%
    echo Please check the path and try again.
    pause
    exit /b 1
)

REM Check if platform-tools directory exists
if not exist "%ANDROID_HOME%\platform-tools" (
    echo.
    echo WARNING: platform-tools directory not found in the Android SDK path.
    echo Please ensure Android SDK is properly installed.
    pause
    exit /b 1
)

echo.
echo Setting ANDROID_HOME environment variable...
setx ANDROID_HOME "%ANDROID_HOME%" /M

echo.
echo Adding Android SDK tools to PATH...
REM Get current system PATH
for /f "tokens=2*" %%a in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path ^| findstr /i "Path"') do set "CURRENT_PATH=%%b"

REM Check if paths are already in PATH
echo %CURRENT_PATH% | findstr /i /c:"%ANDROID_HOME%\platform-tools" >nul
if %errorlevel% neq 0 (
    setx PATH "%CURRENT_PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin" /M
    echo Platform-tools, tools, and tools\bin added to PATH.
) else (
    echo Android SDK paths are already in PATH.
)

echo.
echo ==========================================
echo Setup completed successfully!
echo ==========================================
echo.
echo IMPORTANT: Please restart your command prompt or PowerShell
echo for the changes to take effect.
echo.
echo You can verify the setup by running:
echo   adb --version
echo.
pause
