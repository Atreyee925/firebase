import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuthContext'
import { addTodo,deleteTodo,removeTodo } from '../action/act'
import {useDispatch,useSelector} from "react-redux";
const Home = () => {
    const {user,logOut} =useUserAuth();
    console.log(user);
    const handleLogOut =async () =>{
        try {
          await logOut();
        } catch (err) {
          console.log(err.message);  
        }
    }
    const[inputData,setInputData]=useState("")
    const dispatch=useDispatch();
    const list=useSelector((state)=>state.todoReducer.list);
    return (
        <div>
          <div className="main-div">
          <div className="child-div">
          <figure>
            <figcaption Add your List here></figcaption>
          </figure>
          <div>
          <input type="text" placeholder="Add items.."value={inputData} onChange={(event)=> setInputData(event.target.value)}></input>
          <i class="far fa-plus-square" onClick={()=>dispatch(addTodo(inputData),setInputData(''))}></i>
          </div>
          <div className="showItem">
            {
              list.map((ele)=>{
                return(
                  <div className="eachItem" key={ele.id}>
                <h3>{ele.data} <i class="far fa-plus-square" onClick={()=>dispatch(deleteTodo(ele.id))}></i></h3>
                
               </div>
                )
                
              })
            }
           
          </div>
          <div className="showItems">
           <button className="btn effect04" onClick={()=> dispatch(removeTodo())}>check List</button>
          </div>
          </div>
          </div>
           <div className="p-4 box mt-3 text-center"> Hello Welcome <br/>
           {user && user.email}
           </div> 
           <div className="d grid gap-2"></div>
           <Button variant="primary" onClick={handleLogOut}> Log Out</Button>
        </div>
    )
}

export default Home
