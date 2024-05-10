import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';
import uploadedProfileImage from '../modules/user/user.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  uploadedProfileImage();
};
export default subscribeToEvents;
