
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageHandler from './components/ImageHandler';
import ResultPanel from './components/ResultPanel';
import { extractTextFromImage, translateArabicToEnglish } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const resetState = () => {
    setOcrText('');
    setTranslatedText('');
    setError('');
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      resetState();
    }
  };

  const handleProcessImage = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    resetState();

    try {
      const { base64Data, mimeType } = await fileToBase64(selectedFile);
      
      const extractedText = await extractTextFromImage(base64Data, mimeType);
      if (!extractedText.trim()) {
        setOcrText('No text found in the image.');
        setIsLoading(false);
        return;
      }
      setOcrText(extractedText);

      // Simple check if text could be Arabic before attempting translation
      // This regex checks for characters in the Arabic Unicode block.
      const arabicRegex = /[\u0600-\u06FF]/;
      if (arabicRegex.test(extractedText)) {
        const translation = await translateArabicToEnglish(extractedText);
        setTranslatedText(translation);
      } else {
        setTranslatedText('The extracted text does not appear to be Arabic, so no translation was performed.');
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred during processing. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <ImageHandler onFileSelect={handleFileSelect} />
            <button
              onClick={handleProcessImage}
              disabled={!selectedFile || isLoading}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center text-lg shadow-lg"
            >
              {isLoading ? 'Processing...' : 'Extract & Translate Text'}
            </button>
          </div>
          <ResultPanel
            isLoading={isLoading}
            ocrText={ocrText}
            translatedText={translatedText}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
