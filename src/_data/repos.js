// TODO: Change this to graphql api later
const { Octokit } = require('@octokit/rest')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

const {ORG_NAME, DEFAULT_BRANCH} = require('./gh.js')

const octokit = new Octokit({
    auth: process.env.GH_PERSONAL_TOKEN
})
async function getReadme(repoName) {
    const { data } = await octokit.repos.getReadme({
        owner: ORG_NAME,
        repo: repoName
    })
    return Buffer.from(data.content, 'base64').toString()
}


async function fetchProjectRepos(){
    let asset = new AssetCache('projectRepoCache')
    if (asset.isCacheValid('30m')) {
        return asset.getCachedValue()
    }

    const {data} = await octokit.search.repos({
        q: 'topic:project+org:'+ORG_NAME
    })
    const items = data.items
    // for (let repo of items) {
    //     repo.readme = await getReadme(repo.name)
    // }

    await asset.save(items, 'json')
    return items
}

async function fetchResourceRepos(){
    let asset = new AssetCache('resourceRepoCache')
    if (asset.isCacheValid('30m')) {
        return asset.getCachedValue()
    }

    const {data} = await octokit.search.repos({
        q: 'topic:resources+org:'+ORG_NAME
    })
    const items = data.items
    // for (let repo of items) {
    //     repo.readme = await getReadme(repo.name)
    // }

    await asset.save(items, 'json')
    return items
}


module.exports = async function () {
    console.log("Fetching Github Repos...")
    const projectRepos = await fetchProjectRepos()
    const resourceRepos = await fetchResourceRepos()
    return {projectRepos, resourceRepos}
}
