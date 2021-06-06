import React from 'react';
import imgfile from '../congratulations.png';
import '../style/win.css';
import { Link } from 'react-router-dom';
import Menubar from './menu2';

function win(props){
    return(
    <div className="App-header">
        <header className="header">
        <div className="team-name"> HELLO BADMINTON </div>
        <div className="back"></div>
        <img className="con" src={imgfile} />
        <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="Get">GET MILEAGE!</button> </Link>
        <Menubar group={props.location.state.group} user={props.location.state.user}/>
        </header>     
    </div>
    );
}

export default win;