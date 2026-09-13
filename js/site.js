const SITE = {
  name: "batonwifhat",
  symbol: "batonwif",
  mint: "",
  x: "https://x.com/batonwifhatsol",
  pumpHome: "https://pump.fun",
  pumpCoin: "https://pump.fun/coin/",
  swapHome: "https://swap.pump.fun/",
  swapOut: "https://swap.pump.fun/?output=",
  dexHome: "https://dexscreener.com/solana",
  dexToken: "https://dexscreener.com/solana/",
  embedQuery:
    "?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15",
};

const $ = (id) => document.getElementById(id);

function tokenLinks() {
  const minted = Boolean(SITE.mint);
  return {
    buy: minted ? SITE.swapOut + SITE.mint : SITE.swapHome,
    pump: minted ? SITE.pumpCoin + SITE.mint : SITE.pumpHome,
    dex: minted ? SITE.dexToken + SITE.mint : SITE.dexHome,
    embed: minted
      ? SITE.dexToken + SITE.mint + SITE.embedQuery
      : SITE.dexHome + SITE.embedQuery,
    ca: minted ? SITE.mint : "TBA",
  };
}

function wireLinks() {
  const links = tokenLinks();
  ["buy-nav", "buy-hero"].forEach((id) => {
    const node = $(id);
    if (node) node.href = links.buy;
  });
  const joinPump = $("join-pump");
  const joinSwap = $("join-swap");
  const joinDex = $("join-dex");
  if (joinPump) joinPump.href = links.pump;
  if (joinSwap) joinSwap.href = links.buy;
  if (joinDex) joinDex.href = links.dex;
  const embed = $("dex-embed");
  if (embed) embed.src = links.embed;
  const ca = $("ca-value");
  if (ca) ca.textContent = links.ca;
}

function toast(message) {
  const node = $("toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 1800);
}

function copyCa() {
  const text = tokenLinks().ca;
  if (text === "TBA") {
    toast("Contract address coming soon");
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => toast("Contract copied"),
    () => toast("Copy failed")
  );
}

function spawnMotes() {
  const field = $("motes");
  for (let i = 0; i < 16; i += 1) {
    const mote = document.createElement("span");
    mote.className = "mote";
    const size = 8 + Math.random() * 14;
    mote.style.width = `${size}px`;
    mote.style.height = `${size}px`;
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.animationDuration = `${10 + Math.random() * 14}s`;
    mote.style.animationDelay = `${-Math.random() * 12}s`;
    field.appendChild(mote);
  }
}

function trackSpotlight() {
  const light = $("spotlight");
  window.addEventListener("pointermove", (event) => {
    light.style.left = `${event.clientX}px`;
    light.style.top = `${event.clientY}px`;
  });
}

function wireNav() {
  const scarf = $("scarf");
  const toggle = $("menu-btn");
  const nav = $("scarf-nav");
  window.addEventListener("scroll", () => {
    scarf.classList.toggle("scrolled", window.scrollY > 12);
  });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

wireLinks();
spawnMotes();
trackSpotlight();
wireNav();
$("ca-copy").addEventListener("click", copyCa);
