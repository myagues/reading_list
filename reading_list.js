
const Readability = require('readability'),
  pandoc = require('node-pandoc'),
  jsdom = require("jsdom"),
  { JSDOM } = jsdom,
  now = new Date(),
  args = '-f html -t epub -o reading_list_' + now.toDateString().replace(/\s/g, '_') + '.epub',
  // args = '-f html -t markdown -o reading_list_' + now.toDateString().replace(/\s/g, '_') + '.md',
  uri_list = [
    'https://longreads.com/2018/10/02/webzines-90s-online-media',
    'https://www.theatlantic.com/technology/archive/2018/11/why-ratings-and-feedback-forms-dont-work/575455',
    'https://www.nytimes.com/2018/12/17/science/donald-knuth-computers-algorithms-programming.html',
    'https://www.wired.com/story/mirai-botnet-minecraft-scam-brought-down-the-internet',
    'https://www.theverge.com/2018/4/16/17233946/olpcs-100-laptop-education-where-is-it-now'
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
  await Promise.all(uri_list.map(async (uri) => {
    await getText(uri).then(webText => {
      let dom = new JSDOM(webText, {features: {
        FetchExternalResources: false,
        ProcessExternalResources: false}});
      let article = new Readability(dom.window.document).parse();
      web_content += ('<h1>' + article.title + '</h1>' + article.content);
    }, err => {
      console.log(err);
    });
  }));
  console.log('Webpages processed!')
  // Set callback function
  callback = function (err, _) {
    if (err) console.error(err)};
    // return console.log(result), result};
  pandoc(web_content, args, callback);
})();

