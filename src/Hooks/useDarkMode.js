import React, { useEffect, useState } from 'react'

const useDarkMode = () => {
  // get state from storage   
    const [theme, setTheme] = useState( localStorage.theme || 'light' )
    const colorTheme = theme === 'dark' ? 'light' : 'dark'

//   apply the darkmode 
useEffect(() =>{
     const root = window.document.documentElement
     root.classList.remove(colorTheme)
     root.classList.add(theme)
     localStorage.setItem('theme' , theme)
    },[theme, colorTheme])

    const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return [theme , colorTheme,toggleTheme]

}

export default useDarkMode