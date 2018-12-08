const octokit = require('@octokit/rest')()

function GithubAPI() {
  let filesToCommit = []
  let currentBranch = {}
  let newCommit = {}

  const owner = 'tvthatsme'
  const repo = 'tvernon.tech'

  // Authenticate with Github (https://github.com/settings/tokens)
  octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN,
  })

  this.getRepoFiles = async function(path) {
    return octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: 'heads/master',
    })
  }

  this.getRepoFile = async function(path) {
    return await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: 'heads/master',
    })
  }

  this.setBranch = async function(branchName) {
    // Get a reference to the latest commit on master
    const master = await octokit.gitdata.getReference({
      owner,
      repo,
      ref: 'heads/master',
    })

    // Create a branch by creating a new reference with the last commit sha
    const result = await octokit.gitdata.createReference({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: master.data.object.sha,
    })
    currentBranch.name = branchName
  }

  this.pushFiles = function(message, files) {
    return getCurrentCommitSHA()
      .then(getCurrentTreeSHA)
      .then(() => createFiles(files))
      .then(createTree)
      .then(() => createCommit(message))
      .then(updateHead)
      .catch(e => {
        console.error(e)
      })
  }

  function getCurrentCommitSHA() {
    return octokit.gitdata
      .getReference({
        owner,
        repo,
        ref: 'heads/' + currentBranch.name,
      })
      .then(result => {
        currentBranch.commitSHA = result.data.object.sha
      })
  }

  function getCurrentTreeSHA() {
    return octokit.gitdata
      .getCommit({
        owner,
        repo,
        commit_sha: currentBranch.commitSHA,
      })
      .then(commit => {
        currentBranch.treeSHA = commit.data.tree.sha
      })
  }

  function createFiles(files) {
    let promises = []
    for (let i = 0; i < files.length; i++) {
      promises.push(createFile(files[i]))
    }
    return Promise.all(promises)
  }

  function createFile(file) {
    return octokit.gitdata
      .createBlob({
        owner,
        repo,
        content: file.content,
        encoding: 'utf-8',
      })
      .then(blob => {
        filesToCommit.push({
          sha: blob.data.sha,
          path: file.path,
          mode: '100644',
          type: 'blob',
        })
      })
  }

  function createTree() {
    return octokit.gitdata
      .createTree({
        owner,
        repo,
        tree: filesToCommit,
        base_tree: currentBranch.treeSHA,
      })
      .then(tree => {
        newCommit.treeSHA = tree.data.sha
      })
  }

  function createCommit(message) {
    return octokit.gitdata
      .createCommit({
        owner,
        repo,
        message,
        tree: newCommit.treeSHA,
        parents: [currentBranch.commitSHA],
      })
      .then(result => {
        newCommit.sha = result.data.sha
      })
  }

  function updateHead() {
    return octokit.gitdata.updateReference({
      owner,
      repo,
      ref: 'heads/' + currentBranch.name,
      sha: newCommit.sha,
    })
  }
}

module.exports = GithubAPI
