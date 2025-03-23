// src/components/PostDetails.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchPost = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}`);
  return response.data;
};

const fetchComments = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return response.data;
};

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });
  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
    enabled: !!post, // Fetch comments only when post data is available
  });

  if (postLoading) return <div>Loading post...</div>;
  if (commentsLoading) return <div>Loading comments...</div>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <h2>Comments</h2>
      <ul>
        {comments?.map((comment: any) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
