const { google } = require('googleapis')
const GithubAPI = require('./github-integration')

// Authenticate with Google Analytics
const jwt = new google.auth.JWT(
  process.env.GA_EMAIL,
  null,
  process.env.GA_PRIVATE_KEY,
  'https://www.googleapis.com/auth/analytics.readonly'
)

const view_id = process.env.GA_VIEW_ID

async function createPullRequestWithViews() {
  let api = new GithubAPI()

  // Get all the articles stored as markdown inside the 'src/posts' directory
  const gaViews = await getPagesAndViews()
  const markdownFiles = await api.getRepoFiles('src/posts')
  const fileViews = matchViewsWithFiles(gaViews, markdownFiles.data)

  // Now we need to take each file and get its original contents
  const fileContents = fileViews.map(async fileViews => {
    const { data: file } = await api.getRepoFile(`src/posts/${fileViews.file}`)
    const buff = Buffer.from(
      file.content,
      file.encoding // most likely base64
    )
    return {
      name: fileViews.file,
      contents: buff.toString('ascii'),
      sha: file.sha,
    }
  })

  const markdownContents = await Promise.all(fileContents)

  const filesWithViews = markdownContents.map((file, index) =>
    updateFileContents(file, fileViews[index].views)
  )

  api.setBranch('view/update-08122018').then(() => {
    api.pushFiles('test push with github-api', filesWithViews).then(function() {
      console.log('Files committed!')
    })
  })
}

/**
 * Get the frontmatter from a string
 *
 * TODO: Would this be easier to consume if it was returned as an object?
 *
 * @param {string} str string to look for frontmatter in
 * @returns {string} frontmatter contents
 */
const getFrontmatter = str =>
  str.substring(str.indexOf('---') + 3, str.lastIndexOf('---'))

/**
 * Match the google analytics data with the post files from the github repo
 * and match which files revieved what number of views.
 *
 * Returns an array of objects of the following type:
 * { file: 'file-in-repository', views: numViews, }
 *
 * @param {*} views
 * @param {*} files
 */
const matchViewsWithFiles = (views, files) => {
  const dateRegex = /[0-9]{2}\-[0-9]{2}\-[0-9]{4}\-/g
  return (
    files
      .map(file => {
        const cleanedFileName = file.name
          .replace('.md', '')
          .replace(dateRegex, '')
        const gaMatches = views.filter(item =>
          item.page.includes(cleanedFileName)
        )
        return gaMatches.length
          ? {
              file: file.name,
              views: gaMatches[0].views,
            }
          : {}
      })
      // Filter out any empty objects
      .filter(item => item.hasOwnProperty('file'))
  )
}

/**
 * Take the existing file contents and update the view frontmatter
 *
 * @param {*} file
 * @param {*} views
 */
const updateFileContents = (file, views) => {
  const frontmatter = getFrontmatter(file.contents)
  let fileToWrite = ''
  if (frontmatter.includes('pageViews')) {
    // we already have saved page views before, so just update the value
    // TODO: Implement this part
    fileToWrite = file.contents
  } else {
    // page views was never added to this file
    const frontmatterEnd = file.contents.lastIndexOf('---')
    fileToWrite =
      file.contents.slice(0, frontmatterEnd) +
      `pageViews: ${views}\n` +
      file.contents.slice(frontmatterEnd)
  }
  return {
    path: `src/posts/${file.name}`,
    content: fileToWrite,
    sha: file.sha,
  }
}

/**
 * Get all the pages and their respective views that Google Analytics is tracking
 */
async function getPagesAndViews() {
  const response = await jwt.authorize()
  const { data } = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: view_id,
    'start-date': '2018-10-01', // Date when analytics was set up
    'end-date': 'today',
    dimensions: 'ga:pagePath',
    metrics: 'ga:pageviews',
  })

  // Create and return an array of objects {page, views} for simple consuming
  return (pagesAndViews = data.rows.map(row => {
    return { page: row[0], views: row[1] }
  }))
}

exports.handler = async (event, context) => {
  createPullRequestWithViews()
}
