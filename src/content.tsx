import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"
import {sendToBackground} from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:3000/*", "https://staging.menuwise.com/"] 
}

const CustomButton = () => { 

  const getToken = async () => {
    const a = localStorage.getItem("access_Token")
    if(a){
      await sendToBackground({ 
        name: "ping",
        body: {
          access_Token: a
        }
      });
    }
  }

  useEffect(() => {
    getToken();
  }, [])
}

export default CustomButton
