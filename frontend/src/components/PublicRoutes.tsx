import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = localStorage.getItem('role')
  console.log(user);

  if (user) {
    return true
  } else {
    return false
  }
}

const PublicRoutes = (props: any) => {
  const user = localStorage.getItem('role')
  const auth = useAuth()


  if (user === "Technician") {
    return auth ? <Navigate to="/HomeForTech" /> : <Outlet />
  } else if (user === "Customer") {
    return auth ? <Navigate to="/HomeForCus" /> : <Outlet />
  }


  return auth ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes;
