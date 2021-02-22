// TODO: Change this to graphql api later
const { Octokit } = require('@octokit/rest')
const { AssetCache } = require('@11ty/eleventy-cache-assets')

const octokit = new Octokit({
    auth: process.env.GH_PERSONAL_TOKEN
})

async function getReadme(repoName) {
    const { data } = await octokit.repos.getReadme({
        owner: process.env.ORG_NAME,
        repo: repoName
    })
    return Buffer.from(data.content, 'base64').toString()
}

module.exports = async function () {
    let asset = new AssetCache('repoCache')
    if (asset.isCacheValid('30m')) {
        return asset.getCachedValue()
    }

    const { data } = await octokit.repos.listForOrg({
        org: process.env.ORG_NAME
    })
    for (let repo of data) {
        repo.readme = await getReadme(repo.name)
    }

    await asset.save(data, 'json')
    return data
}
