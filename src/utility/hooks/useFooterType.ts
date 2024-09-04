// ** Store Imports
import { handleFooterType } from '@store/layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/store' // Asegúrate de que RootState esté definido

export const useFooterType = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setFooterType = (type: string) => {
    dispatch(handleFooterType(type)) // Tipo string para 'type'
  }

  return { setFooterType, footerType: store.footerType }
}
