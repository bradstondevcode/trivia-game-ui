import React, {Component } from 'react';
import { Row, Container, Button } from 'react-bootstrap';


let styles = {
	buttonContainer: {
		// backgroundColor: 'lightgray',
		flex: 1,
	},
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

class AnswerButton extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	socket: null,
	    	basicVariant: 'outline-dark',
	    	isSelected: false
	    };

	}

	async componentDidMount(){
		// this.setState({socket: this.props.socket})
		console.log(this.props)
	}

	componentWillUnmount(){

	}

	buttonPress(){
		console.log(this.props)
	}

	answerSelected(){
		// if(!this.props.showAnswer){
			this.props.selected()
			this.setState({variant: "primary"})
		// }
	}

	render(){

		var {label, showAnswer, correctAnswer, isSelected} = this.props
		var {variant, basicVariant} = this.state
		var isCorrectButtonColor = basicVariant
		var currentVariantStyle = basicVariant

		if(isSelected){
			currentVariantStyle = "primary"
		}

		if(showAnswer){
			if(label == correctAnswer){
				isCorrectButtonColor = "success"
			} else {
				if(isSelected){
					isCorrectButtonColor = "danger"
				}
			}
		}

		return (
			<Button 
			style={styles.buttonContainer}
				variant={ showAnswer ? isCorrectButtonColor : currentVariantStyle} 
				onClick={() => this.answerSelected()}>
					{label ? label : "No Data"}
			</Button>
		);
	}
}

export default AnswerButton;