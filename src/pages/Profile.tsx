import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0();

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    console.log('Token:', token);
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: 'http://localhost:5173' } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfil</h2>
        <p className="mb-4"><strong>Correo:</strong> {user?.email}</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={getToken}
            className="flex-1 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
          >
            Ver Token
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;