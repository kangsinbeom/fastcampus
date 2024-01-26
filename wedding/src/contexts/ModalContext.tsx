import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import Modal from '../components/shared/modal'

type ModalProps = ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (option: ModalOptions) => void
  close: () => void
}
const Context = createContext<ModalContextValue | undefined>(undefined)
const defaultValues: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues)
  const $portal_root = document.getElementById('root-portal')
  const open = useCallback((option: ModalOptions) => {
    setModalState({ ...option, open: true })
  }, [])
  const close = useCallback(() => {
    setModalState(defaultValues)
  }, [])
  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  )
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export const useModalContext = () => {
  const values = useContext(Context)
  if (values == null) {
    throw new Error('ModalContext 안에서 사용해주세요')
  }
  return values
}
export default ModalContext
