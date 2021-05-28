import React, {useState,useEffect} from 'react';
import '../style/openDiary.css';
import ReactDOM, {render} from 'react-dom';
import jQuery from "jquery";
import {db, firebaseApp, firebase} from '../firebase';
import Menubar from './menu';

var getid = 1;
var currentid = 10001;
var countid1 = 0;
var countid2 = 0;
var countid3 = 0;
var countid4 = 0;
var countid5 = 0;
var date;
var title;
var tag=[];


function OpenDiary(props){
    const name= props.location.state.group;
    const id = props.match.params.id;
    const [load, setLoad] = useState(false);
    console.log(name,id);
    function read(){
        db.collection("Groups").doc(name).collection("Diary").doc(id).get()
        .then(function(doc){
            if (doc.exists){
                title = doc.data()["Title"];
                date = doc.data()["Date"];
                tag = doc.data()["Tag"]
                for (var i = 0; i < doc.data().icon1_locate.length; i++){
                    icon1(doc.data().icon1_input[i], doc.data().icon1_text, doc.data().icon1_img, parseInt(doc.data().icon1_locate[i]["x"])-150, doc.data().icon1_locate[i]["y"]);
                }
                for (var i = 0; i < doc.data().icon2_input.length; i++){
                    icon2(doc.data().icon2_input[i],parseInt(doc.data().icon2_locate[i]["x"])-150, doc.data().icon2_locate[i]["y"]);
                }
                for (var i = 0; i < doc.data().icon3_input.length; i++){
                    icon3(doc.data().icon3_input[i]["first"], doc.data().icon3_input[i]["second"], parseInt(doc.data().icon3_locate[i]["x"])-150, doc.data().icon3_locate[i]["y"]);
                }
                for (var i = 0; i < doc.data().icon4_input.length; i++){
                    icon4(doc.data().icon4_input[i], parseInt(doc.data().icon4_locate[i]["x"])-150, doc.data().icon4_locate[i]["y"])
                }
                for (var i = 0; i < doc.data().icon5_input.length; i++){
                    icon5(doc.data().icon5_input[i], parseInt(doc.data().icon5_locate[i]["x"])-150, doc.data().icon5_locate[i]["y"])
                }
                
            }
        })
    }
    useEffect(()=>{
        function some_info(){
            read();
            db.collection("Groups").doc(name).collection("Diary").doc(id).get()
            .then(function(doc){
                if (doc.exists){
                    title = doc.data()["Title"];
                    date = doc.data()["Date"];
                    tag = doc.data()["Tag"];
                }
                setLoad(true);
            })
        }
        some_info();
    },[])
    if(!load){
        return(
            <div>
                <div class = "themediary">Diary</div>
                <div class = "diarybone">
                    <div class = "diarytitle" id = "diarytitle">Title</div>
                    <div class = "writtenin">Written in</div><div class = "diarydate" id = "diarydate"> Date </div>
                    <div class = "boneline"></div>
                    <div class = "getcomponents">
                        <div id = "component1"></div>
                        <div id = "10001"></div>
                        <div id = "10002"></div>
                        <div id = "10003"></div>
                        <div id = "10004"></div>
                        <div id = "10005"></div>
                        <div id = "10006"></div>
                        <div id = "10007"></div>
                        <div id = "10008"></div>
                        <div id = "10009"></div>
                        <div id = "10010"></div>
                        <div id = "10011"></div>
                        <div id = "10012"></div>
                        <div id = "10013"></div>
                        <div id = "10014"></div>
                        <div id = "10015"></div>
                        <div id = "10016"></div>
                        <div id = "10017"></div>
                        <div id = "10018"></div>
                        <div id = "10019"></div>
                        <div id = "10020"></div>
                        <div id = "10021"></div>
                        <div id = "10022"></div>
                        <div id = "10023"></div>
                        <div id = "10024"></div>
                        <div id = "10025"></div>
                        <div id = "10026"></div>
                        <div id = "10027"></div>
                        <div id = "10028"></div>
                        <div id = "10029"></div>
                        <div id = "10030"></div>
                        <div id = "10031"></div>
                        <div id = "10032"></div>
                        <div id = "10033"></div>
                        <div id = "10034"></div>
                        <div id = "10035"></div>
                        <div id = "10036"></div>
                        <div id = "10037"></div>
                        <div id = "10038"></div>
                        <div id = "10039"></div>
                    </div>
                </div>
                <Menubar group={props.location.state.group} user={props.location.state.user}/>
            </div>
        )}

        return(
            <div>
                <div class = "themediary">Diary</div>
                <div class = "diarybone">
                    <div class = "diarytitle" id = "diarytitle">{title}</div>
                    <div class = "writtenin">Written in</div><div class = "diarydate" id = "diarydate"> {date.year}.{date.month}.{date.day} </div>
                    <div class = "boneline"></div>
                    <div class = "getcomponents">
                        <div id = "component1"></div>
                        <div id = "10001"></div>
                        <div id = "10002"></div>
                        <div id = "10003"></div>
                        <div id = "10004"></div>
                        <div id = "10005"></div>
                        <div id = "10006"></div>
                        <div id = "10007"></div>
                        <div id = "10008"></div>
                        <div id = "10009"></div>
                        <div id = "10010"></div>
                        <div id = "10011"></div>
                        <div id = "10012"></div>
                        <div id = "10013"></div>
                        <div id = "10014"></div>
                        <div id = "10015"></div>
                        <div id = "10016"></div>
                        <div id = "10017"></div>
                        <div id = "10018"></div>
                        <div id = "10019"></div>
                        <div id = "10020"></div>
                        <div id = "10021"></div>
                        <div id = "10022"></div>
                        <div id = "10023"></div>
                        <div id = "10024"></div>
                        <div id = "10025"></div>
                        <div id = "10026"></div>
                        <div id = "10027"></div>
                        <div id = "10028"></div>
                        <div id = "10029"></div>
                        <div id = "10030"></div>
                        <div id = "10031"></div>
                        <div id = "10032"></div>
                        <div id = "10033"></div>
                        <div id = "10034"></div>
                        <div id = "10035"></div>
                        <div id = "10036"></div>
                        <div id = "10037"></div>
                        <div id = "10038"></div>
                        <div id = "10039"></div>
                    </div>
                </div>
                <Menubar group={props.location.state.group} user={props.location.state.user}/>
            </div>
        )
    }
    


    function icon1(icon1lst, text, url, x, y){
        const comp = (
            <div id = "stop" >
                <div class = "scoresheet" style = {{left: x, top: y}}>
                    <div class = "putimg" id = "putimg">
                        <img src = {url} alt = "firebase-image" class = "image1"/>
                    </div>
                    <table class = "set_comp" >
                        <tr>
                            <th class = "gamescore">Game score</th>
                        </tr>
                        <tr>
                            <td class = "setnum">set1</td><td class = "num_comp">{icon1lst[0]}</td><td width = "8px;" text-align = "center;">:</td><td class = "num_comp">{icon1lst[1]}</td>
                        </tr>
                        <tr>
                            <td class = "setnum">set2</td><td class = "num_comp">{icon1lst[2]}</td><td>:</td><td class = "num_comp">{icon1lst[3]}</td>
                        </tr>
                        <tr>
                            <td class = "setnum">set3</td><td class = "num_comp">{icon1lst[4]}</td><td>:</td><td class = "num_comp">{icon1lst[5]}</td>
                        </tr>
                        <tr>
                            <td class = "setnum">set4</td><td class = "num_comp">{icon1lst[6]}</td><td>:</td><td class = "num_comp">{icon1lst[7]}</td>
                        </tr>
                        <tr>
                            <td class = "setnum">set5</td><td class = "num_comp">{icon1lst[8]}</td><td>:</td><td class = "num_comp">{icon1lst[9]}</td>
                        </tr>
                    </table>
                    <div class = "analysis">
                        <div class = "analysis_text">{text}</div>
                    </div>
                </div>
            </div>
        );
        
        ReactDOM.render(comp, document.getElementById('component1'));
        console.log(document.getElementById('stop').style.left)
    }
    function icon2(text, x, y){
        const comp = (
            <div class = "textboxes" style = {{left: x, top: y}}>{text}</div>
        )
        ReactDOM.render(comp, document.getElementById(currentid++));
    }
    function icon3(text1, text2, x, y){
        const comp = (    
            <div>
                <div class = "textboxes2" style = {{left: x, top: y}}>
                    <div>&nbsp;&nbsp;Active skills</div>
                    <div class = "textboxes2-1" >{text1}</div>
                    <br></br><br></br><br></br><br></br>
                    <div>&nbsp;&nbsp;Points to supplement</div>
                    <div class = "textboxes2-2" >{text2}</div>
                </div>
            </div>
        );
        ReactDOM.render(comp, document.getElementById(currentid++));
    }
    function icon4(text, x, y){
        const comp = (
            <div class = "textboxes3" style = {{left: x, top: y}}>{text}</div>
        )
        ReactDOM.render(comp, document.getElementById(currentid++));
    }
    function icon5(url, x, y){
        const comp = (
            <img src = {url} alt = "firebase-image" class = "imgonly" style = {{left: x, top: y}}/>
        )
        ReactDOM.render(comp, document.getElementById(currentid++));
    }
    
    
    export default OpenDiary;