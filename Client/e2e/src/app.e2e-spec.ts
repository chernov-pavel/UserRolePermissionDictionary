import {AppPage} from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
        page.navigateTo();
    });

    it('should equal tab bar values', () => {
        expect(element(by.id('usertab')).getText()).toEqual('Users');
        expect(element(by.id('roletab')).getText()).toEqual('Roles');
        expect(element(by.id('permissiontab')).getText()).toEqual('Permissions');
    });

    it('should open dialog window for create user', () => {
        element(by.id('createUserBtn'))
            .click()
            .then(() => {
                expect(element(by.id('createUserDialogTitleHeader')).getText()).toEqual('');
            });
    });

    it('should close dialog window for create user', () => {
        element(by.id('createUserBtn'))
            .click()
            .then(() => {
                element(by.id('cancelBtn')).click().then(() => {
                    expect(element(by.id('usertab')).getText()).toEqual('Users');
                    expect(element(by.id('roletab')).getText()).toEqual('Roles');
                    expect(element(by.id('permissiontab')).getText()).toEqual('Permissions');
                });
            });
    });

    it('should open roles component', () => {
        browser.setLocation('http://localhost:4200/roles').then(() => {
            expect(element(by.id('roleHeader')).getText()).toEqual('Role');
        });
    });

    it('should open dialog window role component', () => {
        browser.setLocation('http://localhost:4200/roles')
            .then(() => {
                element(by.id('createRoleBtn'))
                    .click()
                    .then(() => {
                        expect(element(by.id('createRoleDialogHeader')).getText()).toEqual('Create new role');
                    });
            });
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
