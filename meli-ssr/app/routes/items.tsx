import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData,
} from "@remix-run/react";
import axios from "axios";
import { categoriesStorage } from "../utils.server";

type genericObject = {
  id: string;
  values: Array<any>;
};

const getCategories = (filters: genericObject[]) => {
  return filters.find((filter) => filter.id === "category")?.values;
};

const mapResults = (results: Array<any>) =>
  results.map((item) => ({
    id: item.id,
    title: item.title,
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 2,
    },
  }));

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
  defaultShouldRevalidate,
}) => {
  if (
    Object.keys(currentParams).length === 0 &&
    Object.keys(nextParams).length > 0
  ) {
    return false;
  }

  return defaultShouldRevalidate;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");

  const limit = params?.limit ?? 4;
  const itemId = params.itemId;

  const result = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=:${query}&limit=${limit}`
  );

  const cookieHeader = request.headers.get("Cookie");

  const categoriesCookie = (await categoriesStorage.parse(cookieHeader)) || {};
  const categories = getCategories(result.data.filters);

  const results = {
    author: {
      name: "David Steeven",
      lastname: "Rojas Herrera",
    },
    categories: categories,
    items: mapResults(result.data.results),
  };

  if (itemId) {
    return json(
      {
        results: {
          ...results,
          categories: JSON.parse(categoriesCookie.categories) as any[],
        },
      },
      {
        headers: {
          "Set-Cookie": await categoriesStorage.serialize(categoriesCookie),
        },
      }
    );
  }

  categoriesCookie.categories = categories ? JSON.stringify(categories) : null;

  return json(
    {
      results,
    },
    {
      headers: {
        "Set-Cookie": await categoriesStorage.serialize(categoriesCookie),
      },
    }
  );
}

function Items() {
  const { results } = useLoaderData<typeof loader>();

  return (
    <section className="w-full max-w-screen-lg flex flex-col">
      {results.categories ? (
        <div className="flex gap-3 mb-4 items-center">
          {results.categories?.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              {category.path_from_root.map((path: any) => (
                <span
                  className="flex items-center text-sm text-gray-500 gap-3 after:block after:content-['>'] last-of-type:after:content-[none] last-of-type:font-semibold"
                  key={path.id}
                >
                  {path.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <Outlet />
    </section>
  );
}

export default Items;
