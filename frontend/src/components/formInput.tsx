import React from 'react';
import { InputTypes } from '../hooks/useInput';

import './formInput.scss';

interface FormInputProps {
    inputLabel: string
    svgIcon?: string
    id: string
    value: any
    type: 'text' | 'email' | 'number'
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur: React.FocusEventHandler<HTMLInputElement>
    onInvalid: React.ChangeEventHandler<HTMLInputElement>
    errorLabel: string
    required?: boolean
    inputErrors: InputTypes
    inputTouched: boolean
    pattern?: string
    minLength?: number
    maxLength?: number
}

const FormInput: React.FC<FormInputProps> = ({
    inputLabel,
    id,
    value,
    type,
    onChange,
    onBlur,
    onInvalid,
    errorLabel,
    required,
    inputErrors,
    inputTouched,
    pattern,
    minLength,
    maxLength,
}) => {

    const formInputClass = inputErrors?.valid === false && inputTouched
    ? 'ff-input input-error'
    : 'ff-input';


    const inputFilled = () => {
        if (value) return value.length > 0;
    };


    return (
        <div className={formInputClass}>
            <div className="input-wrapper">

                <input type={type} id={id} value={value}  onChange={onChange} required={required} onBlur={onBlur} pattern={pattern} onInvalid={onInvalid} minLength={minLength} maxLength={maxLength}/>
                <label
                    className={`input-label${inputFilled() ? ' filled' : ''}`}
                    htmlFor={id}
                >
                    {inputLabel}
                </label>
                <label className={`error-label${inputFilled() ? ' filled' : ''}`}>
                    {errorLabel}
                </label>
            </div>
        </div>
    );
};

export default FormInput