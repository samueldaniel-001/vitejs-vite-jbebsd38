
import { useMemo, useState } from "react";
import "./App.css";

const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    year: 2023,
    price: 28000000,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Toyota RAV4",
    type: "SUV",
    year: 2024,
    price: 32500000,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Ford Ranger",
    type: "Pickup",
    year: 2023,
    price: 38000000,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "BMW 3 Series",
    type: "Sedan",
    year: 2024,
    price: 45000000,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Mercedes-Benz C-Class",
    type: "Sedan",
    year: 2023,
    price: 52000000,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Land Rover Defender",
    type: "SUV",
    year: 2024,
    price: 68000000,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=900&q=85",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState("");

  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        const matchesCategory =
          category === "All" || car.type === category;
        const matchesSearch =
          `${car.name} ${car.type} ${car.year}`
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
      }),
    [search, category]
  );

  function handleSubmit(event) {
    event.preventDefault();

    setFormMessage(
      `Thanks, ${form.name}! Your demo enquiry has been recorded in this page. Connect a backend or form service to receive it.`
    );

    setForm({ name: "", email: "", message: "" });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-icon">A</span>
          <span>Auto<span className="blue">Drive</span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#cars" onClick={closeMenu}>Cars</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a className="button button-small nav-cta" href="#contact">
          Get Started ↗
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">DRIVE YOUR DREAM</span>
            <h1>
              Quality Cars for a <span>Better Tomorrow.</span>
            </h1>
            <p>
              Discover exceptional vehicles, transparent pricing,
              and a smarter way to find your next car.
            </p>
            <div className="hero-actions">
              <a className="button" href="#cars">Browse Cars ↗</a>
              <a className="button button-outline" href="#about">
                Learn More
              </a>
            </div>
            <div className="hero-stats">
              <div><strong>100+</strong><span>Vehicles</span></div>
              <div><strong>5,000+</strong><span>Happy customers</span></div>
              <div><strong>10+</strong><span>Years of experience</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90"
              alt="Premium black sports car"
            />
            <div className="image-label">
              <span className="live-dot" />
              Find your next ride
            </div>
          </div>
        </section>

        <section className="inventory section" id="cars">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR INVENTORY</span>
              <h2>Find Your Perfect Car.</h2>
              <p>Explore our collection of carefully selected vehicles.</p>
            </div>
            <span className="inventory-count">
              {filteredCars.length} vehicles found
            </span>
          </div>

          <div className="inventory-tools">
            <input
              type="search"
              placeholder="Search by car name, year, or type..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search vehicles"
            />

            <div className="filter-list">
              {["All", "Sedan", "SUV", "Pickup"].map((type) => (
                <button
                  key={type}
                  className={category === type ? "filter active" : "filter"}
                  onClick={() => setCategory(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="car-grid">
            {filteredCars.map((car) => (
              <article className="car-card" key={car.id}>
                <div className="car-image">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <span className="car-badge">{car.type}</span>
                </div>
                <div className="car-details">
                  <div className="car-year">{car.year} MODEL</div>
                  <h3>{car.name}</h3>
                  <div className="car-specs">
                    <span>⚙ {car.transmission}</span>
                    <span>⛽ {car.fuel}</span>
                  </div>
                  <div className="car-bottom">
                    <strong>{money(car.price)}</strong>
                    <button
                      className="button details-button"
                      onClick={() => setSelectedCar(car)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="empty-state">
              <h3>No vehicles found</h3>
              <p>Try another search or select a different category.</p>
              <button
                className="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <section className="about section" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=85"
              alt="Car displayed in a showroom"
              loading="lazy"
            />
          </div>
          <div className="about-content">
            <span className="eyebrow">ABOUT AUTODRIVE</span>
            <h2>Your Trusted Partner on Every Journey.</h2>
            <p>
              At AutoDrive, we make finding your next car simple.
              We combine a carefully selected vehicle collection,
              clear pricing, and customer-focused support to help
              you choose with confidence.
            </p>
            <a className="text-link" href="#contact">
              Discover our approach ↗
            </a>
            <div className="about-points">
              <div><strong>01</strong><span>Quality selection</span></div>
              <div><strong>02</strong><span>Clear pricing</span></div>
              <div><strong>03</strong><span>Customer-first service</span></div>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading centered">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2>More Than Just Cars.</h2>
            <p>Helpful services to make your car-buying journey easier.</p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-icon">↗</span>
              <h3>Car Sales</h3>
              <p>Explore a range of vehicles to suit your needs.</p>
            </article>
            <article className="service-card">
              <span className="service-icon">₦</span>
              <h3>Financing Guidance</h3>
              <p>Learn about payment options for your next vehicle.</p>
            </article>
            <article className="service-card">
              <span className="service-icon">⚙</span>
              <h3>Vehicle Support</h3>
              <p>Get help with vehicle information and ownership.</p>
            </article>
            <article className="service-card">
              <span className="service-icon">✓</span>
              <h3>Trade-In Enquiries</h3>
              <p>Ask about exchanging your current vehicle.</p>
            </article>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">LET'S TALK</span>
            <h2>Ready for Your Next Drive?</h2>
            <p>
              Have a question about a vehicle? Send us an enquiry
              and take the next step towards your next car.
            </p>
            <div className="contact-detail">
              <span>✉</span>
              <div>
                <strong>Email</strong>
                <p>hello@autodrive.example</p>
              </div>
            </div>
            <div className="contact-detail">
              <span>⌖</span>
              <div>
                <strong>Location</strong>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send an Enquiry</h3>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              required
            />

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              required
            />

            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell us which car interests you..."
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              required
            />

            <button className="button submit-button" type="submit">
              Send Enquiry ↗
            </button>

            {formMessage && (
              <p className="form-message" role="status">{formMessage}</p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-icon">A</span>
          <span>Auto<span className="blue">Drive</span></span>
        </a>
        <p>© {new Date().getFullYear()} AutoDrive. Sample website for demonstration.</p>
        <a href="#home" className="text-link">Back to top ↑</a>
      </footer>

      {selectedCar && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedCar(null)}
          role="presentation"
        >
          <section
            className="car-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCar(null)}
              aria-label="Close details"
            >
              ✕
            </button>
            <img src={selectedCar.image} alt={selectedCar.name} />
            <span className="eyebrow">{selectedCar.year} MODEL</span>
            <h2 id="modal-title">{selectedCar.name}</h2>
            <p>
              {selectedCar.type} · {selectedCar.fuel} ·{" "}
              {selectedCar.transmission}
            </p>
            <h3>{money(selectedCar.price)}</h3>
            <a
              className="button"
              href="#contact"
              onClick={() => setSelectedCar(null)}
            >
              Enquire About This Car ↗
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
