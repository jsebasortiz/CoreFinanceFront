// ** React Imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/store'
import { handleRTL } from '@store/layout'

export const useRTL = (): [boolean, (value: boolean) => void] => {
  const dispatch = useDispatch()
  const isRtl = useSelector((state: RootState) => state.layout.isRTL)

  const setValue = (value: boolean) => {
    dispatch(handleRTL(value))
  }

  useEffect(() => {
    const element = document.getElementsByTagName('html')[0]

    if (isRtl) {
      element.setAttribute('dir', 'rtl')
    } else {
      element.setAttribute('dir', 'ltr')
    }
  }, [isRtl])

  return [isRtl, setValue]
}
