// import { uploadFile } from 'react-s3';
// import { notification } from 'antd';
// import * as actions from '../redux/actions';
// import config from '../config/config';

// const s3BucketConfig = {
//   bucketName: config.S3_BUCKET,
//   region: config.REGION,
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey
// };

// const fileUploadToS3 = async (file) => {

//   let newFile = file, newFileName = file.name;
//   let {data} = await actions.findAndGenerateFileName(file.name);

//   let {success, name, isExist} = data;
//   if(!success) {
//     notification['error'] ({
//       message: 'Error',
//       description: "Unknow error was occurred while finding/generating new file name",
//     });
//     return {success: false, errMessage: "Unknow error was occurred while finding/generating new file name"};
//   }
  
//   newFileName  = name;
//   if(isExist) {     // change the name of the file before uploading.
//     var blob = file.slice(0, file.size, file.type);
//     newFile = new File([blob], newFileName, {type: file.type})
//   }

//   return await uploadFile(newFile, s3BucketConfig)
//     .then(data => { return {success: true, data} })
//     .catch(err => {console.error(err); return {success: false, errMessage: JSON.stringify(err) };});
// }

// export default fileUploadToS3;

import { notification } from 'antd';
import * as actions from '../redux/actions';
import config from '../config/config';

const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint(config.endpoint);
const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  endpoint: spacesEndpoint,
});

const fileUploadToS3 = async (file) => {

  let newFile = file, newFileName = file.name;
  let {data} = await actions.findAndGenerateFileName(file.name);

  let {success, name, isExist} = data;
  if(!success) {
    notification['error'] ({
      message: 'Error',
      description: "Unknow error was occurred while finding/generating new file name",
    });
    return {success: false, errMessage: "Unknow error was occurred while finding/generating new file name"};
  }
  
  newFileName  = name;
  if(isExist) {     // change the name of the file before uploading.
    var blob = file.slice(0, file.size, file.type);
    newFile = new File([blob], newFileName, {type: file.type})
  }

  let formData = new FormData();
  formData.append("file_upload", newFile);

  let responseData = await actions.fileUpload(formData);
  
  success = responseData.data.success;
  data = responseData.data.data;
  let {errMessage} = responseData.data;
  if(success)
    return {success: true, data};
  else
    return {success: false, errMessage}
}

export default fileUploadToS3;