import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';

export function Loading({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="page page--narrow loading" role="status">
      <span className="spinner" aria-hidden="true" /> {label}
    </div>
  );
}

export function NotFound({ message }: { message?: string }) {
  return (
    <div className="page page--narrow">
      <div className="soon">
        <h1>No encontramos esta página</h1>
        <p>{message ?? 'El enlace puede estar mal escrito o el contenido todavía no existe.'}</p>
        <Link className="btn btn--soft" to="/">
          <Icon name="home" size={16} /> Volver al inicio
        </Link>
      </div>
    </div>
  );
}
