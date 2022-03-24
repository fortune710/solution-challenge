export interface Cpuload {
    cpuCount: number;
    efficiency: number;
}

export interface CloudOptions{
    cloudProvider:'gcp'|'azure'|'aws', 
    region:string, 
    duration:number, 
    timeUnit:'ms'|'s'|'m'|'h'|'day',
}
export interface CloudMemoryOptions extends CloudOptions{
    dataAmount:number,
    dataUnit?:'MB'|'GB'|'TB',
}

export interface CloudComputingOptions extends CloudOptions{
    coreCount:number, 
    cpuData:Cpuload[],
    dataUnit?:'MB'|'GB'|'TB',
}

export interface CloudStorageOptions extends CloudMemoryOptions{
    storageType:'ssd'|'hdd', 
}


