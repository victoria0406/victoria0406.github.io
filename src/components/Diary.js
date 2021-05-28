import React, { useEffect , useState, useRef} from 'react';
import '../style/Diary.css';
import imgTest from '../badminton_1.jpg';
import {GoSearch} from "react-icons/go";
import { Link ,Route , withRouter, useLocation} from 'react-router-dom';
import {db, firebaseApp, firebase} from '../firebase';
import { set } from 'lodash';
import search_icon from '../loupe.png';
import Menubar from './menu';
import { createBrowserHistory } from 'history';  //버전 확인 버전 저거 해야 가능한걸로 알고 있음

//아직 못한거 : 시간 설정, 인자 받아올 줄 몰라서 그룹마다 다르게 구현 안함 / 먹통된 파이어베이스만 잘 끌어오면 끝 / 
/*
1. 시간 어떻게 받아올까
2. 아무것도 없을 때 화면 구성하기
*/

/*var origin_diary = [
    {
        img : "",
        title:"A",
        tag:["firebase","trouble"]
    },
    {
        img: imgTest,
        title:"B",
        tag:["trouble"]
    },
    {
        img:imgTest,
        title:"C",
        tag:["Hate","firebase"]
    }
]*/
/*가끔 두번 되는 오류 있으므로 주의 */
var fil;
var diary = [];
//&을 기본으로 설정했다. 
///먼저 들어간 순으로 나온다.


function Diary(props){
    const history = createBrowserHistory({forceRefresh: true });;
    console.log(history);
    const name= props.location.state.group;
    const user = props.location.state.user;
    const ref = db.collection("Groups").doc(name).collection("Diary");
    var size = 1900;
    var zoom = window.innerWidth / size 
    document.body.style.zoom = zoom;
    fil = props.match.params.id; //filter 받아오는거
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState(fil=='&'?'':fil);
    const searching = (evt)=>{
        setSearch(evt.target.value)
    }
    function gotoComponent(){
        history.push({pathname:'/component', state: {group: name, user:props.location.state.user}});
    }



    function gotopost(id){
        history.push({pathname:'/openDiary/'+id, state : {group: name, user:props.location.state.user}})
    }
    

    function filter(fi,his){
        if(fi=='') {
            his.push({pathname :'/Diary/&', state : {group: name, user:props.location.state.user}})
        }
        else {
            his.push({pathname :'/Diary/'+fi, state : {group: name, user:props.location.state.user}})
    }
        
    };

    const mounted = useRef(true);
    //망할 파이어베이스 때문에 잠깐 먹통이 된 녀석 아래 없애고 하면 될꺼임
    useEffect(()=>{
        function loading (){
            console.log("hihi");
            ref.get().then((querySnapshot)=>{
                //console.log(diary);
                if(diary.length==0){   
                    querySnapshot.forEach((doc,i) => {
                        var data = doc.data();
                        console.log(fil);
                        if(fil!='&') {
                            if(typeof data["Tag"].find(e=>fil.toLowerCase()==e.toLowerCase())=="undefined") return;
                        }
                        diary.push({date:data["Date"], title:data["Title"], tag:data["Tag"], img:data["Img"], id:doc.id}); //여긴 테스트용 사진 넣어둠
                        //date바꾸는 법만 알면 끝
                        console.log(diary); 
                    })
                }
                setLoad(true);
            })
        }
        loading();
        
    },[load]);
    /*if(diary.length==0){
        origin_diary.forEach((doc)=>{
            if(fil!='&') {
                if(doc.tag.filter(e=>fil.toLowerCase()==e.toLowerCase()).length==0) return;
            }
            diary.push(doc);
        })
    }
    if(diary.length==0) 
    return(
        <div>
        <body>
            <h1 class = "theme">Diarys</h1>
            <div class = "search">
                <input value = {search} class = "tagsearch" id = "search" type = "text" onChange = {searching} autofocus onKeyPress={e=>{if(e.key=='Enter') filter(search)}}/>
                <div onClick={()=>{filter(search)}} style={{margin:"10px"}}><img src= {search_icon} style={{maxHeight:"50px"}}/></div>
            </div>
            <GoSearch  class = "mag" style ={{maxWidth:'10px'}}/>
            <div id="nothing_search">No results were found for your search : {fil}</div>
        </body>
        <Menubar/>
        </div>
    ) */
    console.log(diary);
    if(!load) return(<div>Loading</div>);
    if(diary.length===0)
        return(
            <div>
            <body>
                <h1 class = "theme">Diarys</h1>
                <button id= "new_post" onClick={gotoComponent}>+New Posting</button>
                <div class = "search">
                    <input value = {search} class = "tagsearch" id = "search" type = "text" onChange = {searching} autofocus onKeyPress={e=>{if(e.key=='Enter') filter(search,history)}}/>
                    <div onClick={()=>{filter(search,history)}} style={{margin:"10px"}}><img src= {search_icon} style={{maxHeight:"50px"}}/></div>
                </div>
                <GoSearch  class = "mag" style ={{maxWidth:'10px'}}/>
                <div id="nothing_search">No results were found for your search : {fil}</div>
            </body>
            <Menubar group={props.location.state.group} user={props.location.state.user}/>
            </div>
            ) 
        return(
            <div>
            <body>
                <h1 class = "theme">Diarys</h1>
                <button id= "new_post" onClick={gotoComponent}>+New Posting</button>
                <div class = "search">
                    <input value = {search} class = "tagsearch" id = "search" type = "text" onChange = {searching} onKeyPress={e=>{if(e.key=='Enter') filter(search,history)}}/>
                    <div onClick={()=>{filter(search,history)}} style={{margin:"10px"}}><img src= {search_icon} style={{maxHeight:"50px"}}/></div>
                </div>
                <ul class="mylist">
                {
                    diary.map((info)=>{
                    return(
                    <li class = "diary_d" id ={info.id}>
                        <table id = "table" class="diarytable_d">
                            <tr><td class = "img" onClick = {()=>{gotopost(info.id)}}><img src={info.img} alt="NO IMAGE" class = "set_img"/></td></tr>
                            <tr><td class = "date">{info.date.year}.{info.date.month}.{info.date.day}</td></tr>
                            <tr><td class = "title" onClick = {()=>{gotopost(info.id)}}>{info.title}</td></tr>
                            <tr><td class = "tag">
                                {
                                    info.tag.map((t)=>{
                                        return(
                                            <span onClick={()=>{filter(t,history)}}>#{t}        </span>
                                        )
                                    })
                                }
                                </td></tr>
                        </table>
                    </li>)
                    
                    })
                }
                
                </ul>
            </body>
            <Menubar group={name} user={props.location.state.user}/>
            </div>
        )

};

export default withRouter(Diary);