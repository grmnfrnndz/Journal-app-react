// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';
import {getEnvironments} from "./src/helpers/index.js";

require('dotenv').config({
    path: '.env.test'
});

jest.mock("./src/helpers/index.js", () => ({
    getEnvironments: () => ({
        ...process.env
    })
}))

