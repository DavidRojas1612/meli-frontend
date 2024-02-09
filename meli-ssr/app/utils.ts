export function cuyrrencyFormatter(
  currency: "COP" | "ARS",
  precio: string
): string {
  if (currency === "COP") {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(Number(precio));
  } else if (currency === "ARS") {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(Number(precio));
  } else {
    return currency;
  }
}
