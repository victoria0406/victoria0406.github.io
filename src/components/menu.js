import React, {Component}from 'react';
import '../style/menu.css';
import {Link} from 'react-router-dom';
import menu_img from '../menu.png';
import x_img from '../letter-x.png';

//링크 대충 시켜놨는데 저 밑에 줄없애주면 좋을 것 같다...


/*class Menubar extends React.Component{
    render(){
        return(
            <div>
                <div id="bar">
                    <div style={{ width:"200%", height:"50px", position:"absolute", top:'5%'}} onMouseOver={()=>{mouseon("m_main")}} onMouseOut={()=>{mouseout("m_main")}}>main</div>
                    <div style={{ width:"200%",height:"100px",position:"absolute",top:'20%'}} onMouseOver={()=>{mouseon("m_diary")}} onMouseOut={()=>{mouseout("m_diary")}}>diary</div>
                    <div style={{ width:"200%",height:"150px",position:"absolute",top:'35%'}} onMouseOver={()=>{mouseon("m_mileage")}} onMouseOut={()=>{mouseout("m_mileage")}}>mileage</div>
                    <div style={{ width:"200%",height:"100px",position:"absolute",top:'50%'}} onMouseOver={()=>{mouseon("m_logout")}} onMouseOut={()=>{mouseout("m_logout")}}>logout</div>
                </div>
                <div className="overlay" id="m_main" style={{top:'5%', display:"none"}} onMouseOver={()=>{mouseon("m_main")}} onMouseOut={()=>{mouseout("m_main")}}>
                    <div class = "list">Main</div>
                </div>
                <div className="overlay" id="m_diary"style={{top:'20%', display:"none"}} onMouseOver={()=>{mouseon("m_diary")}} onMouseOut={()=>{mouseout("m_diary")}}>
                    <div class = "list">New Posting</div>
                    <div class = "list">Diary</div>
                </div>
                <div className="overlay" id="m_mileage" style={{top:'35%', display:"none"}} onMouseOver={()=>{mouseon("m_mileage")}} onMouseOut={()=>{mouseout("m_mileage")}}>
                    <div class = "list">Mileage</div>
                    <div class = "list">Challenge</div>
                    <div class = "list">Management</div>
                </div>
                <div className="overlay" id="m_logout" style={{top:'50%', display:"none"}} onMouseOver={()=>{mouseon("m_logout")}} onMouseOut={()=>{mouseout("m_logout")}}>
                    <div class = "list">Logout</div>
                    <div class = "list">Other Groups</div>
                </div>
            </div>
        )
    }
}*/

function Menubar(props){
        var mygroup=props.group;
        var user=props.user;
        console.log([mygroup,user]);
        return(
            <div>
                <div id= "fake_bar" onClick={()=>menuon()}><img src={menu_img} style={{position:"fixed", top:"49%",height:"40px"}}/></div>
                <div id = "bar">
                    <div id="menubar">Menu<img src = {x_img} onClick={()=>menuout()} style={{position:'absolute', right:"20px", top:"20px", height:"20px"}}/></div>
                    
                    <div className="list_m">MAIN
                        <div className="drop_down">
                        <Link to={{pathname :'/main', state : {group: mygroup, user:user}}}><div className="list_sub">Main</div></Link>
                        </div>
                    </div>
                    <div className="list_m"><div>DIARY</div>
                        <div className="drop_down">
                            <Link to={{pathname :'/component', state : {group: mygroup, user:user}}}><div className="list_sub">New Posting</div></Link>
                            <Link to={{pathname :"/diary/&", state : {group: mygroup, user:user}}}><div className="list_sub">Diary</div></Link>
                        </div>
                    </div>
                    <div className="list_m">MILEAGE
                        <div className="drop_down">
                        <Link to={{pathname :'/mileage', state : {group: mygroup, user:user}}}><div className="list_sub">Mileage</div></Link>
                        <Link to={{pathname :"/challenge", state : {group: mygroup, user:user}}}><div className="list_sub">Challenge</div></Link>
                        <Link to={{pathname :"/management", state : {group: mygroup, user:user}}}><div className="list_sub">Management</div></Link>
                        </div>
                    </div>
                    <div className="list_m">LOGOUT
                    <div className="drop_down">
                        <Link to={{pathname :"/", state : {group: mygroup, user:user}}}><div className="list_sub">Logout</div></Link>
                        <Link to={{pathname :"/group/"+user, state : {group: mygroup, user:user}}}><div className="list_sub">Change Group</div></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )
}

function menuon(){
    //document.getElementById('bar').style.left='0px';
    document.getElementById('fake_bar').style.left='-2%';
}
function menuout(){
    document.getElementById('bar').style.left= '-200px';
    document.getElementById('fake_bar').style.left='0px';
}

export default Menubar;