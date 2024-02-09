import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Root from "../screens/root";
import IndexRoot from "../screens";
import LayoutItem from "../screens/items/layout";
import IndexItem from "../screens/items";
import ItemId from "../screens/items/itemid";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} path="/">
      <Route index element={<IndexRoot />} />
      <Route
        path="items"
        id="items"
        element={<LayoutItem />}
        loader={async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get("search");

          const data = await (
            await fetch(`http://localhost:5001/api/items?q=${query}`)
          ).json();

          return { results: data.results };
        }}
      >
        <Route index element={<IndexItem />} />
        <Route
          path=":itemId"
          element={<ItemId />}
          loader={async ({ params }) => {
            const meliId = params.itemId;

            const data = await (
              await fetch(`http://localhost:5001/api/items/${meliId}`)
            ).json();

            return data;
          }}
        />
      </Route>
    </Route>
  )
);
