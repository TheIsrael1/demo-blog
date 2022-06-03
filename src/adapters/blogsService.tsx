import axios  from "axios";

export const getAllPosts = async () =>
    axios.get(
        `https://jsonplaceholder.typicode.com/posts`
    )

export const getSinglePost = async (id: any) =>
        axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        )