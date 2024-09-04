import { createContext } from 'react'
import { createContextualCan } from '@casl/react'
import { PureAbility } from '@casl/ability'

// Define las acciones y sujetos de tu aplicación
type Actions = 'create' | 'read' | 'update' | 'delete'
type Subjects = 'Article' | 'User' | 'all'

// Define la habilidad específica para tu aplicación
type AppAbility = PureAbility<[Actions, Subjects]>

// Inicializar el contexto con `undefined` en lugar de `null`
export const AbilityContext = createContext<AppAbility | undefined>(undefined)

export const Can = createContextualCan(AbilityContext.Consumer as React.Consumer<AppAbility>)
