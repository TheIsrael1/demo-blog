import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePost } from '../../adapters/blogsService'
import { getSingleUser } from '../../adapters/userService'
import { useBlogs } from '../../context/BlogContextProvider'
import { useUsers } from '../../context/UserContextProvider'
import "./singleBlog.css"

interface BlogInterface{
  title: string
  body: string
}

interface UserInterface{
  name: string
  email: string
  website: string
  username: string
}

const SingleBlog = () => {

  const [state, setState] = useState({
    blog: {} as BlogInterface,
    user: {} as UserInterface,
    loading: true
  })
  const {id} = useParams()

 const getBlog = useCallback(async()=>{
  try{
    const {data} = await getSinglePost(id)
    setState((prev)=>{
      return{
        ...prev,
        blog: data
      }
    })
    getUser(data.userId)
  }catch(err){
    console.log(err)
  }finally{
    setState((prev)=>{
      return{
        ...prev,
        loading: false
      }
    })
  }
 },[id])

 useEffect(()=>{
  getBlog()
 },[getBlog])

 const getUser = useCallback(async(id: number) =>{
   try{
     const {data} =  await getSingleUser(id)
     setState((prev)=>{
       return{
         ...prev,
         user: data,
       }
     })
   }catch(err){
     console.log(err)
   }
 },[])

  return state.loading ?
  <div className="loader">
    loading...
  </div>
  :
  (
    <div className='SingleBlog'>
        <div className="titleCon">
            <h1 className="title">
                {state?.blog?.title}
            </h1>
            <span className="authorDetails">
              {state?.user?.name} aka {state.user?.username} | {state.user?.email} | {state.user?.website}
            </span>
        </div>
        <div className="imgCon">
          
        </div>
          <p className="singleBlogContent">
            {state.blog?.body}
          </p>
    </div>
  )
}

export default SingleBlog