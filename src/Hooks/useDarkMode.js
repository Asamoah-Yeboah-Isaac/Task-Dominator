import React, { useEffect, useState } from 'react'

const useDarkMode = () => {
  // get state from storage   
    const [theme, setTheme] = useState( localStorage.theme )
    const colorTheme = theme === 'dark' ? 'light' : 'dark'

//   apply the darkmode 
useEffect(() =>{
     const root = window.document.documentElement
     root.classList.remove(colorTheme)
     root.classList.add(theme)
     localStorage.setItem('theme' , theme)
    },[theme, colorTheme])

    return [theme , colorTheme]

}

export default useDarkMode