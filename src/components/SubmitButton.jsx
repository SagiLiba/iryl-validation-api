import React, {useState} from 'react';

function SubmitButton({buttonText,disabled,onSubmit}) {

    const disabledClass = disabled ? "submit-disabled" : "";
    buttonText = buttonText ? buttonText : "Submit";
    const onClick = !disabled ? onSubmit : () => {}

    return (
        <div className={`submit-button ${disabledClass}`} onClick={onClick}>
            {buttonText}
        </div>
    )
}

export default SubmitButton;
