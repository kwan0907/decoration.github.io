AppleBot v2.2.3.10 — RED TEAM LICENSE BYPASS TEST BUILD

Purpose
- Test whether the extension still operates when an attacker controls local JavaScript.
- This build deliberately weakens ONLY the license layer. c.js checkout/purchase logic is unchanged.

Deliberate test modifications in w.js
1. _3sx(code)
   - Does not call /api/license/activate.
   - Any activation attempt creates a local status=active license.

2. _3zx()
   - Does not revalidate with the license server.
   - Starting a task creates/returns a local status=active license.

3. _43x()
   - Does not call /api/license/consume.
   - Leaves the local license active and returns ok=true.

4. _E6(hash,machine)
   - Simulates abuse of the local emergency path by accepting any supplied hash.

What proves the weakness
- The extension can start a protected task without a valid server-issued activation token.
- The license server receives no /activate request during bypassed validation.
- After a successful order/consume trigger, the license remains active and no /consume request is sent.
- Reopening/restarting still permits the protected flow from local state.

Important
- This is intentionally insecure and must not replace the production build.
- c.js and Apple purchase/checkout logic were not modified.

Recommended production fix
- Do not treat any client-side active flag as authoritative.
- Require a short-lived, server-signed task capability for every protected operation.
- Make consume/order state authoritative on the server and idempotent.
- Remove local emergency bypasses, or replace them with server-signed emergency grants.
- Keep an indispensable protected operation server-mediated so a patched client cannot obtain the capability by editing local JS alone.
