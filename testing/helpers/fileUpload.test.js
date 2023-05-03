import { v2 as cloudinary } from 'cloudinary';

import {fileUpload} from "../../src/helpers/fileUpload.js";

cloudinary.config({
    cloud_name: 'dwzeydb7o',
    api_key: '415738289356667',
    api_secret: 'tL-NU1WG4qjdL9tPJVFPoZI4Hvc',
    secure: true
});


describe('test on fileUpload', function () {

    test('should be load file (image) to cloudinary', async () => {

        // warning cors
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        expect(url).toContain('https');


        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        // console.log(imageId);

        const cloudinaryResponse = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });

        // console.log({cloudinaryResponse});


    });

    test('should be return null', async () => {

        // empty image
        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect(null).toBe(null);

    });


});
