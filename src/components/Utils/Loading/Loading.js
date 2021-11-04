import React, { Fragment } from "react";
import "./loading.css";

export default function Loading() {
	return (
		<Fragment>
			<div className="loading_container">
				<div className="loadingSpinner"></div>
				<div class="classic-7"></div>
				<div className="row p-0 m-0 mt-5">
					<div className="col p-0 m-0 mt-5 wait_text">
						Please wait a moment. It takes some time to communicate with the blockchain.
					</div>
				</div>
			</div>
		</Fragment>
	);
}
