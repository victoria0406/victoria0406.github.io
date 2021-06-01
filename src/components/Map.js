import React, { Component, useEffect, useState } from 'react';
import '../style/Map.css';

//import { GoogleApiWrapper, GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
//import Hexbin from './Hexbin.js';
import { Map, GoogleApiWrapper, Marker ,InfoWindow ,google, maps, OverlayView } from 'google-maps-react';
import {db, firebaseApp, firebase} from '../firebase';
import { Link } from 'react-router-dom';
import tree1  from '../tree1.png'
import tree2  from '../tree2.png'
import tree3  from '../tree3.png'
import tree4  from '../tree4.png'
import tree5  from '../tree5.png'
import tree6  from '../tree6.png'
import tree1_mine  from '../tree1_mine.png'
import tree2_mine  from '../tree2_mine.png'
import tree3_mine  from '../tree3_mine.png'
import tree4_mine  from '../tree4_mine.png'
import tree5_mine  from '../tree5_mine.png'
import tree6_mine  from '../tree6_mine.png'
//import fakeStoreLatLngData from './data/generated-data.json';
//import Hexbin from './Hexbin';
//수정 금지 (사이즈 건들면 줌인줌아웃 불가능)

var M_MAX = 500000;

var group_info=[
  {
    name:'FOOTBALL LOVE',
    exercise:'football',
    position:
    {lat: 37.520388,
    lng: 126.878939},
    my:false,
    mileage :0
  },
  {
    name:'HEALTHERS',
    exercise:'health',
    position:
    {lat: 37.666916,
    lng: 126.928681},
    my:false,
    mileage :0
  },
  {
    name:'HELLO BADMINTON',
    exercise:'badminton',
    position:
    {lat: 37.53448,
    lng: 127.169411},
    my:false,
    mileage :0
  },
  {
    name:'KAIST FUTSAL',
    exercise:'futsal',
    position:
    {lat: 37.658357,
    lng: 127.170501},
    my:false,
    mileage :0
  },
  {
    name:'POSTECH FUTSAL',
    exercise:'futsal',
    position:
    {lat: 37.520388,
    lng: 126.778939},
    my:false,
    mileage :0
  },
  {
    name:'YO! YOGA!',
    exercise:'yoga',
    position:
    {lat: 37.578163,
    lng: 127.033618},
    my:false,
    mileage :0
  },
  {
    name:"let's_football",
    exercise:'football',
    position:
    {lat: 37.601069,
    lng: 127.080402},
    my:false,
    mileage :0
  },
  {
    name:"BADMINTON LOVERS",
    exercise:'badminton',
    position:
    {lat: 37.501069,
    lng: 127.180402},
    my:false,
    mileage :0
  },
  {
    name:"HI BADMINTON",
    exercise:"badminton",
    position:
    {lat: 37.758357,
    lng: 127.070501},
    my:false,
    mileage:0
  }
];
const ref = db.collection("Groups");
  group_info.map((info)=>{
    ref.doc(info.name).get().then((doc)=>{info.mileage = doc.data()["mileage"]})})

class Mapping extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    infonum:0,
    position:group_info[5].position
  };
 
  onMarkerClick = (props, marker, e) =>{
    console.log(props.id);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      infonum:props.id
    });
  }
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  choosetree = (mileage,mine)=>{
    var section = Math.ceil(mileage*6/M_MAX);
    console.log(section);
    if(mine){
      if (section==1) return tree1_mine;
    else if (section==2) return tree2_mine;
    else if (section==3) return tree3_mine;
    else if (section==4) return tree4_mine;
    else if (section==5) return tree5_mine;
    else return tree6_mine;
    }else{
      if (section==1) return tree1;
    else if (section==2) return tree2;
    else if (section==3) return tree3;
    else if (section==4) return tree4;
    else if (section==5) return tree5;
    else return tree6;
    }
    
  }
 
  render() {
    for(const gr of group_info){
      console.log(this.props.mygroups);
      for(const mg of this.props.mygroups){
        if(gr.name==mg) gr.my =true;
        console.log("1");
      }
    }
    console.log("2");
    return (
      <Map 
          google={this.props.google}
          onClick={this.onMapClicked}
          style={{
            width: '1000px',
            height: '800px',
            margin:'100px'
          }}
          zoom ={11}
          initialCenter={this.state.position}
        >
        {
            group_info.map((info,i)=>{
              console.log(info);
                return (
                  <Marker 
                    key = {info.name}
                    id = {i}
                    onMouseover={this.onMarkerClick}
                    position={info.position}
                    icon = {this.choosetree(info.mileage,info.my)}
                    >
                  </Marker>
                  )
                })
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <div id="info_name">{group_info[this.state.infonum].name}</div>
            <div class="detail">exercise:{group_info[this.state.infonum].exercise}</div>
            <div class="detail">{group_info[this.state.infonum].mileage}M</div>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAIxMT8Fmf2x29HpszTaSZE_xMf-m6AJ4c'
})(Mapping);