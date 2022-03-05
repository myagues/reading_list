# Reading List

The program goes through a URL list parsing the web content and uses Mozilla's [Readability.js](https://github.com/mozilla/readability) to extract the body text, then saves all the content into a single HTML file.

I use this to aggregate multiple articles into a single file, and later convert it into an EPUB or Markdown file (with [pandoc](https://pandoc.org)) for ebook reading, which I find more pleasant than a computer screen or tablet. This is a very basic utility, for cross-platform and more features, just use services like [Pocket](https://getpocket.com) or similar.

## Usage

```bash
npm install
node reading_list.js
```