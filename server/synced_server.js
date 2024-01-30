import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({ arrayData: [] });

const doc = getYjsDoc(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);