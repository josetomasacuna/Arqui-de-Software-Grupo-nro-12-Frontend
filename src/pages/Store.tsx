import React, { useEffect, useState } from "react";

interface Stock {
  symbol: string;
  price: number;
  shortname: string;
  longname: string;
  quantity: number;
  timestamp: string;
}

const ITEMS_PER_PAGE = 6;

function Store() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filtered, setFiltered] = useState<Stock[]>([]);
  const [filters, setFilters] = useState({
    symbol: "",
    shortName: "",
    longName: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<"price" | "quantity" | "timestamp" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  // Fetch de datos reales
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/stocks");
        if (!response.ok) {
          throw new Error("Error al cargar los stocks.");
        }
        const data: Stock[] = await response.json();
        setStocks(data);
        setFiltered(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    const filteredStocks = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(newFilters.symbol.toLowerCase()) &&
      stock.shortname.toLowerCase().includes(newFilters.shortName.toLowerCase()) &&
      stock.longname.toLowerCase().includes(newFilters.longName.toLowerCase()) &&
      stock.timestamp.startsWith(newFilters.date)
    );

    setFiltered(filteredStocks);
  };

  // Comprar
  const handleBuy = (stock: Stock) => {
    const qty = prompt(`¿Cuántas acciones de ${stock.symbol} deseas comprar?`);
    const parsed = parseInt(qty || "0");
    if (!isNaN(parsed) && parsed > 0 && parsed <= stock.quantity) {
      alert(`Compra solicitada: ${parsed} acciones de ${stock.symbol}`);
    } else {
      alert("Cantidad inválida o mayor al inventario disponible.");
    }
  };

  // Ordenar
  const sortBy = (field: "price" | "quantity" | "timestamp") => {
    let nextDirection: "asc" | "desc" = "asc";
    if (sortField === field && sortDirection === "asc") {
      nextDirection = "desc";
    }

    setSortField(field);
    setSortDirection(nextDirection);

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (field === "timestamp") {
        return nextDirection === "asc"
          ? new Date(aVal).getTime() - new Date(bVal).getTime()
          : new Date(bVal).getTime() - new Date(aVal).getTime();
      }

      return nextDirection === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    setFiltered(sorted);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "▲" : "▼";
  };

  // Paginación
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando acciones...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Comprar Acciones</h1>

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          name="symbol"
          placeholder="Símbolo"
          className="border rounded px-3 py-2"
          value={filters.symbol}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="shortName"
          placeholder="Nombre Corto"
          className="border rounded px-3 py-2"
          value={filters.shortName}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="longName"
          placeholder="Nombre Largo"
          className="border rounded px-3 py-2"
          value={filters.longName}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          className="border rounded px-3 py-2"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Símbolo</th>

            <th className="px-4 py-2 text-left">
              <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => sortBy("price")}>
                Precio
                <span className="text-gray-600 text-xs">{getSortIcon("price")}</span>
              </div>
            </th>

            <th className="px-4 py-2">Nombre</th>

            <th className="px-4 py-2 text-left">
              <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => sortBy("quantity")}>
                Cantidad
                <span className="text-gray-600 text-xs">{getSortIcon("quantity")}</span>
              </div>
            </th>

            <th className="px-4 py-2 text-left">
              <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => sortBy("timestamp")}>
                Fecha
                <span className="text-gray-600 text-xs">{getSortIcon("timestamp")}</span>
              </div>
            </th>

            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((stock) => (
            <tr key={`${stock.symbol}-${stock.timestamp}`} className="border-t">
              <td className="px-4 py-2">{stock.symbol}</td>
              <td className="px-4 py-2">${stock.price.toFixed(2)}</td>
              <td className="px-4 py-2">{stock.shortname} / {stock.longname}</td>
              <td className="px-4 py-2">{stock.quantity}</td>
              <td className="px-4 py-2">{new Date(stock.timestamp).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleBuy(stock)}
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  Comprar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      {filtered.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Store;
