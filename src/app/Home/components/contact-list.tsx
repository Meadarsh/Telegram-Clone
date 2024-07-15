import { cn } from "@/lib/utils";
import { useMail } from "./use-chat";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import gsap from "gsap";
import { Separator } from "@/components/ui/separator";

interface MailItem {
  id: string;
  creator: {
    name: string;
  };
  read: boolean;
  updated_at: string;
  labels: string[];
}

interface MailListProps {
  items: MailItem[];
  sheetState:boolean
}

export function MailList({ items,sheetState }: MailListProps) {
  const [mail, setMail] = useMail();
  
   useEffect(()=>{    
    gsap.to(".wholeList",{
      duration: 0.3,
      ease: "expo.out",
      scale:sheetState?.94:1,
    })
   },[sheetState])
  return (
    <ScrollArea className="h-[calc(100vh-40px)] pb-4">
      <div className="wholeList origin-top-right flex flex-col mt-4 p-3 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg p-2 text-left text-sm transition-all",mail.selected !== item.id&&"hover:bg-muted",
              mail.selected === item.id && "bg-primary",
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
                name:item.creator.name
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                  className="rounded-full"
                    src={`https://avatar.iran.liara.run/username?username=${item.creator.name}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className={`flex w-[calc(100%-70px)] ${mail.selected?'':'border-b'} mt-1 gap-2`}>
                  <h3 className={cn(
                    "font-medium text-[16px]",
                    mail.selected === item.id
                      ? "text-white"
                      : "text-forground",
                  )}>{item.creator.name}</h3>
                  <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-white"
                      : "text-muted-foreground",
                  )}
                >
                  {formatDistanceToNow(new Date(item?.updated_at), {
                    addSuffix: true,
                  })}
                </div>
                </div>
               
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
