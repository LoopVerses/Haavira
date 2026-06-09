const BASE_URL = process.env.TEST_BASE_URL ?? "http://localhost:3000";

const payload = {
  shipping: {
    email: "test@haavira.com",
    firstName: "Test",
    lastName: "Customer",
    addressLine1: "12 Oxford Street",
    addressLine2: "",
    city: "London",
    postcode: "W1D 1BS",
    country: "United Kingdom",
  },
  items: [
    {
      name: "HAAVIRA DNA Embroidered Hoodie",
      price: 6999,
      quantity: 1,
      size: "M",
    },
  ],
};

const methods = ["card", "paypal", "stripe", "payoneer"];

async function testMethod(method) {
  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, paymentMethod: method }),
  });

  const data = await res.json();

  return {
    method,
    status: res.status,
    ok: res.ok,
    paymentMethod: data.paymentMethod,
    testMode: data.testMode ?? false,
    url: data.url ? data.url.slice(0, 80) + "..." : null,
    error: data.error ?? null,
  };
}

async function main() {
  console.log(`\nHAAVIRA Checkout Flow Backtest`);
  console.log(`Target: ${BASE_URL}\n`);

  let passed = 0;

  for (const method of methods) {
    try {
      const result = await testMethod(method);
      const label = result.ok ? "PASS" : "FAIL";
      if (result.ok) passed += 1;

      console.log(`[${label}] ${method.toUpperCase()}`);
      console.log(`  status: ${result.status}`);
      if (result.url) console.log(`  redirect: ${result.url}`);
      if (result.testMode) console.log(`  testMode: true`);
      if (result.error) console.log(`  error: ${result.error}`);
      console.log("");
    } catch (error) {
      console.log(`[FAIL] ${method.toUpperCase()}`);
      console.log(`  error: ${error.message}`);
      console.log(`  hint: Is dev server running? npm run dev\n`);
    }
  }

  console.log(`Results: ${passed}/${methods.length} methods returned a checkout URL or valid test flow.`);

  if (passed === 0) {
    process.exitCode = 1;
  }
}

main();
