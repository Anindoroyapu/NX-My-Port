"use client";
import React from "react";

const albums = [
  {
    title: "Human Connection",
    images: [
      {
        src: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Woman in brown hat drinking coffee",
      },
      {
        src: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Man pouring water on his head in a lake",
      },
      {
        src: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Woman in a grey coat getting out of a car",
      },
    ],
  },
  {
    title: "Abstract & Moody",
    images: [
      {
        src: "https://images.pexels.com/photos/8996541/pexels-photo-8996541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Foot in white sneaker on a disco ball",
      },
      {
        src: "https://images.pexels.com/photos/8901353/pexels-photo-8901353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Riot police with shields in black and white",
      },
      {
        src: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Close up of rocky ground in black and white",
      },
    ],
  },
  {
    title: "Urban & Still Life",
    images: [
      {
        src: "https://images.pexels.com/photos/4009023/pexels-photo-4009023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Dog reaching for food bowl",
      },
      {
        src: "https://images.pexels.com/photos/3224164/pexels-photo-3224164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Christmas decorations with candles",
      },
      {
        src: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Modern building at dusk",
      },
    ],
  },
];
const AlbumPage = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="bg-white">
      <section id="albums" className="container  my-5 py-md-5">
        <div className="text-center mb-5">
          <h2 className="fw-normal text-muted">Featured Albums</h2>
          <p className="text-muted">A glimpse into our curated collections.</p>
        </div>
        <div className="row justify-content-center">
          {albums.map((album, albumIndex) => (
            <div key={albumIndex} className="col-lg-4 col-md-6 mb-5">
              <a
                href="/project-details"
                className="text-decoration-none text-dark d-block text-center"
              >
                <div
                  className="position-relative d-flex justify-content-center align-items-center album-preview-container"
                  style={{ height: "280px", cursor: "pointer" }}
                >
                  {album.images.slice(0, 3).map((image, imgIndex) => {
                    const styles = [
                      {
                        zIndex: 3,
                        transform: "rotate(3deg) scale(1)",
                        transition: "transform 0.3s",
                      },
                      {
                        zIndex: 2,
                        transform: "rotate(-7deg) scale(0.95) translateY(20px)",
                        transition: "transform 0.3s",
                      },
                      {
                        zIndex: 1,
                        transform: "rotate(12deg) scale(0.9) translateY(30px)",
                        transition: "transform 0.3s",
                      },
                    ];

                    return (
                      <img
                        key={imgIndex}
                        src={image.src}
                        alt={image.alt}
                        className="img-fluid position-absolute shadow-lg rounded "
                        style={{
                          width: "85%",
                          height: "240px",
                          objectFit: "cover",
                          ...styles[imgIndex],
                          ...(hovered && {
                            transform: "rotate(1deg) scale(1)",
                          }),
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      />
                    );
                  })}
                </div>
                <div className="mt-3">
                  <h3 className="fw-normal text-muted h5 mb-1 ">
                    {album.title}
                  </h3>
                  <p className="text-muted small">{`A collection of ${album.images.length} photos`}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlbumPage;
