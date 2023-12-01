import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { options } from "../utils/const";

export const Home = () => {
  const {
    user: { email, createdAt },
  } = useContext(UserContext);

  return (
    <div className="flex flex-col mx-auto w-2/3 gap-4">
      <h1 className="text-4xl text-center font-bold text-gray-800">About</h1>
      <div className="flex flex-col my-8 gap-4">
        <span className="text-xl">
          <strong>Email:</strong> {email}
        </span>
        <span className="text-xl">
          <strong>Registration Date:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("en-US", options)}
        </span>
      </div>

      <Link
        to="notes"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white text-2xl py-2 px-4 rounded-full self-center"
      >
        Go to Notes
      </Link>
    </div>
  );
};