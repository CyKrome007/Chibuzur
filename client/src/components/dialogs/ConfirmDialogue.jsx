import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmDialogue = (
    {
        title = 'Confirm Delete?',
        message = 'Are you sure you want to delete this group? This cannot be undone.',
        open,
        handleClose,
        confirmHandler
    }) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>No</Button>
                    <Button color='primary' onClick={confirmHandler}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialogue;
