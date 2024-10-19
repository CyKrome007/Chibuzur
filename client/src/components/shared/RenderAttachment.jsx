import {transformImage} from "../../lib/features.js";
import {FileOpen as FileOpenIcon} from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const RenderAttachment = ({ file = 'file', url = '' }) => {
    switch (file) {
        case 'image':
            return <img
                src={transformImage(url, 200)}
                alt={'Attachment'}
                width={'200px'}
                height={'150px'}
                style={{
                    objectFit: 'contain'
                }}
            />
        case 'video':
            return <video src={url} preload={'none'} width={'200px'} controls={true} />
        case 'audio':
            return <audio src={url} preload={'none'} controls={true} />
        default:
            return <FileOpenIcon />
    }
}

export default RenderAttachment;
