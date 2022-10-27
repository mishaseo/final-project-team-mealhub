import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Imported for routes
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import EditImage from "./pages/EditImage";
import Group from "./components/group";
import Login from "./components/Login";
import Register from "./components/Register";
import Explore from "./pages/explore";

function App() {
	return (
		<div>
			{/*List of Routes*/}
			<Router>
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/profilePage" element={<ProfilePage />} />
					<Route path="/editProfilePage" element={<EditProfilePage />} />
					<Route path="/addImage" element={<EditImage />} />
					<Route path="/createGroup" element={<Group />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Register" element={<Register />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
