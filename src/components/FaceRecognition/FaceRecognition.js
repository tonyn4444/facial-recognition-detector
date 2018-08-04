import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, boundingBox }) => {
	console.log('boundingBox', boundingBox);
	return (
		<div className='center ma debug-border'>
			<div className='absolute mt2'>
				<img
					alt='img'
					width='500px'
					height='auto'
					src={imgUrl}
					className='mt2 '
					id='face-image'
				/>
				<div className='face-bounding-box' style={{ top: boundingBox.topRow, right: boundingBox.rightCol, bottom: boundingBox.bottomCol, left: boundingBox.leftCol }} />
			</div>
		</div>
	)
}

export default FaceRecognition;
