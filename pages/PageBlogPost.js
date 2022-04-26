import { PageTemplate } from '../lib/PageTemplate.js';

import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

class PageBlogPost extends PageTemplate {
  /**
   * Sabloninio puslapio konstruktorius.
   * @constructor
   * @param {object} data Duomenu objektas
   */
  constructor(data) {
    super(data);
    this.pageCSSfileName = 'blog-post';
  }

  async getPostData() {
    const url = this.data.trimmedPath.split('/')[1];
    const content = await file.read('blog', url + '.json');
    const blogPost = utils.parseJSONtoObject(content[1]);
    const user = await file.read('accounts', blogPost.author + '.json');
    const userName = utils.parseJSONtoObject(user[1]);
    blogPost['name'] = userName.username;

    return blogPost;
  }

  isValidPost(post) {
    if (post.title === '' || post.content === '') {
      return false;
    }
    return true;
  }

  badPostHTML() {
    return `<section class="container blog-inner">
                    <h1 class="row title">500</h1>
                    <p class="row">Something's wrong with server. Please, come back later.</p>
                </section>`;
  }

  correctPostHTML(post) {
    return `<section class="container blog-inner">
                    <h1 class="row title">${post.title}</h1>
                    <p class="row">${post.content}</p>
                    <footer class="row">${post.name}</footer>
                </section>`;
  }

  async mainHTML() {
    const postData = await this.getPostData();
    if (this.isValidPost(postData)) {
      return this.correctPostHTML(postData);
    } else {
      return this.badPostHTML();
    }
  }
}

export { PageBlogPost };
