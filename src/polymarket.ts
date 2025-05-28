import { Hono } from "hono";

const polymarket = new Hono();

type MarketEvent = {
	slug: string; // e.g., "10-yr-treasury-yield-above-3-by-june-30"
	question: string; // e.g., "10 Yr Treasury yield above 3% by June 30?"
	groupItemTitle: string; // ?
	outcomes: string[]; // e.g., ["Yes", "No"]
	outcomePrices: string[]; // e.g., [0.9, 0.1]
	lastTradePrice: number; // e.g., 0.9
	bestAsk: number; // e.g., 0.91
	bestBid: number; // e.g., 0.9
	spread: number; // e.g., 0.01
	closed: boolean; // e.g., false
	archived: boolean; // e.g., false
};

type Market = {
	id: string; // e.g., "13907"
	slug: string; // e.g., "10-yr-treasury-yield-above-3-by-june-30"
	question: string; // e.g., "10 Yr Treasury yield above 3% by June 30?"
	outcomes: string; // e.g., '["Yes", "No"]'
	outcomePrices: string; // e.g., '[0.9, 0.1]'
	volume: string;
	liquidity: string;
	volume24hr: string;
	volume1w: string;
	volume1mo: string;
	volume1yr: string;
};

type Event = {
	id: string; // e.g., "13907"
	url: string; // e.g., "https://polymarket.com/event/10-yr-treasury-yield-above-3-by-june-30"
	title: string; // e.g., "10 Yr Treasury yield above 3% by June 30"
	slug: string; // e.g., "10-yr-treasury-yield-above-3-by-june-30"
	closed: boolean; // e.g., false
	startDate: string; // e.g., "2023-12-27T21:00:00.000Z"
	endDate: string; // e.g., "2024-06-30T21:00:00Z"
	markets: MarketEvent[];
	ended: boolean; // e.g., false
};

type Tag = {
	id: string; // e.g., 102028
	label: string; // e.g., "Treasuries"
	slug: string; // e.g., "treasuries"
	event_count: number; // e.g., 3
};

polymarket.get("/search_events", async (c) => {
	const { query, status } = c.req.query();

	const response = await fetch(
		`https://polymarket.com/api/events/global?q=${query}&events_status=${status}`,
	);

	const data = (await response.json()) as {
		events: Event[];
		tags: Tag[];
		hasMore: boolean;
	};

	console.log(data);

	return c.json(
		data.events.map((event) => ({
			id: `${event.id}‎`, // temp hack so it doesnt convert to number
			title: event.title,
			active: !event.closed,
			markets: event.markets
				.map(
					(market) =>
						`${market.slug}: ${market.outcomes.map((outcome, i) => `${outcome}(${market.outcomePrices[i]})`).join("/")}`,
				)
				.join("\n"),
			startDate: event.startDate,
			endDate: event.endDate,
		})),
	);
});

polymarket.get("/search_tags", async (c) => {
	const { query } = c.req.query();

	const response = await fetch(
		`https://polymarket.com/api/events/global?q=${query}&events_status=active`,
	);
	const data = (await response.json()) as {
		tags: Tag[];
	};

	return c.json(
		data.tags.map((tag) => ({
			id: `${tag.id}‎`, // temp hack so it doesnt convert to number
			label: tag.label,
			slug: tag.slug,
			event_count: tag.event_count,
		})),
	);
});

polymarket.get("/top_events", async (c) => {
	const { limit, status } = c.req.query();
	const response = await fetch(
		`https://gamma-api.polymarket.com/events?active=${status === "active"}&closed=${status === "resolved"}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0`,
	);
	const data = (await response.json()) as (Event & {
		volume: number;
		liquidity: number;
		volume24hr: number;
		volume1w: number;
		volume1mo: number;
		volume1yr: number;
	})[];

	return c.json(
		data.map((event) => ({
			id: `${event.id}‎`, // temp hack so it doesnt convert to number
			title: event.title,
			active: !event.closed,
			markets: event.markets
				.map(
					(market) =>
						`${market.slug}: ${Array.isArray(market.outcomes) ? market.outcomes.map((outcome, i) => `${outcome}(${market.outcomePrices[i]})`).join("/") : ""}`,
				)
				.join("\n"),
			volume: event.volume,
			liquidity: event.liquidity,
			volume24hr: event.volume24hr,
			volume1w: event.volume1w,
			volume1mo: event.volume1mo,
			volume1yr: event.volume1yr,
			startDate: event.startDate,
			endDate: event.endDate,
		})),
	);
});

polymarket.get("/top_markets", async (c) => {
	const { limit, status } = c.req.query();
	const response = await fetch(
		`https://gamma-api.polymarket.com/markets?active=${status === "active"}&closed=${status === "resolved"}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0`,
	);
	const data = (await response.json()) as Market[];

	return c.json(
		data.map((market) => ({
			id: `${market.id}‎`, // temp hack so it doesnt convert to number
			question: market.question,
			volume: market.volume,
			liquidity: market.liquidity,
			volume24hr: market.volume24hr,
			volume1w: market.volume1w,
			volume1mo: market.volume1mo,
			volume1yr: market.volume1yr,
		})),
	);
});
export default polymarket;
