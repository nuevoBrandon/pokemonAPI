export interface IPoekemon {
    count:    number;
    next:     string;
    previous: null;
    results:  IResult[];
}

export interface IResult {
    name: string;
    url:  string;
}
