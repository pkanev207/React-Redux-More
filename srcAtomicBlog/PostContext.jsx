/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
// ContextAPI is best suited to manage UI state!!!
// we can use useRef for local state and it won't rerender the component..
// we should create one context per state to avoid too many rerenders
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// We should only optimize context only with three conditions: The state in the
// context changes all the time, have many consumers and the app is laggy

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
    Array.from({ length: 30 }, () => createRandomPost()),
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
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  // if we provide those 2 functions in the dependency array, we should
  // wrap them with useCallback, otherwise each time they will be recreated

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return (
    // children of the App.jsx, when gets recreated - also the value obj
    // gets recreated - this means that the context value has changed
    // therefore all the components that consume the context will rerender
    // we should memoize!!!
    <PostContext.Provider value={value}>
      {/* Either this technique with the children or memoize
      the direct descendants of the context */}
      {children}
    </PostContext.Provider>
  );
}
