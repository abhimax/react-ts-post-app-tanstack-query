const OptimisticUpdate: React.FC = () => {
  return <h1>OptimisticUpdate</h1>;
};
export default OptimisticUpdate;

// // src/components/OptimisticUpdate.tsx
// import React from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// const BASE_URL = "https://jsonplaceholder.typicode.com";

// const deletePost = async (postId: number) => {
//   const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
//   return response.data;
// };

// const OptimisticUpdate: React.FC = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation(deletePost, {
//     onMutate: async (postId) => {
//       await queryClient.cancelQueries(["posts"]);
//       const previousPosts = queryClient.getQueryData(["posts"]);
//       queryClient.setQueryData(["posts"], (oldPosts: any) =>
//         oldPosts.filter((post: any) => post.id !== postId)
//       );
//       return { previousPosts };
//     },
//     onError: (err, postId, context) => {
//       queryClient.setQueryData(["posts"], context.previousPosts);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(["posts"]);
//     },
//   });

//   return (
//     <div>
//       <h1>Delete a Post</h1>
//       <button onClick={() => mutation.mutate(1)}>Delete Post with ID 1</button>
//       {mutation.isError && <p>Error deleting post</p>}
//       {mutation.isLoading && <p>Deleting...</p>}
//     </div>
//   );
// };

// export default OptimisticUpdate;
