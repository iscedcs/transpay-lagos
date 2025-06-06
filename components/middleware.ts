import { NextRequest, NextResponse } from "next/server";

export const config = {
     matcher: [
          "/activities/:path*",
          "/admins/:path*",
          "/agents/:path*",
          "/dashboard/:path*",
          "/fines/:path*",
          "/manage/:path*",
          "/revenue/:path*",
          "/vehicles/:path*",
          "/drivers/:path*",
          "/property/:path*",
          "/green-engine/:path*",
          // '/((?!api|_next/static|_next/image|favicon.ico|maintenance).*)',
     ],
};

export default function middleware(request: NextRequest) {
          const response = NextResponse.next();
          const token = request.cookies.get("next-auth.session-token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "");
          if (token) {
              response.cookies.set("accessToken", token);
              // Assuming role is stored in a custom header or cookie
              const role = request.cookies.get("role")?.value || "defaultRole";
              response.cookies.set("role", role);
          }
     }

// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL('/maintenance', request.url));
// }
