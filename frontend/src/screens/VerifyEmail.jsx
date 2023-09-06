//External lib imports
import { useEffect } from 'react';
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactCodeInput from 'react-code-input';

//Internal lib imports
import { useVerifyEmailMutation } from '../redux/services/authService';
import PublicLayout from '../layout/PublicLayout';
import SessionHelper from '../helpers/SessionHelper';

const VerifyEmail = () => {
  const [verifyEmail, { isLoading, isSuccess }] = useVerifyEmailMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.authReducer);

  const {
    setValue,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: SessionHelper.GetRecoverVerifyEmail(),
      otp: '',
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required(t('email number is required')).email(t('invalid email address')),
        otp: yup
          .string()
          .required(t('otp is required.'))
          .min(6, t('otp must be 6 digits'))
          .max(6, t('otp must be 6 digits')),
      })
    ),
  });

  const defaultInputStyle = {
    fontFamily: 'monospace',
    MozAppearance: 'textfield',
    margin: '4px',
    paddingLeft: '8px',
    width: '90px',
    borderRadius: '3px',
    height: '45px',
    fontSize: '32px',
    border: '1px solid lightskyblue',
    boxSizing: 'border-box',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    outline: 0,
  };

  /*
   * form handle submit
   */
  const submitForm = (values) => {
    SessionHelper.SetRecoverVerifyOTP(values.otp);
    verifyEmail(values);
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  useEffect(() => {
    if (!SessionHelper.GetRecoverVerifyEmail()) {
      navigate('/forgot-password');
    }
  }, [SessionHelper.GetRecoverVerifyEmail()]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/reset-password');
    }
  }, [isSuccess]);

  return (
    <PublicLayout>
      <div className="auth-wrapper mt-5">
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-content">
              <Row className="justify-content-center">
                <Col xl={8} className="center-screen">
                  <Card className="w-100">
                    <Card.Body>
                      <h4>OTP VERIFICATION </h4>
                      <br />
                      <p>A 6 Digit verification code has been sent to your email address. </p>
                      <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                        <Form.Group className="mb-3" controlId="otp">
                          <ReactCodeInput
                            inputStyle={defaultInputStyle}
                            fields={6}
                            type="text"
                            isInvalid={errors.otp}
                            placeholder="otp"
                            {...register('otp')}
                            onChange={(value) => setValue('otp', value, { shouldValidate: true })}
                          />
                          <br />
                          {errors.otp && <Form.Text className="text-danger">{errors.otp.message}</Form.Text>}
                        </Form.Group>

                        <div className="d-grid">
                          <button className="btn btn-primary btn-block login-btn mt-2" type="submit">
                            {isLoading ? <Spinner size="sm" color="light" /> : t('Sign in')}
                          </button>
                        </div>
                      </Form>
                      <div className="text-center w-100 mt-3">
                        <Link className="text-center animated fadeInUp" to="/register">
                          Sign Up
                        </Link>
                        <br />
                        <Link className="text-center animated fadeInUp" to="/forgot-password">
                          Forget Password
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default VerifyEmail;
