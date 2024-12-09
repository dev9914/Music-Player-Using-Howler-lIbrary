export const generateUniqueFilename = (originalName) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueSuffix + path.extname(originalName); // Generate unique file name
  };