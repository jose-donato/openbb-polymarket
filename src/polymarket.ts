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

const polymarket = new Hono();

type MarketEvent = {
	slug: string;
	question: string;
	groupItemTitle: string;
	outcomes: string[];
	outcomePrices: string[];
	lastTradePrice: number;
	bestAsk: number;
	bestBid: number;
	spread: number;
	closed: boolean;
	archived: boolean;
};

type Market = {
	id: string;
	slug: string;
	question: string;
	outcomes: string;
	outcomePrices: string;
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
	id: string;
	url: string;
	title: string;
	slug: string;
	closed: boolean;
	startDate: string;
	endDate: string;
	markets: MarketEvent[];
	ended: boolean;
};

type Tag = {
	id: string;
	label: string;
	slug: string;
	event_count: number;
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
		t: number;
		p: number;
	}>;
};

type TrendingTag = {
	id: string;
	label: string;
	slug: string;
	forceShow?: boolean;
	forceHide?: boolean;
	publishedAt?: string;
	updatedBy?: number;
	createdAt: string;
	updatedAt?: string;
};

type CommentProfile = {
	name?: string;
	pseudonym: string;
	displayUsernamePublic: boolean;
	bio?: string;
	proxyWallet: string;
	baseAddress: string;
	profileImage?: string;
	positions?: Array<{
		tokenId: string;
		positionSize: string;
	}>;
};

type CommentReaction = {
	id: string;
	commentID: number;
	reactionType: string;
	userAddress: string;
	profile: {
		proxyWallet: string;
	};
};

type Comment = {
	id: string;
	body: string;
	parentEntityType: string;
	parentEntityID: number;
	parentCommentID?: string;
	userAddress: string;
	replyAddress?: string;
	createdAt: string;
	updatedAt: string;
	profile: CommentProfile;
	reactions?: CommentReaction[];
	reportCount: number;
	reactionCount: number;
};

type UserPosition = {
	proxyWallet: string;
	asset: string;
	conditionId: string;
	size: number;
	avgPrice: number;
	initialValue: number;
	currentValue: number;
	cashPnl: number;
	percentPnl: number;
	totalBought: number;
	realizedPnl: number;
	percentRealizedPnl: number;
	curPrice: number;
	redeemable: boolean;
	mergeable: boolean;
	title: string;
	slug: string;
	icon: string;
	eventSlug: string;
	outcome: string;
	outcomeIndex: number;
	oppositeOutcome: string;
	oppositeAsset: string;
	endDate: string;
	negativeRisk: boolean;
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

	return c.json(
		data.events.map((event) => ({
			id: event.id,
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
			id: tag.id,
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
			id: event.id,
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
			id: market.id,
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
	const {
		market,
		interval = "all",
		fidelity = "720",
		theme = "dark",
	} = c.req.query();

	if (!market) {
		return c.json({ error: "Market ID is required" }, 400);
	}

	// Set theme colors
	const bgColor = theme === "dark" ? "#151518" : "#FFFFFF";
	const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
	const gridColor = theme === "dark" ? "#444444" : "#E0E0E0";
	const lineColors =
		theme === "dark"
			? ["#00D4FF", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]
			: ["#007BFF", "#DC3545", "#28A745", "#FFC107", "#6F42C1", "#FD7E14"];

	const marketIds = market.split(",");

	const marketDataPromises = marketIds.map(async (marketId) => {
		const priceHistoryResponse = await fetch(
			`https://clob.polymarket.com/prices-history?interval=${interval}&market=${marketId}&fidelity=${fidelity}`,
		);

		if (!priceHistoryResponse.ok) {
			throw new Error(`Failed to fetch price history for market ${marketId}`);
		}

		const priceHistory =
			(await priceHistoryResponse.json()) as PriceHistoryResponse;

		return {
			marketId,
			priceHistory,
		};
	});

	try {
		const marketDataResults = await Promise.all(marketDataPromises);

		const traces = marketDataResults.map((data, index) => {
			return {
				x: data.priceHistory.history.map((point) =>
					new Date(point.t * 1000).toISOString(),
				),
				y: data.priceHistory.history.map((point) => point.p * 100),
				type: "scatter",
				mode: "lines",
				name: `Market ${data.marketId}`,
				line: {
					width: 2,
					color: lineColors[index % lineColors.length],
				},
			};
		});

		const plotlyData = {
			data: traces,
			layout: {
				plot_bgcolor: bgColor,
				paper_bgcolor: bgColor,
				font: {
					color: textColor,
				},
				xaxis: {
					title: "Date",
					type: "date",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				yaxis: {
					title: "Price (%)",
					range: [0, 100],
					ticksuffix: "%",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
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

polymarket.get("/event_markets", async (c) => {
	const { id } = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	const response = await fetch(`https://gamma-api.polymarket.com/events/${id}`);

	if (!response.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await response.json()) as DetailedEvent;

	const sortedMarkets = [...event.markets].sort(
		(a, b) => b.volumeNum - a.volumeNum,
	);

	return c.json(
		sortedMarkets.map((market) => {
			const outcomes = JSON.parse(market.outcomes ?? "[]") as string[];
			const prices = JSON.parse(market.outcomePrices ?? "[]") as string[];
			const tokenIds = parseClobTokenIds(market.clobTokenIds);

			const outcomeData: Record<string, number> = {};
			outcomes.forEach((outcome, index) => {
				const key = outcome.toLowerCase().replace(/\s+/g, "_");
				outcomeData[key] = Number.parseFloat(prices[index] || "0");
			});

			return {
				id: market.id,
				question: market.question,
				slug: market.slug,
				active: market.active,
				outcomes,
				...outcomeData,
				tokenIds,
				lastTradePrice: market.lastTradePrice,
				bestBid: market.bestBid,
				bestAsk: market.bestAsk,
				spread: market.spread,
				volume: market.volumeNum,
				liquidity: market.liquidityNum,
				volume24hr: market.volume24hr,
				volume1wk: market.volume1wk,
				volume1mo: market.volume1mo,
				volume1yr: market.volume1yr,
				oneDayPriceChange: market.oneDayPriceChange,
				oneWeekPriceChange: market.oneWeekPriceChange,
				oneMonthPriceChange: market.oneMonthPriceChange,
				endDate: market.endDate,
				createdAt: market.createdAt,
				description: market.description,
				resolutionSource: market.resolutionSource,
				acceptingOrders: market.acceptingOrders,
				orderMinSize: market.orderMinSize,
				groupItemTitle: market.groupItemTitle,
			};
		}),
	);
});

polymarket.get("/trending_tags", async (c) => {
	const response = await fetch(
		"https://polymarket.com/api/tags/filteredBySlug?tag=all&status=active",
	);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch trending tags" }, 500);
	}

	const data = (await response.json()) as TrendingTag[];

	return c.json(
		data.map((tag) => ({
			id: tag.id,
			label: tag.label,
			slug: tag.slug,
			createdAt: formatDate(tag.createdAt),
		})),
	);
});

polymarket.get("/event_price_history", async (c) => {
	const {
		id,
		interval = "all",
		fidelity = "720",
		theme = "dark",
	} = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	// Set theme colors
	const bgColor = theme === "dark" ? "#151518" : "#FFFFFF";
	const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
	const gridColor = theme === "dark" ? "#444444" : "#E0E0E0";
	const lineColors =
		theme === "dark"
			? [
					"#00D4FF",
					"#FF6B6B",
					"#4ECDC4",
					"#45B7D1",
					"#96CEB4",
					"#FFEAA7",
					"#DDA0DD",
					"#F0E68C",
					"#FFA07A",
					"#98FB98",
				]
			: [
					"#007BFF",
					"#DC3545",
					"#28A745",
					"#FFC107",
					"#6F42C1",
					"#FD7E14",
					"#E83E8C",
					"#20C997",
					"#6610F2",
					"#17A2B8",
				];

	const eventResponse = await fetch(
		`https://gamma-api.polymarket.com/events/${id}`,
	);

	if (!eventResponse.ok) {
		return c.json({ error: "Event not found" }, 404);
	}

	const event = (await eventResponse.json()) as DetailedEvent;

	const marketDataPromises = event.markets.map(async (market) => {
		const tokenIds = parseClobTokenIds(market.clobTokenIds);

		const yesTokenId = tokenIds.yes;

		if (!yesTokenId) {
			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory: { history: [] },
			};
		}

		try {
			const priceHistoryResponse = await fetch(
				`https://clob.polymarket.com/prices-history?interval=${interval}&market=${yesTokenId}&fidelity=${fidelity}`,
			);

			if (!priceHistoryResponse.ok) {
				return {
					marketId: market.id,
					marketName: market.question,
					priceHistory: { history: [] },
				};
			}

			const priceHistory =
				(await priceHistoryResponse.json()) as PriceHistoryResponse;

			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory,
			};
		} catch (error) {
			return {
				marketId: market.id,
				marketName: market.question,
				priceHistory: { history: [] },
			};
		}
	});

	try {
		const marketDataResults = await Promise.all(marketDataPromises);

		const traces = marketDataResults
			.filter((data) => data.priceHistory.history.length > 0)
			.map((data, index) => {
				const yValues = data.priceHistory.history.map((point) => point.p * 100);
				const latestPrice = yValues[yValues.length - 1] || 0;

				return {
					x: data.priceHistory.history.map((point) =>
						new Date(point.t * 1000).toISOString(),
					),
					y: yValues,
					type: "scatter",
					mode: "lines",
					name: data.marketName,
					line: {
						width: 2,
						color: lineColors[index % lineColors.length],
					},
					latestPrice,
				};
			})
			.sort((a, b) => b.latestPrice - a.latestPrice);

		const plotlyData = {
			data: traces,
			layout: {
				title: {
					text: `${event.title} - Market Price History (Yes Outcomes)`,
					font: { color: textColor },
				},
				plot_bgcolor: bgColor,
				paper_bgcolor: bgColor,
				font: {
					color: textColor,
				},
				xaxis: {
					title: "Date",
					type: "date",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				yaxis: {
					title: "Price (%)",
					range: [0, 100],
					ticksuffix: "%",
					gridcolor: gridColor,
					tickfont: { color: textColor },
					titlefont: { color: textColor },
				},
				margin: {
					l: 60,
					r: 30,
					t: 80,
					b: 50,
				},
				hovermode: "x unified",
				showlegend: true,
				legend: {
					font: { color: textColor },
					bgcolor: "rgba(0,0,0,0)",
				},
			},
		};

		return c.json(plotlyData);
	} catch (error) {
		return c.json(
			{ error: "Failed to fetch price history for event markets" },
			500,
		);
	}
});

polymarket.get("/home_cards", async (c) => {
	const { limit = "20", offset = "0", tag_id } = c.req.query();

	let url = `https://gamma-api.polymarket.com/events/pagination?limit=${limit}&active=true&archived=false&closed=false&order=volume24hr&ascending=false&offset=${offset}`;

	if (tag_id && tag_id.trim() !== "") {
		url += `&tag_id=${tag_id}`;
	}

	const response = await fetch(url);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch home cards" }, 500);
	}

	const data = (await response.json()) as {
		data: (Event & {
			volume: number;
			liquidity: number;
			volume24hr: number;
			volume1w: number;
			volume1mo: number;
			volume1yr: number;
		})[];
		count: number;
		next_cursor: string | null;
	};

	return c.json(
		data.data.map((event) => ({
			id: event.id,
			title: event.title,
			slug: event.slug,
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
			url: event.url,
		})),
	);
});

polymarket.get("/event_comments", async (c) => {
	const {
		id,
		limit = "40",
		offset = "0",
		holders_only = "false",
		order = "createdAt",
	} = c.req.query();

	if (!id) {
		return c.json({ error: "Event ID is required" }, 400);
	}

	const url = `https://gamma-api.polymarket.com/comments?get_positions=true&get_reports=true&parent_entity_type=Event&parent_entity_id=${id}&ascending=false&holders_only=${holders_only}&order=${order}&limit=${limit}&offset=${offset}`;

	const response = await fetch(url);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch event comments" }, 500);
	}

	const comments = (await response.json()) as Comment[];

	return c.json(
		comments.map((comment) => ({
			body: comment.body,
			authorName: comment.profile.name || comment.profile.pseudonym,
			authorPseudonym: comment.profile.pseudonym,
			authorAddress: comment.userAddress,
			authorBio: comment.profile.bio,
			createdAt: formatDate(comment.createdAt),
			reactionCount: comment.reactionCount,
			reportCount: comment.reportCount,
			reactions:
				comment.reactions?.map((reaction) => ({
					type: reaction.reactionType,
					userAddress: reaction.userAddress,
				})) || [],
			positions:
				comment.profile.positions?.map((position) => ({
					tokenId: position.tokenId,
					positionSize: formatNumber(
						Number.parseFloat(position.positionSize) / 1e6,
					),
				})) || [],
			hasPositions: (comment.profile.positions?.length || 0) > 0,
		})),
	);
});

polymarket.get("/user_positions", async (c) => {
	const {
		user,
		sortBy = "CURRENT",
		sortDirection = "DESC",
		sizeThreshold = "0.1",
		limit = "50",
		offset = "0",
	} = c.req.query();

	if (!user) {
		return c.json({ error: "User address is required" }, 400);
	}

	const url = `https://data-api.polymarket.com/positions?user=${user}&sortBy=${sortBy}&sortDirection=${sortDirection}&sizeThreshold=${sizeThreshold}&limit=${limit}&offset=${offset}`;

	const response = await fetch(url);

	if (!response.ok) {
		return c.json({ error: "Failed to fetch user positions" }, 500);
	}

	const positions = (await response.json()) as UserPosition[];

	return c.json(
		positions.map((position) => ({
			title: position.title,
			size: formatNumber(position.size),
			average: formatPercentage(position.avgPrice),
			current: formatPercentage(position.curPrice),
			value: formatNumber(position.currentValue),
			pnl: position.cashPnl,
			pnl_percent: position.percentPnl,
		})),
	);
});

export default polymarket;
