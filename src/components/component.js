import React, {useState, useEffect} from 'react';
import '../style/component.css';
import ReactDOM, {render} from 'react-dom';
import jQuery from "jquery";
import {storage, db, firebaseApp, firebase} from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar_img from "../calendar.png";
import Menubar from './menu';
import { createBrowserHistory } from 'history'; 
import small_img from '../small.png';
import big_img from '../big.png';
import feedback_img from '../feedback.png';
import battle_img from '../battle.png';
import img_img from '../img.png';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



window.$ = window.jQuery = jQuery;  


var count_id1 = 101; // firebase
var count_id2 = 201; // firebase
var count_id3 = 301;
var count_id4 = 401;
var count_id5 = 501;
var count_id = 10001;

var isEmpty = 0;
var x;
var y;
var url1;
var i2 = 701;
var i3_1 = 801;
var i3_2 = 10301;
var i5 = 10501;
var i4 = 901;


var icon2_input = [];
var icon2_locate = [];
var icon2_field = [];

var icon1_input = [];
var icon1_locate = [];
var icon1_field = [];
var icon1_text = "";

var icon3_input = [];
var icon3_locate = [];
var icon3_field = [];

var icon4_input = [];
var icon4_locate = [];
var icon4_field = [];

var icon5_input = [];
var icon5_locate = [];
var icon5_field = [];

var icon1_img = "";

var icon1_locsave = [];

function textareaToVar(){
    console.log(icon2_input)
    for(var i = 0; i < icon2_input.length; i++){
        var valueInVar_2 = document.getElementById(icon2_input[i]).value;
        console.log(valueInVar_2);
        icon2_field.push(valueInVar_2);
    }
    for(var i = 0; i < icon4_input.length; i++){
      var valueInVar_4 = document.getElementById(icon4_input[i]).value;
      console.log(valueInVar_4);
      icon4_field.push(valueInVar_4);
  }
    console.log("dkfjsldkfjlsdfkj")
    for(var j = 0; j < icon1_input.length; j++){
      if(j == icon1_input.length - 1){
        var valueInVar_1_2 = document.getElementById(icon1_input[j]).value;
        icon1_text = valueInVar_1_2;
        continue;
      }
        
      var valueInVar_1 = document.getElementById(icon1_input[j]).value;
      console.log(valueInVar_1);
      icon1_field.push(valueInVar_1);
        

    }
    console.log("dkfjsldfkjlsdkfjl")
    for(var k = 0; k < icon3_input.length; k++){
      console.log(icon3_input)
      var valueInVar_3_1 = document.getElementById(icon3_input[k].first).value;
      console.log(valueInVar_3_1);
      var valueInVar_3_2 = document.getElementById(icon3_input[k].second).value;
      console.log(valueInVar_3_2);
      icon3_field.push({first : valueInVar_3_1, second : valueInVar_3_2})
    }
    
    for(var i = 0; i < icon5_input.length; i++){
      icon5_field.push(icon5_input[i][1]);
  }
    
}

const tags = [];

function Component(props){

  const history = createBrowserHistory({forceRefresh: true });;
  console.log(history);
  const name= props.location.state.group;

  const [open, setOpen] = React.useState(false);

  const [mileage, setMileage] = useState(0);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {

      //console.log("dkdkdkdkdk");
      setOpen(false);

  };
  useEffect( () => {

    var docRef1 = db.collection("Groups").doc(name);

    docRef1.get().then((doc) => {
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      setMileage(doc.data().mileage);
      console.log("Cached document data:", doc.data().mileage);
  }).catch((error) => {
      console.log("Error getting cached document:", error);
  });

  },[]);

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState(""); //ok
  const [tag,setTag]=useState(""); //ok
  const [img, setImg] = useState([]); // 여기 통해서 이미지 정보들 넘겨줘요오오

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("");
  
  const[progress, setProgress] = useState(0);
  const handleChange = e => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
          }
  }

  function regtag(){
    tags.push(tag);
    setTag("");
    console.log(tags);
}

  function changing_date(d){
    var s_date = d.split(" ");
    var month;
    if (s_date[1]=='Jab') month=1;
    else if(s_date[1]=='Feb') month=2;
    else if(s_date[1]=='Mar') month=3;
    else if(s_date[1]=='Apr') month=4;
    else if(s_date[1]=='May') month=5;
    else if(s_date[1]=='Jun') month=6;
    else if(s_date[1]=='Jul') month=7;
    else if(s_date[1]=='Aug') month=8;
    else if(s_date[1]=='Sep') month=9;
    else if(s_date[1]=='Oct') month=10;
    else if(s_date[1]=='Nov') month=11;
    else  month=12;
    var convert_date = {year:Number(s_date[3]), month:month, day:Number(s_date[2])}
    return convert_date;
  }

  var icon_loc_2 = [];
  var icon_loc_3 = [];
  var icon_loc_4 = [];
  var icon_loc_5 = [];
  function confirm_func(){
      textareaToVar()
      for(var i=0 ; i < icon2_locate.length ; i++){
          console.log(icon2_locate[i]);
          icon_loc_2.push({x:icon2_locate[i][1][0] , y:icon2_locate[i][1][1]})
      }
      for(var i=0 ; i < icon3_locate.length ; i++){
        console.log(icon3_locate[i]);
        icon_loc_3.push({x:icon3_locate[i][1][0] , y:icon3_locate[i][1][1]})
      }

      for(var i=0 ; i < icon4_locate.length ; i++){
        console.log(icon4_locate[i]);
        icon_loc_4.push({x:icon4_locate[i][1][0] , y:icon4_locate[i][1][1]})
      }
      for(var i=0 ; i < icon5_locate.length ; i++){
        console.log(icon5_locate[i]);
        icon_loc_5.push({x:icon5_locate[i][1][0] , y:icon5_locate[i][1][1]})
      }

      console.log(icon_loc_4);
      console.log(icon4_input.length);
      console.log(icon4_field);
      const ref = db.collection("Groups").doc(name).collection("Diary");
      ref.add({
              "Date": changing_date(date.toString()),
              "Title":title,
              "Tag":tags,
              "Img": url, //어레이로 할껀데 일단 오류 방지를 위해 "" 해둔거임
              "icon2_locate" : icon_loc_2,
              "icon2_input" : icon2_field,
              "icon1_locate" : icon1_locate,
              "icon1_input" : icon1_field,
              "icon3_locate" : icon_loc_3,
              "icon3_input" : icon3_field,
              "icon1_text" : icon1_text,
              "icon2_length" : icon2_input.length,
              "icon3_length" : icon3_input.length,
              "icon4_length" : icon4_input.length,
              "icon4_locate" : icon_loc_4,
              "icon4_input" : icon4_field,
              "icon5_input" : icon5_input,
              "icon5_length" : icon5_input.length,
              "icon5_locate" : icon_loc_5,
              "icon1_img" : icon1_img
              

      }).then(()=>{alert("success!!"); history.push({pathname :'/Diary/&', state : {group: name, user:props.location.state.user}});})

  }

  function cancel_func(){
    alert("Modifications are not reflected"); history.push({pathname :'/Diary/&', state : {group: name, user:props.location.state.user}});}
  
        
        const handleUpload = () => {
          if (image==null) {alert("no image"); return;} 
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progress = Math.round(
                  (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then(url => {
                    setUrl(url);
                  });
                }
                
            )
            
            isEmpty++;
            
        };

        url1 = url;
        return(
        <body>
            <input type = "text" class = "setTitle" placeholder = " Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <div id="date_choice"><img src={calendar_img} style={{height:"50px"}}/><DatePicker selected={date} onChange={date => setDate(date)} /></div>
            
            <div class = "upload">
                <input type="file" class = "file" onChange={handleChange}/>
                <progress value = {progress} max = "100" class = "progress"/>
                <button type="button" class = "upbutton" onClick={handleUpload}>Upload</button>
            </div>
            <input type = "text" class = "setTag" value={tag} onChange={(e)=>{setTag(e.target.value)}}   onKeyPress={e=>{if(e.key=='Enter') regtag()}}/>
            <button class = "Tag" onClick={regtag}>Tag Register</button>
            <div id="reged_tag">{tags.map((t)=><span>#{t} </span>)}</div>
            <div class = "setCal"></div>
            <table class = "components">
                <tr>
                    <td class = "icon" onClick = {() => icon1()}><img src = {battle_img} style={{width:"100px", height:"100px"}}/></td>
                </tr>
                <tr>
                    <td class = "icon" onClick = {() => icon2()}><img src = {small_img} style={{width:"100px", height:"100px"}}/></td>
                </tr>
                <tr>
                    <td class = "icon" onClick = {() => icon3()}><img src = {feedback_img} style={{width:"100px", height:"100px"}}/></td>
                </tr>
                <tr>
                    <td class = "icon" onClick = {() => icon4()}><img src = {big_img} style={{width:"100px", height:"100px"}}/></td>
                </tr>
                <tr>
                    <td class = "icon" onClick = {() => icon5()}><img src = {img_img} style={{width:"100px", height:"100px"}}/></td>
                </tr>
            </table>
            <div class = "Paper">
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
                <div class = "bone"></div>
            </div>
            
            
            <button class = "confirm" onClick = {confirm_func}>Confirm</button>
            <button class = "cancel" onClick = {cancel_func}>Cancel</button>
            <Menubar group={props.location.state.group} user={props.location.state.user}/>
        </body>
    )
    
}



//----------------------------------------------img upload-------------------------------------------------

function Uploading(){
    if(!isEmpty){
        alert("No Image Upload first");
    }
    else{
        const url_1 = url1;
        icon1_img = url_1;
        const comp = (
            <img src = {url1} alt = "firebase-image" class = "image1"/>
            );
        ReactDOM.render(comp, document.getElementById('putimg'));

    }

}

//-----------------------------------------------icon1-----------------------------------------------------

function icon1(){
    const comp = (
        <div id = "stop">
            <div class = "draggable" id = {count_id1}>D R A G</div>
            <div class = "delete1" id = "delete1" onClick = {()=>delete1()}>x</div>
            <div class = "scoresheet">
                <div class = "putimg" id = "putimg">
                    <div class = "addimg" onClick = {()=>Uploading()} >+</div>
                </div>
                <table class = "set" >
                    <tr>
                        <th class = "gamescore">Game score</th>
                    </tr>
                    <tr>
                        <td class = "setnum">set1</td><td><input class = "num" type = "text" id = {count_id1+1}></input></td><td width = "8px;" text-align = "center;">:</td><td><input class = "num" type = "text" id = {count_id1 + 2}></input></td>
                    </tr>
                    <tr>
                        <td class = "setnum">set2</td><td><input class = "num" type = "text" id = {count_id1 + 3}></input></td><td>:</td><td><input class = "num" type = "text" id = {count_id1 + 4}></input></td>
                    </tr>
                    <tr>
                        <td class = "setnum">set3</td><td><input class = "num" type = "text" id = {count_id1 + 5}></input></td><td>:</td><td><input class = "num" type = "text" id = {count_id1 + 6}></input></td>
                    </tr>
                    <tr>
                        <td class = "setnum">set4</td><td><input class = "num" type = "text" id = {count_id1 + 7}></input></td><td>:</td><td><input class = "num" type = "text" id = {count_id1 + 8}></input></td>
                    </tr>
                    <tr>
                        <td class = "setnum">set5</td><td><input class = "num" type = "text" id = {count_id1 + 9}></input></td><td>:</td><td><input class = "num" type = "text" id = {count_id1 + 10}></input></td>
                    </tr>
                </table>
                <div class = "analysis">
                    <textarea class = "analysis_text" id = {count_id1 + 11}/>
                </div>
            </div>
        </div>
    );

    if (icon1_locsave.length == 1){
      icon1_locate[0] = {"x": x, "y": y};

    for(var i = 1; i < 12 ; i++){
        icon1_input.push(count_id1 + i);
    }
                    
    ReactDOM.render(comp, document.getElementById('component1'));
}

function delete1(){
    const comp = (
        <div></div>
    )
    ReactDOM.render(comp, document.getElementById('component1'));
    icon1_input = [];
    icon1_locate = [];
}

//---------------------------------------------------icon2----------------------------------------------------------//

function delete2(thisid,count_id2){
    console.log(thisid);
    console.log(count_id2)
    ReactDOM.render(<div></div>, document.getElementById(thisid));
    for(let i = 0; i < icon2_input.length; i++) {
      if(icon2_input[i] === count_id2 + 500)  {
        console.log("in here")
        icon2_input.splice(i, 1);
        break;
      }
    }
    console.log(icon2_input);
    
    for(let i = 0; i < icon2_locate.length; i++) {
      if(icon2_locate[i][0] === count_id2)  {
        console.log("in here")
        icon2_locate.splice(i, 1);
        break;
      }
    }
    console.log(icon2_locate);

}
function icon2(){
    icon2_locate.push([count_id2,[0,0]])
    const thisid = count_id;
    const count2 = count_id2;
    const comp = (    
        <div>
            <div class = "draggable2" id = {count_id2} >D R A G</div>
            <div class = "delete2"  onClick = {() => delete2(thisid,count2)}>X</div>
            <textarea class = "textboxes" onfocusout="textareaToVar()"  id = {i2}></textarea>
        </div>
    );
    icon2_input.push(i2);
    count_id2++;
    i2++;
    ReactDOM.render(comp, document.getElementById(count_id++));
}

//--------------------------------------------------icon3------------------------------------------------------------//
function delete3(thisid,count_id3){
  console.log(thisid);
  console.log(count_id3)
  ReactDOM.render(<div></div>, document.getElementById(thisid));
  for(let i = 0; i < icon3_input.length; i++) {
    if(icon3_input[i].first === count_id3 + 500)  {
      console.log("in here")
      icon3_input.splice(i, 1);
      break;
    }
  }
  console.log(icon3_input);
  
  for(let i = 0; i < icon3_locate.length; i++) {
    if(icon3_locate[i][0] === count_id3)  {
      console.log("in here")
      icon3_locate.splice(i, 1);
      break;
    }
  }
  console.log(icon3_locate);

}
function icon3(){
    const thisid = count_id;
    const count3 = count_id3;
    icon3_locate.push([count_id3,[0,0]])
    const comp = (    
        <div>
            <div class = "draggable3" id = {count_id3} >D R A G</div>
            <div class = "delete3"  onClick = {() => delete3(thisid,count3)}>X</div>
            <div class = "textboxes2" style={{position: "absolute",width: "500px",height: "500px", font: "30px", background: "#ffffff", border: "4px solid #50C1E9"}}>
                <div>&nbsp;&nbsp;Active skills</div>
                <textarea class = "textboxes2-1" placeholder = "EX. Return, Drop, Smash ..." id = {i3_1}></textarea>
                <br></br><br></br><br></br><br></br>
                <div>&nbsp;&nbsp;Points to supplement</div>
                <textarea class = "textboxes2-2" placeholder = "EX. Practice using the return technique in the hairpin position" id = {i3_2}></textarea>
            </div>
          </div>
    );
    
    icon3_input.push({first: i3_1, second : i3_2})
    i3_1++;
    i3_2++;
    
    count_id3++;
    ReactDOM.render(comp, document.getElementById(count_id++));
}

//-------------------------------------------------icon4--------------------------------------------------------//
function delete4(thisid,count_id4){
  console.log(thisid);
  console.log(count_id4)
  ReactDOM.render(<div></div>, document.getElementById(thisid));
  for(let i = 0; i < icon4_input.length; i++) {
    if(icon4_input[i]== count_id4 + 500)  {
      console.log("in here")
      icon4_input.splice(i, 1);
      break;
    }
  }
  console.log(icon4_input);
  
  for(let i = 0; i < icon4_locate.length; i++) {
    if(icon4_locate[i][0] === count_id4)  {
      console.log("in here")
      icon4_locate.splice(i, 1);
      break;
    }
  }
  console.log(icon4_locate);

}

function icon4(){
    icon4_locate.push([count_id4,[0,0]])
    const thisid = count_id;
    const count4 = count_id4;
    const comp = (    
        <div>
            <div class = "draggable4" id = {count_id4} >D R A G</div>
            <div class = "delete4"  onClick = {() => delete4(thisid, count4)} >X</div>
            <textarea class = "textboxes3" onfocusout="textareaToVar()"  id = {i4}></textarea>
        </div>
    );
    icon4_input.push(i4);
    i4++;
    count_id4++;
    ReactDOM.render(comp, document.getElementById(count_id++));
}

//-------------------------------------------------icon5------------------------------------------------------//

function Uploading2(i5){
    if(!isEmpty){
        alert("No Image Upload first");
    }
    else{
        const url_5 = url1
        icon5_input.push(url_5);
        const comp = (
            <img src = {url1} alt = "firebase-image" class = "image2"/>
            );
        ReactDOM.render(comp, document.getElementById(i5));
    }

}

function delete5(thisid,count_id5){
  console.log(thisid);
  console.log(count_id5)
  ReactDOM.render(<div></div>, document.getElementById(thisid));
  for(let i = 0; i < icon5_input.length; i++) {
    if(icon5_input[i][0]== count_id5 + 10000)  {
      console.log("in here")
      icon5_input.splice(i, 1);
      break;
    }
  }
  console.log(icon5_input);
  
  for(let i = 0; i < icon5_locate.length; i++) {
    if(icon5_locate[i][0] === count_id5)  {
      console.log("in here")
      icon5_locate.splice(i, 1);
      break;
    }
  }
  console.log(icon5_locate);

}

// function delete5(thisid,count_id5){
//   console.log(thisid);
//   console.log(count_id5)
//   ReactDOM.render(<div></div>, document.getElementById(thisid));
//   for(let i = 0; i < icon5_input.length; i++) {
//     if(icon5_input[i][0]== count_id5 + 10000)  {
//       console.log("in here")
//       icon5_input.splice(i, 1);
//       break;
//     }
//   }
//   console.log(icon5_input);
  
//   for(let i = 0; i < icon5_locate.length; i++) {
//     if(icon5_locate[i][0] === count_id5)  {
//       console.log("in here")
//       icon5_locate.splice(i, 1);
//       break;
//     }
//   }
//   console.log(icon5_locate);

// }

function icon5(){
    const thisid = count_id;
    icon5_locate.push([count_id5,[0,0]])
    const id_5 = i5;
    const count5 = count_id5;
    const comp = (    
        <div>
            <div class = "imgonly"></div>
            <div class = "draggable5" id = {count_id5} >D R A G</div>
            <div class = "delete5"  onClick = {() => delete2(thisid)}>X</div>
            <div id = {i5}>
                <div class = "addimg2" onClick = {()=>Uploading2(id_5)}>+</div>
            </div>
        </div>
    );
    //icon2_input.push(i5);
    i5++;
    count_id5++;
    ReactDOM.render(comp, document.getElementById(count_id++));
}

//---------------------------------------------------drag on-----------------------------------------------------//
//---------------------------------------------------icon1--------------------------------------------------------//

let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElem = event.target.closest('.draggable');

  if (!dragElem) return;

  const getid = dragElem.id;

  let dragElement = jQuery("#" + getid).parents("div")[0]

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function startDrag(element, clientX, clientY) {
    
    if(isDragging) {
      return;
    }
    
    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;


    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';
    
    x = dragElement.style.left;
    y = dragElement.style.top;

    console.log(getid, x, y);
    icon1_locate[0] = {"x": x, "y": y};
    icon1_locsave[0] = {"x": x, "y": y}

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
      
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    let newBottom = newY + dragElement.offsetHeight;

    if (newBottom > document.documentElement.clientHeight) {

      let docBottom = document.documentElement.getBoundingClientRect().bottom;


      let scrollY = Math.min(docBottom - newBottom, 10);

      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    if (newY < 0) {

      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, -scrollY);

    }

    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
    
  }

});


//---------------------------------------------------------------icon2------------------------------------------------------------------------

document.addEventListener('mousedown', function(event) {

    let dragElem = event.target.closest('.draggable2');
  
    if (!dragElem) return;
  
    const getid = dragElem.id;
  
    let dragElement = jQuery("#" + getid).parents("div")[0]
  
    event.preventDefault();
  
    dragElement.ondragstart = function() {
        return false;
    };
  
    let coords, shiftX, shiftY;
  
    startDrag(dragElement, event.clientX, event.clientY);
  
    function onMouseUp(event) {
      finishDrag();
    };
  
    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }
  
    function startDrag(element, clientX, clientY) {
      
      if(isDragging) {
        return;
      }
      
      isDragging = true;
  
      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);
  
      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;
  
  
      element.style.position = 'fixed';
  
      moveAt(clientX, clientY);
    };
  
    function finishDrag() {
      if(!isDragging) {
        return;
      }
  
      isDragging = false;
  
      dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
      dragElement.style.position = 'absolute';
      
      x = dragElement.style.left;
      y = dragElement.style.top;
  
      console.log(getid, x, y);

      for(var i = 0 ; i < icon2_locate.length; i++){
        if(icon2_locate[i][0] == getid){
            icon2_locate[i][1] = [x,y]
        }
      }
  
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
    }
  
    function moveAt(clientX, clientY) {
        
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;
  
      let newBottom = newY + dragElement.offsetHeight;
  
      if (newBottom > document.documentElement.clientHeight) {
  
        let docBottom = document.documentElement.getBoundingClientRect().bottom;
  
  
        let scrollY = Math.min(docBottom - newBottom, 10);
  
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, scrollY);
  
        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }
  
      if (newY < 0) {
  
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, -scrollY);
  
      }
  
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }
  
      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
      
    }
  
  });


//---------------------------------------------------------------icon3------------------------------------------------------------------------

document.addEventListener('mousedown', function(event) {

  let dragElem = event.target.closest('.draggable3');

  if (!dragElem) return;

  const getid = dragElem.id;

  let dragElement = jQuery("#" + getid).parents("div")[0]

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function startDrag(element, clientX, clientY) {
    
    if(isDragging) {
      return;
    }
    
    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;


    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';
    
    x = dragElement.style.left;
    y = dragElement.style.top;

    console.log(getid, x, y);

    for(var i = 0 ; i < icon3_locate.length; i++){
      if(icon3_locate[i][0] == getid){
          icon3_locate[i][1] = [x,y]
      }
    }

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
      
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    let newBottom = newY + dragElement.offsetHeight;

    if (newBottom > document.documentElement.clientHeight) {

      let docBottom = document.documentElement.getBoundingClientRect().bottom;


      let scrollY = Math.min(docBottom - newBottom, 10);

      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    if (newY < 0) {

      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, -scrollY);

    }

    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
    
  }

});
//---------------------------------------------------------------icon4------------------------------------------------------------------------

document.addEventListener('mousedown', function(event) {

    let dragElem = event.target.closest('.draggable4');
  
    if (!dragElem) return;
  
    const getid = dragElem.id;
  
    let dragElement = jQuery("#" + getid).parents("div")[0]
  
    event.preventDefault();
  
    dragElement.ondragstart = function() {
        return false;
    };
  
    let coords, shiftX, shiftY;
  
    startDrag(dragElement, event.clientX, event.clientY);
  
    function onMouseUp(event) {
      finishDrag();
    };
  
    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }
  
    function startDrag(element, clientX, clientY) {
      
      if(isDragging) {
        return;
      }
      
      isDragging = true;
  
      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);
  
      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;
  
  
      element.style.position = 'fixed';
  
      moveAt(clientX, clientY);
    };
  
    function finishDrag() {
      if(!isDragging) {
        return;
      }
  
      isDragging = false;
  
      dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
      dragElement.style.position = 'absolute';
      
      x = dragElement.style.left;
      y = dragElement.style.top;
  
      console.log(getid, x, y);
      for(var i = 0 ; i < icon4_locate.length; i++){
        if(icon4_locate[i][0] == getid){
            icon4_locate[i][1] = [x,y]
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
    }
  
    function moveAt(clientX, clientY) {
        
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;
  
      let newBottom = newY + dragElement.offsetHeight;
  
      if (newBottom > document.documentElement.clientHeight) {
  
        let docBottom = document.documentElement.getBoundingClientRect().bottom;
  
  
        let scrollY = Math.min(docBottom - newBottom, 10);
  
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, scrollY);
  
        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }
  
      if (newY < 0) {
  
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, -scrollY);
  
      }
  
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }
  
      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
      
    }
  
  });

//---------------------------------------------------------------icon5------------------------------------------------------------------------

document.addEventListener('mousedown', function(event) {

    let dragElem = event.target.closest('.draggable5');
  
    if (!dragElem) return;
  
    const getid = dragElem.id;
  
    let dragElement = jQuery("#" + getid).parents("div")[0]
  
    event.preventDefault();
  
    dragElement.ondragstart = function() {
        return false;
    };
  
    let coords, shiftX, shiftY;
  
    startDrag(dragElement, event.clientX, event.clientY);
  
    function onMouseUp(event) {
      finishDrag();
    };
  
    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }
  
    function startDrag(element, clientX, clientY) {
      
      if(isDragging) {
        return;
      }
      
      isDragging = true;
  
      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);
  
      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;
  
  
      element.style.position = 'fixed';
  
      moveAt(clientX, clientY);
    };
  
    function finishDrag() {
      if(!isDragging) {
        return;
      }
  
      isDragging = false;
  
      dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
      dragElement.style.position = 'absolute';
      
      x = dragElement.style.left;
      y = dragElement.style.top;
  
      console.log(getid, x, y);

      for(var i = 0 ; i < icon5_locate.length; i++){
        if(icon5_locate[i][0] == getid){
            icon5_locate[i][1] = [x,y]
        }
      }
  
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
    }
  
    function moveAt(clientX, clientY) {
        
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;
  
      let newBottom = newY + dragElement.offsetHeight;
  
      if (newBottom > document.documentElement.clientHeight) {
  
        let docBottom = document.documentElement.getBoundingClientRect().bottom;
  
  
        let scrollY = Math.min(docBottom - newBottom, 10);
  
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, scrollY);
  
        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }
  
      if (newY < 0) {
  
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0;
  
        window.scrollBy(0, -scrollY);
  
      }
  
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }
  
      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
      
    }
  
  });




export default Component;
