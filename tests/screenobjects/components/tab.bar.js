export default class TabBar {
    static openHome () {
        android.$('~Home').click();
    }

    static openWebView () {
        android.$('~WebView').click();
    }

    static openLogin () {
        android.$('~Login').click();
    }

    static openForms () {
        android.$('~Forms').click();
    }

    static openSwipe () {
        android.$('~Swipe').click();
    }

    static waitForTabBarShown () {
        android.$('~Home').waitForDisplayed({
            timeout: 20000,
        });
    }
}
