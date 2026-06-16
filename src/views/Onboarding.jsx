import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  const { navigateTo } = useAppContext();

  return (
    <div className="screen active" id="screen-onboarding">
      <div className="status-bar" style={{ background: '#fff' }}>
        <span className="status-time">9:41</span>
        <div className="status-icons">
          <svg width="16" height="12" viewBox="0 0 16 12">
            <rect x="0" y="4" width="3" height="8" rx="1" fill="#1A3A6B"/>
            <rect x="4" y="2" width="3" height="10" rx="1" fill="#1A3A6B"/>
            <rect x="8" y="0" width="3" height="12" rx="1" fill="#1A3A6B"/>
            <rect x="12" y="0" width="3" height="12" rx="1" fill="#E0D8CE"/>
          </svg>
        </div>
      </div>
      <div className="onboarding-inner">
        <div className="ob-slides-wrap">
          <div className="ob-slide active">
            <div className="ob-illustration">
              <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
                <circle cx="130" cy="130" r="100" fill="#EBF0F8" opacity="0.6"/>
                <rect x="75" y="80" width="110" height="140" rx="14" fill="#1A3A6B"/>
                <circle cx="180" cy="90" r="22" fill="#D4A017"/>
                <text x="180" y="96" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="white">📅</text>
              </svg>
            </div>
            <div className="ob-card-title">Sincroniza tu horario académico</div>
            <div className="ob-card-text">Identificamos tus horas libres entre clases automáticamente para que nunca más pierdas el tiempo.</div>
          </div>
        </div>
        <div className="ob-bottom">
          <div className="ob-progress">
            <div className="ob-pip active"></div>
            <div className="ob-pip"></div>
            <div className="ob-pip"></div>
          </div>
          <button className="btn-primary" onClick={() => navigateTo('login')}>Continuar al Login</button>
        </div>
      </div>
    </div>
  );
}
