
import React, { useState, useCallback, ChangeEvent } from 'react';
import { UploadIcon } from './Icons';

interface ImageHandlerProps {
  onFileSelect: (file: File | null) => void;
}

const ImageHandler: React.FC<ImageHandlerProps> = ({ onFileSelect }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setImageUrl(null);
      setFileName('');
      onFileSelect(null);
    }
  }, [imageUrl, onFileSelect]);

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border-2 border-dashed border-slate-600 hover:border-indigo-500 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center space-y-4">
        {imageUrl ? (
          <div className="w-full">
            <p className="text-center text-slate-300 mb-4">Image Preview:</p>
            <img src={imageUrl} alt="Preview" className="max-w-full max-h-80 mx-auto rounded-md object-contain shadow-lg" />
            <p className="text-center text-sm text-slate-400 mt-2 truncate">{fileName}</p>
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <UploadIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 font-semibold text-slate-300">Click to upload or drag and drop</p>
            <p className="text-xs">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 focus-within:ring-indigo-500 text-center block mt-4"
      >
        <span>{imageUrl ? 'Change file' : 'Select a file'}</span>
      </label>
    </div>
  );
};

export default ImageHandler;
