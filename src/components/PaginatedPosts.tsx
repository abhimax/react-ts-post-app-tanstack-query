import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPaginatedPosts } from "../services/postService";

// Define the type for a Post
interface Post {
  id: number;
  title: string;
  body: string;
}

const PaginatedPosts: React.FC = () => {
  // Specify the data type as Post[]
  const limit = 25;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", limit],
      //queryFn: fetchPaginatedPosts,
      queryFn: ({ pageParam = 1 }) => fetchPaginatedPosts({ pageParam, limit }),
      getNextPageParam: (lastPage, pages) =>
        lastPage.length ? pages.length + 1 : undefined,
      initialPageParam: 1,
    });

  return (
    <div className="posts-container">
      <h1>Paginated Posts</h1>
      <ul className="posts-list">
        {/* Type the data as an array of pages, each page containing Post[] */}
        {data?.pages.map((page) =>
          page.map(
            (
              post: Post // Specify the type for each post here
            ) => (
              <li key={post.id} className="post">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            )
          )
        )}
      </ul>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No More Posts"}
        </button>
      </div>
    </div>
  );
};

export default PaginatedPosts;
