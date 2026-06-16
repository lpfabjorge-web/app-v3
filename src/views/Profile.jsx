import { useAppContext } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Profile() {
  const { user, logout, activities, navigateTo } = useAppContext();

  const savedActs = user?.saved_activities?.map(id => activities.find(a => a.id === id)).filter(Boolean) || [];

  return (
    <div className="screen active" id="screen-profile">
      <div className="profile-header">
        <div style={{ height: '34px' }}></div>
        <div className="profile-avatar-big">{user?.avatar || 'U'}</div>
        <div className="profile-name">{user?.name}</div>
        <div className="profile-meta">{user?.email} • Campus {user?.campus}</div>

        <div className="profile-stats">
          <div className="ps-item">
            <div className="ps-num">{user?.saved_activities?.length || 0}</div>
            <div className="ps-label">Guardadas</div>
          </div>
          <div className="ps-item">
            <div className="ps-num">{user?.attended_activities?.length || 0}</div>
            <div className="ps-label">Asistidas</div>
          </div>
          <div className="ps-item">
            <div className="ps-num">{user?.attended_activities?.length * 1.5 || 0}</div>
            <div className="ps-label">Horas Aprovechadas</div>
          </div>
        </div>
      </div>

      <div className="profile-scroll">
        <div className="profile-section">
          <div className="profile-section-title">Tus Actividades Guardadas</div>
          <div className="cert-list">
            {savedActs.length === 0 ? (
              <p style={{fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginTop: '10px'}}>
                Aún no tienes actividades guardadas.
              </p>
            ) : (
              savedActs.map(act => (
                <div className="cert-card" key={act.id} onClick={() => navigateTo('detail', act)} style={{ cursor: 'pointer' }}>
                  <div className="cert-icon">📌</div>
                  <div>
                    <div className="cert-name">{act.title}</div>
                    <div className="cert-date">{act.day} • {act.start}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-section-title">Opciones de Cuenta</div>
          <div className="profile-menu">
            <div className="pm-item" onClick={() => alert('Próximamente: Configuración de la cuenta')}>
              <div className="pm-icon">⚙️</div>
              <div className="pm-label">Configuración</div>
              <div className="pm-arrow">›</div>
            </div>
            <div className="pm-item" onClick={() => navigateTo('schedule')}>
              <div className="pm-icon">📅</div>
              <div className="pm-label">Actualizar Horario</div>
              <div className="pm-arrow">›</div>
            </div>
            <div className="pm-item" onClick={logout}>
              <div className="pm-icon">🚪</div>
              <div className="pm-label" style={{color: 'var(--red)'}}>Cerrar Sesión</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
