import React, { useState } from 'react'
import { ArrayOfPrimitivesInput, PatchEvent, set, unset, useFormValue } from 'sanity'
import { useSecrets } from '@sanity/studio-secrets'
import { Card } from '@sanity/ui'

import { SeoTaggerProps } from '../types'
import { getSEOKeywords } from '../utils/api'
import { GenerateButton } from './GenerateButton'

export function SeoTagger(props: SeoTaggerProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [maxTags, setMaxTags] = useState(5)

  const { secrets } = useSecrets('automatic-tagger')
  const document = useFormValue([]) as Record<string, unknown>
  const content = document?.content as string

  const handleGenerate = async () => {
    if (!content) {
      setError('No content found in the document.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const apiKey = (secrets as Record<string, unknown>)?.openrouterApiKey as string | undefined
      const model = (secrets as Record<string, unknown>)?.openrouterModel as string | undefined

      const result = await getSEOKeywords(content, apiKey, model, maxTags)
      if (result.keywords) {
        // Limit to max tags
        const limitedKeywords = result.keywords.slice(0, maxTags)
        props.onChange(PatchEvent.from(set(limitedKeywords)))
      } else {
        setError(result.error || 'Failed to generate keywords.')
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAll = () => {
    props.onChange(PatchEvent.from(unset()))
  }

  return (
    <Card>
      <ArrayOfPrimitivesInput {...props} />
      <Card padding={3} marginTop={3} border>
        <GenerateButton
          isLoading={isLoading}
          error={error}
          onGenerate={handleGenerate}
          onClearAll={handleClearAll}
          maxTags={maxTags}
          onMaxTagsChange={setMaxTags}
        />
      </Card>
    </Card>
  )
}
