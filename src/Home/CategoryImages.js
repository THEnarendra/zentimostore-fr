// utils/categoryImages.js
const categoryImageMap = {
    'Frames': 'https://res.cloudinary.com/dvqbujync/image/upload/v1741348623/ujcmrg72q63zkkvhcskv.jpg',
    'Photo Frames': 'https://res.cloudinary.com/dvqbujync/image/upload/v1741599755/zgf7urfhhpoqzcujceql.jpg',
    'Posters': 'https://res.cloudinary.com/dvqbujync/image/upload/v1741607471/uje0xobo7xeunqxya2wm.jpg',
    // Add all your categories here
  };
  
  export const getCategoryImage = (categoryName) => {
    return categoryImageMap[categoryName] || 'https://res.cloudinary.com/your-account/image/upload/v1/default-category.jpg';
  };