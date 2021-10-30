import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import MetamaskFox from "../../assets/metamask_fox.svg";
import "./dashboard.css";
import MetaMaskOnboarding from "@metamask/onboarding";

export default function Dashboard(props) {
	function isOwner(_song) {
		return _song.currentOwnerAddress === props.account;
	}

	function isCreator(_song) {
		return _song.artistAddress === props.account;
	}

	useEffect(() => {
		// Basic Actions Section
		const onboardButton = document.getElementById("connectButton");
		const { ethereum } = window;

		// Created check function to see if the MetaMask extension is installed
		const isMetaMaskInstalled = () => {
			// Have to check the ethereum binding on the window object to see if it's installed
			return Boolean(ethereum && ethereum.isMetaMask);
		};

		// We create a new MetaMask onboarding object to use in our app
		const onboarding = new MetaMaskOnboarding();

		// This will start the onboarding proccess
		const onClickInstall = () => {
			onboardButton.innerText = "Onboarding in progress...";
			onboardButton.disabled = true;
			//On this object we have startOnboarding which will start the onboarding process for our end user
			onboarding.startOnboarding();
		};

		const onClickConnect = async () => {
			try {
				// Will open the MetaMask UI
				// You should disable this button while the request is pending!
				const { ethereum } = window;
				onboardButton.disabled = true;
				await ethereum.request({ method: "eth_requestAccounts" });
			} catch (error) {
				console.error(error);
			}
		};

		const MetaMaskClientCheck = () => {
			// Now we check to see if MetaMask is installed
			if (!isMetaMaskInstalled()) {
				// If it isn't installed we ask the user to click to install it
				onboardButton.innerHTML = `<span><img src=${MetamaskFox} alt="..." height="25" class="mr-3" />Click to install MetaMask<i class="fas fa-angle-double-right"></i></span>`;
				// When the button is clicked we call this function
				onboardButton.onclick = onClickInstall;
				// The button is now disabled
				onboardButton.disabled = false;
			} else if (onboardButton) {
				// If it is installed we change our button text
				onboardButton.innerHTML = `<span><img src=${MetamaskFox} alt="..." height="25" class="mr-3" />Connect with Metamask<i class="fas fa-angle-double-right"></i></span>`;
				// When the button is clicked we call this function to connect the users MetaMask Wallet
				onboardButton.onclick = onClickConnect;
				// The button is now disabled
				onboardButton.disabled = false;
			}
		};

		MetaMaskClientCheck();
	}, []);

	return (
		<Fragment>
			<div className="dashboard-container">
				<div className="dashboard-box ">
					<div className="row">
						<div className="col-lg-8 col-md-12 p-0">
							{/* Dashboard CARD */}
							<div className="dashboard-card">
								<div className="row">
									<h2>Dashboard</h2>
								</div>
								{props.account ? (
									<div className="row mt-4 text-md-left text-center">
										<div className="col-md-2 col-12 pr-0 mr-0">
											<Jazzicon diameter={65} seed={jsNumberForAddress(props.account)} />
										</div>
										<div className="col-md-10 col-12 p-0 mt-md-0 mt-4 dashboard-text align-self-end">
											{props.account}
										</div>
									</div>
								) : (
									<div className="row mt-5 mb-4">
										<div className="col-lg-7 col-md-9 col-sm-12 col-12">
											<button className="btn btn-primary shadow-sm submit-btn" id="connectButton">
												<span>
													<img src={MetamaskFox} alt="..." height="25" className="mr-3" />
													Connect with Metamask
													<i className="fas fa-angle-double-right"></i>
												</span>
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="row mt-5 p-0 text-center justify-content-center">
						<h2 className="mt-5 p-0 green_text">Owned by me</h2>
					</div>

					<div className="container-fluid d-flex flex-wrap justify-content-center">
						<div className="row mt-3 p-0 text-center justify-content-center">
							{props.songNFTs.filter(isOwner).length > 0 ? (
								props.songNFTs.map((song, key) => {
									return (
										<Fragment key={key}>
											{song.currentOwnerAddress === props.account ? (
												<div className="song_card_component">
													<Link to={`/song-info/${song.id}`}>
														<div className="library_cards_cover_div">
															<img
																src={`https://ipfs.infura.io/ipfs/${song.imgHash}`}
																alt="song cover"
															/>
															<div className="text-break">
																<p className="info_song_card_dashboard">
																	#{`${song.id}`}
																</p>
																<span className="info_song_card_dashboard">{`${song.songName}`}</span>
															</div>
														</div>
													</Link>
												</div>
											) : null}
										</Fragment>
									);
								})
							) : (
								<h5 className="mt-3 p-0">You don't own any NFTs yet. Go get one!</h5>
							)}
						</div>
					</div>

					<br />
					<br />

					<div className="row mt-5 p-0 text-center justify-content-center">
						<h2 className="p-0 green_text">Created by me</h2>
					</div>

					<div className="container-fluid d-flex flex-wrap justify-content-center">
						<div className="row mt-3 p-0 text-center justify-content-center">
							{props.songNFTs.filter(isCreator).length > 0 ? (
								props.songNFTs.map((song, key) => {
									return (
										<Fragment key={key}>
											{song.artistAddress === props.account ? (
												<div className="song_card_component">
													<Link to={`/song-info/${song.id}`}>
														<div className="library_cards_cover_div">
															<img
																src={`https://ipfs.infura.io/ipfs/${song.imgHash}`}
																alt="song cover"
															/>
															<div className="text-break">
																<p className="info_song_card_dashboard">
																	#{`${song.id}`}
																</p>
																<span className="info_song_card_dashboard">{`${song.songName}`}</span>
															</div>
														</div>
													</Link>
												</div>
											) : null}
										</Fragment>
									);
								})
							) : (
								<h5 className="mt-3 p-0">You haven't created any NFTs yet. Go create one!</h5>
							)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
