//External lib imports
import { useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

//Internal lib imports
import Layout from '../../../layout/Layout';

import Table from '../../../components/Table/Table';
import AleartMessage from '../../../helpers/AleartMessage';
import DateFormatter from '../../../utils/DateFormatter';
import Upload from '../../../components/Upload';
import {
  useInsCoursesDeleteMutation,
  useInsCoursesHistoryDeleteMutation,
  useInsCoursesListQuery,
  useInsCoursesUpdateMutation,
} from '../../../redux/services/inccoursesService';
import CreateUpdateFolder from './CreateUpdateFolder';

const CourseDetails = () => {
  const { t } = useTranslation();
  const { data: InsCoursess, isLoading } = useInsCoursesListQuery();
  const [insCoursesHistoryDelete] = useInsCoursesHistoryDeleteMutation();

  const data = InsCoursess?.data || [];

  const { id } = useParams();
  const course = data.find((item) => item.id === id);

  const [modalShow, setModalShow] = useState(false);
  const [folderCreateUpdateModalShow, setFolderCreateUpdateModalSHow] = useState(false);
  const [createFlag, setCreateFlag] = useState(true);

  const deleteItem = (hid) => {
    AleartMessage.DeleteHistory(id, hid, insCoursesHistoryDelete);
  };

  const columns = [
    {
      Header: t('Folder Name'),
      accessor: (data) => <span className="ms-1"> {data.title}</span>,
      sort: true,
    },
    {
      Header: t('created at'),
      accessor: (d) => <span className="ms-1"> {DateFormatter(d.createdAt)}</span>,
      sort: true,
    },
    {
      Header: t('action'),
      accessor: (d) => (
        <div className="bodySmall">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('view')}</Tooltip>}
          >
            <Link to={`/course-folder/${id}/${d.id}`}>
              <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1">
                <AiOutlineFolderView />
              </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('delete')}</Tooltip>}
          >
            <Button variant="danger" style={{ padding: '5px 10px' }} onClick={() => deleteItem(d.id)}>
              <BsTrash />
            </Button>
          </OverlayTrigger>
        </div>
      ),
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
                <h5>{t('courses')}</h5>
                <div>
                  <Button size="sm" variant="primary" onClick={() => setFolderCreateUpdateModalSHow(true)}>
                    {t('create Folder')}
                  </Button>
                </div>
              </Col>
              <Col sm={12}>
                {isLoading ? (
                  <Spinner size="lg" variant="primary" />
                ) : data?.length ? (
                  <Table
                    columns={columns}
                    data={course?.coursesHistory || []}
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

            <CreateUpdateFolder
              show={folderCreateUpdateModalShow}
              onHide={() => setFolderCreateUpdateModalSHow(false)}
              createFlag
              course={course}
            />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default CourseDetails;
