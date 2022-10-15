import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterBootstrap = () => {
    const [user, setUser] = useState({});
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccess(false);
        setPasswordError('')
        const form = e.target;
        // const email = e.target.email.value
        const email = form.email.value
        const password = form.password.value
        console.log('Email:', email, 'Password:', password)

        if(!/(?=.*?[A-Z])/.test(password)){
            setPasswordError('Please provide at least ONE upper case letters')
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
            console.log(user);
            setUser(user);
            form.reset();
            setSuccess(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
            setPasswordError(errorMessage)
          });
    }
    const {uid} = user
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Register here!!!</h3>
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
                {success && <p className='text-success'>User successfully created</p>}
                
                <Button variant="primary" type="submit">
                    Register
                </Button>
             </Form>
             <p>User Id is: {uid}</p>
        </div>
    );
};

export default RegisterBootstrap;