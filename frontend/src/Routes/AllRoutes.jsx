import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import ProductPage from "../Components/ProductPage"
import SingleItem from "../Components/SingleItem"
import PrivateRoute from "./PrivateRoute"
import Profile from "../Components/auth/Profile"
import UserAddress from "../Components/auth/UserAddress"
import Login from "../Components/auth/Login"
import Cart from "../Components/Cart"
import Mobile from "../Components/Product/Mobile"
import dashboard from "../Components/AdminDashboard"
import AdminDashboard from "../Components/AdminDashboard"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/:category" element={<ProductPage />} />
			<Route path="/product/:_id" element={<SingleItem />} />
			<Route path="/profile" element={
				<PrivateRoute>
					<Profile />
				</PrivateRoute>
			} />
			<Route path="/address" element={
				<PrivateRoute>
					<UserAddress />
				</PrivateRoute>
			} />
			<Route path="/cart" element={
				<PrivateRoute>
					<Cart />
				</PrivateRoute>
			} />
			<Route path="/login" element={<Login />} />

			<Route path="/mobile" element={<Mobile/>}/>
<Route path="/dashboard" element={<AdminDashboard />} />


			
		</Routes>
	)
}

export default AllRoutes;
