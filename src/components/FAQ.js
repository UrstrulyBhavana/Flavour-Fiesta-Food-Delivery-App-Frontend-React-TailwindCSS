import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FAQ_DATA = [
  {
    category: "Ordering",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse restaurants, add items to your cart, and proceed to checkout. Review your order, apply coupons, and confirm payment to place it.",
      },
      {
        q: "Can I schedule an order for later?",
        a: "Yes. On the checkout screen, choose a delivery time slot if the restaurant supports scheduled delivery.",
      },
      {
        q: "How do I apply a coupon?",
        a: "On the payments screen, tap “Apply Coupon” and paste your code. Eligible discounts are applied instantly before payment.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    items: [
      {
        q: "What payment methods are supported?",
        a: "We support UPI, credit/debit cards, net banking, and Cash on Delivery (COD) where available.",
      },
      {
        q: "My payment was deducted but the order failed. What now?",
        a: "Don’t worry—failed orders are auto-refunded within 2–5 business days. If not, contact support with your transaction ID.",
      },
      {
        q: "How are refunds issued?",
        a: "Refunds go back to your original payment method. For COD, we’ll issue a UPI transfer after verification.",
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        q: "What is the average delivery time?",
        a: "Most orders arrive within 30–45 minutes depending on distance, prep time, and traffic.",
      },
      {
        q: "How do I track my order?",
        a: "After checkout, you’ll see live tracking in the Orders section including food prep and rider location.",
      },
      {
        q: "What if my order is late or incorrect?",
        a: "We’re sorry! Use Help > Order Issues inside your order details. We’ll prioritize fixes or refunds ASAP.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        q: "Do I need an account to order?",
        a: "You can browse as a guest, but creating an account saves addresses, order history, and speeds up checkout.",
      },
      {
        q: "How do I contact support?",
        a: "Go to Help > Chat with Us from your latest order, or email contact@flavourfiesta.com for general queries.",
      },
      {
        q: "How do I update my address or phone number?",
        a: "Go to Profile > Addresses to add/edit addresses. Update your phone in Profile > Account.",
      },
    ],
  },
];

const FAQ = () => {
  const [query, setQuery] = useState("");

  // Flatten for search
  const searchable = useMemo(
    () =>
      FAQ_DATA.flatMap((cat) =>
        cat.items.map((it, i) => ({
          ...it,
          category: cat.category,
          key: `${cat.category}-${i}`,
        }))
      ),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchable.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query, searchable]);

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-200/60 to-transparent"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 p-8 md:p-10 shadow-lg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-14 -bottom-14 h-40 w-40 rounded-full bg-white/30 blur-xl"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-3xl text-base md:text-lg leading-7 text-slate-700">
            Quick answers about ordering, payments, delivery, and support on{" "}
            <span className="font-semibold">FlavorFiesta</span>.
          </p>

          <div className="mt-5">
            <input
              type="search"
              aria-label="Search FAQs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs (e.g., refund, coupon, track order)"
              className="w-full max-w-xl rounded-xl border border-white/60 bg-white/80 backdrop-blur px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </div>
        </div>
      </section>

      {/* Search results */}
      {query && (
        <section className="mx-auto max-w-6xl px-4 mt-8">
          <div className="mb-2 text-sm text-slate-600">
            {results.length} result{results.length !== 1 ? "s" : ""} for “{query}”
          </div>
          <div className="space-y-3">
            {results.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                No matches. Try different keywords like “payment” or “delivery”.
              </div>
            ) : (
              results.map((item) => (
                <details
                  key={item.key}
                  className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 open:shadow-md transition"
                >
                  <summary className="cursor-pointer list-none font-semibold flex items-center justify-between focus-visible:outline-none">
                    <span>
                      <span className="mr-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs">
                        {item.category}
                      </span>
                      {item.q}
                    </span>

                    <span
                      className="ml-3 grid place-items-center w-6 h-6 rounded-full border border-slate-300 text-slate-500 transition group-open:rotate-45 group-open:border-amber-500 group-open:text-amber-600 shrink-0"
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>

                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
                </details>
              ))
            )}
          </div>
        </section>
      )}

      {/* Default categories */}
      {!query && (
        <section className="mx-auto max-w-6xl px-4 mt-8 grid md:grid-cols-2 gap-6">
          {FAQ_DATA.map((cat) => (
            <div key={cat.category} className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-900">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                {cat.category}
              </h2>

              {cat.items.map((it, i) => (
                <details
                  key={`${cat.category}-${i}`}
                  className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 open:shadow-md transition"
                >
                  <summary className="cursor-pointer list-none font-semibold flex items-center justify-between text-slate-900 focus-visible:outline-none">
                    {it.q}
                    <span
                      className="ml-3 grid place-items-center w-6 h-6 rounded-full border border-slate-300 text-slate-500 transition group-open:rotate-45 group-open:border-amber-500 group-open:text-amber-600 shrink-0"
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>

                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{it.a}</p>
                </details>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Footer CTA */}
      <section className="mx-auto max-w-6xl px-4 mt-10 pb-14">
        <div className="rounded-3xl bg-gradient-to-r from-amber-200 to-yellow-200 p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Still need help?</h3>
            <p className="text-sm mt-1 text-slate-700">
              Our support team is here 24×7. Reach out and we’ll respond fast.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-block rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white shadow hover:bg-amber-600 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;