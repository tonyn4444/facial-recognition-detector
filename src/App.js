import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
 apiKey: '7a9131755a554eefbf7fbf5fc4159e23'
});

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			boundingBox: {},
		}

		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		console.log(event.target.value);
		this.setState({
			input: event.target.value,
		});
	}

	calculateImageFaceBounds = boundingBox => {
		

		const image = document.querySelector('#face-image');
		const imageHeight = image.height;
		const imageWidth = image.width;
		console.log('imageHeight', imageHeight);
		console.log('imageWidth', imageWidth);
		this.setState({ 
			boundingBox: {
				leftCol: boundingBox.left_col * imageWidth,
				rightCol: imageWidth - (boundingBox.right_col * imageWidth),
				bottomRow: imageHeight - (boundingBox.bottom_row * imageHeight),
				topRow: boundingBox.top_row * imageHeight,
			} 
		});
	}

	onButtonClick = (event) => {
		console.log('clicked!!');
		// predict the contents of an image by passing in a url
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
		  response => {
		    console.log(response.outputs[0].data.regions[0]);
		    const boundingBox = response.outputs[0].data.regions[0].region_info.bounding_box;
		    // this.setState({ boundingBox: boundingBox });
		    this.calculateImageFaceBounds(boundingBox);
		  },
		  function(err) {
		    console.error(err);
		  }
		);
	}

  render() {
    return (
      <div className="App">
      	<Particles 
          params={particlesOptions}
          className='particles'
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
        	onButtonClick={this.onButtonClick}
        	onInputChange={this.onInputChange}
        />
        <FaceRecognition
        	imgUrl={this.state.input}
        	boundingBox={this.state.boundingBox}
        />
      </div>
    );
  }
}

export default App;
