'use-strict';

class WebuiBridgeInterface {

    wsIsConnected(): boolean {
        return true;
    }
    wsClose(): void {
    }
    wsSend(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    }

    wsConnect(): void {
    }

    onOpen: (() => any) | null;
    onMessage: ((buffer:Uint8Array) => any) | null;
    onClose: ((type: string, code: number, msg: string) => any) | null;
    onError: (() => any) | null;

}

export { WebuiBridgeInterface };