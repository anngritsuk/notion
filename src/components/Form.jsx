import {
  Link,
  Form as RForm,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Api } from "../utils/api";

export const Form = ({ title, submit, method }) => {
  const data = useActionData();
  const note = useLoaderData();

  return (
    <RForm method={method}>
      <div className="flex flex-col items-center gap-4 w-3/4 mx-auto">
        <Link
          to="/notes"
          className="border-2 border-black bg-white text-black px-4 py-2 text-lg text-center rounded-full"
        >
          Go Back
        </Link>
        <h1 className="text-4xl text-center mb-6 capitalize">{title}</h1>
        <input
          type="text"
          className="border-2 border-gray-500 py-3 px-4 focus:outline-none focus:border-blue-500"
          name="title"
          defaultValue={note?.title}
        />
        {data?.errors?.message && (
          <div className="text-red-500 text-lg">{data?.errors?.message}</div>
        )}
        <textarea
          className="border-2 border-gray-500 h-[30vh] px-4 py-3 focus:outline-none focus:border-blue-500"
          name="content"
          defaultValue={note?.content}
        ></textarea>
        {data?.success?.message && (
          <div className="text-green-500 text-lg">
            {data?.success?.message}
          </div>
        )}
        <div className="flex gap-4">
          <button
            type="submit"
            className=" bg-blue-500 text-white px-4 py-2 text-2xl rounded-full hover:bg-blue-600"
            name="intent"
            value={method}
          >
            {submit}
          </button>
          <Link
            to="/notes"
            className="bg-red-500 text-white px-4 py-2 text-2xl rounded-full hover:bg-red-600"
          >
            Cancel
          </Link>
        </div>
      </div>
    </RForm>
  );
};

export const action = async ({ request, params: { id } }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  if (!title.trim())
    return { errors: { message: "Title should not be empty" } };
  switch (request.method) {
    case "PUT":
      await Api.putNote({
        title,
        content,
        id,
        userId: localStorage.getItem("userId"),
      });
      return { success: { message: "Note successfully updated" } };
    case "POST":
      await Api.postNote({
        title,
        content,
        userId: localStorage.getItem("userId"),
      });
      return redirect("/notes");
    default:
      break;
  }
  return null;
};

export const loader = async ({ params: { id } }) => {
  if (!id) {
    return null;
  }
  console.log(localStorage.getItem("userId"));
  return Api.getNote({ id, userId: localStorage.getItem("userId") });
};