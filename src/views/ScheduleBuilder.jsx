import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 to 20:00

export default function ScheduleBuilder() {
  const { user, setUser, navigateTo } = useAppContext();
  
  const [busySet, setBusySet] = useState(new Set());
  const isDragging = useRef(false);
  const dragMode = useRef(null); // 'add' or 'remove'

  useEffect(() => {
    if (user && user.busy_schedule) {
      const initialSet = new Set();
      user.busy_schedule.forEach(block => {
        const startHour = parseInt(block.start.split(':')[0], 10);
        const endHour = parseInt(block.end.split(':')[0], 10);
        for (let h = startHour; h < endHour; h++) {
          initialSet.add(`${block.day}-${h}`);
        }
      });
      setBusySet(initialSet);
    }
  }, [user]);

  const handlePointerDown = (key, e) => {
    e.preventDefault(); // Prevent scrolling on mobile while dragging
    isDragging.current = true;
    
    const newSet = new Set(busySet);
    if (newSet.has(key)) {
      dragMode.current = 'remove';
      newSet.delete(key);
    } else {
      dragMode.current = 'add';
      newSet.add(key);
    }
    setBusySet(newSet);
  };

  const handlePointerEnter = (key, e) => {
    e.preventDefault();
    if (!isDragging.current) return;
    
    const newSet = new Set(busySet);
    if (dragMode.current === 'add') {
      newSet.add(key);
    } else if (dragMode.current === 'remove') {
      newSet.delete(key);
    }
    setBusySet(newSet);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    dragMode.current = null;
  };

  // Attach global pointer up to catch releases outside the grid
  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const saveSchedule = () => {
    if (!user) return;
    const newSchedule = [];
    busySet.forEach(key => {
      const [day, hourStr] = key.split('-');
      const h = parseInt(hourStr, 10);
      newSchedule.push({
        day,
        start: `${h.toString().padStart(2, '0')}:00`,
        end: `${(h + 1).toString().padStart(2, '0')}:00`,
        title: "Clase"
      });
    });

    const updatedUser = { ...user, busy_schedule: newSchedule };
    setUser(updatedUser);
    localStorage.setItem('unsa_connect_user', JSON.stringify(updatedUser));
    
    alert('Horario actualizado. El motor ha recalculado tus huecos libres.');
    navigateTo('home');
  };

  return (
    <div className="screen active" style={{ background: '#F0EDE8' }}>
      <div className="detail-header" style={{ background: '#fff', padding: '24px 16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <div className="detail-title-small" style={{ fontSize: '18px', fontWeight: '800' }}>Configura tu Horario</div>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', lineHeight: '1.5' }}>
          Toca o <strong>desliza tu dedo</strong> sobre los bloques para marcar tus horas de clase. Las zonas en blanco serán tus huecos.
        </p>
      </div>

      <div className="sb-container">
        <div className="sb-grid">
          {/* Header Row */}
          <div></div>
          {DAYS.map(day => (
            <div key={day} className="sb-header-cell">
              {day.substring(0, 3)}
            </div>
          ))}

          {/* Grid Rows */}
          {HOURS.map(hour => (
            <div style={{ display: 'contents' }} key={hour}>
              <div className="sb-time-cell">
                {hour}:00
              </div>
              {DAYS.map(day => {
                const key = `${day}-${hour}`;
                const isBusy = busySet.has(key);
                return (
                  <div 
                    key={key}
                    className={`sb-block ${isBusy ? 'busy' : ''}`}
                    onPointerDown={(e) => handlePointerDown(key, e)}
                    onPointerEnter={(e) => handlePointerEnter(key, e)}
                  >
                    {isBusy && <span className="sb-label">Clase</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <button className="btn-primary" style={{ marginTop: '28px', marginBottom: '40px' }} onClick={saveSchedule}>
          Guardar y recalcular huecos
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
