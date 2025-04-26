import { useState } from "react";

interface User {
  name: string;
  email: string;
  wallet_balance: number;
}

function Profile() {
  const [user, setUser] = useState<User>({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    wallet_balance: 1000000,
  });

  const handleAddMoney = () => {
    const amount = prompt("¿Cuánto dinero deseas agregar?");
    const parsed = parseFloat(amount || "0");

    if (!isNaN(parsed) && parsed > 0) {
      setUser((prev) => ({
        ...prev,
        wallet_balance: prev.wallet_balance + parsed,
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
      <p className="text-lg"><strong>Nombre:</strong> {user.name}</p>
      <p className="text-lg"><strong>Email:</strong> {user.email}</p>
      <p className="text-lg"><strong>Saldo disponible:</strong> ${user.wallet_balance.toFixed(1)}</p>

      <button
        onClick={handleAddMoney}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
      >
        Agregar Dinero
      </button>
    </div>
  );
}

export default Profile;
