import React from 'react';

function Landing() {
  return (
    <div className="w-full px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">📈 Bienvenido a <span className="text-blue-600">PPE Stock Market Async</span></h1>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
        Invierte en el mercado accionario de forma rápida, segura y completamente asíncrona.
        <br /><br />
        Nuestra plataforma te permite explorar, filtrar y adquirir acciones en tiempo real, gestionando compras a través de un sistema inteligente de eventos.
        Conéctate al mercado, consulta el estado de cada acción disponible y participa en emisiones como IPOs y aumentos de capital (EMITs).
        <br /><br />
        💸 <strong>Recarga tu saldo</strong>, selecciona una acción y envía una solicitud de compra.  
        <br />
        ⚙️ Nuestro sistema validará tu solicitud con el broker y te notificará si fue exitosa.  
        <br />
        🔁 Seguimos en vivo las operaciones de todos los grupos para mantener actualizado el inventario del mercado.
        <br /><br />
        Con nosotros, la compra y venta de acciones es <strong>transparente, distribuida y auditable</strong>.
        <br />
        ¿Estás listo para invertir?
        <br />
        
        <button
        onClick={() => window.location.href = '/store'}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          Ir a tienda
        </button>

      </p>
    </div>
  );
}

export default Landing;
