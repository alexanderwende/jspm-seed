import ModuleC from './moduleC.ts';

describe('ModuleC', function () {

    describe('ModuleC.constructor', function () {

        it('should create a module instance', function () {

            let moduleC = new ModuleC();

            expect(moduleC).toEqual(jasmine.any(ModuleC));

            expect(moduleC.root).toBeUndefined();
            expect(moduleC.header).toMatch('I am Module C');
            expect(moduleC.content).toMatch('I am the content of Module C.');
        });
    });
});
