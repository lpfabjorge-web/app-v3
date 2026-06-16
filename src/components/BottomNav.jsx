import { useAppContext } from '../context/AppContext';

export default function BottomNav() {
  const { currentScreen, navigateTo } = useAppContext();

  return (
    <div className="bottom-nav">
      <div 
        className={`bnav-item ${currentScreen === 'home' ? 'active' : ''}`}
        onClick={() => navigateTo('home')}
      >
        <div className="bnav-icon">🏠</div>
        <div className="bnav-label">Inicio</div>
      </div>
      <div 
        className={`bnav-item ${currentScreen === 'schedule' ? 'active' : ''}`}
        onClick={() => navigateTo('schedule')}
      >
        <div className="bnav-icon">📅</div>
        <div className="bnav-label">Horario</div>
      </div>
      <div 
        className={`bnav-item ${currentScreen === 'profile' ? 'active' : ''}`}
        onClick={() => navigateTo('profile')}
      >
        <div className="bnav-icon">👤</div>
        <div className="bnav-label">Perfil</div>
      </div>
    </div>
  );
}
