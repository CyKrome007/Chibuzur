import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmDeleteDialogue = ({ open, handleClose, deleteHandler}) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this group? This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>No</Button>
                    <Button color='primary' onClick={deleteHandler}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDialogue;
