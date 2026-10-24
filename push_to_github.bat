@echo off
setlocal
echo ========================================================
echo         TEAM VAYU - PUSH REPOSITORY TO GITHUB
echo ========================================================
echo.

set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
if not exist "%GIT_CMD%" (
    where git >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Git was not found in PATH or LocalAppData.
        pause
        exit /b 1
    )
    set "GIT_CMD=git"
)

echo Enter your GitHub repository URL (e.g., https://github.com/your-username/vayu-website.git):
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo [1/3] Setting remote origin...
"%GIT_CMD%" remote remove origin >nul 2>&1
"%GIT_CMD%" remote add origin %REPO_URL%

echo [2/3] Verifying branch...
"%GIT_CMD%" branch -M main

echo [3/3] Pushing to GitHub...
"%GIT_CMD%" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Your repository is now live on GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTE] If prompted for authentication:
    echo - Use your GitHub username and a Personal Access Token (PAT)
    echo   or sign in via GitHub browser prompt.
)

echo.
pause
