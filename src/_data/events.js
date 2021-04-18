const axios = require('axios')
const {CHANNEL_ID} = require('./yt.js')

const { AssetCache } = require('@11ty/eleventy-cache-assets')


function basicMap(obj){
    return {
        name: obj.snippet.title,
        description: obj.snippet.description,
        thumbnail: (obj.snippet.thumbnails.default && obj.snippet.thumbnails.default.url) || undefined
    }
}


async function getPlaylistItems(playlistId) {
    const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`)
    return data
}

async function getPlaylist(){
    let asset = new AssetCache('eventListCache')
    if (asset.isCacheValid('30m')) {
        return asset.getCachedValue()
    }

    const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`)
    let ret = []
    for(let i=0;i<data.items.length;i++){
        const plItems = await getPlaylistItems(data.items[i].id)
        console.log(plItems.items[0].snippet)
        ret.push({
            ...basicMap(data.items[i]),
            playlist: plItems.items.map((item) => basicMap(item))
        })
    }
    await asset.save(ret, 'json')
    return ret
}


module.exports = async () => {
    return await getPlaylist()
}
