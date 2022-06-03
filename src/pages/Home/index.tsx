import React, { useCallback, useEffect, useState } from "react";
import { getAllPosts } from "../../adapters/blogsService";
import { getAllUsers } from "../../adapters/userService";
import BlogCard from "../../components/BlogCard";
import SearchBox from "../../components/SearchBox";
import { useBlogs } from "../../context/BlogContextProvider";
import { useUsers } from "../../context/UserContextProvider";
import "./home.css";

type KeyboardEventHTML = React.KeyboardEvent<HTMLInputElement>;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currOrder, setCurrOrder] = useState("default");

  const { blogs, updateBlogs } = useBlogs();
  const { updateUsers, getUserDetails } = useUsers();

  const getBlogs = useCallback(async () => {
    try {
      const { data } = await getAllPosts();
      updateBlogs?.(data);
    } catch (err) {
      alert(err);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      updateUsers?.(data);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBlogs();
    getUsers();
  }, [getBlogs, getUsers]);

  const searchBlogs = (str: string) => {
    const filteredBlogs = blogs?.filter?.((blog) => {
      return blog.title.includes(str) ||
        blog.body.includes(str) ||
        getUserDetails?.(blog.userId)
          ?.username.toLowerCase()
          .includes(str.toLowerCase())
        ? true
        : false;
    }) as [];
    updateBlogs?.(filteredBlogs);
    setIsSearching(false);
  };

  const handleKeySearchUp = (e: KeyboardEventHTML) => {
    (e.target as HTMLInputElement).value === ""
      ? setIsSearching(false)
      : setIsSearching(true);
  };

  const orderByTitle = () => {
    setCurrOrder("title");
    const orderedBlogs = blogs.sort((a, b) =>
      a.title.localeCompare(b.title)
    ) as [];
    updateBlogs?.(orderedBlogs);
  };

  const orderByUsername = () => {
    setCurrOrder("name");
    const orderedBlogs = blogs.sort((a, b) =>
      getUserDetails?.(a.userId).username.localeCompare(
        getUserDetails?.(b.userId).username
      )
    ) as [];
    updateBlogs?.(orderedBlogs);
  };

  const resetOrder = () => {
    setCurrOrder("default");
    getBlogs();
  };

  return loading ? (
    <div className="loader">loading Your Fav...</div>
  ) : (
    <div className="home">
      <div className="titleCon">
        <h1 className="title">Your Fav Blog</h1>
      </div>
      <SearchBox
        fallback={() => getBlogs()}
        handleKeySearchUp={handleKeySearchUp}
        search={(i: string) => searchBlogs(i)}
      />
      <div className="searchloaderCon">
        {isSearching && <span className="searchloader">searching...</span>}
      </div>
      <div className="filterCon">
        <div
          className={`filterBox ${currOrder === "name" && `active`}`}
          onClick={() => orderByUsername()}
        >
          Order By UserName
        </div>
        <div
          className={`filterBox ${currOrder === "title" && `active`}`}
          onClick={() => orderByTitle()}
        >
          Order By Tiltle
        </div>
        <div className="filterBox" onClick={() => resetOrder()}>
          Reset Order
        </div>
      </div>
      <div className="contentCon">
        {blogs.length === 0 ? (
          <div className="nodata">
            No data relating to this! try something else my friend!
          </div>
        ) : (
          blogs?.map?.((blog, idx: number) => {
            return (
              <BlogCard
                title={blog?.title}
                userId={blog?.userId}
                postId={blog?.id}
                key={idx * Math.random()}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
