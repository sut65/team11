import React from "react"
import {Navigate, Outlet} from "react-router-dom"

// const useAuth = () => {
// 	//get item from localstorage

// 	let user: any

// 	const _user = localStorage.getItem("role")
// 	console.log(_user);
	

// 	if (_user) {
// 		user = JSON.parse(_user)
// 		console.log("user", user)
// 	}
// 	if (user) {
// 		return {
// 			auth: true,
// 			role: user.role,
// 		}
// 	} else {
// 		return {
// 			auth: false,
// 			role: null,
// 		}
// 	}
// }

// //protected Route state
type ProtectedRouteType = {
	roleRequired: "Customer" | "Technician" | "Admin"
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
	// const {auth, role} = useAuth()
	const _user = localStorage.getItem("role")
	console.log(_user);
	

	//if the role required is there or not
	// console.log(props.roleRequired);
	
	if (props.roleRequired) {
		return _user ? (
			props.roleRequired === _user ? (
				<Outlet />
			) : (
				<Navigate to="/denied" />
			)
		) : (
			<Navigate to="/SignInCustomer" />
		)
	} else {
		return _user ? <Outlet /> : <Navigate to="/SignInCustomer" />
	}
}

export default ProtectedRoutes
