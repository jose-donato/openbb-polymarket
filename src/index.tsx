import { Hono } from "hono";
import { html } from 'hono/html'
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
	return c.html(
		<html>
			<head>
				<title>Polymarket App for OpenBB Workspace</title>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
				{html`
          <script>
					function copyUrl() {
						const url = 'https://openbb-polymarket.jose-donato.workers.dev';
						navigator.clipboard.writeText(url).then(() => {
							const copyIcon = document.getElementById('copyIcon');
							const checkIcon = document.getElementById('checkIcon');
							const btn = document.getElementById('copyUrlBtn');
							
							copyIcon.classList.add('hidden');
							checkIcon.classList.remove('hidden');
							btn.classList.add('text-green-400');
							
							setTimeout(() => {
								copyIcon.classList.remove('hidden');
								checkIcon.classList.add('hidden');
								btn.classList.remove('text-green-400');
							}, 2000);
						});
					}
				</script>`}
			</head>
			<body>
				<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 py-6">
					<div style="display: flex; flex-direction: column; align-items: center;"
						class="container max-w-3xl px-4 flex flex-col items-center">
						<div class="flex items-center gap-2 text-xl font-bold text-white mb-6">
							<img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Company_Logo_Polymarket.png" alt="Polymarket" class="h-20 w-auto" />
						</div>

						<div class="text-center space-y-4 mb-8">
							<h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
								Polymarket App for OpenBB Workspace
							</h1>
						</div>

						<p class="text-sm text-gray-300 text-center mb-6">Created by <a href="https://x.com/josedonato__" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@josedonato__</a></p>

						<div class="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
							<h2 class="text-lg font-semibold text-white mb-4">How to Add to OpenBB Workspace</h2>
							<ol class="list-decimal list-inside space-y-2 text-sm text-gray-300">
								<li>Log in to your OpenBB account at <a href="https://pro.openbb.co" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">pro.openbb.co</a></li>
								<li>Navigate to the <strong>Apps</strong> page</li>
								<li>Click the <strong>Connect backend</strong> button</li>
								<li>Fill in the following details:
									<ul class="list-disc list-inside ml-4 mt-1 space-y-1">
										<li>
											<strong>Name</strong>: Polymarket Backend
										</li>
										<li>
											<strong>URL</strong>:
											<span class="inline-flex items-center gap-2">
												<code class="ml-1 bg-gray-700 text-gray-200 px-1 py-0.5 rounded">https://openbb-polymarket.jose-donato.workers.dev</code>
												<button
													id="copyUrlBtn"
													class="text-gray-400 hover:text-white transition-colors duration-200"
													onclick="copyUrl()"
												>
													<svg id="copyIcon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
													</svg>
													<svg id="checkIcon" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
													</svg>
												</button>
											</span>
										</li>
									</ul>
								</li>
								<li>Click <strong>Test</strong> to verify the connection</li>
								<li>If the test is successful, click <strong>Add</strong></li>
							</ol>
							<p class="text-sm text-gray-300 mt-4">Once added, you'll find Polymarket app available in the Apps section of OpenBB Workspace. All the widgets will also be available in search to add to your dashboards.</p>
						</div>

						<div class="flex justify-center mt-6">
							<a href="https://github.com/jose-donato/openbb-polymarket" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								Star on GitHub
							</a>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
});

app.get("/apps.json", (c) => {
	return c.json([{
		"name": "Polymarket",
		"img": "https://upload.wikimedia.org/wikipedia/commons/7/75/Company_Logo_Polymarket.png",
		"img_dark": "https://upload.wikimedia.org/wikipedia/commons/7/75/Company_Logo_Polymarket.png",
		"img_light": "https://upload.wikimedia.org/wikipedia/commons/7/75/Company_Logo_Polymarket.png",
		"description": "An OpenBB Workspace app that connects to the Polymarket API, enabling the integration of prediction market data. It defines widgets for visualizing Polymarket events, markets, price history, and analytics within the OpenBB Workspace interface.",
		"allowCustomization": true,
		"tabs": {
			"overview": {
				"id": "overview",
				"name": "Overview",
				"layout": [
					{
						"i": "trending_tags",
						"x": 0,
						"y": 2,
						"w": 40,
						"h": 11,
						"state": {
							"chartView": {
								"enabled": false,
								"chartType": "line"
							}
						}
					},
					{
						"i": "home_cards",
						"x": 0,
						"y": 13,
						"w": 40,
						"h": 12,
						"state": {
							"chartView": {
								"enabled": false,
								"chartType": "line"
							}
						}
					},
					{
						"i": "top_events",
						"x": 0,
						"y": 25,
						"w": 40,
						"h": 23,
						"state": {
							"params": {
								"limit": "20"
							},
							"chartModel": {
								"modelType": "range",
								"chartType": "groupedBar",
								"chartOptions": {
									"common": {
										"axes": {
											"category": {
												"label": {
													"avoidCollisions": true,
													"fontSize": 11,
													"minSpacing": 5,
													"autoRotate": true
												},
												"position": "bottom"
											},
											"radius-category": {
												"label": {
													"avoidCollisions": true,
													"fontSize": 11,
													"minSpacing": 5
												}
											},
											"angle-category": {
												"label": {
													"avoidCollisions": true,
													"fontSize": 11,
													"minSpacing": 5
												}
											},
											"grouped-category": {
												"label": {
													"avoidCollisions": true,
													"fontSize": 11,
													"minSpacing": 5
												}
											},
											"number": {
												"position": "left",
												"crosshair": {
													"label": {}
												},
												"label": {
													"fontSize": 11,
													"autoRotate": false,
													"avoidCollisions": true
												}
											},
											"time": {
												"position": "bottom",
												"label": {
													"avoidCollisions": true,
													"fontSize": 11,
													"rotation": 0
												}
											}
										},
										"legend": {
											"position": "top",
											"maxHeight": 50,
											"spacing": 20,
											"item": {
												"paddingX": 32,
												"paddingY": 8,
												"marker": {
													"shape": "square",
													"padding": 5,
													"size": 11
												},
												"label": {
													"color": "#fff",
													"fontSize": 11
												}
											}
										}
									},
									"line": {
										"series": {
											"label": {
												"enabled": false
											},
											"tooltip": {
												"enabled": true
											}
										},
										"legend": {
											"enabled": false
										}
									},
									"pie": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"calloutLabel": {
												"enabled": true
											},
											"sectorLabel": {
												"enabled": true
											}
										}
									},
									"donut": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"calloutLabel": {
												"enabled": true
											},
											"sectorLabel": {
												"enabled": true
											}
										}
									},
									"area": {
										"series": {
											"label": {
												"enabled": false
											},
											"tooltip": {
												"enabled": true
											}
										}
									},
									"bubble": {
										"series": {
											"label": {
												"enabled": false
											},
											"tooltip": {
												"enabled": true
											}
										}
									},
									"histogram": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									},
									"bar": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false,
												"placement": "outside-end"
											}
										},
										"legend": {
											"enabled": false
										}
									},
									"scatter": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false,
												"placement": "top"
											}
										}
									},
									"treemap": {
										"series": {
											"group": {
												"label": {
													"enabled": true
												}
											},
											"tile": {
												"label": {
													"enabled": true
												}
											},
											"tooltip": {
												"enabled": true
											}
										},
										"padding": {
											"bottom": 10
										}
									},
									"sunburst": {
										"series": {
											"tooltip": {
												"enabled": true,
												"position": {
													"type": "pointer"
												},
												"interaction": {
													"enabled": true
												}
											},
											"label": {
												"enabled": true
											}
										},
										"padding": {
											"bottom": 10
										}
									},
									"heatmap": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": true
											}
										},
										"padding": {
											"bottom": 10
										}
									},
									"waterfall": {
										"series": {
											"tooltip": {
												"enabled": true
											}
										}
									},
									"radar-line": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									},
									"radar-area": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									},
									"radial-bar": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									},
									"radial-column": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									},
									"nightingale": {
										"series": {
											"tooltip": {
												"enabled": true
											},
											"label": {
												"enabled": false
											}
										}
									}
								},
								"cellRange": {
									"columns": [
										"title",
										"volume"
									]
								},
								"suppressChartRanges": true
							},
							"chartView": {
								"enabled": true,
								"chartType": "groupedBar"
							}
						}
					}
				]
			},
			"economy": {
				"id": "economy",
				"name": "Economy",
				"layout": [
					{
						"i": "top_events",
						"x": 0,
						"y": 2,
						"w": 40,
						"h": 13,
						"state": {
							"params": {
								"tag": "100328"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							},
							"columnState": {
								"default": {
									"focusedCell": {
										"colId": "id",
										"rowIndex": 9,
										"rowPinned": null
									}
								}
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 15,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "16094"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 27,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "16092"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 39,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "23700"
							}
						}
					}
				]
			},
			"fed-decisions": {
				"id": "fed-decisions",
				"name": "Fed Decisions",
				"layout": [
					{
						"i": "top_events",
						"x": 0,
						"y": 9,
						"w": 40,
						"h": 6,
						"state": {
							"params": {
								"tag": "100196"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							},
							"columnState": {
								"default": {
									"focusedCell": {
										"colId": "id",
										"rowIndex": 1,
										"rowPinned": null
									}
								}
							}
						}
					},
					{
						"i": "search_tags",
						"x": 0,
						"y": 2,
						"w": 40,
						"h": 7,
						"state": {
							"params": {
								"query": "fed"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							},
							"columnState": {
								"default": {
									"focusedCell": {
										"colId": "id",
										"rowIndex": 2,
										"rowPinned": null
									}
								}
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 15,
						"w": 40,
						"h": 9,
						"state": {
							"params": {
								"id": "21255"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 24,
						"w": 40,
						"h": 9,
						"state": {
							"params": {
								"id": "24087"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 33,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "27824"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 45,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "16085"
							}
						}
					}
				]
			},
			"f1": {
				"id": "f1",
				"name": "F1",
				"layout": [
					{
						"i": "top_events",
						"x": 0,
						"y": 2,
						"w": 40,
						"h": 13,
						"state": {
							"chartView": {
								"enabled": false,
								"chartType": "line"
							},
							"columnState": {
								"default": {
									"focusedCell": {
										"colId": "id",
										"rowIndex": 1,
										"rowPinned": null
									}
								}
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 15,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "19696"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 27,
						"w": 40,
						"h": 12,
						"state": {
							"params": {
								"id": "19694"
							}
						}
					}
				]
			},
			"events": {
				"id": "events",
				"name": "Events",
				"layout": [
					{
						"i": "search_events",
						"x": 0,
						"y": 2,
						"w": 40,
						"h": 8,
						"state": {
							"params": {
								"query": "politics"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							},
							"columnState": {
								"default": {
									"cellSelection": {
										"cellRanges": [
											{
												"startRow": {
													"rowIndex": 0,
													"rowPinned": null
												},
												"endRow": {
													"rowIndex": 0,
													"rowPinned": null
												},
												"colIds": [
													"id"
												],
												"startColId": "id"
											}
										]
									},
									"focusedCell": {
										"colId": "id",
										"rowIndex": 0,
										"rowPinned": null
									},
									"rangeSelection": {
										"cellRanges": [
											{
												"startRow": {
													"rowIndex": 0,
													"rowPinned": null
												},
												"endRow": {
													"rowIndex": 0,
													"rowPinned": null
												},
												"colIds": [
													"id"
												],
												"startColId": "id"
											}
										]
									}
								}
							}
						}
					},
					{
						"i": "event_markets",
						"x": 0,
						"y": 10,
						"w": 40,
						"h": 10,
						"state": {
							"params": {
								"id": "16111"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							}
						}
					},
					{
						"i": "event_details",
						"x": 0,
						"y": 20,
						"w": 40,
						"h": 10
					},
					{
						"i": "event_comments",
						"x": 0,
						"y": 43,
						"w": 40,
						"h": 10,
						"state": {
							"params": {
								"id": "16111"
							},
							"chartView": {
								"enabled": false,
								"chartType": "line"
							}
						}
					},
					{
						"i": "event_price_history",
						"x": 0,
						"y": 30,
						"w": 40,
						"h": 13,
						"state": {
							"params": {
								"id": "16111"
							}
						}
					}
				]
			}
		},
		"groups": []

	},
	]);
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
