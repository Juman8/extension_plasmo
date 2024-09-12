import type { PlasmoMessaging } from "@plasmohq/messaging"
import {KEY_USER_TOKEN} from "~common/constant";
import {storage} from "~utils";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req?.body?.access_Token) {
    storage.setItem(KEY_USER_TOKEN, req.body.access_Token)
  }

}

export default handler
