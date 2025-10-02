# sanity-plugin-automatic-tagger

> A **Sanity Studio v3** plugin that automatically generates SEO keywords and tags for article content using AI-powered analysis via the OpenRouter API.

This plugin enhances your Sanity Studio by providing an intelligent tagging system that analyzes article content and suggests relevant SEO keywords. It integrates seamlessly into your article schema, allowing content creators to generate tags with a single click, improving content discoverability and search engine optimization.

## Features

- **AI-Powered Tagging**: Leverages advanced language models through OpenRouter API to generate relevant SEO keywords
- **Secure API Key Management**: Uses Sanity Studio Secrets for secure API key storage
- **Seamless Integration**: Adds a custom input component to your article schema's tag field
- **Real-time Generation**: Generate tags directly from article content without leaving the editor
- **Customizable Tag Count**: Choose how many tags to generate (3, 5, 8, 10, or 15)
- **Easy Configuration**: Built-in settings UI for managing API credentials
- **One-Click Clear**: Quickly remove all tags with a single button
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Customizable Models**: Support for different AI models via configuration
- **Beautiful UI**: Modern interface using Sanity UI components with dark mode support

## Installation

```sh
npm install sanity-plugin-automatic-tagger
```

## Configuration

### Step 1: Install Dependencies

Install the required secret management plugin:

```sh
npm install @sanity/studio-secrets
```

### Step 2: Configure Your Sanity Studio

Add the plugin to your `sanity.config.ts` (or `.js`) file:

```ts
import {defineConfig} from 'sanity'
import {automaticTagger} from 'sanity-plugin-automatic-tagger'

export default defineConfig({
  // ... your other config
  plugins: [
    automaticTagger(),
    // ... your other plugins
  ],
})
```

### Step 3: Configure API Credentials

1. Get your OpenRouter API key from [OpenRouter.ai](https://openrouter.ai/)
2. In Sanity Studio, navigate to **Tools** → **Automatic Tagger Settings**
3. Enter your credentials:
   - **OpenRouter API Key**: Your API key from OpenRouter
   - **OpenRouter Model** (optional): Model to use (default: `openai/gpt-4-mini`)

### Supported Models

You can use any model available through OpenRouter. Popular options include:
- `openai/gpt-4-mini` (default, recommended for cost-effectiveness)
- `openai/gpt-4`
- `openai/gpt-3.5-turbo`
- `anthropic/claude-3-haiku`
- `google/gemini-pro`

### Alternative: Environment Variables (Local Development)

For local development, you can also use environment variables:

```env
SANITY_STUDIO_OPENROUTER_API_KEY=your_api_key_here
SANITY_STUDIO_OPENROUTER_MODEL=openai/gpt-4-mini
```

**Note**: Secrets configured via the UI take precedence over environment variables.

## Usage

### Adding to Your Schema

Import and use the `SeoTagger` component in your document schema:

```ts
import {defineField, defineType} from 'sanity'
import {SeoTagger} from 'sanity-plugin-automatic-tagger'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // ... your other fields
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text', // or 'markdown', 'array', etc.
    }),
    defineField({
      name: 'tags',
      title: 'SEO Tags',
      type: 'array',
      of: [{type: 'string'}],
      components: {
        input: SeoTagger as any, // Using 'as any' to avoid type conflicts
      },
    }),
  ],
})
```

### Generating Tags

1. Create or edit a document with the `SeoTagger` component
2. Fill in your content field
3. In the tags field, click the **"Generate Tags"** button
4. The AI will analyze your content and populate the field with relevant SEO keywords
5. You can manually edit, add, or remove tags after generation

### Programmatic Usage

You can also use the tag generation function programmatically:

```ts
import {generateTags} from 'sanity-plugin-automatic-tagger'

const result = await generateTags("Your article content here")
if (result.keywords) {
  console.log('Generated keywords:', result.keywords)
} else {
  console.error('Error:', result.error)
}
```

## Deployment

### Security Best Practices

1. **Never commit `.env` files**: Ensure `.env` is in your `.gitignore`
2. **Use Studio Secrets for production**: Configure API keys via the Settings UI
3. **Secrets are stored securely**: Credentials are stored in Sanity's dataset with restricted access

### Deploy to Sanity

When deploying your Studio:

```bash
npx sanity deploy
```

API keys configured via the Settings UI will be automatically available in production.

## Troubleshooting

### Common Issues

**"OpenRouter API key not configured"**
- Configure your API key via **Tools** → **Automatic Tagger Settings**
- Or set `SANITY_STUDIO_OPENROUTER_API_KEY` environment variable
- Verify the API key is valid and has credits

**"API request failed with status 401"**
- Check that your OpenRouter API key is correct in the Settings
- Ensure the key hasn't expired or been revoked

**"API request failed with status 429"**
- You've exceeded your OpenRouter API rate limits
- Wait a few minutes before trying again, or upgrade your plan

**"No keywords were generated"**
- Ensure your article content is substantial enough for analysis
- Try using a different AI model in the Settings

**"Network error"**
- Check your internet connection
- Verify OpenRouter's API status

### Development Tips

- Use the browser's developer console for additional error details
- Test with different content lengths to understand optimal results
- The Settings UI provides instant feedback for configuration issues

## License

[MIT](LICENSE) © Jsnn

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
