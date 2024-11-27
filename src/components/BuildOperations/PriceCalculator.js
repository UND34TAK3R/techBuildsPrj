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


export async function GetBuildPrice(currentUser) {
    try {
        const closestBuild = await getClosestBuild(currentUser);

        const build_id = closestBuild.id;

        const cpu_id = await getBuildCPU(build_id) || null;
        const cpu_info = cpu_id ? await getCPUInfo(cpu_id) : { price: 0 };

        const motherboard_id = await getBuildMotherboard(build_id) || null;
        const motherboard_info = motherboard_id ? await getMotherboardInfo(motherboard_id) : { price: 0 };

        const cooler_id = await getBuildCooler(build_id) || null;
        const cooler_info = cooler_id ? await getCoolerInfo(cooler_id) : { price: 0 };

        const ram_id = await getBuildRAM(build_id) || null;
        const ram_info = ram_id ? await getRAMInfo(ram_id) : { price: 0 };

        const psu_id = await getBuildPSU(build_id) || null;
        const psu_info = psu_id ? await getPSUInfo(psu_id) : { price: 0 };

        const gpu_id = await getBuildGPU(build_id) || null;
        const gpu_info = gpu_id ? await getGPUInfo(gpu_id) : { price: 0 };

        const case_id = await getBuildCase(build_id) || null;
        const case_info = case_id ? await getCaseInfo(case_id) : { price: 0 };

        const os_id = await getBuildOS(build_id) || null;
        const os_info = os_id ? await getOSInfo(os_id) : { price: 0 };

        const storage_id = await getBuildStorage(build_id) || null;
        const storage_info = storage_id ? await getStorageInfo(storage_id) : { price: 0 };

        const na_id = await getBuildNA(build_id) || null;
        const na_info = na_id ? await getNAInfo(na_id) : { price: 0 };

        const total_price = (
            (cpu_info?.price || 0) +
            (motherboard_info?.price || 0) +
            (cooler_info?.price || 0) +
            (ram_info?.price || 0) +
            (psu_info?.price || 0) +
            (gpu_info?.price || 0) +
            (case_info?.price || 0) +
            (os_info?.price || 0) +
            (storage_info?.price || 0) +
            (na_info?.price || 0)

        );
        let totalPrice = total_price.toFixed(2);   
        console.log(totalPrice);
        return totalPrice;
    } catch (error) {
        console.error("Error calculating build price:", error);
        throw error;
    }
}
