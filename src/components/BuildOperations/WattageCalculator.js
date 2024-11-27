import { getBuildCPU, getCPUInfo } from '../GetBuildParts/GetCPUID';
import { getBuildMotherboard, getMotherboardInfo } from '../GetBuildParts/GetMBID';
import { getBuildGPU, getGPUInfo } from '../GetBuildParts/GetGPUID';
import { getBuildStorage, getStorageInfo } from '../GetBuildParts/GetStorageID'; 
import { getClosestBuild } from '../BuilderAuth/buildAuth';

export async function GetBuildWattage(currentUser) {
    try {
        const closestBuild = await getClosestBuild(currentUser);

        const build_id = closestBuild.id;

        const cpu_id = await getBuildCPU(build_id) || null;
        const cpu_info = cpu_id ? await getCPUInfo(cpu_id) : { tdp: 0 };

        const motherboard_id = await getBuildMotherboard(build_id) || null;
        const motherboard_info = motherboard_id ? await getMotherboardInfo(motherboard_id) : { TDP: 0 };

        const gpu_id = await getBuildGPU(build_id) || null;
        const gpu_info = gpu_id ? await getGPUInfo(gpu_id) : { tdp: 0 };

        const storage_id = await getBuildStorage(build_id) || null;
        const storage_info = storage_id ? await getStorageInfo(storage_id) : { tdp: 0 };

        const total_watts = (
            (cpu_info?.tdp || 0) +
            (motherboard_info?.tdp || 0) +
            (gpu_info?.tdp || 0) +
            (storage_info?.tdp || 0) 
        );

        return total_watts;
    } catch (error) {
        console.error("Error calculating build wattage:", error);
        throw error;
    }
}
