import React from 'react'
import { Button } from '@material-ui/core'
import { useState } from 'react'
import { db, storage } from './firebase'
import firebase from 'firebase/compat/app';
import './ImageUpload.css'

const ImageUpload = ({username}) => {
   
    const[img,setImg]=useState(null);
    const[progress,setProgress]=useState(0);
    const[caption,setCaption]=useState("");
        

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImg(e.target.files[0]);
        }
    };
    // const handleUpload=()=>{
    //     const uploadTask=storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot)=>{
    //             //proges_funct
    //             const progress=Math.round(
    //                 (snapshot.bytesTransferred/snapshot.totalBytes)*100
    //             );
    //             setProgress(progress);
    //         },(error)=>{
    //             console.log(error);
    //             alert(error.message);
    //         },
    //         ()=>{
    //             storage
    //             .ref("images")
    //             .child(image.name)
    //             .getDownloadURL()
    //             .then((url)=>{
    //                 db.collection("post").add({
    //                     timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    //                     caption:caption,
    //                     imgUrl:url,
    //                     username:username,
    //                 });
    const handleUpload = () => {

        
        const uploadTask = storage.ref(`img/${img.name}`).put(img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
          () => {
            storage
              .ref("img")
              .child(img.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("post").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  img: url,
                  username: username,
                });
                    setProgress(0);
                    setCaption("");
                    setImg(null);
                });
            }
        );
    };

  return (
    <div className='imageUpload'>
        <progress className='imageUpload__progress' value={progress} max="100"/>
        <input type='text' placeholder='Enter the caption..' onChange={(event)=>setCaption(event.target.value)}  value={caption}/>
        <input type='file' onClick={handleChange}/>
        <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
