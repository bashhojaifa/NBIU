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
import { useLeaveCreateMutation, useLeaveListQuery, useLeaveUpdateMutation } from '../../../redux/services/leaveService';
import { formatDate } from '../../../utils/DateFormatter';

const CreateUpdateLeave = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date().setDate(new Date().getDate() + 1)),
    duration: 1,
    subject: '',
    reason: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allLeave } = useLeaveListQuery();
  const [leaveCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useLeaveCreateMutation();
  const [leaveUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useLeaveUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allLeave) {
      setDetails(allLeave?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allLeave]);

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
        startDate: yup.date().required(t('start date is required')),
        endDate: yup
          .date()
          .required(t('end date is required'))
          .min(yup.ref('startDate'), t("end date can't be before start date")),
        duration: yup.number().required(t('duration date is required')).min(1, t('duration min 1')),
        subject: yup.string().required(t('subject is required')),
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
  const submitForm = ({ startDate, endDate, duration, subject, reason }) => {
    const postBody = {
      startDate,
      endDate,
      duration,
      subject,
      reason,
    };
    if (!objectID) {
      leaveCreate(postBody);
    } else {
      leaveUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/leave');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update leave' : 'save leave'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>{t('start date')}</Form.Label>
                        <Controller
                          control={control}
                          name="startDate"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.startDate}
                              type="date"
                              size="sm"
                            />
                          )}
                        />
                        {errors.startDate && <Form.Text className="text-danger">{errors.startDate.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>{t('end date')}</Form.Label>
                        <Controller
                          control={control}
                          name="endDate"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.endDate}
                              type="date"
                              size="sm"
                            />
                          )}
                        />
                        {errors.endDate && <Form.Text className="text-danger">{errors.endDate.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="duration">
                        <Form.Label>{t('duration')}</Form.Label>
                        <Controller
                          control={control}
                          name="duration"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.duration}
                              placeholder={t('duration of the Leave')}
                              type="number"
                              min="1"
                              size="sm"
                            />
                          )}
                        />
                        {errors.duration && <Form.Text className="text-danger">{errors.duration.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
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
                              placeholder={t('subject of the leave')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
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
                              placeholder={t('reason of the leave')}
                              type="text"
                              size="sm"
                              as={'textarea'}
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

export default CreateUpdateLeave;
