import { useEffect, useState, createContext, ReactNode } from 'react'

// ** Definir la estructura del objeto de colores
interface ColorShades {
  light: string
  main: string
}

interface ThemeColorsType {
  primary: ColorShades
  secondary: ColorShades
  success: ColorShades
  danger: ColorShades
  warning: ColorShades
  info: ColorShades
  dark: ColorShades
}

// ** El contexto espera un objeto con colores
interface ThemeColorsContextProps {
  colors: ThemeColorsType
}

// ** Crear el contexto y definir un valor por defecto (colores vacíos)
const ThemeColors = createContext<ThemeColorsContextProps | undefined>(undefined)

// ** Valores por defecto para los colores
const defaultColors: ThemeColorsType = {
  primary: { light: '', main: '' },
  secondary: { light: '', main: '' },
  success: { light: '', main: '' },
  danger: { light: '', main: '' },
  warning: { light: '', main: '' },
  info: { light: '', main: '' },
  dark: { light: '', main: '' }
}

interface ThemeContextProviderProps {
  children: ReactNode
}

const ThemeContext = ({ children }: ThemeContextProviderProps): JSX.Element => {
  // ** Estado inicializado con valores predeterminados
  const [colors, setColors] = useState<ThemeColorsType>(defaultColors)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ** Obtener los valores CSS personalizados
      const getHex = (color: string): string => window.getComputedStyle(document.body).getPropertyValue(color).trim()

      // ** Crear el objeto con los colores
      const obj: ThemeColorsType = {
        primary: {
          light: getHex('--bs-primary').concat('1a'),
          main: getHex('--bs-primary')
        },
        secondary: {
          light: getHex('--bs-secondary').concat('1a'),
          main: getHex('--bs-secondary')
        },
        success: {
          light: getHex('--bs-success').concat('1a'),
          main: getHex('--bs-success')
        },
        danger: {
          light: getHex('--bs-danger').concat('1a'),
          main: getHex('--bs-danger')
        },
        warning: {
          light: getHex('--bs-warning').concat('1a'),
          main: getHex('--bs-warning')
        },
        info: {
          light: getHex('--bs-info').concat('1a'),
          main: getHex('--bs-info')
        },
        dark: {
          light: getHex('--bs-dark').concat('1a'),
          main: getHex('--bs-dark')
        }
      }

      setColors({ ...obj })
    }
  }, [])

  return <ThemeColors.Provider value={{ colors }}>{children}</ThemeColors.Provider>
}

export { ThemeColors, ThemeContext }
