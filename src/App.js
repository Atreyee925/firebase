import './App.css';
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./component/protectedroute"
import {Container,Row,Col} from "react-bootstrap";
import Login from './component/login';
import Signup from './component/signup';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './component/home';


function App() {
  return (
   
      <Container>
        <Row>
         <Col>
         <UserAuthContextProvider>
          <Routes>
          <Route path="/" element={<Login></Login>}></Route>
           <Route path="/signup" element={<Signup></Signup>}></Route>
           <Route path="/home" element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          </Routes>
          </UserAuthContextProvider>
          </Col>
         </Row>
        </Container>
    
  );
}

export default App;
