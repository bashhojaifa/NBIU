import { useState } from 'react';
import axios from 'axios';

const useFileUpload = () => {
  //loading states
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState([]);

  //file states

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME || 'dx6e7qlyt';
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_UPLOAD_PRESET || 'sfqgqojg';
  const URL = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/auto/upload';

  const upload = async (files) => {
    const XUniqueUploadId = +new Date();

    let formData = new FormData();
    const response = [];

    for (let file of files) {
      formData.append('file', file);

      formData.append('cloud_name', CLOUD_NAME);
      formData.append('upload_preset', UPLOAD_PRESET);

      setLoading(true);
      // axios POST request
      try {
        const { data } = await axios({
          url: URL,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Unique-Upload-Id': XUniqueUploadId,
          },
          method: 'POST',
          data: formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(progressEvent.progress * 100);
            setFileInfo([
              ...fileInfo,
              {
                fileName: file.name,
                fileSize: file.size,
                progress,
              },
            ]);
          },
        });
        response.push({ url: data.secure_url, type: data.resource_type });
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    return response;
  };

  return { loading, fileInfo, upload };
};

export default useFileUpload;
