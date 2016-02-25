import ModuleB from './moduleB';

describe('ModuleB', function () {

    describe('ModuleB.constructor', function () {

        it('should create a module instance', function () {

            let moduleB = new ModuleB();

            expect(moduleB).toEqual(jasmine.any(ModuleB));

            expect(moduleB.root).toBeUndefined();
            expect(moduleB.header).toMatch('I am Module B');
            expect(moduleB.content).toMatch('I am the content of Module B.');
        });
    });
});
