import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterBootstrap = () => {
    const [user, setUser] = useState({})
    const [passwordError, setPasswordError] = useState('')

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log('Email:', email, 'Password:', password)

        if(!/(?=.*?[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide at least two upper case letters')
            return
        }
        if(!/(?=.*?[0-9])/.test(password)){
            setPasswordError('Provide at least one digit')
            return;
        }
        if(password.length < 6){
            setPasswordError('Please provide minimum 6 characters')
            return;
        }
        if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setPasswordError('Please provide at least one Special Character')
            return;
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user)
            setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
          });
    }
    const {uid} = user
    return (
        <div className='w-50 mx-auto'>
             <Form onSubmit = {handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                    
                </Form.Group>

                <p className='text-danger'>{passwordError}</p>

                <Button variant="primary" type="submit">
                    Register
                </Button>
             </Form>
             <p>User Id is: {uid}</p>
        </div>
    );
};

export default RegisterBootstrap;