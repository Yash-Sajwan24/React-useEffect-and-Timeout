//edited here
import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
// import { eventWrapper } from '@testing-library/user-event/dist/utils';

//outside the main function
const emailReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'Input_Blur'){
    return {value: state.value , isValid: state.value.includes('@')}
    //state.value will store the previous snapshot of value field
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'Input_Blur'){
    return {value: state.value , isValid: state.value.trim().length > 6}
    //state.value will store the previous snapshot of value field
  }

  return {value: '', isValid: false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  }); 

  //this is used as an alias so that when the condition is satisfied it wont validate again
  //after password length is 6 then it wont check again 
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid}= passwordState;
  //this is run when the email or password is changed rather than a loop 
  //we dont not want to send the req unnecessary when the user is typing 
  //so we are going to use decboucing that is sending after a certain pause to reduce the traffic
  useEffect(() => {
    
    const identifier = setTimeout(() => {
      console.log('checking validity');//first time it runs first
      setFormIsValid(
        emailIsValid && passwordIsValid 
      );
    }, 500);//500 milli seconds

    return () => {//this will always run before the the above function expect for the first time
      console.log('Cleanup');
      clearTimeout(identifier);//this will execute the identifier after a certain timeout
    };
   
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'User_Input', val: event.target.value});

    
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'User_Input', val: event.target.value});

  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'Input_Blur', });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'Input_Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
