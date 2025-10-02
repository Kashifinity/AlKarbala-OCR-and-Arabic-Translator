
import React from 'react';
import Loader from './Loader';
import { TranslateIcon } from './Icons';

interface ResultPanelProps {
  isLoading: boolean;
  ocrText: string;
  translatedText: string;
  error: string;
}

const ResultBox: React.FC<{ title: string; text: string; icon?: React.ReactNode }> = ({ title, text, icon }) => (
  <div className="bg-slate-800 rounded-lg p-4 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
    </div>
    <div className="flex-grow bg-slate-900 rounded-md p-3 text-slate-200 whitespace-pre-wrap overflow-y-auto text-sm font-mono">
      {text || <span className="text-slate-500">Waiting for result...</span>}
    </div>
  </div>
);

const ResultPanel: React.FC<ResultPanelProps> = ({ isLoading, ocrText, translatedText, error }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
        <p className="text-red-400 font-semibold">{error}</p>
      </div>
    );
  }
  
  const hasResults = ocrText || translatedText;

  if (!hasResults) {
    return (
        <div className="bg-slate-800/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-slate-700">
            <TranslateIcon className="h-16 w-16 text-slate-600 mb-4"/>
            <h2 className="text-xl font-bold text-slate-400">Your Results Will Appear Here</h2>
            <p className="text-slate-500 mt-2">Upload an image and click the button to get started.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-rows-2 gap-6 h-full">
      <ResultBox 
        title="Extracted Text (OCR)"
        text={ocrText}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
      />
      <ResultBox 
        title="English Translation" 
        text={translatedText}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13-4-4m0 0l4-4m-4 4h12" /></svg>}
      />
    </div>
  );
};

export default ResultPanel;
