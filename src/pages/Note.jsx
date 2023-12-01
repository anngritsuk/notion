import { Api } from "../utils/api";
import { useLoaderData, Link, redirect, Navigate } from "react-router-dom";

export const Note = () => {
  const { title, content, id } = useLoaderData();

  const handleDelete = async (id) => {
    await Api.deleteNote(id);
    return <Navigate to="/notes" replace />;
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
      <Link
          to="/notes"
          className="border-2 border-black px-4 py-2 text-2xl rounded-full bg-white"
        >
          Назад
        </Link>
        <h1 className="text-5xl">{title}</h1>
        <div className="text-2xl">
          <button onClick={() => handleDelete(id)} className="rounded-full p-2 bg-red-500 text-white hover:bg-red-700">
            🗑️
          </button>
          <Link to={`edit`} className="rounded-full p-2 bg-blue-500 text-white hover:bg-blue-700">
            ✍️
          </Link>
        </div>
      </div>
      <div className="mt-4 text-2xl border-t border-black p-2">{content}</div>
    </div>
  );
};

export const loader = async ({ params: { id } }) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    const data = await Api.getNote({ id, userId });
    return data?.id ? data : redirect("/notes");
  }
};