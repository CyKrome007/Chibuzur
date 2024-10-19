import {isValidUsername} from "6pp";

export const usernameValidator = (username) => {

    /*
    let usernamePattern = /^(?![_@.])(?=(?:.*[a-z]){3})(?![_@.]$)[a-z0-9_@.]{5,20}$/;

    if(!usernamePattern.test(username)) {
        return {isValid: false, errorMessage: 'Username is Invalid'}
    }
    */

    if(!isValidUsername(username)) {
        return {isValid: false, errorMessage: 'Username is Invalid'}
    }

};
