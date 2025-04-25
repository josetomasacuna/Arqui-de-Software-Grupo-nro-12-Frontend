import { useAuth0 } from '@auth0/auth0-react';

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          scope: 'openid profile email',
          audience: import.meta.env.VITE_AUTH0_AUDIENCE
        }
      });
    } catch (err) {
      console.error('Error al intentar registrar:', err);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          scope: 'openid profile email',
          audience: import.meta.env.VITE_AUTH0_AUDIENCE
        }
      });
    } catch (err) {
      console.error('Error al intentar iniciar sesión:', err);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Bienvenido a Stock Trading</h2>
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleLogin}
            className="flex-1 bg-blue-600 text-black p-2 rounded-md hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleSignUp}
            className="flex-1 bg-blue-600 text-black p-2 rounded-md hover:bg-blue-700"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;