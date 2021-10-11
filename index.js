for(let i = 0 ; i < discord_links.length ; i ++) {
    let discord_link = discord_links[i];
    let [id] = discord_link.split('/').slice(-1);
    try {
        let resData = await axios.get(`https://discord.com/api/invites/${id}?with_counts=true`, {
            headers: {
                Authorization: `Bot ${Config.discord_bot_key}`,
                "X-RateLimit-Limit": 9999,
                "X-RateLimit-Remaining": 9999,
                "X-RateLimit-Reset": Date.now(),
                "X-RateLimit-Bucket": Date.now().toString(),
            }
        });
        let discord_members = resData.data.approximate_member_count;
        console.log(discord_members);
    } catch(err) {
        
    }
}