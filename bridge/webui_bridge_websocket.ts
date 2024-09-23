'use-strict';

import { WebuiBridgeInterface } from "./webui_bridge_interface";
class WebuiBridgeWS extends WebuiBridgeInterface {

    // WebUI Settings
    #port: number;
    // Internals
    #ws: WebSocket;
    #secure: boolean;

    // keep
    #log: boolean = false;
    constructor({ log = false }: { log: boolean }) {
        super();
        this.#log = log;
        // WebSocket
        if (!('WebSocket' in window)) {
            alert('Sorry. WebSocket is not supported by your web browser.');
            if (!this.#log) globalThis.close();
        }
    }

    wsIsConnected(): boolean {
        return ((this.#ws) && (this.#ws.readyState === WebSocket.OPEN));
    }
    wsClose(): void {
        this.#ws.close();
    }
    wsSend(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        this.#ws.send(data);
    }

    wsConnect(): void {
        if (this.#ws) {
            this.#ws.close();
        }
        const host = window.location.hostname;
        const url = this.#secure ? ('wss://' + host) : ('ws://' + host);
        this.#ws = new WebSocket(`${url}:${this.#port}/_webui_ws_connect`);
        this.#ws.binaryType = 'arraybuffer';
        this.#ws.onopen = this.#wsOnOpen.bind(this);
        this.#ws.onmessage = this.#wsOnMessage.bind(this);
        this.#ws.onclose = this.#wsOnClose.bind(this);
        this.#ws.onerror = this.#wsOnError.bind(this);
    }
    #wsOnOpen = (event: Event) => {
        if (this.onOpen) {
            this.onOpen();
        }
    };
    #wsOnError = (event: Event) => {
        if (this.onError) {
            this.onError();
        }
    };

    #wsOnClose = (event: CloseEvent) => {
        if (this.onClose) {
            this.onClose("websocket", event.code, `web socket closed with code:${event.code}`)
        }
    };
    #wsOnMessage = async (event: MessageEvent) => {
        if (this.onMessage) {
            const buffer8 = new Uint8Array(event.data);
            this.onMessage(buffer8);
        }
    };

}

export { WebuiBridgeWS };