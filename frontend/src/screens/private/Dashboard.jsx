//External lib imports
import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';

//Internal lib imports
import Layout from '../../layout/Layout';
import MainDashboard from './MainDashboard';
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: profileDetails } = useProfileDetailsQuery();

  return profileDetails?.data?.role === 'ADMIN' ? (
    <MainDashboard />
  ) : (
    <Layout>
      <Container>
        <Row>
          <Card>
            <Card.Body>
              <h3>{t('Welcome to D-Space')}</h3>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
