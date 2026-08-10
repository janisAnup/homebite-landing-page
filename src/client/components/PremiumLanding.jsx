import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMeals } from '../hooks/useMeals';
import { currency, placeholderImage } from '../utils/formatters';
import './premium-landing.css';

const categories = ['All meals', 'Indian', 'Healthy', 'Baked', 'Comfort food', 'Vegan'];
const steps = [
  ['01', 'Explore nearby kitchens', 'Browse dishes prepared by independent cooks in your community.'],
  ['02', 'Choose what feels right', 'Use dietary preferences, cuisine, and price to find your next meal.'],
  ['03', 'Enjoy food made with care', 'Place your order and make everyday meals feel like home.'],
];
const testimonials = [
  ['“It feels like getting dinner from a talented friend, not another delivery app.”', 'Anika Shah', 'Product designer'],
  ['“The food is beautifully made, and I love knowing who is behind every meal.”', 'Rohan D.', 'HomeBite regular'],
  ['“I found the kind of comforting regional food I genuinely missed.”', 'Maya R.', 'Local foodie'],
];
const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

function chefInitials(name = 'HomeBite Kitchen') { return name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase(); }

export default function PremiumLanding() {
  const { user } = useAuth();
  const { meals, loading, error } = useMeals();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All meals');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const displayedMeals = useMemo(() => meals.filter(meal => category === 'All meals' || meal.cuisine === category || meal.diet === category || meal.name.toLowerCase().includes(category.toLowerCase())).slice(0, 4), [category, meals]);
  const submitSearch = event => {
    event.preventDefault();
    navigate(`/meals${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`);
  };
  const dashboard = user?.role === 'homecook' ? '/cook-dashboard' : '/customer-dashboard';

  return <main className="premium-page">
    <header className={`premium-nav ${scrolled ? 'premium-nav--compact' : ''}`}>
      <Link to="/" className="premium-brand" aria-label="HomeBite home"><span className="premium-brand__mark">⌂</span><span><b>Home<span>Bite</span></b><small>Homemade, near you</small></span></Link>
      <nav className="premium-nav__links" aria-label="Primary navigation"><a href="#how-it-works">How it works</a><a href="#meals">Discover meals</a><a href="#testimonials">Stories</a><a href="#for-chefs">For chefs</a></nav>
      <Link to={user ? dashboard : '/login'} className="premium-nav__action">{user ? 'My dashboard' : 'Log in'} <span aria-hidden="true">→</span></Link>
    </header>

    <section className="premium-hero">
      <motion.div className="premium-hero__copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .09 } } }}>
        <motion.p variants={fadeUp} className="premium-eyebrow"><span>✦</span> Local kitchens, thoughtfully discovered</motion.p>
        <motion.h1 variants={fadeUp}>A better way to find <em>food that feels like home.</em></motion.h1>
        <motion.p variants={fadeUp} className="premium-hero__intro">Explore beautifully made meals from independent home cooks around you—fresh, personal, and prepared with genuine care.</motion.p>
        <motion.form variants={fadeUp} className="premium-search" onSubmit={submitSearch}>
          <label><span aria-hidden="true">⌖</span><span className="sr-only">Your location</span><input value={location} onChange={event => setLocation(event.target.value)} placeholder="Your area or ZIP code" /></label>
          <span className="premium-search__divider" />
          <label><span aria-hidden="true">⌕</span><span className="sr-only">Search meals</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="What are you craving?" /></label>
          <button type="submit">Explore meals <span aria-hidden="true">→</span></button>
        </motion.form>
        <motion.div variants={fadeUp} className="premium-trust"><span className="premium-avatar-stack"><i>AS</i><i>RD</i><i>MR</i></span><p><strong>5,000+</strong> neighbours finding their new favourite meal</p></motion.div>
      </motion.div>
      <motion.div className="premium-hero__visual" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .45 }}>
        <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1100&q=88" alt="Home cook preparing a meal" />
        <motion.div whileHover={{ y: -4 }} className="premium-float premium-float--rating"><span>★</span><div><strong>4.8 / 5</strong><small>Average cook rating</small></div></motion.div>
        <motion.div whileHover={{ y: -4 }} className="premium-float premium-float--dish"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=180&q=80" alt="" /><div><small>Tonight’s favourite</small><strong>Comfort, served warm</strong></div></motion.div>
        <span className="premium-orb premium-orb--one" /><span className="premium-orb premium-orb--two" />
      </motion.div>
    </section>

    <section className="premium-metrics" aria-label="HomeBite highlights"><article><strong>4.8<span>/5</span></strong><p>average meal rating</p></article><article><strong>5k<span>+</span></strong><p>happy local foodies</p></article><article><strong>250<span>+</span></strong><p>independent home cooks</p></article><article><strong>100<span>%</span></strong><p>made in real kitchens</p></article></section>

    <section id="meals" className="premium-section premium-meals">
      <motion.div className="premium-section__head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={fadeUp}><div><p className="premium-eyebrow"><span>✦</span> Discover something wonderful</p><h2>Made nearby. <em>Loved instantly.</em></h2></div><Link to="/meals" className="premium-text-link">Browse all meals <span>→</span></Link></motion.div>
      <div className="premium-chips" role="list" aria-label="Meal categories">{categories.map(item => <button role="listitem" key={item} onClick={() => setCategory(item)} className={category === item ? 'is-active' : ''}>{item}</button>)}</div>
      {loading && <p className="premium-status">Finding today’s fresh listings…</p>}{error && <p className="premium-status premium-status--error">We could not load meals right now. Please try again shortly.</p>}
      <div className="premium-meal-grid">{displayedMeals.map((meal, index) => <motion.article key={meal.id} className="premium-meal-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={fadeUp} transition={{ delay: index * .06 }} whileHover={{ y: -7 }}><div className="premium-meal-card__image"><img src={meal.image || placeholderImage} alt={meal.name} /><span>{meal.cuisine}</span><button aria-label={`Save ${meal.name}`}>♡</button></div><div className="premium-meal-card__body"><div className="premium-meal-card__title"><div><h3>{meal.name}</h3><p>{meal.diet} · made today</p></div><strong>{currency(meal.price)}</strong></div><div className="premium-chef"><span>{chefInitials(meal.cookName)}</span><p>By <b>{meal.cookName || 'HomeBite Kitchen'}</b></p><small>★ 4.8</small></div></div></motion.article>)}</div>
      {!loading && !error && !displayedMeals.length && <p className="premium-status">No meals match this category yet. Try another one.</p>}
    </section>

    <section id="how-it-works" className="premium-section premium-how"><div className="premium-how__art"><div className="premium-how__plate">⌂</div><span className="premium-how__leaf">✦</span></div><div><p className="premium-eyebrow"><span>✦</span> Simple by design</p><h2>Good food should be <em>easy to find.</em></h2><div className="premium-steps">{steps.map(([number, title, copy]) => <motion.article key={number} whileHover={{ x: 4 }}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></motion.article>)}</div></div></section>

    <section id="testimonials" className="premium-section premium-testimonials"><div className="premium-section__head"><div><p className="premium-eyebrow"><span>✦</span> From the community</p><h2>Small moments, <em>well fed.</em></h2></div><p className="premium-section__copy">Real people sharing the meals and connections they’ve found at HomeBite.</p></div><div className="premium-testimonial-grid">{testimonials.map(([quote, name, role], index) => <motion.figure key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * .07 }} whileHover={{ y: -5 }}><blockquote>{quote}</blockquote><figcaption><span>{chefInitials(name)}</span><p><b>{name} <i>✓</i></b><small>{role} · Verified member</small></p></figcaption></motion.figure>)}</div></section>

    <section id="for-chefs" className="premium-chef-cta"><div><p className="premium-eyebrow"><span>✦</span> Built for people who cook with heart</p><h2>Your kitchen has <em>something special.</em></h2><p>Share your food, grow a following, and build a little business around the meals only you can make.</p><Link to={user?.role === 'homecook' ? '/cook-dashboard' : '/register'}>Become a HomeBite chef <span>→</span></Link></div><div className="premium-benefits"><article><span>⌁</span><div><strong>Your menu, your way</strong><p>Set your own dishes and availability.</p></div></article><article><span>♡</span><div><strong>Find your regulars</strong><p>Turn thoughtful meals into lasting connections.</p></div></article><article><span>✦</span><div><strong>Simple to manage</strong><p>One beautiful dashboard for every listing.</p></div></article></div></section>
    <footer className="premium-footer"><Link to="/" className="premium-brand"><span className="premium-brand__mark">⌂</span><span><b>Home<span>Bite</span></b><small>Homemade, near you</small></span></Link><p>© 2026 HomeBite · Good food lives close by.</p></footer>
  </main>;
}
