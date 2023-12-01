import { useState } from "react";
import { z } from "zod";
import { Api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../utils/validation";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export const Signup = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      const { repeatedPassword, ...user } = regUser.parse({
        ...values,
        createdAt: Date.now(),
      });
      const res = await Api.postUser(user);
      userContext.onChange(res);
      setValues({
        email: "",
        password: "",
        repeatedPassword: "",
      });
      navigate("/");
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.format());
      } else {
        setErrors(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-2/5 mx-auto gap-4 text-xl">
      <h1 className="text-4xl text-center font-bold text-gray-800">Sign up</h1>
      <input
        type="text"
        placeholder="Email"
        className="border border-gray-400 rounded-md py-2 px-3"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors?.email && (
        <div className="text-red-600">{errors?.email._errors}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-400 rounded-md py-2 px-3"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors?.password && (
        <div className="text-red-600">
          Password must contain 8 characters, numbers, uppercase and lowercase letters
        </div>
      )}
      <input
        type="password"
        placeholder="Repeat password"
        className="border border-gray-400 rounded-md py-2 px-3"
        name="repeatedPassword"
        value={values.repeatedPassword}
        onChange={handleChange}
      />

      {errors?.repeatedPassword && (
        <div className="text-red-600">{errors?.repeatedPassword._errors}</div>
      )}

      {errors?.message && (
        <div className="text-red-600">{errors?.message}</div>
      )}

      <div className="flex justify-between mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-3xl py-1 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Sign up
        </button>
        <Link to="/login" className="self-center underline text-blue-600">
          Log in
        </Link>
      </div>
    </div>
  );
};