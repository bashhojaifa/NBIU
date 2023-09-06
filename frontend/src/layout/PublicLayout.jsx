//Internal Lib Import
import PublicNav from './PublicNav';

const PublicLayout = ({ children, title }) => {
  return (
    <>
      <PublicNav title={title} />
      {children}
    </>
  );
};

export default PublicLayout;
