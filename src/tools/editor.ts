import { platform } from 'os';
import { spawn, ChildProcess } from 'child_process'
import { resolve } from 'path'
import config from '../tools/config';

class Editor{
  private os : string;
  private command : string;
  public proc!: ChildProcess;

  constructor(){
    const configuration = config.get('config')
    this.os = platform()
    if(configuration.editor) {
      this.command = configuration.editor
    } else if(this.os === 'darwin') {
      this.command = 'open'
    } else if (this.os === 'linux'){
      this.command = 'xdg-open'
    } else if (this.os === 'win32'){
      this.command = 'notepad'
    } else {
      throw new Error('Platform unsupported');
    }
  }

  async create(file: string){
    const filepath = file
    this.proc = spawn(this.command,[filepath])
  }
  async close(){
    this.proc.kill()
  }

}

export { Editor }