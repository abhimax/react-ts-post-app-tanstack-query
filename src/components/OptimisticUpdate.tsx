import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Define the type for the posts
interface Post {
  id: number;
  title: string;
  body: string;
}

const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/posts/${postId}`);
};

const OptimisticUpdate: React.FC = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId: number) => {
      // Optimistically update the UI
      await queryClient.cancelQueries(["posts"]);
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) =>
        oldPosts ? oldPosts.filter((post) => post.id !== postId) : []
      );
      return { previousPosts };
    },
    onError: (err, postId, context) => {
      // Rollback to the previous state if mutation fails
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => {
      // Refetch the posts after the mutation
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <div>
      <h1>Delete a Post</h1>
      <button onClick={() => mutation.mutate(1)}>Delete Post with ID 1</button>
      {mutation.isError && <p>Error deleting post</p>}
      {mutation.isLoading && <p>Deleting...</p>}
      {mutation.isSuccess && <p>Post deleted successfully!</p>}
    </div>
  );
};

export default OptimisticUpdate;
