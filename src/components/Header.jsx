import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import downIcon from "../assets/icon-chevron-down.svg";
import upIcon from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import EllipseMenu from "./EllipseMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState();
  const [isEllipseOpen, setIsEllipseOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //   dynamic button type
  const [boardType, setBoardType] = useState();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsEllipseOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEllipseOpen(false);
  };

  const onDeleteBtnClick = () =>{
     dispatch( boardsSlice.actions.deleteBoard())
     dispatch(boardsSlice.actions.setBoardActive({index : 0}))
     setIsDeleteModalOpen(false) 
  }

  const onDropdownClick = () => {
     setOpenDropDown ( state => !state)
     setIsEllipseOpen(false)
     setBoardType('add')
  }
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* left side  */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-2xl">
            Dominator
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] font-bold font-sans text-xl md:text-2xl md:ml-20   ">
              {board.name}
            </h3>
            <img
              src={openDropDown ? upIcon : downIcon}
              alt="dropdown-icon"
              className="w-3 ml-2 md:hidden cursor-pointer"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        {/* right side  */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button onClick={() => {
              setOpenAddEditTask((state) => !state);
            }} className="hidden md:block button ">+ Add New Task</button>

          {/* button for mobile and small screens  */}
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
          <img
            src={elipsis}
            onClick={() => {
              setBoardType("edit");
              setOpenDropDown(false);
              setIsEllipseOpen((state) => !state);
            }}
            alt="elipsis"
            className="cursor-pointer h-6"
          />

          {/* ellipse section  */}
          {isEllipseOpen && (
            <EllipseMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Boards"
            />
          )}
        </div>
      </header>

      {/* drop down display for small screens */}
      {openDropDown && (
        <HeaderDropDown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropDown={setOpenDropDown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
      {isDeleteModalOpen && <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} title={board.name} type='board'/>}
    </div>
  );
};

export default Header;
