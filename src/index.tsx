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
				{
					paramName: "tag",
					description: "The tag to filter the markets by",
					type: "text",
					value: "100389",
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
				{
					paramName: "tag",
					description: "The tag to filter the markets by",
					type: "text",
					value: "100389",
				},
			],
		},
		market_details: {
			name: "Market Details",
			description: "Get the details of a market on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/market_details",
			type: "markdown",
			params: [
				{
					paramName: "id",
					description: "The id of the market to get details for",
					type: "number",
					value: 507300,
				},
			],
		},
		event_details: {
			name: "Event Details",
			description: "Get the details of an event on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/event_details",
			type: "markdown",
			params: [
				{
					paramName: "id",
					description: "The id of the event to get details for",
					type: "number",
					value: 19694,
				},
			],
		},
		event_markets: {
			name: "Event Markets",
			description: "Get the markets of an event on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/event_markets",
			params: [
				{
					paramName: "id",
					description: "The id of the event to get markets for",
					type: "number",
					value: 19694,
				},
			],
		},
		price_history: {
			name: "Price History",
			description: "Get the price history of a market on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/market_price_history",
			type: "chart",
			params: [
				{
					paramName: "market",
					description: "The id of the market to get price history for",
					type: "text",
					multiple: true,
					value:
						"92013558332325676522644286533005478701382407428245344466165291954930219735076",
				},
			],
		},
		event_price_history: {
			name: "Event Price History",
			description: "Get the price history of all markets in an event on Polymarket (Yes outcomes)",
			source: "Polymarket",
			endpoint: "/polymarket/event_price_history",
			type: "chart",
			params: [
				{
					paramName: "id",
					description: "The id of the event to get price history for all markets",
					type: "number",
					value: 19694,
				},
			],
		},
		trending_tags: {
			name: "Trending Tags",
			description: "Get the trending tags on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/trending_tags",
		},
	});
});

app.route("/polymarket", polymarket);

export default app;
