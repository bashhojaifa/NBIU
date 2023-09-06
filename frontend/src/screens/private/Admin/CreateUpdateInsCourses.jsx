//External lib imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Internal lib imports
import Layout from '../../../layout/Layout';
import {
  useInsCoursesCreateMutation,
  useInsCoursesListQuery,
  useInsCoursesUpdateMutation,
} from '../../../redux/services/inccoursesService';
import { formatDate } from '../../../utils/DateFormatter';

const CreateUpdateInsCourses = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    insCoursesCode: '',
    insCoursesName: '',
    InsCoursesInstructor: '',
    coursesSession: '',
    coursesProgram: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allInsCourses } = useInsCoursesListQuery();
  const [InsCoursesCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useInsCoursesCreateMutation();
  const [InsCoursesUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useInsCoursesUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allInsCourses) {
      allInsCourses?.data && setDetails(allInsCourses?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allInsCourses]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        insCoursesCode: yup.string().required(t('Ins Coursesname is required')),
        insCoursesName: yup.string().required(t('Ins Coursesname is required')),
        coursesSession: yup.string().required(t('Ins coursesSession is required')),
        coursesProgram: yup.string().required(t('Ins coursesProgram is required')),
        InsCoursesInstructor: yup.string().required(t('InsInsCoursesinstructor is required')),
      })
    ),
  });

  useEffect(() => {
    if (details) {
      reset(details);
    }
  }, [details]);

  /*
   * form handle submit
   */
  const submitForm = ({ insCoursesCode, insCoursesName, InsCoursesInstructor, coursesSession, coursesProgram }) => {
    const postBody = {
      coursesCode: insCoursesCode,
      coursesName: insCoursesName,
      coursesInstructor: InsCoursesInstructor,
      coursesSession,
      coursesProgram,
    };
    if (!objectID) {
      InsCoursesCreate(postBody);
    } else {
      InsCoursesUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/inscourses');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update InsCourses' : 'save InsCourses'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="insCoursesCode">
                        <Form.Label>{t('InsinsCoursescode')}</Form.Label>
                        <Controller
                          control={control}
                          name="insCoursesCode"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.insCoursesCode}
                              placeholder={t('InsinsCoursescode of the InsCourses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.insCoursesCode && (
                          <Form.Text className="text-danger">{errors.insCoursesCode.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="insCoursesName">
                        <Form.Label>{t('InsinsCoursesname')}</Form.Label>
                        <Controller
                          control={control}
                          name="insCoursesName"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.insCoursesName}
                              placeholder={t('InsinsCoursesname of the InsCourses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.insCoursesName && (
                          <Form.Text className="text-danger">{errors.insCoursesName.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="InsCoursesInstructor">
                        <Form.Label>{t('InsInsCoursesinstructor')}</Form.Label>
                        <Controller
                          control={control}
                          name="InsCoursesInstructor"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.InsCoursesInstructor}
                              placeholder={t('InsInsCoursesinstructor of the InsCourses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.InsCoursesInstructor && (
                          <Form.Text className="text-danger">{errors.InsCoursesInstructor.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesSession">
                        <Form.Label>{t('courses session')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesSession"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.coursesSession}
                              placeholder={t('seats limit of the InsCourses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.coursesSession && (
                          <Form.Text className="text-danger">{errors.coursesSession.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesProgram">
                        <Form.Label>{t('courses program')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesProgram"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.coursesProgram}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.coursesProgram && (
                          <Form.Text className="text-danger">{errors.coursesProgram.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <Button size="sm" className="mt-2" type="submit">
                        {createLoading || updateLoading ? <Spinner size="sm" color="light" /> : t('save change')}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default CreateUpdateInsCourses;
