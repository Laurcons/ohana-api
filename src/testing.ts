if (process.env.NODE_ENV === "test") {
    const test = await import("./test/index.js");
    await test.runAll();
    process.exit();
}