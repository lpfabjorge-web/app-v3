import { useAppContext } from '../context/AppContext';

export default function Splash() {
  return (
    <div className="screen active" id="screen-splash">
      <div style={{ height: '44px' }}></div>
      <div className="splash-logo-wrap">
        <div className="logo-icon">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="14" r="5" fill="white" opacity="0.95" />
            <circle cx="14" cy="34" r="5" fill="white" opacity="0.95" />
            <circle cx="38" cy="34" r="5" fill="white" opacity="0.95" />
            <line x1="26" y1="19" x2="14" y2="29" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
            <line x1="26" y1="19" x2="38" y2="29" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
            <line x1="14" y1="34" x2="38" y2="34" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
            <circle cx="26" cy="28" r="3" fill="white" opacity="0.6" />
          </svg>
        </div>
        <div className="logo-wordmark">
          <div className="logo-wordmark-top">UNSA Connect</div>
          <div className="logo-wordmark-bottom">Tu campus, siempre contigo</div>
        </div>
        <div className="splash-tagline">Convierte tus huecos en oportunidades de desarrollo.</div>
      </div>
      <div className="splash-dots">
        <div className="splash-dot a"></div>
        <div className="splash-dot b"></div>
        <div className="splash-dot c"></div>
      </div>
    </div>
  );
}
