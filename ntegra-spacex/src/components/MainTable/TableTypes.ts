import { FilteredLaunchData } from "../../services/APICalls/APICallTypes";

export interface ModalProps{
    openModal: boolean,
    handleClose: () => void,   
    specificLaunchData: FilteredLaunchData
}