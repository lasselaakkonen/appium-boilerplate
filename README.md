# Mobile + desktop tests POC

## Setup POC

### Setup Android stuff

This is not guaranteed to work and this probably installs unnecessary stuff as well:

```
brew cask install adoptopenjdk8
brew cask install android-sdk

mkdir .android
touch ~/.android/repositories.cfg
sdkmanager --update
sdkmanager "platform-tools" "platforms;android-29"

# Google Play Services
sdkmanager "extras;google;google_play_services"

# Google Repository
sdkmanager "extras;google;m2repository"

# Android Support Registry
# Required by at least phonegap-plugin-push
sdkmanager "extras;android;m2repository"
```

Add these to your `.zshrc`, `.bashrc` or something:

```
export ANDROID_HOME=/usr/local/share/android-sdk
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools
```

### Setup everything else

```
# Install `appium-doctor` package globally for the POC
npm install -g appium-doctor@1

# Install `appium` package globally for the POC
npm install -g appium@1

# Install Appium Desktop with brew or https://github.com/appium/appium-desktop/releases
brew cask install appium

# Run `appium-doctor` and ensure there are no errors
appium-doctor

# Run `appium` and ensure it runs
appium -v

# Install ChreomeDriver with brew or http://chromedriver.storage.googleapis.com
brew install chromedriver

# Install stuff
npm install

# Download WDIO demo APK to apps dir
wget https://github.com/webdriverio/native-demo-app/releases/download/0.2.1/Android-NativeDemoApp-0.2.1.apk -O apps/Android-NativeDemoApp-0.2.1.apk

# Enable 'USB debugging' on your Android device

# Connect your Android device to your computer

# Test that the Android device is connected
adb devices
```


## Running POC

WDIO should be able to start the appium service, but we need to give appium some extra params to allow it to install chromedrivers.

If WDIO would start appium, it would automatically pass in this parameter:
- Explicitly set the `--base-path` for appium: [github](https://github.com/webdriverio/appium-boilerplate/issues/81#issuecomment-723400163)

WDIO will not automatically pass this param to appium, but WDIO could probably be configured somehow to do this:
- Allow appium to [install ChromeDrivers](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/web/chromedriver.md#automatic-discovery-of-compatible-chromedriver)

Run appium:

```
appium --base-path / --allow-insecure chromedriver_autodownload
```

With the current WDIO configs, WDIO is not able to start both appium and chromedriver services for some reason. So before running the tests, first start chromedriver:

```
chromedriver
```

Only the `android.app` config and `login` tests have been modified to work in this POC:

```
npm run android.app -- --spec login
```



# appium-boilerplate

> **NOTE:**
> This boilerplate is for Webdriver V6, if you need a boilerplate for:\
> - V5 please click [here](https://github.com/webdriverio/appium-boilerplate/tree/v5)
> - V4 please click [here](https://github.com/webdriverio/appium-boilerplate/tree/v4)

Boilerplate project to run Appium tests together with WebdriverIO for:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome and iOS Safari browser ([check here](./README.md#automating-chrome-or-safari))

> This boilerplate uses the WebdriverIO native demo app which can be found [here](https://github.com/webdriverio/native-demo-app).
> The releases can be found and downloaded [here](https://github.com/webdriverio/native-demo-app/releases).
> Before running tests, please create a `./apps` directory, download the app and move the zip files into that directory

> **Note:**
> This boilerplate only handles local execution on 1 em/simulator at a time, not parallel execution. For more info about that Google on setting up a grid with Appium.

![webdriverio-demo-app-ios.ios](./docs/assets/appium-tests.gif)

## Based on
This boilerplate is currently based on:
- **WebdriverIO:** `6.##.#`
- **Appium:** `1.15.#`


## Installing Appium on a local machine
See [Installing Appium on a local machine](./docs/APPIUM.md)

## Setting up Android and iOS on a local machine
To setup your local machine to use an Android emulator and an iOS simulator see [Setting up Android and iOS on a local machine](./docs/ANDROID_IOS_SETUP.md)

## Quick start
Choose one of the following options:

1. Clone the git repo — `git clone https://github.com/webdriverio/appium-boilerplate.git`

2. Then copy the files to your project directory (all files in `/tests` and the `wdio.conf`-files in the `config`-folder)

3. Merge project dev dependencies with your projects dev dependencies in your `package.json`

4. merge the scripts to your `package.json` scripts

5. Run the tests for iOS with `npm run ios.app` and for Android with `npm run android.app`

## Config
This boilerplate uses a specific config for iOS and Android, see [configs](./config/) and are based on `wdio.shared.conf.js`.
This shared config holds all the defaults so the iOS and Android configs only need to hold the capabilities and specs that are needed for running on iOS and or Android (app or browser).

Since we do not have Appium installed as part of this package, this has been configured to use the global Appium installation. This is configured in wdio.shared.conf.js
```
    // ====================
    // Appium Configuration
    // ====================
    services: [
        [
            'appium',
            {
            // For options see
            // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                args: {
                // For arguments see
                // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
                },
                command: 'appium',
            },
        ],
    ],
```

## Locator strategy for native apps
The locator strategy for this boilerplate is to use `accessibilityID`'s, see also the [WebdriverIO docs](http://webdriver.io/guide/usage/selectors.html#Accessibility-ID) or this newsletter on [AppiumPro](https://appiumpro.com/editions/20).
`accessibilityID`'s make it easy to script once and run on iOS and Android because most of the apps already have some `accessibilityID`'s.

If `accessibilityID`'s can't be used and for example only XPATH is only available then the following setup could be used to make cross-platform selectors

```js
const SELECTORS = {
    WEB_VIEW_SCREEN: browser.isAndroid
        ? '*//android.webkit.WebView'
        : '*//XCUIElementTypeWebView',
};
```

## Automating Chrome or Safari
Mobile web automation is almost the same as writing tests for desktop browsers. The only difference can be found in the configuration that needs to be used.
Click [here](./config/wdio.ios.browser.conf.js) to find the config for iOS Safari and [here](./config/wdio.android.browser.conf.js) for Android Chrome.
For Android be sure that the lastest version of Chrome is installed, see also [here](./docs/FAQ.md#i-get-the-error-no-chromedriver-found-that-can-automate-chrome-).

For this boilerplate the testcases from the [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate), created by [Christian Bromann](https://github.com/christian-bromann), are used.

## Cloud vendors

### Sauce Labs Real Device Cloud
This boilerplate now also provides a setup for testing with the Real Device Cloud (RDC) of Sauce Labs. Please check the [SauceLabs](./config/saucelabs)-folder to see the setup for iOS and Android.

> With the latest version of WebdriverIO (`5.4.13` and higher) the iOS and Android config holds:
> - automatic US or EU RDC cloud selection by providing a `region` in the config, see the [iOS](./config/saucelabs/wdio.ios.rdc.app.conf.js) and the [Android](./config/saucelabs/wdio.ios.rdc.app.conf.js) configs
> - automatic update of the teststatus in the RDC cloud without using a customer script

Make sure you install the latest version of the `@wdio/sauce-service` with

```shell
$ npm install --save-dev @wdio/sauce-service
```

and add `services: ['sauce'],` to the config. If no `region` is provided it will automatically default to the US-RDC cloud.
If you provide `region: 'us'` or `region: 'eu'` it will connect to the US or the EU RDC cloud

There are 2 scripts that can be used, see the [`package.json`](./package.json), to execute the tests in the cloud:

    // For iOS
    $ npm run ios.sauce.rdc.app

    // For Android
    $ npm run android.sauce.rdc.app

### BrowserStack

This boilerplate provides a setup for testing with BrowserStack. Please check the [BrowserStack](./config/browserstack)-folder to see the setup for iOS and Android.

Make sure you install the latest version of the `@wdio/browserstack-service` with

```shell
$ npm install --save-dev @wdio/browserstack-service
```

There are 2 scripts that can be used, see the [`package.json`](./package.json), to execute the tests in the cloud:

    // For iOS
    $ npm run ios.browserstack.app

    // For Android
    $ npm run android.browserstack.app

## FAQ
See [FAQ](./docs/FAQ.md)

## Tips and Tricks
See [Tips and Tricks](./docs/TIPS_TRICKS.md)
