import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const SignUp = () => {
    const [error, setError] = useState("");
    //  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setError("");
    const password = data.password;
    const confirmPassword = data.confirmPass;
    if (password !== confirmPassword) {
      setError("Your password did not match");
      return;
    }
  };

  return (
    <div className="mt-6 mb-12 signUp-card mx-auto">
      <Helmet>
        <title>Uni Bookings | SignUp</title>
      </Helmet>
      <h2 className=" text-xl sm:text-2xl font-bold mb-6">Sign Up Please</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm sm:text-base">Full Name</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
          required
        />
        {errors.name && (
          <p className="text-red-500 -mt-5">
            <small>Name field is required</small>
          </p>
        )}

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
          type="password"
          name="password"
          defaultValue=""
          {...register("password", {
            required: true,
            minLength: 6,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
          })}
          required
        />
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

        <label className="text-sm sm:text-base">Confirm Password</label>
        <input
          type="password"
          name="password"
          defaultValue=""
          {...register("confirmPass", {
            required: true,
            minLength: 6,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
          })}
          required
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 -mt-5">
            <small>Password is required</small>
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 -mt-5 ">
            <small>Password must be 6 character</small>
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500 -mt-5">
            <small>
              Password must have one Uppercase one lower case, one number and
              one special character
            </small>
          </p>
        )}

        <label className="text-sm sm:text-base">Photo Url</label>
        <input
          type="url"
          defaultValue=""
          {...register("photoURL", { required: true })}
          required
        />

        {errors.photoURL && (
          <p className="text-red-500 -mt-5">
            <small>PhotoURL field is required</small>
          </p>
        )}
        <input
          type="submit"
          value="sign up"
          className="btn bg-pink-500 hover:bg-pink-600 border-none btn-block rounded-3xl"
        />
        {error && (
          <p className="text-red-500 font-bold -mt-3">
            <small>{error}</small>
          </p>
        )}
        <p>
          <small>
            Already have an Account? Please{" "}
            <Link to="/login" className="text-pink-600 font-bold">
              Login
            </Link>
          </small>
        </p>
      </form>
      <p className="text-red-600">{""}</p>
    </div>
  );
};

export default SignUp;