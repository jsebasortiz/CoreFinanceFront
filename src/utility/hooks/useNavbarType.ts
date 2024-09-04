// ** Store Imports
import { handleNavbarType } from '@store/layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/store' // Asegúrate de tener RootState definido

export const useNavbarType = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout) // Tipamos el estado global usando RootState

  const setNavbarType = (type: string) => {
    dispatch(handleNavbarType(type)) // Tipo string para 'type'
  }

  return { navbarType: store.navbarType, setNavbarType }
}
