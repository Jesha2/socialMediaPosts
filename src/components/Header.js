import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

import logo from "../assets/dm-logo-white.svg";
import { useContext } from "react";

const Header = () => {
	const styleActiveLink = ({ isActive }) => {
		return {
			color: isActive ? "#f57145" : "",
		};
	};

	const {state, dispatch} = useContext(AuthContext)

	return (
		<header className="header flex-row">
			<div className="flex-row">
				<img src={logo} alt="dm-logo" className="logo" />
				<h2>Social Mountain</h2>
			</div>
			<nav>
				<ul className="main-nav">
					<li>
						<NavLink style={styleActiveLink} to="/">
							Home
						</NavLink>
					</li>

					{state.token ? 
						<>
							<li>
								<NavLink style={styleActiveLink} to="profile">
									Profile
								</NavLink>
							</li>

							<li>
								<NavLink style={styleActiveLink} to="form">
									Add Post
								</NavLink>
							</li>
							<li>
                                <button className='logout-btn' onClick={() => dispatch({type: 'LOGOUT'})}>Logout</button>
                            </li>
							</>
							
							:<li>
						<NavLink style={styleActiveLink} to="auth">
							Login or Register
						</NavLink>
					</li>}
							
					
					

					
				</ul>
			</nav>
		</header>
	);
};

export default Header;
