import PostsPage from "@/components/posts/PostsPage";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const Page = () => {
  return (
    <Wrapper>
      <div className=" bg-white">
        <PostsPage />
      </div>
    </Wrapper>
  );
};

export default Page;
