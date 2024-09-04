// ** React Imports
import { Suspense, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from './../../../utility/Utils'

// ** Tipos de Props
interface PublicRouteProps {
  children: ReactNode
  route?: {
    meta?: {
      restricted?: boolean
    }
  }
}

const PublicRoute = ({ children, route }: PublicRouteProps) => {
  if (route) {
    const user = getUserData()

    const restrictedRoute = route.meta?.restricted || false

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
