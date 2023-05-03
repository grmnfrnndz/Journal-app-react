import {authSlice} from "../../../src/store/auth";

describe('test on authSlice', function () {

    test('should be return initialstate and called auth', () => {

        expect(authSlice.name).toBe('auth');

    })

});