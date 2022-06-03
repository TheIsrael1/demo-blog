import axios  from "axios";

export const getAllUsers = async () =>
    axios.get(
        `https://jsonplaceholder.typicode.com/users`
    )

export const getSingleUser = async (id: any) =>
axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
)
