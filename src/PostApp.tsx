import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, CardContent, Input, Textarea } from "@/components/ui";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const createPost = async (post: { title: string; body: string }) => {
  const { data } = await axios.post(API_URL, post);
  return data;
};

const updatePost = async (post: {
  id: number;
  title: string;
  body: string;
}) => {
  const { data } = await axios.put(`${API_URL}/${post.id}`, post);
  return data;
};

const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export default function PostApp() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, isError } = useQuery(["posts"], fetchPosts);

  const mutationCreate = useMutation(createPost, {
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: any) => [
        ...oldPosts,
        newPost,
      ]);
    },
  });

  const mutationUpdate = useMutation(updatePost, {
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: any) =>
        oldPosts.map((post: any) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    },
  });

  const mutationDelete = useMutation(deletePost, {
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["posts"], (oldPosts: any) =>
        oldPosts.filter((post: any) => post.id !== deletedId)
      );
    },
  });

  const [newPost, setNewPost] = useState({ title: "", body: "" });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading posts.</p>;

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Create Post</h2>
          <Input
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Button onClick={() => mutationCreate.mutate(newPost)}>
            Add Post
          </Button>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold">Posts</h2>
      {posts.map((post: any) => (
        <Card key={post.id} className="border p-4 space-y-2">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p>{post.body}</p>
          <Button
            onClick={() =>
              mutationUpdate.mutate({
                ...post,
                title: post.title + " (Updated)",
              })
            }
          >
            Update
          </Button>
          <Button
            onClick={() => mutationDelete.mutate(post.id)}
            className="bg-red-500 hover:bg-red-700"
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}
