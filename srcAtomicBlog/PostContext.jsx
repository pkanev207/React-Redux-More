/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";
// ContextAPI is best suited to manage UI state!!!
// we can use useRef for local state and it won't rerender the component..

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// 1) CREATE A NEW CONTEXT
// whenever the context value changes - all the consumers rerenders
// this is basically a component
// the components become much more cleaner and reusable
export const PostContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");

  return context;
}

// custom context provider component:
export default function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  // creates 30 random posts with mapFn - a function to call on every element of the array
  // If provided, every value to be added to the array is first passed through this function,
  // and mapFn's return value is added to the array instead.
  // It's called with the following arguments: the current el, the index of the current el

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
