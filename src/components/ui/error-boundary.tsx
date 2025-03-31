import React, { Component, ErrorInfo } from 'react';
import { Button } from './button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Ops! Algo deu errado</h1>
            <p className="text-gray-600">
              Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando na solução.
            </p>
            {this.state.error && (
              <pre className="mt-4 p-4 bg-gray-100 rounded-md text-sm text-left overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="mt-6">
              <Button onClick={this.handleReload}>
                Recarregar página
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 