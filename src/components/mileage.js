import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../style/mileage.css';
import imgfile from '../ranking.png';
import imgfile2 from '../goal.png';
import imgfile3 from '../1st.png';
import imgfile4 from '../2nd.png';
import imgfile5 from '../3rd.png';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {db,firebaseApp, firebase} from "../firebase.js";
import Menubar from './menu2';



function Mileage(props){
    var size = 1520;
    var zoom = window.innerWidth / size 

    document.body.style.zoom = zoom;

    async function rank(){ 
        var mileages=[]; 
        var rankedgroup=[];
        var rank=[];
        var gm=[];
        var order=[];
        var uids=[];
        var users=[];
        var my_goals=[];
    
        await db.collection("users").get().then((querySnapshot)=>{
            
            querySnapshot.forEach((doc) => {
                uids.push(doc.id);
                users.push(doc.data().goal);
            });
        });
        //console.log([users])
        
        await db.collection("Groups").get().then((querySnapshot) => {
            var groupnames=[];
            //var mileages=[];
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                groupnames.push(doc.id);
                // //console.log(doc.id, " => ", doc.data());
                mileages.push([doc.data().mileage,mileages.length]);
                gm.push(groupnames);
                gm.push(mileages);
                order.push(doc.data().mileage)
                order.sort(function(a, b)  {
                    return b - a;
                  });
                rank=order.slice(0,6);
            });
            var ranking=[];
            for(var i=0;i<6;i++){
                for (var j=0;j<mileages.length;j++){
                    if(mileages[j][0]==order[i]) ranking.push(mileages[j][1]);
                }
            }
            //var rankedgroup=[];
            for(var k=0;k<ranking.length;k++){
                rankedgroup.push(groupnames[ranking[k]]);
            }
            
            for (var idx=0;idx<uids.length;idx++){
                if(uids[idx]==user) my_goals=users[idx];
            }
            //console.log(rankedgroup);
            //b = rankedgroup;
            ////console.log(b);
            //return rankedgroup;
            
        });
        //console.log(order)
              
    
        return [rankedgroup,rank,gm,order,my_goals];
    }

    var size = 1474;
    var zoom = window.innerWidth / size 

    document.body.style.zoom = zoom;

    var mygroup=props.location.state.group;
    var user=props.location.state.user;
    console.log(mygroup);
    console.log(user);

    const hstyle = {
        display: "none"
    }

    const hstyle2 = {
    }
    const [ranks, setRanks] = useState([]);
    const [mileages, setMileages] = useState([]);
    const [mymileages, setmyM]=useState([]);
    const [myRanking, setmyR]=useState([]);
    const [goals,setGoals]=useState([]);
    const [numbers,setN]=useState([]);
    const [cname, setCname] = useState("goal-inner");
    const [style, setStyle] = useState(hstyle);
    const [add_goal, setAddgoal] = useState("");

    useEffect(() =>{
        async function fetchAndSetUser() { 
            const data = await rank();
            function numberWithCommas(x) {
                return (x+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            var comma=[];
            for (var i=0;i<6;i++){
                comma.push(numberWithCommas(data[1][i]));
            }
            var names=data[2][0];
            var rami=data[2][1];
            var mm;
            for (var j=0;j<names.length;j++){
                if(names[j]==mygroup) mm=rami[j];
            }
            for (var k=0;k<data[3].length;k++){
                if(data[3][k]==mm[0]) await setmyR(k+1);
            }
            console.log(rami);
            await setmyM(numberWithCommas(mm[0]));
            //console.log(data)
            await setN(mm[0]);
            await setRanks(data[0]);
            await setMileages(comma);
            await setGoals(data[4].reverse());
            //console.log(ranks)
           }
        fetchAndSetUser();
        // mileage1 = await rank()
        // //console.log(mileage1)
        // setRanks(mileage1[0])
        // //console.log(ranks)
    },)
    //console.log(ranks)
    //console.log(mileages)
    //console.log(mymileages)
    //console.log(myRanking)
    console.log(goals)

    const add_row = async() => {
        console.log("add in the table");
        //<div className="goal-inner" style={{height : "30px"}}/>
        await setCname("goal-inner_2");
        await setStyle(hstyle2);
        console.log(cname);
    };

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {
            var add = {
                goal : add_goal,
                state : "ing"
            }
            var docRef = db.collection("users").doc(user);

            docRef.update({
                goal: firebase.firestore.FieldValue.arrayUnion(add)
            });
        
            setStyle(hstyle);
            setCname("goal-inner");
        }
    };

    const onGoalHandler = (event) => {
        setAddgoal(event.target.value)
        console.log(add_goal);
    }



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        //console.log("dkdkdkdkdk");
        setOpen(false);

    };

    const remove = () => {
        const num = 1
        
    }

    const getMovies = () => {
        const movies = goals
        return movies;
    }

    const [movies, setMovies] = useState({
        data: getMovies
    });

    function success_button(rgoal, rstate,l){
        
        var docRef = db.collection("users").doc(user);
        
        goals[l].state=rstate
        
        console.log(goals);
        const store=goals.reverse();
        //console.log(store);
        docRef.update({
            goal: firebase.firestore.FieldValue.delete()
        });
        //console.log(store);
        for (var i=0;i<store.length;i++){
            var new_goal = {
                goal: store[i].goal,
                state : store[i].state
            }
            //console.log(new_goal);
            docRef.update({
                goal: firebase.firestore.FieldValue.arrayUnion(new_goal)
            });
        }
        var docRef1 = db.collection("Groups").doc(mygroup);
        if (rstate=="success"){
            handleClickOpen();
            docRef1.update({
                mileage:numbers+5000
            });
        } 
        //console.log([rgoal,rstate,l])
    }

    var gg=[];
    for (var i=0;i<goals.length;i++){
        const ele={
            goal: goals[i].goal,
            state: goals[i].state
        }
        gg.push(ele);
    }
    ////console.log(gg);
    for (var l=0;l<goals.length;l++){
        if (goals[l].state=="success") gg[l].state=<div className="success">Success!</div>
        else if (goals[l].state=="fail") gg[l].state=<div className="fail">Fail</div>
        else if (goals[l].state=="ing")
        {   const rgoal=gg[l].goal;
            const index=l;
            gg[l].state=<div>
                <button className="SButton" onClick={(e)=>success_button(rgoal, "success",index)}>Success</button><button className="FButton" onClick={(e)=>success_button(rgoal, "fail",index)}>Fail</button>
                </div>
        }
    }

    

    return(
        <body >
            <div className="App-header">
        <header className="header">
        <div className="team-name"> {mygroup} </div>
        <div className="mileage"> {mymileages} </div>
        <div className="m">mileage</div>
        <Link to={{pathname :'./mileage', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="M-1">MILEAGE</button></Link>
        <Link to={{pathname :'./challenge', state : {group: props.location.state.group, user:props.location.state.user}}}><button class ="M-2">CHALLENGE</button></Link>
        <Link to={{pathname :'./management', state : {group: props.location.state.group, user:props.location.state.user}}}><button className="M-3">MANAGEMENT</button> </Link>
        <div className="goal"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;GOAL</div>
        <div className={cname} > 
                <table className="table1">
                        <thread>
                        <tbody >
                            {gg.map(movie =>
                                <tr key={movie.id} width = "600">
                                    <td width = "500" text-align = 'center' className = "m_Td">{movie.goal}</td>
                                    <td width = "300" text-align = 'center' className = "m_Td"> 
                                        {movie.state}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        </thread>
                    </table>
                
            </div>
        <div className="ranking"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;RANKING</div>
        <button className="plus" onClick={add_row} >+</button>
        <input type = "text" className = "inputgoal" style={style} onKeyPress={handleKeyPress} onChange={onGoalHandler} value = {add_goal}/>
        <div className="line"></div>
        <div className="line2"></div>
        <div className="rec1"></div>
        <div className="cir1"></div>
        <div className="rec2"></div>
        <div className="cir2"></div>
        <img className="Goalimg" src={imgfile2}/>
        <img className="Rankimg" src={imgfile} />
        <div className="Our">My Group: No. {myRanking}</div>
 
        <div className="first"></div>
        <img className="star1" src={imgfile3}/>
        <div className="team1">1st</div>
        <div className="team-name1">{ranks[0]}</div>
        <div className="mileage1">{mileages[0]}</div>
        <div className="mileage-1">mileage</div>
        <div className="second"></div>
        <img className="star2" src={imgfile4}/>
        <div className="team2">2nd</div>
        <div className="team-name2">{ranks[1]}</div>
        <div className="mileage2">{mileages[1]}</div>
        <div className="mileage-2">mileage</div>
        <div className="third"></div>
        <img className="star3" src={imgfile5}/>
        <div className="team3">3rd</div>
        <div className="team-name3">{ranks[2]}</div>
        <div className="mileage3">{mileages[2]}</div>
        <div className="mileage-3">mileage</div>
        <div className="fourth">&nbsp;&nbsp;&nbsp;4</div>
        <div className="mileage4">{mileages[3]}</div>
        <div className="team-name4">{ranks[3]}</div>
        <div className="mileage-4">mileage</div>
        <div className="fifth">&nbsp;&nbsp;&nbsp;5</div>
        <div className="mileage5">{mileages[4]}</div>
        <div className="team-name5">{ranks[4]}</div>
        <div className="mileage-5">mileage</div>
        <div className="sixth">&nbsp;&nbsp;&nbsp;6</div>
        <div className="mileage6">{mileages[5]}</div>
        <div className="team-name6">{ranks[5]}</div>
        <div className="mileage-6">mileage</div>
        <Menubar group={props.location.state.group} user={props.location.state.user}/>
        </header>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" >+5,000M</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Congratulations on reaching your goal!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Get Mileage!
            </Button>
            </DialogActions>
            </Dialog>     
    </div>
        </body>
    );
}

export default Mileage;