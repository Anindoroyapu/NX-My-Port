import PostsPage from "@/components/posts/PostsPage";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const Page = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div
        className="bg-white"
        id="smooth-wrapper"
        style={{ paddingTop: "100px" }}
      >
        <div id="smooth-content">
          <PostsPage />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
