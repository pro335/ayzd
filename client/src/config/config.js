const config = {
  api_url: process.env.NODE_ENV === "production"
    ? ({httpUrl : 'http://api.app.ayzd.com', httpsUrl : 'https://api.app.ayzd.com'})
    : {httpUrl :'http://localhost:8000'},
  accessKeyId: "AKIARLDHYNPQQO5XLIM5",
  secretAccessKey: "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",
  REGION: "us-east-2",
  S3_BUCKET: "ayzd-storage",
  bucket_url: "https://ayzd-storage.s3.us-east-2.amazonaws.com",
  general_avatar: "general_avatar.png",
  common_image: "common_image.png",
  TIME_INTERVAL: 1000*60*60,    // 1 hour,
};

export default config;
