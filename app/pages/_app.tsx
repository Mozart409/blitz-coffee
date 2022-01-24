import {
  useSession,
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"
import PlausibleProvider from "next-plausible"

import "app/core/styles/index.css"
import { Suspense } from "react"

import * as LogRocket from "integrations/logrocket"
import React from "react"

LogRocket.init()

export default function App({ Component, pageProps }: AppProps) {
  const session = useSession({
    suspense: false,
  })

  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  React.useEffect(() => {
    if (session.userId) {
      LogRocket.identify(session.userId.toString())
    }
  }, [session])

  return (
    <div className="min-h-full">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <PlausibleProvider domain="consumption.coffee">
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <div>{getLayout(<Component {...pageProps} />)}</div>
          </ErrorBoundary>
        </Suspense>
      </PlausibleProvider>
    </div>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
