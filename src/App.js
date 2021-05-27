import './style/App.css';
import challengesend from './components/challenge-send';
import management from './components/management';
import challenge from './components/challenge';
import mileage from './components/mileage';
import win from './components/win';
import check from './components/check';
import Login from './components/login';
import Group from './components/group';
import DiaryPage from './components/Diary'; 
import MainPage from './components/main';
import ComponentPage from './components/component';
import OpenDiary from './components/openDiary';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";



function App() {
  return (
    <Router>
      <switch>
        <Route path="/challenge-send" exact component={challengesend}/>
        <Route path="/management" exact component={management}/>
        <Route path="/challenge" exact component={challenge}/>
        <Route path="/mileage" exact component={mileage}/>
        <Route path="/win" exact component={win}/>
        <Route path="/check" exact component={check}/>
        <Route path="/login" exact component ={Login}/>
        <Route path="/group/:id" exact component = {Group}/>
        <Route path='/main' component={MainPage} />
        <Route path='/diary/:id' component={DiaryPage} /> 
        <Route path='/component' component={ComponentPage} />
        <Route path='/openDiary/:id' component={OpenDiary}/>
      </switch>
    </Router>
  );
}

export default App;