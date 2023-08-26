export interface LaunchesAPICall{
    config: object,
    data: LaunchData[],
    headers: object,
    request: object,
    status: number,
    statusText: string,     
}

export interface LaunchData{
    auto_update: boolean,
    capsules: [],
    cores: [],
    crew: [],    
    date_local: string,
    date_precision: string,
    date_utc: string,
    details: string,
    failures: object[],
    fairings: object,
    flight_number: number,
    id: string,
    launch_library_id: null,
    launchpad: string,
    links: object,
    name: string,
    net: boolean,
    payloads: string[],
    rocket: string,
    ships: string[],
    static_fire_date_unix: number,
    static_fire_data_utc: string,
    success: boolean,
    tbd: boolean,
    upcoming: boolean,
    window: number
}

export interface FilteredLaunchData{
    name: string,
    success: boolean,
    launchpadID: string,
    details: string,
    launchDate: string,
    rocketID: string
}
