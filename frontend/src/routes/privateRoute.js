//External Lib Import
import { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../components/LazyLoader";

const Dashboard = lazy(() => import("../screens/private/Dashboard"));
const Leave = lazy(() => import("../screens/private/Leave/Leave"));
const Others = lazy(() => import("../screens/private/Others/Others"));
const SubjectRepetition = lazy(() =>
  import("../screens/private/SubjectRepetition/SubjectRepetition")
);
const RetakeAssessment = lazy(() =>
  import("../screens/private/RetakeAssessment/RetakeAssessment")
);
const Scholarship = lazy(() =>
  import("../screens/private/Scholarship/Scholarship")
);
const Profile = lazy(() => import("../screens/private/Profile/Profile"));
const Students = lazy(() => import("../screens/private/Students/Students"));
const ElectiveCourses = lazy(() =>
  import("../screens/private/Admin/ElectiveCourses")
);
const ElectiveCoursesStudent = lazy(() =>
  import("../screens/private/Student/ElectiveCoursesStudent")
);
const Enroll = lazy(() => import("../screens/private/Admin/Enroll"));
const Instructor = lazy(() =>
  import("../screens/private/Admin/Instructor/Instructor")
);

const InsCourses = lazy(() => import("../screens/private/Admin/InsCourses"));
const SummerCourses = lazy(() =>
  import("../screens/private/Admin/SummerCourses/SummerAssessment")
);
const SummerAssessmentReport = lazy(() =>
  import("../screens/private/Admin/SummerCourses/SummerAssessmentReport")
);

const StudentSummerAssessment = lazy(() =>
  import("../screens/private/StudentSummerAssessment/StudentSummerAssessment")
);

const ApplyStudentSummerAssessment = lazy(() =>
  import(
    "../screens/private/StudentSummerAssessment/ApplyStudentSummerAssessment"
  )
);

const CreateUpdateSummerCourses = lazy(() =>
  import("../screens/private/Admin/SummerCourses/CreateUpdateSummerAssessment")
);
const CreateUpdateLeave = lazy(() =>
  import("../screens/private/Leave/CreateUpdateLeave")
);
const CreateUpdateOthers = lazy(() =>
  import("../screens/private/Others/CreateUpdateOthers")
);
const CreateUpdateSubjectRepetition = lazy(() =>
  import("../screens/private/SubjectRepetition/CreateUpdateSubjectRepetition")
);
const CreateUpdateRetakeAssessment = lazy(() =>
  import("../screens/private/RetakeAssessment/CreateUpdateRetakeAssessment")
);
const CreateUpdateScholarship = lazy(() =>
  import("../screens/private/Scholarship/CreateUpdateRetakeScholarship")
);
const CreateUpdateSession = lazy(() =>
  import("../screens/private/Admin/CreateUpdateSession")
);
const CreateUpdateCourses = lazy(() =>
  import("../screens/private/Admin/CreateUpdateCourses")
);

const CreateUpdateInstructor = lazy(() =>
  import("../screens/private/Admin/Instructor/CreateUpdateInstructor")
);

const CreateUpdateInsCourses = lazy(() =>
  import("../screens/private/Admin/CreateUpdateInsCourses")
);

const InsCourseDetails = lazy(() =>
  import("../screens/private/Admin/InsCourseDetails")
);

const InsCourseResources = lazy(() =>
  import("../screens/private/Admin/InsCourseResources")
);

const LazyLoading = ({ children }) => {
  return <Suspense fallback={<LazyLoader />}>{children}</Suspense>;
};

const privateRoutes = [
  {
    path: "/",
    element: (
      <LazyLoading>
        <Dashboard />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/dashboard",
    element: (
      <LazyLoading>
        <Dashboard />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/students",
    element: (
      <LazyLoading>
        <Students />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/Leave",
    element: (
      <LazyLoading>
        <Leave />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/Leave-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateLeave />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/subject-repetition",
    element: (
      <LazyLoading>
        <SubjectRepetition />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/subject-repetition-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateSubjectRepetition />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/retake-assessment",
    element: (
      <LazyLoading>
        <RetakeAssessment />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/retake-assessment-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateRetakeAssessment />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/session-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateSession />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/courses-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/enrolled-student",
    element: (
      <LazyLoading>
        <Enroll />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/scholarship",
    element: (
      <LazyLoading>
        <Scholarship />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/scholarship-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateScholarship />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/others",
    element: (
      <LazyLoading>
        <Others />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/others-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateOthers />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT"],
    accessPermission: null,
  },
  {
    path: "/profile",
    element: (
      <LazyLoading>
        <Profile />
      </LazyLoading>
    ),
    roles: ["ADMIN", "STUDENT", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/elective-courses",
    element: (
      <LazyLoading>
        <ElectiveCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/elective-courses-student",
    element: (
      <LazyLoading>
        <ElectiveCoursesStudent />
      </LazyLoading>
    ),
    roles: ["STUDENT"],
    accessPermission: null,
  },
  {
    path: "/instructor",
    element: (
      <LazyLoading>
        <Instructor />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/instructor-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateInstructor />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/inscourses",
    element: (
      <LazyLoading>
        <InsCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/inscourses-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateInsCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/insCourses-view/:id",
    element: (
      <LazyLoading>
        <InsCourseDetails />
      </LazyLoading>
    ),
    roles: ["ADMIN", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/course-folder/:id/:uniqueId",
    element: (
      <LazyLoading>
        <InsCourseResources />
      </LazyLoading>
    ),
    roles: ["ADMIN", "INSTRUCTOR"],
    accessPermission: null,
  },
  {
    path: "/summer-assessment",
    element: (
      <LazyLoading>
        <SummerCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/summer-assessment-create-update",
    element: (
      <LazyLoading>
        <CreateUpdateSummerCourses />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/summer-assessment-report",
    element: (
      <LazyLoading>
        <SummerAssessmentReport />
      </LazyLoading>
    ),
    roles: ["ADMIN"],
    accessPermission: null,
  },
  {
    path: "/summer-assessment-student",
    element: (
      <LazyLoading>
        <StudentSummerAssessment />
      </LazyLoading>
    ),
    roles: ["STUDENT"],
    accessPermission: null,
  },
  {
    path: "/summer-assessment-apply",
    element: (
      <LazyLoading>
        <ApplyStudentSummerAssessment />
      </LazyLoading>
    ),
    roles: ["STUDENT"],
    accessPermission: null,
  },
];

export default privateRoutes;
