import React ,{useState} from 'react'
import { Form,Button,Alert} from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import {GoogleButton} from "react-google-button"
import { useUserAuth } from '../context/UserAuthContext'
import app from '../firebase'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
const Login = () => {
  
  const [email,setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
    const {login,googleSignIn} = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit= async (e) =>{
     e.preventDefault();
     const auth = getAuth(app);
     signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
        
         // ...
         navigate("/home")
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
       });
    };
    const handleGoogleSignIn = async(e)=> {
   e.preventDefault();
   try {
     await googleSignIn();
     navigate("/home")
   } catch (err) {
     setError(err.message)
   }
    }
    return (
        <div>
            <h1  className="p-4 box mt-3 text-center">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <div>
  <Button variant="primary" type="submit">
    Login
  </Button>
  </div>
</Form>
<hr/>
<div>
    <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn}/>
</div>
<div className="p-4 box mt-3 text-center">
    Don't have a account? <Link to="/signup">Sign up</Link>
</div>
        </div>
       
    )
}

export default Login
