import Modal from './Modal'

// Thin wrapper to preserve existing API while reusing Modal implementation
export default function ModalCustomTitle(props) {
    return <Modal {...props} />
}
