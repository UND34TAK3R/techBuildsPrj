import { Link } from 'react-router-dom';
import { useAuth } from '../backend/Context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Layout/Header';
import NewBuild from './NewBuild';
import ChangeBuild from './ChangeBuild';
import { getClosestBuild } from './BuilderAuth/buildAuth';
import { getBuildCPU, getCPUInfo } from './GetBuildParts/GetCPUID';
import { getBuildMotherboard, getMotherboardInfo } from './GetBuildParts/GetMBID';
import { getBuildCooler, getCoolerInfo } from './GetBuildParts/GetCoolerID';
import { getBuildRAM, getRAMInfo } from './GetBuildParts/GetRAMID';
import { getBuildPSU, getPSUInfo } from './GetBuildParts/GetPSUID';
import { getBuildGPU, getGPUInfo } from './GetBuildParts/GetGPUID';
import { getBuildCase, getCaseInfo} from './GetBuildParts/GetCaseID';
import { getBuildOS, getOSInfo} from './GetBuildParts/GetOSID';
import { getBuildStorage, getStorageInfo } from './GetBuildParts/GetStorageID';
import { getBuildNA, getNAInfo } from './GetBuildParts/GetNetAdapterID';
import { GetBuildPrice } from './BuildOperations/PriceCalculator.js';
import { GetBuildWattage } from './BuildOperations/WattageCalculator.js';
import { CompatibilityCheck, CompatibilityErrorShow } from './BuildOperations/CompatibilityCheck.js';
import ExclamationMark from '../assets/exclamation-mark-circle-svgrepo-com.svg';
const Builder = () => {
  const { userLoggedIn, loading, CurrentUser } = useAuth();
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showNewBuildPopup, setShowNewBuildPopup] = useState(false);
  const [showChangeBuildPopup, setShowChangeBuildPopup] = useState(false);
  const [buildName, setBuildName] = useState(''); 
  const [buildId, setBuildId] = useState(''); // State for buildId
  const [cpuId, setCpuId] = useState('');
  const [cpuBrand, setCPUBrand] = useState('');
  const [cpuModel, setCPUModel] = useState('');
  const [cpuPrice, setCPUPrice] = useState('');
  const [cpuCores, setCPUCores] = useState('');
  const [cpuBaseClock, setCPUBaseClock] = useState('');
  const [motherboardId, setMotherboardId] = useState('');
  const [mbModel, setMBModel] = useState('');
  const [mbPrice, setMBPrice] = useState('');
  const [mbSocket, setMBSocket] = useState('');
  const [mbFormFactor, setMBFormFactor] = useState('');
  const [coolerId, setCoolerId] = useState('');
  const [coolerBrand, setCoolerBrand] = useState('');
  const [coolerModel, setCoolerModel] = useState('');
  const [coolerCFM, setCoolerCFM] = useState(''); 
  const [coolerPrice, setCoolerPrice] = useState('');
  const [ramId, setRAMId] = useState('');
  const [ramBrand, setRAMBrand] = useState('');
  const [ramModel, setRAMModel] = useState('');
  const [ramPrice, setRAMPrice] = useState('');
  const [ramCapacity, setRAMCapacity] = useState('');
  const [ ramModules, setRAMModules] = useState('');
  const [ ramType, setRAMType] = useState('');
  const [ramSpeed, setRAMSpeed] = useState('');
  const [ramLatency, setRAMLatency] = useState('');
  const [ gpuId, setGPUID] = useState('');
  const [gpuBrand, setGPUBrand] = useState('');
  const [ gpuModel, setGPUModel] = useState('');
  const [ gpuPrice, setGPUPrice] = useState('');
  const [ gpuMemory, setGPUMemory] = useState('');
  const [ storageId, setStorageID] = useState('');
  const [storageBrand, setStorageBrand] = useState('');
  const [storageModel, setStorageModel] = useState('');
  const [storagePrice, setStoragePrice] = useState('');
  const [storageCapacity, setStorageCapacity] = useState('');
  const [storageType, setStorageType] = useState('');
  const [psuId, setPSUID] = useState('');
  const [psuBrand, setPSUBrand] = useState('');
  const [psuModel, setPSUModel] = useState('');
  const [psuPrice, setPSUPrice] = useState('');
  const [psuEfficiency, setPSUEfficiency] = useState('');
  const [psuWattage, setPSUWattage] = useState('');
  const [psuFormFactor, setPSUFormFactor] = useState('');
  const [psuModularity, setPSUModularity] = useState('');
  const [caseId, setCaseID] = useState('');
  const [caseBrand, setCaseBrand] = useState('');
  const [caseModel, setCaseModel] = useState('');
  const [casePrice, setCasePrice] = useState('');
  const [ caseFormFactor, setCaseFormFactor] = useState('');
  const [ caseType, setCaseType] = useState('');
  const [osId, setOSID] = useState('');
  const [osName, setOSName] = useState('');
  const [osArchitecture, setOSArchitecture] = useState('');
  const [osPrice, setOSPrice] = useState('');
  const [ naId, setNAID] = useState('');
  const [naBrand, setNABrand] = useState('');
  const [naModel, setNAModel] = useState('');
  const [ naPrice, setNAPrice] = useState('');
  const [ naWireless, setNAWireless] = useState('');
  const [ naType, setNAType] = useState('');
  const [total_price, setTotalPrice] = useState('');
  const [ total_watts, setTotalWatts] = useState('');
  const [CPUvisible, setCPUVisible] = useState(false);
  const [MBvisible, setMBVisible] = useState(false);
  const [RAMvisible, setRAMVisible] = useState(false);
  const [GPUvisible, setGPUVisible] = useState(false);
  const [Storagevisible, setStorageVisible] = useState(false);
  const [PSUvisible, setPSUVisible] = useState(false);
  const [Casevisible, setCaseVisible] = useState(false);
  const [compatibilityMessage, setCompatibilityMessage] = useState('');
  

  console.log(buildId);

  useEffect(() => {
    if (userLoggedIn) {
      setShowLoginMessage(false);
    } else {
      setShowLoginMessage(true);
    }
  }, [userLoggedIn]);

  useEffect(() => {
    const fetchClosestBuild = async () => {
      if (CurrentUser) {
        const closestBuild = await getClosestBuild(CurrentUser);
        if (closestBuild) {
          setBuildName(closestBuild.build_name); 
          setBuildId(closestBuild.id); 
        } else {
          setBuildName('No Build Selected');
          setBuildId(''); 
        }
      }
    };
    fetchClosestBuild();
  }, [CurrentUser]);

  const handleNewBuild = async () => {
    if (CurrentUser) {
      const closestBuild = await getClosestBuild(CurrentUser);
      if (closestBuild) {
        setBuildName(closestBuild.build_name);
        setBuildId(closestBuild.id);
      }
      setShowNewBuildPopup(false); 
    }
  };

  useEffect(() => {
    const fetchCPU = async () => {
      if (buildId) {
        const cpu_id = await getBuildCPU(buildId);
        if (cpu_id) {
          setCpuId(cpu_id);  // Update state with the fetched CPU ID
          const cpuInfo = await getCPUInfo(cpu_id)
          if (cpuInfo) {
          setCPUBrand(cpuInfo.brand);
          setCPUModel(cpuInfo.model);
          const cpu_price = `${cpuInfo.price}.99 $`;
          setCPUPrice(cpu_price);
          setCPUCores(cpuInfo.cores);
          setCPUBaseClock(cpuInfo.base_clock);
        }
        } else {
          setCpuId('');
        }
      }
    };
    const fetchMotherboard = async () => {
      if (buildId) {
        const mb_id = await getBuildMotherboard(buildId);
        if (mb_id) {
          setMotherboardId(mb_id);  // Update state with the fetched CPU ID
          const mbInfo = await getMotherboardInfo(mb_id)
          if (mbInfo) {
          setMBModel(mbInfo.model);
          setMBSocket(mbInfo.socket);
          setMBFormFactor(mbInfo.form_factor);
          const mb_price = `${mbInfo.price}.99 $`;
          setMBPrice(mb_price);  
        }
        } else {
          setMotherboardId('');
        }
      }
    };
const fetchCooler = async () => {
      if (buildId) {
        const cooler_id = await getBuildCooler(buildId);
        if (cooler_id) {
          setCoolerId(cooler_id);  // Update state with the fetched Cooler ID
          const coolerInfo = await getCoolerInfo(cooler_id)
          if (coolerInfo) {
          setCoolerBrand(coolerInfo.brand);
          setCoolerModel(coolerInfo.model);
          setCoolerCFM(coolerInfo.cfm);
          const cooler_price = `${coolerInfo.price}.99 $`;
          setCoolerPrice(cooler_price);
        }
        } else {
          setCoolerId('');
        }
      }
    };
    const fetchRam = async () => {
      if (buildId) {
        const ram_id = await getBuildRAM(buildId);
        if (ram_id) {
          setRAMId(ram_id);  // Update state with the fetched Cooler ID
          const ramInfo = await getRAMInfo(ram_id)
          if (ramInfo) {
          setRAMBrand(ramInfo.brand);
          setRAMModel(ramInfo.model);
          setRAMCapacity(ramInfo.capacity);
          setRAMModules(ramInfo.modules);
          setRAMType(ramInfo.memory_type);
          setRAMSpeed(ramInfo.speed);
          setRAMLatency(ramInfo.latency);
          const ram_price = `${ramInfo.price}.99 $`;
          setRAMPrice(ram_price);
        }
        } else {
          setRAMId('');
        }
      }
    };
    const fetchGPU = async () => {
      if (buildId) {
        const gpu_id = await getBuildGPU(buildId);
        if (gpu_id) {
          setGPUID(gpu_id);  // Update state with the fetched Cooler ID
          const GPUInfo = await getGPUInfo(gpu_id)
          if (GPUInfo) {
          setGPUBrand(GPUInfo.brand);
          setGPUModel(GPUInfo.model);
          setGPUMemory(GPUInfo.memory_size);
          const gpu_price = `${GPUInfo.price}.99 $`;
          setGPUPrice(gpu_price);
        }
        } else {
          setGPUID('');
        }
      }
    };
    const fetchStorage = async () => {
      if (buildId) {
        const storage_id = await getBuildStorage(buildId);
        if (storage_id) {
          setStorageID(storage_id);  // Update state with the fetched Cooler ID
          const StorageInfo = await getStorageInfo(storage_id)
          if (StorageInfo) {
          setStorageBrand(StorageInfo.brand);
          setStorageModel(StorageInfo.model);
          setStorageCapacity(StorageInfo.capacity);
          setStorageType(StorageInfo.storage_type);
          const storage_price = `${StorageInfo.price} $`;
          setStoragePrice(storage_price);
        }
        } else {
          setStorageID('');
        }
      }
    };
    const fetchPSU = async () => {
      if (buildId) {
        const psu_id = await getBuildPSU(buildId);
        if (psu_id) {
          setPSUID(psu_id);  // Update state with the fetched Cooler ID
          const PSUInfo = await getPSUInfo(psu_id)
          if (PSUInfo) {
          setPSUBrand(PSUInfo.brand);
          setPSUModel(PSUInfo.model);
          setPSUWattage(PSUInfo.wattage);
          setPSUEfficiency(PSUInfo.efficiency_rating);
          setPSUFormFactor(PSUInfo.form_factor);
          setPSUModularity(PSUInfo.modularity);
          const psu_price = `${PSUInfo.price} $`;
          setPSUPrice(psu_price);
        }
        } else {
          setPSUID('');
        }
      }
    };
    const fetchCase = async () => {
      if (buildId) {
        const case_id = await getBuildCase(buildId);
        if (case_id) {
          setCaseID(case_id);  // Update state with the fetched Cooler ID
          const CaseInfo = await getCaseInfo(case_id)
          if (CaseInfo) {
          setCaseBrand(CaseInfo.brand);
          setCaseModel(CaseInfo.model);
          setCaseFormFactor(CaseInfo.form_factor);
          setCaseType(CaseInfo.type);
          const case_price = `${CaseInfo.price}.99 $`;
          setCasePrice(case_price);
        }
        } else {
          setCaseID('');
        }
      }
    };
    const fetchOS = async () => {
      if (buildId) {
        const os_id = await getBuildOS(buildId);
        if (os_id) {
          setOSID(os_id);  // Update state with the fetched Cooler ID
          const OSInfo = await getOSInfo(os_id)
          if (OSInfo) {
          setOSName(OSInfo.name);
          setOSArchitecture(OSInfo.architecture);
          const os_price = `${OSInfo.price} $`;
          setOSPrice(os_price);
        }
        } else {
          setOSID('');
        }
      }
    };
    const fetchNetAdapter = async () => {
      if (buildId) {
        const na_id = await getBuildNA(buildId);
        if (na_id) {
          setNAID(na_id);  // Update state with the fetched Cooler ID
          const NAInfo = await getNAInfo(na_id)
          if (NAInfo) {
          setNABrand(NAInfo.brand);
          setNAModel(NAInfo.model);
          setNAType(NAInfo.adapter_type);
          setNAWireless(NAInfo.wireless_standard);
          const na_price = `${NAInfo.price} $`;
          setNAPrice(na_price);
        }
        } else {
          setNAID('');
        }
      }
    };
    const fetchTotalPrice = async () => {
      if (buildId) {
        const totalPrice = await GetBuildPrice(CurrentUser);
        if (totalPrice) {
          setTotalPrice(totalPrice);  
        }
      }
    }
    const fetchTotalWattage = async () => {
      if (buildId) {
        const totalWattage = await GetBuildWattage(CurrentUser);
        if (totalWattage) {
          setTotalWatts(totalWattage);  
        }
      }
    }
    const fetchCompatibility = async () => {
      const compatibility = await CompatibilityCheck(CurrentUser);
      if (compatibility === true) {
        setCompatibilityMessage('Warning! These parts have potential compatibility issues.');
      }
      else{
        setCompatibilityMessage('Everything looks good!');
      }
    }
    const fetchExclamationMark = async () => {
      const exclamationMark = await CompatibilityErrorShow(CurrentUser);
      if (exclamationMark === "CPU/Motherboard"){
        setCPUVisible(true);
        setMBVisible(true);
      }
      else if (exclamationMark === "RAM/Motherboard") {
        setMBVisible(true);
        setRAMVisible(true);
      }
      else if (exclamationMark === "GPU/Case") {
        setGPUVisible(true);
        setCaseVisible(true);
      }
      else if (exclamationMark === "PSU/RAM") {
        setPSUVisible(true);
        setRAMVisible(true);
      }
      else if (exclamationMark === "Storage/Motherboard") {
        setStorageVisible(true);
        setMBVisible(true);
      }
      else if(exclamationMark === "PSU") {
        setPSUVisible(true);
      }
      else if (exclamationMark === "Motherboard/Case") {
        setMBVisible(true);
        setCaseVisible(true);
        console.log(exclamationMark);
      }
      else{
        return 0;
      }
    }
    fetchExclamationMark();
    fetchCompatibility();
    fetchTotalWattage();
    fetchTotalPrice();
    fetchCPU();
    fetchMotherboard();
    fetchCooler();
    fetchRam();
    fetchGPU();
    fetchStorage();
    fetchPSU();
    fetchCase();
    fetchOS();
    fetchNetAdapter();
  }, [buildId]);

  const displayCPUInfo = () => {
  if (cpuId) {
           return `${cpuBrand} ${cpuModel} ${cpuBaseClock} GHz ${cpuCores}-Core Processor`
        }
  }

  const displayMBInfo = () => {
  if (motherboardId) {
           return `${mbModel} ${mbFormFactor} ${mbSocket} Motherboard`
        }
  }

  const displayCoolerInfo = () => {
  if (coolerId) {
           return `${coolerBrand} ${coolerModel} ${coolerCFM} CFM CPU Cooler`
        }
  }

  const displayRamInfo = () => {
  if (ramId) {
           return `${ramBrand} ${ramModel} ${ramCapacity} GB (${ramModules}) ${ramType}-${ramSpeed} CL${ramLatency} Memory`
        }
  }

  const displayGPUInfo = () => {
  if (gpuId) {
           return `${gpuBrand} ${gpuModel} ${gpuMemory} GB Video Card`
        }
  }
  const displayStorageInfo = () => {
    if (storageId) {
      let storage_capacity;
      if (storageCapacity > 1000) {
        storage_capacity = `${storageCapacity / 1000} TB`;
      } else {
        storage_capacity = `${storageCapacity} GB`;
      }
      return `${storageBrand} ${storageModel} ${storage_capacity} ${storageType}`;
    }
  };

  const displayPSUInfo = () => {
  if (psuId) {
           return `${psuBrand} ${psuModel} ${psuWattage} W ${psuEfficiency} ${psuModularity} ${psuFormFactor} Power Supply`
        }
  }

  const displayCaseInfo = () => {
  if (caseId) {
           return `${caseBrand} ${caseModel} ${caseFormFactor} ${caseType} Case`
        }
  }

  const displayOSInfo = () => {
  if (osId) {
           return `${osName} - ${osArchitecture}-bit`
        }
  }

  const displayNetAdapterInfo = () => {
  if (naId) {
           return `${naBrand} ${naModel} ${naWireless} ${naType} Wi-Fi Adapter`
        }
  }
  
  const handleChangeBuild = async () => {
    if (CurrentUser) {
      const closestBuild = await getClosestBuild(CurrentUser);
      if (closestBuild) {
        setBuildName(closestBuild.build_name);
        setBuildId(closestBuild.id);
      }
      setShowChangeBuildPopup(false); 
    }
  };


  function handleClose() {
    setShowNewBuildPopup(false);
    setShowChangeBuildPopup(false);
  }

  if (showLoginMessage) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.messageBox}>
          <h2>To use our Builder, you need to be logged in</h2>
          <button style={styles.button} onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
        <div style={styles.blurredBackground}></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinner}>Loading...</div>
      </div>
    );
  }

return(
 <div style={styles.page}> 
    <Header />
    <span>Build Name: {buildName}</span>
    <table className="table" style={styles.table}>
        <thead>
          <tr>
            <th scope="col">Component</th>
            <th scope="col" colSpan={3}>Part Name</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody><div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: MBvisible ? 'block' : 'none',}} /></div>
          <tr>
            
            <th scope= "row"><Link to="/Motherboard">Motherboard</Link></th>
            <td colSpan={3}>{displayMBInfo()}</td>
            <td>{mbPrice}</td>
            <td><Link to="/Motherboard"><button className="btn btn-outline-dark">Add Motherboard</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: CPUvisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/CPU">CPU</Link></th>
            <td colSpan={3}>{displayCPUInfo()}</td>
            <td>{cpuPrice}</td>
            <td><Link to="/CPU"><button className="btn btn-outline-dark">Add CPU</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/CPU_Cooler">CPU Cooler</Link></th>
            <td colSpan={3}>{displayCoolerInfo()}</td>
            <td>{coolerPrice}</td>
            <td><Link to="/CPU_Cooler"><button className="btn btn-outline-dark">Add CPU Cooler</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: RAMvisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/RAM">RAM</Link></th>
            <td colSpan={3}>{displayRamInfo()}</td>
            <td>{ramPrice}</td>
          <td> <Link to="/RAM"><button className="btn btn-outline-dark">Add RAM</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: GPUvisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/GPU">GPU</Link></th>
            <td colSpan={3}>{displayGPUInfo()}</td>
            <td>{gpuPrice}</td>
            <td><Link to="/GPU"><button className="btn btn-outline-dark">Add GPU</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: Storagevisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/Storage">Storage</Link></th>
            <td colSpan={3}>{displayStorageInfo()}</td>
            <td>{storagePrice}</td>
            <td><Link to="/Storage"><button className="btn btn-outline-dark">Add Storage</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: PSUvisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/PSU">PSU</Link></th>
            <td colSpan={3}>{displayPSUInfo()}</td>
            <td>{psuPrice}</td>
            <td><Link to="/PSU"><button className="btn btn-outline-dark">Add PSU</button></Link></td>
          </tr>
          <div><img src={ExclamationMark} alt="Exclamation Mark" style={{ ...styles.image, display: Casevisible ? 'block' : 'none',}} /></div>
          <tr>
          <th scope="row"><Link to="/Case">Case</Link></th>
            <td colSpan={3}>{displayCaseInfo()}</td>
            <td>{casePrice}</td>
            <td><Link to="/Case"><button className="btn btn-outline-dark">Add Case</button></Link></td>
          </tr>
          
          <tr>
          <th scope="row"><Link to="/OS">OS</Link></th>
            <td colSpan={3}>{displayOSInfo()}</td>
            <td>{osPrice}</td>
            <td><Link to="/OS"><button className="btn btn-outline-dark">Add OS</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/NetAdapter"> Network Adapter</Link></th>
            <td colSpan={3}>{displayNetAdapterInfo()}</td>
            <td>{naPrice}</td>
            <td><Link to="/NetAdapter"><button className="btn btn-outline-dark">Add Network Adapter</button></Link></td>
          </tr>
      </tbody>
    </table>
    <div>
      <table className='table' style={styles.table}>
        <thead>
          <tr>
            <th scope="col">Estimated Cost: {total_price} $</th>
            <th scope="col">Estimated Wattage: {total_watts} W</th>
            <th scope="col">Compatibility: {compatibilityMessage}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div>
    <button onClick={() => setShowNewBuildPopup(true)}>New Build</button>
    <button onClick={() => setShowChangeBuildPopup(true)}>Change Build</button>
    </div>
      {/* Conditionally render popups as modals */}
      {showNewBuildPopup && (
        <div style={styles.modalOverlay}>
          <NewBuild handleClose={handleClose} handleNewBuild={handleNewBuild} />
        </div>
      )}
      {showChangeBuildPopup && (
        <div style={styles.modalOverlay}>
          <ChangeBuild handleClose={handleClose} handleChangeBuild={handleChangeBuild} />
        </div>
      )}
  </div>
)}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    zIndex: 10,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    zIndex: 1,
  },
  loadingWrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light background color for loading state
  },
  spinner: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  image: {
    width: '50px',
    right: '1207px',
    position: 'absolute',
  },
  table: {
    width: '92%',
    marginLeft: '50px',
  },
  page : {
    width: '100%',
    overflowX: 'hidden',
    marginBottom: '50px'
  }
};

export default Builder