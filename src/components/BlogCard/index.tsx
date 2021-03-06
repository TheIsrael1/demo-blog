import React from 'react'
import './blogCard.css'
import { useUsers } from '../../context/UserContextProvider'
import { useNavigate } from 'react-router-dom'
import outsideLink from "../../assets/outsideLink.png"
interface BlogCardInterface{
userId: number
title: string
postId: number
}

const BlogCard = ({title, userId, postId}: BlogCardInterface) => {

  const {getUserDetails} = useUsers()

  const navigate = useNavigate()

  return (
    <div className='blogCard'
    onClick={()=>navigate(`/blog/${postId}`)}
    >
                <div className="overlay"></div>
                <img className='cardImg' src="https://images.pexels.com/photos/7393980/pexels-photo-7393980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              <div className="blogCardInner">
                      <span className="blogAuthor">
                       By  {getUserDetails?.(userId)?.username}
                      </span>
                      <span className="blogEmail">{getUserDetails?.(userId)?.email}</span>
                      <span className="blogTitle">
                        {title}
                      </span>
              </div>
              <img width={30} src={outsideLink} alt="link" className='outsideLink'/>
    </div>
  )
}

export default BlogCard