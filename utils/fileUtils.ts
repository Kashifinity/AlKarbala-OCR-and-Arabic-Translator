
/**
 * Converts a File object into a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with an object containing the base64 data and the file's MIME type.
 */
export const fileToBase64 = (file: File): Promise<{ base64Data: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result is a data URL: "data:image/jpeg;base64,..."
      // We need to split it to get the base64 part.
      const base64Data = result.split(',')[1];
      if (base64Data) {
        resolve({ base64Data, mimeType: file.type });
      } else {
        reject(new Error("Failed to read base64 data from file."));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
