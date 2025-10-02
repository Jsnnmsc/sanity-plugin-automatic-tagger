import React from 'react'
import {Button, Stack, Text, Flex, Box} from '@sanity/ui'
import {SparklesIcon, TrashIcon} from '@sanity/icons'

import {GenerateButtonProps} from '../types'

export function GenerateButton({
  isLoading,
  error,
  onGenerate,
  onClearAll,
  maxTags,
  onMaxTagsChange,
}: GenerateButtonProps): React.ReactElement {
  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Box flex={1}>
          <Flex gap={2} align="center">
            <Button
              text={isLoading ? 'Generating...' : 'Generate Tags'}
              tone="primary"
              icon={SparklesIcon}
              onClick={onGenerate}
              disabled={isLoading}
              loading={isLoading}
            />
            <Button
              text="Clear All"
              tone="critical"
              icon={TrashIcon}
              mode="ghost"
              onClick={onClearAll}
              disabled={isLoading}
            />
          </Flex>
        </Box>
        <Flex gap={2} align="center">
          <Text size={1} muted>
            Max tags:
          </Text>
          <select
            value={maxTags}
            onChange={(e) => onMaxTagsChange(Number(e.target.value))}
            disabled={isLoading}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid var(--card-border-color)',
              backgroundColor: 'var(--card-bg-color)',
              color: 'var(--card-fg-color)',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </Flex>
      </Flex>
      {error && (
        <Text size={1} style={{color: 'var(--card-critical-fg-color)'}}>
          {error}
        </Text>
      )}
    </Stack>
  )
}
