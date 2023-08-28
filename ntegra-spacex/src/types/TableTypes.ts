import { FilteredLaunchData } from "./APICallTypes";

export interface ModalProps{
    openModal: boolean,
    handleClose: () => void,   
    specificLaunchData: FilteredLaunchData
}