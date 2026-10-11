import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

// Route protection
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Public pages
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import Contact from "./pages/Contact/Contact";
import Booking from "./pages/Booking/Booking";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

// User dashboard pages
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import MyBookings from "./pages/MyBookings/MyBookings";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminRooms from "./pages/AdminRooms/AdminRooms";
import AdminBookings from "./pages/AdminBookings/AdminBookings";
import AdminGuests from "./pages/AdminGuests/AdminGuests";
import AdminReviews from "./pages/AdminReviews/AdminReviews";
import AdminAnalytics from "./pages/AdminAnalytics/AdminAnalytics";

// TEMPORARY PLACEHOLDER
// This page does not exist yet. It should be replaced by a real page
// component in a later step, and the matching <Route> below updated to use it.
const About = () => <h1>About (temporary placeholder)</h1>;

function App() {
  return (
    <Routes>
      {/* Public routes with the site navbar and footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Authentication pages keep their own full-screen design */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes: a signed-in user is required.
          TEMPORARY LIMITATION: /admin/* only requires being signed in. There
          are no roles yet, so any signed-in user can open the admin panel.
          Admin authorization is planned for a later step. */}
      <Route element={<ProtectedRoute />}>
        {/* Booking flow: a booking belongs to the signed-in user */}
        <Route element={<MainLayout />}>
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>

        {/* User dashboard routes (wrapped by DashboardLayout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/bookings" element={<MyBookings />} />
          <Route path="/dashboard/bookings/:id" element={<BookingDetails />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        {/* Admin routes (wrapped by AdminLayout) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/guests" element={<AdminGuests />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;