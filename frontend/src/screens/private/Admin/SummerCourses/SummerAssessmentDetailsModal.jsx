//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SummerAssessmentDetailsModal = ({ show, handleClose, singleRetakeAssessment }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('subject')}: {singleRetakeAssessment?.subject}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('instructor')}: {singleRetakeAssessment?.instructor}
        </p>{' '}
        <p>
          {t('assessment type')}: {singleRetakeAssessment?.assessmentType}
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

export default SummerAssessmentDetailsModal;
