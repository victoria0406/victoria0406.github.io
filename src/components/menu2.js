import React, {Component}from 'react';
import '../style/menu2.css';
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
                <div id= "fake_bar" onClick={()=>menuon()}><img src={menu_img} style={{position:"fixed", top:"0.8%",left:"0.3%",height:"60px"}}/></div>
                <div id = "bar" style={{opacity: "90%",position:"fixed",top:"0px",left:"-15%", height: "100%", width: "11%",  background: "#5BE7C4", display: "block"}}>
                    <div id="menubar2">Menu<img src = {x_img} onClick={()=>menuout()} style={{position:'absolute', right:"20px", top:"14px", height:"15px"}}/></div>
                    
                    <div className="list_m2">MAIN
                        <div className="drop_down">
                        <Link to={{pathname :'/main', state : {group: mygroup, user:user}}}><div className="list_sub2">Main</div></Link>
                        </div>
                    </div>
                    <div className="list_m2"><div>DIARY</div>
                        <div className="drop_down">
                            <Link to={{pathname :'/component', state : {group: mygroup, user:user}}}><div className="list_sub2">New Posting</div></Link>
                            <Link to={{pathname :"/diary/&", state : {group: mygroup, user:user}}}><div className="list_sub2">Diary</div></Link>
                        </div>
                    </div>
                    <div className="list_m2">MILEAGE
                        <div className="drop_down">
                        <Link to={{pathname :'/mileage', state : {group: mygroup, user:user}}}><div className="list_sub2">Mileage</div></Link>
                        <Link to={{pathname :"/challenge", state : {group: mygroup, user:user}}}><div className="list_sub2">Challenge</div></Link>
                        <Link to={{pathname :"/management", state : {group: mygroup, user:user}}}><div className="list_sub2">Management</div></Link>
                        </div>
                    </div>
                    <div className="list_m2">LOGOUT
                    <div className="drop_down">
                        <Link to={{pathname :"/", state : {group: mygroup, user:user}}}><div className="list_sub2">Logout</div></Link>
                        <Link to={{pathname :"/group/"+user, state : {group: mygroup, user:user}}}><div className="list_sub2">Change Group</div></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )
}

export default Menubar;