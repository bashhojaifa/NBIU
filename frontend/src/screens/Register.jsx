//External lib imports
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useSelector } from "react-redux";

//Internal lib imports
import { useRegisterMutation } from "../redux/services/authService";
import PublicLayout from "../layout/PublicLayout";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { t } = useTranslation();
  const { accessToken } = useSelector((state) => state.authReducer);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      permanentAddress: "",
      currentAddress: "",
      department: "",
      batch: "",
      studentId: "",
      passingYear: "",
      cgpa: "",
      jobStatus: "",
      designation: "",
      jobLocation: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(t("name is required")),
        email: yup
          .string()
          .required(t("email number is required"))
          .email(t("invalid email address")),
        mobile: yup.string().required(t("mobile number is required")),
        // .min(11, t("mobile number must be 11 digits")),
        // .max(11, t("mobile number must be 11 digits")),

        permanentAddress: yup
          .string()
          .required(t("permanent address is required")),
        currentAddress: yup.string().required(t("current address is required")),
        department: yup.string().required(t("department is required")),
        batch: yup.number().required(t("batch is required")),
        studentId: yup.number().required(t("studentId is required")),
        passingYear: yup.number().required(t("passingYear is required")),
        cgpa: yup.number().required(t("cgpa is required")),

        jobStatus: yup.string().required(t("jobStatus is required")),
        designation: yup.string().required(t("designation is required")),
        jobLocation: yup.string().required(t("jobLocation is required")),
        password: yup
          .string()
          .required(t("password is required."))
          .min(8, t("password must be 8 digits long")),
        confirmPassword: yup
          .string()
          .required(t("confirm password is required"))
          .oneOf(
            [yup.ref("password"), null],
            t("password and confirm password must match")
          ),
      })
    ),
  });

  /*
   * form handle submit
   */
  const submitForm = (values) => {
    const { confirmPassword, ...others } = values;
    console.log(others);
    register(others);
  };

  useEffect(() => {
    if (isSuccess || accessToken) {
      navigate("/login");
    }
  }, [isSuccess, accessToken]);

  return (
    <PublicLayout>
      <div className="auth-wrapper pt-5 mt-5">
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-content">
              <Row className="justify-content-center">
                <Col xl={8} className="center-screen">
                  <Card className="w-100">
                    <Card.Body>
                      <h5>{t("sign up")}</h5>
                      <br />
                      <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>{t("name")}</Form.Label>
                          <Controller
                            control={control}
                            name="name"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.name}
                                placeholder={t("name")}
                                type="text"
                              />
                            )}
                          />
                          {errors.name && (
                            <Form.Text className="text-danger">
                              {errors.name.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>{t("email")}</Form.Label>
                          <Controller
                            control={control}
                            name="email"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.email}
                                placeholder={t("email")}
                                type="email"
                              />
                            )}
                          />
                          {errors.email && (
                            <Form.Text className="text-danger">
                              {errors.email.message}
                            </Form.Text>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mobile">
                          <Form.Label>{t("mobile")}</Form.Label>
                          <Controller
                            control={control}
                            name="mobile"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.mobile}
                                placeholder={t("mobile")}
                                type="text"
                              />
                            )}
                          />
                          {errors.mobile && (
                            <Form.Text className="text-danger">
                              {errors.mobile.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="permanentAddress"
                        >
                          <Form.Label>{t("permanentAddress")}</Form.Label>
                          <Controller
                            control={control}
                            name="permanentAddress"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.permanentAddress}
                                placeholder={t("permanentAddress")}
                                type="text"
                              />
                            )}
                          />
                          {errors.permanentAddress && (
                            <Form.Text className="text-danger">
                              {errors.permanentAddress.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="currentAddress">
                          <Form.Label>{t("currentAddress")}</Form.Label>
                          <Controller
                            control={control}
                            name="currentAddress"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.currentAddress}
                                placeholder={t("currentAddress")}
                                type="text"
                              />
                            )}
                          />
                          {errors.currentAddress && (
                            <Form.Text className="text-danger">
                              {errors.currentAddress.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="department">
                          <Form.Label>{t("department")}</Form.Label>
                          <Controller
                            control={control}
                            name="department"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.department}
                                placeholder={t("department")}
                                type="text"
                              />
                            )}
                          />
                          {errors.department && (
                            <Form.Text className="text-danger">
                              {errors.department.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="batch">
                          <Form.Label>{t("batch")}</Form.Label>
                          <Controller
                            control={control}
                            name="batch"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.batch}
                                placeholder={t("batch")}
                                type="number"
                              />
                            )}
                          />
                          {errors.batch && (
                            <Form.Text className="text-danger">
                              {errors.batch.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="studentId">
                          <Form.Label>{t("studentId")}</Form.Label>
                          <Controller
                            control={control}
                            name="studentId"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.studentId}
                                placeholder={t("studentId")}
                                type="number"
                              />
                            )}
                          />
                          {errors.studentId && (
                            <Form.Text className="text-danger">
                              {errors.studentId.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passingYear">
                          <Form.Label>{t("passingYear")}</Form.Label>
                          <Controller
                            control={control}
                            name="passingYear"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.passingYear}
                                placeholder={t("passingYear")}
                                type="number"
                              />
                            )}
                          />
                          {errors.passingYear && (
                            <Form.Text className="text-danger">
                              {errors.passingYear.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cgpa">
                          <Form.Label>{t("cgpa")}</Form.Label>
                          <Controller
                            control={control}
                            name="cgpa"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.cgpa}
                                placeholder={t("cgpa")}
                                type="number"
                              />
                            )}
                          />
                          {errors.cgpa && (
                            <Form.Text className="text-danger">
                              {errors.cgpa.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Col sm={12}>
                          <Form.Group className="mb-3" controlId="jobStatus">
                            <Form.Label>{t("jobStatus")}</Form.Label>

                            <Controller
                              control={control}
                              name="jobStatus"
                              render={({
                                field: { onChange, onBlur, value, ref },
                              }) => (
                                <Form.Select
                                  onChange={onChange}
                                  value={value}
                                  ref={ref}
                                  isInvalid={errors.jobStatus}
                                  placeholder={t("name of the jobStatus")}
                                  type="text"
                                  size="sm"
                                >
                                  <option value="">{t("jobStatus")}</option>
                                  <option value="true">{t("yes")}</option>
                                  <option value="false">{t("no")}</option>
                                </Form.Select>
                              )}
                            />
                            {errors.jobStatus && (
                              <Form.Text className="text-danger">
                                {errors.jobStatus.message}
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>

                        <Form.Group className="mb-3" controlId="designation">
                          <Form.Label>{t("designation")}</Form.Label>
                          <Controller
                            control={control}
                            name="designation"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.designation}
                                placeholder={t("designation")}
                                type="text"
                              />
                            )}
                          />
                          {errors.designation && (
                            <Form.Text className="text-danger">
                              {errors.designation.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="jobLocation">
                          <Form.Label>{t("jobLocation")}</Form.Label>
                          <Controller
                            control={control}
                            name="jobLocation"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.jobLocation}
                                placeholder={t("jobLocation")}
                                type="text"
                              />
                            )}
                          />
                          {errors.jobLocation && (
                            <Form.Text className="text-danger">
                              {errors.jobLocation.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                          <Form.Label>{t("password")}</Form.Label>
                          <Controller
                            control={control}
                            name="password"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.password}
                                placeholder={t("password")}
                                type="password"
                              />
                            )}
                          />
                          {errors.password && (
                            <Form.Text className="text-danger">
                              {errors.password.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="confirmPassword"
                        >
                          <Form.Label>{t("confirm password")}</Form.Label>
                          <Controller
                            control={control}
                            name="confirmPassword"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.confirmPassword}
                                placeholder={t("confirm password")}
                                type="password"
                              />
                            )}
                          />
                          {errors.confirmPassword && (
                            <Form.Text className="text-danger">
                              {errors.confirmPassword.message}
                            </Form.Text>
                          )}
                        </Form.Group>

                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-block login-btn mt-2"
                            type="submit"
                          >
                            {isLoading ? (
                              <Spinner size="sm" color="light" />
                            ) : (
                              t("Sign up")
                            )}
                          </button>
                        </div>
                      </Form>
                      <div className="text-center w-100 mt-3">
                        <Link className="text-center" to="/login">
                          {t("sign in")}
                        </Link>
                        <br />
                        <Link className="text-center" to="/forgot-password">
                          {t("forget password")}
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

export default Register;
