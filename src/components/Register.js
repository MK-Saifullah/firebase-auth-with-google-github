import React from 'react';

const Register = () => {
    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value; 
        console.log(email, password)
      }
      const handleEmailChange = (e) => {
        console.log(e.target.value)
      }
      const handlePasswordChange = (e) => {
        console.log(e.target.value)
      }
    return (
        <div>
               <form onSubmit={handleRegister}>
                <input onBlur={handleEmailChange} type="email" name="email"  placeholder='Email'/> <br/>
                <input onBlur={handlePasswordChange} type="password" name="password"  placeholder='Password'/><br/>
                <button type="submit">Register</button>
      </form>
        </div>
    );
};

export default Register;