//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SubjectRepetitionDetailsModal = ({ show, handleClose, singleSubjectRepetition }) => {
  console.log(singleSubjectRepetition);
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('id')}: {singleSubjectRepetition.studentID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('name')}: {singleSubjectRepetition.studentName}
        </p>
        <p>
          {t('session CGPA')}: {singleSubjectRepetition.sessionCGPA}
        </p>
        <p>
          {t('roll No')}: {singleSubjectRepetition.rollNo}
        </p>
        <p>
          {t('session')}: {singleSubjectRepetition.session}
        </p>
        <p>
          {t('session registration')}: {singleSubjectRepetition.sessionRegistration}
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

export default SubjectRepetitionDetailsModal;
