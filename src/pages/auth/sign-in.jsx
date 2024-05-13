import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { loginUser } from '@/store/actionCreators';


export function SignIn() {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();

    const DB_USER = event.target.DB_USER.value;
    const DB_PASS = event.target.DB_PASS.value;

    try {
      await dispatch(loginUser(DB_USER, DB_PASS));
      // console.log('ini');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleLogin}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              id="DB_USER"
              name="DB_USER"
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              id="DB_PASS"
              name="DB_PASS"
            />
          </div>
          <Button type='submit' className="mt-6" fullWidth style={{ backgroundColor: '#76453B' }}>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/nrown.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
