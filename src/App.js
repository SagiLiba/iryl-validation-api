import React, {useState} from 'react';
import './App.scss';
import Form from "./components/Form";
import {textOnly, numbersOnly, minimumLength} from "./validators";

function App() {
    const onFormChange = (formState) => {
        console.log("Form State:",formState)
    }
    const formStory = {
        inputs: [
            {
                // defaultValue: "Sagi", // TODO: fix this
                label: "First Name:",
                checkEmptyField: true,
                emptyFieldErrorMessage: "Yo! fill it bro",
                validators: [minimumLength(2),textOnly],
            },
            {
                placeholder: "Age",
                validators: [
                    numbersOnly
                ],
                disabled: true
            }
        ]
    }
  return (
    <div className="App">
        <div className={"header"}>IRYL - Validation API</div>
        <Form story={formStory} onSubmit={()=>console.log("Submit")} onFormChange={onFormChange} />
    </div>
  );
}

export default App;
