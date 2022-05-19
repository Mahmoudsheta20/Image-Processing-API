import sharp from 'sharp';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 10 });
const imageconvert = async (
    img: string,
    width: number,
    height: number,
    newImage: string
):Promise<unknown> => {
    try {
        if (
            cache.get('imageName') === newImage &&
      cache.get('width') === width &&
      cache.get('height') === height
        ) {
            console.log('cache');

            return newImage;
        } else {
    
           await sharp(img)
                .resize({ width: width, height: height })
                .toFile(newImage);
            cache.set('imageName', newImage);
            cache.set('width', width);
            cache.set('height', width);
       
        }
    } catch (err) {
        console.log(err);
    }
};

export { cache, imageconvert };
