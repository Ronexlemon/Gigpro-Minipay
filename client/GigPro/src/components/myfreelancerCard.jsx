import React from "react";
import { useState,useEffect } from "react";
import { useContractWrite,useContractRead } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { useAccount } from 'wagmi'
import { ethers,Contract } from "ethers";


const MyFreelancerCard = () => {
  const [freelancers,setFreeLancers] = useState([]);
  const [freeLancerAddress,setFreelancerAddress] = useState();
  const [deleteuser,setDeleteUser] = useState(true);
  const { address, connector, isConnected } = useAccount();
  const  getFreelancers = async()=>{
    if (window.ethereum || window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await  provider.getSigner(address);
      console.log("address yollow",await signer.getAddress());
      try{
  
        const GigProContracts = new Contract(
  GigProContract,
  gigproAbi,
  provider
        );
        const myfree= await GigProContracts.getFreeLancersByOwner(await signer.getAddress());
        setFreeLancers(myfree);
        console.log("myfree",myfree);
        
      }catch(error){
        alert(`error fetaching${address}`,error);
        console.log(error);
        
      }
  } else {
      console.error("MiniPay provider not detected");
  }
}
  
  // const { data:myFreelancers, isError, isLoading } = useContractRead({
  //   address: GigProContract,
  //   abi: gigproAbi,
  //   functionName: 'getFreeLancersByOwner',
  //   args: [address]
  // })
  console.log("addressis:,",freelancers);
  const removeFreeeLancers = async()=>{
    if (window.ethereum || window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer =   provider.getSigner(address);
      console.log("addresydysgs",address);
      try{
  
        const GigProContracts = new Contract(
  GigProContract,
  gigproAbi,
  signer
        );
        let tx = await GigProContracts.removeFreeLancer(freeLancerAddress,await signer.getAddress());
        let txtx= await tx.wait();
        alert("removed");
      }catch(error){
        alert("can't remove",error);
        console.log("error yollow toolow",error);
      }
  } else {
      console.error("MiniPay provider not detected");
  }
    
  }

  const {writeAsync:removeFreeLancer} = useContractWrite({
    address: GigProContract,
    abi:gigproAbi,
    functionName:"removeFreeLancer",
    args:[freeLancerAddress,address]
  })
const removeFreeeLancer = async()=>{
  
  try{
   
     
      if(freeLancerAddress != undefined){
        //await removeFreeLancer();
        alert("approving ....")
        await removeFreeeLancers();
      }
      else{
        console.log("the address is not set");
        alert("empty ....")
      }
    

  }catch(err){
    console.log("err ihjgerujiugirunir  iruh54iyolow",err);
    alert("failed ....")
  }
}
  const employess = [
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
  ];
 useEffect(()=>{
  getFreelancers()
 },[address]);
  return (
    <>
      {freelancers?.map((employee, index) => (
        <div key={index} className="flex h-1/4 flex-col mb-10 md:w-full w-3/4 text-gray-400 mb-0 border-b border-red-300   ">
          <div className="flex md:justify-evenly md:w-full md:flex-row  w-full flex-col md:text-xl text-sm gap-4 items-center">
            <h3>FreeLancer Address: </h3>
            <span className="flex">
            {employee.userAddress.substring(0,8)}<h4>...</h4>{employee.userAddress.substring(employee.userAddress.length-8,employee.userAddress.length)}
            </span>
            
          </div>
          <div className="flex  md:justify-stretch  justify-between  md:text-xl text-sm w-full gap-2 items-center">
            <h3>Amount in Cusd: </h3>
            <span className="">{Number(employee.payAmount/10**18)}</span>
            
          </div>
          <div className="flex justify-between items-center text-black">
            {deleteuser? <button onClick={()=>{setFreelancerAddress(employee.userAddress);setDeleteUser(false)}} className="inline-flex pl-2 justify-center items-center w-100 rounded-full text-red-500">
              End Contract
            </button>: <button onClick={()=>{removeFreeeLancer()}} className="inline-flex pl-2 justify-center items-center  w-100 rounded-full text-yellow-500">
              Approve
            </button>}
          
           
            
            
          </div>
        </div>
      ))}
    </>
  );
};

export default MyFreelancerCard;
