import React, { createContext, useState, useContext } from 'react';


interface BlogContextInterface{
    blogs: any[]
    updateBlogs?: (b: [])=> void
    getSingleBlog?: (b: string)=> any
}

interface ComponentProps{
    children?: React.ReactNode;
  };


const defaultState = {
    blogs: []
}

const blogContext = createContext<BlogContextInterface>(defaultState)

export const useBlogs = () => useContext(blogContext)

export const BlogContextProvider: React.FC<ComponentProps> = ({children}) => {
    
    const [blogs, setBlogs] = useState(defaultState.blogs)
    
   const updateBlogs = (b: []) =>{
        setBlogs(b)
    }

    const getSingleBlog = (blogId: string) =>{
        const singleBlog = blogs?.find?.((blog:any)=> `${blog.id}` === blogId)
        return singleBlog
    } 
    return(
            <blogContext.Provider value={{blogs, updateBlogs, getSingleBlog}}>
                {children}
            </blogContext.Provider>
    )
}