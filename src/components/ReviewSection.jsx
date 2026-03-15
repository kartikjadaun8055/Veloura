import { useState, useEffect } from "react";
import { addReview, getReviews } from "../utils/storage";

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    setReviews(getReviews(productId));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...formData,
      rating: Number(formData.rating),
      createdAt: new Date().toLocaleString(),
    };

    addReview(productId, newReview);
    setReviews(getReviews(productId));
    setFormData({
      name: "",
      rating: 5,
      comment: "",
    });
  };

  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="rounded-xl border p-3 outline-none"
        />
        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="rounded-xl border p-3 outline-none"
        >
          <option value={5}>5 Star</option>
          <option value={4}>4 Star</option>
          <option value={3}>3 Star</option>
          <option value={2}>2 Star</option>
          <option value={1}>1 Star</option>
        </select>
        <textarea
          placeholder="Write your review"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
          rows="4"
          className="rounded-xl border p-3 outline-none"
        />
        <button className="rounded-xl bg-black px-5 py-3 text-white">
          Submit Review
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.name}</h3>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              <p className="mt-2 text-sm text-gray-400">{review.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}