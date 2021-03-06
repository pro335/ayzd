const config = {
  api_url: process.env.NODE_ENV === "production"
    ? ({ httpUrl: 'http://api.app.ayzd.com', httpsUrl: 'https://api.app.ayzd.com' })
    : { httpUrl: 'http://localhost:8000' },
  REGION: "us-east-2",
  S3_BUCKET: "ayzd-storage",
  bucket_url: "https://ayzd-storage.fra1.digitaloceanspaces.com",
  general_avatar: "general_avatar.png",
  common_image: "common_image.png",
  TIME_INTERVAL: 1000 * 60 * 60,    // 1 hour,
  LOADING_TIME: 1000 * 15,    // 25 seconds
  // GOOGLE_ANALYTICS_TRACKING_ID: "G-SDDKN4GBXJ",
};

export default config;
