const axios = require('axios')
const {CHANNEL_ID} = require('./yt.js')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

// Add Non Youtube Playlist Events Here
const otherEvents = [
    {
        id: '',
        name: "CODikshit",
        description: `A programming language serves as a medium of communication between the computer and the human and to be a programmer is to sign yourself up for a new life of constant learning with which you can change the course of humankind.
        Understanding the importance of coding and the opportunities it provides, ANUVRAT is organising a learning event, &quot;CODikhsit – Session on Coding Essentials&quot;, where the student can grasp the basic concepts and get familiarized with some of the most important coding languages.`,
        thumbnail: "/assets/images/events/codikshit.jpg",
        date: "2021-06-14T06:05:09Z", // originally "2021-06-06T06:05:09Z",
        link: ``
    }
]

// Ignore below Code
function basicMap(obj){
    return {
        id: obj.id,
        name: obj.snippet.title,
        description: obj.snippet.description,
        date: obj.snippet.publishedAt,
        thumbnail: (obj.snippet.thumbnails.standard && obj.snippet.thumbnails.standard.url) || undefined,
        link: `https://youtube.com/playlist?list=${obj.id}`
    }
}


async function getPlaylistItems(playlistId) {
    const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`)
    return data
}

async function getEvents(){
    let asset = new AssetCache('eventListCache')
    if (asset.isCacheValid('30m')) {
        return asset.getCachedValue()
    }

    const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`)
    let ret = []
    for(let i=0;i<data.items.length;i++){
        // const plItems = await getPlaylistItems(data.items[i].id)
        // console.log(plItems.items[0].snippet)
        ret.push({
            ...basicMap(data.items[i]),
            // playlist: plItems.items.map((item) => basicMap(item))
        })
    }
    const retVal = [ ...ret, ...otherEvents ]
    await asset.save(retVal, 'json')
    return retVal
}

module.exports = async () => {
    return await getEvents()
}
