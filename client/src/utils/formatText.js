import React from 'react'

export function escapeNewLine (string) {

    return string.split('\n').map((item, index) => {
        return (index === 0) ? item : [<br key={index} />, item]
    })
}