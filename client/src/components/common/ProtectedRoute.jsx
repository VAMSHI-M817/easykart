import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, user, children }) {
    const location = useLocation();

    console.log(location.pathname, isAuthenticated, user?.role);

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop/home" />;
            }
        }
    }

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
            location.pathname.includes("/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }


    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname === "admin"
    ) {
        return <Navigate to="/shop/home" />;
    }

    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname === "/shop"
    ) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;