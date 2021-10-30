import React from "react";
import "./coverCard.css";
import Socials from "./Socials/Socials.js";

export default function CoverCard(props) {
	return (
		<div className="cover_card">
			<div className="row cover_card_row justify-content-center mb-4">
				<div className="col-12 p-0">
					<img className="album_cover" src={props.songCoverURL} width="100%" alt="album cover" />

					<button className="play-btn">
						<i className="fas fa-play"></i>
					</button>
				</div>
			</div>

			{/* SOCIAL'S LINKS */}
			<Socials socials={props.song.links} />

			{/* BUY BUTTON */}
			<div style={{ width: "100%" }} className="row m-0 p-0 mt-4 justify-content-center">
				<div className="col-lg-12 col-md-10 col-10 m-0 p-0">
					<div className="row justify-content-center m-0 p-0">
						<div className="col-lg-12 col-md-10 col-sm-10 col-10 m-0 p-0">
							{props.account && props.account === props.song.currentOwnerAddress ? (
								<span>
									<button className="btn btn-primary shadow-sm not_for_sale_btn">
										<span>Owned by you</span>
									</button>
									<p className="mt-2">
										Current Price: {props.amount} MATIC{" "}
										<span
											className="edit_price"
											onClick={() => {
												props.updatePrice(props.song.id, "0.5");
											}}
										>
											(Edit)
										</span>
									</p>
								</span>
							) : props.account && props.song.onSale ? (
								<button
									className="btn btn-primary shadow-sm submit-btn"
									onClick={() => {
										props.purchaseSong(props.song.id, props.song.price);
									}}
								>
									<span>
										BUY for {`${props.amount} `} MATIC<i className="fas fa-angle-double-right"></i>
									</span>
								</button>
							) : props.account ? (
								<button className="btn btn-primary shadow-sm not_for_sale_btn">
									<span>Currently not for sale</span>
								</button>
							) : (
								<button className="btn btn-primary shadow-sm not_for_sale_btn connect_metamask_to_buy_btn">
									<span>Connect Metamask to Buy</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{!props.song.onSale && props.account === props.song.currentOwnerAddress ? (
				<span>
					<small className="mt-4">Item currently not on the market</small>
					<h4
						className={"sale_history put_up_on_sale"}
						onClick={() => {
							props.toggleOnSale(props.song.id);
						}}
					>
						Put up on Sale
					</h4>
				</span>
			) : props.song.onSale && props.account === props.song.currentOwnerAddress ? (
				<span>
					<small className="mt-5">Item currently on the market for sale</small>
					<h4
						className={"sale_history take_down_from_sale"}
						onClick={() => {
							props.toggleOnSale(props.song.id);
						}}
					>
						Take down from Sale
					</h4>
				</span>
			) : null}

			<h5 className={"sale_history mt-4"}>Sale History</h5>
		</div>
	);
}
