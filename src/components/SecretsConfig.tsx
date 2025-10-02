import React, {useState, useEffect} from 'react'
import {useSecrets} from '@sanity/studio-secrets'
import {Stack, Card, Text, TextInput, Button, Box} from '@sanity/ui'

export function SecretsConfig() {
  const {secrets, storeSecrets, loading} = useSecrets('automatic-tagger')
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (secrets) {
      const secretsObj = secrets as Record<string, unknown>
      setApiKey((secretsObj.openrouterApiKey as string) || '')
      setModel((secretsObj.openrouterModel as string) || '')
    }
  }, [secrets])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await storeSecrets({
        openrouterApiKey: apiKey,
        openrouterModel: model || 'openai/gpt-4-mini',
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save secrets:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Box>
          <Text size={3} weight="bold">
            Automatic Tagger Settings
          </Text>
          <Text size={1} muted style={{marginTop: '0.5rem'}}>
            Configure your OpenRouter API credentials for AI-powered tag generation
          </Text>
        </Box>

        <Stack space={3}>
          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              OpenRouter API Key
            </Text>
            <TextInput
              value={apiKey}
              onChange={(e) => setApiKey(e.currentTarget.value)}
              placeholder="sk-or-v1-..."
              disabled={loading}
            />
            <Text size={1} muted style={{marginTop: '0.25rem'}}>
              Get your API key from{' '}
              <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">
                openrouter.ai
              </a>
            </Text>
          </Box>

          <Box>
            <Text size={1} weight="semibold" style={{marginBottom: '0.5rem'}}>
              OpenRouter Model (Optional)
            </Text>
            <TextInput
              value={model}
              onChange={(e) => setModel(e.currentTarget.value)}
              placeholder="openai/gpt-4-mini"
              disabled={loading}
            />
            <Text size={1} muted style={{marginTop: '0.25rem'}}>
              Model to use (default: openai/gpt-4-mini)
            </Text>
          </Box>

          <Box>
            <Button
              text={saved ? 'Saved!' : 'Save Settings'}
              tone={saved ? 'positive' : 'primary'}
              onClick={handleSave}
              disabled={loading || saving || !apiKey}
              loading={saving}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}
