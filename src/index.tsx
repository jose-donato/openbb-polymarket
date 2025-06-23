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
	return c.render(
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
			</head>
			<body>
				<div class="flex min-h-screen flex-col items-center justify-center bg-white py-6">
					<div style="display: flex; flex-direction: column; align-items: center;"
						class="container max-w-3xl px-4 flex flex-col items-center">
						<div class="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
							<img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Company_Logo_Polymarket.png" alt="Polymarket" class="h-20 w-auto" />
						</div>

						<div class="text-center space-y-4 mb-8">
							<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Polymarket Backend for OpenBB Workspace
							</h1>
						</div>

						<p class="text-sm text-gray-600 text-center mb-6">Created by <a href="https://x.com/josedonato__" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">@josedonato__</a></p>

						<div class="bg-gray-50 rounded-lg p-6 w-full max-w-2xl">
							<h2 class="text-lg font-semibold text-gray-900 mb-4">How to Add to OpenBB Workspace</h2>
							<ol class="list-decimal list-inside space-y-2 text-sm text-gray-700">
								<li>Log in to your OpenBB Pro account at <a href="https://pro.openbb.co" class="text-blue-600 hover:underline">pro.openbb.co</a></li>
								<li>Navigate to the <strong>Apps</strong> page</li>
								<li>Click the <strong>Connect backend</strong> button</li>
								<li>Fill in the following details:
									<ul class="list-disc list-inside ml-4 mt-1 space-y-1">
										<li><strong>Name</strong>: Polymarket Backend</li>
										<li><strong>URL</strong>: <code>https://openbb-polymarket.jose-donato.workers.dev/</code></li>
									</ul>
								</li>
								<li>Click the <strong>Test</strong> button to verify the connection</li>
								<li>If the test is successful, click the <strong>Add</strong> button</li>
							</ol>
							<p class="text-sm text-gray-600 mt-4">Once added, you'll find Polymarket app available in the Apps section of OpenBB Workspace.</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
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
		home_cards: {
			name: "Home Cards",
			description: "Get featured events for the home page on Polymarket (ordered by 24hr volume)",
			source: "Polymarket",
			endpoint: "/polymarket/home_cards",
			params: [
				{
					paramName: "limit",
					description: "The number of events to return",
					type: "number",
					value: 20,
				},
				{
					paramName: "offset",
					description: "The offset for pagination",
					type: "number",
					value: 0,
				},
				{
					paramName: "tag_id",
					description: "Optional tag ID to filter the events",
					type: "text",
					value: "",
				},
			],
		},
		event_comments: {
			name: "Event Comments",
			description: "Get user comments for a specific event on Polymarket",
			source: "Polymarket",
			endpoint: "/polymarket/event_comments",
			params: [
				{
					paramName: "id",
					description: "The id of the event to get comments for",
					type: "number",
					value: 16111,
				},
				{
					paramName: "limit",
					description: "The number of comments to return",
					type: "number",
					value: 40,
				},
				{
					paramName: "offset",
					description: "The offset for pagination",
					type: "number",
					value: 0,
				},
				{
					paramName: "holders_only",
					description: "Show only comments from token holders",
					type: "text",
					value: "false",
					options: [
						{ label: "All Users", value: "false" },
						{ label: "Holders Only", value: "true" },
					],
				},
				{
					paramName: "order",
					description: "Order comments by",
					type: "text",
					value: "createdAt",
					options: [
						{ label: "Created Date", value: "createdAt" },
						{ label: "Reaction Count", value: "reactionCount" },
					],
				},
			],
		},
	});
});

app.route("/polymarket", polymarket);

export default app;
