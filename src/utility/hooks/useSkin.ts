import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSkin } from '@store/layout'
import { RootState } from '@src/redux/store' // Importamos RootState

type SkinType = 'light' | 'dark' | 'bordered' | 'semi-dark'

export const useSkin = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout) // Usa RootState para tipar el estado

  const setSkin = (type: SkinType) => {
    dispatch(handleSkin(type))
  }

  useEffect(() => {
    const element = window.document.body

    const classNames: Record<SkinType, string> = {
      light: '',
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout'
    }

    element.classList.remove(...element.classList)

    if (store.skin !== 'light') {
      element.classList.add(classNames[store.skin as SkinType])
    }
  }, [store.skin])

  return { skin: store.skin, setSkin }
}
