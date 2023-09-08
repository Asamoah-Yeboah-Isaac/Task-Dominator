import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const AddEditTaskModal = ({
  type,
  device,
  taskIndex,
  setOpenAddEditTask,
  pervcolIndex = 0,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  //   check if board.column exist before using "find" on it
  //   const board = useSelector((state) => state.board.find((board) => board.isActive))
  const board = useSelector(
    (state) => state.board && state.board.find((board) => board.isActive)
  );

  //   check if board exist before accessing column
  const columns = board ? board.columns : [];

  const col = columns.find((col, index) => index === pervcolIndex);
//   const [status, setStatus] = useState(columns[pervcolIndex].name);
  const status = col ? col.name : "";
  const [newColIndex, setNewColIndex] = useState(pervcolIndex);


//   subtask hook 
  const [subtask, setSubTask] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChange = (id, newValue) => {
    setSubTask((pervState) => {
      const newState = [...pervState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onchangeStatus = () => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDelete = (id) => {
    setSubTask((perState) => perState.filter((el) => el.id !== id));
  };
  //   console.log(columns)

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtask.length; i++) {
      if (!subtask[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onsubmit = (type) => {
    if (type === "add") {
      dispatch(boardsSlice.actions.addTask)({
        title,
        description,
        subtask,
        status,
        newColIndex,
      });
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtask,
          status,
          taskIndex,
          pervcolIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      {/* Modal section  */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>
        {/* Task Name  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="e.g. Time to code"
          />
        </div>
        {/* task description  */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Description
          </label>
          <textarea
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="e.g. Time for 3 hours a day coding session"
          />
        </div>
        {/* subtask section */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {subtask.map((subtask, index) => (
            <div
              onChange={(e) => {
                onChange(subtask.id, e.target.value);
              }}
              key={index}
              className="flex items-center w-full"
            >
              <input
                type="text"
                value={subtask.title}
                className="bg-transparent outline-none border focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]"
                placeholder="e.g. 3 hours non-stop coding"
              />
              <img
                onClick={() => {
                  onDelete(subtask.id);
                }}
                src={crossIcon}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}
          {/* add new suntask button  */}
          <button
            onClick={() => {
              setSubTask((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>
        {/* current status section  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-50">
            Current status
          </label>
          <select
            value={status}
            onChange={(e) => onchangeStatus(e)}
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onsubmit(type);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "Edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
