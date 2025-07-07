"use client";
import { useState } from "react";
import { Loader } from "lucide-react";

// User-facing categories
const categories = ["Technical Support", "Finance", "Academic Support", "IT"];

// Mapping from user-facing to backend values
const categoryMap: { [key: string]: string } = {
  "Technical Support": "tech",
  Finance: "finance",
  "Academic Support": "academic",
  IT: "it",
};

export default function SubmitTicket() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const backendCategory = categoryMap[category];

    try {
      const res = await fetch(
        "https://test-express-w958.onrender.com/api/tickets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category: backendCategory,
          }),
        }
      );

      if (res.ok) {
        setTitle("");
        setDescription("");
        setSuccess("Ticket submitted successfully!");
      } else {
        setSuccess("Failed to submit ticket");
      }
    } catch (err) {
      setSuccess("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // ✅ Always runs, even on error
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 font-montserrat text-sm">
      <h1 className="text-2xl font-bold mb-4">Submit a Ticket</h1>
      {success && <p className="text-green-600 mb-3">{success}</p>}
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? <Loader className="animate-spin flex mx-auto" /> : "submit"}
      </button>
    </div>
  );
}
