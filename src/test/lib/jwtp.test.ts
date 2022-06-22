import chai from "chai";
import jwtp from "../../lib/jwtp.js";

type Params = {
    secret: string;
};

export async function before() {
    return {
        secret: "S3CR3T"
    };
}

export async function run(p: Params) {
    console.log("Testing JWTP");
    await first(p);
}

async function first(p: Params) {
    const original = {
        sub: "1234567890",
        name: "John Doe",
        iat: 1516239022
    };
    const signed = await jwtp.sign(JSON.stringify(original), p.secret) as string;
    chai.expect(signed).to.equal("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.7SaHQjziGqmJPAJb269pbGxfTYAHTnAczoqlfnVxVy4");
    const unsigned = await jwtp.verify(signed, p.secret);
    chai.expect(unsigned).to.deep.equal(original);
}