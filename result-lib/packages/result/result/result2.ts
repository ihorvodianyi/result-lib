export enum ResultState {
    FAIL,
    OK
}

class ResultBase {

    private _state: ResultState;

    protected constructor(state: ResultState) {
        this._state = state;
    }

    public isFailed(): boolean {
        return this._state == ResultState.FAIL;
    }
    public isSuccess(): boolean {
        return this._state == ResultState.OK;
    }
}

export class Result extends ResultBase {

    public static ok(): Result {
        return new Result(ResultState.OK);
    }

    public static fail(): Result {
        return new Result(ResultState.FAIL);
    }
}

export class ResultValue<TValue> extends ResultBase {

    private _value?: TValue;
    public get value(): TValue {
        if (this.isFailed()) {
            throw new Error("Can't retrieve the value from a failed result.");
        }
        return this._value!;
    }

    constructor(state: ResultState, value?: TValue) {
        super(state);
        this._value = value;
    }

    public static ok<TValue>(value: TValue): ResultValue<TValue> {
        return new ResultValue<TValue>(ResultState.OK, value);
    }

    public static fail<TValue>(): ResultValue<TValue> {
        return new ResultValue<TValue>(ResultState.FAIL);
    }
}