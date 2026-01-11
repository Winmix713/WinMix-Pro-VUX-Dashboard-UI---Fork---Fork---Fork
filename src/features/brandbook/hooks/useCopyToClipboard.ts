import { useState, useCallback } from 'react';

/**
 * Hook for copying text to clipboard with temporary feedback
 */
export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  }, []);
  return {
    copiedText,
    copy
  };
};