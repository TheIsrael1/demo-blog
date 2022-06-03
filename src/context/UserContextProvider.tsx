import React, { createContext, useState, useContext } from 'react';


interface UserContextInterface{
    users: any[]
    updateUsers?: (b: [])=> void
    getUserDetails?: (i: number)=> any
}

interface ComponentProps{
    children?: React.ReactNode;
  };


const defaultState = {
    users: []
}

const userContext = createContext<UserContextInterface>(defaultState)

export const useUsers = () => useContext(userContext)

export const UserContextProvider: React.FC<ComponentProps> = ({children}) => {
    
    const [users, setUsers] = useState(defaultState.users)
    
   const updateUsers = (b: []) =>{
        setUsers(b)
    }

    const getUserDetails = (i: number) => {
        const user = users?.find((user: any) => user?.id === i)
            return user 
    }

    return(
            <userContext.Provider value={{users, updateUsers, getUserDetails}}>
                {children}
            </userContext.Provider>
    )
}