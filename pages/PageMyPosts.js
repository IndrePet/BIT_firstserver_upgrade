import { PageTemplate } from '../lib/PageTemplate.js';

import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

class PageMyPosts extends PageTemplate {
  /**
   * Sabloninio puslapio konstruktorius.
   * @constructor
   * @param {object} data Duomenu objektas
   */
  constructor(data) {
    super(data);
    this.pageCSSfileName = 'blog';
  }

  emptyListHTML() {
    return `<div class="row empty-list">Looks like you haven't posted anything yet 🤔👀😭</div>`;
  }

  getBlogData = async () => {
    const data = [];
    const list = this.data.user.postsSlugList;

    for (const post of list) {
      const [err, content] = await file.read('blog', post + '.json');
      if (post[0] === '.') {
        continue;
      }

      if (err) {
        continue;
      }

      let obj = utils.parseJSONtoObject(content);
      if (!obj) {
        continue;
      }

      data.push(obj);
    }

    return data.sort((a, b) => b.lastUpdated - a.lastUpdated);
  };

  emptyListHTML() {
    return `<div class="row empty-list">Looks like blog list is empty right now 🤔👀😭</div>`;
  }

  blogListHTML(data) {
    let HTML = '';

    for (const post of data) {
      HTML += `<div class="post">
                        <div class="post-edit">
                          <a href="/post-edit"><i class="fa fa-edit"></i></a>
                          <a href="#"><i class="fa fa-trash"></i></a>
                        </div>
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-description">${this.shortenText(
                          post.content
                        )}</div>
                        <a href="/blog/${
                          post.slug
                        }" class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>`;
    }

    return `<div class="row list">${HTML}</div>`;
  }

  shortenText(text) {
    const limit = 100;
    const hardLimit = 130;
    if (text.length < hardLimit) {
      return text;
    }

    let partText = text.slice(0, limit);
    partText = partText.split('').reverse().join('');
    partText = partText.slice(partText.indexOf(' ') + 1);
    partText = partText.split('').reverse().join('');

    return partText + '...';
  }

  async mainHTML() {
    const blogFiles = await this.getBlogData();
    return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    ${
                      blogFiles.length === 0
                        ? this.emptyListHTML()
                        : this.blogListHTML(blogFiles)
                    }
                </section>`;
  }
}
export { PageMyPosts };
