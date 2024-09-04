// ** Router imports
import { useRoutes } from 'react-router-dom';


// ** GetRoutes
import { getRoutes } from './routes/index.js'

// ** Hooks Imports
import { useLayout } from '@src/utility/hooks/useLayout'

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  // ** Get all routes
  const allRoutes = getRoutes(layout)

  // ** Apply routes using useRoutes hook
  const routes = useRoutes([...allRoutes])

  return routes
}

export default Router
