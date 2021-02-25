const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const getPages = () => {
  const files = fs.readdirSync('cms-pages');
  const pagesJSON = [];

  files.forEach((file) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join('cms-pages', file))
      .toString();
    const { data } = matter(markdownWithMetadata);
    pagesJSON.push(data);
  });

  fs.writeFileSync('pages/pages.json', JSON.stringify(pagesJSON));
};

getPages();
