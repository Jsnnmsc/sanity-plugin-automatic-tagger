import {ArrayOfPrimitivesInputProps} from 'sanity'

export interface GenerateButtonProps {
  isLoading: boolean
  error: string | null
  onGenerate: () => void
  onClearAll: () => void
  maxTags: number
  onMaxTagsChange: (value: number) => void
}

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface SeoTaggerProps extends ArrayOfPrimitivesInputProps {}
/* eslint-enable @typescript-eslint/no-empty-object-type */
