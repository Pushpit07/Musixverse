import React, { useState } from "react";
import "./lyricsBox.css";

export default function LyricsBox(props) {
	const [lyrics, setLyrics] = useState("");

	fetch(props.lyricsURL)
  		.then((response) => response.text().then((text) => setLyrics(text)));

  	return (
		<div className="lyrics_container">
			<div className="lyrics_box">
				<p>Lyrics:</p>
				<span className="text-break">
					{lyrics}
				</span>
			</div>
		</div>
  	);
}
