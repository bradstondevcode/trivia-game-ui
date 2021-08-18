import React, {Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Row, Container } from 'react-bootstrap';

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

class EnterRoomID extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	roomID: "",
	    	roomName: "",
	    };

	}

	async componentDidMount(){

		this.props.socket.on("WasRoomIDValid", (roomValid) => {
        
			console.log("Is RoomID Valid: " + roomValid)

			if(roomValid){
				let playerID = localStorage.getItem('playerID')
				let username = localStorage.getItem('username')

				this.props.socket.emit("JoinRoomWithID", {roomID: this.state.roomID, username: username })
				console.log("Room ID is Valid")
			} else {
				console.log("Room ID is NOT Valid")
			}
			
		});

		this.props.socket.on("SuccessfullyJoinedRoom", (roomData) => {
        
			console.log("roomData:")
			console.log(roomData)
			this.props.history.push({pathname: '/playerGame', state: {roomID: this.state.roomID, roomName: roomData.roomName}});
			
		});

		

	}

	setRoomID(roomID){
		console.log(roomID)
		this.setState({roomID: roomID})
	}


	submitRoomID(){
		console.log("Room ID Submitted: " + this.state.roomID)
		this.props.socket.emit("CheckIfRoomIDIsValid", this.state.roomID)
	}

	render(){

		return (
			<Container style={styles.viewContainer}>

				<TextField id="standard-basic" label="Enter Room ID" value = {this.state.roomID} onChange={(event) => this.setRoomID(event.target.value)}/>
				<Button onClick={() => this.submitRoomID()}>
					Submit Room ID
				</Button>

			</Container>
		);
	}
}

export default EnterRoomID;