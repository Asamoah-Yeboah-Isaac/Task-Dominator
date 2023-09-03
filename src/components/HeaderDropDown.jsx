import React, { Component, useState } from "react";
import { useSelector } from "react-redux";
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import { Switch } from "@headlessui/react"
import useDarkMode from '../Hooks/useDarkMode'

const HeaderDropDown = ({ setOpenDropDown }) => {
         //  custom hook 
        const [theme, colorTheme, toggleTheme] = useDarkMode() 
        const [darkSide, setDarkSide] = useState(
          theme === 'dark')
              
        // function for switch Component 
        const toggleDarkMode = (checked) => {
          toggleTheme()
          setDarkSide(checked)
        }
         const boards = useSelector((state) => state.boards)
        

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-0 h-screen top-16 bg-[#00000080]"
      /* click anywhere to close modal dropdown except modal section */
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropDown(false); 
      }}
    >
      {/* Dropdown modal  */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="text-gray-600 dark:text-gray-300 font-semibold mx-4 mb-8">
          All Boards ({boards.length})
        </h3>
        <div>
          {boards.map((board, index) =>(
            <div className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`} key={index}>
              <img src={boardIcon} alt="boardIcon" className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>

          ))}

                   {/* create new board  */}
          <div className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4">
              <img src={boardIcon} alt="boardIcon" className="h-4" />
              <p className="text-lg font-bold">Create New Board</p>
          </div>
            {/* darkmode / lightmode  */}
               <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                <img src={lightIcon} alt="lightIcon" />

                <Switch checked={darkSide} onChange={toggleDarkMode} className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}> <span className={`${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition `}/> </Switch>

                <img src={darkIcon} alt="" />
               </div>

        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
