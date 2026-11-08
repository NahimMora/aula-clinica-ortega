import { Component, type ErrorInfo, type ReactNode } from 'react';

/** Evita que un error en un componente (diagrama, reproductor, diapositiva) deje la página en blanco. */
export class ErrorBoundary extends Component<{ children: ReactNode; label?: string; compact?: boolean }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Aula Clínica]', this.props.label ?? 'componente', error, info.componentStack);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className={`errbox ${this.props.compact ? 'errbox--compact' : ''}`} role="alert">
        <strong>No se pudo mostrar {this.props.label ?? 'este contenido'}.</strong>
        <span>El resto de la página sigue disponible.</span>
        <button className="btn btn--soft btn--sm" onClick={() => this.setState({ error: null })}>
          Reintentar
        </button>
      </div>
    );
  }
}
