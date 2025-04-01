export const toSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-"); // Convert "Anime Frames" → "anime-frames"
  };
  
  export const fromSlug = (slug) => {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()); // Convert "anime-frames" → "Anime Frames"
  };
  