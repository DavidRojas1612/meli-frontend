import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { cuyrrencyFormatter } from "../utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const meliId = params.itemId;

  const [item, itemDescription] = await Promise.all([
    axios.get(`  https://api.mercadolibre.com/items/${meliId}`),
    axios.get(` https://api.mercadolibre.com/items/${meliId}/description`),
  ]);

  const data = {
    id: item.data.id,
    title: item.data.title,
    picture: item.data.pictures[0].url,
    condition: item.data.condition === "new" ? "nuevo" : "usado",
    free_shipping: item.data.shipping.free_shipping,
    sold_cuantity: item.data.initial_quantity,
    description: itemDescription.data.plain_text,
    price: {
      currency: item.data.currency_id,
      amount: item.data.price,
      decimals: 2,
    },
  };

  return json({
    data,
  });
}

function ItemDescription() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="w-full py-5 px-6 grid grid-cols-[60%_40%] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,.2)] border-solid border-[rgba(0,0,0,0)] h-full rounded-sm">
      <div>
        <picture>
          <img src={data.picture} alt={data.title} className="px-6 mb-5" />
        </picture>
        <div>
          <h2 className="font-normal mb-2 text-2xl">
            Descripción del producto
          </h2>
          <p className="font-thin text-sm text-justify">{data.description}</p>
        </div>
      </div>
      <div>
        <div className="font-thin flex items-center gap-2">
          <span className="capitalize">{data.condition}</span>
          {"-"}
          <span>{data.sold_cuantity} vendidos</span>
        </div>
        <h1 className="text-2xl mb-5 font-semibold">{data.title}</h1>
        <h2 className="text-5xl font-extralight mb-10">
          {" "}
          {cuyrrencyFormatter(data.price.currency, data.price.amount)}
        </h2>
        <button className="capitalize w-full bg-[#3483fa] py-2.5 rounded-sm text-white ">
          comprar
        </button>
      </div>
    </div>
  );
}

export default ItemDescription;
