  
import React from 'react';
import imgfile from '../lose.png';
import '../style/win.css';
import { Link } from 'react-router-dom';
import Menubar from './menu2';

function lose(props){
    return(
    <div className="App-header">
        <header className="header">
        <div className="team-name"> {props.location.state.group} </div>
        <div className="back"></div>
        <img className="con2" src={imgfile} />
        <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="OK">OK!</button> </Link>
        <Menubar group={props.location.state.group} user={props.location.state.user}/>
        </header>     
    </div>
    );
}

export default lose;