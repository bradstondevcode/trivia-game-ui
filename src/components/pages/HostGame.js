import React, {Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Row, Container } from 'react-bootstrap';

import AnswerButton from '../AnswerButton'

import ShowAnswerButton from '../AnswerButton'

import socketIOClient from 'socket.io-client'

let styles = {
	viewContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
	},
	questionContainer: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	showGameContainer: {
		marginBottom: 15,
	},
	questionNumberText: {
		fontWeight: 'bold',
		fontSize: 15,
	},
	questionNumberContainer: {
		marginBottom: 10,
		marginTop: 10
	},
	answerButtonRow: {
		display: 'flex',
		justifyContent: 'center',
	},
	showAnswersContainer: {
		marginTop: 20,
		marginBottom: 10,
	},
	endButton: {
		marginTop: 20,
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

class HostGame extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	roomName: "",
	    	triviaQuestions:[],
	    	hasStarted: false,
	    	currentQuestionNum: 0,
	    	showAnswer: false,
	    	answer1Selected: false,
	    	answer2Selected: false,
	    	answer3Selected: false,
	    	answer4Selected: false,
	    	isLoading: false,
	    };
	    this.selectedAnswer = this.selectedAnswer.bind(this);
	}

	async componentDidMount(){

		this.props.socket.on("RecieveQuestions", (triviaQuestionsData) => {
        
			console.log("Recieved Questions!")
			console.log(triviaQuestionsData.questions[0])
			this.setState({triviaQuestions: triviaQuestionsData.questions})
		});

		this.props.socket.emit("GetQuestions")

	}

	componentWillUnmount(){

	}


	nextQuestion(){
		this.setState({isLoading: true, showAnswer: false, answer1Selected: false, answer2Selected: false, answer3Selected: false, answer4Selected: false}, () => {

			this.setState({isLoading: false})

			if(this.state.hasStarted){
				this.setState({currentQuestionNum: this.state.currentQuestionNum + 1})
				this.props.socket.emit("SendCurrentQuestion", this.state.currentQuestionNum + 1)
			} else {
				this.setState({hasStarted: true})
				this.props.socket.emit("SendGameStatusToAllPlayers", {roomID: this.props.location.state.roomID, hasStarted: true})
				this.props.socket.emit("SendCurrentQuestion", 0)
			}	

		})	
		
	}

	previousQuestion(){
		this.setState({isLoading: true, showAnswer: false, answer1Selected: false, answer2Selected: false, answer3Selected: false, answer4Selected: false}, () => {

			this.setState({isLoading: false})

			if(this.state.hasStarted){
				this.setState({currentQuestionNum: this.state.currentQuestionNum - 1})
				this.props.socket.emit("SendCurrentQuestion", this.state.currentQuestionNum - 1)
			} 	

		})	
	}

	endGame(){
		this.setState({hasStarted: false})
		this.props.socket.emit("SendGameStatusToAllPlayers", {roomID: this.props.location.state.roomID, hasStarted: false})
	}

	selectedAnswer(answerSelected){
		var {triviaQuestions, currentQuestionNum} = this.state

		var currentQuestionData = triviaQuestions[currentQuestionNum]

		if(answerSelected == currentQuestionData["correct"]){
			console.log("Correct Answer Selected")
		} else{
			console.log("Wrong Aswer Selected")
		}

		var answer1 = currentQuestionData.answer1
		var answer2 = currentQuestionData.answer2
		var answer3 = currentQuestionData.answer3
		var answer4 = currentQuestionData.answer4

		if (answerSelected == answer1){
			console.log("1")
			this.setState({answer1Selected: true, answer2Selected: false, answer3Selected: false, answer4Selected: false})
		} else if (answerSelected == answer2) {
			console.log("2")
			this.setState({answer1Selected: false, answer2Selected: true, answer3Selected: false, answer4Selected: false})
		} else if (answerSelected == answer3) {
			console.log("3")
			this.setState({answer1Selected: false, answer2Selected: false, answer3Selected: true, answer4Selected: false})
		} else if (answerSelected == answer4) {
			console.log("4")
			this.setState({answer1Selected: false, answer2Selected: false, answer3Selected: false, answer4Selected: true})
		}


	}

	showAnswerToPlayer(){
		console.log("Sending Show Answer to Players...")
		this.props.socket.emit("ShowAnswerToPlayers", this.props.location.state.roomID)
		this.setState({showAnswer: true})
	}

	render(){

		var {hasStarted, isLoading, triviaQuestions, currentQuestionNum, answer1Selected, answer2Selected, answer3Selected, answer4Selected} = this.state

		var currentQuestionData = triviaQuestions[currentQuestionNum]

		var question, answer1, answer2, answer3, answer4, correctAnswer = ""

		if(currentQuestionData){
			question = currentQuestionData.question
			answer1 = currentQuestionData.answer1
			answer2 = currentQuestionData.answer2
			answer3 = currentQuestionData.answer3
			answer4 = currentQuestionData.answer4
			correctAnswer = currentQuestionData.correct
		}

		return (
			<Container style={styles.viewContainer}>

				<div>{this.props.location.state.roomName} ({this.props.location.state.roomID})</div>

				{(hasStarted && !isLoading)  && 
					<Container style={styles.showGameContainer}>

						<Container style={styles.questionNumberContainer}>
							<div style={styles.questionNumberText}>Question #{currentQuestionNum +1}</div>
						</Container>

						<Container style={styles.questionContainer}>{question}</Container>

						<Container style={styles.answerButtonRow}>
							<AnswerButton 
								isSelected={answer1Selected} 
								label={answer1} 
								correctAnswer={correctAnswer} 
								showAnswer={this.state.showAnswer} 
								selected={() => this.selectedAnswer(answer1)}>
							</AnswerButton>

							<AnswerButton 
								isSelected={answer2Selected} 
								label={answer2} 
								correctAnswer={correctAnswer} 
								showAnswer={this.state.showAnswer} 
								selected={() => this.selectedAnswer(answer2)}>
							</AnswerButton>

						</Container>

						<Container style={styles.answerButtonRow}>
							<AnswerButton 
								isSelected={answer3Selected} 
								label={answer3} 
								correctAnswer={correctAnswer} 
								showAnswer={this.state.showAnswer} 
								selected={() => this.selectedAnswer(answer3)}>
							</AnswerButton>

							<AnswerButton 
								isSelected={answer4Selected} 
								label={answer4} 
								correctAnswer={correctAnswer} 
								showAnswer={this.state.showAnswer} 
								selected={() => this.selectedAnswer(answer4)}>
							</AnswerButton>
						</Container>

						<Container style={styles.showAnswersContainer}>
							<Button variant="warning" onClick={() => this.showAnswerToPlayer()} >SHOW ANSWER TO PLAYERS</Button>
						</Container>

					</Container>
				}


				{hasStarted ?

					<Container>

						
						<Container>
							{ (currentQuestionNum > 0) &&
								<Button variant="outline-secondary" onClick={() => this.previousQuestion()}>
									<div>Previous Question</div>
								</Button>
							}

							{ (currentQuestionNum < 55) &&
								<Button variant="outline-info" onClick={() => this.nextQuestion()}>
									<div>Next Question</div>
								</Button>
							}

						</Container>
						

						<Button style={styles.endButton} variant="outline-danger" onClick={() => this.endGame()}>
							End Game
						</Button>

					</Container>

					:

					<Button variant="outline-primary" onClick={() => this.nextQuestion()}>
						Start Trivia
					</Button>
				}



			</Container>
		);
	}
}

export default HostGame;