interface IcandidatesInfo {
    candidatesId: string;
    rating: Number;
    cognitive: Number;
    personality: Number;
    reliability: Number;
    interview: Boolean;
    screeningCall: Boolean;
    task: Boolean;
    cv: String
}

interface IjobType {
    _id: string;
    name: string;
    status?: boolean;
    date?: Date;
    location: String;
    jobDescription?: String;
    companyDescription?: string;
    requierments: [String]
    candidatesList?: [IcandidatesInfo]
}

interface IcandidatesType {
    _id: string;
    name: string;
    tel: String;
    email: String;
    info: String
}

interface JobsProps {
    jobs: IjobType[]
}

