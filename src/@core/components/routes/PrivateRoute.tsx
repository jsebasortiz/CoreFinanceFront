// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense, ReactNode } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'

// ** Definición de tipos para acciones y sujetos
type Actions = 'create' | 'read' | 'update' | 'delete'
type Subjects = 'Article' | 'User' | 'all' // Asegúrate de que estos tipos reflejen los recursos reales de tu aplicación.

interface RouteMeta {
  action?: Actions
  resource?: Subjects // Aquí el tipo debe coincidir con Subjects
  restricted?: boolean
}

interface Route {
  meta?: RouteMeta
}

interface PrivateRouteProps {
  children: ReactNode
  route?: Route
}

const PrivateRoute = ({ children, route }: PrivateRouteProps) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const user = JSON.parse(localStorage.getItem('userData') || 'null')

  if (route) {
    let action: Actions | undefined = route.meta?.action
    let resource: Subjects | undefined = route.meta?.resource
    let restrictedRoute = route.meta?.restricted ?? false

    // Si el usuario no está autenticado, redirige al login
    if (!user) {
      return <Navigate to='/login' />
    }

    // Si la ruta está restringida, pero el usuario está autenticado
    if (user && restrictedRoute) {
      return <Navigate to='/' />
    }

    // Si el usuario es cliente y la ruta está restringida
    if (user && restrictedRoute && user.role === 'client') {
      return <Navigate to='/access-control' />
    }

    // Si el usuario no tiene permiso para la acción en el recurso especificado
    if (user && action && resource && !ability?.can(action, resource)) {
      return <Navigate to='/misc/not-authorized' replace />
    }
  }

  // Renderiza los componentes hijos si se cumplen las condiciones anteriores
  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
