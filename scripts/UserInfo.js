export class UserInfo {
    constructor({userNameSelector, userSublineSelector}) {
        this._userNameSelector = userNameSelector;
        this._userSublineSelector = userSublineSelector;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._userNameSelector.textContent,
            subline: this._userSublineSelector.textContent
        };
        return this._userInfo;
        
    }

    setUserInfo(userInfo) {
        this._userNameSelector.textContent = userInfo.name;
        this._userSublineSelector.textContent = userInfo.subline;
    }
 } 