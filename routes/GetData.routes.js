var getData = require("../controllers/GetData.controller");

module.exports = (app) => {
    app.post("/api/getData/getTopSales", getData.getTopSales);
    app.post("/api/getData/getTopCollections", getData.getTopCollections);
    app.post("/api/getData/getSalesOfDay", getData.getSalesOfDay);
    app.post("/api/getData/getGainersLoosers", getData.getGainersLoosers);
    app.post("/api/getData/trading", getData.trading);
    app.post("/api/getData/getBiggestSalesVolume", getData.getBiggestSalesVolume);
    app.post("/api/getData/getTokensByMarketcap", getData.getTokensByMarketcap);
    // app.post("/api/getData/getDiscordMembersForOneProject", getData.getDiscordMembersForOneProject);
    // app.post("/api/getData/getTwitterMembersForOneProject", getData.getTwitterMembersForOneProject);    
};
