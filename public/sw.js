if (!self.define) {
  let e,
    i = {};
  const s = (s, c) => (
    (s = new URL(s + ".js", c).href),
    i[s] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = i), document.head.appendChild(e);
        } else (e = s), importScripts(s), i();
      }).then(() => {
        let e = i[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[n]) return;
    let t = {};
    const o = (e) => s(e, n),
      r = { module: { uri: n }, exports: t, require: o };
    i[n] = Promise.all(c.map((e) => r[e] || o(e))).then((e) => (a(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "17ff5a1b1e9d94b98a72f8783c55a4df",
        },
        {
          url: "/_next/static/c7CoVE7JzzFiELSIuEwx_/_buildManifest.js",
          revision: "4d5f9a85a898ceddbba3c7cc1a0cb186",
        },
        {
          url: "/_next/static/c7CoVE7JzzFiELSIuEwx_/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-b215c11fd239d6ef.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1063-f9a5d93364b0ce70.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1233-8c62cb087d0b3865.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1424-5af0432782faa617.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1564-c12bac10f50248c7.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1700-ba285a0f643b6332.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/1790-c1641004435b9380.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2223-0bede6aa5b76ffeb.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2381-cb33054bc865ac7e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2435-6e548628e048382d.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2506-f7beb67f8d193388.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2749-c682dd213fa54441.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/2987-272c3d117d38ca8e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/3030-9c2f05686e00e89b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/3236-479104e29faff3f8.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/345-8daf28acb5f8d14c.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/3760.d057efcc6b15d670.js",
          revision: "d057efcc6b15d670",
        },
        {
          url: "/_next/static/chunks/413-d87e6a00553707e6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/4406-2d49807f35b2f3e9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/4469-e052b2ddf111f96b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/4911-bef27df8296090e5.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/5290-8003c589e783aaba.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/5373-985a2a52c867a7a9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/554-18557a17676fe845.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/5691-890fb50c14a15a51.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/5974-0f00eb504587d4c2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/6264-ed17eacc5c6c0029.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/6406-ae246e8a11d948c2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/6473-9cd524eda8c9eaec.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/649-f0a1c2bb9ab97fef.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/691-45f752ae979ce7e1.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/7080-dfe3ba1fd01aef36.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/7362-9c45d93dd73f6caa.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/7857-e2f128a14b45d7d3.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8110-0abbc40e5733ee06.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8205-8fdd569c5d843fec.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8311-8d5c74b48d34b715.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8326-8d7c37140c199261.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8384-13781bfa9c2d513b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8489-4bcf98a8ab886c94.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8578-97c05c8baa553642.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8606-246be3c1025a9a7b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8639-54f4395604ba24de.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/8960-80347cdd520177e7.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/9049-c75ad5098a26efca.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/9874-4fb89f259cd11812.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/9960-0404b2e3abafc055.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/aaea2bcf-a7ca6716006e5525.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(admin-access)/admin-access/page-80251fc55bdd9b33.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(admin-access)/layout-089ec27dfc05deb5.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/admin/sign-in/page-c78532cdfad1c3f0.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/agent/sign-in/page-202a3a0bcfd2a8ba.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/done/page-53824e844b5a015b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/emailinput/page-ea5aeb57496706ec.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/enterverification/page-a480b9a27c4f4ef5.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/layout-7e7e2ff04ee512d9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/passwordreset/page-8954cc37c8c3b77f.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/reset-password/page-1ba2af5026b9dc77.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/sign-in/page-41c3709207c493d0.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/super-secret-xxxxxx-admin-sign-in-page/page-8268dda3abaeb3dd.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(auth)/verification-code/page-612dce1dd611c456.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/activities/%5Bid%5D/page-6ba396ff935b8e92.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/activities/page-51a9576248c1c9e3.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/%5Bid%5D/activities/page-08fd04d5a69548dc.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/%5Bid%5D/not-found-1526e21be34f1017.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/%5Bid%5D/page-8711adfd333638bd.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/layout-41f8a3983c95ee3d.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/new-admin/page-ed70a782365db0fd.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/not-found-73674754eb35c3e6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/admins/page-cf305c8c9052794e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/%5Bid%5D/activities/page-52987fdf0a9372a7.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/%5Bid%5D/not-found-baa7ab774f361d36.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/%5Bid%5D/page-4c44d12dea75e601.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/%5Bid%5D/vehicles/page-ec5241283f592c2e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/new-agent/page-a205ad20af4bd497.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/not-found-855a46e39c1a6d40.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/agents/page-8a576beb1efd6951.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/analytics/page-84c9a9200a665263.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/c/status/%5Bbcid%5D/page-85326569d6263c2b.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/c/status/not-found-b4311c66e162085e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/companies/%5Bid%5D/page-673382b59337d5e9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/companies/page-db0041230035fae6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/dashboard/history/%5Bfrequency%5D/page-5a3ef1171c90c6b1.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/dashboard/my-agents/page-14f3380307b8cb61.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/dashboard/not-found-e82ecac6f6e049bf.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/dashboard/page-fdbf686912247e67.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/drivers/%5Bid%5D/add-license/page-18a35cb6ef533fb5.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/drivers/%5Bid%5D/not-found-12d3f3a63e588302.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/drivers/%5Bid%5D/page-3bb94d8bd68f160e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/drivers/layout-470a1029ce9e03e1.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/drivers/page-e05e0c5746ff1905.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/fines/%5BfineId%5D/page-e92f62f17259a614.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/fines/add-new/page-0ff92762edd6ef80.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/fines/page-4daebe93e2f4bf12.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/green-engine/%5Bplate%5D/add/page-c959998910d26670.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/green-engine/%5Bplate%5D/not-found-cf45bbaeb7fb7fd9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/green-engine/%5Bplate%5D/page-a6e539d8cd0ef27a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/green-engine/page-74f768d8f6a63d54.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/groups/%5Bid%5D/page-b8c021457dda33ea.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/groups/page-56501ae8144491eb.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/layout-04cb91f8ce0a38d1.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/map/page-4cad8454eea39e9c.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/property/%5Bproperty%5D/page-c0934ea984da7ad6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/property/page-bcc97547412a3231.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/revenue/%5Bduration%5D/page-c462b7f7a0898e21.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/revenue/page-ef2342175868bdd0.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/scan/page-953f289fbf434053.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/settings/layout-3cb16076b7266df4.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/settings/page-e0b322494958a06e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/v/status/%5Bbcid%5D/page-38d0cdb898ba3b86.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/v/status/not-found-f843872d9aac56a9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/drivers/page-fd13512e82eb11e4.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/edit/page-ff866955afed83f7.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/fines/page-ad7b30191821ffb3.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/location/page-54c7135d992048bb.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/new-driver/page-c876efa95a818669.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/not-found-14cdaa3cb18e1b4a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/page-c7a709886764144d.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/payments/page-ce14e2319254c6c8.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/waiver/add-new/page-550950f6c1406371.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/waiver/history/page-29936ed1bb691463.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/waiver/page-5c4ed421d7c227d2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/%5Bid%5D/wallet/page-f78a5500916040e2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/layout-eb973b11d2fc2ff1.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/new-vehicle/drivers-license/page-04912c2242c1c580.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/new-vehicle/page-d719b2c79638b19e.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/new-vehicle/plate-info/page-ade33a7f3d0a73a2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/page-594a7f036465d6e6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/search/%5Bid%5D/page-6c87a566f0439c43.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/search/page-ee3f313ba99d43da.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/verify/%5Basin%5D/page-15c85f58fc470a8d.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/(root)/vehicles/verify/page-41537f8fe0a78d3a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/about/page-3df7d975d31c04e7.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/check-in/%5Bid%5D/checked/page-e9441650eee7de10.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/check-in/%5Bid%5D/page-1f4c77cf4800983a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/check-in/layout-b9c69a9294942eb6.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/check-in/page-33a888e89d3d3864.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/error-678d18a01706e8f9.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/faq/page-2f0ebefcdd90b999.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/info/%5Bid%5D/page-ee795b8778ae160f.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/info/layout-9fe0dc96d9569993.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/info/page-6964a449d22b4099.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/layout-b152f8a8fef6d4ac.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/maintenance/page-34ffac32cec7d07d.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/manage/about/page-979773d759b37ddd.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/manage/layout-32094a26b277e682.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/manage/page-453def9743738e75.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/manage/profile/page-5d89580f2242bf95.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/manage/security/page-401a4c707994fa2a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/not-found-4dff1bad35f3112f.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/page-d0cc7978838162f2.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/payment-notifications/page-eb52888201e0cccd.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/search/%5Bquery%5D/page-97d68b5db2416036.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/search/%5Bquery%5D/payment-history-display/page-f98a85ad14fc0a6f.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/search/layout-66cf0e98e71c4466.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/search/not-found-6b1993a391cde926.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/search/page-c966386c87104150.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/support/page-b5668d912ca806ce.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/app/tos/page-0b216ff3af6903b4.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/bf6a786c-c3dc223e99f79e97.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/framework-638abc5ad5ea33cc.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/main-a2339676a521c8e4.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/main-app-50f77bce9aa8b59a.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/pages/_app-0a6f9986ee298e67.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/pages/_error-70c7d9fb687d5ff5.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-dbafc8ff9984f195.js",
          revision: "c7CoVE7JzzFiELSIuEwx_",
        },
        {
          url: "/_next/static/css/917d77dc7b2bc1a1.css",
          revision: "917d77dc7b2bc1a1",
        },
        {
          url: "/_next/static/media/155cae559bbd1a77-s.p.woff2",
          revision: "268d01e94fa0e3a13787891fe19f739c",
        },
        {
          url: "/_next/static/media/162938472036e0a8-s.woff2",
          revision: "f07093b23087bde42e34448bcbad3f78",
        },
        {
          url: "/_next/static/media/4caeef6da8d39a4c-s.woff2",
          revision: "9dd23ab8e851b7e31964d7ba10ed10af",
        },
        {
          url: "/_next/static/media/4de1fea1a954a5b6-s.p.woff2",
          revision: "b7d6b48d8d12946dc808ff39aed6c460",
        },
        {
          url: "/_next/static/media/55c20a7790588da9-s.p.woff2",
          revision: "816d95a45d019ad06908231c9584ec03",
        },
        {
          url: "/_next/static/media/6d664cce900333ee-s.p.woff2",
          revision: "017598645bcc882a3610effe171c2ca3",
        },
        {
          url: "/_next/static/media/6ec89c3f4265bc9b-s.woff2",
          revision: "5396d177b727ae5121d49fda50183c3b",
        },
        {
          url: "/_next/static/media/7ff6869a1704182a-s.p.woff2",
          revision: "cf5ec3859b05de1b9351ab934b937417",
        },
        {
          url: "/_next/static/media/af4d27004aa34222-s.woff2",
          revision: "c5a05a4e2a52b4590fbb511cc93b5045",
        },
        {
          url: "/_next/static/media/f1df658da56627d0-s.woff2",
          revision: "372d9cf6e4822b41d014fcc9de0a979a",
        },
        {
          url: "/lagos-logo.png",
          revision: "c8dd9c223139aeaa998256553311d766",
        },
        {
          url: "/animations/1.json",
          revision: "386762e7ea4ca088c313cf854514db98",
        },
        {
          url: "/animations/2.json",
          revision: "eb08f3cb74bc32a2d01bf7f51e0fbc12",
        },
        {
          url: "/animations/a.gif",
          revision: "179e968f558ae7abf7003320502ebf36",
        },
        { url: "/app-store.png", revision: "fc7abc94061ec8a08938aff48d1dd4e3" },
        {
          url: "/authpageLogo.png",
          revision: "a1d23b1833a4c09d20e73888dd3f582d",
        },
        { url: "/avater.png", revision: "b196d84ecf40bf9eca3d4bba0d339a10" },
        { url: "/avater2.png", revision: "5fe696f0d338ab52da789b7f596690f7" },
        { url: "/chukwuma.jpg", revision: "450166c1932959157753afc2966bc829" },
        { url: "/drivers.png", revision: "05b5abba84438e46d898d667f46391a5" },
        { url: "/fareflex.png", revision: "ce458952559fbc7ef08da14c3a26835f" },
        { url: "/favicon.ico", revision: "09ea8b87e9cca8cfeaa2f5220e647a5e" },
        {
          url: "/fineandpenal.png",
          revision: "63123578da10a1826b1146af5918d90b",
        },
        { url: "/graph.png", revision: "d38856b6cfff311a83937b8033e81148" },
        { url: "/hand.png", revision: "6bc5b91562f2491088584b604a062091" },
        { url: "/ibezim.jpg", revision: "83dda52fcc21cd4b0d33e16bd68a7a3e" },
        { url: "/logo.png", revision: "3076d500db0de49cc7e51c0c78f09111" },
        { url: "/logo2.png", revision: "226f6363e69f91ec373f0d8e3daecdc8" },
        { url: "/maps/1.png", revision: "8fc89de0d3252bc9a490e06305759ac3" },
        { url: "/maps/2.png", revision: "3e11c84a2899c4c0dcb0cfbc2e88e17e" },
        { url: "/maps/3.png", revision: "99979078b2aa2d3f0fef6cb0a57e2161" },
        { url: "/maps/4.png", revision: "08a28a5a3de69e4e6561512fd381fb93" },
        { url: "/maps/5.png", revision: "0e58ba8256a61d7f2d17454871356ed5" },
        { url: "/mbanefo.jpeg", revision: "2d2f41ceb6b1563fd3105681564c9279" },
        { url: "/payment.png", revision: "e1d3cd49322515feb8f35850c76275f6" },
        {
          url: "/personalinfo.png",
          revision: "b360b0546b93f6b1c6a3036a9f8c45af",
        },
        {
          url: "/play-store.png",
          revision: "05cf1c5d3640727fadbdd75a8396d9af",
        },
        { url: "/refunds.png", revision: "0b70c38b02be0b89e2a37eb016e0413a" },
        { url: "/registrar.jpg", revision: "42a4877b9e1d0fa3494e198e92928c0d" },
        { url: "/scanplate.png", revision: "3309ab89021564569a1b35272c11a963" },
        {
          url: "/service-worker.js",
          revision: "dc1bd734b36e823a4fd62397646358fd",
        },
        { url: "/slide-one.png", revision: "83d727f69a9829051e3124be4d73daef" },
        {
          url: "/slide-three.png",
          revision: "1961fb834d17fdd3f0b58bb76c51104d",
        },
        { url: "/slide-two.png", revision: "004df6f2339a66c89c49b52f3e02ce08" },
        {
          url: "/transpay-only-logo.png",
          revision: "3006d2f95e217a474e1cd4376f92908b",
        },
        { url: "/tricycle.jpg", revision: "a5ae6ed821148b1929886d77039fc931" },
        { url: "/view1.jpg", revision: "6172799ce77b9fbbd73566688e5b1517" },
        { url: "/view2.jpg", revision: "d7a469ea6dedbb27178f2df445d70bbd" },
        { url: "/view3.jpg", revision: "187b1540fadd58ca359c33bc255c37de" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: i,
              event: s,
              state: c,
            }) =>
              i && "opaqueredirect" === i.type
                ? new Response(i.body, {
                    status: 200,
                    statusText: "OK",
                    headers: i.headers,
                  })
                : i,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const i = e.pathname;
        return !i.startsWith("/api/auth/") && !!i.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
