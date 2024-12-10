import { useState } from "react";
// Import page and component components
import SignInPage from "./pages/Auth/Signin/SignInPage";
import SignUpPage from "./pages/Auth/Signup/SignUpPage";
import CreateOrderForm from "./pages/OrderManagement/CreateOrder/CreateOrderForm";
import NavBar from "./components/SideBar/SideBar";
import OrderDetails from "./pages/OrderManagement/OrderDetails/OrderDetails";
import TrackOrder from "./pages/OrderManagement/TrackOrder/TrackOrder";
import CustomerOrder from "./pages/CustomerOrders/CustomerOrder";
import CustomerCreation from "./pages/CustomerManagement/CustomerCreation/CustomerCreation";
import CustomerList from "./pages/CustomerManagement/CustomerList/CustomerList";
import ProtectedRoute from "./components/ProtectedRoute";

// Import React Router components for navigation
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// AppContent component handles routing and conditional rendering
const AppContent = ({ customer, setCustomer, productList, setProductList }) => {
  // Get current location to conditionally render navbar
  const location = useLocation();

  // Determine if navbar should be shown based on current route
  // Navbar is hidden on signin and signup pages
  const shouldShowNavbar = !["/signin", "/signup"].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render NavBar */}
      {shouldShowNavbar && <NavBar />}

      {/* Define application routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected Routes */}
        <Route
          path="/create-order"
          element={
            // Wrap order form in protected route to ensure authentication
            <ProtectedRoute>
              <CreateOrderForm
                customer={customer}
                setCustomer={setCustomer}
                productList={productList}
                setProductList={setProductList}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer-order" element={<CustomerOrder/>}/>
        <Route path="/create-customer" element={<CustomerCreation/>}/>

        {/* Order Details Route */}
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>
    </div>
  );
};

// Main App component
function App() {
  // State management for customer and product list
  // These states will be passed down to child components
  const [customer, setCustomer] = useState(null); // Store customer information
  const [productList, setProductList] = useState([]); // Store selected products

  return (
    // Wrap app in Router for navigation
    <Router
      // Future flags for React Router v7 features
      futureFlags={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {/* Pass customer and product list states to AppContent */}
      <AppContent
        customer={customer}
        setCustomer={setCustomer}
        productList={productList}
        setProductList={setProductList}
      />
    </Router>
  );
}

export default App;
