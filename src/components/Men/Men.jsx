import React from 'react';
import { useNavigate } from "react-router-dom";
import './Men.css';
import kurta from "../../Aseets/men kurta.jpg";
import suit from "../../Aseets/men suit.webp";
import nehru from "../../Aseets/men nj.jpg";
import sherwani from "../../Aseets/men sherwani.jpg";

function Men() {
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            title: "KURTAS",
            image: kurta,
            productType: "kurtaSets",
        },
        {
            id: 2,
            title: "SUITS",
            image: suit,
            productType: "suits",
        },
        {
            id: 3,
            title: "NEHRU JACKETS",
            image: nehru,
            productType: "nehruJackets",
        },
        {
            id: 4,
            title: "SHERWANIS",
            image: sherwani,
            productType: "sherwanis",
        },
    ];

    const handleCategoryClick = (productType) => {
        navigate(`/mens?productType=${productType}`);
    };

    return (
        <div className="men-container my-5">
            <h2 className="men-section-title">MEN'S COLLECTION</h2>
            <div className="row g-4">
                {categories.map((category) => (
                    <div key={category.id} className="col-12 col-md-6 col-lg-3">
                        <div
                            onClick={() => handleCategoryClick(category.productType)}
                            className="text-decoration-none"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="men-card border-0">
                                <div className="men-card-img-container">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        className="men-card-img-top"
                                        alt={category.title}
                                    />
                                </div>
                                <div className="men-card-body text-center">
                                    <h5 className="men-card-title text-dark">{category.title}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Men;