//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SessionDetailsModal = ({ show, handleClose, singleSession }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('session name')}: {singleSession.sessionName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('session year')}: {singleSession.sessionYear}
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

export default SessionDetailsModal;
