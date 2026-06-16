import { useAppContext } from '../context/AppContext';

export default function ActivityDetail() {
  const { selectedActivity, navigateTo, saveActivity, user } = useAppContext();

  if (!selectedActivity) {
    return (
      <div className="screen active" id="screen-detail" style={{ justifyContent: 'center', alignItems: 'center', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div className="ob-card-title">Ninguna actividad seleccionada</div>
        <p className="ob-card-text" style={{ marginBottom: '32px' }}>
          Por favor, selecciona una actividad recomendada desde tu inicio para ver sus detalles.
        </p>
        <button className="btn-primary" onClick={() => navigateTo('home')}>Volver al Inicio</button>
      </div>
    );
  }

  const act = selectedActivity;
  const isSaved = user?.saved_activities?.includes(act.id);

  const handleSave = () => {
    saveActivity(act.id);
    alert('Actividad guardada exitosamente. \n\nPara propósitos de la demo, se ha simulado la persistencia local.');
  };

  return (
    <div className="screen active" id="screen-detail">
      <div className="detail-header">
        <div className="back-btn" onClick={() => navigateTo('home')}>←</div>
        <div className="detail-title-small">Detalle de Actividad</div>
      </div>

      <div className="detail-scroll">
        <div className="detail-hero-card">
          <div className="detail-cat">{act.category}</div>
          <div className="detail-name">{act.title}</div>
          <div className="detail-badges">
            <div className="detail-badge">📅 {act.day}</div>
            <div className="detail-badge">🕒 {act.start} - {act.end}</div>
          </div>
        </div>

        <div className="detail-info-card">
          <div className="dic-title">Información General</div>
          <div className="dic-rows">
            <div className="dic-row">
              <div className="dic-row-icon">📍</div>
              <div>
                <div className="dic-row-label">Ubicación</div>
                <div className="dic-row-value">{act.campus} - {act.location}</div>
              </div>
            </div>
            <div className="dic-row">
              <div className="dic-row-icon">👥</div>
              <div style={{ width: '100%' }}>
                <div className="dic-row-label">Disponibilidad de cupos</div>
                <div className="dic-row-value">{act.spots_available} de {act.total_spots} disponibles</div>
                <div className="cupos-row">
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>0</span>
                  <div className="cupos-bar-wrap">
                    <div className="cupos-bar" style={{ width: `${(act.spots_available/act.total_spots)*100}%` }}></div>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{act.total_spots}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-info-card">
          <div className="dic-title">Acerca de la actividad</div>
          <div className="detail-desc">
            {act.description}
          </div>
        </div>
      </div>

      <div className="detail-cta">
        <button 
          className={`btn-primary ${isSaved ? 'gold' : ''}`}
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? '✓ Actividad Guardada' : 'Guardar y Recordar'}
        </button>
      </div>
    </div>
  );
}
