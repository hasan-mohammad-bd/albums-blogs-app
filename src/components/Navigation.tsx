// Layout.tsx

import { Outlet, useLocation, Link } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900">Album/Blog App</span>
              </Link>
              <div className="ml-6 flex space-x-8">
                <Link
                  to="/albums"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/albums")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Albums
                </Link>
                <Link
                  to="/blogs"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive("/blogs")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
