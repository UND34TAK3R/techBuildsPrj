import { getBuildCPU, getCPUInfo } from '../GetBuildParts/GetCPUID';
import { getBuildMotherboard, getMotherboardInfo } from '../GetBuildParts/GetMBID';
import { getBuildCooler, getCoolerInfo } from '../GetBuildParts/GetCoolerID';
import { getBuildRAM, getRAMInfo } from '../GetBuildParts/GetRAMID';
import { getBuildPSU, getPSUInfo } from '../GetBuildParts/GetPSUID';
import { getBuildGPU, getGPUInfo } from '../GetBuildParts/GetGPUID';
import { getBuildCase, getCaseInfo } from '../GetBuildParts/GetCaseID';
import { getBuildOS, getOSInfo } from '../GetBuildParts/GetOSID';
import { getBuildStorage, getStorageInfo } from '../GetBuildParts/GetStorageID';
import { getBuildNA, getNAInfo } from '../GetBuildParts/GetNetAdapterID';    
import { getClosestBuild } from '../BuilderAuth/buildAuth';
import { GetBuildWattage } from './WattageCalculator.js';

export async function CompatibilityCheck(currentUser) {
    try{
        const total_wattage = await GetBuildWattage(currentUser);
        const closestBuild = await getClosestBuild(currentUser);
        const build_id = closestBuild.id;
        const cpu_id = await getBuildCPU(build_id) || null;
        const mb_id = await getBuildMotherboard(build_id) || null;
        const cooler_id = await getBuildCooler(build_id) || null;
        const ram_id = await getBuildRAM(build_id) || null;
        const psu_id = await getBuildPSU(build_id) || null;
        const gpu_id = await getBuildGPU(build_id) || null;
        const case_id = await getBuildCase(build_id) || null;
        const storage_id = await getBuildStorage(build_id) || null;
        const cpu_info = await getCPUInfo(cpu_id);
        const motherboard_info = await getMotherboardInfo(mb_id);
        const cooler_info = await getCoolerInfo(cooler_id);
        const ram_info = await getRAMInfo(ram_id);
        const psu_info = await getPSUInfo(psu_id);
        const gpu_info = await getGPUInfo(gpu_id);
        const case_info =  await getCaseInfo(case_id);
        const storage_info = await getStorageInfo(storage_id);
       
        if (cpu_info.socket !==  motherboard_info.socket) {
            return true;
        }
        else if (motherboard_info.memory_type !== ram_info.memory_type) {
            return true;
        }
        else if ( motherboard_info.memory_speed < ram_info.speed) {
            return true;
        }
        else if( motherboard_info.max_memory < ram_info.capacity) {
            return true;
        }
        else if (gpu_info.length > case_info.max_gpu_length){
            return true;
        }
        else if(motherboard_info.m2_slots === false && storage_info.form_factor === 'M.2'){
            return true;
        }
        else if (total_wattage > psu_info.wattage){
            return true;
        }
        else if (motherboard_info.form_factor === 'Mini-ITX' && case_info.form_factor !== 'Mini-ITX'){
            return true;
        }
        else if (motherboard_info.form_factor !== 'Micro-ATX' && case_info.form_factor === 'Micro-ATX'){
            return true;
        }
        else{
            return false;
        }
    }catch(e){
        console.log(e);
    }
}


export async function CompatibilityErrorShow(currentUser) {
    try{
        const total_wattage = await GetBuildWattage(currentUser);
        const closestBuild = await getClosestBuild(currentUser);
        const build_id = closestBuild.id;
        const cpu_id = await getBuildCPU(build_id) || null;
        const mb_id = await getBuildMotherboard(build_id) || null;
        const cooler_id = await getBuildCooler(build_id) || null;
        const ram_id = await getBuildRAM(build_id) || null;
        const psu_id = await getBuildPSU(build_id) || null;
        const gpu_id = await getBuildGPU(build_id) || null;
        const case_id = await getBuildCase(build_id) || null;
        const storage_id = await getBuildStorage(build_id) || null;
        const cpu_info = await getCPUInfo(cpu_id);
        const motherboard_info = await getMotherboardInfo(mb_id);
        const cooler_info = await getCoolerInfo(cooler_id);
        const ram_info = await getRAMInfo(ram_id);
        const psu_info = await getPSUInfo(psu_id);
        const gpu_info = await getGPUInfo(gpu_id);
        const case_info =  await getCaseInfo(case_id);
        const storage_info = await getStorageInfo(storage_id);
       
        if (cpu_info.socket !==  motherboard_info.socket) {
            return "CPU/Motherboard";
        }
        else if (motherboard_info.memory_type !== ram_info.memory_type || motherboard_info.memory_speed < ram_info.speed || motherboard_info.max_memory < ram_info.capacity) {
            return "RAM/Motherboard";
        }
        else if (gpu_info.length > case_info.max_gpu_length){
            return "GPU/Case";
        }
        else if(motherboard_info.m2_slots === false && storage_info.form_factor === 'M.2'){
            return "Storage/Motherboard";
        }
        else if (total_wattage > psu_info.wattage){
            return "PSU";
        }
        else if ((motherboard_info.form_factor === 'Mini-ITX' && case_info.form_factor !== 'Mini-ITX')||(motherboard_info.form_factor !== 'Micro-ATX' && case_info.form_factor === 'Micro-ATX')){
            return "Motherboard/Case";
        }
        else{
            return 0;
        }
    }catch(e){
        console.log(e);
    }
}
