import { theme, darkTheme } from './theme/themeVariables';

const config = {
  darkMode: false,
  topMenu: false,
  rtl: false,
  theme,
  darkTheme,
  salt: "b05bd5a64e9a5b1f3046bef577b823ac",
  api_url: process.env.NODE_ENV === "production"
    ? ({httpUrl : 'http://api.app-ad.ayzd.com', httpsUrl : 'https://api.app-ad.ayzd.com'})
    : {httpUrl : 'http://localhost:8000'},
  // accessKeyId: "AKIARLDHYNPQQO5XLIM5",
  // secretAccessKey: "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",
  // REGION: "us-east-2",
  // S3_BUCKET: "ayzd-storage",
  // bucket_url: "https://ayzd-storage.s3.us-east-2.amazonaws.com",
  
  accessKeyId: "BXOUBYQA5PIT7BICKKXI",
  secretAccessKey: "H5zy8VJCGa/K+YQv7q2deyf7sptapjg/A0W4c+ZNXf0",
  S3_BUCKET: "ayzd-storage",
  endpoint: "fra1.digitaloceanspaces.com",
  bucket_url: "https://ayzd-storage.fra1.digitaloceanspaces.com",
  general_avatar: "general_avatar.png",
  common_image: "common_image.png",
  video_mark_image: "video_mark.png",
  TIME_INTERVAL: 1000*60*60,    // 1 hour,
};

export default config;
