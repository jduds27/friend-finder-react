import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, DropDownOptions } from '../components/dropDown';
import FormInput from '../components/formInput';
import useForm from '../hooks/useForm';
import useInput, { InputTypes } from '../hooks/useInput';
import {
  datePattern,
  emailPattern,
  isEmpty,
  phonePattern,
} from '../utils/validators';

import './homePage.scss';

const url = 'http://localhost:8000/iceCream';

const HomePage: React.FC = () => {
  const formElement = useRef(null);
  const [selectedIceCream, setSelectedIceCream] = useState<DropDownOptions>({
    flavor: '',
    id: NaN,
    ice_cream_lover_id: NaN,
  });
  const [iceCreamLover, setIceCreamLover] = useState<DropDownOptions>({
    flavor: '',
    id: NaN,
    ice_cream_lover_id: NaN,
  });
  const [iceCreamLoverError, setIceCreamLoverError] = useState<string>('');
  const [selectedIceCreamError, setSelectedIceCreamError] = useState<string>(
    ''
  );
  const [formError, setFormError] = useState<string>('');
  const [iceCreamOptions, setIceCreamOptions] = useState<any>();
  const [friend, setFriend] = useState<string>();
  const { findFriend, submitForm } = useForm();

  const {
    handleInputChange,
    inputValues,
    inputErrors,
    inputTouched,
    handleInputBlur,
    handleInputInvalid,
  } = useInput();

  const handleFormSubmit = (e: React.FormEvent) => {
    setFormError('')
    e.preventDefault();
    const iceCream = selectedIceCream.ice_cream_lover_id
    inputValues.iceCream = iceCream;
    let valid = true;
    for (var key in inputErrors) {
      if (inputErrors.hasOwnProperty(key)) {
        // If there's an error, change valid value
        if (inputErrors[key].valid !== true) {
          valid = false;
          break;
        }
      }
    }
    if (!selectedIceCream) {
      setIceCreamLoverError('Please select a flavor')
      setFormError('Please fill out all fields')
    }

    if (valid && !isEmpty(inputErrors) && iceCream) {
      submitForm(inputValues);
    } else setFormError('Please fill out all fields');
  };

  const findFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (iceCreamLover.ice_cream_lover_id) {
      findFriend(iceCreamLover.ice_cream_lover_id, setFriend);
    } else setIceCreamLoverError('You must select an ice cream flavor!');
  };

  useEffect(() => {
    let valid = true;
    for (var key in inputErrors) {
      if (inputErrors.hasOwnProperty(key)) {
        // If there's an error, change valid value
        if (inputErrors[key].valid !== true) {
          valid = false;
          break;
        }
      }
    }
    if (valid && !isEmpty(inputErrors)) {
      setFormError('');
    }
  }, [inputErrors]);

  useEffect(() => {
    fetch('http://localhost:8000/iceCream', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((json) => {
        setIceCreamOptions(json.iceCream);
      })
      .catch((error) => console.log('error :>> ', error));
  }, []);

  const inputItems = [
    {
      label: 'Name',
      type: 'text',
      id: 'userName',
      error: 'Name is required',
      maxLength: 45,
    },
    {
      label: 'Phone Number',
      type: 'text',
      id: 'phone',
      error: 'Please provide a valid phone number',
      pattern: phonePattern,
      minLength: 10,
      maxLength: 13,
    },
    {
      label: 'Email',
      type: 'text',
      id: 'email',
      error: 'Please provide a valid email',
      pattern: emailPattern,
      maxLength: 45,
    },
    {
      label: 'Address',
      type: 'text',
      id: 'address',
      error: 'Please provide an address',
    },
    {
      label: 'Date Of Birth',
      type: 'text',
      id: 'birthday',
      error: 'Please provide a valid date of birth',
      pattern: datePattern,
    },
  ];

  return (
    <div className='ff-page-wrapper'>
      <div className='form-wrapper'>
        <h1>Form Submission</h1>
        <form
          className='ff-form'
          ref={formElement}
          onSubmit={(e) => handleFormSubmit(e)}
          noValidate={true}
        >
          {inputItems.map((input: InputTypes, index: number) => (
            <FormInput
              key={index}
              inputLabel={input.label}
              errorLabel={input.error}
              type={input.type}
              id={input.id}
              value={inputValues[input.id]}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              inputErrors={inputErrors[input.id]}
              inputTouched={inputTouched[input.id]}
              required
              pattern={input.pattern}
              onInvalid={handleInputInvalid}
              minLength={input.minLength}
              maxLength={input.maxLength}
            />
          ))}
          {iceCreamOptions && iceCreamOptions.length > 1 && (
            <Dropdown
              placeholder='Select One'
              options={iceCreamOptions}
              onSelect={setSelectedIceCream}
              setError={setSelectedIceCreamError}
            />
          )}
          <div className='error'>{selectedIceCreamError}</div>
          <div className='error'>{formError}</div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className='form-wrapper'>
        <h1>Find your friend</h1>
        <form
          className='ff-form'
          ref={formElement}
          onSubmit={(e) => findFriendSubmit(e)}
          noValidate={true}
        >
          {iceCreamOptions && iceCreamOptions.length > 1 && (
            <Dropdown
              placeholder='Select A Flavor'
              options={iceCreamOptions}
              onSelect={setIceCreamLover}
              setError={setIceCreamLoverError}
            />
          )}
          <div className='error'>{iceCreamLoverError}</div>
          <button type='submit'>Submit</button>
          {friend && <div className='friend'>Your friend is... {friend}!!!</div>}
        </form>
      </div>
    </div>
  );
};

export default HomePage;
