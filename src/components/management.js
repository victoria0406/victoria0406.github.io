import React,{useEffect, useState} from 'react';
import Pagination from './Pagination';
import {Link} from 'react-router-dom';
import {paginate} from './paginate';
import '../style/table.css';
import {db,firebaseApp, firebase} from "../firebase.js"
import { useScrollTrigger } from '@material-ui/core';
import Menubar from './menu';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';


const MoviesPage = (props) =>{
    var mygroup=props.location.state.group;
    var user=props.location.state.user;
    var size = 1520;
    var zoom = window.innerWidth / size 

    document.body.style.zoom = zoom;


    async function getch(){
        var groups=[];
        var challenges=[];
        var state=[];
        var mileages=[];
        await db.collection("Groups").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                groups.push(doc.id);
                challenges.push([doc.data().challenge]);
                mileages.push([doc.data().mileage]);
            });
        });
        var mychallenge=[];
        var mymileage=0;
        for (var i=0;i<groups.length;i++){
            if(groups[i]==mygroup) {
                mychallenge=challenges[i];
                mymileage=mileages[i];
            }
        }
        
        return [mychallenge,mymileage];
    }
    
    const [mychallenges,setChallenge]=useState([]);
    const [mymileage,setMileages]=useState([]);
    useEffect(()=>{
        async function fetchAndSetUser(){
            const data=await getch();
            await setChallenge(data[0][0]);
            await setMileages(data[1][0]);
        } 
        fetchAndSetUser();
    },[])
    //console.log(mymileage)

    function numberWithCommas(x) {
        return (x+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var state=[];
    var mystate=[];
    for (var idx=0;idx<mychallenges.length;idx++){
        state.push([mychallenges[idx].send,mychallenges[idx].accept])
    }
    ////console.log(state);
    for (var i=0;i<state.length;i++){
        var check="";
        if(state[i][0]==1 && state[i][1]==1) check="accepted";
        else if(state[i][0]==1 && state[i][1]==0) check="wait";
        else if(state[i][0]==0) check="receive";
        else if(state[i][1]==2) check="win";
        else if(state[i][1]==3) check="lose";
        else if(state[i][1]==4) check="tie";
        mystate.push(check);
    }
    //console.log(mystate);
    
    function lose_button(index){
        var docRef=db.collection("Groups").doc(mygroup);
        
        mychallenges[index].accept=3; //3->lose

        const store=mychallenges;

        docRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });
        for (var i=0;i<store.length;i++){
            var new_challenge={
                accept:store[i].accept,
                bet:store[i].bet,
                contents:store[i].contents,
                date:store[i].date,
                send:store[i].send,
                withgroup:store[i].withgroup
            }
            docRef.update({
                challenge:firebase.firestore.FieldValue.arrayUnion(new_challenge)
            });
        }
        docRef.update({
            mileage: mymileage-mychallenges[index].bet
        });
    }
    function win_button(index){
        var docRef=db.collection("Groups").doc(mygroup);
        
        mychallenges[index].accept=2; //2->win

        const store=mychallenges;

        docRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });
        for (var i=0;i<store.length;i++){
            var new_challenge={
                accept:store[i].accept,
                bet:store[i].bet,
                contents:store[i].contents,
                date:store[i].date,
                send:store[i].send,
                withgroup:store[i].withgroup
            }
            docRef.update({
                challenge:firebase.firestore.FieldValue.arrayUnion(new_challenge)
            });
        }
        docRef.update({
            mileage: mymileage+mychallenges[index].bet
        });
    }
    function tie_button(index){
        var docRef=db.collection("Groups").doc(mygroup);
        
        mychallenges[index].accept=4; //4->tie

        const store=mychallenges;

        docRef.update({
            challenge: firebase.firestore.FieldValue.delete()
        });
        for (var i=0;i<store.length;i++){
            var new_challenge={
                accept:store[i].accept,
                bet:store[i].bet,
                contents:store[i].contents,
                date:store[i].date,
                send:store[i].send,
                withgroup:store[i].withgroup
            }
            docRef.update({
                challenge:firebase.firestore.FieldValue.arrayUnion(new_challenge)
            });
        }
    }

    
    console.log(mychallenges)
    var gg=[];
    for (var k=0;k<mychallenges.length;k++){
        const ele={
            date: mychallenges[k].date,
            withgroup:mychallenges[k].withgroup,
            bet: mychallenges[k].bet,
            state:mystate[k]
        }
        gg.push(ele);   
    }
    console.log(gg);

    for (var l=0;l<mystate.length;l++){
        if(mystate[l]=="accepted"){
            const index=l;
            gg[l].state=<div><Link to={{pathname :'./win', state : {group: props.location.state.group, user:props.location.state.user}}}><button className = "win" onClick={(e)=>win_button(index)}>WIN!</button></Link>&nbsp;&nbsp;<button className = "lose" onClick={(e)=>lose_button(index)}>LOSE</button>&nbsp;&nbsp;<button className = "tie" onClick={(e)=>tie_button(index)}>TIE</button></div>
        }
        else if(mystate[l]=="wait") gg[l].state=<div className="wait">Challenge Sent!</div>
        else if(mystate[l]=="receive") gg[l].state=<div><button className = "win">WIN!</button>&nbsp;&nbsp;<button className = "lose">LOSE</button>&nbsp;&nbsp;<button className = "tie">TIE</button></div>
        else if(mystate[l]=="win") gg[l].state=<div className="real_win">WIN!</div>
        else if(mystate[l]=="lose") gg[l].state=<div className="real_lose">LOSE</div>
        else if(mystate[l]=="tie") gg[l].state=<div className="real_tie">TIE</div>
    }


    // function getMovies(gg){
    //     const movies = gg;
    //     return movies;
    // }

    const getMovies = () => {
        const movies = mychallenges;
        console.log(gg)
        console.log(movies)
        return movies;
    }
    
    const [movies, setMovies] = useState({
        data: getMovies(),
        pageSize: 5,
        currentPage: 1  
    });
    console.log(movies);
    
    const handlePageChange = (page) => {
       setMovies({...movies, currentPage: page});
    }
    
    const{ data, pageSize, currentPage } = movies;
    const pageMovies = paginate(gg.reverse(), currentPage, 5);
    const {length: count } = gg;

    return (
        <>
            <header className = "App-header">
            <div className="team-name"> {mygroup} </div>
            <div className="mileage"> {numberWithCommas(mymileage)} </div>
            <div className="m">mileage</div>
            <Link to={{pathname :'./mileage', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="mm1">MILEAGE</button></Link>
            <Link to={{pathname :'./challenge', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="mm2">CHALLENGE</button></Link>
            <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}> <button className="mm3">MANAGEMENT</button> </Link>             
            {/* <div className = "table_shape"></div> */}
            <div className = "table_shape"></div>
            <div className = "table_line"></div>
            <table className="table">
                <thread>
                    <tr>
                        <th width = "230" className="table_group">DATE</th>
                        <th width = "300" className="table_group">Group Name</th>
                        <th width = "220" className="table_group">Betting Mileage</th>
                        <th width = "300" className="table_state">State</th>
                    </tr>
                
                <tbody>
                    {pageMovies.map(movie =>
                        <tr key={movie.id} width = "600">
                            <td width = "230" text-align = 'center'className="table_group" >{movie.date}</td>
                            <td width = "300" text-align = 'center' className="table_group">{movie.withgroup}</td>
                            <td width = "220" text-align = 'center' className="table_group">{numberWithCommas(movie.bet)} M</td>
                            <td width = "300" text-align = 'center'>                      
                                {movie.state}
                            </td>
                        </tr>
                    )}
                </tbody>
                </thread>
            </table>
            <Menubar group={props.location.state.group} user={props.location.state.user}/>
            <Pagination
                pageSize = {5}
                itemsCount = {count}
                currentPage = {currentPage}
                onPageChange = {handlePageChange}                
            />
          </header>
  
        </>
    );
};

export default MoviesPage;