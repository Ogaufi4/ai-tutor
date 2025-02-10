'use client';

import { useState } from 'react';
import { Paperclip } from 'lucide-react';

export default function UploadComponent() {
  const [files, setFiles] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
    
    // Here, you would implement the logic to send files to your backend
    console.log('Uploading files:', files);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 m-4 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <Paperclip size={24} />
      </button>

      {isExpanded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
              <label htmlFor="fileInput" className="cursor-pointer text-center p-4 md:p-8">
                <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your file</span> or drag and drop your file here</p>
              </label>
              <input id="fileInput" type="file" multiple onChange={handleFileChange} className="hidden" />
            </div>
            
            {files.length > 0 && (
              <ul className="mt-2 text-sm">
                {files.map((file, index) => (
                  <li key={index} className="text-gray-700">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            )}
            
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
            >
              Upload
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}