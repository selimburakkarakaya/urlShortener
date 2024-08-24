import { Model, ModelStatic } from 'sequelize/types';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateShortUrl = async (
    length: number = 6, 
    model: ModelStatic<Model<any, any>>, 
    domain: string = "yapilir.com"
): Promise<string> => {
    let shortUrl = '';
    const charactersLength = characters.length;

    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
        shortUrl = '';
        for (let i = 0; i < length; i++) {
            shortUrl += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const existingUrl = await model.findOne({ where: { shortUrl } });

        if (!existingUrl) {
            isUnique = true;
        } else {
            attempts++;
        }
    }

    if (!isUnique) {
        throw new Error('Failed to generate a unique short URL after multiple attempts.');
    }

    const fullUrl = `${domain}/${shortUrl}`;
    return fullUrl;
};
