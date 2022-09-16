import React, { useEffect, useRef, useState } from 'react'
import { ModalDialog } from '@remix-ui/modal-dialog'
import { ModalDialogProps } from 'libs/remix-ui/modal-dialog/src/lib/types'
import { ModalTypes } from '../../types'

interface ModalWrapperProps extends ModalDialogProps {
    modalType?: ModalTypes
    defaultValue?: string
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const [state, setState] = useState<ModalDialogProps>()
  const ref = useRef()

  const onFinishPrompt = async () => {
    if (ref.current === undefined) {
      onOkFn()
    } else {
      // @ts-ignore: Object is possibly 'null'.
      (props.okFn) ? props.okFn(ref.current.value) : props.resolve(ref.current.value)
    }
  }

  const onOkFn = async () => {
    (props.okFn) ? props.okFn() : props.resolve(true)
  }

  const onCancelFn = async () => {
    (props.cancelFn) ? props.cancelFn() : props.resolve(false)
  }

  const createModalMessage = (defaultValue: string) => {
    return (
      <>
        {props.message}
        <input type={props.modalType === ModalTypes.password ? 'password' : 'text'} defaultValue={defaultValue} data-id="modalDialogCustomPromp" ref={ref} className="form-control" /></>
    )
  }

  useEffect(() => {
    if (props.modalType) {
      switch (props.modalType) {
        case ModalTypes.prompt:
        case ModalTypes.password:
          setState({
            ...props,
            okFn: onFinishPrompt,
            cancelFn: onCancelFn,
            message: createModalMessage(props.defaultValue)
          })
          break
        default:
          setState({
            ...props,
            okFn: (onOkFn),
            cancelFn: onCancelFn
          })
          break
      }
    } else {
      setState({
        ...props,
        okFn: onOkFn,
        cancelFn: onCancelFn
      })
    }
  }, [props])

  return (
    <ModalDialog id={props.id} {...state} handleHide={props.handleHide} />
  )
}
export default ModalWrapper
