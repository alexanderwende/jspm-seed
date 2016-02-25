import $ from 'jquery';
import template from './moduleC.html';

interface ModuleInterface {
    root: HTMLElement;
    header: string;
    content: string;
    start (): void;
    render (): void;
}

class ModuleC implements ModuleInterface {

    root: HTMLElement;
    header: string;
    content: string;

    constructor (root: HTMLElement) {

        this.root = root;

        this.header = 'I am Module C';

        this.content = 'I am the content of Module C.';
    }

    start () {

        this.render();
    }

    render () {

        let fragment = document.createDocumentFragment();

        let module = document.createElement('article');

        module.innerHTML = template({
            header: this.header,
            content: this.content
        });

        fragment.appendChild(module);

        $(this.root).append(fragment);
    }
}

export default ModuleC;
