import React, {Fragment} from "react";
import { Link } from 'react-router-dom';
import appleLogo from "../../../../assets/apple.svg";
import spotifyLogo from "../../../../assets/spotify.svg";
import amazonLogo from "../../../../assets/amazon.svg";
import "./socials.css";

export default function Socials(props) {
  return (
    <Fragment>
      	<span className="listenOn-text">Listen song on</span>

      	<div className="mt-2 row justify-content-center social-links">
			{props.socials.spotify ? (
				<Link
					className="col-lg-4 col-md-4 col-sm-3 col-6"
					to={props.socials.spotify}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={spotifyLogo} alt="spotify logo"></img>
				</Link>
			) : null}

			{props.socials.appleMusic ? (
				<Link
					className="col-lg-4 col-md-4 col-sm-3 col-6"
					to={props.socials.appleMusic}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={appleLogo} alt="apple music logo"></img>
				</Link>
			) : null}

			{props.socials.amazonMusic ? (
				<Link
					className="col-lg-4 col-md-4 col-sm-3 col-6 mt-1"
					to={props.socials.amazonMusic}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={amazonLogo} alt="amazon music logo"></img>
				</Link>
			) : null}
      	</div>
    </Fragment>
  );
}
