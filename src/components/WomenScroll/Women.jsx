import React, { useRef, useState, useEffect } from "react";
import "./Women.css";
import { useNavigate } from "react-router-dom";

const Women = () => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("forward");
  const [startPosition, setStartPosition] = useState(0);
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Hand painted Saree",
      image: "https://sareewave.com/cdn/shop/products/VSMENKA105.webp?v=1667455754&width=600",
      productType: "Hand painted Saree",
    },
    {
      id: 2,
      title: "Pattchitra Saree",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSf1OdwdUxfdGgbbhkRRaqrqoy8G7Dtfpn3g&s",
      productType: "Pattchitra Saree",
    },
    {
      id: 3,
      title: "Embroidered saree",
      image: "https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/6/2683sr08-2028.jpg",
      productType: "Embroidered saree",
    },
    {
      id: 4,
      title: "Kurtaset",
      image: "https://thejaipurloom.com/wp-content/uploads/2024/02/Picture1.jpg",
      productType: "Kurtaset",
    },
    {
      id: 5,
      title: "Co-ordset",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqMQdFreUtahcFyMxYkWXztWTSA5B9_z-xRg&s",
      productType: "Co-ordset",
    },
  ];

  const duplicatedCards = [...cards, ...cards];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setStartPosition(0);
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setScrollDirection("forward");
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScroll =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;
      const lastCardPosition = maxScroll / 2;
      setStartPosition(lastCardPosition);
      scrollContainerRef.current.scrollTo({
        left: lastCardPosition,
        behavior: "smooth",
      });
      setScrollDirection("reverse");
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const autoScroll = () => {
      if (scrollContainer && !isScrolling) {
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;

        if (scrollDirection === "forward") {
          scrollContainer.scrollBy({
            left: 5,
            behavior: "auto",
          });
          if (currentScroll >= maxScroll / 2) {
            setScrollDirection("reverse");
            setStartPosition(maxScroll / 2);
          }
        } else {
          scrollContainer.scrollBy({
            left: -5,
            behavior: "auto",
          });
          if (currentScroll <= 0) {
            setScrollDirection("forward");
            setStartPosition(0);
          }
        }
      }
    };

    const interval = setInterval(autoScroll, 50); // Adjusted interval for smoother scroll
    return () => clearInterval(interval);
  }, [isScrolling, scrollDirection]);

  const handleCardClick = (productType) => {
    navigate(`/womens?productType=${encodeURIComponent(productType)}`);
  };

  return (
    <section className="women-section">
      <h2 className="women-section-title mt-5">WOMEN'S COLLECTION</h2>
      <div className="women-scrollable-cards-container">
        <button
          className="women-scroll-button women-left"
          onClick={scrollLeft}
          aria-label="Scroll to first"
        >
          <span className="women-arrow">{"<"}</span>
        </button>
        <div
          className="women-cards-wrapper"
          ref={scrollContainerRef}
          onMouseEnter={() => setIsScrolling(true)}
          onMouseLeave={() => setIsScrolling(false)}
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="women-card"
              onClick={() => handleCardClick(card.productType)}
            >
              <img src={card.image} alt={card.title} className="women-card-image" />
              <div className="women-card-overlay">
                <h4 className="women-card-title">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <button
          className="women-scroll-button women-right"
          onClick={scrollRight}
          aria-label="Scroll to last"
        >
          <span className="women-arrow">{">"}</span>
        </button>
      </div>
    </section>
  );
};

export default Women;