import ModuleA from './require/moduleA';
import ModuleB from './system/moduleB';
import ModuleC from './typescript/moduleC.ts'

export default {

    start (message = 'App loaded...') {

        let paragraph = document.createElement('p');

        paragraph.innerHTML = message;

        document.querySelector('body > main').appendChild(paragraph);

        let moduleA = new ModuleA(document.querySelector('.module-a'));

        moduleA.start();

        let moduleB = new ModuleB(document.querySelector('.module-b'));

        moduleB.start();

        let moduleC = new ModuleC(document.querySelector('.module-c'));

        moduleC.start();
    }
};
