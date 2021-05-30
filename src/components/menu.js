import React, {Component}from 'react';
import '../style/menu.css';
import {Link} from 'react-router-dom';
import menu_img from '../menubar.png';
import x_img from '../letter-x.png';

function Menubar(props){
        var mygroup=props.group;
        var user=props.user;
        console.log([mygroup,user]);

        function menuon(){
            console.log("menuon");
            document.getElementById('bar').style.left='0px';
            document.getElementById('fake_bar').style.left='-5%';
        }
        function menuout(){
            document.getElementById('bar').style.left= '-15%';
            document.getElementById('fake_bar').style.left='0px';
        }
        return(
            <div>
                <div id= "fake_bar" onClick={()=>menuon()}><img src={menu_img} style={{position:"fixed", top:"0.8%",left:"0.05%",height:"85px"}}/></div>
                <div id = "bar" style={{opacity: "90%",position:"fixed",top:"0px",left:"-15%", height: "100%", width: "11%",  background: "#5BE7C4", display: "block"}}>
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

export default Menubar;