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
  useRetakeAssessmentCreateMutation,
  useRetakeAssessmentListQuery,
  useRetakeAssessmentUpdateMutation,
} from '../../../redux/services/retakeAssessmentService';

const CreateUpdateRetakeAssessment = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    subject: '',
    instructor: '',
    assessmentType: '',
    reason: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allRetakeAssessment } = useRetakeAssessmentListQuery();
  const [retakeAssessmentCreate, { isLoading: createLoading, isSuccess: createSuccess }] =
    useRetakeAssessmentCreateMutation();
  const [retakeAssessmentUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useRetakeAssessmentUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allRetakeAssessment) {
      setDetails(allRetakeAssessment?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allRetakeAssessment]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        subject: yup.string().required(t('subject is required')),
        instructor: yup.string().required(t('instructor is required')),
        assessmentType: yup.string().required(t('assessment type is required')),
        reason: yup.string().required(t('reason is required')),
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
  const submitForm = ({ subject, instructor, assessmentType, reason }) => {
    const postBody = {
      subject,
      instructor,
      assessmentType,
      reason,
    };
    if (!objectID) {
      retakeAssessmentCreate(postBody);
    } else {
      retakeAssessmentUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/retake-assessment');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update retake assessment' : 'save retake assessment'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
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
                              placeholder={t('subject of the retake assessment')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="instructor">
                        <Form.Label>{t('instructor')}</Form.Label>
                        <Controller
                          control={control}
                          name="instructor"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.instructor}
                              placeholder={t('instructor of the retake assessment')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.instructor && <Form.Text className="text-danger">{errors.instructor.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="assessmentType">
                        <Form.Label>{t('assessment type')}</Form.Label>

                        <Controller
                          control={control}
                          name="assessmentType"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('assessment type of the retake assessment')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice assessment')}</option>
                              <option value="QUIZ">{t('QUIZ')}</option>
                              <option value="MID_TERM">{t('MID_TERM')}</option>
                              <option value="FINAL">{t('FINAL')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.assessmentType && (
                          <Form.Text className="text-danger">{errors.assessmentType.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="reason">
                        <Form.Label>{t('reason')}</Form.Label>
                        <Controller
                          control={control}
                          name="reason"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.reason}
                              placeholder={t('reason registration of the retake assessment')}
                              as="textarea"
                              size="sm"
                            />
                          )}
                        />
                        {errors.reason && <Form.Text className="text-danger">{errors.reason.message}</Form.Text>}
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

export default CreateUpdateRetakeAssessment;
