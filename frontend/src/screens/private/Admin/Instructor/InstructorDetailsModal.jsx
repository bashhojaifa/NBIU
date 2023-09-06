//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const InstructorDetailsModal = ({ show, handleClose, singleInstructor }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('mobile')}: {singleInstructor.mobile}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('name')}: {singleInstructor.name}{' '}
        </p>
        <p>
          {t('email')}: {singleInstructor.email}{' '}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstructorDetailsModal;
