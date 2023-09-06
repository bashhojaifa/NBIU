//External Lib Import
import { Tab, Tabs } from 'react-bootstrap';
import { Row, Col, Container, Button, Card, Spinner, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import Layout from '../../../layout/Layout';
import Session from './Session';
import Courses from './Courses';
import EnrollList from './EnrollList';

const ElectiveCourses = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="courses" className="mb-3">
              <Tab eventKey="courses" title={t('courses')}>
                <Courses />
              </Tab>
              <Tab eventKey="session" title={t('session')}>
                <Session />
              </Tab>
              <Tab eventKey="enroll students" title={t('enroll students')}>
                <EnrollList />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default ElectiveCourses;
