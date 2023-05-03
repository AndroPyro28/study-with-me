import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 export const cloudinaryUpload = async (base64: string, upload_preset: string)  =>{
    try {
      console.log('base6444', {file: base64})
        const result = await cloudinary.uploader.upload(base64, {
          upload_preset,
          resource_type: 'auto',
        });
        return {
          secure_url: result.url,
          public_id: result.public_id,
        } as {secure_url: string, public_id: string };

      } catch (error) {
        console.error('error cloudinary upload', error)
      }
}