import os

css_to_append = """
/* --- ASYMMETRIC HERO SPLIT --- */
.hero-split {
  display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px;
}
.hero-left {
  flex: 0 0 36%;
  display: flex; flex-direction: column; justify-content: center;
}
.hero-right {
  flex: 0 0 62%;
}

.fg-features-vertical {
  margin-top: 40px; display: flex; flex-direction: column; gap: 16px;
  border-top: 1px solid rgba(0,0,0,0.05); padding-top: 32px;
}
.fg-feat-v {
  display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: #334155;
}
.fg-feat-icon-v {
  background: #f1f5f9; padding: 10px; border-radius: 12px; color: #3b82f6; display: flex;
}

.fg-row-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;
}

/* Stacked 3D Card */
.fg-card-3d-stacked {
  background: #fdfdfd; border: 1px solid rgba(0,0,0,0.04); border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.02); padding: 12px;
  display: flex; flex-direction: column; gap: 12px; transition: all 0.4s ease;
}
.fg-card-3d-stacked:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
.fg-img-box-stacked {
  position: relative; background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%);
  border-radius: 14px; height: 140px; display: flex; align-items: center; justify-content: center;
}
.fg-img-box-stacked img { max-width: 90%; max-height: 90%; object-fit: contain; transition: transform 0.4s; }
.fg-card-3d-stacked:hover .fg-img-box-stacked img { transform: scale(1.05); }
.fg-info-stacked { display: flex; flex-direction: column; gap: 8px; padding: 4px 8px 8px 8px; }
.fg-cat-stacked { font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px; }
.fg-title-stacked { font-size: 13px; font-weight: 700; line-height: 1.3; color: #0f172a; margin: 0; }
.fg-badge-stacked { display: inline-flex; align-items: center; gap: 4px; background: rgba(15,23,42,0.04); padding: 6px 8px; border-radius: 6px; font-size: 9px; font-weight: 700; color: #0f172a; width: max-content; margin-top: 4px;}

/* Small AR Card */
.fg-card-ar-small {
  position: relative; border-radius: 20px; overflow: hidden; height: 160px; background: #000; transition: all 0.4s ease;
}
.fg-card-ar-small:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
.fg-card-ar-small img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: all 0.4s; transform: scale(1.65); }
.fg-card-ar-small:hover img { opacity: 1; transform: scale(1.7); }

@media (max-width: 1200px) {
  .hero-split { flex-direction: column; text-align: center; gap: 40px; }
  .hero-left, .hero-right { flex: 0 0 100%; width: 100%; }
  .hero-left h2, .hero-left p { text-align: center !important; }
  .fg-features-vertical { flex-direction: row; justify-content: center; flex-wrap: wrap; }
}
@media (max-width: 900px) {
  .fg-row-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .fg-row-grid { grid-template-columns: 1fr; }
}
/* --- PREMIUM BADGE --- */
.ix-premium-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1));
  border: 1px solid rgba(59,130,246,0.2);
  color: #3b82f6;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  box-shadow: 0 4px 12px rgba(59,130,246,0.08);
}
.ix-premium-badge svg {
  fill: rgba(59,130,246,0.2);
}

/* --- INTERACTIVE 3-CARD GRID (IPHONE) --- */
.interactive-grid {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-top: 60px;
}
.ix-card {
  position: relative; perspective: 1200px; width: 310px; height: 550px; flex-shrink: 0;
}
.ix-toggle-pill {
  position: absolute; top: -60px; left: 50%; transform: translateX(-50%); z-index: 10;
  display: flex; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px);
  padding: 4px; border-radius: 100px; box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid rgba(255,255,255,0.5);
}
.ix-btn {
  border: none; background: transparent; padding: 8px 16px; font-size: 11px; font-weight: 700; color: #64748b; border-radius: 100px; cursor: pointer; transition: all 0.3s;
}
.ix-btn.active {
  background: #fff; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.ix-card-inner {
  position: relative; width: 100%; height: 100%; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d;
}
.ix-card.show-ar .ix-card-inner {
  transform: rotateY(180deg);
}
.ix-face {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; overflow: visible;
}

/* The Phone Frame (using transparent PNG overlay) */
.ix-front, .ix-back {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}
.ix-hardware-overlay {
  position: absolute; top: -1%; left: -2%; width: 104%; height: 102%;
  z-index: 100; pointer-events: none;
}
.ix-screen {
  position: absolute; top: 18px; left: 16px; right: 16px; bottom: 18px;
  background: transparent; border-radius: 40px; overflow: hidden;
  z-index: 1;
}
.ix-3d-content {
  position: relative; width: 100%; height: 100%;
}
/* Screen Glare */
.ix-3d-content::before, .ix-ar-content::before {
  content: "";
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%);
  pointer-events: none;
  z-index: 10;
}
.ix-img-wrap {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent;
}
.ix-img-wrap img {
  width: 100%; height: 100%; object-fit: contain; transition: transform 0.5s ease; mix-blend-mode: darken; padding: 20px;
}
.ix-card:hover .ix-img-wrap img { transform: scale(1.05); }
.ix-info {
  position: absolute; bottom: 0; left: 0; right: 0; padding: 40px 16px 24px;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%);
  display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;
  z-index: 2;
}
.ix-cat { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px; }
.ix-title { font-size: 16px; font-weight: 800; line-height: 1.3; color: #0f172a; margin: 0; font-family: var(--font); }
.ix-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(15,23,42,0.04); padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; color: #0f172a; margin-top: 4px; }

/* Back Face */
.ix-back {
  background: transparent; transform: rotateY(180deg);
}
.ix-ar-content {
  position: relative; width: 100%; height: 100%;
}
.ix-ar-content img {
  width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0.9; transform: scale(1.05); transition: transform 0.6s ease;
}
.ix-card:hover .ix-ar-content img { opacity: 1; transform: scale(1.35); }
.ix-ar-overlay-bottom {
  position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: center; z-index: 2;
}
.ix-ar-hint {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); color: #fff; font-size: 11px; font-weight: 500; text-align: center; padding: 10px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1);
}

@media (max-width: 1024px) {
  .interactive-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .interactive-grid { grid-template-columns: 1fr; }
}
"""

with open('styles.v5.css', 'a', encoding='utf-8') as f:
    f.write(css_to_append)
