import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "jhon.smith@example.com",
      password: "owner123",
    },
  });
  const [login ] = useLoginMutation();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    // * Login user
    const response = await login(userInfo);
    const user = verifyToken(response.data.token);

    dispatch(setUser({ user: user, token: response.data.token }));

    navigate('/')
  };

  return (
    <div className="mt-6 mb-12  login-card mx-auto">
      <Helmet>
        <title>Uni Bookings | Login</title>
      </Helmet>
      <h2 className="text-xl sm:text-2xl font-bold mb-8">Login Please</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm sm:text-base">Username or Email</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
          required
        />
        {errors.email && (
          <p className="text-red-500 -mt-5">
            <small>Email field is required</small>
          </p>
        )}

        <label className="text-sm sm:text-base">Password</label>
        <input
          type={show ? "text" : "password"}
          name="password"
          {...register("password", {
            required: true,
          })}
          required
        />
        <p className="-mt-4 cursor-pointer" onClick={() => setShow(!show)}>
          <small>
            {" "}
            {show ? <span>Hide Password</span> : <span>Show Password</span>}
          </small>
        </p>
        {errors.password?.type === "required" && (
          <p className="text-red-500 -mt-5">
            <small>Password is required</small>
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 -mt-5">
            <small>Password must be 6 character</small>
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500 -mt-5 ">
            <small>
              Password must have one Uppercase one lower case, one number and
              one special character
            </small>
          </p>
        )}

        <input
          type="submit"
          value="Login"
          className="btn bg-pink-500 hover:bg-pink-600 border-none btn-block rounded-3xl"
        />
        <p>
          <small>
            New to UniBookings? Please{" "}
            <Link to="/signUp" className="text-pink-600 font-bold">
              Sign Up
            </Link>
          </small>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
