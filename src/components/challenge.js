import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../style/challenge.css';
import {db,firebaseApp, firebase} from "../firebase.js"
import Menubar from './menu2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


function Challenge(props){

    var size = 1450;
    var zoom = window.innerWidth / size 
    document.body.style.zoom = zoom;

    console.log(props.location.state.group);
    var groupname = props.location.state.group;
    
    const [mileage, setMileage] = useState(0);
    const [mileage1, setMileage1] = useState();

    useEffect(()=>{
        var docRef = db.collection("Groups").doc(groupname)
               
        // Get a document, forcing the SDK to fetch from the offline cache.
        docRef.get().then((doc) => {
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.
            setMileage(doc.data().mileage);
            setMileage1(doc.data().mileage - 5000)
            console.log("Cached document data:", doc.data().mileage);
        }).catch((error) => {
            console.log("Error getting cached document:", error);
        });
    })
    function numberWithCommas(x) {
        return (x+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var mileagecomma=numberWithCommas(mileage);
    

    const [Bet, setBet] = useState()
    const [Rgroup, setRgroup] = useState("")
    const [Contents, setContents] = useState("")

    const sendClick = () => {

        if (mileage1 < 0){
            alert("Your mileage is lack!!")
            //props.history.go(1);
            return;
        }
    }
    const onBetHandler = (event) => {
        setBet(event.target.value)// event를 발생 시킬 수 있도록 함 --> input을 발생시킬 수 있도록 한 것임
        console.log(Bet);
    }
    const onRgroupHandler = (event) => {
        setRgroup(event.currentTarget.value)// event를 발생 시킬 수 있도록 함 --> input을 발생시킬 수 있도록 한 것임
        console.log(Rgroup);
    }
    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value)// event를 발생 시킬 수 있도록 함 --> input을 발생시킬 수 있도록 한 것임
        console.log(Contents);
    }
    
    function reset_btt(e){
        e.preventDefault();
        console.log(Bet);
        setBet("");
        document.getElementById("bettinginput").focus();
    }

    const top100Films = [
        { title: 'BADMINTON LOVERS'},
        { title: 'I LIKE BADMINTON'},
        { title: 'CHUNGNAM BADMINTON'},
        { title: '2018 BADMINTON'},       
      ];
    
    return(
        
        <div className="App-header">
            <header className="header">
            <div className="team-name">{groupname}</div>
            <div className="mileage"> {mileagecomma} </div>
            <div className="m">mileage</div>
            <Link to={{pathname :'./mileage', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="M1">MILEAGE</button></Link>
        <Link to={{pathname :'./challenge', state : {group: props.location.state.group, user:props.location.state.user}}}><button class ="M2">CHALLENGE</button></Link>
        <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="M3">MANAGEMENT</button> </Link>
            
            <div className="warning"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each challenge is 5000 mileages. And if your opponent reject your challenge, you can get it again!</div>
            <div className="available">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mileage available for betting </div>
            <div className="avail_num">{numberWithCommas(mileage1)} M</div>
            <div className="avail_line"></div>
            <div className="circle"></div>
            <div className="w">!</div>
            
            <div className="betting">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Betting mileage</div>
            <div className="circle2"></div>
            <div className="content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Challenge</div>
            <div className="circle3"></div>
            <button className="reset" onClick={(e)=>reset_btt(e)}>RESET</button>
            <input type="text" id="bettinginput" value = {Bet} onChange={onBetHandler} placeholder = "0"/>
            <div className="receiving">Receiving Group</div>
            {/* <Autocomplete className="bettinginput2"
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                onChange={(_, newValue) => setRgroup(newValue)}

                style={{ width: 375}}
                value = {Rgroup}
                // onChange={onRgroupHandler}
                renderInput={(params) => <TextField {...params} label="Choose group"  />}
            /> */}

            <Autocomplete
                className="bettinginput2"
                id="free-solo-demo"
                freeSolo
                //disableClearable
                onChange={(_, newValue) => setRgroup(newValue)}
                style={{ width: 375}}
                value = {Rgroup}
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                <TextField {...params} label="Choose group" InputProps={{ ...params.InputProps, endAdornment : null }} />
                )}
            />
            {/* <input type="text" id="bettinginput2" value = {Rgroup} onChange={onRgroupHandler}/> */}
            <div className="contents_challenge">Contents</div>
            <textarea type="text" id="bettinginput3" value = {Contents} onChange={onContentsHandler}></textarea>
            <Link to={{pathname :'./check', state : {rgroup:Rgroup, group: groupname,bet: Bet, contents : Contents, mileage : mileage, user:props.location.state.user}}}><button className="send" onClick = {sendClick}>SEND</button> </Link>
            <Menubar group={props.location.state.group} user={props.location.state.user}/>
            </header>     
        </div>
    );
    
}

export default Challenge;