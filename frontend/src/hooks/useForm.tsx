import React from 'react';

const useForm = () => {

    const submitForm = (data: any) => {
        console.log('data :>> ', data);
        fetch(`https://reqres.in/api/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((json) => {
              console.log('json :>> ', json);
            })
            .catch((error) => console.log('error :>> ', error));
        }

    const findFriend = (id: number, setFriend: Function) => {
        fetch(`http://localhost:8000/iceCream-lover/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',

          })
            .then((res) => res.json())
            .then((json) => {
                console.log('json :>> ', json);
                setFriend(json)
            })
            .catch((error) => console.log('error :>> ', error));
    }


  return {
    findFriend,
    submitForm
  };
};

export default useForm;
