let RssParser = require('rss-parser');

exports.isValid = (data) =>  {
  if( data === null || data === undefined || data === "" || data.length === 0 || JSON.stringify(data) === JSON.stringify({}) )
    return false;
  return true;
}

// Create live feed news from source, keywords and project.
exports.parseRss = async (source) => {

  let rssParser = null;
  let feed = null;

  try {
    rssParser = new RssParser({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36'
      }
    });

    feed = await rssParser.parseURL(source);
  } catch(err) {
    // console.log("generate live feed error~~", err);
  }

  return feed;
}
