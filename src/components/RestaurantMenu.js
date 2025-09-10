import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

const Badge = ({ source }) => (
  <span
    className={
      "px-3 py-1 text-xs font-semibold rounded-full shadow-sm " +
      (source === "api"
        ? "bg-blue-100 text-blue-800"
        : source === "mock"
        ? "bg-emerald-100 text-emerald-800"
        : "bg-amber-100 text-amber-800")
    }
  >
    {source === "api" && "🌐 API mode"}
    {source === "mock" && "📦 Mock mode"}
    {source === "fallback" && "🛟 Auto fallback (mock)"}
  </span>
);

function extractCategories(cards = []) {
  const out = [];
  for (const wrap of cards) {
    const card = wrap?.card?.card ?? wrap;
    if (!card) continue;

    const t = card["@type"];

    // ItemCategory
    if (t === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
      if (card?.title && card?.itemCards?.length) out.push(card);
      continue;
    }

    // NestedItemCategory (flatten inner categories)
    if (t === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
      for (const g of card?.categories || []) {
        if (g?.title && g?.itemCards?.length) out.push(g);
      }
      continue;
    }

    // Fallback: sometimes @type is missing but structure is valid
    if (card?.title && card?.itemCards?.length) {
      out.push(card);
      continue;
    }
  }
  return out;
}

const RestaurantMenu = () => {
  const { resId } = useParams();
  const location = useLocation();

  // keep mock on page change via state or ?mock=1
  const qsMock = new URLSearchParams(location.search).get("mock") === "1";
  const stateMock = location.state?.useMock === true;
  const forceMock = stateMock || qsMock;

  const [resInfo, source] = useRestaurantMenu(resId, forceMock);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  // header info
  const restaurantInfoCard = resInfo.cards?.find((c) => c?.card?.card?.info);
  const info = restaurantInfoCard?.card?.card?.info || {};
  const { name = "Restaurant", cuisines = [], costForTwoMessage = "" } = info;

  // menu cards
  const regularCards =
    resInfo.cards?.find((c) => c?.groupedCard?.cardGroupMap?.REGULAR)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = extractCategories(regularCards);

  return (
    <div className="px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mt-6">
          <div>
            <h1 className="font-bold text-2xl">{name}</h1>
            <p className="font-bold text-lg">
              {cuisines.length ? cuisines.join(", ") + " — " : ""}
              {costForTwoMessage}
            </p>
          </div>
          <Badge source={source} />
        </div>

        {categories.length === 0 ? (
          <div className="text-center mt-6 text-amber-700 font-semibold">
            Menu is currently unavailable for this restaurant.
          </div>
        ) : (
          categories.map((cat, index) => (
            <RestaurantCategory
              key={(cat?.title || "category") + "-" + index}
              data={cat} // already normalized
              showItems={index === showIndex}
              setShowIndex={() =>
                setShowIndex(index === showIndex ? null : index)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
