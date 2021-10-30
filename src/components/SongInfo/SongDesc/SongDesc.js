import React from "react";
import { Link } from 'react-router-dom';
import "./songDesc.css";

export default function SongDesc(props) {
  	return (
		<div className="song_description_box">
			<h2 className="text-break">{props.song.songName}</h2>
			<p className="artist_name text-break">Song by- {`${props.song.artistName}`}&nbsp;&nbsp;<small className="text-break">({`${props.song.artistAddress}`})</small></p>
			<span className="current_owner_address text-break">Current owner: {`${props.song.currentOwnerAddress}`}</span>
			
			{/* DETAILS */}
			<div className="mt-5 mb-3">
				<p className="about_song_heading">About the Song</p>
				<div>
					<p className="detail_label">
						Genre:<span>{` ${props.song.characteristics.genre}`}</span>
					</p>
					<p className="detail_label">
						Instruments Used:<span>{` ${props.song.characteristics.instruments}`}</span>
					</p>
					<p className="detail_label">
						Type of Lyrics:<span>{` ${props.song.characteristics.typeOfLyrics}`}</span>
					</p>
					<p className="detail_label">
						Song Type:<span>{` ${props.song.characteristics.songType}`}</span>
					</p>
					<p className="detail_label">
						Frequency:<span>{` ${props.song.characteristics.frequency}`}</span>
					</p>
					<p className="detail_label">
						Instruments Type:<span>{` ${props.song.characteristics.instrumentType}`}</span>
					</p>
					<p className="detail_label">
						Sample Based:<span>{` ${props.song.characteristics.sampleBased}`}</span>
					</p>
				</div>
			</div>

			{/* BACKGROUND */}
			<div className="background_info_div mt-3 ">
				<p className="detail_label">Background:</p>
				<span className="background_desc">
					{props.background.length > 250
					? props.background.substring(0, 200)
					: props.background}
					<Link to={"/"}>Read More...</Link>
				</span>
			</div>
		</div>
  	);
}
