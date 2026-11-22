import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  X,
  MapPin,
  Phone,
  Mail,
  Camera,
  Globe2,
  Truck,
  Ruler,
} from 'lucide-react'
import './App.css'

const asset = (name) => encodeURI(`/assets/${name}`)

const photos = {
  industrial: 'WhatsApp Image 2026-11-22 at 10.05.40.jpeg',
  blueShorts: 'WhatsApp Image 2026-11-22 at 10.05.41.jpeg',
  bluePattern: 'WhatsApp Image 2026-11-22 at 10.05.43.jpeg',
  whitePatch: 'WhatsApp Image 2026-11-22 at 10.05.44.jpeg',
  whiteShirt: 'WhatsApp Image 2026-11-22 at 10.05.45.jpeg',
  patternedSet: 'WhatsApp Image 2026-11-22 at 10.05.47.jpeg',
  whiteAnkara: 'WhatsApp Image 2026-11-22 at 10.05.48.jpeg',
  logo: 'WhatsApp Image 2026-11-22 at 10.35.00.jpeg',
  wineSet: 'WhatsApp Image 2026-11-22 at 11.00.58.jpeg',
  wineCampaign: 'WhatsApp Image 2026-11-22 at 11.00.59.jpeg',
  creamSet: 'WhatsApp Image 2026-11-22 at 10.05.42.jpeg',
  beigeSet: 'WhatsApp Image 2026-11-22 at 10.05.46.jpeg',
}

const products = [
  { name: 'Midnight Blue Short Set', category: 'Smart Casual', image: photos.blueShorts, detail: 'A sharp blue top paired with coordinated patterned shorts for elevated leisure.' },
  { name: 'Executive Ankara Shirt', category: 'Traditional', image: photos.creamSet, detail: 'A contemporary cream shirt with an expressive woven trouser pairing.' },
  { name: 'Geometric Pattern Ensemble', category: 'Ready-to-Wear', image: photos.patternedSet, detail: 'A bold, graphic two-piece designed for confident statement dressing.' },
  { name: 'Ivory Patchwork Shirt', category: 'Smart Casual', image: photos.whitePatch, detail: 'A relaxed ivory shirt finished with distinctive Ankara-inspired details.' },
  { name: 'Wine Tailored Leisure Set', category: 'Ready-to-Wear', image: photos.wineSet, detail: 'A modern monochrome leisure set with clean tailoring and flowing proportions.' },
  { name: 'Sandstone Woven Set', category: 'Traditional', image: photos.beigeSet, detail: 'A warm neutral top and coordinating patterned shorts with rich cultural detail.' },
  { name: 'Ivory Corporate Set', category: 'Corporate', image: photos.whiteShirt, detail: 'A crisp ivory shirt and tailored trousers for polished everyday wear.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [selected, setSelected] = useState(products[0])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    document.body.style.overflow = orderOpen || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [orderOpen, menuOpen])

  const filtered = useMemo(() => products.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, search])

  const openOrder = (product = selected) => {
    setSelected(product)
    setOrderOpen(true)
  }

  const whatsapp = (message = 'Hello ChurchillBrightwell-Couture, I am interested in your clothing collections and would like to make an enquiry.') =>
    `https://wa.me/2348065391402?text=${encodeURIComponent(message)}`

  const submitOrder = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      'Hello ChurchillBrightwell-Couture, I would like to place an order.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Design: ${selected.name}`,
      `Category: ${selected.category}`,
      `Order type: ${data.get('orderType')}`,
      `Size: ${data.get('size')}`,
      `Colour: ${data.get('colour')}`,
      `Quantity: ${data.get('quantity')}`,
      `Destination: ${data.get('destination')}`,
      `Address: ${data.get('address')}`,
      `Instructions: ${data.get('instructions') || 'None'}`,
    ].join('\n')
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <header className="nav">
        <a className="brand" href="#home" aria-label="ChurchillBrightwell Couture home">
          <span className="brand-mark">CB</span>
          <span className="brand-name">CHURCHILLBRIGHTWELL <small>COUTURE</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger" type="button">Collections <span aria-hidden="true">⌄</span></button>
            <div className="nav-dropdown-menu">
              <a href="#collections" onClick={() => setMenuOpen(false)}>Featured Collections</a>
              <a href="#catalogue" onClick={() => setMenuOpen(false)}>Shop Ready-to-Wear</a>
              <a href="#catalogue" onClick={() => setMenuOpen(false)}>Traditional &amp; Native Wear</a>
              <a href="#catalogue" onClick={() => setMenuOpen(false)}>Corporate &amp; Smart Casual</a>
            </div>
          </div>
          <a href="#bespoke" onClick={() => setMenuOpen(false)}>Bespoke</a>
          <a href="#catalogue" onClick={() => setMenuOpen(false)}>Ready-to-Wear</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-order" onClick={() => openOrder()}><ShoppingBag size={17} /> Order Now</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">ABUJA · NIGERIA · WORLDWIDE</p>
            <h1>WEAR YOUR<br /><em>CONFIDENCE.</em></h1>
            <p className="hero-text">Where exceptional craftsmanship meets contemporary elegance. Clothing designed to make every appearance count.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#collections">Explore Collections <ArrowRight size={18} /></a>
              <a className="button button-outline" href="#bespoke">Create Your Custom Design</a>
            </div>
          </div>
          <div className="hero-media">
            <img src={asset(photos.industrial)} alt="ChurchillBrightwell industrial tailoring campaign" />
            <div className="hero-caption"><span>01</span><p>Bespoke tailoring<br />for every presence</p></div>
          </div>
        </section>

        <section className="manifesto" id="about">
          <p className="section-number">01 / THE HOUSE</p>
          <div>
            <p className="eyebrow dark">THE ART OF DRESSING WITH DISTINCTION</p>
            <h2>More than clothing.<br /><em>A statement of character.</em></h2>
          </div>
          <p className="manifesto-copy">Defined by details, we craft garments that speak to authority, comfort and unmatched quality. From sharp bespoke tailoring to elevated ready-to-wear, every ChurchillBrightwell piece is shaped around individual expression.</p>
        </section>

        <section className="delivery-strip">
          <div className="delivery-intro">
            <p className="eyebrow">FROM ABUJA TO THE WORLD</p>
            <h2>Exceptional style.<br /><em>Delivered everywhere.</em></h2>
          </div>
          <div className="delivery-grid">
            <article><Truck /><h3>Nationwide</h3><p>Delivery across Nigeria</p></article>
            <article><Globe2 /><h3>Worldwide</h3><p>International shipping</p></article>
            <article><ShoppingBag /><h3>Convenient</h3><p>Simple online ordering</p></article>
          </div>
          <p className="delivery-slogan">Crafted with distinction.<br />Delivered without boundaries.</p>
        </section>

        <section className="collections" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">CURATED SELECTION</p>
              <h2>Featured <em>Collections</em></h2>
            </div>
            <a className="text-link" href="#catalogue">View all pieces <ArrowRight size={17} /></a>
          </div>
          <div className="collection-grid">
            <article className="collection-card large">
              <img src={asset(photos.creamSet)} alt="Traditional executive outfit" />
              <div><p>01 / TRADITIONAL</p><h3>Native &amp; Cultural Wear</h3><a href="#catalogue">Explore <ArrowRight size={16} /></a></div>
            </article>
            <article className="collection-card">
              <img src={asset(photos.whiteShirt)} alt="Ivory corporate outfit" />
              <div><p>02 / CORPORATE</p><h3>Executive Essentials</h3><a href="#catalogue">Explore <ArrowRight size={16} /></a></div>
            </article>
            <article className="collection-card">
              <img src={asset(photos.wineSet)} alt="Modern wine ready-to-wear set" />
              <div><p>03 / READY-TO-WEAR</p><h3>Modern Leisure</h3><a href="#catalogue">Explore <ArrowRight size={16} /></a></div>
            </article>
          </div>
        </section>

        <section className="bespoke" id="bespoke">
          <div className="bespoke-image">
            <img src={asset(photos.logo)} alt="ChurchillBrightwell Couture brand identity" />
          </div>
          <div className="bespoke-copy">
            <p className="eyebrow">BESPOKE ATELIER</p>
            <h2>Your vision.<br /><em>Our craftsmanship.</em></h2>
            <p>Bring your preferred design, choose your colours and share your measurements. We create garments around your fit, purpose and personal expression.</p>
            <button className="button button-gold" onClick={() => openOrder()}>Design Your Outfit <ArrowRight size={18} /></button>
          </div>
        </section>

        <section className="catalogue" id="catalogue">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">THE CURRENT EDIT</p>
              <h2>Ready-to-wear <em>&amp; statement pieces</em></h2>
            </div>
            <div className="catalogue-tools">
              <label className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pieces" /></label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
                <option>All</option>
                {['Smart Casual', 'Traditional', 'Ready-to-Wear', 'Corporate'].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image"><img src={asset(product.image)} alt={product.name} /><button onClick={() => openOrder(product)}>Order This Design</button></div>
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="product-detail">{product.detail}</p>
                <p className="quote">Request a Quote</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bulk">
          <div>
            <p className="eyebrow">CORPORATE &amp; GROUP ORDERS</p>
            <h2>Exceptional style,<br /><em>at every scale.</em></h2>
          </div>
          <p>For organisations, events, institutions and distinguished groups seeking a consistent, premium presence.</p>
          <button className="button button-light" onClick={() => openOrder()}>Bulk Order Enquiry <ArrowRight size={18} /></button>
        </section>

        <section className="instagram">
          <div className="insta-heading"><Camera /><div><p>FOLLOW THE HOUSE</p><h2>@Churchillbrightwell</h2></div></div>
          <div className="insta-grid">
            {[photos.wineCampaign, photos.blueShorts, photos.whitePatch, photos.patternedSet, photos.industrial].map((image) => (
              <a key={image} href="https://instagram.com/Churchillbrightwell" target="_blank" rel="noreferrer"><img src={asset(image)} alt="ChurchillBrightwell social campaign" /></a>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-brand">
          <span className="brand-mark">CB</span>
          <p>Defined by details. Crafted with distinction.</p>
        </div>
        <div><h3>Explore</h3><a href="#collections">Collections</a><a href="#bespoke">Bespoke</a><a href="#about">Our House</a></div>
        <div><h3>Visit</h3><p><MapPin size={15} /> Suite 8 Annex, Tian Plaza, Utako, Abuja, Nigeria</p></div>
        <div><h3>Contact</h3><a href="mailto:churchwell3000@gmail.com"><Mail size={15} /> churchwell3000@gmail.com</a><a href="tel:+2348065391402"><Phone size={15} /> +234 806 539 1402</a><a href="https://instagram.com/Churchillbrightwell" target="_blank" rel="noreferrer"><Camera size={15} /> @Churchillbrightwell</a></div>
        <div className="footer-bottom"><p>© 2026 ChurchillBrightwell-Couture</p><p>Nationwide delivery · International delivery</p></div>
      </footer>

      <a className="whatsapp-float" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <Phone size={21} />
      </a>

      {orderOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setOrderOpen(false)}>
          <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            <button className="modal-close" onClick={() => setOrderOpen(false)} aria-label="Close order form"><X /></button>
            <div className="order-preview"><img src={asset(photos.wineCampaign)} alt="ChurchillBrightwell Couture campaign" /><p>PRIVATE APPOINTMENT</p><h3>Your vision, tailored with distinction.</h3></div>
            <form onSubmit={submitOrder}>
              <p className="eyebrow dark">PRIVATE ORDER ENQUIRY</p>
              <h2 id="order-title">Create your request</h2>
              <div className="form-grid">
                <label>Full name<input required name="name" /></label>
                <label>Phone / WhatsApp<input required name="phone" /></label>
                <label>Preferred colour<input name="colour" placeholder="e.g. Navy blue" /></label>
                <label>Quantity<input name="quantity" type="number" min="1" defaultValue="1" /></label>
                <label>Order type<select name="orderType"><option>Ready-to-Wear</option><option>Bespoke</option></select></label>
                <label>Size<select name="size"><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option><option>Custom Measurements</option></select></label>
                <label className="full">Delivery destination<input required name="destination" placeholder="City, State / Country" /></label>
                <label className="full">Full delivery address<textarea required name="address" rows="2" /></label>
                <label className="full">Additional instructions<textarea name="instructions" rows="3" placeholder="Fabric preference, preferred date or bespoke details" /></label>
              </div>
              <button className="button button-gold submit" type="submit">Send Enquiry via WhatsApp <ArrowRight size={18} /></button>
              <p className="form-note"><Ruler size={15} /> Custom measurements can be discussed after your enquiry.</p>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default App
