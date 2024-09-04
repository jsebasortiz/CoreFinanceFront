import { Fragment, useState, forwardRef } from 'react'
import classnames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import { InputGroup, Input, InputGroupText, Label } from 'reactstrap'

// ** Definir las props del componente
interface InputPasswordToggleProps {
  label?: string
  hideIcon?: React.ReactNode
  showIcon?: React.ReactNode
  visible?: boolean
  className?: string
  htmlFor?: string
  placeholder?: string
  iconSize?: number
  inputClassName?: string
  invalid?: boolean
  [key: string]: any // Permitir otros props adicionales
}

const InputPasswordToggle = forwardRef<Input, InputPasswordToggleProps>(
  (
    {
      label,
      hideIcon,
      showIcon,
      visible = false,
      className,
      htmlFor,
      placeholder,
      iconSize,
      inputClassName,
      invalid,
      ...rest
    },
    ref
  ) => {
    // ** Estado para manejar la visibilidad de la contraseña
    const [inputVisibility, setInputVisibility] = useState(visible)

    // ** Renderiza el ícono basado en la visibilidad de la contraseña
    const renderIcon = () => {
      const size = iconSize || 14
      return inputVisibility ? showIcon ? showIcon : <EyeOff size={size} /> : hideIcon ? hideIcon : <Eye size={size} />
    }

    return (
      <Fragment>
        {label && (
          <Label className='form-label' for={htmlFor}>
            {label}
          </Label>
        )}
        <InputGroup
          className={classnames({
            [className ?? '']: className,
            'is-invalid': invalid
          })}
        >
          <Input
            ref={ref}
            invalid={invalid}
            type={inputVisibility ? 'text' : 'password'}
            placeholder={placeholder || '············'}
            className={classnames({
              [inputClassName ?? '']: inputClassName
            })}
            id={htmlFor}
            {...rest}
          />
          <InputGroupText className='cursor-pointer' onClick={() => setInputVisibility(!inputVisibility)}>
            {renderIcon()}
          </InputGroupText>
        </InputGroup>
      </Fragment>
    )
  }
)

export default InputPasswordToggle
