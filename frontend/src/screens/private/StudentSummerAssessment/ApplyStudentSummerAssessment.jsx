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
import { useSummerAssessmentListQuery } from '../../../redux/services/summerAssessmentService';
import { useProfileDetailsQuery } from '../../../redux/services/profileService';
import { useSummerAssessmentApplyMutation } from '../../../redux/services/summerAssessmentService';

const ApplyStudentSummerAssessment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: StudentSummerAssessments, isLoading } = useSummerAssessmentListQuery();
  const [summerAssessmentApply, { isLoading: updateLoading, isSuccess: updateSuccess }] = useSummerAssessmentApplyMutation();
  const { data: profileDetails } = useProfileDetailsQuery();

  const data = StudentSummerAssessments?.data || [];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {}, // session: profileDetails?.data?.session
    resolver: yupResolver(
      yup.object({
        coursesName: yup.string().required(t('courses name is required')),
        degree: yup.string().required(t('degree is required')),
        // session: yup.string().required(t('session is required')),
        currentSemester: yup.string().required(t('currentSemester is required')),
        motive: yup.string().required(t('motive is required')),
      })
    ),
  });

  /*
   * form handle submit
   */
  const submitForm = ({ coursesName, degree, currentSemester, motive }) => {
    const postBody = {
      coursesName,
      degree,
      currentSemester,
      motive,
      session: profileDetails?.data?.session,
    };

    summerAssessmentApply({
      id: coursesName.split('_')[1],
      enrolls: { ...postBody, coursesName: coursesName.split('_')[1], coursesNameI: coursesName.split('_')[0] },
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate('/summer-assessment-student');
    }
  }, [updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`apply summer assessments`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="coursesName">
                        <Form.Label>{t('courses name')}</Form.Label>
                        <Controller
                          control={control}
                          name="coursesName"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('courses name of the summer assessment')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice courses name')}</option>
                              {data?.map((i) => (
                                <option value={i.name + '_' + i.id}>{t(i.name)}</option>
                              ))}
                            </Form.Select>
                          )}
                        />
                        {errors.coursesName && <Form.Text className="text-danger">{errors.coursesName.message}</Form.Text>}
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="degree">
                        <Form.Label>{t('degree program')}</Form.Label>
                        <Controller
                          control={control}
                          name="degree"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('degree program of the summer assessment')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice degree program')}</option>
                              <option value="BSCS">{t('BSCS')}</option>
                              <option value="SE">{t('SE')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.degree && <Form.Text className="text-danger">{errors.degree.message}</Form.Text>}
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="currentSemester">
                        <Form.Label>{t('currentSemester')}</Form.Label>
                        <Controller
                          control={control}
                          name="currentSemester"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('current semester of the summer assessment')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice current semester')}</option>
                              <option value="1">{t('2')}</option>
                              <option value="2">{t('2')}</option>
                              <option value="3">{t('3')}</option>
                              <option value="4">{t('4')}</option>
                              <option value="5">{t('5')}</option>
                              <option value="6">{t('6')}</option>
                              <option value="7">{t('7')}</option>
                              <option value="8">{t('8')}</option>
                              <option value="9">{t('9')}</option>
                              <option value="10">{t('10')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.currentSemester && (
                          <Form.Text className="text-danger">{errors.currentSemester.message}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="motive">
                        <Form.Label>{t('motive')}</Form.Label>
                        <Controller
                          control={control}
                          name="motive"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('motive of the summer assessment')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice motive')}</option>
                              <option value="To improve">{t('To improve')}</option>
                              <option value="To pass">{t('To pass')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.motive && <Form.Text className="text-danger">{errors.motive.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <Button size="sm" className="mt-2" type="submit">
                        {updateLoading ? <Spinner size="sm" color="light" /> : t('save change')}
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

export default ApplyStudentSummerAssessment;
