// OpenRouter API utility for generating SEO keywords from article content

/**
 * Response interface for OpenRouter chat completions API
 */
interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

/**
 * Result type for the getSEOKeywords function
 */
export interface SEOKeywordsResult {
  keywords: string[] | null
  error: string | null
}

/**
 * Generates SEO keywords from article content using OpenRouter API
 * @param content - The article content to analyze
 * @param apiKey - Optional API key (from secrets or env)
 * @param model - Optional model name
 * @param maxKeywords - Maximum number of keywords to generate (default: 5)
 * @returns Promise resolving to an object with keywords array or error message
 */
export async function getSEOKeywords(
  content: string,
  apiKey?: string,
  model?: string,
  maxKeywords: number = 5,
): Promise<SEOKeywordsResult> {
  // Retrieve API key from parameters, secrets, or environment variables
  const finalApiKey =
    apiKey ||
    process.env.SANITY_STUDIO_OPENROUTER_API_KEY ||
    process.env.OPENROUTER_API_KEY

  if (!finalApiKey) {
    return {
      keywords: null,
      error:
        'OpenRouter API key not configured. Please configure it in Studio Secrets or environment variables.',
    }
  }

  // Get model from parameters or environment, default to GPT-4 mini
  const finalModel =
    model ||
    process.env.SANITY_STUDIO_OPENROUTER_MODEL ||
    process.env.OPENROUTER_MODEL ||
    'openai/gpt-4-mini'

  try {
    // Make API request to OpenRouter chat completions endpoint
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${finalApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: finalModel,
        messages: [
          {
            role: 'system',
            content: `You are an SEO expert. Generate exactly ${maxKeywords} relevant SEO keywords for the given article content. Return only the keywords separated by commas, no other text. Focus on the most important and relevant keywords.`,
          },
          {
            role: 'user',
            content,
          },
        ],
      }),
    })

    // Check if the response is successful
    if (!response.ok) {
      return {
        keywords: null,
        error: `API request failed with status ${response.status}: ${response.statusText}`,
      }
    }

    // Parse the JSON response
    const data: OpenRouterResponse = await response.json()

    // Extract keywords from the response
    const keywordsText = data.choices[0]?.message?.content
    if (!keywordsText) {
      return {keywords: null, error: 'No keywords were generated from the API response.'}
    }

    // Parse keywords from comma-separated string
    const keywords = keywordsText
      .split(',')
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)

    return {keywords, error: null}
  } catch (error) {
    // Handle network or parsing errors
    return {
      keywords: null,
      error: `An error occurred while calling the OpenRouter API: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
