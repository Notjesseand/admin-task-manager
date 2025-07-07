"use client";

import { useEffect, useState } from "react";
import "@/styles/star-background.css";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { MdDelete } from "react-icons/md";

type Ticket = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [adminCategory, setAdminCategory] = useState("");

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    const category = localStorage.getItem("category");

    if (!token || !category) {
      window.location.href = "/login";
      return;
    }

    setAdminCategory(category);

    try {
      const res = await fetch(
        "https://test-express-w958.onrender.com/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("category");
        window.location.href = "/login";
        throw new Error("Token expired or invalid");
      }

      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleResolve = async (ticketId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `https://test-express-w958.onrender.com/api/tickets/${ticketId}/resolve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to resolve ticket");

      setTickets((prev) =>
        prev
          ? prev.map((t) =>
              t.id === ticketId ? { ...t, status: "resolved" } : t
            )
          : prev
      );
    } catch (err: any) {
      alert("Error resolving ticket: " + err.message);
    }
  };

  const deleteTicket = async (ticketId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeletingId(ticketId);

    try {
      const res = await fetch(
        `https://test-express-w958.onrender.com/api/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        await fetchTickets();
      } else {
        console.error("Failed to delete ticket");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <p className="text-center text-red-400 font-montserrat text-md py-10">
        {error}
      </p>
    );
  }

  const categoryLabelMap: { [key: string]: string } = {
    tech: "Technical Support",
    finance: "Finance",
    academic: "Academic Support",
    it: "IT",
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-gray-900 to-black">
        <Loader2 className="animate-spin text-blue-400 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-montserrat relative overflow-x-hidden text-sm">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars small transition-all duration-500 "></div>
        <div className="stars medium transition-all duration-500"></div>
        <div className="stars large transition-all duration-500"></div>
      </div>

      <div className="container mx-auto p-6 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center mb-8 ">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {categoryLabelMap[adminCategory] || adminCategory} Dashboard
          </h1>
          <div className="flex mb-10 sm:mb-0 flex-row gap-4 ">
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
            >
              Switch Account
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 text-sm font-medium"
            >
              Submit a Ticket
            </Link>
          </div>
        </div>

        {/* Tickets Section */}
        {!tickets || tickets.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-sm">No tickets assigned yet.</p>
            {/* <Link
              href="/submit"
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 "
            >
              Create a New Ticket
            </Link> */}
          </div>
        ) : (
          <ul className="space-y-6">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="p-6 bg-gray-800 bg-opacity-90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h1 className="text-lg font-semibold text-white">
                      {ticket.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          ticket.status === "resolved"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                        {ticket.status === "resolved" && (
                          <GiCheckMark className="inline-block ml-1" />
                        )}
                      </span>
                      {deletingId === ticket.id ? (
                        <Loader2 className="animate-spin text-blue-400 h-6 w-6" />
                      ) : (
                        <MdDelete
                          className="text-2xl cursor-pointer text-red-400 hover:text-red-300 transition-colors duration-200"
                          onClick={() => deleteTicket(ticket.id)}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {ticket.description}
                  </p>
                  {ticket.status !== "resolved" && (
                    <button
                      className="w-full mx-auto justify-center flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium"
                      onClick={() => handleResolve(ticket.id)}
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
