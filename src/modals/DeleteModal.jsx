import React from 'react'

const DeleteModal = ({type, title, onDeleteBtnClick,setIsDeleteModalOpen}) => {
  return (
    // delete modal container 
    <div className='fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]' onClick={(e)=>{
          if(e.target !== e.currentTarget){
            return 
          }
          setIsDeleteModalOpen(false)
    }}>

        {/* delete modal  */}
        <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl'>
            <h3 className='font-bold text-red-500 text-xl'>
                Delete this {type} ?
            </h3>
            {type === 'task' ? (
                <p className='text-gray-500 font-semibold tracking-wider text-sm pt-6 '>
                     Are you sure you want to delete this "{title}"
                     task and its subtasks?
                     This action cannot be reversed.
                </p>
            ) : <p  className='text-gray-500 font-semibold tracking-wider text-sm pt-6'>
                Are you sure you want to delete the "{title}" board?
                This action will remove all columns and tasks and cannot be reserved.
            </p>
            }

        </div>

    </div>
  )
}

export default DeleteModal