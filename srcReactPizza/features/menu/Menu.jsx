import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// render as you fetch strategy -React router will start fetching
// at same time as rendering the correct route - at the same time!!!
// without data loading waterfalls from render as you fetch anymore!!!
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
