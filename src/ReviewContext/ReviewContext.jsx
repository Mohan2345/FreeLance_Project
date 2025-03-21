
import { createContext, useContext, useState } from "react";
import initialReviews from "../initialReviews";  

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [productReviews, setProductReviews] = useState(initialReviews);

    const updateReviews = (productId, newReview) => {
        setProductReviews((prev) => ({
            ...prev,
            [productId]: [...(prev[productId] || []), newReview],
        }));
    };

    return (
        <ReviewContext.Provider value={{ productReviews, updateReviews }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewContext);