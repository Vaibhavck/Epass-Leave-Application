import React from 'react';
import './TypewriterText.css';

export default class Typer extends React.Component {

    _isMounted = false;

    state = {
      text: '',
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150
    }
  
    componentDidMount() {
      this._isMounted = true;
      if(this._isMounted) this.handleType();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
  
    handleType = () => {
      const { dataText } = this.props;
      const { isDeleting, loopNum, text, typingSpeed } = this.state;
      const i = loopNum % dataText.length;
      const fullText = dataText[i];
  
      this.setState({
        text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
        typingSpeed: isDeleting ? 30 : 150
      });
  
      if (!isDeleting && text === fullText) {     
        setTimeout(() => this.setState({ isDeleting: true }), 500);   
      } else if (isDeleting && text === '') {
        this.setState({
          isDeleting: false,
          loopNum: loopNum + 1
        });      
      }
  
      setTimeout(this.handleType, typingSpeed);
    };
  
    render() {    
      return (
        <div>
            <h3 style={{overflow: 'hidden'}} >{ this.state.text }<span id="cursor"></span></h3>
        </div>
        
      );
    }
  }
  
//   ReactDOM.render(
//     <Typer
//       heading="Things for hipsters:"
//       dataText={[  
//         'Vinyl swag.', 
//         'Seitan jianbing.',
//         'Enamel pin meditation.',
//         'Denim seitan.',
//         'Semiotics austin.',
//         'Sriracha fanny pack.',
//         'Vape raw dreamcatcher.',
//         'Fam blog.',
//         '90s church-key.',
//         'Pabst distillery.',
//         'Street art unicorn.'
//       ]} 
//     />, 
//     document.getElementById('app')
//   );