
import { RedisClient } from '../../../shared/redis';
import { ACADEMIC_SEMESTER_CREATED } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const parseData = JSON.parse(e);
    await AcademicSemesterService.createSemester(parseData);
    console.log(parseData, 'This is auth server');
  });
};

export default initAcademicSemesterEvents;
