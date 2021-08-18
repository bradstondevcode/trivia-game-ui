import React, {Component } from 'react';
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

class SelectRole extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	socket: null
	    };

	}

	async componentDidMount(){
		// this.setState({socket: this.props.socket})
	}

	componentWillUnmount(){

	}

	startHost(){
		console.log("Host")
		console.log(this.props)
		this.props.history.push('/hostPassword');
	}

	startPlayer(){
		console.log("Player")
		console.log(this.state.socket)
		this.props.history.push('/enterRoomID');
	}

	render(){

		return (
			<Container style={styles.viewContainer}>

				<Button onClick={() => this.startHost()}>
					Host
				</Button>
				<Button onClick={() => this.startPlayer()}>
					Player
				</Button>


			</Container>
		);
	}
}

export default SelectRole;