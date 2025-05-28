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

app.get("/widgets.json", (c) => {
	return c.json({
		search_events: {
			name: "Search Events",
			description: "Search for events on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/search_events",
			params: [
				{
					paramName: "query",
					description: "The query to search for",
					type: "text",
					value: "f1",
				},
				{
					paramName: "status",
					description: "The status of the events to search for",
					type: "text",
					value: "active",
					options: [
						{
							label: "Active",
							value: "active",
						},
						{
							label: "Ended",
							value: "resolved",
						},
					],
				},
			],
		},
		search_tags: {
			name: "Search Tags",
			description: "Search for tags on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/search_tags",
			params: [
				{
					paramName: "query",
					description: "The query to search for",
					type: "text",
					value: "f1",
				},
			],
		},
		top_events: {
			name: "Top Events",
			description: "Get the top events on Polymarket (volume > 1.0)",
			source: "Polymarket",
			endpoint: "/polymarket/top_events",
			params: [
				{
					paramName: "limit",
					description: "The number of events to return",
					type: "number",
					value: 500,
				},
				{
					paramName: "status",
					description: "The status of the events to return",
					type: "text",
					value: "active",
					options: [
						{ label: "Active", value: "active" },
						{ label: "Ended", value: "resolved" },
					],
				},
			],
		},
		top_markets: {
			name: "Top Markets",
			description: "Get the top markets on Polymarket (volume > 1.0)",
			source: "Polymarket",
			endpoint: "/polymarket/top_markets",
			params: [
				{
					paramName: "limit",
					description: "The number of markets to return",
					type: "number",
					value: 500,
				},
				{
					paramName: "status",
					description: "The status of the markets to return",
					type: "text",
					value: "active",
					options: [
						{ label: "Active", value: "active" },
						{ label: "Ended", value: "resolved" },
					],
				},
			],
		},
	});
});

app.route("/polymarket", polymarket);

export default app;
