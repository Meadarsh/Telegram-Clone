import * as React from "react";
import { ArrowLeftRight, Bookmark, Bug, CircleHelp, CirclePlus, Clapperboard, Menu, Moon, Search, Settings, Shell, User } from "lucide-react";
import { useMail } from "./use-chat";
import { MailList } from "./contact-list";
import { useCookies } from "react-cookie";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { MailDisplay } from "./chat-display";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SidePannel } from "@/app/sidepannel";

interface MailItem {
  id: string;
  creator: {
    name: string;
  };
  read: boolean;
  updated_at: string;
  labels: string[];
}
interface MailProps {
  mails: MailItem[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({ mails, defaultLayout = [265, 360, 655] }: MailProps) {
  const [mail] = useMail();
  const[isMobile,setIsMobile]=React.useState(false)
  const[sheetState,setSheetState]=React.useState(false)
  const [cookie,setCookie] = useCookies([
    "react-resizable-panels:collapsed",
    "react-resizable-panels:layout",
  ]);
  const [message, setMessage] = React.useState([]);
  const GetMessages = async () => {
    if (!mail.selected) {
      return;
    }
    let data: any = await fetch(
      `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${mail.selected}`,
    );
    data = await data.json();
    setMessage(data);
  };
  React.useEffect(() => {
    GetMessages();
  }, [mail.selected]);
  const Mobile = window.innerWidth < 768;
  React.useEffect(()=>{
    setIsMobile(Mobile)
  },[Mobile])

  const updateSheetState =(val:boolean)=>{
    setSheetState(val)
  }
 console.log(cookie);
 
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setCookie("react-resizable-panels:layout", JSON.stringify(sizes));
        }}
        className="h-full max-h-[800px] items-stretch"
      >
         {isMobile && mail.selected ? null : (<ResizablePanel defaultSize={23} minSize={20} maxSize={30}>
          <div className="flex w-full h-[60px] bg-tbbackground lg:bg-background  items-center pr-3 lg:justify-normal justify-between  gap-5 py-3 lg:py-2">
          <Menubar className="border-none hidden lg:block focus:outline-none focus:ring-0 focus:bg-transparent data-[state=open]:bg-transparent bg-transparent shadow-none font-medium text-sm">
          <MenubarMenu>
                <MenubarTrigger className="border-none focus:outline-none focus:ring-0 focus:bg-transparent data-[state=open]:bg-transparent bg-transparent">
                  <Menu className="h-6 w-6 text-foreground" />
                </MenubarTrigger>
                <MenubarContent className="w-64 ml-2 p-2 backdrop-blur-lg bg-[rgba(255,255,255,.3)] dark:bg-[rgba(0,0,0,.3)]">
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <Bookmark /> Saved Messages
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <User /> Contacts 
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <Clapperboard /> My Stories
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <Settings /> Settings 
                  </MenubarItem>
                  <MenubarItem className="flex hover:bg-transparent gap-3">
                  <Moon /> Theme
                    <MenubarShortcut>
                      <ModeToggle />
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <Shell /> Animation 
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <CircleHelp /> Telegram Features
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <ArrowLeftRight /> Switch to K Version 
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)]  flex gap-3">
                  <Bug /> Report Bug 
                  </MenubarItem>
                  <MenubarItem className="hover:bg-[rgba(0,0,0,.1)] dark:hover:bg-[rgba(0,0,0,.5)] flex gap-3">
                  <CirclePlus /> Install App <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled className="text-[12px] flex justify-center">Telegram Web A 10.9.7</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <div className="flex gap-6 items-center"><SidePannel handleSheetOpenChange={updateSheetState}/>
            <h1 className="text-xl font-bold text-white lg:hidden block">Telegram</h1></div>
            <Search size={22} className=" text-white lg:hidden block" />
            <form className="w-full hidden lg:block">
              <div className="relative w-full">
                <Search className="absolute left-2 top-3 h-4 w-4 font-semibold text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-8 h-10 py-1 border-none bg-muted font-medium rounded-full"
                />
              </div>
            </form>
          </div>
          <MailList sheetState={sheetState} items={mails} />
        </ResizablePanel>)}
        {!isMobile &&<ResizableHandle withHandle />}
        {isMobile?(mail.selected ?(
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <MailDisplay data={message} removedata={() => setMessage([])} />
          </ResizablePanel>
        ):null):(
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <MailDisplay data={message} removedata={() => setMessage([])} />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
