```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```


https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=500&order=volume&ascending=false
https://gamma-api.polymarket.com/markets/507300
https://gamma-api.polymarket.com/events/19694

https://polymarket.com/api/tags/filteredBySlug?tag=all&status=active
https://gamma-api.polymarket.com/events/pagination?limit=20&active=true&archived=false&closed=false&order=volume24hr&ascending=false&offset=0
https://clob.polymarket.com/rewards/markets/0xf2a89afeddff5315e37211b0b0e4e93ed167fba2694cd35c252672d0aca73711
https://data-api.polymarket.com/trades?market=0x6edc6c77c16ef3ba1bcd646159f12f8b8a39528e500dcff95b9220ccfbb75141,0xf2a89afeddff5315e37211b0b0e4e93ed167fba2694cd35c252672d0aca73711,0xb3af306795f672a0bcaf4bd529ffa8343e88949bc74b098ccd2a0238ce676cd3,0xf4472853ab134236dbfe4cd5f83fcbc60f62767b2a474a1c0b0ed3190d813084&limit=10&offset=0&filterType=CASH&filterAmount=1
https://data-api.polymarket.com/holders?market=0xf2a89afeddff5315e37211b0b0e4e93ed167fba2694cd35c252672d0aca73711&limit=30
https://gamma-api.polymarket.com/comments?get_positions=true&get_reports=true&parent_entity_type=Event&parent_entity_id=12815&ascending=false&holders_only=false&order=createdAt&limit=40&offset=0
https://clob.polymarket.com/prices-history?interval=all&market=83527644927648970835156950007024690327726158617181889316317174894904268227846&fidelity=720
https://clob.polymarket.com/prices-history?interval=all&market=5044658213116494392261893544497225363846217319105609804585534197935770239191&fidelity=720


search
https://polymarket.com/api/events/global?q=treasury&events_status=active
