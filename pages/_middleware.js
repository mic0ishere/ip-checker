import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname.split("/").slice(1);

  if (pathname[1] === "get-ip" && pathname[2]) {
    const fields =
      "?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,asname,query";
    const url = "http://ip-api.com/json";

    return NextResponse.rewrite(`${url}/${pathname[2]}${fields}`);
  }

  return NextResponse.next().cookie("ip", req.ip);
}
