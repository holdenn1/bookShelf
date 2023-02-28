import React, {useEffect, useState} from 'react';
import previewAvatar from './../../img/book.jpg'

interface IBookCover {
    file: string
}


function PreviewCover({file}: IBookCover) {
    const [preview, setPreview] = useState(previewAvatar)
    useEffect(() => {
        if (file.length > 0) {
            setPreview(file)
        }

    }, [])

    return (
        <img src={preview}/>
    );
}

export default PreviewCover;