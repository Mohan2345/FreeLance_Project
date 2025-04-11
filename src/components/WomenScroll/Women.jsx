import React from "react"
import "./Women.css"
import video from "../../Aseets/LehengaVideo.mp4"
import { useNavigate } from "react-router-dom"

const Women = () => {

  const navigate = useNavigate()

  const sareeCategories = [
    {
      id: 1,
      title: "Hand Painted Saree",
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
      title: "Embroidered Saree",
      image:
        "https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/6/2683sr08-2028.jpg",
      productType: "Embroidered saree",
    },
  ]

  const dressCategories = [
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
    {
      id: 6,
      title: "2 Piece Kurta Set",
      image: "https://m.media-amazon.com/images/I/51DgwCpeViL._AC_UY1100_.jpg",
      productType: "2 Piece Kurta Set",
    },
  ]

  const handleCardClick = (productType) => {
    navigate(`/womens?productType=${encodeURIComponent(productType)}`)
  }

  return (
    <section className="women-section">
      <h2 className="women-section-title">Women's Collection</h2>

      {/* Sarees Section */}
      <div className="category-container">
        <h3 className="category-title">Sarees</h3>
        <div className="category-grid">
          {sareeCategories.map((category) => (
            <div key={category.id} className="category-card" onClick={() => handleCardClick(category.productType)}>
              <img src={category.image || "/placeholder.svg"} alt={category.title} className="category-image" />
              <div className="category-overlay">
                <h4 className="category-card-title">{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dresses Section */}
      <div className="category-container">
        <h3 className="category-title">Dresses</h3>
        <div className="category-grid">
          {dressCategories.map((category) => (
            <div key={category.id} className="category-card" onClick={() => handleCardClick(category.productType)}>
              <img src={category.image || "/placeholder.svg"} alt={category.title} className="category-image" />
              <div className="category-overlay">
                <h4 className="category-card-title">{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lehenga Animation Section */}
      <h2
        className="lehenga-title"
        style={{
          textAlign: "center",
          margin: "1rem 0",
          color: "black",
          fontSize: "2rem",
          fontWeight: "600",
          fontFamily: "sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1px",
          lineHeight: "1.5",
          textDecoration: "none",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
          animation: "fadeInMoveUp 1s ease-in-out",
          animationFillMode: "forwards",
          animationDelay: "0.5s",
          animationIterationCount: "1",
        }}
      >
        Enchanting Lehengas for a Dream Wedding
      </h2>

      {/* Video Section */}
      <section className="video-container" style={{ marginTop: "0.5rem", position: "relative" }}>
        <video className="w-100" autoPlay loop muted playsInline controls src={video} />
        <button className="shop-now-btn" onClick={() => handleCardClick("Lehenga")}>
          SHOP NOW
        </button>
      </section>
    </section>
  )
}

export default Women

