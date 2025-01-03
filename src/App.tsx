import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuthContext } from './contexts/AuthContext';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Home } from './pages/Home';
import { Items } from './pages/Items';
import { Communities } from './pages/Communities';
import { Share2, LogOut } from 'lucide-react';
import { auth } from './lib/firebase';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  return user ? <>{children}</> : <Navigate to="/signin" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Share2 className="w-8 h-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">ShareSpace</h1>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/communities" className="text-gray-600 hover:text-gray-900">Communities</Link>
              <Link to="/items" className="text-gray-600 hover:text-gray-900">Items</Link>
              <button
                onClick={() => auth.signOut()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute>
                <Layout>
                  <Items />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/communities"
            element={
              <PrivateRoute>
                <Layout>
                  <Communities />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;