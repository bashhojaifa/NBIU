//External Lib Import
import { Tab, Tabs } from 'react-bootstrap';
import { Row, Col, Container, Button, Card, Spinner, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import Layout from '../../../layout/Layout';
import AvailableCourses from './AvailableCourses';
import MyCourses from './MyCourses';

const ElectiveCoursesStudent = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="myCourses" className="mb-3">
              <Tab eventKey="myCourses" title={t('my courses')}>
                <MyCourses />
              </Tab>
              <Tab eventKey="availableCourses" title={t('Available courses')}>
                <AvailableCourses />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default ElectiveCoursesStudent;
