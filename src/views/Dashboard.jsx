import { useAppContext } from '../context/AppContext';
import { getRecommendedActivities } from '../utils/engine';
import BottomNav from '../components/BottomNav';

export default function Dashboard() {
  const { user, activities, navigateTo } = useAppContext();

  const recommended = getRecommendedActivities(user, activities);

  return (
    <div className="screen active" id="screen-home">
      <div className="home-header">
        <div style={{ height: '24px' }}></div>
        <div className="home-top-row">
          <div>
            <div className="home-greeting-label">Hola,</div>
            <div className="home-greeting-name">{user?.name?.split(' ')[0] || 'Estudiante'}</div>
          </div>
          <div className="home-avatar" onClick={() => navigateTo('profile')}>
            {user?.avatar || 'U'}
          </div>
        </div>
        
        <div className="home-alert-banner">
          <div className="home-alert-dot"></div>
          <div className="home-alert-text">
            Tienes <strong>{recommended.length} actividades recomendadas</strong> para tus huecos de hoy.
          </div>
        </div>
      </div>

      <div className="home-scroll">
        <div className="sec-heading">
          <h2>Recomendado para ti</h2>
          <a>Ver todo</a>
        </div>

        <div className="activity-cards">
          {recommended.map(act => (
            <div className="act-card" key={act.id} onClick={() => navigateTo('detail', act)}>
              <div className="act-card-stripe bg-gold"></div>
              <div className="act-card-body">
                <div className="act-category c-gold">{act.category}</div>
                <div className="act-name">{act.title}</div>
                <div className="act-meta">
                  <div className="act-meta-item">🕒 {act.start} - {act.end}</div>
                  <div className="act-meta-item">📍 {act.campus}</div>
                </div>
              </div>
              <div className="act-card-arrow">›</div>
            </div>
          ))}
          {recommended.length === 0 && (
            <p style={{fontSize: '13px', color: 'var(--muted)'}}>No hay recomendaciones para tus huecos actuales.</p>
          )}
        </div>

        <div className="sec-heading" style={{ marginTop: '10px' }}>
          <h2>Tu Horario (Hoy)</h2>
        </div>

        <div className="schedule-card">
          <div className="sc-title-row">
            <div className="sc-title">Clases Programadas</div>
            <div className="sc-date">Lunes</div>
          </div>
          <div className="schedule-slots">
            {user?.busy_schedule?.filter(s => s.day === 'Lunes').map((s, idx) => (
              <div className="slot clase" key={idx}>
                <div className="slot-time">{s.start}</div>
                <div className="slot-label">{s.title}</div>
                <div className="slot-badge clase">Clase</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
