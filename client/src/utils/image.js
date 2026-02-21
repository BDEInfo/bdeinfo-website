import { publicURL } from '@config/connection'

const sizeOptions = [
    'large',
    'medium',
    'small',
    'thumbnail'
]

const missingImage = 'assets/missingImage.png'

export function getImage (imageObject, size = 'medium', defaultImage) {

    if (!imageObject || imageObject.data === null) {
        if (defaultImage) imageObject = defaultImage
        else return missingImage
    }

    const sizeIndex = sizeOptions.indexOf(size)
    if (sizeIndex < 0) return defaultImage?.url || missingImage
    for (const sizeOption of sizeOptions.slice(sizeIndex)) {
        if (imageObject?.formats?.[sizeOption]?.url) return publicURL + imageObject.formats[sizeOption].url
    }
    
    return publicURL + imageObject.url
}