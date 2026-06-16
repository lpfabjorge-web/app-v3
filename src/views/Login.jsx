import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@unsa.edu.pe')) {
      setError('Por favor, usa tu correo institucional @unsa.edu.pe');
      return;
    }
    const success = login(email);
    if (!success) {
      setError('Correo no encontrado en la base de datos simulada. Prueba con avaldivia@unsa.edu.pe');
    }
  };

  return (
    <div className="screen active" id="screen-login">
      <div className="login-hero">
        <div className="login-logo-row">
          <div className="login-logo-icon">
            <svg width="24" height="24" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="14" r="5" fill="white" />
              <circle cx="14" cy="34" r="5" fill="white" />
              <circle cx="38" cy="34" r="5" fill="white" />
              <line x1="26" y1="19" x2="14" y2="29" stroke="white" strokeWidth="2.5" />
              <line x1="26" y1="19" x2="38" y2="29" stroke="white" strokeWidth="2.5" />
              <line x1="14" y1="34" x2="38" y2="34" stroke="white" strokeWidth="2.5" />
            </svg>
          </div>
          <div>
            <div className="llt-top">UNSA Connect</div>
            <div className="llt-bot">Acceso de Estudiantes</div>
          </div>
        </div>
        <h1 className="login-h1">Ingresa con tu correo <span>Institucional</span></h1>
        <p className="login-sub">Sin contraseñas. Recibirás un enlace mágico para entrar.</p>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo UNSA</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="ej. jperez@unsa.edu.pe" 
              value={email}
              onChange={(e) => {setEmail(e.target.value); setError('');}}
              required
            />
            {error && <div className="form-error">{error}</div>}
          </div>

          <div className="form-consent">
            <input type="checkbox" id="consent" required />
            <p>
              Acepto el uso de mis datos para personalización del servicio, según la 
              <a href="#"> Ley N° 29733</a> de Protección de Datos Personales.
            </p>
          </div>

          <button type="submit" className="btn-primary">Enviar enlace mágico</button>
        </form>
      </div>
    </div>
  );
}
