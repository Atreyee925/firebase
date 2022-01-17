
import React, { useState } from 'react'
import { Form,Button, Alert } from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext';
import { getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import app from "../firebase";

const Signup = () => {
    const [name, setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [error, setError]=useState("");
    const {signUp} = useUserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("token", user?.accessToken);
          const userDetails = {
            email: user?.email,
          };
  
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          
          // dispatch(setuser(userDetails));
          navigate("/home")
  
  
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    };
    // const onSubmit=(e)=>{
    // e.preventDefault();
    
    // }
    return (
        <div>
            <h1  className="p-4 box mt-3 text-center">Sign Up</h1>
            {error && <Alert variant="danger">{error}</Alert>}
           <Form onSubmit={handleSubmit}>
           <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Full name</Form.Label>
    <Form.Control type="text" placeholder="Enter the Name"
    onChange={(e) => setName(e.target.value)} 
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
     onChange={(e) => setEmail(e.target.value)} 
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" 
     onChange={(e) => setPassword(e.target.value)} 
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Re-enter Password" 
     onChange={(e) => setConfirmPassword(e.target.value)} 
    />
  </Form.Group>
  
  <div>
  <Button variant="primary" type="submit" >
    Sign up
  </Button>
  </div>
</Form>
<div className="p-4 box mt-3 text-center">
Already have an account? <Link to="/"> Log In</Link>
</div>
        </div>
    )
}

export default Signup
