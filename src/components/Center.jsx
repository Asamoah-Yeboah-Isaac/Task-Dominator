import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import Column from "./Column";

const Center = ({ boardModalOpen, setBoardModalOpen }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  // const boards = useSelector((state) => state)
  const boards = useSelector((state) => state.boardSlice);
  // const board =boards.find((board) => board.isActive === true)
  const board = boards && boards.find((board) => board.isActive === true);
  // const columns = board.columns
  const columns = board ? board.columns : [];
  //track screen size
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6"
      }
    >
      {windowSize[0] >= 768 && <SideBar />}

      {/* column section  */}
      {columns.map((col, index) => (
        // <Column key={index} colIndex={index} />
        <Column key={index} colIndex={index} columns={columns} />

      ))}
    </div>
  );
};

export default Center;
