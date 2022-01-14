import 'reflect-metadata'
import { getRepository } from 'typeorm'
import matcher from 'matcher'
import { App } from '~/models/App'
import { encrypt } from '~/crypt'
import { withDb, withErrorHandler } from '~lib/api'
import { getBaseUrl } from '~/helpers'
import { getCanonicalUrl } from '~/vercel'

export default withErrorHandler(
  withDb(async (req, res) => {
    if (req.method !== 'POST') throw new Error('Only POST is supported')

    const { appId } = req.query
    const { redirectUri } = req.body

    if (!appId) throw new Error('No appId provided')
    if (!redirectUri) throw new Error('No redirectUri provided')

    // fetch application
    const appRepository = getRepository(App)
    const app = await appRepository.findOne(appId as string)

    if (!app) throw new Error(`No app found with id ${appId}`)
    const redirects = await app.redirectUris
    if (!redirects.length)
      throw new Error('App has no redirect URIs configured')

    // check if redirect Uri matches
    const uriMatches =
      matcher(
        [redirectUri],
        redirects.map((r) => r.uri)
      ).length > 0
    if (!uriMatches) throw new Error(`Invalid redirectUri: ${redirectUri}`)

    const statePayload = { redirectUri, timestamp: new Date() }
    const state = encrypt(app.secret, JSON.stringify(statePayload))
    const canonicalUrl = await getCanonicalUrl()
    res.json({
      redirectUri: `${getBaseUrl(canonicalUrl)}/api/bunjee/${appId}/callback`,
      state,
    })
    res.end()
  })
)
