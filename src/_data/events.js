const axios = require('axios')
const {CHANNEL_ID} = require('./yt.js')
const { AssetCache } = require('@11ty/eleventy-cache-assets')
const {timestamp} = require('./build')

const moment = require('moment')
// Add Non Youtube Playlist Events and Upcoming Events (with date) Here
const otherEvents = [
    {
        id: '',
        name: "Science Around Us",
        description: `To test out hard work and critical thinking, ANUVRAT is organizing an exciting science-based competition “Science Around Us”, where participants can squeeze out their distinguished and intellectual thinking ability about the science & logic behind the things happening around us. `,
        thumbnail: "/assets/images/events/sciencearoundus.png",
        date: "2021-06-20T17:00:00Z",
        link: ``
    },
    {
        id: '',
        name: "Tech-Spectrum",
        description: `To showcase versatile abilities in various fields, ANUVRAT is organizing Tech-Spectrum- A Series of Technology Based Events, which is a combination of four different types of  exciting competitions which tends to provide an excellent opportunity for participants to build confidence, display their spectacular ideas, enhance their communication skills and hone their technical skills.`,
        thumbnail: "/assets/images/events/techspectrum.png",
        date: "2021-06-20T17:00:00Z",
        link: ``
    },
    {
        id: '',
        name: "Tech-Charades",
        description: `Learning is a complicated cognitive process. It expands our many capabilities, such as our thinking abilities, imagination, creativity & resilience, which tends to provide us with an excellent opportunity to test our skills in a fun and exciting manner.`,
        thumbnail: "/assets/images/events/Tech_Charades.png",
        date: "2021-06-20T17:00:00Z",
        link: ``
    },
    {
        id: '',
        name: "Tech Splash",
        description: `Graphic design is one of the astonishing ways to communicate ideas through typography, imagery, color, and form which makes it stand out as one of the most viable options available, as it serves to convey our ideas in a way that is not only effective but also beautiful.`,
        thumbnail: "/assets/images/events/Tech splash.png",
        date: "2021-06-20T17:00:00Z",
        link: ``
    },
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
