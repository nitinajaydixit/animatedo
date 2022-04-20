import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, formatDistanceStrict } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoslice";
import { Modal } from "./Modal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  // const [checked, setChecked] = useState(false);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Successfully deleted!");
  };

  const handleEdit = () => {
    setUpdateModalOn(true);
  };

  let due = formatDistanceStrict(new Date(todo.taskDeadline), new Date(), {
    unit: "day",
  });
  if (due === "0 days") {
    due = "Today";
  }
  return (
    <>
      <div className="w-full space-y-5 mb-4">
        <div className="max-w-xl mx-auto px-4 py-2 bg-white dark:bg-slate-800 dark:text-slate-300 rounded-md shadow-lg">
          <label className="flex items-center">
            <input
              className="rounded text-cyan-500 scale-125 focus:ring-cyan-500"
              type="checkbox"
              //   onChange={() => { setDone(!done) }}
            />
            <div className="ml-4 flex-1 whitespace-nowrap text-ellipsis overflow-hidden ...">
              <span className="relative px-1">
                {todo.taskName}
                {/* <div className="absolute left-0 top-1/4 w-full h-2 border-b-[1px] border-black dark:border-slate-50" style="width: 0%;"></div> */}
              </span>
              <span className="relative px-1 block font-light text-xs truncate ...">
                {todo.taskDescription}
              </span>
              <span className="relative px-1 block font-light text-xs">
                Due: <span className="text-red-400 font-normal">{due}</span>
              </span>
              <span className="relative px-1 block font-light text-xs">
                created at:{" "}
                {format(new Date(todo.creationTime), "p, dd/MM/yyyy")}
              </span>
            </div>

            <button
              className="ml-2 focus-visible:outline-cyan-500 hover:text-red-500 mr-2"
              aria-label="Remove Task"
              onClick={() => handleDelete()}
            >
              <FontAwesomeIcon icon={solid("trash-can")}></FontAwesomeIcon>
            </button>
            <button
              className="ml-2 focus-visible:outline-cyan-500 hover:text-blue-500"
              aria-label="Edit Task"
              onClick={() => handleEdit()}
            >
              <FontAwesomeIcon icon={solid("pencil")}></FontAwesomeIcon>
            </button>
          </label>
        </div>
      </div>
      <Modal
        modalOn={updateModalOn}
        setModalOn={setUpdateModalOn}
        type="update"
        todo={todo}
      ></Modal>
    </>
  );
};

export default TodoItem;
