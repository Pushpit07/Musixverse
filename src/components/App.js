import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Web3 from "web3";
import Musixverse from "../abis/Musixverse.json";
import "./App.css";
import Navbar from "./Layout/Navbar/Navbar";
import HomePage from "./Homepage/HomePage";
import Library from "./Library/Library";
import Create from "./Create/Create";
import Dashboard from "./Dashboard/Dashboard";
import SongInfo from "./SongInfo/SongInfo";
import ScrollToTop from "./Utils/ScrollToTop/ScrollToTop";
import Trending from "./Trending/Trending";
import Loading from "./Utils/Loading/Loading";
const ipfsClient = require("ipfs-http-client");

function App() {
	const [loading, setLoading] = useState(true);
	const [account, setAccount] = useState("");
	const [musixverse, setMusixverse] = useState("");
	const [songNFTs, setSongNFTs] = useState([]);
	const [imageBuffer, setImageBuffer] = useState("");
	const [songBuffer, setSongBuffer] = useState("");
	const [lyricsBuffer, setLyricsBuffer] = useState("");
	const ipfs = ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
	var web3;
	const { ethereum } = window;

	if (ethereum) {
		ethereum.on("accountsChanged", function (accounts) {
			setAccount(web3.utils.toChecksumAddress(accounts[0]));
		});
	}

	useEffect(() => {
		loadBlockchainData();
		// setLoading(false);
	}, []);

	useEffect(() => {
		console.log("imageBuffer-", imageBuffer);
		console.log("songBuffer-", songBuffer);
		console.log("lyricsBuffer-", lyricsBuffer);
	}, [imageBuffer, songBuffer, lyricsBuffer]);

	async function addPolygonTestnetNetwork() {
		try {
			await ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x13881" }], // Hexadecimal version of 80001, prefixed with 0x
			});
		} catch (error) {
			if (error.code === 4902) {
				try {
					await ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: "0x13881", // Hexadecimal version of 80001, prefixed with 0x
								chainName: "POLYGON Testnet",
								nativeCurrency: {
									name: "MATIC",
									symbol: "MATIC",
									decimals: 18,
								},
								rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
								blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
								iconUrls: [""],
							},
						],
					});
				} catch (addError) {
					console.log("Did not add network");
				}
			}
		}
	}

	async function loadBlockchainData() {
		var accounts;

		if (ethereum) {
			window.web3 = new Web3(ethereum);
			await addPolygonTestnetNetwork();
		} else if (window.web3 && (await ethereum.request({ method: "net_version" })) !== "80001") {
			window.web3 = new Web3(window.web3.currentProvider);
			await addPolygonTestnetNetwork();
		} else {
			// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
			window.web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/6f89b4b5242a4191af04c7939d66d6e8"));
			window.alert(
				"Non-Ethereum browser detected. You cannot perform any transactions on the blockchain, however you will still be able to watch all content present on the blockchain. To make transactions you should consider installing Metamask"
			);
		}

		web3 = window.web3;

		// This results in a bug which converts all uppercase alphabets in the address to lowercase
		// accounts = await window.ethereum.request({ method: "eth_accounts" });
		accounts = await web3.eth.getAccounts();
		// accounts = await ethereum.request({ method: "eth_requestAccounts" });

		// Load account
		setAccount(accounts[0]);

		// Network ID
		// Local Network
		// const networkId = await web3.eth.net.getId();
		// Polygon Test Network
		const networkId = 80001;
		const networkData = Musixverse.networks[networkId];
		if (networkData) {
			const _musixverse = new web3.eth.Contract(Musixverse.abi, networkData.address);
			setMusixverse(_musixverse);

			const _songsCount = await _musixverse.methods.songsCount().call();

			// Load Songs
			for (var i = 0; i < _songsCount; i++) {
				const _song = await _musixverse.methods.songs(i).call();
				// console.log("_song", _song);
				setSongNFTs((songNFTs) => [...songNFTs, _song]);
			}

			setLoading(false);
		} else {
			window.alert("Musixverse contract not deployed to detected network.");
		}
	}

	async function captureLyrics(event) {
		event.preventDefault();

		const file = new Blob([event.target.value], { type: "text/plain" });

		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setLyricsBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function captureImage(event) {
		event.preventDefault();

		const file = event.target.files[0];
		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setImageBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function captureSong(event) {
		event.preventDefault();

		if (document.getElementById("upload-song")) {
			var uploadSong = document.getElementById("upload-song");
			if (uploadSong.files[0].size > 100700000) {
				alert("File size is too big! Please upload a file smaller than 100MB.");
				return;
			}
		}

		const file = event.target.files[0];

		if (file) {
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);

			reader.onloadend = () => {
				setSongBuffer(Buffer(reader.result));
			};
		} else {
			return;
		}
	}

	async function createSong(_name, _artistName, _price, _onSale, _links, _characteristics) {
		var _imgHash;
		var _songHash;
		var _lyricsHash;

		setLoading(true);
		await ipfs.add(imageBuffer, async (error, _imgResult) => {
			console.log("_imgResult:", _imgResult);
			if (error) {
				console.error(error);
				return;
			}
			_imgHash = _imgResult[0].hash;
			console.log("imgHash:", _imgHash);

			ipfs.add(songBuffer, async (error, _songResult) => {
				console.log("_songResult:", _songResult);
				if (error) {
					console.error(error);
					return;
				}
				_songHash = _songResult[0].hash;
				console.log("_songHash:", _songHash);

				ipfs.add(lyricsBuffer, async (error, _lyricsResult) => {
					console.log("_lyricsResult:", _lyricsResult);
					if (error) {
						console.error(error);
						return;
					}
					_lyricsHash = _lyricsResult[0].hash;
					console.log("_lyricsHash:", _lyricsHash);

					_characteristics[2] = _lyricsHash;

					// Set up your Ethereum transaction
					const transactionParameters = {
						to: "0xEf72d56A76e069f37453bB7ddB4aBd940FeA35D2", // Required except during contract publications.
						from: account, // must match user's active address.
						data: musixverse.methods.createSong(_name, _artistName, window.web3.utils.toWei(_price, "Ether"), _imgHash, _songHash, _onSale, _links, _characteristics).encodeABI(), //make call to NFT smart contract
					};

					// Sign the transaction via Metamask
					try {
						const txHash = await window.ethereum.request({
							method: "eth_sendTransaction",
							params: [transactionParameters],
						});
						setLoading(false);
						window.location.reload();
						return {
							success: true,
							status: "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
						};
					} catch (error) {
						return {
							success: false,
							status: "Something went wrong: " + error.message,
						};
					}
				});
			});
		});
	}

	async function purchaseSong(id, price) {
		const _id = (parseInt(id) - 1).toString();
		// const _price = web3.utils.fromWei(price.toString(), 'Ether')

		setLoading(true);

		musixverse.methods
			.purchaseSong(_id)
			.send({ from: account, value: price })
			.once("receipt", (receipt) => {
				setLoading(false);
				window.location.reload();
			})
			.catch(function (error) {
				if (error.code === 4001) {
					window.location.reload();
				}
			});
	}

	async function toggleOnSale(id) {
		const _id = (parseInt(id) - 1).toString();

		setLoading(true);
		musixverse.methods
			.toggleOnSale(_id)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
			})
			.catch(function (error) {
				if (error.code === 4001) {
					window.location.reload();
				}
			});
	}

	async function updatePrice(id, price) {
		const _id = (parseInt(id) - 1).toString();
		const _price = web3.utils.toWei(price, "Ether");

		setLoading(true);
		musixverse.methods
			.updatePrice(_id, _price)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
			})
			.catch(function (error) {
				if (error.code === 4001) {
					window.location.reload();
				}
			});
	}

	return (
		<HashRouter>
			<ScrollToTop />
			<Navbar account={account} />
			<div>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						exact
						path="/song-info/:songId"
						render={(props) =>
							loading ? <Loading /> : <SongInfo {...props} account={account} songNFTs={songNFTs} purchaseSong={purchaseSong} toggleOnSale={toggleOnSale} updatePrice={updatePrice} />
						}
					/>
					<Route exact path="/library" render={() => (loading ? <Loading /> : <Library songNFTs={songNFTs} />)} />
					<Route exact path="/trending" render={() => (loading ? <Loading /> : <Trending songNFTs={songNFTs} />)} />
					<Route
						exact
						path="/create"
						render={() => <Create createSong={createSong} captureImage={captureImage} captureLyrics={captureLyrics} captureSong={captureSong} songNFTs={songNFTs} />}
					/>
					<Route exact path="/dashboard" render={() => (loading ? <Loading /> : <Dashboard account={account} songNFTs={songNFTs} />)} />
					<Redirect to="/" />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
