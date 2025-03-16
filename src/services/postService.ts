// src/services/postService.ts
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

//export const fetchPaginatedPosts = async ({ pageParam = 1 }) => {
export const fetchPaginatedPosts = async ({
  pageParam,
  limit,
}: {
  pageParam?: number;
  limit?: number;
}) => {
  console.log("pageParam >>>", pageParam);
  const response = await axios.get(
    `${BASE_URL}/posts?_page=${pageParam}&_limit=${limit}`
  );
  return response.data;
};
