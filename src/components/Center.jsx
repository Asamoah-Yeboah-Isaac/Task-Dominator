import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'


const Center = ({boardModalOpen, setBoardModalOpen}) => {
const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight
])

cost [isSideBarOpen, setIsSideBarOpen] = useState(true)
//track screen size
useEffect(()=>{
  const handleWindowResize =()=>{
    setWindowSize([window.innerWidth, window.innerHeight])
  }
  window.addEventListener('resize' , handleWindowResize)

  return() =>{
    window.removeEventListener('resize', handleWindowResize)
  }
})

  return (
    <div className={windowSize[0] >= 768 && iSideBarOpen? 'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]' : 'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6' }>
       {
        windowSize[0] >= 768 && (
            <SideBar/>
        )
       }

       {/* column section  */}
        
    </div>
  )
}

export default Center