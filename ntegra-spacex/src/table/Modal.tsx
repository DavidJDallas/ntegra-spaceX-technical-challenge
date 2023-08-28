import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ModalProps} from '../types/TableTypes';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ModalComponent = ({openModal, handleClose, specificLaunchData}: ModalProps) => {
    return(<>
     <div>
    
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {specificLaunchData.name && specificLaunchData.name}
          </Typography>
          <TableRow>
                  
            <TableCell className='column-title' align="right">Launch Date</TableCell>
            <TableCell className='column-title' align="right">Rocket ID</TableCell>
            <TableCell className='column-title' align="center">Launchpad ID</TableCell>
            <TableCell className='column-title' align="center">Success</TableCell>
            <TableCell className='column-title' align="center">Details</TableCell>
          </TableRow>
          <TableRow>
                  
                  <TableCell className='column-row' align="right">{specificLaunchData.launchDate}</TableCell>
                  <TableCell className='column-row' align="right">{specificLaunchData.launchDate}</TableCell>
                  <TableCell className='column-row' align="center">{specificLaunchData.launchpadID}</TableCell>
                  <TableCell className='column-row' align="center">{specificLaunchData.success}</TableCell>
                  <TableCell className='column-row' align="center">{specificLaunchData.details}</TableCell>
                </TableRow>
        </Box>
      </Modal>
    </div>
    </>)
}

export default ModalComponent