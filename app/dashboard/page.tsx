// "use client";

// // Import React hooks for state management and side effects
// import { useEffect, useState } from "react";
// import "@/styles/star-background.css";
// import { TiTick } from "react-icons/ti";
// import { GiCheckMark } from "react-icons/gi";
// import Link from "next/link";
// import { Loader2 } from "lucide-react";
// import { MdDelete } from "react-icons/md";

// // Interface for ticket data structure
// type Ticket = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   status: string;
// };

// // Main Dashboard component
// export default function Dashboard() {
//   // State for storing tickets, loading status, and error messages
//   const [tickets, setTickets] = useState<Ticket[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   // Function to handle ticket resolution
//   const handleResolve = async (ticketId: number) => {
//     const token = localStorage.getItem("token");

//     // Check if token exists
//     if (!token) {
//       alert("Authentication token missing. Please log in again.");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       // Send PUT request to resolve ticket
//       const res = await fetch(
//         `https://test-express-w958.onrender.com/api/tickets/${ticketId}/resolve`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to resolve ticket");
//       }

//       // Update ticket status in state
//       setTickets((prev) =>
//         prev
//           ? prev.map((t) =>
//               t.id === ticketId ? { ...t, status: "resolved" } : t
//             )
//           : prev
//       );
//     } catch (err) {
//       // Display error alert if resolution fails
//       alert(
//         "Error resolving ticket: " +
//           (err instanceof Error ? err.message : "Unknown error")
//       );
//     }
//   };

//   const deleteTicket = async (ticketId: any) => {
//     setDeleting(true);
//     const token = localStorage.getItem("token"); // or however you store it

//     const res = await fetch(
//       `https://test-express-w958.onrender.com/api/tickets/${ticketId}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.ok) {
//       console.log("Deleted");
//       // Optionally: refresh ticket list or show a success message
//     } else {
//       console.error("Failed to delete ticket");
//     }
//   };

//   const [adminCategory, setAdminCategory] = useState("");

//   // Effect hook to fetch tickets on component mount
//   useEffect(() => {
//     // Retrieve authentication token and category from localStorage
//     const token = localStorage.getItem("token");
//     const category = localStorage.getItem("category");

//     if (category) {
//       setAdminCategory(category);
//     }

//     // Redirect to login if token or category is missing
//     if (!token || !category) {
//       window.location.href = "/login";
//       return;
//     }

//     // Fetch tickets from API
//     fetch("https://test-express-w958.onrender.com/api/tickets", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("category");
//           window.location.href = "/login"; // ⬅️ redirect to login
//           throw new Error("Token expired or invalid");
//         }

//         if (!res.ok) throw new Error("Failed to fetch tickets");
//         return res.json();
//       })

//       .then((data) => {
//         // Ensure data is an array before setting state
//         if (Array.isArray(data)) {
//           setTickets(data);
//           setError(null);
//         } else {
//           throw new Error("Invalid data format received from API");
//         }
//       })
//       .catch((err) => {
//         // Set error state and clear loading
//         setError(err.message || "Failed to load tickets");
//         setTickets([]);
//       })
//       .finally(() => {
//         // Set loading to false after fetch completes
//         setLoading(false);
//       });
//   }, []); // Empty dependency array ensures this runs once on mount

//   // Render error state
//   if (error) {
//     return <p className="text-center text-red-500 font-montserrat">{error}</p>;
//   }

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="text-center text-gray-500 font-montserrat h-screen w-full flex justify-center items-center">
//         <Loader2 className="animate-spin " />
//       </div>
//     );
//   }

//   // Render main dashboard content
//   return (
//     <div className="bg-black overflow-x-hidden font-montserrat relative min-h-screen">
//       {/* Stars container with low z-index to stay behind content */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="stars small"></div>
//         <div className="stars medium"></div>
//         <div className="stars small"></div>

//         <div className="stars large"></div>
//         <div className="stars small"></div>
//       </div>
//       <div className="container mx-auto p-6 max-w-4xl font-montserrat relative z-50">
//         {/* Dashboard header */}
//         <div className="flex justify-end gap-x-4 items-center">
//           <Link
//             target="_blank"
//             href="/login"
//             className="text-black flex text-sm py-1 rounded px-3 bg-white "
//           >
//             Switch Account
//           </Link>
//           <Link
//             href="/submit"
//             target="_blank"
//             className="px-2 py-1 bg-slate-700 rounded text-white text-sm"
//           >
//             Submit a Ticket
//           </Link>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-300 mb-6">
//           Tickets for {adminCategory}
//         </h1>
//         Conditional rendering for tickets
//         {!tickets || tickets.length === 0 ? (
//           <p className="text-gray-500 text-center">No tickets assigned yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {tickets.map((ticket: Ticket) => (
//               <li
//                 key={ticket.id}
//                 className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//               >
//                 {/* Ticket details */}
//                 <div className="space-y-2">
//                   <p className="text-lg font-semibold text-gray-800">
//                     <span className="text-gray-600">Title:</span> {ticket.title}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Description:</span>{" "}
//                     {ticket.description}
//                   </p>
//                   <div className="text-gray-700 flex  gap-x-3">
//                     <span className="font-medium">Status:</span>{" "}
//                     <span
//                       className={`flex items-center px-2 py-1 rounded text-sm ${
//                         ticket.status === "resolved"
//                           ? "bg-gray-900 text-white"
//                           : "bg-red-600 text-white"
//                       }`}
//                     >
//                       {ticket.status}
//                       {ticket.status === "resolved" ? (
//                         <GiCheckMark className="text-md ml-1" />
//                       ) : (
//                         ""
//                       )}
//                     </span>
//                     <div className="w-full justify-end flex items-center">
//                       <MdDelete
//                         className="text-2xl cursor-pointer"
//                         onClick={() => deleteTicket(ticket.id)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Resolve button for unresolved tickets */}
//                 {ticket.status !== "resolved" && (
//                   <button
//                     className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex justify-center  mx-auto hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                     onClick={() => handleResolve(ticket.id)}
//                   >
//                     Mark as Resolved
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

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
        await fetchTickets(); // Refresh tickets after delete
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
    return <p className="text-center text-red-500 font-montserrat">{error}</p>;
  }

  // Converts backend values like "tech" → "Technical Support"
  const categoryLabelMap: { [key: string]: string } = {
    tech: "Technical Support",
    finance: "Finance",
    academic: "Academic Support",
    it: "IT",
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 font-montserrat h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black overflow-x-hidden font-montserrat relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars small"></div>
        <div className="stars medium"></div>
        <div className="stars large"></div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl relative z-50">
        <div className="flex justify-end gap-x-4 items-center">
          <Link
            target="_blank"
            href="/login"
            className="text-black flex text-sm py-1 rounded px-3 bg-white"
          >
            Switch Account
          </Link>
          <Link
            href="/submit"
            target="_blank"
            className="px-2 py-1 bg-slate-700 rounded text-white text-sm"
          >
            Submit a Ticket
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-300 mb-6">
          Tickets for {categoryLabelMap[adminCategory] || adminCategory}
        </h1>

        {!tickets || tickets.length === 0 ? (
          <p className="text-gray-500 text-center">No tickets assigned yet.</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    <span className="text-gray-600">Title:</span> {ticket.title}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {ticket.description}
                  </p>
                  <div className="text-gray-700 flex gap-x-3 items-center">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`flex items-center px-2 py-1 rounded text-sm ${
                        ticket.status === "resolved"
                          ? "bg-gray-900 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {ticket.status}
                      {ticket.status === "resolved" && (
                        <GiCheckMark className="text-md ml-1" />
                      )}
                    </span>

                    <div className="ml-auto flex items-center">
                      {deletingId === ticket.id ? (
                        <Loader2 className="animate-spin text-xl" />
                      ) : (
                        <MdDelete
                          className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => deleteTicket(ticket.id)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {ticket.status !== "resolved" && (
                  <button
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex justify-center mx-auto hover:bg-green-700"
                    onClick={() => handleResolve(ticket.id)}
                  >
                    Mark as Resolved
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
