import { FilteredLaunchData } from "./APICallTypes";

export interface ModalProps{
    openModal: boolean,
    handleClose: any,   
    specificLaunchData: FilteredLaunchData
}