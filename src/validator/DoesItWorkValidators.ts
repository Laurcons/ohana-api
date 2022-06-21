import { exposed } from "smoke-screen";

export class DoesItWorkDTO {
    @exposed({
        type: String,
        validator: (val: string) => {
            if (val.length < 3)
                throw new Error("cannot be less than 3 letters");
        }
    })
    yourName!: string;
}