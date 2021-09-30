module.exports = {
    salt: "b05bd5a64e9a5b1f3046bef577b823ac",
    secretOrKey: "ayzdApiKEY",
    clientUrl: process.env.NODE_ENV === 'production' 
        ? "http://ayzd.herokuapp.com"
        : "http://localhost:3000",
    fake_mongodb_id: "60ec34e83a9eb20f00000000",
    email: "your_gmail",
    password: "password",
    scrape_url: "https://cryptoslam.io",
    marketcap_scrape_url: "https://coinranking.com/coins/tag/nft",
    nfts_url: "https://api.coinranking.com/v2/nfts?limit=100",
    dapps_url: "https://api.coinranking.com/v2/dapps",
    coinranking_url: "https://api.coinranking.com/v2",
    token: "coinrankingcde5ba949c88d833a715afbb4a5ba67f3d67386422b68187",
    discord_bot_key: 'ODc5NzAwNTMwODA3NTcwNDYy.YSTi9g.SM-uOXwhRMvaJnfqojN6gX9Oj-Y',
    twitter_token: 'AAAAAAAAAAAAAAAAAAAAAOhATQEAAAAA55FNPkpZ0kSXLv4973GIwVgW3XQ%3DknSpsvoHTZxHNd32PbDb7RJDZkskH9Na2diNZ3Mx38dOt0nIe3',
    /**
     * Twitter info
     * 
     * API Key: CwisuQRzjtTily3yQHPrRZI0L
     * API Key Secret:  qWbTpwbZZOoDJ3hE7u6wNmeSOI4iQHJ3siupdvmk2O9dsgufHB
     * Bearer Token:    AAAAAAAAAAAAAAAAAAAAAOhATQEAAAAA55FNPkpZ0kSXLv4973GIwVgW3XQ%3DknSpsvoHTZxHNd32PbDb7RJDZkskH9Na2diNZ3Mx38dOt0nIe3
     * */ 
     accessKeyId: "BXOUBYQA5PIT7BICKKXI",
     secretAccessKey: "H5zy8VJCGa/K+YQv7q2deyf7sptapjg/A0W4c+ZNXf0",
     S3_BUCKET: "ayzd-storage",
     endpoint: "fra1.digitaloceanspaces.com",
     bucket_url: "https://ayzd-storage.fra1.digitaloceanspaces.com",
}