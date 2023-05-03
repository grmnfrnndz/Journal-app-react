export const fileUpload = async (file) => {
    // if (!file) throw new Error('file is required');
    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwzeydb7o/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('error upload file');

        const cloudResponse = await response.json();

        return cloudResponse.secure_url;
    } catch (err) {
        // throw new Error(err.message);
        return null;
    }
}


