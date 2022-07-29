import React, { useState, useEffect } from 'react';

import './App.css';
import Post from './Post';
import { auth, db } from "./firebase";
import { Button,Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%,-${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',


    width: 300,
    bgcolor: 'theme.palette.background.paper',
    background: 'white',

    border: '2px solid #000',
    boxShadow: theme.spacing(5),
    padding: theme.spacing(2, 4, 3),
  }
}));
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignin,setOpenSignin]=useState(false)
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
         //user has logged in....
         console.log(authUser);
         setUser(authUser);
        
      }else{
        //user has logged out...
        setUser(null);
      }
    })
    return()=>{
      //perform some cleanup
      unsubscribe();
    }
  },[user,username]);



  useEffect(() => {
    db.collection("post").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  const Signup=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message));
    setOpen(false);

  }
  const signin=(event)=>{
    event.preventDefault();
    auth  
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignin(false)
  }


  return (
    <div className="app">
     
      <Modal
        open={open}
        onClose={() => setOpen(false)}>

        <div style={modalStyle} className={classes.paper}>
          <form>
          <center>
            <img
              className='app__headerImage'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3fVFpe2OaMdzvjkkj6wE4gFfJTAdWNkJSQ&usqp=CAU"

              alt="insta logo"
            />
            <Input
              placeholder="username"
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <Input
              placeholder="email"
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="password"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               />
               </center>
               <center>
              <Button onClick={Signup} >Signup</Button>
              </center>

         
          </form>
        </div>
       {/* model for login */}
      </Modal>
      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}>

        <div style={modalStyle} className={classes.paper}>
          <form>
          <center>
            <img
              className='app__headerImage'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3fVFpe2OaMdzvjkkj6wE4gFfJTAdWNkJSQ&usqp=CAU"

              alt="insta logo"
            />
            
            <Input
              placeholder="email"
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="password"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               />
               </center>
               <center>
              <Button onClick={signin} >Sign in</Button>
              </center>

         
          </form>
        </div>

      </Modal>

      <div className='app__header'>
        <img
          className='app__headerImage'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3fVFpe2OaMdzvjkkj6wE4gFfJTAdWNkJSQ&usqp=CAU"

          alt="insta logo"
        />
         {user ? (
      <Button  onClick={() =>auth.signOut()}>Logout</Button>
      ):(
        <div className='container'>
          <Button  onClick={() => setOpenSignin(true)}>Sign in</Button>
        <Button  onClick={() => setOpen(true)}>Sign up</Button>
        </div>

      )}
      </div>
     
      

      {

        post.map(({ id, post }) => (
          <Post key={id} postId={id} username={post.username} caption={post.caption} img={post.img} />
        ))
      }
       {user?.displayName?(
      <ImageUpload username={user.displayName}/>
      ):(
        <h3>sorry you need to login again to upload</h3>
    )}


    </div>
  );
}

export default App;
