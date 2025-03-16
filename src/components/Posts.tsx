// src/components/Posts.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/postService";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  // Correctly specifying the types for the query hook
  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: ["posts"], // Query key
    queryFn: fetchPosts, // Fetch function
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <ul className="posts-list">
        {data?.map((post) => (
          <li key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
