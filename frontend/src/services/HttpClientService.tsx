import React from "react";
import { SigninInterface } from "../interfaces/ISignin";
import { UsersInterface } from "../interfaces/IUser";

const apiUrl = "http://localhost:8080";

async function SignInCus(data: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/SignInCustomer`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log('Log:', res);

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("role", res.data.role);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function SignInTechnician(data: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/SignInTechnician`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log('Log:', res);

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("role", res.data.role);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function SignInAd(data: any) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/SignInAdmin`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log('Log:', res);

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("role", res.data.role);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetVideos() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/videos`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetResolution() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/resolutions`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}



async function CreateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/signup`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}



export {
  SignInCus,
  SignInTechnician,
  SignInAd,
  GetUsers,
  CreateUser,
};
