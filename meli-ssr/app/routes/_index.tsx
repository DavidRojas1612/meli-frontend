import { Search } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Search className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-lg text-gray-600 mb-2">Comienza a buscar</h2>
      <p className="text-sm text-gray-500">
        Introduce un término de búsqueda para empezar
      </p>
    </div>
  );
}
