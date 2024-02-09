import { Link, useRouteLoaderData } from "@remix-run/react";
import { loader } from "./items";
import { Car } from "lucide-react";
import { cuyrrencyFormatter } from "../utils";

function ItemScreenIndex() {
  const data = useRouteLoaderData<typeof loader>("routes/items");

  return (
    <ul className="w-full bg-white shadow-[0_1px_2px_0_rgba(0,0,0,.2)] border-solid border-[rgba(0,0,0,0)] h-full rounded-sm divide-y divide-slate-200">
      {data?.results.items.map((item) => (
        <li key={item.id}>
          <Link className="w-full flex pt-5 pb-8 pr-12 relative" to={item.id}>
            <picture>
              <img src={item.picture} alt={item.title} className="px-6" />
            </picture>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-semibold text-xl">
                  {cuyrrencyFormatter(item.price.currency, item.price.amount)}
                </h2>
                {item.free_shipping ? (
                  <div
                    className="flex rounded-full bg-green-400 items-center justify-center w-6 h-6"
                    aria-description="free shipping"
                  >
                    <Car width={15} />
                  </div>
                ) : null}
              </div>
              <h3 className="font-light text-lg">{item.title}</h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ItemScreenIndex;
