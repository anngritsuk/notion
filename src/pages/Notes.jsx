import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Api } from "../utils/api";
import { Link } from "react-router-dom";
import { options } from "../utils/const";

export const Notes = () => {
  const { user, loading: ctxLoading } = useContext(UserContext);
  const [loading, setLoading] = useState(ctxLoading);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      setLoading(true);
      const res = await Api.getNotes({ userId: user.id });
      setNotes(res);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ctxLoading) {
      setLoading(ctxLoading);
      return;
    }
    getNotes();
  }, [user, ctxLoading]);

  const handleDelete = async (id) => {
    await Api.deleteNote(id);
    getNotes();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user?.id) {
    return <div className="text-center">Войдите, чтобы увидеть свои заметки</div>;
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-3xl text-center mb-5">Notes</h1>
      <div className="flex justify-center mb-5">
        <Link
          to="add"
          className="border-2 border-black px-4 py-2 text-2xl bg-white rounded-full"
        >
          Добавить новую заметку
        </Link>
      </div>

      {notes.length ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between cursor-pointer"
          >
            <Link to={`${note.id}`} className="flex-1">
              <div className="text-xl font-semibold">{note.title}</div>
              <div className="text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleDateString("ru-Ru", options)}
              </div>
            </Link>
            <div>
              <Link
                to={`${note.id}/edit`}
                className="rounded-full p-2 bg-blue-500 text-white hover:bg-blue-700"
              >
                ✍️
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="rounded-full p-2 bg-red-500 text-white hover:bg-red-700"
              >
                🗑
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-3xl text-center mt-5">Нет заметок</div>
      )}
    </div>
  );
};