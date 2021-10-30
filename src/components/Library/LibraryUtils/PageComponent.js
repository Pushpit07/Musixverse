import React from "react";
import toDelete from "../../../assets/to-delete.jpg";
import "./pageComponent.css";

export default function PageComponent(props) {
	let n = props.images.length;
	let imagesArray = [];

	for (let i = 0; i < n; i++) {
		// NOTE: Do not use album-cover-div and album-cover classes
		// src will be changed to props.images[i] at a later stage
		// Import the required css from carousel only and
		// (if possible)try to change the class names accordingly
		// width of the slide-cover-div & img tag might need to be changed accordingly
		imagesArray.push(
			<div className="slide-cover-div" key={i}>
				<img className="album-cover-img" src={toDelete} alt="album cover" />
				<div>
					<p>#{`${props.idAndSongName[i].id}`}</p>
					<span>{`${props.idAndSongName[i].songName}`}</span>
				</div>
			</div>
		);
	}
	// After this, our imagesArray will contain the individual images cards
	// Now, we need to render these cards in the container fluid(1 container fluid per page!!)
	return (
		<div class="container-fluid d-flex flex-wrap">
			{imagesArray.map((image) => {
				return <div class="p-4 card-component">{image}</div>;
			})}
		</div>
	);
}
