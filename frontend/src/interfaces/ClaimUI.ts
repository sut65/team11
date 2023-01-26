
export interface ClaimInterface {
    ID: number,
    Review_ID: number,
    Urgency_ID: number,
    ClaimTime: Date | null;
    OrderProblem: string,
    Claim_Comment: string,
    StatusClaim_ID: number,
}

export interface StatusClaimInterface {
    ID: number,
    Status_Type: string,
}

export interface UrgencyInterface {
    ID: number,
    Urgency_Type: string,
}

