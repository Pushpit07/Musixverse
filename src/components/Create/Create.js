import React, {Fragment, useState} from "react";
import { useHistory } from "react-router-dom";
import "./create.css";
import Button from "../Layout/Button/Button";

export default function Create(props) {
	const [songName, setSongName] = useState("");
	const [artistName, setArtistName] = useState("");
	const [songPrice, setPrice] = useState("");

	let history = useHistory();

  	return (
		<Fragment>
			<div className="create-container">
				<div className="create-box">
					<div className="row justify-content-center">

						{/* Create CARD */}
						<div className="create-card">
							<span className="create-text">
								<div className="row justify-content-center">
									<h3 className="col-12">
										Create NFT
									</h3>
								</div>
							</span>
						</div>

						<main className="col-lg-12 mt-5 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
							<form onSubmit={(event) => {
								event.preventDefault();
								const _name = songName.value;
								const _artistName = artistName.value;
								const _price = songPrice.value;
								const _onSale = true;
								const _links = ["spotifyLink.com", "appleLink.com", "amznLink.com", "ytMusicLink.com"];
								const _characteristics = ["Pop", ["Guitar", "Drums"], "lyricsHash will replace this", "Non-Rhyme", "Metaphorical", "Mids heavy", "Digital", true];
								// I'm the highest in the room. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus libero, pharetra a ex non, venenatis pellentesque quam. Integer scelerisque magna pellentesque, ornare elit eleifend, interdum nisl. Nulla porttitor non tellus non dignissim. Integer diam quam, condimentum sit amet arcu tempus, semper aliquet mauris. Nullam porta mi non justo fermentum, scelerisque tincidunt purus tincidunt. Morbi eleifend mauris eros, vitae consequat lectus rhoncus et. Fusce suscipit ipsum varius porttitor porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus libero, pharetra a ex non, venenatis pellentesque quam. Integer scelerisque magna pellentesque, ornare elit eleifend, interdum nisl. Nulla porttitor non tellus non dignissim. Integer diam quam, condimentum sit amet arcu tempus, semper aliquet mauris. Nullam porta mi non justo fermentum, scelerisque tincidunt purus tincidunt. Morbi eleifend mauris eros, vitae consequat lectus rhoncus et. Fusce suscipit ipsum varius porttitor porttitor.
								props.createSong(_name, _artistName, _price, _onSale, _links, _characteristics);
								history.push("/library");
							}}>
								<input type="text" placeholder="Enter Song name" className="form-control input_box shadow-sm mt-4 mb-3" ref={(name) => { setSongName(name) }} required />
								<input type="text" placeholder="Enter Artist name" className="form-control input_box shadow-sm mt-4 mb-3" ref={(artistName) => { setArtistName(artistName) }} required />
								<input type="text" placeholder="Enter price in MATIC" className="form-control input_box shadow-sm mt-4 mb-3" ref={(price) => { setPrice(price) }} required />
								<input type="text" placeholder="Lyrics" className="form-control input_box shadow-sm mt-4 mb-3" onChange={props.captureLyrics} required />
								{/* <label className="checkbox_container">
									<input type="checkbox" id="exclusive" className="exclusive_checkbox" ref={(exclusive) => { setpuppyExclusive(exclusive) }} />
									<span className="checkmark"><p>Exclusive</p></span>
								</label> */}
								<br />
								<br />
								<label htmlFor="upload-image" className="upload">Upload Cover Image</label>
								<input type="file" id="upload-image" accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4, .mkv, .ogg, .wmv" onChange={props.captureImage} className="upload_text mb-5 mt-2" />
								<br />
								<label htmlFor="upload-song" className="upload">Upload Song</label>
								<input type="file" id="upload-song" accept=".mp3" onChange={props.captureSong} className="upload_text mb-5 mt-2" />
								
								<div className="row mt-5 justify-content-center">
									<div className="col-lg-4 col-md-5 col-sm-5 col-6">
										<Button type="submit">Create</Button>
									</div>
								</div>
							</form>
						</main>	
					</div>
				</div>
			</div>
		</Fragment>
  	);
}
