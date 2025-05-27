import { Hono } from "hono";

const polymarket = new Hono();

polymarket.get("/", (c) => {
	return c.json({
		message: "Hello, world!",
	});
});

export default polymarket;
