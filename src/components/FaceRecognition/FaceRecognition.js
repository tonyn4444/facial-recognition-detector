import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl }) =>{
	return (
		<div className='center ma pos-relative debug-border inline-block'>
			<img
				alt='img'
				width='500px'
				height='auto'
				src={imgUrl}
				className='mt2 '
				id='face-image'
			/>
			<div className='face-bounding-box' />
		</div>
	)
}

export default FaceRecognition;
