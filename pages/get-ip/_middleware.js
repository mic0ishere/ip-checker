import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname.split("/").slice(1);
  
  const fields =
    "?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,asname,query";
  const url = "http://ip-api.com/json";

  if (pathname[1])
    return NextResponse.rewrite(`${url}/${pathname[1]}${fields}`);
  return NextResponse.rewrite(`${url}${fields}`);
}
