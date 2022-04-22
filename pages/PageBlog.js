import { PageTemplate } from '../lib/PageTemplate.js';

import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

class PageBlog extends PageTemplate {
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
    return `<div class="row empty-list">Looks like blog list is empty right now 🤔👀😭</div>`;
  }

  getPostData = async () => {
    const data = [];
    const [err, blogPosts] = await file.list('blog');
    if (err) {
      return data;
    }

    for (const post of blogPosts) {
      const [err, content] = await file.read('blog', post);
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

    return data;
  };

  async blogListHTML() {
    const renderList = async () => {
      const postFileName = await this.getPostData();
      if (postFileName.length === 0) {
        return this.emptyListHTML();
      }

      let HTML = '';
      for (const post of postFileName) {
        HTML += `<div class="post">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-description">${this.shortenText(
                          post.content
                        )}</div>
                        <a href="./${post.slug}"class="read-more">
                            Read more<i class="icon fa fa-angle-right"></i>
                        </a>
                    </div>`;
      }
      return HTML;
    };

    return `<div class="row list">
                    ${await renderList()}   
            </div>`;
  }

  shortenText(text) {
    const textArray = text.split(' ');
    const arr = [];

    for (const word of textArray) {
      if (arr.join(' ').length > 100) {
        break;
      }

      arr.push(word);
    }

    const shortDsc = arr.join(' ');

    return text.length < 100 ? text : shortDsc + '...';
  }

  async mainHTML() {
    return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    ${await this.blogListHTML()}
                </section>`;
  }
}
export { PageBlog };
