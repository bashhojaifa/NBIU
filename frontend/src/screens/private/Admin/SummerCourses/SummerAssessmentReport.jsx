//External lib imports
import { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr';

//Internal lib imports
import Layout from '../../../../layout/Layout';
import {
  useSummerAssessmentDeleteMutation,
  useSummerAssessmentListQuery,
  useSummerAssessmentUpdateMutation,
} from '../../../../redux/services/summerAssessmentService';
import Table from '../../../../components/Table/Table';
import AleartMessage from '../../../../helpers/AleartMessage';
import { useProfileDetailsQuery } from '../../../../redux/services/profileService';
import SubjectRepetitionDetailsModal from './SummerAssessmentDetailsModal';
import exportDataJson from '../../../../utils/exportDataJson';

const SummerAssessmentReport = () => {
  let [objectID, SetObjectID] = useState(null);
  const { t } = useTranslation();
  const [current, setCurrent] = useState([]);
  const { data: SummerAssessments, isLoading } = useSummerAssessmentListQuery();
  const data = SummerAssessments?.data || [];

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    setCurrent(data?.find((i) => i.id === objectID));
  }, [objectID, data]);

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('student id'),
      accessor: (d) => <span className="ms-1"> {d.studentID}</span>,
      sort: true,
    },
    {
      Header: t('degree'),
      accessor: (d) => <span className="ms-1"> {d.degree}</span>,
      sort: true,
    },
    {
      Header: t('session'),
      accessor: (d) => <span className="ms-1"> {d.session}</span>,
      sort: true,
    },
    {
      Header: t('motive'),
      accessor: (d) => <span className="ms-1"> {d.motive}</span>,
      sort: true,
    },
    {
      Header: t('currentSemester'),
      accessor: (d) => <span className="ms-1"> {d.currentSemester}</span>,
      sort: true,
    },
  ];

  const sizePerPageList = [
    {
      text: t('5'),
      value: 5,
    },
    {
      text: t('10'),
      value: 10,
    },
    {
      text: t('25'),
      value: 25,
    },
    {
      text: t('all'),
      value: data?.length,
    },
  ];

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex justify-content-between p-2" sm={12}>
                <h5>{t('summer assessment')}</h5>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => exportDataJson(current?.enrolls, 'summer-courses-report', 'csv')}
                >
                  {t('download report')}
                </Button>
              </Col>
              <Col sm={12}>
                {isLoading ? (
                  <Spinner size="lg" variant="primary" />
                ) : data?.length ? (
                  <Table
                    columns={columns}
                    data={current?.enrolls || []}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                  />
                ) : (
                  t('no data found')
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default SummerAssessmentReport;
