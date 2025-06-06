import { Hono } from "hono";

const formatNumber = (num: number | string | undefined | null): string => {
	if (num === undefined || num === null) {
		return "0";
	}
	const value = typeof num === "string" ? Number.parseFloat(num) : num;
	if (Number.isNaN(value)) {
		return "0";
	}
	return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const formatDate = (dateStr: string | undefined | null): string => {
	if (!dateStr) {
		return "Not specified";
	}
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) {
		return "Invalid date";
	}
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});
};

const formatPercentage = (value: number | undefined | null): string => {
	if (value === undefined || value === null || Number.isNaN(value)) {
		return "0%";
	}
	return `${(value * 100).toFixed(1)}%`;
};

const formatChangePercentage = (value: number | undefined | null): string => {
	if (value === undefined || value === null || Number.isNaN(value)) {
		return "0%";
	}
	const sign = value >= 0 ? "+" : "";
	return `${sign}${(value * 100).toFixed(2)}%`;
};

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

type DetailedMarket = {
	id: string;
	question: string;
	conditionId: string;
	slug: string;
	resolutionSource: string;
	endDate: string;
	liquidity: string;
	startDate: string;
	image: string;
	icon: string;
	description: string;
	outcomes: string;
	outcomePrices: string;
	volume: string;
	active: boolean;
	closed: boolean;
	marketMakerAddress: string;
	createdAt: string;
	updatedAt: string;
	new: boolean;
	featured: boolean;
	submitted_by: string;
	archived: boolean;
	resolvedBy: string;
	restricted: boolean;
	groupItemTitle: string;
	groupItemThreshold: string;
	questionID: string;
	enableOrderBook: boolean;
	orderPriceMinTickSize: number;
	orderMinSize: number;
	umaResolutionStatus: string;
	volumeNum: number;
	liquidityNum: number;
	endDateIso: string;
	startDateIso: string;
	hasReviewedDates: boolean;
	volume24hr: number;
	volume1wk: number;
	volume1mo: number;
	volume1yr: number;
	clobTokenIds: string;
	umaBond: string;
	umaReward: string;
	volume24hrClob: number;
	volume1wkClob: number;
	volume1moClob: number;
	volume1yrClob: number;
	volumeClob: number;
	liquidityClob: number;
	acceptingOrders: boolean;
	negRisk: boolean;
	negRiskMarketID: string;
	negRiskRequestID: string;
	ready: boolean;
	funded: boolean;
	acceptingOrdersTimestamp: string;
	cyom: boolean;
	competitive: number;
	pagerDutyNotificationEnabled: boolean;
	approved: boolean;
	clobRewards: Array<{
		id: string;
		conditionId: string;
		assetAddress: string;
		rewardsAmount: number;
		rewardsDailyRate: number;
		startDate: string;
		endDate: string;
	}>;
	rewardsMinSize: number;
	rewardsMaxSpread: number;
	spread: number;
	oneDayPriceChange: number;
	oneWeekPriceChange: number;
	oneMonthPriceChange: number;
	lastTradePrice: number;
	bestBid: number;
	bestAsk: number;
	automaticallyActive: boolean;
	clearBookOnStart: boolean;
	manualActivation: boolean;
	negRiskOther: boolean;
	umaResolutionStatuses: string;
	pendingDeployment: boolean;
	deploying: boolean;
	rfqEnabled: boolean;
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

type DetailedEvent = {
	id: string;
	ticker: string;
	slug: string;
	title: string;
	description: string;
	resolutionSource: string;
	startDate: string;
	creationDate: string;
	endDate: string;
	image: string;
	icon: string;
	active: boolean;
	closed: boolean;
	archived: boolean;
	new: boolean;
	featured: boolean;
	restricted: boolean;
	liquidity: number;
	volume: number;
	openInterest: number;
	sortBy: string;
	createdAt: string;
	updatedAt: string;
	competitive: number;
	volume24hr: number;
	volume1wk: number;
	volume1mo: number;
	volume1yr: number;
	enableOrderBook: boolean;
	liquidityClob: number;
	negRisk: boolean;
	negRiskMarketID: string;
	commentCount: number;
	markets: Array<{
		id: string;
		question: string;
		conditionId: string;
		slug: string;
		resolutionSource: string;
		endDate: string;
		liquidity: string;
		startDate: string;
		image: string;
		icon: string;
		description: string;
		outcomes: string;
		outcomePrices: string;
		volume: string;
		active: boolean;
		closed: boolean;
		marketMakerAddress: string;
		createdAt: string;
		updatedAt: string;
		new: boolean;
		featured: boolean;
		submitted_by: string;
		archived: boolean;
		resolvedBy: string;
		restricted: boolean;
		groupItemTitle: string;
		groupItemThreshold: string;
		questionID: string;
		enableOrderBook: boolean;
		orderPriceMinTickSize: number;
		orderMinSize: number;
		volumeNum: number;
		liquidityNum: number;
		endDateIso: string;
		startDateIso: string;
		hasReviewedDates: boolean;
		volume24hr: number;
		volume1wk: number;
		volume1mo: number;
		volume1yr: number;
		clobTokenIds: string;
		umaBond: string;
		umaReward: string;
		volume24hrClob: number;
		volume1wkClob: number;
		volume1moClob: number;
		volume1yrClob: number;
		volumeClob: number;
		liquidityClob: number;
		acceptingOrders: boolean;
		negRisk: boolean;
		negRiskMarketID: string;
		negRiskRequestID: string;
		ready: boolean;
		funded: boolean;
		acceptingOrdersTimestamp: string;
		cyom: boolean;
		competitive: number;
		pagerDutyNotificationEnabled: boolean;
		approved: boolean;
		clobRewards?: Array<{
			id: string;
			conditionId: string;
			assetAddress: string;
			rewardsAmount: number;
			rewardsDailyRate: number;
			startDate: string;
			endDate: string;
		}>;
		rewardsMinSize: number;
		rewardsMaxSpread: number;
		spread: number;
		oneDayPriceChange?: number;
		oneHourPriceChange?: number;
		oneWeekPriceChange?: number;
		oneMonthPriceChange?: number;
		lastTradePrice: number;
		bestBid: number;
		bestAsk: number;
		automaticallyActive: boolean;
		clearBookOnStart: boolean;
		seriesColor: string;
		showGmpSeries: boolean;
		showGmpOutcome: boolean;
		manualActivation: boolean;
		negRiskOther: boolean;
		umaResolutionStatuses: string;
		pendingDeployment: boolean;
		deploying: boolean;
		rfqEnabled: boolean;
	}>;
	tags: Array<{
		id: string;
		label: string;
		slug: string;
		createdAt?: string;
		forceShow?: boolean;
		publishedAt?: string;
		updatedBy?: number;
		updatedAt?: string;
		forceHide?: boolean;
	}>;
	cyom: boolean;
	showAllOutcomes: boolean;
	showMarketImages: boolean;
	enableNegRisk: boolean;
	automaticallyActive: boolean;
	gmpChartMode: string;
	negRiskAugmented: boolean;
	pendingDeployment: boolean;
	deploying: boolean;
};

type PriceHistoryResponse = {
	history: Array<{
		t: number; // Unix timestamp
		p: number; // Price between 0-1
	}>;
};

const parseClobTokenIds = (
	clobTokenIds: string,
): { yes?: string; no?: string } => {
	try {
		const parsed = JSON.parse(clobTokenIds) as string[];
		return {
			yes: parsed[0],
			no: parsed[1],
		};
	} catch {
		return {};
	}
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
	const { limit, status, tag } = c.req.query();
	const response = await fetch(
		`https://gamma-api.polymarket.com/events?active=${status === "active"}&closed=${status === "resolved"}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0${tag ? `&tag_id=${tag}` : ""}`,
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
	const { limit, status, tag } = c.req.query();
	const response = await fetch(
		`https://gamma-api.polymarket.com/markets?active=${status === "active"}&closed=${status === "resolved"}&limit=${limit}&order=volume&ascending=false&volume_num_min=1.0${tag ? `&tag_id=${tag}` : ""}`,
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

polymarket.get("/market_details", async (c) => {
	const { id } = c.req.query();

	const response = await fetch(
		`https://gamma-api.polymarket.com/markets/${id}`,
	);

	if (!response.ok) {
		return c.json({ error: "Market not found" }, 404);
	}

	const market = (await response.json()) as DetailedMarket;

	const outcomes = JSON.parse(market.outcomes) as string[];
	const prices = JSON.parse(market.outcomePrices) as string[];
	const tokenIds = parseClobTokenIds(market.clobTokenIds);

	const markdown = `# ${market.question}

## Market Overview
- **Market ID**: ${market.id}
- **Status**: ${market.active ? "🟢 Active" : "🔴 Closed"}
- **Category**: ${market.groupItemTitle}
- **Created**: ${formatDate(market.createdAt)}
- **End Date**: ${formatDate(market.endDate)}

## Description
${market.description}

## Current Prices
${outcomes.map((outcome, i) => `- **${outcome}**: ${(Number.parseFloat(prices[i]) * 100).toFixed(1)}%`).join("\n")}

## Token IDs
${tokenIds.yes ? `- **Yes Token ID**: ${tokenIds.yes}` : ""}
${tokenIds.no ? `- **No Token ID**: ${tokenIds.no}` : ""}

## Trading Information
- **Last Trade Price**: ${(market.lastTradePrice * 100).toFixed(1)}%
- **Best Bid**: ${(market.bestBid * 100).toFixed(1)}%
- **Best Ask**: ${(market.bestAsk * 100).toFixed(1)}%
- **Spread**: ${(market.spread * 100).toFixed(2)}%

## Volume & Liquidity
- **Total Volume**: $${formatNumber(market.volumeNum)}
- **24h Volume**: $${formatNumber(market.volume24hr)}
- **7d Volume**: $${formatNumber(market.volume1wk)}
- **30d Volume**: $${formatNumber(market.volume1mo)}
- **Liquidity**: $${formatNumber(market.liquidityNum)}

## Price Changes
- **24h Change**: ${market.oneDayPriceChange >= 0 ? "+" : ""}${(market.oneDayPriceChange * 100).toFixed(2)}%
- **7d Change**: ${market.oneWeekPriceChange >= 0 ? "+" : ""}${(market.oneWeekPriceChange * 100).toFixed(2)}%
- **30d Change**: ${market.oneMonthPriceChange >= 0 ? "+" : ""}${(market.oneMonthPriceChange * 100).toFixed(2)}%

## Market Details
- **Resolution Source**: ${market.resolutionSource || "Not specified"}
- **UMA Resolution Status**: ${market.umaResolutionStatus}
- **Order Book Enabled**: ${market.enableOrderBook ? "Yes" : "No"}
- **Accepting Orders**: ${market.acceptingOrders ? "Yes" : "No"}
- **Min Order Size**: ${market.orderMinSize}
- **Price Tick Size**: ${market.orderPriceMinTickSize}

## Links
- **Polymarket URL**: https://polymarket.com/event/${market.slug}
- **Market Image**: ${market.image}`;

	c.header("Content-Type", "text/markdown");
	return c.text(markdown);
});

polymarket.get("/event_details", async (c) => {
	const { id } = c.req.query();

	const response = await fetch(`https://gamma-api.polymarket.com/events/${id}`);

	if (!response.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await response.json()) as DetailedEvent;

	// Sort markets by volume (highest first)
	const sortedMarkets = [...event.markets].sort(
		(a, b) => b.volumeNum - a.volumeNum,
	);

	const markdown = `# ${event.title}

## Event Overview
- **Event ID**: ${event.id}
- **Status**: ${event.active ? "🟢 Active" : "🔴 Closed"}
- **Ticker**: ${event.ticker}
- **Created**: ${formatDate(event.createdAt)}
- **End Date**: ${formatDate(event.endDate)}
- **Tags**: ${event.tags.map((tag) => tag.label).join(", ")}

## Description
${event.description}

## Event Statistics
- **Total Volume**: $${formatNumber(event.volume)}
- **Total Liquidity**: $${formatNumber(event.liquidity)}
- **24h Volume**: $${formatNumber(event.volume24hr)}
- **7d Volume**: $${formatNumber(event.volume1wk)}
- **30d Volume**: $${formatNumber(event.volume1mo)}
- **Markets Count**: ${event.markets.length}
- **Comments**: ${event.commentCount}

## Markets

| # | Question | Outcomes & Odds | Token IDs | Last Trade | Volume | 24h Volume | Liquidity | Spread | Market ID |
|---|----------|-----------------|-----------|------------|--------|------------|-----------|--------|-----------|
${sortedMarkets
	.map((market, index) => {
		const outcomes = JSON.parse(market.outcomes ?? "[]") as string[];
		const prices = JSON.parse(market.outcomePrices ?? "[]") as string[];
		const tokenIds = parseClobTokenIds(market.clobTokenIds);

		const outcomesText = outcomes
			.map(
				(outcome, i) =>
					`${outcome}: ${formatPercentage(Number.parseFloat(prices[i]))}`,
			)
			.join("<br>");

		const tokenIdsText = `Yes: ${tokenIds.yes || "N/A"}<br>No: ${tokenIds.no || "N/A"}`;

		return `| ${index + 1} | ${market.question} | ${outcomesText} | ${tokenIdsText} | ${formatPercentage(market.lastTradePrice)} | $${formatNumber(market.volumeNum)} | $${formatNumber(market.volume24hr)} | $${formatNumber(market.liquidityNum)} | ${formatPercentage(market.spread)} | ${market.id} |`;
	})
	.join("\n")}

## Event Details
- **Resolution Source**: ${event.resolutionSource || "Not specified"}
- **Order Book Enabled**: ${event.enableOrderBook ? "Yes" : "No"}
- **Neg Risk**: ${event.negRisk ? "Yes" : "No"}
- **Competitive Score**: ${(event.competitive * 100).toFixed(1)}%
- **Restricted**: ${event.restricted ? "Yes" : "No"}

## Links
- **Polymarket URL**: https://polymarket.com/event/${event.slug}
- **Event Image**: ${event.image}`;

	c.header("Content-Type", "text/markdown");
	return c.text(markdown);
});

polymarket.get("/market_price_history", async (c) => {
	const { market, interval = "all", fidelity = "720" } = c.req.query();

	if (!market) {
		return c.json({ error: "Market ID is required" }, 400);
	}

	const marketIds = market.split(",");

	// Fetch price history for each market in parallel
	const marketDataPromises = marketIds.map((marketId) =>
		fetch(
			`https://clob.polymarket.com/prices-history?interval=${interval}&market=${marketId}&fidelity=${fidelity}`,
		).then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to fetch price history for market ${marketId}`);
			}
			return response.json() as Promise<PriceHistoryResponse>;
		}),
	);

	try {
		const marketDataResults = await Promise.all(marketDataPromises);

		// Create a trace for each market
		const traces = marketDataResults.map((data, index) => {
			const marketId = marketIds[index];
			return {
				x: data.history.map((point) => new Date(point.t * 1000).toISOString()),
				y: data.history.map((point) => point.p * 100),
				type: "scatter",
				mode: "lines",
				name: `Market ${marketId}`,
				line: {
					width: 2,
				},
			};
		});

		// Return Plotly-compatible JSON
		const plotlyData = {
			data: traces,
			layout: {
				xaxis: {
					title: "Date",
					type: "date",
				},
				yaxis: {
					title: "Price (%)",
					range: [0, 100],
					ticksuffix: "%",
				},
				margin: {
					l: 60,
					r: 30,
					t: 50,
					b: 50,
				},
				hovermode: "x unified",
				showlegend: false,
			},
		};

		return c.json(plotlyData);
	} catch (error) {
		return c.json(
			{ error: "Failed to fetch price history for one or more markets" },
			500,
		);
	}
});

export default polymarket;
