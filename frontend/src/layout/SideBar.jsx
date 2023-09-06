//External Lib  imports
import React from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BiSupport } from 'react-icons/bi';
import { GiMeatCleaver, GiTeacher, GiSummits } from 'react-icons/gi';
import { MdSubject, MdCastForEducation } from 'react-icons/md';
import { RiCompassesLine } from 'react-icons/ri';
import { SiSemanticscholar, SiFuturelearn } from 'react-icons/si';
import { CgProfile } from 'react-icons/cg';
import { FaUniversity } from 'react-icons/fa';

//Internal Lib  imports
import NavItem from './NavItem';
import { useProfileDetailsQuery } from '../redux/services/profileService';

const SideBar = ({ openMenu, setOpenMenu }) => {
  const { t } = useTranslation();

  const { data: profileDetails } = useProfileDetailsQuery();

  return (
    <div className={openMenu ? 'side-nav-open' : 'side-nav-close'}>
      <Nav className="flex-column pt-2">
        {profileDetails?.data?.role === 'ADMIN' && (
          <NavItem title={t('dashboard')} link="/dashboard" Icon={RiDashboardLine} />
        )}

        {profileDetails?.data?.role === 'STUDENT' && (
          <>
            <NavItem title={t('leave')} link="/leave" Icon={GiMeatCleaver} />
            <NavItem title={t('subject repetition')} link="/subject-repetition" Icon={MdSubject} />
            <NavItem title={t('retake assessment')} link="/retake-assessment" Icon={RiCompassesLine} />
            <NavItem title={t('summer assessment')} link="/summer-assessment-student" Icon={RiCompassesLine} />
            <NavItem title={t('scholarship')} link="/scholarship" Icon={SiSemanticscholar} />{' '}
            <NavItem title={t('others')} link="/others" Icon={BiSupport} />
          </>
        )}

        {profileDetails?.data?.role === 'ADMIN' && (
          <>
            <NavItem title={t('leave')} link="/leave" Icon={GiMeatCleaver} />
            <NavItem title={t('subject repetition')} link="/subject-repetition" Icon={MdSubject} />
            <NavItem title={t('retake assessment')} link="/retake-assessment" Icon={RiCompassesLine} />
            <NavItem title={t('summer assessment')} link="/summer-assessment" Icon={GiSummits} />
            <NavItem title={t('scholarship')} link="/scholarship" Icon={SiSemanticscholar} />{' '}
            <NavItem title={t('others')} link="/others" Icon={BiSupport} />
          </>
        )}

        {profileDetails?.data?.role === 'ADMIN' && (
          <>
            <NavItem title={t('students')} link="/students" Icon={MdCastForEducation} />
            <NavItem title={t('elective courses')} link="/elective-courses" Icon={FaUniversity} />{' '}
            <NavItem title={t('instructor')} link="/instructor" Icon={GiTeacher} />
          </>
        )}

        {profileDetails?.data?.role === 'STUDENT' && (
          <NavItem title={t('elective courses')} link="/elective-courses-student" Icon={FaUniversity} />
        )}

        {profileDetails?.data?.role === 'INSTRUCTOR' && (
          <>
            <NavItem title={t('courses')} link="/inscourses" Icon={SiFuturelearn} />
          </>
        )}

        {profileDetails?.data?.role === 'ADMIN' && (
          <>
            <NavItem title={t('courses')} link="/inscourses" Icon={SiFuturelearn} />
          </>
        )}

        <NavItem title={t('profile')} link="/profile" Icon={CgProfile} />
      </Nav>
    </div>
  );
};

export default SideBar;
