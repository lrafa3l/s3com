import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { cohere } from '@ai-sdk/cohere';
import { mistral } from '@ai-sdk/mistral';
import { deepseek } from '@ai-sdk/deepseek';
import { createOllama } from 'ollama-ai-provider-v2';
import { xai } from '@ai-sdk/xai';

const ollama = createOllama({
    baseURL: process.env.OLLAMA_HOST || "http://localhost:11434/api",
});

export const getModel = (modelName: string) => {
    const availableModels = {
        'gemini-2.5-flash': google('gemini-2.5-flash'),
        'gpt-4': openai('gpt-4o-mini'),
        'deepSick': deepseek('deepseek-chat'),
        'magistral-small-2506': mistral('magistral-small-2506'),
        'command-a-03-2025': cohere('command-a-03-2025'),
        'llama3.1': ollama('llama3.1'),
        'grok-2': xai('grok-2'),
    };
    return availableModels[modelName as keyof typeof availableModels] || availableModels['gemini-2.5-flash'];
};

export const AI_CONFIG = {
    maxDuration: 30,
    maxSteps: 7,
    systemMessage: `Você é Julia, uma assistente de saúde especializada. Seja prestativa, empática e profissional.`
} as const;