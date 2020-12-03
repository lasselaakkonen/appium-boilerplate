import TabBar from '../screenobjects/components/tab.bar';
import LoginScreen from '../screenobjects/login.screen';

describe('WebdriverIO and Appium, when interacting with a login form,', () => {
    beforeEach(() => {
        TabBar.waitForTabBarShown(true);
        TabBar.openLogin();
        LoginScreen.waitForIsShown(true);
    });

    it('should be able login successfully', () => {
        LoginScreen.loginContainerButon.click();
        LoginScreen.email.setValue('test@webdriver.io');
        LoginScreen.password.setValue('Test1234!');

        if (android.isKeyboardShown()) {
            android.hideKeyboard();
        }
        LoginScreen.loginButton.click();
        LoginScreen.alert.waitForIsShown();
        expect(LoginScreen.alert.text()).toEqual('Success\nYou are logged in!');

        LoginScreen.alert.pressButton('OK');
        LoginScreen.alert.waitForIsShown(false);
    });

    it('should open a page in Chrome', () => {
        chrome.url('https://sandbox.congrid.com/live');
        const loginButton = chrome.$('button');
        loginButton.waitForDisplayed();
    });

    // Try to implement this yourself
    xit('should be able sign up successfully', () => {

    });
});
