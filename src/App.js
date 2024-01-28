import './App.css';
import ReactDOM from "react-dom";
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breaktime: 5,
      sessiontime: 25,
      minutes: 25,
      seconds: 0,
      displayText: 'Session',
      isRunning: false,
      session: true,
    }
    this.handleButton = this.handleButton.bind(this);
    this.tick = this.tick.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
  }
  
  handleButton(buttonType) {
    const typeOfButton = buttonType;
    if(this.state.isRunning) {
      return;
    }else if (typeOfButton === 'break+' && this.state.breaktime < 60){
      this.setState({
        breaktime: this.state.breaktime + 1,
      })
    }else if(typeOfButton === 'break-' && this.state.breaktime > 1){
      this.setState({
        breaktime: this.state.breaktime - 1,
      })
    }else if(typeOfButton === 'session+' && this.state.sessiontime < 60){
      this.setState({
        sessiontime: this.state.sessiontime + 1,
        minutes: this.state.minutes + 1,
      })
    }else if(typeOfButton === 'session-' && this.state.sessiontime > 1){
      this.setState({
        sessiontime: this.state.sessiontime - 1,
        minutes: this.state.minutes - 1,
      })
    }
  } 

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.timerInterval = setInterval(() => this.tick(), 1000);
      } else {
        clearInterval(this.timerInterval);
      }
    }
  }

  tick(){
    if(this.state.seconds === 0) {
      if(this.state.minutes === 0) {
        // timer reached zero
        this.switchTimer();
      } else {
        this.setState((prevState) =>({
          // Decrease the minutes and reset seconds to 59
          minutes: prevState.minutes - 1,
          seconds: 59,
        }));
      }
    } else {
      // Decrease the seconds
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
  }

  startStopTimer(){
    this.setState((prevState) => ({
      isRunning: !prevState.isRunning,
    }));
  }

  resetTimer(){
    this.setState({
      displayText: 'Session',
      isRunning: false,
      session: true,
      sessiontime: 25,
      breaktime: 5,
      minutes: 25,
      seconds: 0
    });
  }

  switchTimer(){
    if(this.state.session){
      this.setState({
        session: false,
        minutes: this.state.breaktime,
        displayText: 'Break'
      })
    } else {
      this.setState({
        session: true,
        minutes: this.state.sessiontime,
        displayText: 'Session'
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div id='wrapper'>
          <div id='pomodoro'>Pomodoro Timer</div>
          <div id='break-container' className="box-design">
            <div id='break-label' className='label'>Break Length</div>
            <button id='break-increment' onClick={() => this.handleButton('break+')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </button>
            <div id='break-length' className='time'>{this.state.breaktime}</div>
            <button id='break-decrement' onClick={() => this.handleButton('break-')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
            </button>
          </div>
          <div id='session-container' className="box-design">
            <div id='session-label' className='label'>Session Length</div>
            <button id='session-increment' onClick={() => this.handleButton('session+')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </button>
            <button id='session-decrement' onClick={() => this.handleButton('session-')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
            </button>
            <div id='session-length' className='time'>{this.state.sessiontime}</div>
          </div>
          <div id='timer-container' className="box-design">
            <div id='timer-label' className='label'>{this.state.displayText}</div> 
            <div id='time-left' className='time'>{String(this.state.minutes).padStart(2, '0')}:{String(this.state.seconds).padStart(2, '0')}</div>
            <button id='start_stop' onClick={this.startStopTimer}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="25px"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            </button>
            <button id='reset' onClick={this.resetTimer}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
            </button>
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />,  document.getElementById("root"));