import { useMutation } from "@tanstack/react-query";

interface CreatePostData {
  userId: string;
  imageUrl: string;
  caption?: string;
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },
  });
};
