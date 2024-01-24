import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSaveUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [saveUser] = useSaveUserMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const saveUserInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        phoneNumber: data.phoneNumber,
        password: data.password,
        photoURL: data.photoURL,
      };

      const user = {
        name: data.name,
        email: data.email,
        role: data.role,
      };

      // Save to db and wait for the response
      const response = await saveUser(saveUserInfo).unwrap();

      dispatch(setUser({ user: user, token: response.data.token }));
      console.log(response);

      navigate("/");
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error("Registration failed:", error);
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

        <div className="flex items-center justify-between gap-2">
          <div className="w-[67%]">
            <label className="text-sm sm:text-base">Password</label>
            <input
              type="password"
              name="password"
              defaultValue=""
              {...register("password", {
                required: true,
              })}
              required
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 -mt-5">
                <small>Password is required</small>
              </p>
            )}
          </div>
          <div className="w-[25%]">
            <label className="text-sm sm:text-base font-semibold">Role: </label>
            <select {...register("role")}>
              <option value="renter">renter</option>
              <option value="owner">owner</option>
            </select>
            {errors.role?.type === "required" && (
              <p className="text-red-500 -mt-5">
                <small>Role is required</small>
              </p>
            )}
          </div>
        </div>

        <label className="text-sm sm:text-base">Phone</label>
        <input
          type="text"
          name="phoneNumber"
          defaultValue="017****"
          {...register("phoneNumber", {
            required: true,
            pattern: /^01\d{9}$/,
          })}
          required
        />
        {errors.phoneNumber?.type === "required" && (
          <p className="text-red-500 -mt-5">
            <small>Phone Number is required</small>
          </p>
        )}
        {errors.phoneNumber?.type === "pattern" && (
          <p className="text-red-500 -mt-5">
            <small>Enter valid(BD) phone number</small>
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
