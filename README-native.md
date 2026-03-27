# Phone Theremin — Native App Setup

Capacitor scaffold is ready. Follow these steps once your developer accounts are confirmed.

---

## Prerequisites

- [x] Node + npm (already installed)
- [x] Capacitor scaffold (`capacitor.config.ts`, `www/`, `package.json`)
- [ ] Apple Developer account ($99/yr) — **waiting for confirmation**
- [ ] Google Play Console ($25 one-time) — to do after Apple
- [ ] Xcode (for iOS) — install from Mac App Store
- [ ] Android Studio (for Android) — install from developer.android.com

---

## Step 1 — Set your Bundle ID

Once your Apple Developer account is active, pick a Bundle ID.
Convention: reverse-domain notation, e.g. `com.ensor.phonetheremin`

Edit `capacitor.config.ts` and replace the placeholder:
```ts
appId: 'com.ensor.phonetheremin',  // ← your real Bundle ID here
```

This must match what you register in App Store Connect.

---

## Step 2 — Add iOS platform

```bash
cd ~/phone-theremin
npm run add:ios        # generates ios/ project folder
npm run sync           # copies www/ into the native project
npm run open:ios       # opens Xcode
```

In Xcode:
1. Select the `App` target → Signing & Capabilities
2. Set Team to your Apple Developer account
3. Confirm Bundle Identifier matches `capacitor.config.ts`
4. Build & run on simulator or connected device

---

## Step 3 — Add Android platform

```bash
npm run add:android    # generates android/ project folder
npm run sync
npm run open:android   # opens Android Studio
```

In Android Studio:
1. Wait for Gradle sync to complete
2. Run on emulator or connected device

---

## Step 4 — App icons + splash screen

Install the asset generator:
```bash
npm install @capacitor/assets --save-dev
```

Prepare source images in `assets/`:
- `assets/icon.png` — 1024×1024 PNG, no transparency (required by Apple)
- `assets/splash.png` — 2732×2732 PNG, centred logo

Then generate all sizes:
```bash
npx @capacitor/assets generate
npm run sync
```

---

## Step 5 — iOS Info.plist entries

Xcode will need these keys in `ios/App/App/Info.plist` (Capacitor adds the file, you add the keys):

```xml
<!-- Required if using microphone input -->
<key>NSMicrophoneUsageDescription</key>
<string>Phone Theremin uses the microphone to detect hand position for volume control.</string>

<!-- DeviceMotion permission is handled in JS via DeviceMotionEvent.requestPermission() -->
<!-- No Info.plist key needed for that -->
```

The app currently uses touch-based volume (no mic), so the microphone key can be omitted unless you add mic-based features later.

---

## Step 6 — TestFlight (iOS beta)

1. In Xcode: Product → Archive
2. Distribute App → TestFlight & App Store
3. Log into App Store Connect → TestFlight → add testers by email
4. Testers get an email invite + install via TestFlight app

---

## Step 7 — App Store submission

1. Create app record in App Store Connect (name, category: Music, age rating: 4+)
2. Upload screenshots (iPhone 6.7" required, others optional)
3. Fill metadata: description, keywords, support URL
4. Submit for review (~1–3 days)

---

## Paid App Setup (if charging)

1. App Store Connect → Agreements, Tax, and Banking → sign paid apps agreement
2. Enter Australian bank account (BSB + account) + tax info (ABN or TFN)
3. Wait 1–2 days for processing
4. Then set price in App Store Connect (price tiers — e.g. Tier 3 = ~$2.49 AUD)

Google Play: same idea in Play Console → Setup → Payments profile.

---

## After Each Web Change

If you update `www/index.html`, re-sync before building native:
```bash
npm run sync
```

Then rebuild in Xcode / Android Studio.
