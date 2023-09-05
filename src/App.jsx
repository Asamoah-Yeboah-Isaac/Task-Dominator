import React, { useState } from 'react'
import Header from './components/Header'

const App = () => {
  const [boardModalOpen, setBoardModalOpen] = useState(false)
  return (
    <div>
      <Header boardModalOpen = {boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
      {/* <Center/>  */}
    </div>
  )
}

export default App