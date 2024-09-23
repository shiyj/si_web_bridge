'use-strict';

class WebuiBridgeInterface {

    isConnected(): boolean {
        return true;
    }
    close(): void {
    }
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    }

    connect(): void {
    }

    onOpen: (() => any) | null;
    onMessage: ((buffer:Uint8Array) => any) | null;
    onClose: ((type: string, code: number, msg: string) => any) | null;
    onError: (() => any) | null;

}

export { WebuiBridgeInterface };