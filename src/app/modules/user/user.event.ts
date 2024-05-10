import { RedisClient } from '../../../shared/redis';

export const UPLOADED_PROFILEIMAGE_IN_CLOUDINERY =
  'uploaded-profile-image-in-cloudinery';

const uploadedProfileImage = () => {
  RedisClient.subscribe(
    UPLOADED_PROFILEIMAGE_IN_CLOUDINERY,
    async (e: string) => {
      const parseData = JSON.parse(e);
      console.log('Uploaded image Subscribe', parseData);
    }
  );
};
export default uploadedProfileImage;
