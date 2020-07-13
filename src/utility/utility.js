export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = isValid && value.trim() !== '';
    }

    if (rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
        isValid = isValid && value.length <= rules.maxLength;
    }

    if (rules.isEmail) {
        isValid = isValid && validateEmail(value);
    }

    if(rules.isNumeric) {
        isValid = isValid && validateNumeral(value);
    }

    return isValid;
}

const validateEmail = (emailAddress) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(emailAddress);
}

const validateNumeral = (value) => {
    const pattern = /^\d+$/;
    return pattern.test(value);
}
