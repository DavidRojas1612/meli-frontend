import { useNavigate } from "@remix-run/react";
import { Search } from "lucide-react";
import { FormEventHandler, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") ?? "";

    const search = new URLSearchParams([["search", query?.toString()]]);
    navigate(`/items?${search.toString()}`);
  };

  return (
    <header className="bg-yellow-300 py-2 px-6 w-full flex justify-center">
      <nav className="max-w-screen-lg w-full flex gap-12">
        <div>
          <a
            href="/"
            className="bg-no-repeat overflow-hidden h-[34px] w-[134px] -indent-[999px] flex static bg-[url(https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.15/mercadolibre/logo_large_plus.webp)]"
          >
            Mercado Libre Colombia - Donde comprar y vender de todo
          </a>
        </div>
        <form className="relative w-full" onSubmit={handleSubmit}>
          <label htmlFor="query" className="hidden">
            search label
          </label>
          <input
            ref={inputRef}
            type="text"
            name="query"
            id="query"
            className="relative text-base m-0 rounded-sm bg-white flex h-10 w-full border-solid color-[rgba(0,0,0,.8980392157)] shadow-[0_1px_2px_0_rgba(0,0,0,.2)] p-[10px_60px_10px_15px] border-[rgba(0,0,0,0)]"
          />
          <button
            className="absolute top-0 right-0 w-10 h-full flex items-center justify-center before:content-[''] before:block before:h-[30px] before:border-l-[1px] before:border-solid before:border-l-[#e6e6e6] before:absolute before:top-[7px] before:left-0"
            type="submit"
            onClick={(e) => {
              if (!inputRef.current?.value) {
                e.preventDefault();
                e.stopPropagation();
                inputRef.current?.focus();
              }
            }}
          >
            <Search strokeWidth={1} className="text-gray-300" />
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;
