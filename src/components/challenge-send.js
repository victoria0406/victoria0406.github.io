
import React,{useState,useEffect} from 'react';
import imgfile from '../circle.jpg';
import { Link } from 'react-router-dom';
import {db,firebaseApp, firebase} from "../firebase.js"
import Menubar from './menu2';
import '../style/send.css';


function Challenge(props) {
//groupname : groupname, mileage : mileage
//state : {groupname : groupname, mileage : mileage}
var groupname = props.location.state.group;
var mileage = props.location.state.mileage;

function numberWithCommas(x) {
  return (x+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  console.log([groupname,mileage])

  
  // async function getch(){
  //   var groups=[];
  //   var challenges=[];
  //   var state=[];
  //   var mileages=[];
  //   await db.collection("Groups").get().then((querySnapshot)=>{
  //       querySnapshot.forEach((doc)=>{
  //           groups.push(doc.id);
  //           challenges.push([doc.data().challenge]);
  //           mileages.push([doc.data().mileage]);
  //       });
  //   });
  //   var mychallenge=[];
  //   var mymileage=0;
  //   for (var i=0;i<groups.length;i++){
  //       if(groups[i]==groupname) {
  //           mymileage=mileages[i];
  //       }
  //   }
    
  //   return mymileage;
  // }

  //   const [mymileage,setMileages]=useState([]);
  //   useEffect(()=>{
  //       async function fetchAndSetUser(){
  //           const data=await getch();
  //           await setMileages(data);
  //       } 
  //       fetchAndSetUser();
  //   })

  return (
    <div className="App-header">
      <header className="header">
      <div className="team-name"> {groupname} </div>
      <div className="mileage"> {numberWithCommas(mileage)} </div>
      <div className="m">mileage</div>
      <Link to={{pathname :'./mileage', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="m1">MILEAGE</button></Link>
        <Link to={{pathname :'./challenge', state : {group: props.location.state.group, user:props.location.state.user}}}><button class ="m2">CHALLENGE</button></Link>
        <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="m3">MANAGEMENT</button> </Link>
      <div className="Sent">Sent Successfully!</div>
      <img className="Circle" src={imgfile} />
      <Menubar group={props.location.state.group} user={props.location.state.user}/>
      </header>     
    </div>
  );
}

export default Challenge;