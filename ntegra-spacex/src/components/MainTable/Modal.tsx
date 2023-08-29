import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ModalProps} from './TableTypes';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import '../../styling/Modal.css'
import { TableContainer } from '@mui/material';
import { Link } from 'react-router-dom';


const ModalComponent = ({openModal, handleClose, specificLaunchData}: ModalProps): JSX.Element => {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid ',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };
    
  return(<>
     <div>
    
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton
          aria-label="close"        
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
          <Typography align="center" className='modal-title'variant="h4" component="h2">
          Data for {specificLaunchData.name}
          </Typography>
          
            <Table>
              <TableBody>          
              <TableRow>                  
                  <TableCell className='modal-cell-title' align="center">Launch Date</TableCell>
                  <TableCell className='modal-cell-title' align="center">Rocket ID</TableCell>
                  <TableCell className='modal-cell-title' align="center">Launchpad ID</TableCell>
                  <TableCell className='modal-cell-title' align="center">Success</TableCell>
                  <TableCell className='modal-cell-title' align="center">Details</TableCell>
              </TableRow>
              <TableRow>                  
                  <TableCell align="center">{specificLaunchData.launchDate}</TableCell>
                  <TableCell align="center">{specificLaunchData.launchDate}</TableCell>
                  <TableCell align="center">{specificLaunchData.launchpadID}</TableCell>
                  <TableCell align="center">{specificLaunchData.success.toString()}</TableCell>
                  <TableCell align="center">{specificLaunchData.details}</TableCell>
              </TableRow>  
              </TableBody>
            </Table>
        
        </Box>
      </Modal>
    </div>
    </>)
}

export default ModalComponent