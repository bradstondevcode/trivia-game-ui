import React, {useEffect, useState } from 'react';
import './App.css';

import SelectRole from './components/pages/SelectRole'
import HostPassword from './components/pages/HostPassword'
import EnterRoomID from './components/pages/EnterRoomID'
import HostGame from './components/pages/HostGame'
import PlayerGame from './components/pages/PlayerGame'

import socketIOClient from 'socket.io-client'

import {socket} from './services/socket'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 

function App() {

  let playerID = localStorage.getItem('playerID')
  let username = localStorage.getItem('username')

  useEffect(() => {
    console.log(`Saved Player ID: ${playerID}`)

    if(!playerID){

      socket.on("SetPlayerID", playerData => {
        
        localStorage.setItem('playerID', playerData.playerID)
        localStorage.setItem('username', playerData.username)
        console.log(`New Created Player ID: ${playerData.playerID}`)
        console.log(`New Created Username: ${playerData.username}`)

        socket.emit("PlayerConnected", playerData)
      });

      socket.emit("CreatePlayerID")
    } 
    else {
      socket.emit("PlayerConnected", {playerID: playerID, username: username})
    }

    return () => {
      socket.emit("DisconnectPlayer", {playerID: playerID, username: username});
      socket.off("SetPlayerID")
      socket.disconnect();
    }

  }, []);

  return (
    <Router >
      <div style={{height: '100vh'}} className="App">
      
        <Switch>

          <Route 
            render={(props) => (
              <SelectRole {...props} socket={socket} />
            )}
            exact path="/"
          />

          <Route 
            render={(props) => (
              <HostPassword {...props} socket={socket} />
            )}
            exact path="/hostPassword"
          />

          <Route 
            render={(props) => (
              <EnterRoomID {...props} socket={socket} />
            )}
            exact path="/enterRoomID"
          />

          <Route 
            render={(props) => (
              <HostGame {...props} socket={socket} />
            )}
            exact path="/hostGame"
          />

          <Route 
            render={(props) => (
              <PlayerGame {...props} socket={socket} />
            )}
            exact path="/playerGame"
          />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
