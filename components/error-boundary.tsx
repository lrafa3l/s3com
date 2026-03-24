"use client"

import React, { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Reusable error boundary for production resilience.
 * Catches JavaScript errors in child component tree and displays a fallback UI.
 * In Next.js 16 App Router, this complements the error.tsx convention for client-side errors.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development, could be sent to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Allow custom fallback UI via props
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-2 text-lg font-semibold text-destructive">
            Algo deu errado
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
