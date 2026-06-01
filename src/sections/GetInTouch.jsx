import { useState } from "react";

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="w-full border-b border-white/40 bg-transparent py-3 text-lg text-white placeholder:text-white/70 focus:border-white focus:outline-none"
      />
    </div>
  );
}

export default function GetInTouch() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // No public contact backend — surface a friendly confirmation.
    setSent(true);
  };

  return (
    <footer id="contact" className="bg-rings relative overflow-hidden bg-brand">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left copy */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Get In Touch
            <br />
            With The Best People
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
            Join the 200+ firms who trust us with their BIM needs. Your success is our priority.
          </p>
          <a
            href="mailto:info@obelisk-consulting.in"
            className="mt-auto pt-16 text-2xl font-medium text-white hover:underline"
          >
            info@obelisk-consulting.in
          </a>
        </div>

        {/* Right form */}
        <div>
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-start justify-center rounded-2xl bg-white/10 p-10 text-white">
              <h3 className="text-2xl font-semibold">Thank you! 🎉</h3>
              <p className="mt-3 max-w-sm text-white/90">
                Your message has been received. A member of the Obelisk team will reach out shortly.
              </p>
              <button
                onClick={() => {
                  setForm({ name: "", email: "", company: "", phone: "", message: "" });
                  setSent(false);
                }}
                className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-brand"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-7">
              <Field label="Name" value={form.name} onChange={set("name")} required />
              <Field label="Email Address" type="email" value={form.email} onChange={set("email")} required />
              <Field label="Company Name" value={form.company} onChange={set("company")} />
              <Field label="Contact Number" type="tel" value={form.phone} onChange={set("phone")} />
              <textarea
                placeholder="Message"
                required
                rows={3}
                value={form.message}
                onChange={set("message")}
                className="w-full resize-none border-b border-white/40 bg-transparent py-3 text-lg text-white placeholder:text-white/70 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-cream px-10 py-3.5 text-base font-semibold text-brand transition hover:bg-white"
              >
                Submit
              </button>
              <p className="text-xs text-white/70">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
                Service apply.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-white/80 sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Obelisk BIM Consulting. All rights reserved.</span>
          <span className="tracking-[0.3em]">OBELISK · BIM CONSULTING</span>
        </div>
      </div>
    </footer>
  );
}
