const axios = require('axios')
const {CHANNEL_ID} = require('./yt.js')
const { AssetCache } = require('@11ty/eleventy-cache-assets')
const {timestamp} = require('./build')

const moment = require('moment')
// Add Non Youtube Playlist Events and Upcoming Events (with date) Here
const otherEvents = [
    {
        id: '',
        name: "Bug Quest",
        description: `Debugging plays an extremely crucial role in programming. Understanding the importance of debugging, a pivotal part of learning to code for a programmer, ANUVRAT is organizing a debugging contest, BUG QUEST where the participants can test their program analyzing skills in C, C++ and Python.`,
        thumbnail: "/assets/images/events/bug quest.jpg",
        date: "2021-06-20T17:00:00Z",
        link: ``
    },
    {
        id: '',
        name: "CODikshit",
        description: `A programming language serves as a medium of communication between the computer and the human and to be a programmer is to sign yourself up for a new life of constant learning with which you can change the course of humankind.
        Understanding the importance of coding and the opportunities it provides, ANUVRAT is organising a learning event, &quot;CODikhsit – Session on Coding Essentials&quot;, where the student can grasp the basic concepts and get familiarized with some of the most important coding languages.`,
        thumbnail: "/assets/images/events/codikshit.jpg",
        date: "2021-06-16T18:05:09Z", // originally "2021-06-06T06:05:09Z",
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
    let asset = new AssetCache('ytPlaylistCache')

    if (asset.isCacheValid('30m')) {
        return [...(await asset.getCachedValue()), ...otherEvents]
    }

    const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`)
    let ytPlaylist = []
    for(let i=0;i<data.items.length;i++){
        // const plItems = await getPlaylistItems(data.items[i].id)
        // console.log(plItems.items[0].snippet)
        ytPlaylist.push({
            ...basicMap(data.items[i]),
            // playlist: plItems.items.map((item) => basicMap(item))
        })
    }

    const retVal = [ ...ytPlaylist, ...otherEvents ]
    await asset.save(ytPlaylist, 'json')
    return retVal
}

module.exports = async () => {
    console.log("Fetching Youtube Playlists...")
    const currentDate = moment(timestamp)
    const allEvents = await getEvents()
    return {
        upcoming: allEvents.filter((d) => currentDate.isBefore(d.date)),
        past: allEvents.filter((d) => currentDate.isAfter(d.date))
    }
}
