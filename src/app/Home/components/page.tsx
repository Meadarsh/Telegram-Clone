import { Mail } from "./chatMain"
import {useCookies } from "react-cookie"
import { useEffect, useState } from "react";


export default function MailPage() {
  const [cookies] = useCookies(['react-resizable-panels:layout']);
  const defaultLayout = cookies["react-resizable-panels:layout"]   
  const defaultCollapsed =  true 
  const [contacts,setContacts]=useState<any>([])
  const GetContacts = async ()=>{
    let data:any = await fetch("https://devapi.beyondchats.com/api/get_all_chats?page=1to2")
    data= await data.json()
    setContacts(data?.data.data)
  }
  useEffect(()=>{
    GetContacts()
  },[])
  
  return (
    <>
      <div className=" h-[100vh] overflow-hidden flex-col flex">
        <Mail
          mails={contacts}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
