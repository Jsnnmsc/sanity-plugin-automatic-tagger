import {definePlugin} from 'sanity'
import {CogIcon} from '@sanity/icons'

import {SeoTagger} from './components/SeoTagger'
import {SecretsConfig} from './components/SecretsConfig'
import {getSEOKeywords} from './utils/api'

export const generateTags = async (content: string) => {
  return await getSEOKeywords(content)
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {automaticTagger, SeoTagger} from 'sanity-plugin-automatic-tagger'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [automaticTagger()],
 * })
 * ```
 */
export const automaticTagger = definePlugin(() => {
  return {
    name: 'sanity-plugin-automatic-tagger',
    tools: [
      {
        name: 'automatic-tagger-secrets',
        title: 'Automatic Tagger Settings',
        icon: CogIcon,
        component: SecretsConfig,
      },
    ],
  }
})

export {SeoTagger}
