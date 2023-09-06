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
  useSubjectRepetitionCreateMutation,
  useSubjectRepetitionListQuery,
  useSubjectRepetitionUpdateMutation,
} from '../../../redux/services/subjectRepetitionService';

const CreateUpdateSubjectRepetition = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    studentName: '',
    rollNo: '',
    session: '',
    sessionRegistration: '',
    sessionCGPA: '',
    subject: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allSubjectRepetition } = useSubjectRepetitionListQuery();
  const [subjectRepetitionCreate, { isLoading: createLoading, isSuccess: createSuccess }] =
    useSubjectRepetitionCreateMutation();
  const [subjectRepetitionUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useSubjectRepetitionUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allSubjectRepetition) {
      setDetails(allSubjectRepetition?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allSubjectRepetition]);

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
        studentName: yup.string().required(t('student name is required')),
        rollNo: yup.string().required(t('roll no name is required')),
        session: yup.string().required(t('session is required')),
        sessionRegistration: yup.string().required(t('session registration is required')),
        sessionCGPA: yup.string().required(t('session CGPA is required')),
        subject: yup.string().required(t('subject is required')),
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
  const submitForm = ({ studentName, rollNo, session, sessionRegistration, sessionCGPA }) => {
    const postBody = {
      studentName,
      rollNo,
      session,
      sessionRegistration,
      sessionCGPA,
    };
    if (!objectID) {
      subjectRepetitionCreate(postBody);
    } else {
      subjectRepetitionUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/subject-repetition');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update subject repetition' : 'save subject repetition'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="studentName">
                        <Form.Label>{t('student name')}</Form.Label>
                        <Controller
                          control={control}
                          name="studentName"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.studentName}
                              placeholder={t('student name of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.studentName && <Form.Text className="text-danger">{errors.studentName.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="rollNo">
                        <Form.Label>{t('roll no')}</Form.Label>
                        <Controller
                          control={control}
                          name="rollNo"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.rollNo}
                              placeholder={t('roll no of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.rollNo && <Form.Text className="text-danger">{errors.rollNo.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="subject">
                        <Form.Label>{t('subject')}</Form.Label>
                        <Controller
                          control={control}
                          name="subject"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.subject}
                              placeholder={t('subject of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="session">
                        <Form.Label>{t('session')}</Form.Label>
                        <Controller
                          control={control}
                          name="session"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.session}
                              placeholder={t('session of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.session && <Form.Text className="text-danger">{errors.session.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="sessionRegistration">
                        <Form.Label>{t('session registration')}</Form.Label>
                        <Controller
                          control={control}
                          name="sessionRegistration"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.sessionRegistration}
                              placeholder={t('session registration of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.sessionRegistration && (
                          <Form.Text className="text-danger">{errors.sessionRegistration.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="sessionCGPA">
                        <Form.Label>{t('session CGPA')}</Form.Label>
                        <Controller
                          control={control}
                          name="sessionCGPA"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.sessionCGPA}
                              placeholder={t('session CGPA registration of the subject repetition')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.sessionCGPA && <Form.Text className="text-danger">{errors.sessionCGPA.message}</Form.Text>}
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

export default CreateUpdateSubjectRepetition;
