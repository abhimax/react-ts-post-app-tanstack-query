import React, { useState } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

// Define the type for the new post
interface NewPost {
  title: string;
  body: string;
}

// Define the type for the post response (including id, which is returned by the API)
interface Post {
  id: number;
  title: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

// The mutation function (addPost) that returns a Promise<Post>
const addPost = async (newPost: NewPost): Promise<Post> => {
  const response = await axios.post(`${BASE_URL}/posts`, newPost);
  return response.data;
};

const PostMutation: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  // Define the query key locally for invalidation, with type as const
  const POSTS_QUERY_KEY: readonly ["posts"] = ["posts"];

  // Use the correct types for useMutation and explicitly assert the type for mutation
  const mutation = useMutation<Post, Error, NewPost>({
    mutationFn: addPost, // Pass the function (mutationFn)
    onSuccess: () => {
      // Invalidate queries related to posts using the constant query key
      queryClient.invalidateQueries({
        queryKey: POSTS_QUERY_KEY,
        refetchType: "active", // Adjust the refetch type as per your need
      });
    },
  }) as UseMutationResult<Post, Error, NewPost>; // Assert the mutation result type

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, body }); // Pass the correct object to the mutate function
    setTitle(""); // Reset the title input after submission
    setBody(""); // Reset the body input after submission
  };

  return (
    <div className="posts-container">
      <h1>Add a Post</h1>
      <div className="posts-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add Post"}
          </button>
        </form>
      </div>
      {mutation.isError && <p>Error adding post</p>}
    </div>
  );
};

export default PostMutation;
