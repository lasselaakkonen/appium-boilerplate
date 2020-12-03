import NativeAlert from '../helpers/NativeAlert';
import Picker from '../helpers/Picker';
import { getTextOfElement } from '../helpers/utils';
import AppScreen from './app.screen';

const SELECTORS = {
    FORMS_SCREEN: '~Forms-screen',
    INPUT: '~text-input',
    INPUT_TEXT: '~input-text-result',
    SWITCH: '~switch',
    SWITCH_TEXT: '~switch-text',
    DROP_DOWN: '~select-Dropdown',
    ACTIVE_BUTTON: '~button-Active',
    IN_ACTIVE_BUTTON: '~button-Inactive',
};

class FormsScreen extends AppScreen {
    constructor () {
        super(SELECTORS.FORMS_SCREEN);
    }

    get input () {
        return android.$(SELECTORS.INPUT);
    }

    get inputTextResult () {
        return android.$(SELECTORS.INPUT_TEXT);
    }

    get switch () {
        return android.$(SELECTORS.SWITCH);
    }

    get switchText () {
        return android.$(SELECTORS.SWITCH_TEXT);
    }

    /**
     * Return if the switch is active or not active for iOS / Android
     * For Android the switch is `ON|OFF`, for iOS '1|0'
     *
     * @return {boolean}
     */
    isSwitchActive () {
        const active = android.isAndroid ? 'ON' : '1';

        return this.switch.getText() === active;
    }

    get dropDown () {
        return android.$(SELECTORS.DROP_DOWN);
    }

    /**
     * Get the text of the drop down component
     *
     * @return {string}
     */
    getDropDownText () {
        return getTextOfElement(android.$(SELECTORS.DROP_DOWN));
    }

    get picker () {
        return Picker;
    }

    get activeButton () {
        return android.$(SELECTORS.ACTIVE_BUTTON);
    }

    get inActiveButton () {
        return android.$(SELECTORS.IN_ACTIVE_BUTTON);
    }

    get alert () {
        return NativeAlert;
    }
}

export default new FormsScreen();
