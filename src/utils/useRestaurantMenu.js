import { useEffect, useState, useContext } from "react";
import MockContext from "../utils/MockContext";
import defaultMock from "../components/mocks/mockResMenu.json";
import { Menu_API, PROXY_MOCK_BASE } from "../utils/constants";

/**
 * Quick validator: does a payload contain REGULAR menu cards with items?
 * We treat either ItemCategory with itemCards OR NestedItemCategory with
 * inner categories that have itemCards as "valid".
 */
function hasRegularMenu(payload) {
  const regularCards =
    payload?.cards?.find((c) => c?.groupedCard?.cardGroupMap?.REGULAR)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  if (!Array.isArray(regularCards) || regularCards.length === 0) return false;

  for (const wrap of regularCards) {
    const card = wrap?.card?.card ?? wrap;
    if (!card) continue;

    const t = card["@type"];
    // ItemCategory with items
    if (
      t === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
      Array.isArray(card?.itemCards) &&
      card.itemCards.length > 0
    ) {
      return true;
    }
    // NestedItemCategory with any inner category having items
    if (t === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
      const hasAny =
        (card?.categories || []).some(
          (g) => Array.isArray(g?.itemCards) && g.itemCards.length > 0
        );
      if (hasAny) return true;
    }
    // Some payloads omit @type but still have a category shape
    if (Array.isArray(card?.itemCards) && card.itemCards.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Returns [resInfo, source]
 * - resInfo: normalized object with `.cards` (or null while loading)
 * - source: "api" | "mock" | "fallback"
 */
const useRestaurantMenu = (resId, forceMock) => {
  const [resInfo, setResInfo] = useState(null);
  const [source, setSource] = useState("api");

  // global mock toggle (header switch) or ?mock=1
  const ctx = useContext(MockContext);
  const useMock = (forceMock ?? ctx?.useMock) === true;

  useEffect(() => {
    if (!resId) return;

    let ignore = false;
    const controller = new AbortController();
    setResInfo(null); // shimmer while switching pages

    const load = async () => {
      // ----- EXPLICIT MOCK PATH -----
      if (useMock) {
        try {
          const r = await fetch(
            `${PROXY_MOCK_BASE}${encodeURIComponent(resId)}.json`,
            { cache: "no-store", signal: controller.signal }
          );
          if (!r.ok) throw new Error("mock-not-found");
          const j = await r.json();
          const payload = j?.data ?? j;

          if (!ignore) {
            if (hasRegularMenu(payload)) {
              setResInfo(payload);
              setSource("mock"); // 📦 valid per-restaurant mock
            } else {
              // file exists but has no real menu -> safe fallback
              setResInfo(defaultMock?.data ?? defaultMock);
              setSource("fallback"); // 🛟 auto fallback
            }
          }
          return;
        } catch {
          if (!ignore) {
            setResInfo(defaultMock?.data ?? defaultMock);
            setSource("fallback");
          }
          return;
        }
      }

      // ----- LIVE API PATH (DEFAULT) -----
      try {
        const resp = await fetch(`${Menu_API}${encodeURIComponent(resId)}`, {
          signal: controller.signal,
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        const payload = json?.data ?? json;

        if (!ignore && hasRegularMenu(payload)) {
          setResInfo(payload);
          setSource("api");
        } else if (!ignore) {
          setResInfo(defaultMock?.data ?? defaultMock);
          setSource("fallback");
        }
      } catch {
        if (!ignore) {
          setResInfo(defaultMock?.data ?? defaultMock);
          setSource("fallback");
        }
      }
    };

    load();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [resId, useMock]);

  return [resInfo, source];
};

export default useRestaurantMenu;
