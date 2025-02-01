import React from "react";

export default function BlogArea() {
  return (
    <>
      <section className="blog-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title wow fadeInUp delay-0-2s">
                <h2>Stories</h2>
              </div>
            </div>
          </div>

          <div className="row blog-post-box align-items-center">
            <div className="col-lg-6">
              <div className="blog-post-img">
                <a href="#">
                  <img src="assets/images/blog/004.jpg" alt="" />
                </a>
                <div className="blog-post-category">
                  <a href="#">Birds Photography</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post-caption">
                <h3>Posted on Aug 28</h3>
                <h2>
                  <a className="link-decoration" href="#">
                    Capture the Beauty of Birds with a Stunning Photography!
                  </a>
                </h2>
                <a className="theme-btn theme-btn-two" href="#">
                  See more Photography <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="row blog-post-box align-items-center">
            <div className="col-lg-6">
              <div className="blog-post-img">
                <a href="#">
                  <img src="assets/images/blog/003.jpg" alt="" />
                </a>
                <div className="blog-post-category">
                  <a href="#">Animal Photography</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post-caption">
                <h3>Posted on sep 22</h3>
                <h2>
                  <a className="link-decoration" href="#">
                    Capture the Beauty of Animal with a Stunning Photography
                  </a>
                </h2>
                <a className="theme-btn theme-btn-two" href="#">
                  See more Photography <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="row blog-post-box align-items-center">
            <div className="col-lg-6">
              <div className="blog-post-img">
                <a href="#">
                  <img src="assets/images/blog/IMG_8650.jpg" alt="" />
                </a>
                <div className="blog-post-category">
                  <a href="#">Flower Photography</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post-caption">
                <h3>Posted on jan 18</h3>
                <h2>
                  <a className="link-decoration" href="#">
                    Capture the Beauty of Flower with a Stunning Photography
                  </a>
                </h2>
                <a className="theme-btn theme-btn-two" href="#">
                  See more Photography <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
