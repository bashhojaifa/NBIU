//External lib imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';

//Internal lib imports
import Layout from '../../../layout/Layout';
import {
  useCoursesCreateMutation,
  useCoursesListQuery,
  useCoursesUpdateMutation,
} from '../../../redux/services/coursesService';
import { formatDate } from '../../../utils/DateFormatter';
import { useSessionDropDownQuery } from '../../../redux/services/sessionService';

const CreateUpdateCourses = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    coursesCode: '',
    coursesName: '',
    coursesInstructor: '',
    seatsLimit: 0,
    registrationDeadline: formatDate(new Date()),
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allCourses } = useCoursesListQuery();
  const { data: Sessions, isLoading } = useSessionDropDownQuery();
  const [CoursesCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useCoursesCreateMutation();
  const [CoursesUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useCoursesUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allCourses) {
      setDetails(allCourses?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allCourses]);

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
        coursesCode: yup.string().required(t('courses name is required')),
        coursesName: yup.string().required(t('courses name is required')),
        coursesInstructor: yup.string().required(t('courses instructor is required')),
        seatsLimit: yup
          .number(t('seats limit is required'))
          .required(t('seats limit is required'))
          .min(1, 'seats limit must be greater than or equal to 1'),
        registrationDeadline: yup.date().required(t('courses registration deadline is required')),
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
  const submitForm = ({ coursesCode, coursesName, coursesInstructor, seatsLimit, registrationDeadline, allowSessions }) => {
    const postBody = {
      coursesCode,
      coursesName,
      coursesInstructor,
      seatsLimit,
      registrationDeadline,
      allowSessions,
    };

    if (!objectID) {
      CoursesCreate(postBody);
    } else {
      CoursesUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/elective-courses');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update courses' : 'save courses'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesCode">
                        <Form.Label>{t('courses code')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesCode"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.coursesCode}
                              placeholder={t('courses code of the courses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.coursesCode && <Form.Text className="text-danger">{errors.coursesCode.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesName">
                        <Form.Label>{t('courses name')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesName"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.coursesName}
                              placeholder={t('courses name of the courses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.coursesName && <Form.Text className="text-danger">{errors.coursesName.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesInstructor">
                        <Form.Label>{t('courses instructor')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesInstructor"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.coursesInstructor}
                              placeholder={t('courses instructor of the courses')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.coursesInstructor && (
                          <Form.Text className="text-danger">{errors.coursesInstructor.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="seatsLimit">
                        <Form.Label>{t('seats limit')}</Form.Label>
                        <Controller
                          control={control}
                          name="seatsLimit"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.seatsLimit}
                              placeholder={t('seats limit of the courses')}
                              type="number"
                              size="sm"
                            />
                          )}
                        />
                        {errors.seatsLimit && <Form.Text className="text-danger">{errors.seatsLimit.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="registrationDeadline">
                        <Form.Label>{t('registration deadline')}</Form.Label>
                        <Controller
                          control={control}
                          name="registrationDeadline"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.registrationDeadline}
                              type="date"
                              size="sm"
                            />
                          )}
                        />
                        {errors.registrationDeadline && (
                          <Form.Text className="text-danger">{errors.registrationDeadline.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="allowSessions">
                        <Form.Label>{t('allow sessions')}</Form.Label>
                        <Controller
                          control={control}
                          name="allowSessions"
                          defaultValue={Sessions?.data.map((c) => c.value)}
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select
                              inputRef={ref}
                              //value={Sessions?.data?.filter((c) => value.includes(c.value))}
                              onChange={(val) => onChange(val.map((c) => c.label))}
                              isMulti
                              options={Sessions?.data}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                          )}
                        />
                        {errors.allowSessions && (
                          <Form.Text className="text-danger">{errors.allowSessions.message}</Form.Text>
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

export default CreateUpdateCourses;
