import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const placeholderDish =
  new URL("../assets/placeholder-dish.svg", import.meta.url).toString();

// showAdd=true => show "Add +"
// showAdd=false => show "Remove" and call onRemoveIndex / onRemoveId
const ItemList = ({ items, showAdd = true, onRemoveIndex, onRemoveId }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => dispatch(addItem(item));

  return (
    <div>
      {items.map((item, i) => {
        // supports API, mock, or cart-stored shapes
        const info = item.card?.info ?? item.info ?? item;

        const pricePaise =
          typeof info?.price === "number"
            ? info.price
            : typeof info?.defaultPrice === "number"
              ? info.defaultPrice
              : undefined;

        const showPrice = Number.isFinite(pricePaise);
        const rowKey = `${info?.id ?? "noid"}-${i}`;

        //  image (with graceful fallback)
        const imgId = info?.imageId || info?.cloudinaryImageId || null;
        const imgSrc = imgId ? `${CDN_URL}${imgId}` : placeholderDish;

        return (
          <div
            data-testid="foodItems"
            key={rowKey}
            className="p-3 m-2 border-b border-gray-200 text-left flex justify-between items-start gap-3"
          >
            {/* Left: name, price, description */}
            <div className="w-[68%] sm:w-9/12">
              <div className="py-1">
                <span className="font-semibold">{info?.name ?? "Item"}</span>
                {showPrice && (
                  <span className="font-bold">
                    {" "}
                    — ₹ {(pricePaise / 100).toFixed(2)}
                  </span>
                )}
              </div>
              {!!info?.description && (
                <p className="text-sm text-gray-500">{info.description}</p>
              )}
            </div>

            {/* Right: image + action button */}
            <div className="w-[32%] sm:w-3/12 relative">
              {(() => {
                const imgId = info?.imageId || info?.cloudinaryImageId || null;
                const src = imgId ? `${CDN_URL}${imgId}` : placeholderDish;
                return (
                  <img
                    src={src}
                    alt={info?.name ?? "Item"}
                    width={300}
                    height={200}
                    className="w-full h-24 sm:h-28 object-cover rounded-lg border border-gray-300 shadow bg-gray-50"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== placeholderDish) {
                        e.currentTarget.onerror = null;      // stop retry loops
                        e.currentTarget.src = placeholderDish;
                      }
                    }}
                  />
                );
              })()}
              
              {showAdd ? (
                <button
                  type="button"
                  aria-label={`Add ${info?.name ?? "item"} to cart`}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg border bg-white text-green-600 border-green-600 shadow transition transform-gpu duration-150 hover:bg-green-600 hover:text-white active:scale-95 active:bg-green-700 active:text-white active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              ) : (
                <button
                  type="button"
                  aria-label={`Remove ${info?.name ?? "item"} from cart`}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg border bg-white text-red-600 border-red-600 shadow transition transform-gpu duration-150 hover:bg-red-600 hover:text-white active:scale-95 active:bg-red-700 active:text-white active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  onClick={() => {
                    if (onRemoveIndex) onRemoveIndex(i);
                    else if (onRemoveId) onRemoveId(info?.id);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;


