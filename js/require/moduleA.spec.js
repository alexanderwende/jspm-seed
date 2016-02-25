import ModuleA from './moduleA';

describe('ModuleA', function () {

    describe('ModuleA.constructor', function () {

        it('should create a module instance', function () {

            let moduleA = new ModuleA();

            expect(moduleA).toEqual(jasmine.any(ModuleA));

            expect(moduleA.root).toBeUndefined();
            expect(moduleA.header).toMatch('I am Module A');
            expect(moduleA.content).toMatch('I am the content of Module A.');
        });
    });
});
