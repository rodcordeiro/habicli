/// <reference types="node" />
import { ChildProcess } from 'child_process';
declare class Editor {
    private os;
    private command;
    proc: ChildProcess;
    constructor();
    create(file: string): Promise<void>;
    close(): Promise<void>;
}
export { Editor };
