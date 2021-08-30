enum PRIORITIES{
    Trivial= 0.1,
    Easy=1,
    Medium=1.5,
    Hard=2
}
enum ATTRIBUTE{
    Strength="str", 
    Intelligence="int", 
    Perception="per",
    Constitution="con"
}
interface iTag{
    id: string;
    name: string;
    challenge?:boolean
}

interface iChecklistItem{
    id: string;
    text: string;
    completed: boolean;
}
interface iHeaders{
    "x-client": string;
    "Content-Type": string;
    "x-api-key": string;
    "x-api-user": string;
}
            
interface iChallenge{
    taskId:string;
    id:string;
    shortName:string;
}


export {
    PRIORITIES,
    ATTRIBUTE,
    iTag,
    iChecklistItem,
    iChallenge,
    iHeaders
}