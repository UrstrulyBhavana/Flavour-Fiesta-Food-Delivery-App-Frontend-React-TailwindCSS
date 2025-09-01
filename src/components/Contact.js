import React from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#f59e0b",
      scrollbarPadding: false,   
      heightAuto: false          
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-200/60 to-transparent"
      />

      <section className="relative mx-auto max-w-6xl px-4 pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 p-8 md:p-10 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Us
          </h1>
          <p className="mt-3 max-w-3xl text-base md:text-lg leading-7 text-slate-700">
            Have questions, feedback, or partnership ideas? We'd love to hear from you.
            Fill in the form below and we’ll get back to you soon.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 mt-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-slate-800">
              Your Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter your name"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>

            <label className="block text-sm font-medium text-slate-800">
              Email Address
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-800">
            Message
            <textarea
              name="message"
              rows="5"
              autoComplete="off"
              placeholder="Write your message..."
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm resize-y outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex w-full md:w-auto items-center justify-center rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white shadow hover:bg-amber-600 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
          >
            Submit
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-6 pb-14">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Phone", value: "+91-9876543210", href: "tel:+919876543210" },
            { label: "Email", value: "contact@flavourfiesta.com", href: "mailto:contact@flavourfiesta.com" },
            { label: "Location", value: "Hyderabad, Telangana" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5"
            >
              <div className="text-sm font-semibold text-slate-900">{c.label}</div>
              <div className="mt-1 text-sm text-slate-600">
                {c.href ? <a href={c.href} className="hover:underline">{c.value}</a> : c.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
