//External lib imports
import React from 'react';

//Internal lib imports
import Layout from '../../layout/Layout';
import { useDashboardSummaryQuery } from '../../redux/services/dashboardService';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import StatusChart from '../../components/StatusChart';
import { useLeaveListQuery } from '../../redux/services/leaveService';
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import { useSubjectRepetitionListQuery } from '../../redux/services/subjectRepetitionService';

import { useRetakeAssessmentListQuery } from '../../redux/services/retakeAssessmentService';
import { useScholarshipListQuery } from '../../redux/services/scholarshipService';
import { useOthersListQuery } from '../../redux/services/othersService';
import { useStudentListQuery } from '../../redux/services/profileService';
import { useCoursesListQuery } from '../../redux/services/coursesService';
import { useSessionListQuery } from '../../redux/services/sessionService';
import { useInstructorListQuery } from '../../redux/services/instructorService';

const MainDashboard = () => {
  const { data: Leaves, isLoading } = useLeaveListQuery();
  const { data: SubjectRepetitions } = useSubjectRepetitionListQuery();
  const { data: RetakeAssessments } = useRetakeAssessmentListQuery();
  const { data: Scholarships } = useScholarshipListQuery();
  const { data: Otherss } = useOthersListQuery();
  const { data: students } = useStudentListQuery();
  const { data: electiveCourses } = useCoursesListQuery();
  const { data: Sessions } = useSessionListQuery();
  const { data: Instructors } = useInstructorListQuery();

  // const { data, isLoading } = useDashboardSummaryQuery();
  const { t } = useTranslation();

  const { data: profileDetails } = useProfileDetailsQuery();

  // const dashboardSummary = data?.data || [];

  let content = '';

  if (isLoading) {
    content = (
      <Card>
        <Card.Body>
          <Col sm={4}>
            <Spinner size="lg" variant="primary" />
          </Col>
        </Card.Body>
      </Card>
    );
  } else {
    content = (
      <>
        <Col sm={4} className="my-2">
          <Card style={{ background: '#21114D' }}>
            <Card.Body>
              <span class="h5" style={{ color: '#fff' }}>
                <span>{Leaves?.data?.length}</span>
              </span>
              <p style={{ color: '#fff' }}>{t('total leave')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-primary">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{SubjectRepetitions?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total subject repetition')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-warning">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{RetakeAssessments?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total retake assessment')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-primary">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{Scholarships?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total scholarship')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-info">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{Otherss?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total others')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card style={{ background: '#21114D' }}>
            <Card.Body>
              <span class="h5" style={{ color: '#fff' }}>
                <span>{students?.length}</span>
              </span>
              <p style={{ color: '#fff' }}>{t('total students')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-warning">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{electiveCourses?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total elective courses')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-primary">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{Sessions?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total session')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="my-2">
          <Card className="bg-info">
            <Card.Body>
              <span class="h5" style={{ color: 'black' }}>
                <span>{Instructors?.data?.length}</span>
              </span>
              <p style={{ color: 'black' }}>{t('total instructor')}</p>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  }

  return (
    <Layout>
      <Container>
        <Row>{content}</Row>
      </Container>
    </Layout>
  );
};

export default MainDashboard;
