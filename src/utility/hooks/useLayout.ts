// ** React Imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleLayout, handleLastLayout } from '@store/layout'
import { RootState } from '@src/redux/store' // Importamos el estado global

export const useLayout = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setLayout = (value: string) => {
    dispatch(handleLayout(value)) // El layout se espera como un string
  }

  const setLastLayout = (value: string) => {
    dispatch(handleLastLayout(value))
  }

  if (typeof window !== 'undefined') {
    const breakpoint = 1200

    useEffect(() => {
      if (window.innerWidth < breakpoint) {
        setLayout('vertical')
      }

      const handleResize = () => {
        if (window.innerWidth <= breakpoint && store.lastLayout !== 'vertical' && store.layout !== 'vertical') {
          setLayout('vertical')
        }
        if (window.innerWidth >= breakpoint && store.lastLayout !== store.layout) {
          setLayout(store.lastLayout)
        }
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, [store.layout, store.lastLayout])
  }

  return { layout: store.layout, setLayout, lastLayout: store.lastLayout, setLastLayout }
}
