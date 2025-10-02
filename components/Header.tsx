
import React from 'react';
import { DocumentTextIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center gap-4">
        <DocumentTextIcon className="w-12 h-12 text-indigo-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          AlKarbala OCR & Arabic Translator
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Upload a scanned document image, and our AI will extract the text. If Arabic is detected, it will be translated into English.
      </p>
    </header>
  );
};

export default Header;
