import React, {Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Row, Container } from 'react-bootstrap';

import socketIOClient from 'socket.io-client'

let styles = {
	viewContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
	},
	beanOverlay: {
	    alignSelf: 'center',
	    position: 'absolute',
	    width: 1100,
	    display: 'flex',
	    center: 0,
	},
	jellyBeanLogo: {
		alignSelf: 'flex-start',
	    position: 'absolute',
	    display: 'flex',
	    top:'2vw',
	    left:'2vw',
	    width: '20vw',
	    height: '20vh'
	},
	physicsViewport: {
		marginTop: '5vh',
		border: '4px solid white'
	},
	jellyBeanButton: {
	    width: '15vw',
	    fill: 'red',
	    stroke: 'green'
	},
	jellyBeanButtonText: {
		position: 'absolute',
		display: 'flex',
		center: 0,
		fontSize: '1.5vw',
		fontWeight: 'bold'
	},
	bottomButtonRow: {
		display: 'flex',
		bottom: 0,
	},
	credits: {
		position: 'absolute',
		fontSize: '1.5vw',
		textAlign: 'center',
		bottom: '3vw',
		right: '3vw',
		color: '#E6E6E6'
	}
}

class HostPassword extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	password: ""
	    };

	}

	async componentDidMount(){

		this.props.socket.on("CreateRoomFailed", () => {
        
			console.log("Room Creation Failed")
		});

		this.props.socket.on("CreatedRoomWithID", (roomData) => {

			let playerID = localStorage.getItem('playerID')
			let username = localStorage.getItem('username')
        
			console.log("Room Creation Succeded")
			console.log(roomData)

			this.props.socket.emit("JoinRoomWithID", {roomID: roomData.roomID, username: username })

		});

		this.props.socket.on("SuccessfullyJoinedRoom", (roomData) => {
        
			console.log("roomData: " + roomData)
			this.props.history.push({pathname: '/hostGame', state: roomData});
			
		});

	}

	componentWillUnmount(){

	}

	setPassword(password){
		this.setState({password: password})
	}


	submitPassword(){
		let username = localStorage.getItem('username')
		this.props.socket.emit("CreateRoomWithID", {password: this.state.password, username: username});
	}

	render(){

		return (
			<Container style={styles.viewContainer}>

				<TextField id="standard-basic" label="Enter Password" value = {this.state.password} onChange={(event) => this.setPassword(event.target.value)}/>
				<Button onClick={() => this.submitPassword()}>
					Submit Password
				</Button>

			</Container>
		);
	}
}

export default HostPassword;