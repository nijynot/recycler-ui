import { Modal as BootstrapModal } from 'react-bootstrap';
import type { ModalProps as BootstrapModalProps } from 'react-bootstrap';

type ModalProps = {
  children: JSX.Element;
} & BootstrapModalProps;

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <BootstrapModal
      animation={false}
      style={{ marginTop: 128 }}
      {...props}
    >
      {children}
    </BootstrapModal>
  );
}
