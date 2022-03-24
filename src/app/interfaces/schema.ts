export interface UserDetails{
    displayName: string;
    totalCarbonThisMonth: CarbonAmountForUser;
    carbonHistory: CarbonAmountForUser[];
    carbonBudgetForMonth: number;
    friends?: Friend[];
}

export interface CarbonAmountForUser{
    month: number;
    year: number;
    carbonAmount: number;
}

export interface Friend{
    userId: string;
    displayName: string;
}