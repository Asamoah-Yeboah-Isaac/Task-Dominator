import React, { useState } from "react";

const AddEditBoardModal = ({ setBoardModalOpen, type, title }) => {
  const [name, setName] = useState("");
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 bottom-0 scrollbar-hide px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] h-full"
    >
      {/* Modal section   */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7c] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>
        {/* Task Name  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          <input
            type="text"
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g. Web development"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
