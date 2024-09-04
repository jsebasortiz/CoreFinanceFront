// ** Store Imports
import { handleNavbarColor } from '@store/layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/store'

export const useNavbarColor = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setNavbarColor = (value: string) => {
    dispatch(handleNavbarColor(value)) // Se espera un string como valor del color
  }

  return { navbarColor: store.navbarColor, setNavbarColor }
}
