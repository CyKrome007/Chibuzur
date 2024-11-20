import {ListItemText, Menu, MenuItem, MenuList, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsFileMenu, setUploadingLoader} from "../../redux/reducers/misc.js";
import {AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoIcon} from "@mui/icons-material";
import {useRef} from "react";
import toast from "react-hot-toast";
import {useSendAttachmentsMutation} from "../../redux/api/api.js";

const FileMenu = ({ anchorE1, chatId }) => {

    const {isFileMenu} = useSelector(state => state.misc);

    const dispatch = useDispatch();

    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);

    const [sendAttachments] = useSendAttachmentsMutation();


    const selectRef = (ref) => ref.current?.click();

    const fileChangeHandler = async (e, key) => {
        const files = Array.from(e.target.files);


        if(files.length <= 0) return;
        if(files.length > 5) return toast.error(`Cannot Send More Than 5 ${key} as once`);

        dispatch(setUploadingLoader(true));

        const toastId = toast.loading(`Sending ${key}...`);

        dispatch(setIsFileMenu(false));
        try {
            const formData = new FormData();
            formData.append('chatId', chatId);
            files.forEach((file) => {
                formData.append('files', file)
            });

            const res = await sendAttachments(formData);

            if(res.data)
                toast.success(`${key} set successfully!`, {id: toastId});
            else
                toast.error(`Failed to send ${key}`, {id: toastId});

        } catch (e) {
            toast.error(e, {id: toastId})
        } finally {
            dispatch(setUploadingLoader(false));
        }
    };

    return (
        <Menu
            open={isFileMenu}
            anchorEl={anchorE1}
            onClose={() => dispatch(setIsFileMenu(false))}
        >
            <div
                style={{
                    width: "10rem",
                }}
            >
                <MenuList>
                    <MenuItem onClick={() => selectRef(imageRef)}>
                        <Tooltip title={'Image'}>
                            <ImageIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: '.5rem'}}>Image</ListItemText>
                        <input
                            type={"file"}
                            multiple
                            accept={'image/heif, image/gif, image/jpeg, image/png'}
                            style={{
                                display: 'none'
                            }}
                            ref={imageRef}
                            onChange={(e) => fileChangeHandler(e, 'images')}
                        />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(audioRef)}>
                        <Tooltip title={'Audio'}>
                            <AudioFileIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: '.5rem'}}>Audio</ListItemText>
                        <input
                            type={"file"}
                            multiple
                            accept={'audio/mpeg, audio/aac, audio/wav, audio/ogg, audio/mp3'}
                            style={{
                                display: 'none'
                            }}
                            ref={audioRef}
                            onChange={(e) => fileChangeHandler(e, 'audios')}
                        />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(videoRef)}>
                        <Tooltip title={'Video'}>
                            <VideoIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: '.5rem'}}>Video</ListItemText>
                        <input
                            type={"file"}
                            multiple
                            accept={'video/mp4, video/webm, video/ogg, video/mkv'}
                            style={{
                                display: 'none'
                            }}
                            ref={videoRef}
                            onChange={(e) => fileChangeHandler(e, 'videos')}
                        />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(fileRef)}>
                        <Tooltip title={'File'}>
                            <UploadFileIcon />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: '.5rem'}}>File</ListItemText>
                        <input
                            type={"file"}
                            multiple
                            accept={'*'}
                            style={{
                                display: 'none'
                            }}
                            ref={fileRef}
                            onChange={(e) => fileChangeHandler(e, 'files')}
                        />
                    </MenuItem>
                </MenuList>
            </div>
        </Menu>
    )
}

export default FileMenu;
