import React, { useState, useEffect } from 'react';
import '../style/main.css';

import imgTree from '../tree.png';
import imgTest from '../badminton_1.jpg';
import imgTitle from '../title.png';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Menubar from './menu';
import {db, firebaseApp, firebase} from '../firebase';
import tree1 from '../group_tree1.png';
import tree2 from '../group_tree2.png';
import tree3 from '../group_tree3.png';
import tree4 from '../group_tree4.png';
import tree5 from '../group_tree5.png';
import tree6 from '../group_tree6.png';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createBrowserHistory } from 'history';
import nophoto from '../nophoto.jpg';


var M_MAX=500000;

//수정사항: diary firebase 연동에 좋게 바꿈 / 나무 이미지는 연동 시켜두고 group의 choosetree 함수 쓰면 됨(mine=false로 해서 후광효과 없애고)
//달력 위치 사아알짝 수정, 달력 내부 5월만 바꿈, 함수 추가
//여기 바꾸니 이름이 같아서인지 저짝도 오류,,, (그냥 원상복구 시켜놓자)
//예제로 사용할 것
//노가다로 저 tagfunc다 넣어주면 됨
/*var diary = [
    {
        date:{year:2021, month: 4, day: 30},
        title:"D",
        tag:["trouble","Hate"]
    },
    {
        date:{year:2021, month: 5, day: 2},
        title:"A",
        tag:["firebase","trouble"]
    },
    {
        date:{year:2021, month: 5, day: 5},
        title:"B",
        tag:["trouble"]
    },
    {
        date:{year:2021, month: 5, day: 7},
        title:"C",
        tag:["Hate","firebase"]
    }
]
*/
var diary=[];
//가장 최근 3가지 가져오는 함수 (젤 나중에 저장한게 뒤에 와서 그냥 이렇게 함)
var recent_diary =[]; //firebase 연동해도 이렇게 자르기
//console.log(recent_diary);




function numberWithCommas(x) {
    return (x+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//유저 트리 넣을 때 쓸 함수
function choosetree (mileage){
    var section = Math.ceil(mileage*6/M_MAX);
    console.log(mileage);
    if (section==1) return tree1;
    else if (section==2) return tree2;
    else if (section==3) return tree3;
    else if (section==4) return tree4;
    else if (section==5) return tree5;
    else return tree6;
  }
  var mileage;

function Main(props){
    

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modal_if, setModalif] = useState({withgroup: "", bet:"", contents: ""});
    const [ index, setIndex ] = useState(0);
    const [mychallenges,setChallenge]=useState([]);
    const [ datas , setDatas] = useState([]);
    const [ oppdata, setOppdata] = useState([]);
    const [ phone, setPhone] = useState("");
    const [ opgroup, setOpgroup] = useState("");
    const [ opindex, setOpindex ] = useState(0);
    const history = createBrowserHistory({
        forceRefresh: true
        });

    var mygroup=props.location.state.group;
    var user=props.location.state.user;

    function filter(fi){
        history.push({pathname :'/Diary/'+fi, state : {group: name, user:props.location.state.user}})
    }

    function tagfunc (month,day){   
        var content = diary.find(e=>e.date.month==month&&e.date.day==day);
        if(content==undefined) return;
        return(
            content.tag.map(e=>{
                return(
                    <div onClick ={()=>{filter(e)}}>
                        #{e}
                    </div>
                )
            })
        )
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        //console.log("dkdkdkdkdk");
        setOpen(false);

    };

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        var docRef = db.collection("Groups").doc(mygroup);
        datas[index].send = 3;
        const r_pack = datas;
        var opdocRef = db.collection("Groups").doc(opgroup);
        
        docRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        }); 

        for (var i=0;i<r_pack.length;i++){
            var r_change = {
                accept : r_pack[i].accept,
                bet : r_pack[i].bet,
                contents : r_pack[i].contents,
                date : r_pack[i].date,
                send : r_pack[i].send,
                withgroup : r_pack[i].withgroup
            }
            docRef.update({
                challenge: firebase.firestore.FieldValue.arrayUnion(r_change)
            });
        }
        oppdata[opindex].send = 3;
        const r_oppack = oppdata;

        opdocRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });        

        for (var i=0;i<r_oppack.length;i++){
            var r_opchange = {
                accept : r_oppack[i].accept,
                bet : r_oppack[i].bet,
                contents : r_oppack[i].contents,
                date : r_oppack[i].date,
                send : r_oppack[i].send,
                withgroup : r_oppack[i].withgroup
            }
            opdocRef.update({
                challenge: firebase.firestore.FieldValue.arrayUnion(r_opchange)
            });
        }

        setModalOpen(false);
    }

    const acceptModal = () => {
        console.log(modal_if)
        var docRef = db.collection("Groups").doc(mygroup);
        var opdocRef = db.collection("Groups").doc(opgroup);
        console.log(datas);
        
        datas[index].accept = 1;
        const pack = datas;
        console.log(pack)

        docRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });        

        for (var i=0;i<pack.length;i++){
            var change = {
                accept : pack[i].accept,
                bet : pack[i].bet,
                contents : pack[i].contents,
                date : pack[i].date,
                send : pack[i].send,
                withgroup : pack[i].withgroup
            }
            docRef.update({
                challenge: firebase.firestore.FieldValue.arrayUnion(change)
            });
        }

        oppdata[opindex].accept = 1;
        const oppack = oppdata;
        console.log(oppack)

        opdocRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });        

        for (var i=0;i<oppack.length;i++){
            var opchange = {
                accept : oppack[i].accept,
                bet : oppack[i].bet,
                contents : oppack[i].contents,
                date : oppack[i].date,
                send : oppack[i].send,
                withgroup : oppack[i].withgroup
            }
            opdocRef.update({
                challenge: firebase.firestore.FieldValue.arrayUnion(opchange)
            });
        }
        

        
        setModalOpen(false);
        handleClickOpen();
    }

    const name = mygroup;
    const ref1 = db.collection("Groups").doc(name);
    const ref = db.collection("Groups").doc(name).collection("Diary");
    var size = 2000;
    var zoom = window.innerWidth / size 
    document.body.style.zoom = zoom;  
    const [load, setLoad] = useState(false);
    //망할 파이어베이스 때문에 잠깐 먹통이 된 녀석 아래 없애고 하면 될꺼임

    async function getch(group){
        var groups=[];
        var challenges=[];
        var phones=[];
        await db.collection("Groups").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                groups.push(doc.id);
                challenges.push([doc.data().challenge]);
                phones.push([doc.data().phonenumber]);
            });
        });
        var mychallenge=[];
        for (var i=0;i<groups.length;i++){
            if(groups[i]==group) {
                mychallenge=challenges[i];
                if(group != mygroup){
                    console.log(phones[i][0])
                    setPhone(phones[i][0])
                }
            }
        }
        //console.log(mychallenge)
        return mychallenge;
    }

    useEffect( async()=>{
        //var recieve = []
        async function fetchAndSetUser(){
            const data=await getch(mygroup);
            console.log(data)
            console.log(data[0])
            
            var recieve = []
            for(var i = 0; i < data[0].length; i++){
                if(data[0][i].send == 1){
                    console.log("send it")
                    continue;
                }
                if(data[0][i].accept == 1){
                    console.log("already accept")
                    continue;
                }

                if(data[0][i].send == 3){
                    console.log("already rejected")
                    continue;
                }
                console.log(i);
                const index = i;
                const withgroup = data[0][i];
                var mem = {withgroup : <div>&nbsp;&nbsp;From.&nbsp;&nbsp;<br></br>&nbsp;&nbsp;<button className="SButton" onClick={(e)=>open_button(index,withgroup)} variant="outlined" color="primary" >open</button> &nbsp; {data[0][i].withgroup}</div>}
                //var mem = { bet : data[0][i].bet, withgroup : <div><button className="SButton" onClick={(e)=>open_button(index,withgroup)} variant="outlined" color="primary" >open</button> &nbsp; {data[0][i].withgroup}</div>, contents : data[0][i].contents}
                recieve.push(mem);
            }
            console.log(recieve)
            if (recieve.length == 0){
                recieve.push({withgroup : <div className = "empty">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Empty...</div>})
            }
            setChallenge(recieve.reverse());
            const dati = data[0];
            setDatas(dati);
            //setChallenge(recieve.reverse());
        } 
        console.log("sdflksdjflkdjfl")
        await fetchAndSetUser();
        console.log(mychallenges);
        //setChallenge(recieve.reverse());
        
    },[])

    

    async function open_button(i,withgroup){
        console.log(i + ", " + withgroup);
        setModalif(withgroup);
        setIndex(i);
        console.log(withgroup.withgroup)
        const opdata = await getch(withgroup.withgroup)
        setOpgroup(withgroup.withgroup);
        for (var i = 0 ; i < opdata[0].length ; i++){
            if(opdata[0][i].accept == 0){
                if(opdata[0][i].contents == withgroup.contents){
                    if(opdata[0][i].date == withgroup.date){
                        if(opdata[0][i].send == 1){
                            if(opdata[0][i].withgroup == mygroup){
                                if(opdata[0][i].bet == withgroup.bet){
                                    setOpindex(i)
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(opindex);
        console.log(opdata[0])
        setOppdata(opdata[0])
        openModal();
    }

    const con_message = () => {
        //alert("gogo")
    }

    const hstyle = {
        color : "blueviolet"
        
    }

    useEffect(()=>{
         function getting_m(){
            ref1.get().then((doc)=>{
                mileage = doc.data()["mileage"];
                console.log(mileage);
            })
        }
        function loading (){
            ref.get().then((querySnapshot)=>{
                //console.log(diary);
                if(diary.length==0){   
                    querySnapshot.forEach((doc,i) => {
                        var data = doc.data();
                        var image = (data["Img"]=="")?nophoto:data["Img"];
                        diary.push({date:data["Date"], title:data["Title"], tag:data["Tag"], img:image, id:doc.id}); //여긴 테스트용 사진 넣어둠
                        //date바꾸는 법만 알면 끝0
                    })
                }
                recent_diary=diary.slice(-3);
                recent_diary.reverse();
                setLoad(true);
            })
        }
        getting_m();
        loading();
        
    },[])

    //if(!load)return(<div>loading</div>)
    if(!load) return(<div>loading</div>);
    else{
    return(
            <div>

<React.Fragment>
            
            
            <Modal open={ modalOpen } close={ closeModal } accept = {acceptModal} header="CHALLENGE FOR YOU!">
                <main>
                <main> { props.children } </main>
                Sending Group : {modal_if.withgroup} <br></br>
                <br></br>
                Recieving Group : {mygroup} <br></br>
                <br></br>
                Betting Mileage : {modal_if.bet}M <br></br>
                <br></br>
                Contents : 
                <div className = "contents">&nbsp;{modal_if.contents}</div>
                </main>
            </Modal>
            </React.Fragment>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" style={hstyle} >&nbsp;&nbsp;{opgroup}&nbsp;&nbsp;Phone number&nbsp;</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" color = "black">
                &nbsp;&nbsp;&nbsp;{phone}
                
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="#6c757d" autoFocus>
                Ok!
            </Button>
            
            </DialogActions>
            </Dialog> 

            <body class = "all">
                <img src={ imgTitle} class = "title_img"/>
                <h1 class = "title_1">Welcome to</h1><h1 class = "title_2">{name}!</h1>
                <Link to="./login"><button class = "logout">logout</button></Link>
                <Link to="/group/0"><button class = "group">group</button></Link>


                <table class = "toTree">
                    <thead>
                    <tr>
                        <td class = "content_title">
                            Our Tree
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr><td class = "mileage_jun">
                        {numberWithCommas(mileage)} M
                    </td></tr>
                    <tr><td class = "tree">
                        <img src={choosetree(mileage)} class = "tree_img"/>
                    </td></tr>
                    </tbody>
                </table>


                <table class = "toMessage" id="example-table-1">
                    <thead>
                    <tr><td class = "content_title">
                    Message !
                    </td></tr>
                    </thead>
                    <tbody className = "message_text">
                    {mychallenges.reverse().map(movie =>
                        <tr key={movie.id} onClick = {con_message}>
                            <td text-align = 'center' >&nbsp;&nbsp;{movie.withgroup}</td>
                        </tr>
                    )}
                    </tbody>
                </table>


                <div class = "diary">
                {
                    recent_diary.map((d)=>{
                        console.log(d);
                        return(
                            <Link to={{pathname:'/openDiary/'+d.id, state : {group: name, user:props.location.state.user}}} class = "hover"> 
                            <table class = "diary_1">
                                <thead>
                                <tr>
                                <td height = "180px" >
                                    <img src={d.img} alt="NO_Image"class = "diary_img" style={{maxHeight:"175px", maxWidth:"350px",margin:"5px 20px"}}/>
                                </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                <td class = "diary_text">
                                    {d.title}
                                </td>
                                </tr>
                                <tr>
                                <td class = "diary_date">
                                    &nbsp;&nbsp;{d.date.year}.{d.date.month}.{d.date.day}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                                </tr>
                                </tbody>
                            </table>
                            </Link>
                        )
                    })
                }
                </div>



                <div class = "calendar">
                    <div class = "year">2021</div>
                    <div id = "changeMonth">
                        <div id = "months" class = "months">
                            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
                            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
                            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
                            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
                            <span class="month-color" onClick = {()=>May()}>May{" "}</span>
                            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
                            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
                            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
                            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
                            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
                            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
                            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
                        </div>
                    </div>
                    <hr class="month-line"/>
                    <div id = "tables">
                    <table id = "table" class="table_jun">
                        <thead>
                            <tr class = "week" height = "30px" >
                                <th class = "Day">SUN</th>
                                <th class = "Day">MON</th>
                                <th class = "Day">TUE</th>
                                <th class = "Day">WED</th> 
                                <th class = "Day">THU</th> 
                                <th class = "Day">FRI</th>
                                <th class = "Day">SAT</th> 
                            </tr>
                        </thead>
                         <tbody>
                            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                                <td class = "notday" id = "1-1" width = "100px">25{tagfunc(4,25)}</td>
                                <td class = "notday" id = "1-2" width = "100px">26{tagfunc(4,26)}</td>
                                <td class = "notday" id = "1-3" width = "100px">27{tagfunc(4,27)}</td>
                                <td class = "notday" id = "1-4" width = "100px">28{tagfunc(4,28)}</td> 
                                <td class = "notday" id = "1-5" width = "100px">29{tagfunc(4,29)}</td> 
                                <td class = "notday" id = "1-6" width = "100px">30{tagfunc(4,30)}</td>
                                <td class = "day" id = "1-7" width = "100px">1{tagfunc(5,1)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "2">2{tagfunc(5,2)}</td>
                                <td class = "day" id = "5/3">3{tagfunc(5,3)}</td>
                                <td class = "day" id = "5/4">4{tagfunc(5,4)}</td>
                                <td class = "day" id = "5/5">5{tagfunc(5,5)}</td>
                                <td class = "day" id = "5/6">6{tagfunc(5,6)}</td>
                                <td class = "day" id = "7">7{tagfunc(5,7)}</td>
                                <td class = "day" id = "8">8{tagfunc(5,8)}</td>
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "9">9{tagfunc(5,9)}</td>
                                <td class = "day" id = "10">10{tagfunc(5,10)}</td>
                                <td class = "day" id = "11">11{tagfunc(5,11)}</td>
                                <td class = "day" id = "12">12{tagfunc(5,12)}</td> 
                                <td class = "day" id = "3-5">13{tagfunc(5,13)}</td> 
                                <td class = "day" id = "3-6">14{tagfunc(5,14)}</td>
                                <td class = "day" id = "3-7">15{tagfunc(5,15)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "4-1">16{tagfunc(5,16)}</td>
                                <td class = "day" id = "4-2">17{tagfunc(5,17)}</td>
                                <td class = "day" id = "4-3">18{tagfunc(5,18)}</td>
                                <td class = "day" id = "4-4">19{tagfunc(5,19)}</td> 
                                <td class = "day" id = "4-5">20{tagfunc(5,20)}</td> 
                                <td class = "day" id = "4-6">21{tagfunc(5,21)}</td>
                                <td class = "day" id = "4-7">22{tagfunc(5,22)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "5-1">23{tagfunc(5,23)}</td>
                                <td class = "day" id = "5-2">24{tagfunc(5,24)}</td>
                                <td class = "day" id = "5-3">25{tagfunc(5,25)}</td>
                                <td class = "day" id = "5-4">26{tagfunc(5,26)}</td> 
                                <td class = "day" id = "5-5">27{tagfunc(5,27)}</td> 
                                <td class = "day" id = "5-6">28{tagfunc(5,28)}</td>
                                <td class = "day" id = "5-7">29{tagfunc(5,29)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "6-1">30</td>
                                <td class = "day" id = "6-2">31</td>
                                <td class = "notday" id = "6-3">1</td>
                                <td class = "notday" id = "6-4">2</td> 
                                <td class = "notday" id = "6-5">3</td> 
                                <td class = "notday" id = "6-6">4</td>
                                <td class = "notday" id = "6-7">5</td> 
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="calendar-left">
                        <div class="D-date">15</div>
                        <div class="D-day">SATURDAY</div>

                    </div>
                </div>
            </body>
            <Menubar group={mygroup} user={user}/>
            </div>
            
        )
    
}

function Jan(){
    const element = (
        <table id = "table" class="table_jun">
            <thead>
                <tr class = "week" height = "30px" >
                    <th class = "Day">SUN</th>
                    <th class = "Day">MON</th>
                    <th class = "Day">TUE</th>
                    <th class = "Day">WED</th> 
                    <th class = "Day">THU</th> 
                    <th class = "Day">FRI</th>
                    <th class = "Day">SAT</th> 
                </tr>
            </thead>
            <tbody>
                <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                    <td class = "notday" id = "1-1" width = "100px">27</td>
                    <td class = "notday" id = "1-2" width = "100px">28</td>
                    <td class = "notday" id = "1-3" width = "100px">29</td>
                    <td class = "notday" id = "1-4" width = "100px">30</td> 
                    <td class = "notday" id = "1-5" width = "100px">31</td> 
                    <td class = "day" id = "1-6" width = "100px">1</td>
                    <td class = "day" id = "1-7" width = "100px">2</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "2-1">3</td>
                    <td class = "day" id = "2-2">4</td>
                    <td class = "day" id = "2-3">5</td>
                    <td class = "day" id = "2-4">6</td>
                    <td class = "day" id = "2-5">7</td>
                    <td class = "day" id = "2-6">8</td>
                    <td class = "day" id = "2-7">9</td>
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "3-1">10</td>
                    <td class = "day" id = "3-2">11</td>
                    <td class = "day" id = "3-3">12</td>
                    <td class = "day" id = "3-4">13</td> 
                    <td class = "day" id = "3-5">14</td> 
                    <td class = "day" id = "3-6">15</td>
                    <td class = "day" id = "3-7">16</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "4-1">17</td>
                    <td class = "day" id = "4-2">18</td>
                    <td class = "day" id = "4-3">19</td>
                    <td class = "day" id = "4-4">20</td> 
                    <td class = "day" id = "4-5">21</td> 
                    <td class = "day" id = "4-6">22</td>
                    <td class = "day" id = "4-7">23</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "5-1">24</td>
                    <td class = "day" id = "5-2">25</td>
                    <td class = "day" id = "5-3">26</td>
                    <td class = "day" id = "5-4">27</td> 
                    <td class = "day" id = "5-5">28</td> 
                    <td class = "day" id = "5-6">29</td>
                    <td class = "day" id = "5-7">30</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "6-1">31</td>
                    <td class = "notday" id = "6-2">1</td>
                    <td class = "notday" id = "6-3">2</td>
                    <td class = "notday" id = "6-4">3</td> 
                    <td class = "notday" id = "6-5">4</td> 
                    <td class = "notday" id = "6-6">5</td>
                    <td class = "notday" id = "6-7">6</td> 
                </tr>
            </tbody>
        </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-color" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Feb(){
    const element = (
        <table id = "table" class="table_jun">
            <thead>
                <tr class = "week" height = "30px" >
                    <th class = "Day">SUN</th>
                    <th class = "Day">MON</th>
                    <th class = "Day">TUE</th>
                    <th class = "Day">WED</th> 
                    <th class = "Day">THU</th> 
                    <th class = "Day">FRI</th>
                    <th class = "Day">SAT</th> 
                </tr>
            </thead>
            <tbody>
                <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                    <td class = "notday" id = "1-1" width = "100px">31</td>
                    <td class = "day" id = "1-2" width = "100px">1</td>
                    <td class = "day" id = "1-3" width = "100px">2</td>
                    <td class = "day" id = "1-4" width = "100px">3</td> 
                    <td class = "day" id = "1-5" width = "100px">4</td> 
                    <td class = "day" id = "1-6" width = "100px">5</td>
                    <td class = "day" id = "1-7" width = "100px">6</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "2-1">7</td>
                    <td class = "day" id = "2-2">8</td>
                    <td class = "day" id = "2-3">9</td>
                    <td class = "day" id = "2-4">10</td>
                    <td class = "day" id = "2-5">11</td>
                    <td class = "day" id = "2-6">12</td>
                    <td class = "day" id = "2-7">13</td>
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "3-1">14</td>
                    <td class = "day" id = "3-2">15</td>
                    <td class = "day" id = "3-3">16</td>
                    <td class = "day" id = "3-4">17</td> 
                    <td class = "day" id = "3-5">18</td> 
                    <td class = "day" id = "3-6">19</td>
                    <td class = "day" id = "3-7">20</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "4-1">21</td>
                    <td class = "day" id = "4-2">22</td>
                    <td class = "day" id = "4-3">23</td>
                    <td class = "day" id = "4-4">24</td> 
                    <td class = "day" id = "4-5">25</td> 
                    <td class = "day" id = "4-6">26</td>
                    <td class = "day" id = "4-7">27</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "5-1">28</td>
                    <td class = "notday" id = "5-2">1</td>
                    <td class = "notday" id = "5-3">2</td>
                    <td class = "notday" id = "5-4">3</td> 
                    <td class = "notday" id = "5-5">4</td> 
                    <td class = "notday" id = "5-6">5</td>
                    <td class = "notday" id = "5-7">6</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "notday" id = "6-1">7</td>
                    <td class = "notday" id = "6-2">8</td>
                    <td class = "notday" id = "6-3">9</td>
                    <td class = "notday" id = "6-4">10</td> 
                    <td class = "notday" id = "6-5">11</td> 
                    <td class = "notday" id = "6-6">12</td>
                    <td class = "notday" id = "6-7">13</td> 
                </tr>
            </tbody>
        </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-color" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Mar(){
    const element = (
        <table id = "table" class="table_jun">
            <thead>
                <tr class = "week" height = "30px" >
                    <th class = "Day">SUN</th>
                    <th class = "Day">MON</th>
                    <th class = "Day">TUE</th>
                    <th class = "Day">WED</th> 
                    <th class = "Day">THU</th> 
                    <th class = "Day">FRI</th>
                    <th class = "Day">SAT</th> 
                </tr>
            </thead>
            <tbody>
                <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                    <td class = "notday" id = "1-1" width = "100px">28</td>
                    <td class = "day" id = "1-2" width = "100px">1</td>
                    <td class = "day" id = "1-3" width = "100px">2</td>
                    <td class = "day" id = "1-4" width = "100px">3</td> 
                    <td class = "day" id = "1-5" width = "100px">4</td> 
                    <td class = "day" id = "1-6" width = "100px">5</td>
                    <td class = "day" id = "1-7" width = "100px">6</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "2-1">7</td>
                    <td class = "day" id = "2-2">8</td>
                    <td class = "day" id = "2-3">9</td>
                    <td class = "day" id = "2-4">10</td>
                    <td class = "day" id = "2-5">11</td>
                    <td class = "day" id = "2-6">12</td>
                    <td class = "day" id = "2-7">13</td>
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "3-1">14</td>
                    <td class = "day" id = "3-2">15</td>
                    <td class = "day" id = "3-3">16</td>
                    <td class = "day" id = "3-4">17</td> 
                    <td class = "day" id = "3-5">18</td> 
                    <td class = "day" id = "3-6">19</td>
                    <td class = "day" id = "3-7">20</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "4-1">21</td>
                    <td class = "day" id = "4-2">22</td>
                    <td class = "day" id = "4-3">23</td>
                    <td class = "day" id = "4-4">24</td> 
                    <td class = "day" id = "4-5">25</td> 
                    <td class = "day" id = "4-6">26</td>
                    <td class = "day" id = "4-7">27</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "5-1">28</td>
                    <td class = "day" id = "5-2">29</td>
                    <td class = "day" id = "5-3">30</td>
                    <td class = "day" id = "5-4">31</td> 
                    <td class = "notday" id = "5-5">1</td> 
                    <td class = "notday" id = "5-6">2</td>
                    <td class = "notday" id = "5-7">3</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "notday" id = "6-1">4</td>
                    <td class = "notday" id = "6-2">5</td>
                    <td class = "notday" id = "6-3">6</td>
                    <td class = "notday" id = "6-4">7</td> 
                    <td class = "notday" id = "6-5">8</td> 
                    <td class = "notday" id = "6-6">9</td>
                    <td class = "notday" id = "6-7">10</td> 
                </tr>
            </tbody>
        </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-color" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Apr(){
    const element = (
        <table id = "table" class="table_jun">
            <thead>
                <tr class = "week" height = "30px" >
                    <th class = "Day">SUN</th>
                    <th class = "Day">MON</th>
                    <th class = "Day">TUE</th>
                    <th class = "Day">WED</th> 
                    <th class = "Day">THU</th> 
                    <th class = "Day">FRI</th>
                    <th class = "Day">SAT</th> 
                </tr>
            </thead>
            <tbody>
                <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                    <td class = "notday" id = "1-1" width = "100px">28{tagfunc(3,28)}</td>
                    <td class = "notday" id = "1-2" width = "100px">29{tagfunc(3,29)}</td>
                    <td class = "notday" id = "1-3" width = "100px">30{tagfunc(3,30)}</td>
                    <td class = "notday" id = "1-4" width = "100px">31{tagfunc(3,31)}</td> 
                    <td class = "day" id = "1-5" width = "100px">1{tagfunc(4,1)}</td> 
                    <td class = "day" id = "1-6" width = "100px">2{tagfunc(4,2)}</td>
                    <td class = "day" id = "1-7" width = "100px">3{tagfunc(4,3)}</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "2-1">4{tagfunc(4,4)}</td>
                    <td class = "day" id = "2-2">5{tagfunc(4,5)}</td>
                    <td class = "day" id = "2-3">6{tagfunc(4,6)}</td>
                    <td class = "day" id = "2-4">7{tagfunc(4,7)}</td>
                    <td class = "day" id = "2-5">8{tagfunc(4,8)}</td>
                    <td class = "day" id = "2-6">9{tagfunc(4,9)}</td>
                    <td class = "day" id = "2-7">10{tagfunc(4,10)}</td>
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "3-1">11{tagfunc(4,11)}</td>
                    <td class = "day" id = "3-2">12{tagfunc(4,12)}</td>
                    <td class = "day" id = "3-3">13{tagfunc(4,13)}</td>
                    <td class = "day" id = "3-4">14{tagfunc(4,14)}</td> 
                    <td class = "day" id = "3-5">15{tagfunc(4,15)}</td> 
                    <td class = "day" id = "3-6">16{tagfunc(4,16)}</td>
                    <td class = "day" id = "3-7">17{tagfunc(4,17)}</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "4-1">18{tagfunc(4,18)}</td>
                    <td class = "day" id = "4-2">19{tagfunc(4,19)}</td>
                    <td class = "day" id = "4-3">20{tagfunc(4,20)}</td>
                    <td class = "day" id = "4-4">21{tagfunc(4,21)}</td> 
                    <td class = "day" id = "4-5">22{tagfunc(4,22)}</td> 
                    <td class = "day" id = "4-6">23{tagfunc(4,23)}</td>
                    <td class = "day" id = "4-7">24{tagfunc(4,24)}</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "day" id = "5-1">25{tagfunc(4,25)}</td>
                    <td class = "day" id = "5-2">26{tagfunc(4,26)}</td>
                    <td class = "day" id = "5-3">27{tagfunc(4,27)}</td>
                    <td class = "day" id = "5-4">28{tagfunc(4,28)}</td> 
                    <td class = "day" id = "5-5">29{tagfunc(4,29)}</td> 
                    <td class = "day" id = "5-6">30{tagfunc(4,30)}</td>
                    <td class = "notday" id = "5-7">1{tagfunc(5,1)}</td> 
                </tr>
                <tr class = "week" height = "77px">
                    <td class = "notday" id = "6-1">2{tagfunc(5,2)}</td>
                    <td class = "notday" id = "6-2">3{tagfunc(5,3)}</td>
                    <td class = "notday" id = "6-3">4{tagfunc(5,4)}</td>
                    <td class = "notday" id = "6-4">5{tagfunc(5,5)}</td> 
                    <td class = "notday" id = "6-5">6{tagfunc(5,6)}</td> 
                    <td class = "notday" id = "6-6">7{tagfunc(5,7)}</td>
                    <td class = "notday" id = "6-7">8{tagfunc(5,8)}</td> 
                </tr>
            </tbody>
        </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-color" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function May(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
        <tbody>
                            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                                <td class = "notday" id = "1-1" width = "100px">25{tagfunc(4,25)}</td>
                                <td class = "notday" id = "1-2" width = "100px">26{tagfunc(4,26)}</td>
                                <td class = "notday" id = "1-3" width = "100px">27{tagfunc(4,27)}</td>
                                <td class = "notday" id = "1-4" width = "100px">28{tagfunc(4,28)}</td> 
                                <td class = "notday" id = "1-5" width = "100px">29{tagfunc(4,29)}</td> 
                                <td class = "notday" id = "1-6" width = "100px">30{tagfunc(4,30)}</td>
                                <td class = "day" id = "1-7" width = "100px">1{tagfunc(5,1)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "2">2{tagfunc(5,2)}</td>
                                <td class = "day" id = "5/3">3{tagfunc(5,3)}</td>
                                <td class = "day" id = "5/4">4{tagfunc(5,4)}</td>
                                <td class = "day" id = "5/5">5{tagfunc(5,5)}</td>
                                <td class = "day" id = "5/6">6{tagfunc(5,6)}</td>
                                <td class = "day" id = "7">7{tagfunc(5,7)}</td>
                                <td class = "day" id = "8">8{tagfunc(5,8)}</td>
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "9">9{tagfunc(5,9)}</td>
                                <td class = "day" id = "10">10{tagfunc(5,10)}</td>
                                <td class = "day" id = "11">11{tagfunc(5,11)}</td>
                                <td class = "day" id = "12">12{tagfunc(5,12)}</td> 
                                <td class = "day" id = "3-5">13{tagfunc(5,13)}</td> 
                                <td class = "day" id = "3-6">14{tagfunc(5,14)}</td>
                                <td class = "day" id = "3-7">15{tagfunc(5,15)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "4-1">16{tagfunc(5,16)}</td>
                                <td class = "day" id = "4-2">17{tagfunc(5,17)}</td>
                                <td class = "day" id = "4-3">18{tagfunc(5,18)}</td>
                                <td class = "day" id = "4-4">19{tagfunc(5,19)}</td> 
                                <td class = "day" id = "4-5">20{tagfunc(5,20)}</td> 
                                <td class = "day" id = "4-6">21{tagfunc(5,21)}</td>
                                <td class = "day" id = "4-7">22{tagfunc(5,22)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "5-1">23{tagfunc(5,23)}</td>
                                <td class = "day" id = "5-2">24{tagfunc(5,24)}</td>
                                <td class = "day" id = "5-3">25{tagfunc(5,25)}</td>
                                <td class = "day" id = "5-4">26{tagfunc(5,26)}</td> 
                                <td class = "day" id = "5-5">27{tagfunc(5,27)}</td> 
                                <td class = "day" id = "5-6">28{tagfunc(5,28)}</td>
                                <td class = "day" id = "5-7">29{tagfunc(5,29)}</td> 
                            </tr>
                            <tr class = "week" height = "77px">
                                <td class = "day" id = "6-1">30</td>
                                <td class = "day" id = "6-2">31</td>
                                <td class = "notday" id = "6-3">1</td>
                                <td class = "notday" id = "6-4">2</td> 
                                <td class = "notday" id = "6-5">3</td> 
                                <td class = "notday" id = "6-6">4</td>
                                <td class = "notday" id = "6-7">5</td> 
                            </tr>
                        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-color" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Jun(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">30</td>
                <td class = "notday" id = "1-2" width = "100px">31</td>
                <td class = "day" id = "1-3" width = "100px">1</td>
                <td class = "day" id = "1-4" width = "100px">2</td> 
                <td class = "day" id = "1-5" width = "100px">3</td> 
                <td class = "day" id = "1-6" width = "100px">4</td>
                <td class = "day" id = "1-7" width = "100px">5</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">6</td>
                <td class = "day" id = "2-2">7</td>
                <td class = "day" id = "2-3">8</td>
                <td class = "day" id = "2-4">9</td>
                <td class = "day" id = "2-5">10</td>
                <td class = "day" id = "2-6">11</td>
                <td class = "day" id = "2-7">12</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">13</td>
                <td class = "day" id = "3-2">14</td>
                <td class = "day" id = "3-3">15</td>
                <td class = "day" id = "3-4">16</td> 
                <td class = "day" id = "3-5">17</td> 
                <td class = "day" id = "3-6">18</td>
                <td class = "day" id = "3-7">19</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">20</td>
                <td class = "day" id = "4-2">21</td>
                <td class = "day" id = "4-3">22</td>
                <td class = "day" id = "4-4">23</td> 
                <td class = "day" id = "4-5">24</td> 
                <td class = "day" id = "4-6">25</td>
                <td class = "day" id = "4-7">26</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">27</td>
                <td class = "day" id = "5-2">28</td>
                <td class = "day" id = "5-3">29</td>
                <td class = "day" id = "5-4">30</td> 
                <td class = "notday" id = "5-5">1</td> 
                <td class = "notday" id = "5-6">2</td>
                <td class = "notday" id = "5-7">3</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">4</td>
                <td class = "notday" id = "6-2">5</td>
                <td class = "notday" id = "6-3">6</td>
                <td class = "notday" id = "6-4">7</td> 
                <td class = "notday" id = "6-5">8</td> 
                <td class = "notday" id = "6-6">9</td>
                <td class = "notday" id = "6-7">10</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-color" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Jul(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">27</td>
                <td class = "notday" id = "1-2" width = "100px">28</td>
                <td class = "notday" id = "1-3" width = "100px">29</td>
                <td class = "notday" id = "1-4" width = "100px">30</td> 
                <td class = "day" id = "1-5" width = "100px">1</td> 
                <td class = "day" id = "1-6" width = "100px">2</td>
                <td class = "day" id = "1-7" width = "100px">3</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">4</td>
                <td class = "day" id = "2-2">5</td>
                <td class = "day" id = "2-3">6</td>
                <td class = "day" id = "2-4">7</td>
                <td class = "day" id = "2-5">8</td>
                <td class = "day" id = "2-6">9</td>
                <td class = "day" id = "2-7">10</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">11</td>
                <td class = "day" id = "3-2">12</td>
                <td class = "day" id = "3-3">13</td>
                <td class = "day" id = "3-4">14</td> 
                <td class = "day" id = "3-5">15</td> 
                <td class = "day" id = "3-6">16</td>
                <td class = "day" id = "3-7">17</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">18</td>
                <td class = "day" id = "4-2">19</td>
                <td class = "day" id = "4-3">20</td>
                <td class = "day" id = "4-4">21</td> 
                <td class = "day" id = "4-5">22</td> 
                <td class = "day" id = "4-6">23</td>
                <td class = "day" id = "4-7">24</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">25</td>
                <td class = "day" id = "5-2">26</td>
                <td class = "day" id = "5-3">27</td>
                <td class = "day" id = "5-4">28</td> 
                <td class = "day" id = "5-5">29</td> 
                <td class = "day" id = "5-6">30</td>
                <td class = "day" id = "5-7">31</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">1</td>
                <td class = "notday" id = "6-2">2</td>
                <td class = "notday" id = "6-3">3</td>
                <td class = "notday" id = "6-4">4</td> 
                <td class = "notday" id = "6-5">5</td> 
                <td class = "notday" id = "6-6">6</td>
                <td class = "notday" id = "6-7">7</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-color" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Aug(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "day" id = "1-1" width = "100px">1</td>
                <td class = "day" id = "1-2" width = "100px">2</td>
                <td class = "day" id = "1-3" width = "100px">3</td>
                <td class = "day" id = "1-4" width = "100px">4</td> 
                <td class = "day" id = "1-5" width = "100px">5</td> 
                <td class = "day" id = "1-6" width = "100px">6</td>
                <td class = "day" id = "1-7" width = "100px">7</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">8</td>
                <td class = "day" id = "2-2">9</td>
                <td class = "day" id = "2-3">10</td>
                <td class = "day" id = "2-4">11</td>
                <td class = "day" id = "2-5">12</td>
                <td class = "day" id = "2-6">13</td>
                <td class = "day" id = "2-7">14</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">15</td>
                <td class = "day" id = "3-2">16</td>
                <td class = "day" id = "3-3">17</td>
                <td class = "day" id = "3-4">18</td> 
                <td class = "day" id = "3-5">19</td> 
                <td class = "day" id = "3-6">20</td>
                <td class = "day" id = "3-7">21</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">22</td>
                <td class = "day" id = "4-2">23</td>
                <td class = "day" id = "4-3">24</td>
                <td class = "day" id = "4-4">25</td> 
                <td class = "day" id = "4-5">26</td> 
                <td class = "day" id = "4-6">27</td>
                <td class = "day" id = "4-7">28</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">29</td>
                <td class = "day" id = "5-2">30</td>
                <td class = "day" id = "5-3">31</td>
                <td class = "notday" id = "5-4">1</td> 
                <td class = "notday" id = "5-5">2</td> 
                <td class = "notday" id = "5-6">3</td>
                <td class = "notday" id = "5-7">4</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">5</td>
                <td class = "notday" id = "6-2">6</td>
                <td class = "notday" id = "6-3">7</td>
                <td class = "notday" id = "6-4">8</td> 
                <td class = "notday" id = "6-5">9</td> 
                <td class = "notday" id = "6-6">10</td>
                <td class = "notday" id = "6-7">11</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-color" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Sep(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">29</td>
                <td class = "notday" id = "1-2" width = "100px">30</td>
                <td class = "notday" id = "1-3" width = "100px">31</td>
                <td class = "day" id = "1-4" width = "100px">1</td> 
                <td class = "day" id = "1-5" width = "100px">2</td> 
                <td class = "day" id = "1-6" width = "100px">3</td>
                <td class = "day" id = "1-7" width = "100px">4</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">5</td>
                <td class = "day" id = "2-2">6</td>
                <td class = "day" id = "2-3">7</td>
                <td class = "day" id = "2-4">8</td>
                <td class = "day" id = "2-5">9</td>
                <td class = "day" id = "2-6">10</td>
                <td class = "day" id = "2-7">11</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">12</td>
                <td class = "day" id = "3-2">13</td>
                <td class = "day" id = "3-3">14</td>
                <td class = "day" id = "3-4">15</td> 
                <td class = "day" id = "3-5">16</td> 
                <td class = "day" id = "3-6">17</td>
                <td class = "day" id = "3-7">18</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">19</td>
                <td class = "day" id = "4-2">20</td>
                <td class = "day" id = "4-3">21</td>
                <td class = "day" id = "4-4">22</td> 
                <td class = "day" id = "4-5">23</td> 
                <td class = "day" id = "4-6">24</td>
                <td class = "day" id = "4-7">25</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">26</td>
                <td class = "day" id = "5-2">27</td>
                <td class = "day" id = "5-3">28</td>
                <td class = "day" id = "5-4">29</td> 
                <td class = "day" id = "5-5">30</td> 
                <td class = "notday" id = "5-6">1</td>
                <td class = "notday" id = "5-7">2</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">3</td>
                <td class = "notday" id = "6-2">4</td>
                <td class = "notday" id = "6-3">5</td>
                <td class = "notday" id = "6-4">6</td> 
                <td class = "notday" id = "6-5">7</td> 
                <td class = "notday" id = "6-6">8</td>
                <td class = "notday" id = "6-7">9</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-color" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Oct(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">26</td>
                <td class = "notday" id = "1-2" width = "100px">27</td>
                <td class = "notday" id = "1-3" width = "100px">28</td>
                <td class = "notday" id = "1-4" width = "100px">29</td> 
                <td class = "notday" id = "1-5" width = "100px">30</td> 
                <td class = "day" id = "1-6" width = "100px">1</td>
                <td class = "day" id = "1-7" width = "100px">2</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">3</td>
                <td class = "day" id = "2-2">4</td>
                <td class = "day" id = "2-3">5</td>
                <td class = "day" id = "2-4">6</td>
                <td class = "day" id = "2-5">7</td>
                <td class = "day" id = "2-6">8</td>
                <td class = "day" id = "2-7">9</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">10</td>
                <td class = "day" id = "3-2">11</td>
                <td class = "day" id = "3-3">12</td>
                <td class = "day" id = "3-4">13</td> 
                <td class = "day" id = "3-5">14</td> 
                <td class = "day" id = "3-6">15</td>
                <td class = "day" id = "3-7">16</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">17</td>
                <td class = "day" id = "4-2">18</td>
                <td class = "day" id = "4-3">19</td>
                <td class = "day" id = "4-4">20</td> 
                <td class = "day" id = "4-5">21</td> 
                <td class = "day" id = "4-6">22</td>
                <td class = "day" id = "4-7">23</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">24</td>
                <td class = "day" id = "5-2">25</td>
                <td class = "day" id = "5-3">26</td>
                <td class = "day" id = "5-4">27</td> 
                <td class = "day" id = "5-5">28</td> 
                <td class = "day" id = "5-6">29</td>
                <td class = "day" id = "5-7">30</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "6-1">31</td>
                <td class = "notday" id = "6-2">1</td>
                <td class = "notday" id = "6-3">2</td>
                <td class = "notday" id = "6-4">3</td> 
                <td class = "notday" id = "6-5">4</td> 
                <td class = "notday" id = "6-6">5</td>
                <td class = "notday" id = "6-7">6</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-color" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Nov(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">31</td>
                <td class = "day" id = "1-2" width = "100px">1</td>
                <td class = "day" id = "1-3" width = "100px">2</td>
                <td class = "day" id = "1-4" width = "100px">3</td> 
                <td class = "day" id = "1-5" width = "100px">4</td> 
                <td class = "day" id = "1-6" width = "100px">5</td>
                <td class = "day" id = "1-7" width = "100px">6</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">7</td>
                <td class = "day" id = "2-2">8</td>
                <td class = "day" id = "2-3">9</td>
                <td class = "day" id = "2-4">10</td>
                <td class = "day" id = "2-5">11</td>
                <td class = "day" id = "2-6">12</td>
                <td class = "day" id = "2-7">13</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">14</td>
                <td class = "day" id = "3-2">15</td>
                <td class = "day" id = "3-3">16</td>
                <td class = "day" id = "3-4">17</td> 
                <td class = "day" id = "3-5">18</td> 
                <td class = "day" id = "3-6">19</td>
                <td class = "day" id = "3-7">20</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">21</td>
                <td class = "day" id = "4-2">22</td>
                <td class = "day" id = "4-3">23</td>
                <td class = "day" id = "4-4">24</td> 
                <td class = "day" id = "4-5">25</td> 
                <td class = "day" id = "4-6">26</td>
                <td class = "day" id = "4-7">27</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">28</td>
                <td class = "day" id = "5-2">29</td>
                <td class = "day" id = "5-3">30</td>
                <td class = "notday" id = "5-4">1</td> 
                <td class = "notday" id = "5-5">2</td> 
                <td class = "notday" id = "5-6">3</td>
                <td class = "notday" id = "5-7">4</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">5</td>
                <td class = "notday" id = "6-2">6</td>
                <td class = "notday" id = "6-3">7</td>
                <td class = "notday" id = "6-4">8</td> 
                <td class = "notday" id = "6-5">9</td> 
                <td class = "notday" id = "6-6">10</td>
                <td class = "notday" id = "6-7">11</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-color" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-hover" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}

function Dec(){
    const element = (
        <table id = "table" class="table_jun">
        <thead>
            <tr class = "week" height = "30px" >
                <th class = "Day">SUN</th>
                <th class = "Day">MON</th>
                <th class = "Day">TUE</th>
                <th class = "Day">WED</th> 
                <th class = "Day">THU</th> 
                <th class = "Day">FRI</th>
                <th class = "Day">SAT</th> 
            </tr>
        </thead>
         <tbody>
            <tr class = "week" height = "77px" border-top = "2px solid #dfdfdf;">
                <td class = "notday" id = "1-1" width = "100px">28</td>
                <td class = "notday" id = "1-2" width = "100px">29</td>
                <td class = "notday" id = "1-3" width = "100px">30</td>
                <td class = "day" id = "1-4" width = "100px">1</td> 
                <td class = "day" id = "1-5" width = "100px">2</td> 
                <td class = "day" id = "1-6" width = "100px">3</td>
                <td class = "day" id = "1-7" width = "100px">4</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "2-1">5</td>
                <td class = "day" id = "2-2">6</td>
                <td class = "day" id = "2-3">7</td>
                <td class = "day" id = "2-4">8</td>
                <td class = "day" id = "2-5">9</td>
                <td class = "day" id = "2-6">10</td>
                <td class = "day" id = "2-7">11</td>
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "3-1">12</td>
                <td class = "day" id = "3-2">13</td>
                <td class = "day" id = "3-3">14</td>
                <td class = "day" id = "3-4">15</td> 
                <td class = "day" id = "3-5">16</td> 
                <td class = "day" id = "3-6">17</td>
                <td class = "day" id = "3-7">18</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "4-1">19</td>
                <td class = "day" id = "4-2">20</td>
                <td class = "day" id = "4-3">21</td>
                <td class = "day" id = "4-4">22</td> 
                <td class = "day" id = "4-5">23</td> 
                <td class = "day" id = "4-6">24</td>
                <td class = "day" id = "4-7">25</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "day" id = "5-1">26</td>
                <td class = "day" id = "5-2">27</td>
                <td class = "day" id = "5-3">28</td>
                <td class = "day" id = "5-4">29</td> 
                <td class = "day" id = "5-5">30</td> 
                <td class = "day" id = "5-6">31</td>
                <td class = "notday" id = "5-7">1</td> 
            </tr>
            <tr class = "week" height = "77px">
                <td class = "notday" id = "6-1">2</td>
                <td class = "notday" id = "6-2">3</td>
                <td class = "notday" id = "6-3">4</td>
                <td class = "notday" id = "6-4">5</td> 
                <td class = "notday" id = "6-5">6</td> 
                <td class = "notday" id = "6-6">7</td>
                <td class = "notday" id = "6-7">8</td> 
            </tr>
        </tbody>
    </table>
    );
    const month = (
        <div id = "months" class = "months">
            <span class="month-hover" onClick = {()=>Jan()}>Jan{" "}</span>
            <span class="month-hover" onClick = {()=>Feb()}>Feb{" "}</span> 
            <span class="month-hover" onClick = {()=>Mar()}>Mar{" "}</span> 
            <span class="month-hover" onClick = {()=>Apr()}>Apr{" "}</span>
            <span class="month-hover" onClick = {()=>May()}>May{" "}</span>
            <span class="month-hover" onClick = {()=>Jun()}>Jun{" "}</span>
            <span class="month-hover" onClick = {()=>Jul()}>Jul{" "}</span> 
            <span class="month-hover" onClick = {()=>Aug()}>Aug{" "}</span> 
            <span class="month-hover" onClick = {()=>Sep()}>Sep{" "}</span> 
            <span class="month-hover" onClick = {()=>Oct()}>Oct{" "}</span> 
            <span class="month-hover" onClick = {()=>Nov()}>Nov{" "}</span> 
            <span class="month-color" onClick = {()=>Dec()}>Dec</span>
        </div>
    );
    ReactDOM.render(element, document.getElementById('tables'));
    ReactDOM.render(month, document.getElementById('changeMonth')); 
}
}
export default Main;
