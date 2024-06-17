export class LogEntry {
    message: string|null = null;
    messageVerbose: string|null = null;
    timestamp: Date|null = null;
    constructor(data?: any) {
        const self = this;
        if (!data) {
            data = {};
        }
        Object.assign(self, data);
        
        if(!data.timestamp){
            self.timestamp = new Date();
        }
    }
}