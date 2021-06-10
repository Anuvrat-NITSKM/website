const announcements = require('./announcements');

const eventAnnouncements = announcements.filter((d) => d.type && d.type === 'EVENT')

module.exports = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Events",
        url: "/events/",
        notifications: eventAnnouncements
    },
    {
        name: "Resources",
        url: "/resources/"
    },
    {
        name: "Projects",
        url: "/projects/"
    },
    {
        name: "Gallery",
        url: "/gallery/"
    },
    {
        name: "Team",
        url: "/team/"
    }
]
