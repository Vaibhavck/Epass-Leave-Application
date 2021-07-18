import React, { Component } from 'react'
import { withRouter } from 'react-router'; 

export class Success extends Component {

    state = {
        seconds : 5,
    }

    constructor(props) {
        super(props);
        this.redirectTimeout = null;
    }

    forEachSecond = () => {
        this.setState({seconds : this.state.seconds-1});
    }
      
    componentDidMount = () => {
        this.oneSecondInterval = setInterval(() => this.forEachSecond(), 1000);
        const { history } = this.props;
        this.redirectTimeout = setTimeout(() => {
            history.push('./dashboard')
        }, 5000);
    }

    componentWillUnmount = () => {
        clearTimeout(this.redirectTimeout);
        clearTimeout(this.oneSecondInterval);
    }
    
    render() {
        return (
            <div>
                    <h1>Successful Submission</h1>
                    <h2 style={{textAlign: 'center'}} >Thank You For your Submission</h2>
                    <p style={{textAlign: 'center'}} >You Will get an email with further instructions</p>
                    <br />
                    <h2 style={{textAlign: 'center'}} >Redirecting to dashboard in</h2>
                    <h1 style={{textAlign: 'center', color: 'blue'}} >{this.state.seconds}</h1>
                    <h3 style={{textAlign: 'center'}} >seconds</h3>
            </div>
        )
    }
}

export default withRouter(Success)
