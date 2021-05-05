import { useState } from 'react';

export interface InputTypes {
  [key: string]: any;
}
const useInput = () => {
  const [inputValues, setInputValues] = useState<InputTypes>({});
  const [inputErrors, setInputErrors] = useState<InputTypes>({});
  const [inputTouched, setInputTouched] = useState<any>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventID = event.target.id;
    const eventValue = event.target.value;
    setInputValues((inputValues) => ({
      ...inputValues,
      [eventID]: eventValue,
    }));
  };

  const handleInputInvalid = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventID = event.target.id;
    const eventValid = event.target.validity;
    debugger
    event.preventDefault();
    setInputErrors((inputErrors) => ({
      ...inputErrors,
      [eventID]: eventValid,
    }));
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventID = event.target.id;
    const eventValid = event.target.validity;
    setInputTouched((inputTouched: any) => ({
        ...inputTouched,
        [eventID]: true,
    }));
    setInputErrors((inputErrors) => ({
        ...inputErrors,
        [eventID]: eventValid,
    }));
  };

  return {
    handleInputBlur,
    handleInputChange,
    handleInputInvalid,
    inputTouched,
    inputErrors,
    inputValues,
  };
};

export default useInput;
