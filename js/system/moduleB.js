import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'marionette';
import template from './moduleB.html';

class ModuleB {

    constructor (root) {

        this.root = root;

        this.header = 'I am Module B';

        this.content = 'I am the content of Module B.';
    }

    start () {

        var module = this;

        this.region = new Marionette.Region({
            el: this.root
        });

        this.view = new Marionette.ItemView({
            tagName: 'article',
            template: template,
            templateHelpers: function () {
                return {
                    header: module.header,
                    content: module.content
                };
            }
        });

        this.renderView();
    }

    render () {

        let fragment = document.createDocumentFragment();

        let module = document.createElement('article');

        // module.innerHTML = `<h2>${this.header}</h2><p>${this.content}</p>`;

        module.innerHTML = template({
            header: this.header,
            content: this.content
        });

        fragment.appendChild(module);

        $(this.root).append(fragment);
    }

    renderView () {

        this.region.show(this.view);
    }
}

export default ModuleB;
