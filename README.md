# APK Web App (Android Packaging)

This repository keeps the original web app in `/home/runner/work/apk/apk/index.html` and wraps it as an Android app using **Capacitor**.

## What was added

- Capacitor project configuration (`capacitor.config.json`)
- Android native project (`/home/runner/work/apk/apk/android`)
- Web asset sync script (`/home/runner/work/apk/apk/scripts/sync-web-assets.js`)
- npm scripts for syncing/building debug APK
- Small mobile-usability CSS adjustments in `index.html` (no redesign)
- Android back navigation support in `MainActivity`

## Prerequisites

- Node.js 18+ and npm
- Android Studio (latest stable)
- Android SDK + platform/build-tools installed in Android Studio
- JDK 17 (recommended for current Android Gradle plugin)
- (Optional) `adb` for installing APK from terminal

## Setup

From `/home/runner/work/apk/apk`:

```bash
npm install
```

## Build commands

### 1) Sync web app into Capacitor assets

```bash
npm run android:sync
```

This runs `scripts/sync-web-assets.js`, which copies the web app files into `www/` and then runs Capacitor sync.

### 2) Build debug APK

```bash
npm run android:build:debug
```

Expected APK output:

`/home/runner/work/apk/apk/android/app/build/outputs/apk/debug/app-debug.apk`

### 3) Open in Android Studio (optional)

```bash
npm run android:open
```

Then build/run from Android Studio if you prefer IDE workflow.

## Install debug APK on phone

Enable Developer Options + USB debugging on Android phone, then:

```bash
adb install -r /home/runner/work/apk/apk/android/app/build/outputs/apk/debug/app-debug.apk
```

## App ID / app name (easy to change)

- Current placeholder app ID: `com.example.apkwebapp`
- Current app name: `APK Web App`

Change both in `/home/runner/work/apk/apk/capacitor.config.json`, then run:

```bash
npm run android:sync
```

## Launcher icon strategy

Current project uses default Capacitor Android launcher icons.  
To brand the app, replace icon files under:

`/home/runner/work/apk/apk/android/app/src/main/res/mipmap-*`

## Notes

- The web app still uses its existing CDN resources (Tailwind/Google Fonts/Font Awesome), so internet access is required at runtime for those external assets.
- Existing web logic and UI are preserved; Android app displays the same app inside a WebView wrapper.
- In this sandbox, Gradle dependency download from `dl.google.com` was blocked, so `assembleDebug` could not complete here. On a normal local machine with Android SDK + internet access, the documented build command should work.
