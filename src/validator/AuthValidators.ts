import { exposed } from "smoke-screen";

export class LoginBodyDTO {
    @exposed({
        type: String,
    })
    username!: string;

    @exposed({
        type: String,
    })
    password!: string;
}