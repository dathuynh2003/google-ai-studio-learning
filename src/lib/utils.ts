import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI client
export const initializeGeminiAI = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

// Utility function to format API responses
export const formatResponse = <T>(data: T, success: boolean = true, message?: string) => {
  return {
    success,
    data: success ? data : undefined,
    error: success ? undefined : (data as string),
    message,
  };
};

// Utility function to handle async operations with error handling
export const withErrorHandling = async <T>(
  operation: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

// Environment variables validation
export const getEnvVariable = (name: string, required: boolean = true): string => {
  const value = process.env[name];
  
  if (required && !value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  
  return value || '';
};

// Simple logging utility
export const logger = {
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
};