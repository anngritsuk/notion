import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const userContext = useContext(UserContext);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await Api.getUser(values);
      userContext.onChange(res);
      setValues({ email: "", password: "" });
      navigate("/");
      setErrors({});
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="flex flex-col w-2/5 mx-auto gap-4 text-xl">
      <h1 className="text-4xl text-center font-bold text-gray-800">Log in</h1>
      <input
        type="text"
        placeholder="Email"
        className="border border-gray-400 rounded-md py-2 px-3"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-400 rounded-md py-2 px-3"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors?.message && (
        <div className="text-red-600">{errors.message}</div>
      )}
      <div className="flex justify-between mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-3xl py-1 px-4 rounded-md"
          onClick={handleLogin}
        >
          Log in
        </button>
        <Link to="/signup" className="self-center underline text-blue-600">
          Sign up
        </Link>
      </div>
    </div>
  );
};