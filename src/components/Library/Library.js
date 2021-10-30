import React, { Fragment } from "react";
import "./library.css";
import Dropdown from "./LibraryUtils/Dropdown/Dropdown";
import SongPages from "./LibraryUtils/SongPages/SongPages";

export default function Library(props) {
	const genres = ["Pop", "Classical", "Rap", "Indian", "Cultural"];
	const lyrics = ["Yes", "No"];

	return (
		<Fragment>
			<div className="library_container">
				<div className="library_box ">
					<div className="row justify-content-center">
						{/* Library CARD */}
						<div className="library_card">
							<div className="left_filters_section">
								<p className="mxv_library_heading">MXV Library</p>
								<p className="library_filters">Filters:</p>
								{/* DROPDOWNS */}
								<Dropdown optionsArray={genres}>Genres</Dropdown>
								<Dropdown optionsArray={lyrics}>Lyrics</Dropdown>
							</div>

							<div className="right_filters_section">
								<div className="search_bar_div">
									<input
										className="search_bar"
										type="text"
										placeholder="Search by Name or ID"
									></input>
									<button className="search_button">
										<i className="fas fa-search"></i>
									</button>
								</div>
							</div>
						</div>

						{/* PAGES SECTION */}
						<SongPages songNFTs={props.songNFTs} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
