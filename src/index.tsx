import { Hono } from "hono";
import { cors } from "hono/cors";
import polymarket from "./polymarket";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.use(
	cors({
		origin: "https://pro.openbb.co",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	}),
);

app.get("/", (c) => {
	return c.render(<h1>Hello!</h1>);
});

app.route("/polymarket", polymarket);

export default app;
