import React, {useEffect, useState} from 'react';
import {get} from 'lodash/get'

function Input(props) {

    const [state,setAllState] = useState({
        value: props.defaultValue ? props.defaultValue : "",
        isValid: false,
        isPristine: true,
        errorMessage: "",
        label: props.label ? props.label : "",
        placeholder: props.placeholder ? props.placeholder : "",
    });

    const setState = (newState) => setAllState({...state,...newState});

    useEffect(()=>{
        if ( !props.hasOwnProperty("checkEmptyField") || (props.hasOwnProperty("checkEmptyField") && props.checkEmptyField === false ) ) {
            props.updateInputValidity(true);
        }
        // handleDefaultValue();
    },[])

    const handleDefaultValue = () => {
        if ( state.value ) {
            let {validators} = props;
            validators = validators && validators.length > 0 ? validators : [];
            if ( validators.length > 0 ) {
                const {isInputValid,foundError,validatorErrorMessage} = validateInputWithValidators(validators, state.value);
                const errorMessage = foundError ? validatorErrorMessage : "";

                props.updateInputValidity(isInputValid)
                setState({isValid: isInputValid,isPristine: false,errorMessage: errorMessage});
            }
        }
    }

    const onChange = (event) => {

        const inputValue = event.target.value;
        const isEmpty = !inputValue ? true : false;
        let errorMessage;
        let {validators} = props;
            validators = validators && validators.length > 0 ? validators : [];

        if ( props.hasOwnProperty("disabled") && props.disabled === true ) {
            props.updateInputValidity(true);
        }
        if ( isEmpty ) {
            const {isValidInput,emptyErrorMessage} = handleIsEmptyInput();
            props.updateInputValidity(isValidInput);
            setState({value: "", isValid:isValidInput,isPristine: false, errorMessage: emptyErrorMessage});
            return;
        }

        if ( validators.length === 0 ) {
            props.updateInputValidity(true);
            setState({value: inputValue,isValid: true,isPristine: false})
            return;
        }
        const {isInputValid,foundError,validatorErrorMessage} = validateInputWithValidators(validators,inputValue);

        if ( foundError ) {
            errorMessage = validatorErrorMessage;
        }

        let newState = {
            value: inputValue,
            isValid: isInputValid,
            isPristine: false
        }

        if ( !isInputValid ) {
            newState.errorMessage = errorMessage;
        }

        setState(newState);
        props.updateInputValidity(newState.isValid);

        function handleIsEmptyInput() {
            // User selected that this field is required and cannot be empty
            if ( props.hasOwnProperty("checkEmptyField") && props.checkEmptyField === true ) {
                const emptyErrorMessage = props.emptyFieldErrorMessage ? props.emptyFieldErrorMessage : "Please fill missing data";
                return { isValidInput: false, emptyErrorMessage: emptyErrorMessage };
            } else {
                // User selected that this empty field is not required
                return { isValidInput: true, emptyErrorMessage: "" };
            }
        }

    }
    const validateInputWithValidators = (validators,inputValue) => {

        let runOnce = true; // Used to get the first encountered error.
        let foundError = false;
        let validatorErrorMessage;

        const isInputValid = validators.map((validator) => {

            const validatorResult = validator.function(inputValue);
            const hasError = !validatorResult ? true : false;

            if ( hasError && runOnce ) {
                runOnce = false;
                foundError = true;
                validatorErrorMessage = validator.error;
            }

            return validatorResult;
        })
            .reduce((acc,val) =>{
                return acc && val;
            });

        return {isInputValid,foundError,validatorErrorMessage}
    }

    const {value,label,placeholder,isValid,isPristine,errorMessage} = state;
    const {disabled} = props;
    const errorClass = !isPristine && !isValid ? "input-error" : "";
    const showError = !isPristine && !isValid;
    const disabledClass = disabled ? "input-disabled" : "";

    return (
        <div className={"form-input"}>
            {label && <div className={"label"}>{label}</div>}
            <input type={"text"} value={value} onChange={onChange} className={`${errorClass} ${disabledClass}`} placeholder={placeholder}/>
            { showError && <div className={"error-message"}>
                {errorMessage}
            </div> }
        </div>
    );

}

export default Input;
