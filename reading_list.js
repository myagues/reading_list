
const Readability = require('readability'),
  fs = require('fs'),
  { JSDOM } = require("jsdom"),
  now = new Date(),
  url_list = [
    'https://grafik.agency/insight/waveofthefuture',
    'https://www.vice.com/en/article/xwqjg3/the-complete-untold-history-of-halo-an-oral-history',
  ];

const getText = url => {
  return new Promise((resolve, reject) => {
    try {
      const htmlObject = JSDOM.fromURL(url).then(dom => {
        return dom.serialize();
      });
      resolve(htmlObject);
    }
    catch(error) {
      reject(error);
    }
  });
};

let web_content = "<html><head><meta charset='utf-8'><title>Reading list</title></head>";
(async function(){
  await Promise.all(url_list.map(async (url) => {
    await getText(url).then(webText => {
      let dom = new JSDOM(webText, {features: {resources: "usable"}});
      let article = new Readability(dom.window.document).parse();
      web_content += ('<h1>' + article.title + '</h1>' + article.content + '\n');
    }, err => {
      console.log(err);
    });
  }));
  console.log('Webpages processed!')
  // Set callback function
  callback = function (err, _) {
    if (err) console.error(err)};
    // return console.log(result), result};
  fs.writeFile(now.toDateString().replace(/\s/g, '_') + '.html', web_content, callback)
})();

