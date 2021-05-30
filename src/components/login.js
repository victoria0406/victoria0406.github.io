import React, {useState} from 'react';
import '../style/logingroup.css';
import {Link, Route, BrowserRouter} from "react-router-dom";
import {db, firebaseApp, firebase} from '../firebase';
import man from '../man_run.png';
import woman from '../woman_run.png';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

  
const Login = () => {
    var size = 1900;
    var zoom = window.innerWidth / size 

    document.body.style.zoom = zoom;

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const [uid, setUid] = useState(null);
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

    const onEmailChange = (evt) => {
        setEmail(evt.target.value);
    }
        
    const onPwChange = (evt) => {
        setPw(evt.target.value);
        
    }
    const signin = ()=>{
        firebaseApp.auth().signInWithEmailAndPassword(email, values.password)
        .then((user) => {
        const uid = (firebaseApp.auth().currentUser || {}).uid
        window.location.href ='/group/'+uid;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        setError(errorMessage);
        });
    }
      
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      function handleKeyPress(e){
        if (e.key === 'Enter') {
          console.log('Enter pressed')
            document.getElementById("signin").click();
        }
      }
  
  return(
    <div>
        <div id="skew"></div>
        <div id="back">
            <div id="workout">WORK OUT TOGETHER</div>
            <div class="box">
                <div class="box1">
                <input id="id" type="text" onChange={onEmailChange} value={email}/>
                </div>
            </div>
            <div class="letID">ID:</div>
            <div class="box">
                <div class="box2">
                <div>
                <Input
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    style={{fontsize:"100px", letterSpacing:"5px", border:"0"}}
                    onKeyPress={handleKeyPress}
                    endAdornment={
                    <InputAdornment position="end">
                        
                    </InputAdornment>
                    }
                />
                </div>
                </div>
            </div>
            <div class="letPW">PW:</div>
            <div id ="signin" onClick ={signin} >Signin</div>
        </div>
        <img src={man} style={{position:'absolute', left:"1%" ,maxHeight:"900px"}}/>
        <img src={woman} style={{position:'absolute', left:"10%" ,maxHeight:"920px"}}/>
        
    </div>
);

};
  
export default Login;