import apiURL from '@config/connection'

const sizeOptions = [
    'large',
    'medium',
    'small',
    'thumbnail'
]

const missingImage = 'assets/missingImage.png'

export function getImage (imageObject, size = 'medium', defaultImage) {

    if (!imageObject) {
        if (defaultImage) imageObject = defaultImage
        else return missingImage
    }

    const sizeIndex = sizeOptions.indexOf(size)
    if (sizeIndex < 0) return defaultImage.url
    for (const sizeOption of sizeOptions.slice(sizeIndex)) {
        if (imageObject?.formats[sizeOption]?.url) return apiURL + imageObject.formats[sizeOption].url
    }
    return apiURL + imageObject.url
}