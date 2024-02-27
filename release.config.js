/**
 * DO NOT CHANGE. This file is being managed from a central repository
 * To know more simply visit https://github.com/honestbank/.github/blob/main/docs/about.md
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SemanticReleaseError extends Error {
  constructor(message, code, details) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'SemanticReleaseError'
    this.details = details
    this.code = code
    this.semanticRelease = true
  }
}

module.exports = {
  branches: [{ name: 'main' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
  ],
  verifyConditions: ['@semantic-release/github'],
  prepare: [],
  publish: [
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
  ],
}
