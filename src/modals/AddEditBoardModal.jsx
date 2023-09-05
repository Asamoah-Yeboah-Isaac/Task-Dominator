import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch } from "react-redux";
import boardSlice from '../redux/boardsSlice'

const AddEditBoardModal = ({ setBoardModalOpen, type, title }) => {
    // hooks 
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "ToDo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true)
  const  dispatch = useDispatch()

  const onChange = (id, newValue) => {
    setNewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((perState) => perState.filter((el) => el.id !== id))
  }
       
//    validte 
  const validate =() => {
     setIsValid(false)
     if(!name.trim()){
        return false
     }
     for(let i = 0; i < newColumns.length; i++){
        if(!newColumns[i].name.trim()){
            return false
        }
     }
     setIsValid(true)
     return true
  }

//   submit 
  const onSubmit = (type) => { 
     setBoardModalOpen(false)
     if(type === 'add'){
       dispatch(boardSlice.actions.addBoard({name, newColumns}))
     }else{
          dispatch(boardSlice.actions.editBoard({name, newColumns}))
     }
  }
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
        {/* Board Columns   */}
        <div className="mt-8 flex flex-col space-y-3 ">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500 ">
            Board Colums
          </label>
          {newColumns.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                type="text"
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
              />
              <img src={crossIcon} className="cursor-pointer m-4" onClick={(e)=>{
                onDelete(column.id)
              }} />
            </div>
          ))}
        </div>
        {/* add new column button  */}
         <div>
            <button className="w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 mt-2 rounded-full" onClick={()=>{
                setNewColumns((state)=>[
                    ...state,
                    {name: " ", task:[],id : uuidv4()}
                ])
            }}>
                    + Add new column
            </button>
            <button className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full" onClick={()=>{
                const isValid = validate()
                if(isValid === true) onSubmit(type)
            }}> 
               {type === 'add'? 'Create New Board' : 'Save Changes'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
