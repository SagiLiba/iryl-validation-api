import React, {useEffect, useRef, useState} from 'react';
import Input from "./Input";
import SubmitButton from "./SubmitButton";

function Form({story,onSubmit,onFormChange}) {

    const initialInputsValidity = story.inputs.map(() => false);
    let filteredStoryProps = {...story};
    delete filteredStoryProps.inputs;

    const [state,setAllState] = useState({
        readyForSubmit: false,
        inputsValidityStates: initialInputsValidity
    });

    const setState = (newState) => setAllState({...state,...newState});

    const prevState = usePrevious(state);

    useEffect(() => {
        if ( prevState ) {
            onFormChange && onFormChange(state);
            // New state change
            if ( !compareInputsValidity(prevState.inputsValidityStates,state.inputsValidityStates) ) {
                const isFormValid = !state.inputsValidityStates.includes(false);
                setState({readyForSubmit: isFormValid});
            }
        } else {
            onFormChange && onFormChange(state);
        }
    }, [state]);

    const compareInputsValidity = (prevInputsValidity,currentInputsValidity) => {
        let inputsValidityEqual = true;

        for ( let i = 0; i < story.inputs.length; i++ ){
            if ( prevInputsValidity[i] !== currentInputsValidity[i] ) {
                inputsValidityEqual = false;
            }
        }
        return inputsValidityEqual;
    }

    const updateSpecificInputValidityState = (index) => (isValid) => {
        const {inputsValidityStates} = state;

        let newInputsValidityStates = [...inputsValidityStates];
            newInputsValidityStates[index] = isValid;

        console.log(index,"isValid",isValid,inputsValidityStates,newInputsValidityStates)

        setState({inputsValidityStates: newInputsValidityStates})
    }

    const {inputs} = story;
    const {readyForSubmit} = state;

    return (
        <div className={`form`}>
            {/*functionality to add: pass style, debounce,default value*/}
            { inputs.map( (input,index) => {
                return <Input {...filteredStoryProps} {...input} updateInputValidity={updateSpecificInputValidityState(index)}/>
            })}
            {/*functionality to add: pass style*/}
            <SubmitButton disabled={!readyForSubmit} onSubmit={onSubmit}/>
        </div>
    )

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
}

export default Form;
