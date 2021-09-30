const cheerio = require('cheerio');
var Config = require('../config/config');
var utility = require('../utility');

const rp = require("request-promise");
const axios = require("axios");

exports.getTopSales = async (req, res) =>  {
    // let data = [];

    // const result = await rp.get(Config.scrape_url);
    // const $ = cheerio.load(result);

    // $('.table-top-sales-raw-24h').find('tbody').eq(0).find('tr').each((i,el)=>{
    //     let singleProduct = {};
    //     singleProduct.image = $(el).find('td').eq(1).find('.js-crypto-preview-image').attr('src');
    //     singleProduct.name = $(el).find('td').eq(2).find('.summary-top-sales-table__column-crypto-name').text().trim();
    //     singleProduct.price = $(el).find('td').eq(3).find('.summary-top-sales-table__column-price-usd').text().trim();
        
    //     data.push(singleProduct);
    //     if(data.length >= 8)
    //         return false;
    // })

    // return res.json({success: true, data });
}

exports.getTopCollections = async (req, res) =>  {
    let data = [];

    try {
        const result = await rp.get(Config.scrape_url);
        const $ = cheerio.load(result);

        $('.js-top-by-sales-table-all').find('tbody').eq(0).find('tr').each((i,el)=>{
            let singleProduct = {};
            singleProduct.icon = $(el).find('td').eq(1).find('.contract-icon').attr('data-src');
            singleProduct.name = $(el).find('td').eq(1).find('.summary-sales-table__column-product-name').text().trim();
            singleProduct.price = `$${addSuffixToNumber( parseInt($(el).find('td').eq(3).text().trim().replace(/[^0-9.]/g, "")) )}`;
            singleProduct.amount = $(el).find('td').eq(5).text().trim();
            
            data.push(singleProduct);
            // if(data.length >= 8)
            //     return false;
        });

        return res.json({success: true, data, });
    } catch(err) {
        console.log("data scraping error!", err);
        return res.json({success: false})
    }
}

exports.getSalesOfDay = async (req, res) =>  {
    let data = [];

    const result = await rp.get(Config.scrape_url);
    const $ = cheerio.load(result);

    $('.table-top-sales-raw-24h').find('tbody').eq(0).find('tr').each((i,el)=>{
        let singleProduct = {};
        singleProduct.image = $(el).find('td').eq(1).find('.js-crypto-preview-image').attr('data-src');
        singleProduct.name = $(el).find('td').eq(2).find('.summary-top-sales-table__column-crypto-name').text().trim();
        singleProduct.sub_name = $(el).find('td').eq(2).find('p').eq(1).text().trim();
        singleProduct.price = `$${addSuffixToNumber( parseInt($(el).find('td').eq(3).find('.summary-top-sales-table__column-price-usd').text().trim().replace(/[^0-9.]/g, "")) )}`;
        singleProduct.priceWithoutSuffix = $(el).find('td').eq(3).find('.summary-top-sales-table__column-price-usd').text().trim().replace(/[^$0-9.,]/g, "");

        data.push(singleProduct);
        if(data.length >= 10)
            return false;
    })

    return res.json({success: true, data });
}


exports.getGainersLoosers = async (req, res) =>  {

    let topSales = [], gainers = [], loosers = [];
    let tempGainers = [], tempLoosers = [];

    const result = await rp.get(Config.scrape_url);
    const $ = cheerio.load(result);

    $('.js-top-by-sales-table-30d').find('tbody').eq(0).find('tr').each((i,el)=>{

        let singleProduct = {};
        singleProduct.icon = $(el).find('td').eq(1).find('.contract-icon').attr('data-src');
        singleProduct.name = $(el).find('td').eq(1).find('.summary-sales-table__column-product-name').text().trim();
        singleProduct.price = $(el).find('td').eq(3).text().trim().replace(/[$,]/g, "");
        singleProduct.change = $(el).find('td').eq(4).html();
        singleProduct.percent = parseFloat($(el).find('td').eq(4).text().trim());

        topSales.push(singleProduct);

        if($(el).find('td').eq(4).find('span').eq(0).find('span').eq(0).attr('class') === 'caret-up') {
            if(singleProduct.price > 10000) {
                singleProduct = { 
                    ...singleProduct,
                    price: `$${addSuffixToNumber(singleProduct.price)}`,
                }                
                tempGainers.push(singleProduct);
            }
        } else {
            if(singleProduct.price > 10000) {
                singleProduct = { 
                    ...singleProduct,
                    price: `$${addSuffixToNumber(singleProduct.price)}`,
                }                
                tempLoosers.push(singleProduct);
            }
        }

        if(tempGainers.length >= 10 && tempLoosers.length >= 10)
            return false;
    })

    if(tempGainers.length >= 10) {
        tempGainers.sort((a, b) => {
            return b['percent'] - a['percent'];
        });
        gainers = tempGainers.slice(0, 10);
    } else {
        gainers = tempGainers;
    }

    if(tempLoosers.length >= 10) {
        tempLoosers.sort((a, b) => {
            return b['percent'] - a['percent'];
        });
        loosers = tempLoosers.slice(0, 10);
    } else {
        loosers = tempLoosers;
    }

    return res.json({success: true, gainers, loosers });
}

exports.trading = async (req, res) =>  {
    let dapps = [], nfts = [];

    const nftsOptions = {
      method: 'GET',
      url: Config.nfts_url,
      headers: {
        'x-access-token': Config.token
      }
    };
    const dappsOptions = {
      method: 'GET',
      url: Config.dapps_url,
      headers: {
        'x-access-token': Config.token
      }
    };

    try {
        let dappsResponse = await rp(dappsOptions);
        dapps = JSON.parse(dappsResponse).data.dapps;

        let nftsResponse = await rp(nftsOptions);
        nfts = JSON.parse(nftsResponse).data.nfts;


        return res.json({success: true, dapps: dapps, nfts: nfts });
    } catch(err) {
        return res.json({success: false});
    }
}

exports.getBiggestSalesVolume = async (req, res) =>  {
    let tempData = [];

    const result = await rp.get(Config.scrape_url);
    const $ = cheerio.load(result);

    $('.js-top-by-sales-table-all').find('tbody').eq(0).find('tr').each((i,el)=>{
        let singleProduct = {};
        singleProduct.icon = $(el).find('td').eq(1).find('.contract-icon').attr('data-src');
        singleProduct.name = $(el).find('td').eq(1).find('.summary-sales-table__column-product-name').text().trim();
        singleProduct.price = $(el).find('td').eq(3).text().trim();
        singleProduct.amount = parseInt($(el).find('td').eq(5).text().trim().replace(/[^0-9.]/g, ""));
        
        tempData.push(singleProduct);
        // if(data.length >= 8)
        //     return false;
    })

    let data = tempData.sort((a, b) => {
        return parseInt(b['amount']) - parseInt(a['amount']);
    });

    data = data.map((item, index) => {
        return {
            ...item,
            amount: addSuffixToNumber( item.amount ),
        }
    });

    return res.json({success: true, data });
}

// exports.getDiscordMembersForOneProject = async (req, res) => {

//     try {
//         const url = req.body.url;
//         const [id] = url.split('/').slice(-1);
//         const resData = await axios.get(`https://discord.com/api/invites/${id}?with_counts=true`, {
//             headers: {
//                 Authorization: `Bot ${Config.discord_bot_key}`,
//                 "X-RateLimit-Limit": 9999,
//                 "X-RateLimit-Remaining": 9999,
//                 "X-RateLimit-Reset": Date.now(),
//                 "X-RateLimit-Bucket": Date.now().toString(),
//             }
//         })
        
//         const followers_count = resData.data.approximate_member_count;
//         return res.json({success: true, data: followers_count})
//     } catch(err) {
//         console.log("error~", err);
//         return res.json({success: false});
//     }
// }

// exports.getTwitterMembersForOneProject = async (req, res) => {
//     try {
//         // getting the id
//         const url = req.body.url;
//         const [id] = url.split('/').slice(-1)
//         const resData = await axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${id}`, {
//             headers: {
//                 Authorization: `Bearer ${Config.twitter_token}`
//             }
//         })

//         const followers_count = resData.data.followers_count;
//         return res.json({success: true, data: followers_count})
//     } catch(err) {
//         console.log("error~", err);
//         return res.json({success: false});
//     }
// }

exports.getMembersFromUrl = async ({discord_link, twitter_link}) => {

    let discord_members = null, twitter_members = null;

    if(utility.isValid(discord_link)) {
        try {
            let [id] = discord_link.split('/').slice(-1);
            let resData = await axios.get(`https://discord.com/api/invites/${id}?with_counts=true`, {
                headers: {
                    Authorization: `Bot ${Config.discord_bot_key}`,
                    "X-RateLimit-Limit": 9999,
                    "X-RateLimit-Remaining": 9999,
                    "X-RateLimit-Reset": Date.now(),
                    "X-RateLimit-Bucket": Date.now().toString(),
                }
            })
            discord_members = resData.data.approximate_member_count;
        } catch(err) {
            console.log("discord api error~", err);
        }
    }

    if(utility.isValid(twitter_link)) {
        try {
            // getting the id
            let [id] = twitter_link.split('/').slice(-1)
            let resData = await axios.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${id}`, {
                headers: {
                    Authorization: `Bearer ${Config.twitter_token}`
                }
            })

            twitter_members = resData.data.followers_count;
        } catch(err) {
            console.log("twitter api error~", err);
        }
    }

    return {discord_members, twitter_members};
}

exports.getTokensByMarketcap = async (req, res) =>  {
    let data = [];

    const result = await rp.get(Config.marketcap_scrape_url);
    const $ = cheerio.load(result);

    $('table').find('tbody').eq(0).find('tr').each((i,el)=>{
        let singleProduct = {};
        singleProduct.icon = $(el).find('td').eq(0).find('img').attr('src');
        singleProduct.title = $(el).find('td').eq(0).find('.profile__name').find('a').eq(0).text().trim();
        singleProduct.sub_title = $(el).find('td').eq(0).find('.profile__name').find('span').eq(0).text().trim();
        singleProduct.price = $(el).find('td').eq(1).find('.valuta').text().trim().replace(/[^$0-9,.]/g, "");
        
        let marketcap_number = $(el).find('td').eq(2).find('.valuta').text().trim().replace(/[^$0-9,.]/g, "");
        let marketcap_unit = $(el).find('td').eq(2).find('.valuta').text().trim().replace(/[^a-zA-Z]/g, "").replace("billion", "B").replace("million", "M");
        singleProduct.marketcap = `${marketcap_number}${marketcap_unit}`;

        singleProduct.percent = $(el).find('td').eq(3).find('div').eq(0).text().trim();
        // singleProduct.amount = $(el).find('td').eq(5).text().trim();
        
        data.push(singleProduct);
        if(data.length >= 10)
            return false;
    })

    return res.json({success: true, data });
}

const addSuffixToNumber = (value) => {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}
