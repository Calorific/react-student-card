import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'

function ConfirmModal({ isCreating, isValid, text, onClose }) {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onClose()
  }
  const handleShow = () => setShow(true)
  return (
      <>
        <button
            type="button"
            className="btn btn-primary mx-1"
            disabled={!isValid}
            onClick={handleShow}
        >
          {isCreating ? 'Создать' : 'Обновить'}
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>{text}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

ConfirmModal.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ConfirmModal