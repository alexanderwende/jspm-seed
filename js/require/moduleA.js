define(['jquery', 'marionette', './moduleA.html'], function ($, Marionette, template) {

    'use strict';

    function ModuleA (root) {

        this.root = root;

        this.header = 'I am Module A';

        this.content = 'I am the content of Module A.';
    }

    ModuleA.prototype.start = function () {

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

        // this.render();
        this.renderView();
    };

    // a simple render method based on documentFragment
    ModuleA.prototype.render = function () {

        var fragment = document.createDocumentFragment();

        var module = document.createElement('article');

        // module.innerHTML = '<h2>{header}</h2><p>{content}</p>'
        //     .replace('{header}', this.header)
        //     .replace('{content}', this.content);

        module.innerHTML = template({
            header: this.header,
            content: this.content
        });

        fragment.appendChild(module);

        $(this.root).append(fragment);
    };

    // using marionette regions and views for rendering
    ModuleA.prototype.renderView = function () {

        this.region.show(this.view);
    };

    return ModuleA;
});
