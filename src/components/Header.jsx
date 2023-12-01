import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
export const Header = () => {
  const { user, onChange } = useContext(UserContext);
  return (
    <header className="w-full flex py-2 justify-between text-2xl">
      <Link t0="/" className="mx-3 font-bold">
        {user?.email && `Hello, ${user.email}`}
      </Link>
      <nav>
        <ul className="flex gap-5">
          <li>
            {user?.id && (
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "text-red-700" : "";
                }}
              >
                About
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => {
                return isActive ? "text-red-700" : "";
              }}
            >
              Notes
            </NavLink>
          </li>
          <li>
            {user?.id ? (
              <NavLink onClick={() => onChange(null)} to="/signup">
                Log out
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive ? "text-red-700" : "";
                }}
              >
                Sign up
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
